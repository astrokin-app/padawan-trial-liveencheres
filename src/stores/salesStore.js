import { defineStore } from 'pinia'
import { fetchSales, createSales } from '../services/api'

export const useSalesStore = defineStore('sales', {
  state: () => {
    return { 
      sales: {},
      lots: {
        data: []
      },
    }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    async FetchSales() {
      this.lots.data = []
      this.sales = {}

      this.sales = await fetchSales()

      this.sales.data.flatMap(item => item.items)
        .map(child => {
          this.lots.data.push(child.description)
      })

    },

    async CreateSales(newSale) {
      newSale.id = this.sales.data.length + 1
      await createSales(newSale)

      await this.FetchSales()

    }
  },
})