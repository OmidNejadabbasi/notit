<script lang="ts">
  import Button from "../components/Button.svelte";
  import { faFlag } from "@fortawesome/free-solid-svg-icons";
  import { faHouse } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
</script>

<div class="navbar bg-red-500 h-10 flex items-center lg:px-20 md:px-10 px-5">
  <Button hoverColor="#ffffff33">
    <Fa icon={faHouse} />
  </Button>
</div>
