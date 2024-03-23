<script lang="ts">
  import {
    faCircleCheck,
    faExclamationCircle,
    faSpinner,
  } from "@fortawesome/free-solid-svg-icons";
  import { debounceTime, Observable, Subject } from "rxjs";
  import { createEventDispatcher, onMount, untrack } from "svelte";
  import Fa from "svelte-fa";
  import { Note, NoteType } from "../data/Note";
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
  import { cssVariables } from "../utils/svelte-utils";
  import {
    createEditor,
    type EditorStore,
  } from "../utils/editorjs/editorjs.svelte";
  import Dialog from "./shared/Dialog.svelte";

  const dispatcher = createEventDispatcher();

  let formState: FormState = $state(new FormNewMode());

  let noteService: NoteService = sl.resolve(tNoteService);
  let { note = Note.newNote("", "") } = $props<{ note: Note }>();
  let content:any[] = $state(JSON.parse(note.content || "[]"));
  let editor = createEditor({
    placeholder: "Empty Note",
    data: { blocks: content },
  });
  let title = $state(note.title);
  let preview = $derived(content.slice(0,3).map((e)=>{
    return e.data.text || e.data.code
  }).join('\n'))
  let hasTitle = $derived(title?.length);
  let isFocused = $state(false);

  let contentSubject = new Subject<any>();
  let contentChanges: Observable<any> = contentSubject.pipe(debounceTime(3000));
  onMount(() => {
    if (note.id) formState = new FormSubmissionSucceed();
    contentChanges.subscribe(async ({ content, title }) => {
      note.content = JSON.stringify(content);
      note.title = title;
      try {
        if (!note.id) {
          if (note.content?.length === 0) return;
          formState = new FormSubmitted();
          note = (await noteService.saveNote(note)).data;
        } else {
          // TODO update note when not new
          noteService.updateNote(note);
        }
        formState = new FormSubmissionSucceed();
      } catch (err: any) {
        formState = new FormSubmissionFailed(err.message);
      }
    });
  });

  function focusNote() {
    isFocused = true;
  }
  $effect(() => {
    content = editor.data?.blocks;
  });
  let isModal = $state(false);
  $effect(() => {
    isFocused;
    untrack(() => (isModal = isFocused));
  });
  $effect(() => {
    contentSubject.next({ content, title });
    formState = new FormDirty();
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:click={focusNote}
  on:focusin={focusNote}
  class="{isModal ? 'opacity-0' : ''} card transition-all duration-200"
  on:keydown={() => {}}
  id="elem"
>
  {#if hasTitle}
    <h3 class="input">{title}</h3>
  {/if}
  <div class="overflow-ellipsis text-wrap">
    {@html preview?.substring(0, 300) + (preview?.length || 0 >= 300 ? "..." : "")}
  </div>
  {#if preview?.trim().length === 0}
    <h3 class="text-gray-400">Empty Note</h3>
  {/if}
</div>
<Dialog bind:isOpen={isFocused}>
  {#if hasTitle || isFocused}
    <!-- content here -->
    <input
      type="text"
      bind:value={title}
      class="input focus:border-none"
      placeholder="Title"
    />
  {/if}
  <div class:hidden={!isFocused} use:editor.use class="content" dir="ltr"></div>
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
</Dialog>

<style lang="scss">
  .input {
    @apply outline-none font-semibold text-lg flex-none;
  }
  .content {
    @apply border-none outline-none min-h-[46px] text-gray-900;
    text-overflow: inherit;
    overflow: inherit;
    white-space: inherit;
    scrollbar-width: thin;
    min-width: 980px;
    max-width: 90vw;
  }
  .card {
    @apply rounded-md shadow-md w-full border-[1px] outline-none p-2 max-w-xl hover:border-2 hover:border-gray-400 focus-within:border-2
   focus-within:border-gray-400 max-h-72 flex flex-col;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }

  .modal {
    position: fixed;
    max-height: 80% !important;
    min-width: 750px !important;
    background-color: white;
    // left: calc(50vw - var(--width) / 2);
    left: 50px;
    top: max(10%, 15vh - var(--height) / 2);
    z-index: 20;
    text-overflow: unset !important;
    overflow-y: auto !important;
    white-space: unset !important;
  }
</style>
