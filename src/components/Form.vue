<template>
  <form>
    <div class="relative z-0 w-full mb-6 group ">
      <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titre vente</label>
      <input v-model="newSale.title" type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
    </div>
    <div class="relative z-0 w-full mb-6 group">
      <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description vente</label>
      <textarea v-model="newSale.description" type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
    </div>
    <div v-for="(lot, index) in items" :key="index" class="relative z-0 w-full mb-6 group">
      <label for="small-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description Lot n°{{  index+1 }}</label>
      <textarea v-model="newSale.items[index]" type="text" id="small-input" class="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"></textarea>
    </div>
    <div>
      <button @click="addLot" type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2">Ajouter un lot</button>
      <button @click="removeLot" type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2 mr-2 mb-2">Supprimer un lot</button>
      <button @click="createSale(newSale), $emit('refresh', newSale)" type="button" class="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Créer une vente</button>
    </div>
  </form>
</template>

<script>
import { useSalesStore } from '../stores/salesStore'

export default {
  data() {
    return {
      // getResult: undefined,
      newSale: {
        title: '',
        description: '',
        items: []
      }
    }
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => {
        return [
        {
          description: ''
        }
      ]}
    },
  },
  methods: {
    async createSale(newSale) {
      const salesStores = useSalesStore()

      await salesStores.CreateSales(newSale)
    },

    addLot() {
      return this.items.push({description: ''})
    },
    removeLot() {
      return this.items.pop()
    }
  },
}
</script>