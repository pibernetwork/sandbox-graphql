<script lang="ts">
  import { TableHeadCell } from 'flowbite-svelte';

  export let label: string;
  export let key: string;
  export let sortBy: string;
  export let sortOrder: string;
  export let currentPage = 1;

  function selectSort(newSortBy: string) {
    if (sortBy !== newSortBy) {
      sortOrder = 'desc';
      currentPage = 1;
    } else {
      sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    sortBy = newSortBy;
  }
</script>

{#if key !== sortBy}
  <TableHeadCell on:click={() => selectSort(key)} class="cursor-pointer">{label}</TableHeadCell>
{:else}
  <TableHeadCell on:click={() => selectSort(key)} class="bg-red-100 cursor-pointer"
    >{label}

    {#if sortOrder === 'asc'}
      <svg
        class="w-[12px] h-[12px] text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 8"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7"
        />
      </svg>
    {:else}
      <svg
        class="w-[12px] h-[12px] text-gray-800 dark:text-white"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 14 8"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1"
        />
      </svg>
    {/if}
  </TableHeadCell>
{/if}
