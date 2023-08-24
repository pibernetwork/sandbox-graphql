<script lang="ts">
  import type { ProfilesStore } from '$houdini';
  import type { PageModes } from '$lib';
  import { Button } from 'flowbite-svelte';
  import ProfileDataGrid from './ProfileDataGrid.svelte';

  let currentPage = 1;

  export let selected: string | null;

  export let mode: PageModes;

  $: selected = mode === null ? null : selected;

  let Profiles: ProfilesStore;
</script>

<div class="col-span-9">
  <div class="grid grid-cols-2">
    {#if $Profiles}
      {JSON.stringify($Profiles.data)}
    {/if}
    <div>
      <div>Sort</div>
      <div>Filter</div>
    </div>

    <div>
      <Button on:click={() => (currentPage = 1)}>Page 1</Button>
      <Button on:click={() => (currentPage = 2)}>Page 2</Button>
      <Button on:click={() => (currentPage = 3)}>Page 3</Button>
      Pagination
    </div>
  </div>
  <ProfileDataGrid {currentPage} bind:selected bind:mode bind:Profiles />
</div>
