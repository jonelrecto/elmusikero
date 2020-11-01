<template>
  <q-page>
    <div>
      <!-- <q-btn label=":test" @click="test"></q-btn> -->
        <q-carousel
        arrows
          height="550px"
          animated
          v-model="slide"
          navigation
          infinite
          autoplay
          transition-prev="slide-right"
          transition-next="slide-left"
          ref="carousel"
        >
          <q-carousel-slide v-for="(slide, i) in takeThree" :key="slide._id" :name="i+1" img-src class="bg-teal-11">
            <div class="row flex items-end">
              <div class style=" margin-left:20%;">
                <p class="text-subtitle2">{{ slide.category }}</p>
                <strong class="text-h6">{{ slide.productName }}</strong>
                <p class="text-subtitle2">{{ slide.price | currency }}</p>
                <q-btn
                  class="bg-white text-primary"
                  rounded
                  icon="shopping_cart"
                  label="Add to cart"
                  @click="addToCart(slide)"
                ></q-btn>
              </div>
              <img style=" height: 500px" :src="getImage(slide.productImages[0].newNameWithPath)" alt />
            </div>
          </q-carousel-slide>
        </q-carousel>

        <div class="text-center q-pa-md">
          <span class="text-h4 text-center">Featured Products</span>
          <div class="row flex wrap self-start justify-center q-ma-md">
            <q-card v-for="featured in takeLastFive" :key="featured._id" class="col-3 bg-blue-grey-1 q-pa-md q-mr-md" squared flat>
              <q-img :src="getImage(featured.productImages[0].newNameWithPath)" basic></q-img>

              <q-card-actions>
                <q-btn rounded flat no-caps icon-right="arrow_right_alt" @click="$router.push(`/productinfo/${featured._id}`)">
                  More info
                  <br />
                </q-btn>
              </q-card-actions>
            </q-card>
          </div>
        </div>
      </div>
  </q-page>
</template>
<script>
export default {
  name: 'HomePage',
  mounted () {
    let productService = this.$dbCon.wingsService('products')
    this.productService = productService

    productService.on('dataChange', data => {
      // console.log(data, 'data change')
      this.products = data
    }).init()
  },
  data() {
    return {
      products: [],
      productService: null,
      leftDrawer: true,
      slide: 1
    }
  },
  computed: {
    takeLastFive () {
      return this.$_.takeRight(this.products, 5)
    },
    takeThree () {
      return this.$_.take(this.products, 3)
    },
    cartList () {
      return this.$store.getters['ClientModule/getCartList']
    }
  },
  methods: {
    addToCart (slide) {
      slide.quantity = 1
      slide.total = slide.quantity * slide.price
      this.$store.commit('ClientModule/setCartList', slide)
      // console.log(this.$store.state.ClientModule.cartList)
      this.$router.push('/cart')
    },
    getImage (url) {
      return url ? 'http://localhost:3030/uploads/' + url.replace('public\\uploads\\', '') : require('../../assets/empty-image.png')
    }
  }
}
</script>
