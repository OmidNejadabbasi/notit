<script lang="ts">
  import { faPlus } from "@fortawesome/free-solid-svg-icons";

  import Fa from "svelte-fa";
  import Button from "../components/Button.svelte";
  import { Color } from "../data/Color";

  let c = Color.cssC("red");
  console.log(c.s());
</script>

<div class="flex justify-center pt-4 md:pt-12 lg:pt-20 w-full">
  <div class="flex flex-wrap gap-2 h-min md:w-8/12 w">
    <Button hoverColor={Color.cssC("red").s()}>
      <Fa icon={faPlus} />
      <span>Note</span>
    </Button>
    <Button>
      <Fa icon={faPlus} />
      <span>Cheat</span>
    </Button>
  </div>
</div>
