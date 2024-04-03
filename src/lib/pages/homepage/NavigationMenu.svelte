<script lang="ts">
  import { faCalendarDay, faChevronDown, faPlus, faTags } from "@fortawesome/free-solid-svg-icons";

  import Fa from "svelte-fa";
  import ListItem from "../../components/ListItem.svelte";
  import {Space ,Collapsible, Dialog} from "ui-commons";
  import { Tag } from "../../data/Tag";
  import TagItem from "../../components/TagItem.svelte";
  import { tNoteService, type NoteService } from "../../services/note/NoteService";
  import { sl } from "../../di";

  let noteService: NoteService = sl.resolve(tNoteService);
  
  let { tags }:{tags: Tag[]} = $props();
  let isTagsOpen= $state(true);
  let isAddTagDialogOpen = $state(false);
  let tagName = $state("")
  function createTag(){
    noteService.createTag(tagName).then((res)=>{
      isAddTagDialogOpen = false;
      tagName = "";
      tags.push(res)
    })
  }
  function openAddTagDialog(){
    isAddTagDialogOpen = true;
  }
</script>

<div
  class="flex flex-col nav-menu bg-gray-100 h-full md:pl-7 md:pt-7 pt-3 pl-3"
>
  <ListItem hoverColor="#0001">
    <Fa icon={faCalendarDay} color="green" />
    <Space width="8px" />
    <p class="flex-grow-1">Today</p>
  </ListItem>
  <ListItem hoverColor="#0001">
    <Fa icon={faCalendarDay} color="red" />
    <Space width="8px" />
    <p class="flex-grow-1">Today</p>
  </ListItem>
  <ListItem hoverColor="#0001">
    <Fa icon={faCalendarDay} color="blue" />
    <Space width="8px" />
    <p class="flex-grow-1">Today</p>
  </ListItem>
  <Collapsible bind:isOpen={isTagsOpen}>
    {#snippet header()}
    <div class="flex items-center gap-2">
      <Fa icon={faTags} size="xs"/> <span> Tags</span>
      <Fa icon={faChevronDown} size="sm" primaryOpacity={.4}
       class="ml-auto mr-3 transition-all {isTagsOpen && '-rotate-90'}" />
    </div>
    {/snippet}
    <div class="pl-3 pr-2">

    <ul>
      <div class="h-1"></div>
      {#each tags as t}
      <TagItem tag={t} href=""></TagItem>
      {/each}
    </ul>
    <div class="flex items-center justify-center rounded-lg border-[1px] hover:border-gray-400 bg-gray-200"
    on:click={openAddTagDialog} >
      <Fa icon={faPlus} size="xs" primaryOpacity={.4}/>
      <span class="ml-1 py-1 select-none text-zinc-600 text-sm font-semibold">Add tag</span>
    </div>
    </div>
  </Collapsible>
    <Dialog bind:isOpen={isAddTagDialogOpen}>
      <div class="w-64">
        <div class="p-1 mb-2">Tag name: </div>
        <input type="text" 
          class="w-full p-1 block mb-2 border-gray-200 border-2 rounded" 
          placeholder="Enter a name:"
          bind:value={tagName}>

        <button class="bg-emerald-400 rounded px-2 py-1" on:click={createTag}>Create</button>
        <button class="rounded bg-gray-200 px-2 py-1" 
        on:click={()=>isAddTagDialogOpen = false}>Cancel</button>
      </div>
    </Dialog>
</div>
