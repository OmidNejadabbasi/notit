<script lang="ts">
  import { cssVariables } from "../../utils/svelte-utils";
  import { fade } from "svelte/transition";

  export let isOpen: boolean;
  export let element;

  let left, width;
  let top;
  let wrapper: HTMLElement;
  let isHidden = true;
  $: widthVar = `${width}px`;

  // First: get the current bounds

  $: {
    if (element) {
      const first = element.getBoundingClientRect();
      if (isOpen) isHidden = false;
      requestAnimationFrame(() => {
        const last = wrapper.getBoundingClientRect();

        // Invert: determine the delta between the
        // first and last bounds to invert the element
        const deltaX = first.left - last.left;
        const deltaY = first.top - last.top;
        const deltaW = first.width / last.width;
        const deltaH = first.height / last.height;
        // Play: animate the final element from its first bounds
        // to its last bounds (which is no transform)
        wrapper
          ?.animate(
            [
              {
                transformOrigin: "center",
                transform: `
    translate(${deltaX}px, ${deltaY}px)
    scale(${deltaW}, ${deltaH})
  `,
              },
              {
                transformOrigin: "center",
                transform: "none",
              },
            ],
            {
              duration: 3000,
              easing: "ease-in-out",
              fill: "both",
            }
          )
          .addEventListener("finish", () => {
            isHidden = !isOpen;
          });
      });
    }
  } // Last: get the final bounds
</script>

<div
  class="wrapper"
  bind:this={wrapper}
  class:showing={!isHidden}
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
