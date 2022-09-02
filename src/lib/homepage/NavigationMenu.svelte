<script lang="ts">
  import { faCalendarDay } from "@fortawesome/free-solid-svg-icons";

  import Fa from "svelte-fa";
  import Button from "../components/Button.svelte";
  import ListItem from "../components/ListItem.svelte";
  import Space from "../components/Space.svelte";
</script>

<div
  class="flex flex-col nav-menu bg-gray-100 h-full md:pl-7 md:pt-7 pt-3 pl-3"
>
  <ListItem hoverColor="#0001" isActive={true}>
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
</div>
