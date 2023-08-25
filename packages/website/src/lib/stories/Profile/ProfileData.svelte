<script lang="ts">
  import type { ProfileConnectionFilter, ProfilesStore } from '$houdini';
  import type { PageModes } from '$lib';
  import Paginator from '$lib/components/Paginator/Paginator.svelte';
  import { Button, Input, Label, PaginationItem } from 'flowbite-svelte';
  import ProfileDataGrid from './ProfileDataGrid.svelte';

  let currentPage = 1;
  let sortBy = 'weight';
  let sortOrder = 'desc';

  let filters: ProfileConnectionFilter = {
    ['weight']: { between: { from: null, to: null } }
  };

  export let selected: string | null;

  export let mode: PageModes;

  $: selected = mode === null ? null : selected;

  let Profiles: ProfilesStore;

  $: pageInfo = $Profiles?.data?.profilesConnection.pageInfo;
  $: errors = $Profiles?.errors;

  function changePage(newPage: number | null | undefined) {
    if (newPage === null || newPage === undefined) {
      return undefined;
    }
    currentPage = newPage;
  }

  function changeFilter(newWeightFrom: string | null, newWeightTo: string | null) {
    filters = {
      ['weight']: {
        between: {
          from: (newWeightFrom && parseFloat(newWeightFrom)) || null,
          to: (newWeightTo && parseFloat(newWeightTo)) || null
        }
      }
    };

    currentPage = 1;
  }

  function submitFilter(e: SubmitEvent) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const newWeightFrom = formData.get('weightFrom')?.toString() || null;

    const newWeightTo = formData.get('weightTo')?.toString() || null;

    changeFilter(newWeightFrom, newWeightTo);
  }

  let form: HTMLFormElement;

  function resetForm() {
    form.reset();
    changeFilter(null, null);
  }
</script>

<div class="col-span-9">
  {#if errors}
    {JSON.stringify(errors)}
  {/if}
  {#if pageInfo}
    <Paginator
      {changePage}
      page={pageInfo.page}
      hasPrevPage={pageInfo.hasPrevPage}
      hasNextPage={pageInfo.hasNextPage}
      totalNodes={pageInfo.totalNodes}
      totalPages={pageInfo.totalPages}
      start={pageInfo.start}
      end={pageInfo.end}
      nextPage={pageInfo.nextPage}
      prevPage={pageInfo.prevPage}
    />
  {/if}
  <div class="grid grid-cols-2">
    {#if pageInfo !== undefined}
      <div>
        <div class="flex space-x-3 justify-center">
          {#if pageInfo.hasPrevPage}
            <PaginationItem on:click={() => changePage(pageInfo && pageInfo.prevPage)}>
              <svg
                class="w-[12px] h-[12px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                />
              </svg>
            </PaginationItem>
          {/if}
          {#if pageInfo.hasNextPage}
            <PaginationItem on:click={() => changePage(pageInfo && pageInfo.nextPage)}>
              <svg
                class="w-[12px] h-[12px] text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 8 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                />
              </svg>
            </PaginationItem>
          {/if}
        </div>
        <div>
          Page {pageInfo.page} of {pageInfo.totalPages} - {pageInfo.totalNodes}
        </div>
        <div>
          <form bind:this={form} on:submit={submitFilter} class="p-4">
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <Label for="birthday">From</Label>
                <Input
                  id="weightFrom"
                  name="weightFrom"
                  placeholder="Weight From"
                  type="number"
                  step="0.1"
                  min="0"
                />
              </div>
              <div>
                <Label for="weight">To</Label>
                <Input
                  id="weightTo"
                  name="weightTo"
                  placeholder="Weight To"
                  type="number"
                  step="0.1"
                  min="0"
                />
              </div>
            </div>
            <div>
              <Button type="submit">Filter</Button>
              <Button on:click={resetForm}>Reset</Button>
            </div>
          </form>
        </div>
      </div>
    {/if}
  </div>
  <ProfileDataGrid
    {currentPage}
    {filters}
    {sortBy}
    {sortOrder}
    bind:selected
    bind:mode
    bind:Profiles
  />
</div>
