<script lang="ts">
  import { graphql } from '$houdini';
  import { Heading } from 'flowbite-svelte';
  import type { GetProfilesVariables } from './$houdini';

  export let _id: string;

  export const _GetProfilesVariables: GetProfilesVariables = () => {
    return { _id: _id };
  };

  $: store = graphql(`
    query GetProfiles($_id: String!) @load {
      profile(_id: $_id) {
        _id
        birthday
        weight
        user {
          _id
          email
        }
      }
    }
  `);
</script>

<Heading tag="h2">View</Heading>
{#if $store.errors}
  {#each $store.errors as error}
    <div>{error.message}</div>
  {/each}
{/if}

{#if $store.data}
  <div class="p-4">
    <div>{_id}</div>
    <div>{$store.data.profile?.user?.email}</div>
    <div>{$store.data.profile?.birthday}</div>
    <div>{$store.data.profile?.weight}</div>
  </div>
{/if}
