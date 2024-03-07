<script lang="ts">
  import {
    faCircleCheck,
    faExclamationCircle,
    faSpinner,
  } from "@fortawesome/free-solid-svg-icons";
  import { debounceTime, Observable, Subject } from "rxjs";
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
  import { scaleHeight } from "../utils/animations";

  let formState: FormState = new FormNewMode();

  let noteService: NoteService = sl.resolve(tNoteService);
  export let note: Note = Note.newNote("", "");
  let content = note.content;
  let title = note.title || "";
  $: hasTitle = title.length;
  let isFocused = false;

  let contentSubject = new Subject<any>();
  let contentChanges: Observable<any> = contentSubject.pipe(debounceTime(3000));
  onMount(() => {
    if (note.id) formState = new FormSubmissionSucceed();
    contentChanges.subscribe(async ({ content, title }) => {
      note.content = content;
      note.title = title;
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
    contentSubject.next({ content, title });
    formState = new FormDirty();
  }
</script>

<div
  on:focusin={() => (isFocused = true)}
  on:focusout={() => (isFocused = false)}
  class="card hover:border-2 hover:border-gray-400 focus-within:border-2
   focus-within:border-gray-400"
>
  {#if hasTitle || isFocused}
    <!-- content here -->
    <input
      type="text"
      bind:value={title}
      class="input focus:border-none"
      placeholder="Title"
      in:scaleHeight={{ duration:300}}
      out:scaleHeight={{duration:300}}
    />
  {/if}
  <div bind:innerHTML={content} contenteditable="true" class="content" />
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

<style lang="scss">
  .input {
    @apply outline-none font-semibold text-lg;
  }
  .content {
    @apply border-none outline-none min-h-[46px] w-full text-gray-900;
  }
  .card {
    @apply rounded-md shadow-md w-full border-[1px] transition-all outline-none p-2 max-w-xl relative;
  }

  .modal {
    position: absolute;
  }
</style>
