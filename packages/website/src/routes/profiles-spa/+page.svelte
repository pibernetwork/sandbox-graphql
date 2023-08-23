<script lang="ts">
  import { graphql } from '$houdini';
  import ProfileFormAdd from '$lib/components/Profile/ProfileFormAdd.svelte';
  import ProfileView from '$lib/components/Profile/ProfileView.svelte';
  import {
    Heading,
    Table,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell
  } from 'flowbite-svelte';

  const Profiles = graphql(`
    query Profiles @load {
      profiles {
        _id
        user {
          _id
          email
        }
        birthday
        weight
      }
      usersOptions {
        name
        value
      }
    }
  `);

  let selected: string | null = null;
</script>

<Heading tag="h1">Profiles SPA</Heading>

{#if $Profiles.data}
  <div class="grid grid-cols-12">
    <div class="col-span-3">
      <div>Actions</div>

      <ProfileFormAdd users={$Profiles.data.usersOptions} />
      <div>Edit</div>
      {#if selected}
        <ProfileView _id={selected} />
      {/if}
    </div>

    <div class="col-span-9">
      <Table>
        <TableHead>
          <TableHeadCell>Email</TableHeadCell>
          <TableHeadCell>Weight</TableHeadCell>
          <TableHeadCell>Birthday</TableHeadCell>
        </TableHead>
        <TableBody>
          {#each $Profiles.data.profiles as profile}
            <TableBodyRow on:click={() => (selected = profile?._id || null)} class="cursor-pointer">
              <TableBodyCell>{profile?.user?.email}</TableBodyCell>
              <TableBodyCell>{profile?.weight}</TableBodyCell>
              <TableBodyCell>{profile?.birthday}</TableBodyCell>
            </TableBodyRow>
          {/each}
        </TableBody>
      </Table>
    </div>
  </div>
{/if}
