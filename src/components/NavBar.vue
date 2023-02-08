<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <img src="../assets/interencheres.svg" alt="" width="15%" style="margin-right: 2rem;">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav class="nav-flex">
      <b-navbar-nav>
        <router-link to="/search" active-class>Trouver des ventes et des lots</router-link>
        <router-link to="/" active-class>Acheter aux enchères</router-link>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-button v-b-modal.my-modal>Se connecter</b-button>
        <b-modal id="my-modal">Hello From My Modal!</b-modal>

        <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Que cherchez vous ?"></b-form-input>
          <b-button size="sm" class="my-sm-0" type="submit">Rechercher</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <router-view></router-view>
</div>
</template>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 10;
  padding: 1rem;
}
.form-inline {
  display: flex;
  padding-right: var(--bs-navbar-nav-link-padding-x);
  padding-left: var(--bs-navbar-nav-link-padding-x);
}

.nav-flex {
  justify-content: space-between;
}

a {
  text-decoration: none;
  color: aliceblue;
  margin-right: 1rem;
}

.router-link-exact-active {
  text-decoration: underline;
  color: aliceblue;
}

.nav-flex > navbar-collapse > collapse > show {
  flex-direction: column-reverse;
}

.collapse.show {
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
}

.collapse.show > ul {
  gap: 2rem;
  flex-direction: column-reverse;
  margin-top: 2rem;
}

ul {
  flex-direction: row-reverse;
}

.navbar-expand-lg .navbar-nav {
  flex-direction: row-reverse;
}

::-webkit-input-placeholder {
   font-size: 13px;
}

:-moz-placeholder { /* Firefox 18- */
      font-size: 13px;
}

::-moz-placeholder {  /* Firefox 19+ */
      font-size: 13px;
}
</style>