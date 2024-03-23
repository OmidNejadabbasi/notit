<script lang="ts">
  import { cssVariables } from "../../utils/svelte-utils";
  import { fade } from "svelte/transition";

  export let isOpen: boolean;

  let left, width;
  let top;
  let wrapper: HTMLElement;
  $: widthVar = `${width}px`;

</script>

<div
  class="wrapper"
  bind:this={wrapper}
  class:showing={isOpen}
  bind:clientWidth={width}
  use:cssVariables={{ widthVar }}
>
  <slot />
</div>

{#if isOpen}
  <div class="overlay" on:click={() => (isOpen = false)} transition:fade></div>
{:else}{/if}

<style>
  .showing {
    display: block !important;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: #202124;
    opacity: 0.42;
    z-index: 10;
  }
  .wrapper {
    @apply rounded-md p-3 bg-white;
    position: absolute;
    left: calc(50vw - var(--widthVar) / 2);
    top: 100px;
    max-height: 80%;
    z-index: 20;
    display: none;
  }
</style>
