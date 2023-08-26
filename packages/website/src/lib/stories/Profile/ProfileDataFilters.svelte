<script lang="ts">
  import { Button, Input, Label } from 'flowbite-svelte';

  export let filters;
  export let currentPage;

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
