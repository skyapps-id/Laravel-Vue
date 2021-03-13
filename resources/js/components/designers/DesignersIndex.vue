<template>
	<v-container fluid>
		<v-dialog v-model="dialog" max-width="500px">
			<v-card>
				<v-card-title>
					<span class="headline">{{ formTitle }} Designer</span>
				</v-card-title>

				<validation-observer v-slot="{ handleSubmit }" ref="observer">
					<v-form @submit.prevent="handleSubmit(onSubmit)">
						<v-card-text>
							<v-container grid-list-md>
								<validation-provider
									v-slot="{ errors }"
									name="Name"
									rules="required"
								>
									<v-text-field
										v-model="name"
										label="Name"
										prepend-inner-icon="mdi-cards"
										:error-messages="errors[0]"
									/>
								</validation-provider>
							</v-container>
						</v-card-text>

						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="blue darken-1" @click="dialog = false">Cancel</v-btn>
							<v-btn color="blue darken-1" type="submit">{{ action }}</v-btn>
						</v-card-actions>
					</v-form>
				</validation-observer>
			</v-card>
		</v-dialog>

    <v-row align="start" justify="center">
      <v-col cols="12">
        <h2 class="text-center">Designers</h2>
      </v-col>
    </v-row>
		<v-row>
			<v-col
				class="d-flex align-center"
				md="4"
			>
				<v-btn
					small
					color="primary"
					@click="modalForm({action: 'add'})"
				>
					<v-icon dark>
						mdi-plus
					</v-icon>
					New Designer
				</v-btn>
			</v-col>
			<v-col
				class="ml-auto d-flex align-center"
				md="4"
			>
				<v-row no-gutters>
					<v-col md="8">
						<v-text-field
							v-model="search"
							append-icon="mdi-magnify"
							label="Search"
						/>
					</v-col>
				</v-row>
			</v-col>
		</v-row>

		<v-divider class="mt-1" />
    <v-row align="start" justify="start">
      <v-col md="12">
        <v-card class="mx-auto">
					<v-data-table
						:options.sync="options"
						:server-items-length="totalDatas"
						:headers="headers"
						:items="designers.data"
						:search="search"
						:loading="loading"
					>
						<template v-slot:item.action="{ item }">
							<v-btn-toggle
								mandatory
							>
								<v-btn
									small
									color="cyan"
									default
									@click="modalForm({action: 'edit', id: item.id})"
								>
									Edit
								</v-btn>
								<v-btn
									small
									color="secondary"
									default
									@click="deleteAPI(item.id)"
								>
									Delete
								</v-btn>
							</v-btn-toggle>
						</template>
					</v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
 
<script>
  import queryString from 'query-string'

  export default {
		data () {
			return {
				dialog: false,
				formTitle: 'TEST',
				action: null,
				loading: true,
				designers: [],
				totalDatas: 2,
				options: {},
				search: '',
				headers: [
          { text: 'Name', align: 'start', value: 'name' },
          {
            text: 'Action',
            sortable: false,
            value: 'action',
          },
				],
				id: '',
				name: '',
				menu: null,
			}
		},
		computed: {
      params (nv) {
        return {
          ...this.options,
          query: this.search,
        }
      },
    },
    watch: {
      params: {
        handler () {
          this.load()
        },
        deep: true,
      },
    },
    mounted () {
      this.load()
    },
    methods: {
			query () {
        return queryString.stringify({
          q: this.search,
          page: this.options.page,
          limit: this.options.itemsPerPage,
          sortBy: this.options.sortBy,
          sortDesc: this.options.sortDesc,
        }, {
          skipEmptyString: true,
        })
      },
			load () {
				let uri = `${this.appConfig.$api_url}/api/master/designers?${this.query()}`;
				this.axios.get(uri, {
					data: {},
					headers: {
						'Content-Type': 'application/json',
						Authorization: `bearer ${localStorage.getItem('token')}`,
					},
				})
					.then(response => {
						this.loading = false
						this.designers = response.data;
						this.totalDatas = response.data.total_all
					})
					.catch((err) => {
						this.$swal.fire({
							title: 'Error',
							text: err,
							icon: 'error',
						})
					})
			},
			modalForm (param) {
        this.actionBtn(param)
        this.dialog = !this.dialog
        this.resetForm()
			},
			resetForm () {
				this.id = ''
				this.name = ''
        this.$nextTick(() => {
          this.$refs.observer.reset()
				})
      },
			actionBtn (param) {
        switch (param.action) {
          case 'add':
            this.formTitle = 'New'
						this.action = 'Save'
            break
          case 'edit':
            this.formTitle = 'Edit'
						this.action = 'Update'
						this.showAPI(param.id)
						break
        }
			},
			onSubmit (data) {
        switch (this.action) {
          case 'Save':
            this.createAPI()
            break
          case 'Update':
            this.updateAPI()
            break
        }
      },
			createAPI () {
				let uri = `${this.appConfig.$api_url}/api/master/designer`
				this.axios.post(uri, { 
					name: this.name,
				},
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `bearer ${localStorage.getItem('token')}`,
					}
				})
					.then(response => {
						this.dialog = false
						this.load()
						this.$swal.fire({
							title: 'Success',
							text: "Designer created successfully",
							icon: 'success',
							timer: 1000
						})
					})
					.catch((err) => {
						this.$swal.fire({
							title: 'Error',
							text: err,
							icon: 'error',
						})
					})
			},
			showAPI (param) {
				let uri = `${this.appConfig.$api_url}/api/master/designer/${param}`
				this.axios.get(uri, {
					data: {},
					headers: {
						'Content-Type': 'application/json',
						Authorization: `bearer ${localStorage.getItem('token')}`,
					},
				})
					.then(response => {
							this.id = response.data.id
							this.name = response.data.name
					})
					.catch((err) => {
						this.$swal.fire({
							title: 'Error',
							text: err,
							icon: 'error',
						})
					})
			},
			updateAPI () {
				let uri = `${this.appConfig.$api_url}/api/master/designer/${this.id}`
				this.axios.put(uri, { 
					name: this.name,
				}, 
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `bearer ${localStorage.getItem('token')}`,
					}
				})
					.then(response => {
						this.dialog = false
						this.load()
						this.$swal.fire({
							title: 'Success',
							text: "Designer updated successfully",
							icon: 'success',
							timer: 1000
						})
					})
					.catch((err) => {
						this.$swal.fire({
							title: 'Error',
							text: err,
							icon: 'error',
						})
					})
			},
 			deleteAPI (param) {
				this.$swal.fire({
					title: 'Are you sure?',
					text: "If you delete it, the data will not come back again.",
					icon: 'warning',
					showCancelButton: true,
					confirmButtonColor: '#3085d6',
					cancelButtonColor: '#d33',
					confirmButtonText: 'Yes',
					cancelButtonText: 'No'
					})
					.then((result) => {
						if (result.value) {
							this.$swal.fire({
									title: 'Success!',
									text: 'Designer deleted successfully',
									icon: 'success',
									timer: 1000
							})
							let uri = `${this.appConfig.$api_url}/api/master/designer/${param}`
							this.axios.delete(uri, {
								data: {},
								headers: {
									'Content-Type': 'application/json',
									Authorization: `bearer ${localStorage.getItem('token')}`,
								},
							})
								.then(response => {
										this.load()
								})
								.catch((err) => {
									this.$swal.fire({
										title: 'Error',
										text: err,
										icon: 'error',
									})
								})
						}
					})
			}
    }
  }
</script>