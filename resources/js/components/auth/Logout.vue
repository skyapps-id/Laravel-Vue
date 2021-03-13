<template>
  
</template>

<script>
export default {
  created () {
    console.log(this.$route.params.destory)
    if (!this.$route.params.destory) {
      localStorage.removeItem('token')
      this.$swal.fire({
        title: 'Session Expired',
        text: 'Please Login Again ...',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Oke',
      })
      this.$router.push('/auth/login') 
    } else {
      this.logout()
    }
     
  },
  data () {
    return {
      destory: false,
    }
  },
  methods: {
    logout () {
      let uri = `${this.appConfig.$api_url}/api/auth/logout`
      this.axios.post(uri, {
        test: 'test'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `bearer ${localStorage.getItem('token')}`,
        }
      })
        .then(response => {
          localStorage.removeItem('token')
          this.$router.push('/auth/login') 
        })
    }
  }

}
</script>