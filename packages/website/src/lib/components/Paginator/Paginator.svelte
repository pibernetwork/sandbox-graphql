<script lang="ts">
  import { PaginationItem } from 'flowbite-svelte';
  import ChevronDoubleLeft from '../Icons/ChevronDoubleLeft.svelte';
  import ChevronDoubleRight from '../Icons/ChevronDoubleRight.svelte';
  import ChevronLeft from '../Icons/ChevronLeft.svelte';
  import ChevronRight from '../Icons/ChevronRight.svelte';

  export let page: number;
  export let totalPages: number;
  export let totalNodes: number;

  export let start: number;
  export let end: number;

  export let hasNextPage: boolean;
  export let hasPrevPage: boolean;
  export let nextPage: number | null;
  export let prevPage: number | null;
  export let currentPage: number;

  function changePage(newPage: number | null | undefined) {
    if (newPage === null || newPage === undefined) {
      return undefined;
    }
    currentPage = newPage;
  }

  $: items = [
    ...Array.from(Array(3), (_, index) => index + 1)
      .reverse()
      .filter((item) => page - item > 0)
      .map((item) => page - item),
    page,
    ...Array.from(Array(3), (_, index) => index + 1)
      .filter((item) => page + item <= totalPages)
      .map((item) => page + item)
  ];

  const paginationItemClass = 'w-12 justify-center';

  //after
</script>

<div>Showing {start} to {end} of {totalNodes} entries</div>
<div>Page {page} of {totalPages}</div>
<div class="flex space-x-3 justify-start border-2">
  <PaginationItem class={paginationItemClass} on:click={() => changePage(1)}>
    <ChevronDoubleLeft />
  </PaginationItem>
  {#if hasPrevPage}
    <PaginationItem class={paginationItemClass} on:click={() => changePage(prevPage)}>
      <ChevronLeft />
    </PaginationItem>
  {/if}
  {#each items as item}
    <PaginationItem
      class={paginationItemClass}
      active={item === page}
      on:click={() => changePage(item)}>{item}</PaginationItem
    >
  {/each}
  {#if hasNextPage}
    <PaginationItem class={paginationItemClass} on:click={() => changePage(nextPage)}>
      <ChevronRight />
    </PaginationItem>
  {/if}
  <PaginationItem class={paginationItemClass} on:click={() => changePage(totalPages)}>
    <ChevronDoubleRight />
  </PaginationItem>
</div>
