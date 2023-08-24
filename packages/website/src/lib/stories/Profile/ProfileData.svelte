<script lang="ts">
  import type { ProfileConnectionFilter, ProfilesStore } from '$houdini';
  import type { PageModes } from '$lib';
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
    <div>
      <div>
        <div class="flex space-x-3 m-4">
          <Button on:click={() => changeSortOrder('asc')}>Asc</Button>
          <Button on:click={() => changeSortOrder('desc')}>Desc</Button>
        </div>
        <div class="flex space-x-3 m-4">
          <Button on:click={() => changeSortBy('weight')}>Weight</Button>
          <Button on:click={() => changeSortBy('birthday')}>Birthday</Button>
          <Button on:click={() => changeSortBy('user.email')}>Email</Button>
        </div>
      </div>
    </div>
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
