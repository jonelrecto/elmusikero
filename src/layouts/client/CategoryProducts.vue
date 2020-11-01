<template>
  <q-page class="">
    <!-- <q-btn @click="test">test</q-btn> -->
    <div class="row flex justify-center ">
      <div class="col-3 q-px-md">
        <q-list dense bordered >
          <q-input v-model="search" input-class="text-right">
            <template v-slot:append>
              <q-icon v-if="search === ''" name="search" />
              <q-icon v-else name="clear" class="cursor-pointer" @click="search = ''" />
            </template>
          </q-input>

          <q-item-label header>Categories</q-item-label>
          <q-item v-for="cat in categories" :key="cat._id" clickable v-ripple :to="`/categorized/${cat.name}`">
            <q-item-section>
              {{ cat.name }}
            </q-item-section>
          </q-item>


          <q-item-label header>Brands</q-item-label>
          <q-item v-for="brand in brands" :key="brand._id" clickable v-ripple>
            <q-item-section>
              {{brand.name}}
            </q-item-section>
          </q-item>

        </q-list>
      </div>
      <div class="col flex items-center justify-center">
        <div v-if="products && !products.length > 0">
          <span class="text-h4">No product available</span>
        </div>
        
        <q-card v-else v-for="(product, index) in products" :key="product._id" class="my-card q-ma-md">
          <q-carousel
              swipeable
              animated
              :value="productSlideState[index]"
              thumbnails
              infinite
              @input="val => { onChangeSlide(val, index) }"
            >
              <q-carousel-slide v-for="(image, i) in product.productImages" :key="i" :name="i+1" :img-src="$store.getters['BackEndModule/getImage'](image.newNameWithPath)" />
            </q-carousel>
          <q-card-section>
            <div class="text-h6" @click="$router.push(`/productinfo/${product._id}`)" style="cursor: pointer">{{ product.productName }}</div>
            <div class="text-subtitle2">Price {{product.price | currency}}</div>
            <q-rating
             v-if="product.rating"
              v-model="ratingModel"
              size="1.5em"
              icon="star"
            />
            <p v-else class="text-caption">No ratings yet</p>
          </q-card-section>

        </q-card>
      </div>
    </div>
  </q-page>
</template>
<script>
import { mapGetters } from 'vuex'


export default {
  async created() {


    this.$store.dispatch('BackEndModule/populateCategories')
      .then((resp) => {
        console.log(resp, 'resp')
        this.$store.dispatch('BackEndModule/populateBrands')
          .then(() => {
            this.$store.dispatch('BackEndModule/populateMadeIns')
          })
      })
  },
  async mounted () {
    this.categoryParams = this.$route.params.category
      let params = {
        query: {
          category: this.categoryParams
        }
      }
      let productService = this.$dbCon.wingsService('products', params)
      
      productService.on('dataChange', data => {
        // console.log(data, 'data change')
        this.products = data
        this.productSlideState = []
        for (var i = 0; i < this.products.length; i++) {
          this.productSlideState.push(1)
        }
      }).init()
    
  },
  data () {
    return {
      productSlideState: [],
      categoryParams: '',
      productService: null,
      products: [],
      search: '',
      ratingModel: 3,
      slide: 1
    }
  },
  watch:{
    ['$route.params.category'] () {
      this.categoryParams = this.$route.params.category
      let params = {
        query: {
          category: this.categoryParams
        }
      }
      let productService = this.$dbCon.wingsService('products', params)
      
      productService.on('dataChange', data => {
        // console.log(data, 'data change')
        this.products = data
        this.productSlideState = []
        for (var i = 0; i < this.products.length; i++) {
          this.productSlideState.push(1)
        }
      }).init()
    }
  },
  computed: {
    ...mapGetters({ categories: 'BackEndModule/getCategories' }),
    ...mapGetters({ brands: 'BackEndModule/getBrands' })
  },
  methods: {
    test () {
      // this.productSlideState.push(1)

      console.log('cates', this.categoryParams)
      
    },
    onChangeSlide (value, index) {
      this.productSlideState[index] = value
      this.$forceUpdate()
    },
    getCarouselIndex (index) {
      console.log(index, 'index')
    }
  }
}
</script>
<style scoped>
.my-card {
  width: 100%;
  max-width: 280px
}
  
</style>