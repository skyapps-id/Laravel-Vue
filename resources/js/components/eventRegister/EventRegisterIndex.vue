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
										:error-messages="errors[0]"
									/>
								</validation-provider>

								<validation-provider
									v-slot="{ errors }"
									name="Event"
									rules="required"
								>
									<v-select
										v-model="eventId"
										:items="itemEvent.data"
										item-value="id"
										item-text="code"
										label="Event"
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
        <h2 class="text-center">Event Register</h2>
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
					Event Register
				</v-btn>
			</v-col>
			<v-col
				class="ml-auto d-flex align-center"
				md="4"
			>
				<v-row no-gutters>
					<v-col md="4">
						<v-select
							v-model="options.event"
							:items="itemEvent.data"
							item-value="id"
							item-text="code"
							label="Event"
							prepend-inner-icon="mdi-cards"
						/>
					</v-col>
					<v-col md="4">
						<v-select
							v-model="options.status"
							:items="itemStatus"
							item-value="id"
							item-text="name"
							label="Status"
							prepend-inner-icon="mdi-account-clock"
						/>
					</v-col>
					<v-col md="4">
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
						:items="eventRegister.data"
						:search="search"
						:loading="loading"
					>
						<template v-slot:item.action="{ item }">
							<v-btn-toggle
								mandatory
							>
								<v-btn
									small
									color="primary"
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
				eventRegister: [],
				totalDatas: 2,
				options: {},
				search: '',
				headers: [
          { text: 'Email', align: 'start', value: 'email' },
					{ text: 'Event', value: 'event.code' },
					{ text: 'Status', value: 'status.name' },
          {
            text: 'Action',
            sortable: false,
            value: 'action',
          },
				],
				id: '',
				email: '',
				eventId: null,
				menu: null,
				itemEvent: [],
				itemStatus: [],
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
			this.loadEvent()
			this.loadStatus()
    },
    methods: {
			query () {
        return queryString.stringify({
          q: this.search,
          event: this.options.event,
          status: this.options.status,
          page: this.options.page,
          limit: this.options.itemsPerPage,
          sortBy: this.options.sortBy,
          sortDesc: this.options.sortDesc,
        }, {
          skipEmptyString: true,
        })
      },
			load () {
				let uri = `${this.appConfig.$api_url}/api/event/registers?${this.query()}`
				this.axios.get(uri, {
					data: {},
					headers: {
						'Content-Type': 'application/json',
						Authorization: `bearer ${localStorage.getItem('token')}`,
					},
				})
					.then(response => {
						this.loading = false
						this.eventRegister = response.data
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
			loadEvent () {
				let uri = `${this.appConfig.$api_url}/api/master/events`
				this.axios.get(uri, {
					data: {},
					headers: {
						'Content-Type': 'application/json',
						Authorization: `bearer ${localStorage.getItem('token')}`,
					},
				})
					.then(response => {
						this.itemEvent = response.data
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
			loadStatus () {
				let uri = `${this.appConfig.$api_url}/api/master/statuses`
				this.axios.get(uri, {
					data: {},
					headers: {
						'Content-Type': 'application/json',
						Authorization: `bearer ${localStorage.getItem('token')}`,
					},
				})
					.then(response => {
						this.itemStatus = response.data
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
				this.id = ''
				this.email = ''
				this.name = ''
				this.eventId = null
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
				let uri = `${this.appConfig.$api_url}/api/event/register`
				this.axios.post(uri, { 
					email: this.email,
					event_id: this.eventId,
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
							text: "Register person event created successfully",
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
				let uri = `${this.appConfig.$api_url}/api/event/register/${param}`
				this.axios.get(uri, {
					data: {},
					headers: {
						'Content-Type': 'application/json',
						Authorization: `bearer ${localStorage.getItem('token')}`,
					},
				})
					.then(response => {
							this.id = response.data.id
							this.email = response.data.email
							this.eventId = response.data.event_id
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
				let uri = `${this.appConfig.$api_url}/api/event/register/${this.id}`
				this.axios.put(uri, { 
					event_id: this.eventId,
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
							text: "Register person event updated successfully",
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
									text: ' Register event deleted successfully',
									icon: 'success',
									timer: 1000
							})
							let uri = `${this.appConfig.$api_url}/api/event/register/${param}`
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