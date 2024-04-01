<script lang="ts">
  import type { Tag } from "../data/Tag";
  import { cssVariables } from "../utils/svelte-utils";

  const { tag } = $props<{ tag: Tag }>();
  let colorsList = ["#b9cfed", "#a0dee2", "#d0f59d", "#ffda6b", "#f196a3"];
  let color = $state(colorsList[tag.name.hashCode() % colorsList.length]);
</script>

<div class="tag" use:cssVariables={{ color }}>{tag.name}</div>

<style lang="scss">
  @property --color {
    syntax: "<color>";
    inherits: false;
    initial-value: #e2e2e2;
  }
  .tag {
    @apply px-4 py-[2px] mb-1 rounded-xl hover:rounded-lg bg-slate-300 transition-all font-semibold;
    background-color: var(--color);
    color: #3f3f3f;
  }
</style>
