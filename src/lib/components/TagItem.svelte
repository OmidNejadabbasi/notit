<script lang="ts">
  import Fa from "svelte-fa";
  import type { Tag } from "../data/Tag";
  import { cssVariables } from "../utils/svelte-utils";
  import { faTrash } from "@fortawesome/free-solid-svg-icons";

  const { tag, href }: { tag: Tag; href } = $props();
  let colorsList = ["#b9cfed", "#a0dee2", "#d0f59d", "#ffda6b", "#f196a3"];
  let color = $state(colorsList[tag.name.hashCode() % colorsList.length]);
</script>

<div class="tag" use:cssVariables={{ color }}>
  <a class="block flex-grow-1" {href}>
    {tag.name}
  </a>
  <div class="icon opacity-0 ml-auto hover:scale-125 transition-all">
    <Fa icon={faTrash} size="xs"  />
  </div>
</div>

<style lang="scss">
  @property --color {
    syntax: "<color>";
    inherits: false;
    initial-value: #e2e2e2;
  }
  .icon {
    @apply opacity-0 transition-all;
  }
  .tag {
    @apply flex justify-center items-center px-4 py-[2px] mb-1 rounded-xl hover:rounded-lg bg-slate-300 transition-all 
    font-semibold;
    background-color: var(--color);
    color: #3f3f3f;

    &:hover .icon {
      opacity: 100%;
    }
  }
</style>
