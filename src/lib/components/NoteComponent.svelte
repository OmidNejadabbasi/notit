<script lang="ts">
  import {
    faCircleCheck,
    faExclamationCircle,
    faSpinner,
  } from "@fortawesome/free-solid-svg-icons";
  import { debounceTime, fromEvent, map, Observable, Subject } from "rxjs";
  import { onMount } from "svelte";
  import Fa from "svelte-fa";
  import { Note } from "../data/Note";
  import { sl } from "../di";
  import { NoteService, tNoteService } from "../services/note/NoteService";
  import {
    FormDirty,
    FormNewMode,
    FormState,
    FormSubmissionFailed,
    FormSubmissionSucceed,
    FormSubmitted,
  } from "../state/FormState";

  let formState: FormState = new FormNewMode();

  let noteService: NoteService = sl.resolve(tNoteService);
  export let note: Note = Note.newNote("", "");
  let content;

  let contentSubject = new Subject<string>();
  let contentChanges: Observable<string> = contentSubject.pipe(
    debounceTime(3000)
  );
  onMount(() => {
    if (note.id) formState = new FormSubmissionSucceed();
    contentChanges.subscribe(async (data) => {
      note.content = data;
      console.log(data);

      try {
        if (!note.id) {
          if (note.content.length === 0) return;
          formState = new FormSubmitted();
          note = (await noteService.saveNote(note)).data;
        } else {
          // TODO update note when not new
          noteService.updateNote(note);
        }
        formState = new FormSubmissionSucceed();
      } catch (err) {
        formState = new FormSubmissionFailed(err.message);
      }
    });
  });

  $: {
    contentSubject.next(content);
    formState = new FormDirty();
  }
</script>

<div
  class="rounded-md shadow-md lg:shadow-lg w-full border-2 p-2 max-w-xl relative"
>
  <div
    bind:innerHTML={content}
    contenteditable="true"
    class="border-none text-lg outline-none min-h-[46px] w-full"
  />
  <div class="absolute bottom-2 right-2">
    {#if formState instanceof FormSubmissionSucceed}
      <Fa icon={faCircleCheck} color="limegreen" />
    {:else if formState instanceof FormSubmissionFailed}
      <Fa icon={faExclamationCircle} color="red" />
    {:else if formState instanceof FormSubmitted}
      <Fa icon={faSpinner} spin color="turquoise" />
    {:else if formState instanceof FormNewMode}
      <div />
      <!-- show nothing when new  -->
    {:else if formState instanceof FormDirty}
      <Fa icon={faExclamationCircle} color="orange" />
    {:else}
      <p>Fuck js</p>
    {/if}
  </div>
</div>
