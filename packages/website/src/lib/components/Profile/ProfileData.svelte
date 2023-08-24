<script lang="ts">
  import type { ProfilesStore } from '$houdini';
  import type { PageModes } from '$lib';
  import { Button, PaginationItem } from 'flowbite-svelte';
  import ProfileDataGrid from './ProfileDataGrid.svelte';

  let currentPage = 1;
  let sortBy = 'weight';
  let sortOrder = 'desc';

  export let selected: string | null;

  export let mode: PageModes;

  $: selected = mode === null ? null : selected;

  let Profiles: ProfilesStore;

  $: pageInfo = $Profiles?.data?.profilesConnection.pageInfo;

  function changePage(newPage: number | null | undefined) {
    if (newPage === null || newPage === undefined) {
      return undefined;
    }
    currentPage = newPage;
  }

  function changeSortOrder(newSortOrder: string) {
    if (newSortOrder !== sortOrder) {
      currentPage = 1;
    }
    sortOrder = newSortOrder;
  }

  function changeSortBy(newSortBy: string) {
    if (newSortBy !== sortBy) {
      currentPage = 1;
    }
    sortBy = newSortBy;
  }
</script>

<div class="col-span-9">
  <div class="grid grid-cols-2">
    {#if pageInfo !== undefined}
      <div>
        <div class="flex space-x-3">
          <PaginationItem on:click={() => changePage(pageInfo && pageInfo.prevPage)}
            >Previous</PaginationItem
          >
          <PaginationItem on:click={() => changePage(pageInfo && pageInfo.nextPage)}
            >Next</PaginationItem
          >
        </div>
        <div>
          Page {pageInfo.page} of {pageInfo.totalPages} - {pageInfo.totalNodes}
        </div>
      </div>
    {/if}
    <div>
      <div>
        <div class="flex space-x-3 m-4">
          <Button on:click={() => changeSortOrder('asc')}>Asc</Button>
          <Button on:click={() => changeSortOrder('desc')}>Desc</Button>
        </div>
        <div class="flex space-x-3 m-4">
          <Button on:click={() => changeSortBy('weight')}>Weight</Button>
          <Button on:click={() => changeSortBy('birthday')}>Birthday</Button>
        </div>
      </div>
      <div>Filter</div>
    </div>
  </div>
  <ProfileDataGrid {currentPage} {sortBy} {sortOrder} bind:selected bind:mode bind:Profiles />
</div>
