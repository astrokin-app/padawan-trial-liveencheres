
<template>
  <div style="height: auto;">
    <b-container>
      <b-img :src="transformImgExt('https://www.interencheres.com/asgard/images/home/big-header.webp?v=bdf5f59cdde9616e63fa6023c706628a')" fluid alt="Responsive image" style="width: -webkit-fill-available;"></b-img>
      <b-row align-v="center" style="min-height: 10rem;" class="text-white font-weight-medium">
        <b-col>3M+ de lots expertisés</b-col>
        <b-col>Garantie des commisaires-priseurs</b-col>
        <b-col>330+ Maisons de ventes partenaires</b-col>
      </b-row>
      <div v-if="getResult">
        <div >
          <h3 class="text-white m-4">Les ventes</h3>
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div v-for="sale in getResult.data" :key="sale.id" class="col">
              <div class="card" role="button">
                <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" class="card-img-top"
                  alt="Hollywood Sign on The Hill" />
                <div class="card-body bg-dark text-white" >
                  <h5 class="card-title text-end">{{ sale.title }}</h5>
                  <!-- <p class="card-text">
                    This is a longer card with supporting text below as a natural lead-in to
                    additional content. This content is a little bit longer.
                  </p> -->
                </div>
              </div>
            </div>
          </div>
          <h4 class="text-white m-4">Les lots</h4>
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div v-for="(item, idx) in getResultChilds" :key="idx" class="col">
              <div class="card" role="button">
                <img src="data:image/jpeg;base64,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" class="card-img-top"
                  alt="Hollywood Sign on The Hill" />
                <div class="card-body bg-dark text-white" >
                  <p class="card-text">{{ item }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <b-row align-v="center" style="min-height: 10rem;" class="text-white font-weight-medium">
        <b-col>Paiement sécurisé</b-col>
        <b-col>Assistance 7j/7</b-col>
        <b-col>N°1 des enchères en France</b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { useSalesStore } from '../stores/salesStore';

export default {
  name: 'HomePage',
  data() {
    return {
      getResult: undefined,
      getResultChilds: undefined,
      newItems: [{description: ''}],
    }
  },

  // Methods
  methods: {
    /**
     * Helper to transform image extension.
     * Checks if webp is supported, and will swap out the image extension accordingly.
     */
    transformImgExt (url) {
      // If webp is supported, transform the url
      if (this.webpSupported) {
        return url.replace(/\.\w{1,5}$/, ".webp");
      } else { // Otherwise, just return the original
        return url;
      }
    },
  },

  async beforeCreate() {
    const salesStores = useSalesStore()

    await salesStores.FetchSales()

    this.getResult = salesStores.sales
    this.getResultChilds = salesStores.lots.data
  },

  created() {
    (async () => {
      // If browser doesn't have createImageBitmap, we can't use webp.
      if (!self.createImageBitmap) {
        this.webpSupported = false;
        return;
      }

      // Base64 representation of a white point image
      const webpData = 'data:image/webp;base64,UklGRiQAAABXRUJQVlA4IBgAAAAwAQCdASoCAAEAAQAcJaQAA3AA/v3AgAA=';
      // Retrieve the Image in Blob Format
      const blob = await fetch(webpData).then(r => r.blob());
      // If the createImageBitmap method succeeds, return true, otherwise false
      this.webpSupported = await createImageBitmap(blob).then(() => true, () => false);

    })();
  } // End created

}
</script>

<style scoped>
.card {
  border : 2px solid #2E2E2E;
  border-radius: 0;
}
</style>