<template>
	<v-container fluid>
		<v-dialog v-model="dialog" max-width="500px">
			<v-card>
				<v-card-title>
					<span class="headline">{{ formTitle }} Person</span>
				</v-card-title>

				<validation-observer v-slot="{ handleSubmit }" ref="observer">
					<v-form @submit.prevent="handleSubmit(onSubmit)">
						<v-card-text>
							<v-container grid-list-md>
								<validation-provider
									v-slot="{ errors }"
									name="Email"
									rules="required|email"
								>
									<v-text-field
										v-model="email"
										label="Email"
										prepend-inner-icon="mdi-account-circle-outline"
										:readonly="action == 'Update' ? true : false"
                  	:filled="action == 'Update' ? true : false"
										:error-messages="errors[0]"
									/>
								</validation-provider>
								<validation-provider
									v-slot="{ errors }"
									name="Full Name"
									rules="required"
								>
									<v-text-field
										v-model="name"
										label="Full Name"
										prepend-inner-icon="mdi-account-circle-outline"
										:error-messages="errors[0]"
									/>
								</validation-provider>

								<validation-provider
									v-slot="{ errors }"
									name="Birthday"
									rules="required"
								>
									<v-menu
										v-model="menu"
										:close-on-content-click="false"
										:nudge-right="40"
										transition="scale-transition"
										offset-y
										min-width="auto"
									>
										<template v-slot:activator="{ on, attrs }">
											<v-text-field
												v-model="birthday"
												label="Birthday"
												prepend-icon="mdi-calendar"
												readonly
												v-bind="attrs"
												v-on="on"
												:error-messages="errors[0]"
											></v-text-field>
										</template>
										<v-date-picker
											v-model="birthday"
											@input="menu = false"
										></v-date-picker>
									</v-menu>
								</validation-provider>

								<validation-provider
									v-slot="{ errors }"
									name="Sex"
									rules="required"
								>
									<v-select
										v-model="selectSex"
										:items="sexs"
										label="Sex"
										prepend-inner-icon="mdi-gender-male-female"
										:error-messages="errors[0]"
									/>
								</validation-provider>

								<validation-provider
									v-slot="{ errors }"
									name="Designers"
									rules="required"
								>
									<v-combobox
										v-model="designers"
										item-value="name"
										item-text="name"
										:items="itemDesigners"
										label="Designers"
										multiple
										chips
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
        <h2 class="text-center">Persons</h2>
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
					New Person
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
						:items="persons.data"
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
		data() {
			return {
				dialog: false,
				formTitle: 'TEST',
				action: null,
				loading: true,
				persons: [],
				totalDatas: 2,
				options: {},
				search: '',
				headers: [
          { text: 'Name', align: 'start', value: 'name' },
					{ text: 'Email', value: 'email' },
					{ text: 'Sex', value: 'sex' },
          {
            text: 'Action',
            sortable: false,
            value: 'action',
          },
				],
				email: '',
				name: '',
				birthday: new Date().toISOString().substr(0, 10),
				menu: null,
				selectSex: null,
				sexs: ['Men', 'Male'],
				designers: [],
				itemDesigners: [],
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
				let uri = `${this.appConfig.$api_url}/api/master/persons?${this.query()}`
				this.axios.get(uri, {
					data: {},
					headers: {
						'Content-Type': 'application/json',
						Authorization: `bearer ${localStorage.getItem('token')}`,
					},
				})
					.then(response => {
						this.loading = false
						this.persons = response.data
						this.totalDatas = response.data.total_all
					})
					.catch((err) => {
						if (err.response.status === 401) {
              this.$router.push('/auth/logout')
            } else {
							this.$swal.fire({
								title: 'Error',
								text: err,
								icon: 'error',
							})
						}
					})
			},
			modalForm (param) {
        this.actionBtn(param)
        this.dialog = !this.dialog
        this.resetForm()
			},
			resetForm () {
				this.email = ''
				this.name = ''
				this.birthday = new Date().toISOString().substr(0, 10)
				this.selectSex = null
				this.designers = []
        this.$nextTick(() => {
          this.$refs.observer.reset()
				})
      },
			actionBtn (param) {
        switch (param.action) {
          case 'add':
            this.formTitle = 'New'
						this.action = 'Save'
						this.loadDesigners()
            break
          case 'edit':
            this.formTitle = 'Edit'
						this.action = 'Update'
						this.showAPI(param.id)
						this.loadDesigners()
						break
        }
			},
			loadDesigners () {
				let uri = `${this.appConfig.$api_url}/api/public/designers`
				this.axios.get(uri, {
					data: {},
					headers: {
						'Content-Type': 'application/json',
					},
				})
					.then(response => {
						this.itemDesigners = response.data.data.map(value => value.name)
					})
					.catch((err) => {
						if (err.response.status === 401) {
              this.$router.push('/auth/logout')
            } else {
							this.$swal.fire({
								title: 'Error',
								text: err,
								icon: 'error',
							})
						}
					})
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
				let uri = `${this.appConfig.$api_url}/api/master/person`
				this.axios.post(uri, { 
					email: this.email,
					name: this.name,
					sex: this.selectSex,
					birthday: this.birthday,
					designers: this.designers.join('|'),
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
							text: "Person created successfully",
							icon: 'success',
							timer: 1000
						})
					})
					.catch((err) => {
						if (err.response.status === 401) {
              this.$router.push('/auth/logout')
            } else {
							this.$swal.fire({
								title: 'Error',
								text: err,
								icon: 'error',
							})
						}
					})
			},
			showAPI (param) {
				let uri = `${this.appConfig.$api_url}/api/master/person/${param}`
				this.axios.get(uri, {
					data: {},
					headers: {
						'Content-Type': 'application/json',
						Authorization: `bearer ${localStorage.getItem('token')}`,
					},
				})
					.then(response => {
							this.email = response.data.email
							this.name = response.data.name
							this.birthday = response.data.birthday
							this.selectSex = response.data.sex
							this.designers = response.data.designers.split('|')
					})
					.catch((err) => {
						if (err.response.status === 401) {
              this.$router.push('/auth/logout')
            } else {
							this.$swal.fire({
								title: 'Error',
								text: err,
								icon: 'error',
							})
						}
					})
			},
			updateAPI () {
				let uri = `${this.appConfig.$api_url}/api/master/person/${this.email}`
				this.axios.put(uri, { 
					name: this.name,
					sex: this.selectSex,
					birthday: this.birthday,
					designers: this.designers.join('|'),
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
							text: "Person updated successfully",
							icon: 'success',
							timer: 1000
						})
					})
					.catch((err) => {
						if (err.response.status === 401) {
              this.$router.push('/auth/logout')
            } else {
							this.$swal.fire({
								title: 'Error',
								text: err,
								icon: 'error',
							})
						}
					})
			},
 			deleteAPI(param) {
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
									text: 'Person deleted successfully',
									icon: 'success',
									timer: 1000
							})
							let uri = `${this.appConfig.$api_url}/api/master/person/${param}`
							this.axios.delete(uri, {
								data: {},
								headers: {
									'Content-Type': 'application/json',
									Authorization: `bearer ${localStorage.getItem('token')}`,
								},
							}).then(response => {
									this.load()
							}).catch((err) => {
								if (err.response.status === 401) {
									this.$router.push('/auth/logout')
								} else {
									this.$swal.fire({
										title: 'Error',
										text: err,
										icon: 'error',
									})
								}
							})
						}
					})
			}
    }
  }
</script>