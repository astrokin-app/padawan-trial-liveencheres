<template>
  <div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <img src="../assets/interencheres.svg" alt="" width="15%" style="margin-right: 2rem;">

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav class="nav-flex">
      <b-navbar-nav>
        <!-- <router-link to="/search" active-class>Trouver des ventes et des lots</router-link> -->
        <router-link to="/">Acheter aux enchères</router-link>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <div v-if="!admin">
          <b-button v-b-modal.my-modal>Se connecter</b-button>
          <b-modal id="my-modal" @ok="signinUser($event)" :no-close-on-backdrop="true">
            Connecter vous pour pouvoir créer de nouvelles ventes.
            <template #modal-footer>
              <button v-b-modal.modal-close_visit class="btn btn-danger btn-sm m-1" @click="$bvModal.hide('my-modal')">Fermer</button>
              <button v-b-modal.modal-close_visit class="btn btn-success btn-sm m-1" @click="signinUser($event)">Connecter</button>
            </template>

          </b-modal>
        </div>
        <div v-if="admin">
          <!-- add component -->
          <b-button v-b-modal.my-modal>Créer une vente</b-button>
          <b-modal id="my-modal" :no-close-on-backdrop="true">
            <div>
              <b-card bg-variant="light">
                <b-form-group
                  label-cols-lg="12"
                  label="Créer une vente"
                  label-size="lg"
                  label-class="font-weight-bold pt-0"
                  class="mb-0"
                >
                  <b-form-group
                    label="Titre:"
                    label-for="nested-street"
                    label-cols-sm="12"
                    label-align-sm="right"
                  >
                    <b-form-input id="nested-title" v-model="newSale.title"></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Description:"
                    label-for="nested-city"
                    label-cols-sm="12"
                    label-align-sm="right"
                  >
                    <b-form-input id="nested-description" v-model="newSale.description"></b-form-input>
                  </b-form-group>

                  <b-form-group
                    v-for="(lot, index) in lots" :key="index"
                    label="Lot description:"
                    label-for="nested-state"
                    label-cols-sm="12"
                    label-align-sm="right"
                  >
                    <b-form-textarea id="nested-lot" v-model="newSale.items[index]"></b-form-textarea>
                  </b-form-group>
                </b-form-group>
              </b-card>
            </div>
            <template #modal-footer>
              <button v-b-modal.modal-close_visit class="btn btn-danger btn-sm m-1" @click="$bvModal.hide('my-modal')">Fermer</button>
              <button v-b-modal.modal-close_visit class="btn btn-warning btn-sm m-1" @click="removeLot()">Supprimer lot</button>
              <button v-b-modal.modal-close_visit class="btn btn-primary btn-sm m-1" @click="addLot()">Ajouter lot</button>
              <button v-b-modal.modal-close_visit class="btn btn-success btn-sm m-1" @click="createSale(), refreshDatas()">Creer</button>
            </template>
          </b-modal>
        </div>
        <b-nav-form>
          <b-form-input v-model="search" size="sm" class="mr-sm-2" placeholder="Que cherchez vous ?"></b-form-input>
          <b-button size="sm" class="my-sm-0" @click="goToSearch()">Rechercher</b-button>
        </b-nav-form>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
  <router-view></router-view>
</div>
</template>

<script>
// import Form from '../components/Form.vue'
import { useSalesStore } from '../stores/salesStore';

export default {
  components: {
    // Form
  },

  data() {
    return {
      admin: false,
      newItems: [{description: ''}],
      newSale: {
        title: '',
        description: '',
        items: [],
      },
      lots: [{
        description: ''
      }],
      search: '',
      lastQueryUrl: ''
    }
  },

  methods: {
    signinUser(e) {
      console.log('Bienvenue admin!', e)
      this.admin = true
    },

    async createSale() {
      this.$bvModal.hide('my-modal')

      const salesStore = useSalesStore()

      await salesStore.CreateSales(this.newSale)
    },

    goToSearch() {
      console.log(this.lastQueryUrl, this.$route.fullPath)
      if (this.$route.fullPath !== this.lastQueryUrl || this.$route.query.params !== this.search) {
        this.$router.push({ path: `search${ this.$route.params.lots ? this.$route.params.lots : ':lots' }`, query: { params: this.search }})
      }

      this.lastQueryUrl = this.$route.fullPath

    },

    addLot() {
      return this.lots.push({description: ''})
    },

    removeLot() {
      return this.lots.pop()
    },

    async refreshDatas() {
      const salesStore = useSalesStore()

      salesStore.sales.data.splice(salesStore.sales.data.length, 0, this.newSale)
      this.newSale.items.map(description => {salesStore.lots.data.splice(salesStore.lots.data.length, 0, description)})
    }
  },
}
</script>

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

a {
  color: black;
  text-decoration: none;
  padding: 1rem;
}

a.router-link-active {
  font-weight: bold;
  color: white;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
  text-underline-offset: 8px;
  text-decoration-thickness: 0.2rem;
}

.disabled {
  pointer-events: none;
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