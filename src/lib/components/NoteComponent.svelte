<script lang="ts">
  import {
    debounceTime,
    fromEvent,
    map,
    type Observable,
    type Subject,
  } from "rxjs";
  import { onMount } from "svelte";
  let content: HTMLDivElement;

  onMount(() => {
    let contentChanges: Observable<string> = fromEvent(content, "input").pipe(
      map((e) => (e.target as HTMLDivElement).innerHTML)
    );
    contentChanges.subscribe((data) => {
      console.log(data);
    });
  });
</script>

<div class="rounded-md shadow-md lg:shadow-lg w-full border-2 p-2 max-w-xl">
  <div
    bind:this={content}
    contenteditable="true"
    class="border-none text-lg outline-none min-h-[46px] w-full"
  />
</div>
