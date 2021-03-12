<template>
  <div class="wrapper">
    <div class="columns is-vcentered is-multiline">
      <User v-for="user in users" :key="user.email" :user="user"></User>
    </div>
  </div>
</template>

<script>
import { fetchUsersRequest } from './api/fetchUsers'
import User from './components/User.vue'

const TOTAL_PAGES = 30

export default {
  name: 'App',
  components: {
    User,
  },
  data: function() {
    return {
      isError: false,
      isLoading: true,
      users: [],
      requestParams: {
        page: 1,
        results: 20,
        inc: 'gender,name,location,email,phone,picture',
        gender: '',
      },
    }
  },
  computed: {
    isEmpty: function() {
      return this.users.length === 0
    },
  },
  methods: {
    getUsers: async function(params) {
      try {
        const response = await fetchUsersRequest(params)
        this.users = response.data.results
      } catch (error) {
        this.isError = true
      }
    },
  },
  created: function() {
    this.getUsers(this.requestParams)
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 100px;
}
</style>
