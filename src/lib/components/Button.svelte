<script lang="ts">
  export let color = "transparent";
  export let textColor = "#333";
  export let hoverColor = "#99f";
  export let borderColor = "transparent";
</script>

<button
  style="--color:{color}; --hoverColor:{hoverColor}; --textColor:{textColor}; --borderColor:{borderColor}"
  class="flex items-center gap-1 pointer-events-auto font-label font-semibold rounded-md py-1 px-2 text-[0.8125rem] leading-5 text-white"
>
  <slot />
</button>

<style lang="scss">
  button {
    color: var(--textColor);
    background-color: var(--color);
    border: 2px solid var(--borderColor);
    &:hover {
      background-color: var(--hoverColor);
    }
  }
</style>
