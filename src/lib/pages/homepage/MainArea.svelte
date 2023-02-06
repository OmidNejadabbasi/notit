<script lang="ts">
  import {
    faList,
    faNoteSticky,
    faPlus,
    faStickyNote,
  } from "@fortawesome/free-solid-svg-icons";

  import Fa from "svelte-fa";
  import Button from "../../components/shared/Button.svelte";
  import NoteComponent from "../../components/NoteComponent.svelte";
  import { Color, CssColors } from "../../data/Color";
  import { onMount } from "svelte";
  import type { Note } from "../../data/Note";
  import { sl } from "../../di";
  import { NoteService, tNoteService } from "../../services/note/NoteService";

  let c = Color.cssC("red");
  console.log(c.s());
  let notes: Note[] = [];
  let noteService: NoteService = sl.resolve(tNoteService);

  onMount(async () => {
    notes = (await noteService.fetchAllNotes()).data;
    console.log("hello", notes);
  });
</script>

<div
  class="flex flex-col items-center pt-4 md:pt-12 lg:pt-20 mx-4 md:mx-12 lg:mx-20 w-full"
>
  <div class="flex flex-wrap gap-2 h-min w-full">
    <Button
      color={CssColors.crimson.withAlpha(0.2).s()}
      hoverColor={CssColors.crimson.withAlpha(0.5).s()}
      borderColor={CssColors.crimson.withAlpha(0.5).s()}
      textColor={CssColors.black.withAlpha(0.7).s()}
    >
      <Fa icon={faPlus} color="crimson" />
      <p>Note</p>
    </Button>
    <Button
      color={CssColors.purple.withAlpha(0.2).s()}
      hoverColor={CssColors.purple.withAlpha(0.5).s()}
      borderColor={CssColors.purple.withAlpha(0.5).s()}
      textColor={CssColors.black.withAlpha(0.7).s()}
    >
      <Fa icon={faPlus} color="purple" />
      <span>Cheatsheet</span>
    </Button>
    <Button
      color={CssColors.skyblue.withAlpha(0.2).s()}
      hoverColor={CssColors.skyblue.withAlpha(0.5).s()}
      borderColor={CssColors.skyblue.withAlpha(0.5).s()}
      textColor={CssColors.black.withAlpha(0.7).s()}
    >
      <Fa icon={faPlus} color="skyblue" />
      <span>Flash Card</span>
    </Button>
  </div>

  <div class="flex flex-col flex-wrap gap-2 h-min w-full lg:mt-4 mt-3">
    <NoteComponent />
    {#each notes as note}
      <NoteComponent {note} />
    {/each}
  </div>
</div>
