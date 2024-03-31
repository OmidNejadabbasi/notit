<script lang="ts">
  import { faCalendarDay, faChevronCircleDown, faChevronDown, faTags } from "@fortawesome/free-solid-svg-icons";

  import Fa from "svelte-fa";
  import Button from "../../components/shared/Button.svelte";
  import ListItem from "../../components/ListItem.svelte";
  import Space from "../../components/shared/Space.svelte";
  import Collapsible from "../../components/shared/Collapsible.svelte";
  import type { Tag } from "../../data/Tag";
  import TagItem from "../../components/TagItem.svelte";

  let { tags } = $props<{tags: Tag[]}>();
  let isTagsOpen= $state(false);
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
    <ul class="pl-3 pr-2">
      <div class="h-1"></div>
      {#each tags as t}
      <TagItem tag={t}></TagItem>
      {/each}
    </ul>
  </Collapsible>
</div>
