<template>
  <q-page>
    <div class="row flex" >

       <q-splitter
      v-model="splitterModel"
      style="height: 650px"
    >

      <template v-slot:before>
        <div class="col-6 q-pa-md bg-teal-11">
          <!-- <q-btn @click="test">test</q-btn> -->
          <q-breadcrumbs>
            <q-breadcrumbs-el  @click="$router.push('/')" >
              <a href="#">Home</a>
            </q-breadcrumbs-el>
            <q-breadcrumbs-el :label="product.category" />
          </q-breadcrumbs>
          <div>
            <q-carousel
              swipeable
              animated
              v-model="slide"
              transition-prev="slide-down"
              transition-next="slide-up"
              ref="carousel"
            >
              <q-carousel-slide v-for="(images, i) in product.productImages" :key="i" :name="i+1" class="row justify-center">
                <img style=" height: 100%" :src="$store.getters['BackEndModule/getImage'](images.newNameWithPath)" alt />
              </q-carousel-slide>

              <!-- <q-carousel-slide :name="2" class="row justify-center">
                <img style=" height: 100%" src="../../statics/carouselItems/eguitar.png" alt />
              </q-carousel-slide> -->

              <template v-slot:control>
                <q-carousel-control
                  position="top-left"
                  :offset="[0, 200]"
                  class="q-gutter-xs flex justify-center"
                  style="width: 50px;"
                >
                  <q-btn
                    class="row"
                    round
                    dense
                    color="white"
                    text-color="black"
                    icon="keyboard_arrow_up"
                    @click="$refs.carousel.previous()"
                  />
                  <div>
                    <q-icon v-for="(dot, i) in product.productImages" :key="i" class="row q-pa-md" name="mdi-circle" />
                    <!-- <q-icon class="row q-pa-md" name="mdi-circle-outline" />
                    <q-icon class="row q-pa-md" name="mdi-circle-outline" /> -->
                  </div>

                  <q-btn
                    class="row"
                    push
                    round
                    dense
                    color="white"
                    text-color="black"
                    icon="keyboard_arrow_down"
                    @click="$refs.carousel.next()"
                  />
                </q-carousel-control>
              </template>
            </q-carousel>

            <div class="q-pa-md flex self-start" style="margin-left: 100px; ">
              <div class="col">
                <p class="text-subtitle2">{{product.category}}</p>
                <strong class="text-bold text-h5">{{product.name}}</strong>
                <p class="text-weight-bold text-subtitle1">{{product.price | currency}}</p>
              </div>
              <div class="col text-center self-center">
                <q-btn
                  style="width: 150px"
                  size="15px"
                  push
                  class="bg-white text-black"
                  rounded
                  label="Buy"
                  @click="addToCart"
                ></q-btn>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template v-slot:after>
        <div class="col">
          <div class="q-ma-md q-pa-md flex self-center">

            <div class="q-pa-md">
              <p class="text-bold">Description</p>
              <!-- <read-more more-str="read more" :text="product.description" link="#" less-str="read less" :max-chars="500"></read-more> -->

              <span>
                <!-- {{false ? product.description.slice(0, 500) : product.description}} -->
                <p v-if="isReadMore">{{product.description.slice(0, 500)}}</p>
                <p v-else>{{product.description}}</p>
                <q-btn flat size="sm" no-caps align="left" @click="isReadMore = !isReadMore">
                  <p v-if="!isReadMore"> Read More</p>
                  <p v-else> Read Less</p>
                </q-btn>
                
              </span>
            </div>

            <div v-if="product.specification" class="q-pa-md">
              <p class="text-bold">Specification</p>
              <q-markup-table flat>
                <tbody>
                  <tr v-for="(spec, i) in product.specification" :key="i">
                    <td class="text-bold text-left">Dimensions</td>
                    <td class="text-right">100 x 100 x 100</td>
                  </tr>
                  <!-- <tr>
                    <td class="text-bold text-left">Material</td>
                    <td class="text-center">
                      <p>porta cursus</p>
                      <p> ut eleifend diam </p>
                      <p>Integer tempus</p>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-bold  text-left">Style</td>
                    <td class="text-right">262</td>
                  </tr> -->
                  
                </tbody>
              </q-markup-table>
            </div>

            <div v-if="product.features" class="q-pa-md">
              <p class="text-bold">Features</p>
              <q-markup-table flat>
                <ul v-for="(feature, i) in product.features" :key="i">
                  <li class="text-left">{{feature}}</li>
                </ul>
              </q-markup-table>
            </div>
          </div>
          <div></div>
        </div>
      </template>

    </q-splitter>

      
      
    </div>
  </q-page>
</template>
<script>
export default {
  name: "ProductInfo",
  created () {
    this.productId = this.$route.params.id
  },
  async mounted () {
    let params = {
      query: {
        _id: this.productId
      }
    }
    let productService = this.$dbCon.wingsService('products', params)
    
     productService.on('dataChange', data => {
      // console.log(data, 'data change')
      this.product = data[0]
    }).init()
  },
  data() {
    return {
      isReadMore: false,
      splitterModel: 50,
      product: {},
      productId: '',
      productService: null,
      slide: 1
    }
  },
  methods: {
    test () {
      this.isReadMore = !this.isReadMore
      console.log(this.product, this.isReadMore)
    },
    addToCart () {
      this.product.quantity = 1
      this.product.total = this.product.quantity * this.product.price
      this.$store.commit('ClientModule/setCartList', this.product)
      this.$router.push('/cart')
    }
  }
};
</script>
