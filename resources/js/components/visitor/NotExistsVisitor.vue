<template>
  <v-row align="center" class="fill-height" no-gutters>
    <v-col v-if="$vuetify.breakpoint.lgAndUp" cols="12" md="6">
      <v-sheet color="primary darken-2" dark height="100vh" width="100%">
        <v-container class="justify-center" fill-height>
          <div class="d-flex align-center flex-column text-center">
            <h1 class="text-xl-h1 text-md-h2 font-weight-bold">
                HuntStreet
            </h1>
            <h3 class="text-xl-h3 text-md-h4 mt-4">
              Event {{ code }} End Of Date
            </h3>
            <h4 class="text-xl-h4 text-md-h4 mt-4">
              {{ days | two_digits }} Days, {{ hours | two_digits }} Hours, {{ minutes | two_digits }} Minutes, {{ seconds | two_digits }} Seconds
            </h4>
          </div>
        </v-container>
      </v-sheet>
    </v-col>

    <v-col cols="12" lg="6">
      <v-container>
        <v-row justify="center">
          <v-col cols="12" lg="6" md="8" xl="6">
            <h3 class="text-h3 font-weight-bold text-center">
                Claim  Now!
            </h3>

            <div class="mt-4">
              <validation-observer v-slot="{ handleSubmit }">
                <v-form @submit.prevent="handleSubmit(onSubmit)">
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
                      :items="items"
                      label="Designers"
                      multiple
                      chips
                      prepend-inner-icon="mdi-cards"
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
                    Submit
                  </v-btn>
                </v-form>
              </validation-observer>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    code: {
      type: String
    },
    date: {
      type: String
    }
  },
  data () {
    return {
      name: '',
      birthday: new Date().toISOString().substr(0, 10),
      menu: null,
      selectSex: null,
      sexs: ['Men', 'Male'],
      designers: [],
      items: [],
      now: Math.trunc((new Date()).getTime() / 1000)
    }
  },
  computed: {
    dateInMilliseconds() {
      return Math.trunc(Date.parse(this.date) / 1000)
    },
    seconds() {
      return (this.dateInMilliseconds - this.now) % 60
    },
    minutes() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60) % 60
    },
    hours() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60) % 24
    },
    days() {
      return Math.trunc((this.dateInMilliseconds - this.now) / 60 / 60 / 24)
    }
  },
  filters: {
    two_digits: (value) => {
      if (value < 0) {
        return '00'
      }
      if (value.toString().length <= 1) {
        return `0${value}`
      }
      return value
    }
  },
  mounted () {
    this.loadDesigners()
    window.setInterval(() => {
      this.now = Math.trunc((new Date()).getTime() / 1000)
    },1000)
  },
  methods: {
    loadDesigners () {
      let uri = `${this.appConfig.$api_url}/api/public/designers`
      this.axios.get(uri, {
        data: {},
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          this.items = response.data.data.map(value => value.name)
        })
        .catch((err) => {
          this.$swal.fire({
            title: 'Error',
            text: err,
            icon: 'error',
          })
        })
    },
    onSubmit () {
      let uri = `${this.appConfig.$api_url}/api/public/register/submit/new/${this.$route.params.uuid}`
      this.axios.post(uri, { 
        name: this.name,
        sex: this.selectSex,
        birthday: this.birthday,
        designers: this.designers.join('|'),
      })
        .then(response => {
          this.data = response.data
          this.$emit('load')
        })
        .catch((err) => {
          this.$swal.fire({
            title: 'Error',
            text: err,
            icon: 'error',
          })
        })
    },
  }
}
</script>