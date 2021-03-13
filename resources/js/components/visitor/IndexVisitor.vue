<template>
  <v-app>
    <v-sheet color="transparent" height="100vh">
      <notExistsVisitor
        v-if="status == 'NotExists'"
        :email="data.email"
        :code="data.code"
        :date="data.date_expired"
        @load="load"
      />
      <existsVisitor
        v-else-if="status == 'Exists'"
        :email="data.email"
        :code="data.code"
        :date="data.date_expired"
        @load="load"
      />
      <submit v-else-if="status == 'Submit'" />
      <expired v-else-if="status == 'Expired'" />
      <notFound v-else-if="status == 'NotFound'" />
      <loading v-else/>
      
    </v-sheet>
  </v-app>
</template>

<script>
import moment from 'moment'
import notExistsVisitor from './NotExistsVisitor'
import existsVisitor from './ExistsVisitor'
import submit from './Submit'
import expired from './Expired'
import notFound from './NotFound'
import loading from './Loading'

export default {
  components: {
    notExistsVisitor,
    existsVisitor,
    submit,
    expired,
    notFound,
    loading,
  },
  data () {
    return {
      data: [],
      status: null,
    }
  },
  mounted () {
    this.load()
    console.log(moment(new Date()).format("DD/MM/YYYY"))
  },
  methods: {
    load () {
      let uri = `${this.appConfig.$api_url}/api/public/register/${this.$route.params.uuid}`
      this.axios.get(uri, {
        data: {},
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => {
          this.data = response.data
          const dateNow = moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          const  dataEvent = moment(new Date(response.data.date_expired)).format("YYYY-MM-DD HH:mm:ss")

          // Check Data
          if (response.data.email) {
            // Check Status
            if (response.data.status === 'Sending') {
              // Check Date
              if (dateNow < dataEvent) {
                // Check Person
                if (response.data.person_is_exists) {
                  this.status = 'Exists'
                } else {
                  this.status = 'NotExists'
                }
              } else {
                this.status = 'Expired'
              }
            } else {
              this.status = 'Submit'
            }
          } else {
            this.status = 'NotFound'
          }
          
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