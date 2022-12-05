<script lang="ts">
  export let color = "transparent";
  export let textColor = "#333";
  export let hoverColor = "#0001";
  export let activeColor = "#0001";
  export let isActive: boolean = false;
</script>

<button
  style="--color:{color}; --hoverColor:{hoverColor}; --textColor:{textColor}; --activeColor:{activeColor}"
  class="{isActive
    ? 'active'
    : null} flex w-full items-center gap-1 pointer-events-auto rounded-md py-2 px-2 text-[0.8125rem] font-semibold leading-5 text-white"
>
  <slot />
</button>

<style lang="scss">
  button {
    color: var(--textColor);
    background-color: var(--color);
    &:hover {
      background-color: var(--hoverColor);
    }
    height: min-content;
  }
  .active {
    background-color: var(--activeColor);
  }
</style>
