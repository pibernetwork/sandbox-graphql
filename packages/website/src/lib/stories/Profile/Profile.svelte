<script lang="ts">
  import type { ProfileConnectionFilter, ProfilesStore } from '$houdini';
  import type { PageModes } from '$lib';
  import Paginator from '$lib/components/Paginator/Paginator.svelte';
  import ProfileDataFilter from '$lib/stories/Profile/ProfileDataFilters.svelte';
  import ProfileDataGrid from '$lib/stories/Profile/ProfileDataGrid.svelte';

  // init page info
  let currentPage = 1;
  let sortBy = 'weight';
  let sortOrder = 'desc';

  let filters: ProfileConnectionFilter = {
    ['weight']: { between: { from: null, to: null } }
  };

  // init modes
  export let selected: string | null;
  export let mode: PageModes;
  $: selected = mode === null ? null : selected;

  // init store
  let Profiles: ProfilesStore;
  $: pageInfo = $Profiles?.data?.profilesConnection.pageInfo;
</script>

<div class="col-span-9">
  {#if pageInfo}
    <Paginator
      bind:currentPage
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
  <ProfileDataFilter {currentPage} bind:filters />
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
