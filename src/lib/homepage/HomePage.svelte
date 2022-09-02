<script lang="ts">
  import Button from "../components/Button.svelte";
  import { faHouse } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import NavigationMenu from "./NavigationMenu.svelte";
</script>

<div class="navbar bg-red-500 h-10 flex items-center lg:px-30 md:px-15 px-5">
  <Button hoverColor="#fff3">
    <Fa icon={faHouse} />
  </Button>
</div>

<main class="flex min-h-full">
  <div class="flex-grow-0 w-72">
    <NavigationMenu />
  </div>
</main>
