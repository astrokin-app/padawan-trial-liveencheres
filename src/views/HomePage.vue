<template>
  
    <!-- <b-img :src="transformImgExt('https://www.interencheres.com/asgard/images/home/big-header.webp?v=bdf5f59cdde9616e63fa6023c706628a')" fluid alt="Responsive image" style="width: -webkit-fill-available;"></b-img> -->
    <div class="row row-cols-1 row-cols-md-3 g-4">
  <div class="col">
    <div class="card">
      <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/041.webp" class="card-img-top"
        alt="Hollywood Sign on The Hill" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          This is a longer card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer.
        </p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/042.webp" class="card-img-top"
        alt="Palm Springs Road" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          This is a longer card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer.
        </p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp" class="card-img-top"
        alt="Los Angeles Skyscrapers" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to
          additional content.</p>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="card">
      <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/044.webp" class="card-img-top"
        alt="Skyscrapers" />
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">
          This is a longer card with supporting text below as a natural lead-in to
          additional content. This content is a little bit longer.
        </p>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'HomePage',
  // App data
  data() {
      return {
        webpSupported: true
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
    }
  },

  /**
   * When app is "created", we'll run some checks to see if the browser supports webp
   */
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