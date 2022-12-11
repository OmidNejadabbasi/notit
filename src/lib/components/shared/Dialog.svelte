<script lang="ts">
  export let isShowing: boolean;

  let left;
  let top;
</script>

<div
  class="absolute w-40 h-min top-0 left-0 bg-white {isShowing
    ? 'hidden'
    : 'flex'}"
>
  <slot />
</div>
