<script lang="ts">
  import { faSave } from "@fortawesome/free-solid-svg-icons";
  import { debounceTime, fromEvent, map, Observable, Subject } from "rxjs";
  import { onMount } from "svelte";
  import { Note } from "../data/Note";
  import { sl } from "../di";
  import { NoteService, tNoteService } from "../services/note/NoteService";

  let noteService: NoteService = sl.resolve(tNoteService);
  export let note: Note = Note.newNote("", "");
  let content;

  let contentSubject = new Subject<string>();
  let contentChanges: Observable<string> = contentSubject.pipe(
    debounceTime(3000)
  );
  onMount(() => {
    contentChanges.subscribe(async (data) => {
      note.content = data;
      console.log(data);

      if (!note.id) {
        if (note.content.length === 0) return;
        note = await noteService.saveNote(note);
      } else {
        // TODO update note when not new
      }
    });
  });

  $: contentSubject.next(content);
</script>

<div class="rounded-md shadow-md lg:shadow-lg w-full border-2 p-2 max-w-xl">
  <div
    bind:innerHTML={content}
    contenteditable="true"
    class="border-none text-lg outline-none min-h-[46px] w-full"
  />
</div>
