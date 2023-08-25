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

  $: items = [
    ...Array.from(Array(5), (_, index) => index + 1)
      .reverse()
      .filter((item) => page - item > 0)
      .map((item) => page - item),
    page,
    ...Array.from(Array(5), (_, index) => index + 1)
      .filter((item) => page + item <= totalPages)
      .map((item) => page + item)
  ];

  //after
</script>

<div>Showing {start} to {end} of {totalNodes} entries</div>
<div>Page {page} of {totalPages}</div>
<div class="flex space-x-3 justify-start border-2">
  {#if hasPrevPage}
    <PaginationItem on:click={() => changePage(prevPage)}>
      <AngleLeft />
    </PaginationItem>
  {/if}
  {#each items as item}
    <PaginationItem on:click={() => changePage(item)}>{item}</PaginationItem>
  {/each}
  {#if hasNextPage}
    <PaginationItem on:click={() => changePage(nextPage)}>
      <AngleRight />
    </PaginationItem>
  {/if}
</div>
