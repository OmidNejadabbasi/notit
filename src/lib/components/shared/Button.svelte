<script lang="ts">
  export let color = "transparent";
  export let textColor = "#333";
  export let hoverColor = "#99f";
  export let borderColor = "transparent";
  export let borderThickness = 1;

  let borderWidth = borderThickness + "px";
</script>

<button
  on:click
  type="button"
  style="--color:{color}; --hoverColor:{hoverColor}; --textColor:{textColor}; --borderColor:{borderColor}; --borderWidth:{borderWidth}"
  class="flex items-center gap-1 pointer-events-auto font-label font-normal rounded-md py-1 px-2 text-[0.8125rem] leading-5 text-white duration-200"
>
  <slot />
</button>

<style lang="scss">
  button {
    color: var(--textColor);
    background-color: var(--color);
    border: var(--borderWidth) solid var(--borderColor);
    &:hover {
      background-color: var(--hoverColor);
    }
  }
</style>
