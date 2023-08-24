<script lang="ts">
  import { graphql, type ProfileConnectionFilter } from '$houdini';
  import type { PageModes } from '$lib';
  import GridHeadCell from '$lib/components/GridHeadCell.svelte';
  import { Table, TableBody, TableBodyCell, TableBodyRow, TableHead } from 'flowbite-svelte';
  import type { ProfilesVariables } from './$houdini';

  export let selected: string | null;
  export let mode: PageModes;

  export let currentPage = 1;
  export let sortBy = 'weight';
  export let sortOrder = 'desc';
  export let filters: ProfileConnectionFilter;

  export let Profiles = graphql(`
    query Profiles(
      $page: Int!
      $limit: Int!
      $sortBy: String!
      $sortOrder: String!
      $filters: ProfileConnectionFilter!
    ) @load {
      profilesConnection(
        page: $page
        limit: $limit
        sortBy: $sortBy
        sortOrder: $sortOrder
        filters: $filters
      ) {
        nodes @list(name: "Profiles_Items") {
          _id
          user {
            _id
            email
          }
          birthday
          weight
        }
        pageInfo {
          page
          nextPage
          prevPage
          hasNextPage
          hasPrevPage
          totalNodes
          totalPages
        }
      }
    }
  `);

  function selectItem(_id: string | null | undefined) {
    selected = _id || null;
    mode = 'view';
  }

  export const _ProfilesVariables: ProfilesVariables = () => {
    return {
      page: currentPage,
      limit: 10,
      sortBy,
      sortOrder,
      filters
    };
  };
</script>

{#if $Profiles.data}
  <Table class="table-fixed">
    <TableHead>
      <GridHeadCell label="Email" key="user.email" bind:sortBy bind:sortOrder bind:currentPage />
      <GridHeadCell label="Weight" key="weight" bind:sortBy bind:sortOrder bind:currentPage />
      <GridHeadCell label="Birthday" key="birthday" bind:sortBy bind:sortOrder bind:currentPage />
    </TableHead>
    <TableBody>
      {#each $Profiles.data.profilesConnection.nodes as profile}
        <TableBodyRow on:click={() => selectItem(profile?._id)} class="cursor-pointer">
          <TableBodyCell>{profile?.user?.email}</TableBodyCell>
          <TableBodyCell>{profile?.weight}</TableBodyCell>
          <TableBodyCell>{profile?.birthday}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
{/if}
