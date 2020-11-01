<template>
  <div>
   <q-card>
        <q-carousel
          animated
          v-model="slide"
          arrows
          navigation
          infinite
          height="300px"
        >
          <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
          <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
          <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
          <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
          <template v-slot:control>
            

            <q-carousel-control
              position="top-left"
              :offset="[18, 18]"
              class="q-gutter-xs"
            >
            
              <q-btn round dense color="white" text-color="black" icon="collections" />
              
            </q-carousel-control>

            <q-carousel-control
              position="top-right"
              :offset="[0,0]"
              class="q-gutter-xs"
            >
              <q-btn
                round dense flat color="white" text-color="black" icon="close"
                @click="$store.commit('BackEndModule/setViewProductDialog', false)"
              />
              
            </q-carousel-control>
          </template>
        </q-carousel>
        <q-separator />
        <q-card-section>
          <q-btn
            size="xs"
            fab
            color="info"
            icon="edit"
            class="absolute"
            style="top: 0; right: 12px; transform: translateY(-50%);"
          />

          

          <div class="row q-gutter-md">
            <div class="col-5">
              <q-input dense label="Product Name"></q-input>
              <q-input dense label="Model"></q-input>
              <q-select dense :value="value" label="Category" :options="[]"></q-select>
              <q-select dense :value="value" label="Brand" :options="[]"></q-select>
              <q-select dense :value="value" label="MadeIn" :options="[]"></q-select>
              <q-input dense label="Stocks" type="number"></q-input>
              <q-input dense label="Price" type="number"></q-input>
            </div>
            <div class="col">
              <q-input dense type="textarea" label="Description"></q-input>
            <q-input dense label="Finish/Color"></q-input>
            <q-select
                dense
                label="Features"
                filled
                v-model="value"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                new-value-mode="add-unique"
                error-message="Field is required"
                ref="featureRef" />

              <q-select
                dense
                label="Specifications"
                filled
                v-model="value"
                use-input
                use-chips
                multiple
                hide-dropdown-icon
                input-debounce="0"
                new-value-mode="add-unique"
                ref="specificationRef"
                error-message="Field is required" />
            </div>
            
            
          </div>

        </q-card-section>

     

       
      </q-card>

     
  </div>
</template>
<script>
export default {
  data () {
    return {
      slide: 1,
      value: '',
    }
  },
  computed: {
  }
}
</script>