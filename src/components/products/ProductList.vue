<template>
  <div class="q-pa-md full-width"> 
    <q-table
      title="Treats"
      :data="products"
      :columns="columns"
      row-key="name"
      separator="horizontal"
      :filter="searchFilter"
    >
    <template v-slot:top-left>
      <q-input borderless dense debounce="300" color="primary" v-model="searchFilter" label="Search Product">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
    </template>
    
     <template v-slot:top-right>
        <q-btn color="secondary" icon="mdi-plus" label="New Product" @click="newProductDialog = true"/>
        <!-- <q-btn label="test" @click="$store.commit('BackEndModule/setViewProductDialog', true)"></q-btn> -->
      </template>

      <template v-slot:body="props">
        <q-tr :props="props">
          <q-td key="productImages" :props="props" style="width: 200px">
            <!-- {{ props.row.productImages[0] }} -->
            <!-- {{getImage(props.row.productImages[0].orignalName)}} -->
            <!-- <img v-bind:src="getImage(props.row.productImages[0].newNameWithPath)" /> -->
             <q-img
            :src="getImage(props.row.productImages[0].newNameWithPath)"
            spinner-color="white"
            style="height: 140px; max-width: 300px"
          />
          </q-td>
          <q-td key="productName" :props="props">{{ props.row.productName }}</q-td>
          <q-td key="model" :props="props">{{ props.row.model }}</q-td>
          <q-td key="category" :props="props">{{ props.row.category }}</q-td>
          <q-td key="price" :props="props">{{ props.row.price }}</q-td>
          <q-td key="stocks" :props="props">{{ props.row.stocks }}</q-td>
          <q-td key="actions" :props="props">
            <div class="q-gutter-md">
              <q-btn @click="updateProduct(props.row._id)" rounded icon="mdi-pencil" dense color="info"></q-btn>
              <q-btn @click="removeProduct(props.row._id)" rounded icon="delete" dense color="negative"></q-btn>
            </div>
            
          </q-td>
        </q-tr>
      </template>
    </q-table>

    <!-- new product dialog -->
    <q-dialog v-model="newProductDialog" maximized>
      <new-product-dialog></new-product-dialog>
    </q-dialog>

    <q-dialog v-model="viewProductDialog" persistent full-width>
      <view-product-dialog></view-product-dialog>
    </q-dialog>

  </div>
</template>
<script>
import NewProductDialog from '../products/NewProductDialog'
import ViewProductDialog from '../products/ViewProductDialog'
import ImageTest from '../../../api/public/uploads/1570381065503-beatles-vector-bass-drum-2.png'


export default {
  components: {
    NewProductDialog,
    ViewProductDialog
  },
  async created () {
  },
  mounted () {
    let productService = this.$dbCon.wingsService('products')
    this.productService = productService
    // productService.find({})
    //   .then(resp => {
    //     console.log(resp, 'res')
    //   })

    productService.on('dataChange', data => {
      console.log(data, 'data change')
      this.products = data
    }).init()
    
  },
  computed: {
    viewProductDialog: {
      get () {
        return this.$store.getters['BackEndModule/getViewProductDialog']
      },
      set (v) {
        this.$store.commit('BackEndModule/setViewProductDialog', v)
      }
    },
    newProductDialog: {
      get () {
        return this.$store.getters['BackEndModule/getNewProductDialog']
      },
      set (v) {
        this.$store.commit('BackEndModule/setNewProductDialog', v)
      }
    }
  },
  data () {
    return {
      searchFilter: '',
      productService: null,
      filter: '',
      columns: [
        { name: 'productImages', align: 'center', label: 'Image', field: 'productImageGallery' },
        { name: 'productName', label: 'Product Name', field: 'productName', sortable: true },
        { name: 'model', label: 'Model', field: 'model', sortable: true },
        { name: 'category', label: 'Category', field: 'category', sortable: true },
        { name: 'price', label: 'Price', field: 'price', sortable: true },
        { name: 'stocks', label: 'Stocks', field: 'stocks', sortable: true },
        { name: 'actions', label: 'Actions', align: 'center'}
      ],
      products: []
    }
  },
  methods: {
    test () {
      console.log(this.viewProductDialog, 'd')
    },
    updateProduct (id) {

    },
    getImage (url) {
      console.log('url', url.replace(/\\/g, '/'))
      // let passUrl = url.replace(/\\/g, '/')
      // console.log(passUrl, 'test')
      // let imageUrl = '\''+'../../../api/public/uploads/1570381065503-beatles-vector-bass-drum-2.png'+'\''
      // import ImageTest from '../../../api/public/uploads/1570381065503-beatles-vector-bass-drum-2.png'
      // console.log(ImageTest, 'imagetest')
      // return '../../../api/public/uploads/1570381065503-beatles-vector-bass-drum-2.png'
      // let toReturn = require.context('../../../api/', false, /\.png$/)
      // return url ? require('../../../api/' + url.replace(/\\/g, '/')) : ''
      // return require(`${passUrl}`)
      // let toPass = require(`../../../api/`)
      // console.log(`../../../api/${url.replace(/\\/g, '/')}`, 'topas')
      // return require(`../../../api/public/uploads/1570381065503-beatles-vector-bass-drum-2.png`)
      // return 'http://localhost:3030/uploads/' + result
      return url ? 'http://localhost:3030/uploads/' + url.replace('public\\uploads\\', '') : require('../../assets/empty-image.png')
    },
    removeProduct (id) {
      // console.log(id, 'id')
      this.productService.remove(id)
        .then(resp => {
          // console.log(resp, 'res')
        })
    }
  }
}
</script>