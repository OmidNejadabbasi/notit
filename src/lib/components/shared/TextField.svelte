<script lang="ts">
  type textInputType = "text" | "email" | "password" | "tel" | "url";
  export let type: textInputType = "text";
  export let value: string = "";
  export let placeholder = "";
  export let label = "";
  export let description = "";

  const handleInput = (e) => {
    // in here, you can switch on type and implement
    // whatever behaviour you need
    value = type.match(/^(number|range)$/) ? +e.target.value : e.target.value;
  };
</script>

<div class="w-full">
  <p class="pl-1 font-label font-light pb-1">{label}</p>

  <input
    {type}
    {value}
    {placeholder}
    on:input={handleInput}
    class="w-full block border-[1.5px] focus:border-blue-400 border-gray-300 transition-all duration-200 rounded px-2 py-1.5 focus:shadow-md shadow-slate-700"
  />
  <p>{description}</p>
</div>

<style>
  input {
    outline: none;
  }
</style>
