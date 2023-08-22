<script lang="ts">
  import { graphql } from '$houdini';
  import type { GetProfilesVariables } from './$houdini';

  export let _id: string;

  export const _GetProfilesVariables: GetProfilesVariables = ({ props }) => {
    return { _id: props._id };
  };

  const store = graphql(`
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

{#if $store.errors}
  {#each $store.errors as error}
    <div>{error.message}</div>
  {/each}
{/if}

{#if $store.data}
  <div>{$store.data.profile?.user?.email}</div>
  <div>{$store.data.profile?.birthday}</div>
  <div>{$store.data.profile?.weight}</div>
{/if}
