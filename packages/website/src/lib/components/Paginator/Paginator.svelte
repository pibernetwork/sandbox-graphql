<script lang="ts">
  import { PaginationItem } from 'flowbite-svelte';
  import AngleLeft from '../Icons/AngleLeft.svelte';
  import AngleRight from '../Icons/AngleRight.svelte';

  export let page: number;
  export let totalPages: number;
  export let totalNodes: number;

  export let start: number;
  export let end: number;

  export let hasNextPage: boolean;
  export let hasPrevPage: boolean;
  export let nextPage: number | null;
  export let prevPage: number | null;

  export let changePage: (page: number | null) => void;

  //before
  const beforeItems = Array.from(Array(5), (_, index) => index + 1).reverse();
  const afterItems = Array.from(Array(5), (_, index) => index + 1);

  //after
</script>

<div>Showing {start} to {end} of {totalNodes} entries</div>
<div>Page {page} of {totalPages}</div>
<div class="flex space-x-3 justify-center">
  {#if hasPrevPage}
    <PaginationItem on:click={() => changePage(prevPage)}>
      <AngleLeft />
    </PaginationItem>
  {/if}
  {#each beforeItems as beforePage}
    {#if page - beforePage > 0}
      <PaginationItem on:click={() => changePage(page - beforePage)}
        >{page - beforePage}</PaginationItem
      >
    {/if}
  {/each}
  <PaginationItem on:click={() => changePage(page)} active>{page}</PaginationItem>
  {#each afterItems as afterPage}
    {#if page + afterPage <= totalPages}
      <PaginationItem on:click={() => changePage(page + afterPage)}
        >{page + afterPage}</PaginationItem
      >
    {/if}
  {/each}
  {#if hasNextPage}
    <PaginationItem on:click={() => changePage(nextPage)}>
      <AngleRight />
    </PaginationItem>
  {/if}
</div>
