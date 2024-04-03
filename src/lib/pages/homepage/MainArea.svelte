<script lang="ts">
  import { faPlus } from "@fortawesome/free-solid-svg-icons";

  import Fa from "svelte-fa";
  import { Button } from "ui-commons";
  import NoteComponent from "../../components/NoteComponent.svelte";
  import { Color, CssColors } from "../../data/Color";
  import { onMount } from "svelte";
  import { Note } from "../../data/Note";
  import { sl } from "../../di";
  import { NoteService, tNoteService } from "../../services/note/NoteService";
  import { daysSinceEpoch } from "../../utils/dateUtils";

  let c = Color.cssC("red");
  console.log(c.s());
  let notes: Note[] = [];
  let noteService: NoteService = sl.resolve(tNoteService);

  onMount(async () => {
    notes = await noteService.fetchAllNotes();
    console.log(notes);
    notes = notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  });

  notes = notes.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  function addNote() {
    notes = [Note.newNote("", ""), ...notes];
  }
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
      on:click={addNote}
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
    {#each notes as note (note)}
      <NoteComponent {note} />
    {/each}
  </div>
</div>
