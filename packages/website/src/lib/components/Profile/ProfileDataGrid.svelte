<script lang="ts">
  import { graphql } from '$houdini';
  import type { PageModes } from '$lib';
  import {
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte';
  import type { ProfilesVariables } from './$houdini';
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
      ) @list(name: "Profiles_Items") {
        _id
        user {
          _id
          email
        }
        birthday
        weight
      }
    }
  `);
  export let selected: string | null;

  export let mode: PageModes;
  export let currentPage = 1;
  function selectItem(_id: string | null | undefined) {
    selected = _id || null;
    mode = 'view';
  }

  export const _ProfilesVariables: ProfilesVariables = () => {
    return {
      page: currentPage,
      limit: 10,
      sortBy: 'weight',
      sortOrder: 'desc',
      filters: { ['weight']: { between: { from: 50, to: 100 } } }
    };
  };
</script>

{#if $Profiles.data}
  <Table>
    <TableHead>
      <TableHeadCell>Email</TableHeadCell>
      <TableHeadCell>Weight</TableHeadCell>
      <TableHeadCell>Birthday</TableHeadCell>
    </TableHead>
    <TableBody>
      {#each $Profiles.data.profilesConnection as profile}
        <TableBodyRow on:click={() => selectItem(profile?._id)} class="cursor-pointer">
          <TableBodyCell>{profile?.user?.email}</TableBodyCell>
          <TableBodyCell>{profile?.weight}</TableBodyCell>
          <TableBodyCell>{profile?.birthday}</TableBodyCell>
        </TableBodyRow>
      {/each}
    </TableBody>
  </Table>
{/if}
