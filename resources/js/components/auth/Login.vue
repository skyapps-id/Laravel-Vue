<template>
  <v-app>
    <v-sheet color="transparent" height="100vh">
      <v-row align="center" class="fill-height" no-gutters>
        <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="12" md="6">
          <v-sheet color="primary darken-2" dark height="100vh" width="100%">
            <v-container class="justify-center" fill-height>
              <div class="d-flex align-center flex-column text-center">
                <h1 class="text-xl-h1 text-md-h2 font-weight-bold">
                    HuntStreet
                </h1>
              </div>
            </v-container>
          </v-sheet>
        </v-col>

        <v-col cols="12" lg="6">
          <v-container>
            <v-row justify="center">
              <v-col cols="12" lg="6" md="8" xl="4">
                <h3 class="text-h3 font-weight-bold text-center">
                    LOGIN
                </h3>

                <div class="mt-4">
                  <validation-observer v-slot="{ handleSubmit }">
                    <v-form @submit.prevent="handleSubmit(onSubmit)">
                      <validation-provider
                        v-slot="{ errors }"
                        name="E-mail"
                        rules="required|email"
                      >
                        <v-text-field
                          v-model="email"
                          label="Email Address"
                          prepend-inner-icon="mdi-email-outline"
                          required
                          :error-messages="errors[0]"
                        />
                      </validation-provider>

                      <validation-provider
                        v-slot="{ errors }"
                        name="Passowrd"
                        rules="required"
                      >
                        <v-text-field
                          v-model="password"
                          type="password"
                          label="Password"
                          prepend-inner-icon="mdi-lock-outline"
                          required
                          :error-messages="errors[0]"
                        />
                      </validation-provider>

                      <v-btn
                        block
                        class="font-weight-bold"
                        color="primary darken-1"
                        large
                        type="submit"
                      >
                        LOGIN
                      </v-btn>
                    </v-form>
                  </validation-observer>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
    </v-sheet>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
  }),
  methods: {
    onSubmit (data) {
      this.login({ email: this.email, password: this.password })
    },
    login(data) {
      let uri = `${this.appConfig.$api_url}/api/auth/login`;
      this.axios.post(uri, {
        email: data.email,
        password: data.password,
      })
        .then(response => {
            localStorage.token = response.data.access_token
            this.$router.push('/')
        })
        .catch((err) => {
          if (err.response.status === 401) {
            this.$swal.fire({
							title: 'Unauthorized',
							text: "Username or Password Wrong",
							icon: 'error',
						})
          } else {
            this.$swal.fire({
							title: 'Error',
							text: err,
							icon: 'error',
						})
          }
        })
    }
  }
}
</script>