<template>
  <div>
    <q-card>
      <q-bar>
        <span>New Product</span>

        <q-space />

        <q-btn
          dense
          flat
          icon="close"
          v-close-popup>
          <!-- <q-tooltip>Close</q-tooltip> -->
        </q-btn>
      </q-bar>

      <q-card-section>

        <q-form
          @submit="onSubmit"
          ref="formRef">

          <div
            class="row">
            <div
              class="col-3 flex justify-center">
              <!-- <img :src="imageTest" alt=""> -->
              <q-uploader
                url="http://localhost:4444/upload"
                label="Product Image Gallery"
                multiple
                style="max-width: 300px; max-height: 700px;"
                ref="uploaderRef">
                <template v-slot:header="scope">
                  <div
                    class="row no-wrap items-center q-pa-sm q-gutter-xs">
                    <q-btn
                      v-if="scope.queuedFiles.length > 0"
                      icon="clear_all"
                      @click="scope.removeQueuedFiles"
                      round
                      dense
                      flat>
                      <q-tooltip>Clear All</q-tooltip>
                    </q-btn>
                    <q-btn
                      v-if="scope.uploadedFiles.length > 0"
                      icon="done_all"
                      @click="scope.removeUploadedFiles"
                      round
                      dense
                      flat>
                      <q-tooltip>Remove Uploaded Files</q-tooltip>
                    </q-btn>
                    <q-spinner
                      v-if="scope.isUploading"
                      class="q-uploader__spinner" />
                    <div
                      class="col">
                      <div
                        class="q-uploader__title">Product Gallery</div>

                    </div>
                    <q-btn
                      v-if="scope.canAddFiles"
                      type="a"
                      icon="add_box"
                      round
                      dense
                      flat>
                      <!-- <q-btn
                        v-if="scope.canUpload"
                        icon="cloud_upload"
                        @click="scope.upload"
                        round
                        dense
                        flat>
                        <q-tooltip>Upload Files</q-tooltip>
                      </q-btn> -->
                      <q-uploader-add-trigger />
                      <q-tooltip>Pick Files</q-tooltip>

                    </q-btn>

                    <q-btn
                      v-if="scope.isUploading"
                      icon="clear"
                      @click="scope.abort"
                      round
                      dense
                      flat>
                      <q-tooltip>Abort Upload</q-tooltip>
                    </q-btn>
                  </div>

                </template>
              </q-uploader>
            </div>

            <div
              class="col q-gutter-md">
              <q-input
                dense
                filled
                v-model="product.productName"
                label="Product Name"
                :rules="[val => !!val || 'Field is required']" />

              <q-input
                dense
                filled
                v-model="product.model"
                label="Model"
                :rules="[val => !!val || 'Field is required']" />

              <q-select
                dense
                filled
                emit-value
                v-model="product.category"
                :options="categories"
                label="Category"
                :rules="[val => !!val || 'Field is required']">
                <template v-slot:after>
                  <q-btn
                    dense
                    round
                    icon="add"
                    @click="newCategoryPrompt"></q-btn>
                </template>
              </q-select>

              <q-select
                dense
                filled
                v-model="product.brand"
                :options="brands"
                label="Brand"
                emit-value
                :rules="[val => !!val || 'Field is required']">
                <template v-slot:after>
                  <q-btn
                    dense
                    round
                    icon="add"
                    @click="newBrandPrompt"></q-btn>
                </template>
              </q-select>

              <q-select
                dense
                filled
                v-model="product.madeIn"
                :options="madeIns"
                label="Made in"
                emit-value
                :rules="[val => !!val || 'Field is required']">
                <template v-slot:after>
                  <q-btn
                    dense
                    round
                    icon="add"
                    @click="newMadeInPrompt"></q-btn>
                </template>
              </q-select>

              <q-input
                dense
                ref="input"
                filled
                v-model="product.finish"
                label="Finish/Color"
                :rules="[val => !!val || 'Field is required']" />

              <q-input
                dense
                ref="input"
                filled
                type="number"
                prefix="P "
                v-model="product.price"
                label="Price"
                :rules="[ val => parseFloat(val) >= 0 || 'Invalid Price']" />

              <q-input
                dense
                ref="input"
                filled
                type="number"
                v-model="product.stocks"
                label="Stocks"
                :rules="[ val => parseInt(val) >= 0 || 'Invalid Price']" />

                 <q-input
                  v-model="product.description"
                  filled
                  label="Description"
                  type="textarea"
                  dense
                  :rules="[val => !!val || 'Field is required']"
                />

              <q-select
                dense
                label="Features"
                filled
                v-model="product.features"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                new-value-mode="add-unique"
                :error="isFeatureError"
                error-message="Field is required"
                ref="featureRef" />

              <q-select
                dense
                label="Specifications"
                filled
                v-model="product.specifications"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                new-value-mode="add-unique"
                ref="specificationRef"
                :error="isSpeficicationError"
                error-message="Field is required" />
            </div>

          </div>

          <div>
            <q-btn
              @click="test"
              label="test"></q-btn>
            <q-btn
              label="Save"
              type="submit"
              color="primary" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'

import {
  QUploaderAddTrigger
} from 'quasar'


// import ImageTest from '../../../api/public/uploads/1570005125410-66200723_385828852060297_6394405859278979072_n.jpg'

export default {
  async created() {
    this.$store.dispatch('BackEndModule/populateCategories')
      .then(() => {
        this.$store.dispatch('BackEndModule/populateBrands')
          .then(() => {
            this.$store.dispatch('BackEndModule/populateMadeIns')
          })
      })
  },
  mounted() {
    this.categoryService = this.$dbCon.wingsService('categories')
    this.brandService = this.$dbCon.wingsService('brands')
    this.madeInService = this.$dbCon.wingsService('madeins')
    this.productService = this.$dbCon.wingsService('products')

    this.productService.on('uploadProgress', eventData => {
      debug("@uploadProgress ", eventData);
    });
  },
  components: {
    QUploaderAddTrigger
  },
  computed: {
    categories: {
      get() {
        let cat = this.$store.getters['BackEndModule/getCategories']
        return cat.map(d => {
          return {
            label: d.name,
            value: d.name
          }
        })
      },
      set(v) {
        this.$store.commit('BackEndModule/setCategories', v)
      }
    },
    brands: {
      get() {
        let brands = this.$store.getters['BackEndModule/getBrands']
          return brands.map(d => {
            return {
              label: d.name,
              value: d.name
            }
          })
        
      },
      set(v) {
        this.$store.commit('BackEndModule/setBrands', v)
      }
    },
    madeIns: {
      get() {
        let madeins = this.$store.getters['BackEndModule/getMadeIns']
        return madeins.map(d => {
          return {
            label: d.name,
            value: d.name
          }
        })
      },
      set(v) {
        this.$store.commit('BackEndModule/setMadeIns', v)
      }
    }

  },
  data() {
    return {
      // imageTest: ImageTest,
      isFeatureError: false,
      isSpeficicationError: false,
      categoryService: null,
      brandService: null,
      madeInService: null,
      productService: null,
      product: {
        productName: '',
        model: '',
        category: '',
        brand: '',
        madeIn: '',
        finish: '',
        price: 0,
        stocks: 0,
        description: '',
        features: [],
        specifications: []
      }
    }
  },
  methods: {
    test () {
      
      // console.log( this.$dbCon.auth, 'authe')
      
      this.$dbCon.authenticate()
      this.$dbCon.on('authenticated', status => {
        console.log(status, 'status')
      })
      
    },
    uploadFactory(files, updateProgress) {
      // console.log(files, 'files')
      const applyProgress = eventData => {
        // console.log(updateProgress)
      }
      this.productService.on('uploadProgress', applyProgress)
      return new Promise((resolve, reject) => {
        this.$axios.post('http:/localhost:3030/upload', FormData)
          .then(response => {
            this.productService.removeListener('uploadProgress')
            return resolve(file)
          })
          .catch(err => {
            console.log(err, 'err')
            return reject(err)
          })
      })
    },
    pickFile() {
      let test = this.$refs.uploaderRef.pickFiles
      console.log(this.$refs.uploaderRef.pickFiles(), test)
    },
    uploadProductImage() {
      return new Promise((resolve, reject) => {
        // console.log(this.$refs.uploaderRef, 'uploader')
        let files = this.$refs.uploaderRef.files
        let reader = new FileReader()
        console.log(files, 'files')
        let formData = new FormData()
        for (var i = 0; i < files.length; i++) {
          formData.append('files', files[i])
        }
        var token = ''
        this.$dbCon.authenticate()
        this.$dbCon.on('authenticated', status => {
          console.log(status, 'status')
          token = status.accessToken
          console.log(token, 'token')
          // console.log(formData.getAll('files'), 'formdata')
          this.$axios.post('/upload',
          formData,
          {
            headers: {
              "Authorization" : `Bearer ${status.accessToken}`,
              'Content-Type': 'multipart/form-data' 
            }
          }).then(res=> {
            console.log(res, 'respones')
            resolve(res.data)
          }).catch(err => {
            console.log(err, 'err')
            reject(err)
            return
          })
        })
        
      })
      
     
      // console.log(files[0], 'files')
      // this.productService.create({ uri: files }, {
      //           headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })
      //   .then(response => {
      //     console.log(response, 'response')
      //   })
      //   .catch(err => {
      //     console.log(err, 'err')
      //   })
      // reader.readAsDataURL(files[0])
      // let $v = this
      // reader.addEventListener('load', function () {
      //   // console.log('encoded file: ', reader.result);
      //   // console.log(this.productService, 'service')
      //   $v.productService.create({
      //       uri: files
      //     }, {
      //       headers: {
      //         'Content-Type': 'multipart/form-data',
      //       },
      //     })
      //     .then(response => {
      //       console.log(response, 'response')
      //     })
      //     .catch(err => {
      //       console.log(err, 'err')
      //     })
      // }, false);
      // console.log(test, 'tes')
      // this.productService.create({
      //     productImage: files
      //   })
      //   .then(res => {
      //     console.log(res, 'res')
      //   })
      //   .catch(err => {
      //     console.log(err, 'err')
      //   })
    },
    async saveProduct () {
      let uploadedFiles = await this.uploadProductImage()
      console.log(uploadedFiles, 'finished upload return value')
      let product = {
        productImages: uploadedFiles,
        ...this.product
      }
      this.productService.create(product)
        .then(response => {
          // console.log('product has been savesd', response)
          this.$q.notify({
            icon: 'info',
            message: 'Product has been saved',
            color: 'positive'
          })
          this.clearFields()
        })
        .catch(err => {
          console.log(err, 'error')
        })
    },
    onSubmit() {
      let $v = this
      this.$refs.formRef.validate()
        .then((success) => {
          if (success) {
            // console.log(this.$refs.featureRef, 'ref')
            if (this.$refs.uploaderRef.files.length != 0) {
              this.$q.dialog({
                title: 'Confirm',
                message: 'Do you want to save?',
                cancel: true,
                persistent: true
              }).onOk(() => {
                // console.log(this.product, 'products')
                $v.saveProduct()
              })
            } else {
              this.$q.notify({
                icon: 'info',
                message: 'Please add product image',
                color: 'negative'
              })
            }
          } else {
            console.log('please validat')
          }
        })
    },
    clearFields () {
      this.$refs.uploaderRef.reset()
      this.product = {
        productName: '',
        model: '',
        category: '',
        brand: '',
        madeIn: '',
        finish: '',
        price: 0,
        stocks: 0,
        description: '',
        features: [],
        specifications: []
      }
      this.$store.commit('BackEndModule/setNewProductDialog', false)
    },
    newMadeInPrompt() {
      this.$q.dialog({
        message: 'Country Name',
        prompt: {
          model: '',
          type: 'text'
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        console.log(data, 'data')
        this.madeInService.create({
            name: data
          })
          .then((res) => {
            this.$store.dispatch('BackEndModule/populateMadeIns')
            this.product.madeIn = res.name
          })
          .catch(err => {
            console.log(err, 'err')
          })
      })
    },
    newBrandPrompt() {
      this.$q.dialog({
        message: 'Brand Name',
        prompt: {
          model: '',
          type: 'text'
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        this.brandService.create({
            name: data
          })
          .then((res) => {
            this.$store.dispatch('BackEndModule/populateBrands')
            this.product.brand = res._id
          })
          .catch(err => {
            console.log(err, 'err')
          })
      })
    },
    newCategoryPrompt() {
      this.$q.dialog({
        message: 'Category Name',
        prompt: {
          model: '',
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        this.categoryService.create({
            name: data
          })
          .then(res => {
            this.$store.dispatch('BackEndModule/populateCategories')
            this.product.category = res._id
          })
          .catch(err => {
            console.log(err, 'err')
          })
      })
    }
  }
}
</script>
