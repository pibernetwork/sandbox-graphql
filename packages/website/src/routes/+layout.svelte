<script lang="ts">
  import { NavBrand, NavHamburger, NavLi, NavUl, Navbar } from 'flowbite-svelte';

  import '../app.css';
</script>

<main class="w-full">
  <Navbar let:hidden let:toggle navClass="p-2">
    <NavBrand href="/">
      <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
        Sandbox 1
      </span>
    </NavBrand>
    <NavHamburger on:click={toggle} />
    <NavUl {hidden}>
      <NavLi href="/">Home</NavLi>
      <NavLi href="/profiles-spa">Profiles</NavLi>
    </NavUl>
  </Navbar>
  <slot />
</main>
