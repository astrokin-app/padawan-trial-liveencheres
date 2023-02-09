import { defineStore } from 'pinia'
import { fetchSales, createSales } from '../services/api'

export const useSalesStore = defineStore('sales', {
  state: () => {
    return { 
      sales: undefined,
      lots: undefined,
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async FetchSales() {
      this.sales = await fetchSales()

      this.lots = this.sales.data.flatMap(item => item.items)
      .map(child => child.description)
    },

    async CreateSales(newSale) {
      newSale.id = this.sales.data.length + 1
      await createSales(newSale)
    }
  },
})