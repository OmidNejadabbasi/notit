<script lang="ts">
  import { slide } from "svelte/transition";

  let { isOpen=$bindable(false), header, children }:{
    isOpen?: boolean;
    header;
    children;
  } = $props();
  
</script>

<div>
    {#if header}
    <dir on:click={()=>{isOpen = !isOpen}} class="bg-gray-200 text-left py-1 rounded-md m-0 pl-3">
        {@render header()}
    </dir>
    {/if}

    {#if isOpen}
    <div transition:slide>
        {@render children()}
    </div>
    {/if}
</div>

