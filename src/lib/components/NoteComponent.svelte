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
  import { scaleHeight } from "../utils/animations";
  import { cssVariables } from "../utils/svelte-utils";
  import Flip from "gsap/dist/Flip";
  import { fade } from "svelte/transition";
  import { createEditor, type EditorStore } from "../utils/editorjs.svelte";
  import Dialog from "./shared/Dialog.svelte";

  const { editor, isReady, data } = createEditor({ placeholder: "Empty Note" });
  const dispatcher = createEventDispatcher();

  let formState: FormState = $state(new FormNewMode());

  let noteService: NoteService = sl.resolve(tNoteService);
  let { note = Note.newNote("", "") } = $props<{ note: Note }>();
  let content = $state(JSON.parse(note.content || "[]"));
  isReady.subscribe((is) => {
    if (is) data.set(content);
  });
  let title = $state(note.title);
  let hasTitle = $derived(title?.length);
  let isFocused = $state(false);
  let element: HTMLDivElement;
  let fakeElement: HTMLDivElement;
  let height = $state("");
  let width = $state("");

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
    height = `${element.clientHeight}px`;
  });

  function focusNote() {
    isFocused = true;
  }
  function unfocusNote() {
    isFocused = false;
  }

  let _e: EditorStore;
  editor.subscribe((e) => {
    _e = e;
  });
  function updateData() {
    _e.save && _e.save();
  }
  data.subscribe((d) => {
    content = d.blocks;
  });
  let isModal = $state(false);
  $effect(() => {
    const prev = Flip.getState(element, {});
    console.log(prev);
    isFocused;
    untrack(() => (isModal = isFocused));

    requestAnimationFrame(() => {
      Flip.from(prev, { duration: 0.4, ease: "power1.inOut" });
    });
  });
  $effect(() => {
    contentSubject.next({ content, title });
    formState = new FormDirty();
    height = `${element.clientHeight}px`;
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:click={focusNote}
  on:focusin={focusNote}
  class="{isModal ? 'opacity-0' : ''} card transition-all duration-200"
  on:keydown={() => {}}
  bind:this={element}
  id="elem"
  use:cssVariables={{ height, width }}
>
  {#if hasTitle}
    <!-- content here -->
    <h3 class="input">{title}</h3>
  {/if}
  <div class="">
    {title?.substring(0, 300) + (title?.length || 0 >= 300 ? "..." : "")}
  </div>
  {#if title?.length === 0}
    <h3 class="text-gray-400">Empty Note</h3>
  {/if}
</div>
<Dialog bind:isShowing={isFocused}>
  {#if hasTitle || isFocused}
    <!-- content here -->
    <input
      type="text"
      bind:value={title}
      class="input focus:border-none"
      placeholder="Title"
    />
  {/if}
  <div
  class:hidden={!isFocused}
    use:editor={{
      onChange: (ev) => {
        updateData();
      },
    }}
    class="content"
    dir="ltr"
  ></div>
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
    min-width: 720px;
    max-width: 90vw;
  }
  .card {
    @apply rounded-md shadow-md w-full border-[1px] outline-none p-2 max-w-xl hover:border-2 hover:border-gray-400 focus-within:border-2
   focus-within:border-gray-400 max-h-40 flex flex-col;
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
