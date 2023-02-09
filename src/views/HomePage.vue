
<template>
  <div>
    <b-container>
      <b-img :src="transformImgExt('https://www.interencheres.com/asgard/images/home/big-header.webp?v=bdf5f59cdde9616e63fa6023c706628a')" fluid alt="Responsive image" style="width: -webkit-fill-available;"></b-img>
      <b-row align-v="center" style="min-height: 10rem;" class="text-white font-weight-medium">
        <b-col>3M+ de lots expertisés</b-col>
        <b-col>Garantie des commisaires-priseurs</b-col>
        <b-col>330+ Maisons de ventes partenaires</b-col>
      </b-row>
      <div v-if="getResult">
        <div >
          <h3 class="text-white m-4">Les catégories</h3>
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
                <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" class="card-img-top"
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
    this.getResultChilds = salesStores.lots
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