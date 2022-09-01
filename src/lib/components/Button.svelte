<script lang="ts">
  export let color = "transparent";
  export let hoverColor = "#99f";
</script>

<button
  style="--color:{color}; --hoverColor:{hoverColor}"
  class="flex items-center gap-1 pointer-events-auto rounded-md py-2 px-2 text-[0.8125rem] font-semibold leading-5 text-white"
>
  <slot />
</button>

<style lang="scss">
  button {
    background-color: var(--color);
    &:hover {
      background-color: var(--hoverColor);
    }
  }
</style>
