<script lang="ts">
  import {
    faCircleCheck,
    faExclamationCircle,
    faSpinner,
  } from "@fortawesome/free-solid-svg-icons";
  import { debounceTime, Observable, Subject } from "rxjs";
  import { onMount } from "svelte";
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

  let formState: FormState = $state(new FormNewMode());

  let noteService: NoteService = sl.resolve(tNoteService);
  let { note = Note.newNote("", "") } = $props<{ note: Note }>();
  let content = $state(note.content);
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
      note.content = content;
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
  let modalClass = $state("");
  $effect(() => {
    let first = element.getBoundingClientRect();
    console.log(first);

    isFocused ?element.classList.add("modal"):element.classList.remove("modal")
    element.offsetTop;

    let last = element.getBoundingClientRect();

    console.log(last);
    const deltaX = first.left - last.left;
    const deltaY = first.top - last.top;
    const deltaW = first.width / last.width;
    const deltaH = first.height / last.height;

    element.animate(
      [
        {
          transformOrigin: "top left",
          transform: `
    translate(${deltaX}px, ${deltaY}px)
    scale(${deltaW}, ${deltaH})
  `,
        },
        {
          transformOrigin: "top left",
          transform: "none",
        },
      ],
      {
        duration: 300,
        easing: "ease-in-out",
        fill: "both",
      }
    );
  });

  $effect(() => {
    contentSubject.next({ content, title });
    formState = new FormDirty();
  });
</script>

<div
  bind:this={fakeElement}
  style="display: {isFocused
    ? 'block'
    : 'none'}; min-height:{height}; width:{width}"
></div>
{#if isFocused}
  <div class="overlay" on:click={() => (isFocused = false)}></div>
{:else}{/if}
<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  on:click={() => (isFocused = true)}
  class="card"
  on:keydown={() => {}}
  bind:this={element}
  use:cssVariables={{ height, width }}
>
  {#if hasTitle || isFocused}
    <!-- content here -->
    <input
      type="text"
      bind:value={title}
      class="input focus:border-none"
      placeholder="Title"
      in:scaleHeight={{ duration: 300 }}
      out:scaleHeight={{ duration: 300 }}
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
    @apply rounded-md shadow-md w-full border-[1px] outline-none p-2 max-w-xl relative hover:border-2 hover:border-gray-400 focus-within:border-2
   focus-within:border-gray-400;
  }

  .modal {
    position: fixed;
    max-height: 80%;
    width: 750px;
    background-color: white;
    left: calc(50vw - var(--width) / 2);
    top: max(10%, 15vh - var(--height) / 2);
    z-index: 20;
  }

  .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #202124;
    opacity: 0.3;
    z-index: 10;
  }
</style>
