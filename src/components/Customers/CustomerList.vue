<template>
  <div class="q-pa-md">

    <q-table
      title="Treats"
      :data="users"
      :columns="columns"
      row-key="name"
      :separator="separator"
    >
    <template v-slot:top-left>
      
      <q-input dense debounce="300" color="primary" v-model="filter" >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
    </template>

    <template v-slot:body-cell-actions="props">
        <q-tr :props="props">
          <q-td key="actions" :props="props">
            <div class="q-gutter-sm">
              <q-toggle
                v-model="props.row.isEnable"
                @input="onToggleEnable(props.row)"
              />

              <q-btn size="md" color="negative" round icon="delete" @click="removeUser(props.row)">
                <q-tooltip>
                  Remove User
                </q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </q-tr>
      </template>
    
    </q-table>
  </div>
</template>
<script>
export default {
  mounted () {
    let params = {
      query: {
        email: {
          $ne: 'admin@admin.com'
        } 
      }
    }

    let usersService = this.$dbCon.wingsService('users', params)
    this.usersService = usersService

    usersService.on('dataChange', data => {
      this.users = data
    }).init()
  },
  data () {
    return {
      value: false,
      users: [],
      usersService: null,
      filter: '',
      separator: 'horizontal',

      columns: [
   
        { name: 'id', align: 'left', label: 'ID', field: '_id'},
        { name: 'lastName', align: 'left', label: 'Last Name', field: 'lastName', sortable: true },
        { name: 'firstName', align: 'left', label: 'First Name', field: 'firstName' },
        { name: 'email', align: 'left', label: 'Email', field: 'email' },
        { name: 'actions',align: 'left',  label: 'Actions'}
      ]
    }
  },
  methods: {
    removeUser (user) {
      this.$q.dialog({
        title: 'Remove User',
        message: 'Do you want to remove user?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        let id = user._id
        this.usersService.remove(id)
          .then(() => {
            this.$q.notify({
              message: 'User has been removed',
              icon: 'info',
              color: 'info'
            })
          })
          .catch(err => {
            console.log(err, 'error')
            this.$q.notify({
              message: 'An error occur',
              icon: 'error',
              color: 'negative'
            })
          })
      })
      
    },
    onToggleEnable (user) {
      let id = user._id
      this.usersService.patch(id, {
        isEnable: user.isEnable
      })
    }
  }
}
</script>