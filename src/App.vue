<template>
  <div class="wrapper">
    <SelectGender @change-gender="changeGender($event)" class="select-gender" />
    <pulse-loader v-if="isLoading" class="loader-block"></pulse-loader>

    <div v-else class="columns is-multiline">
      <User v-for="user in users" :key="user.email" :user="user" />
    </div>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader'

import { fetchUsersRequest } from './api/fetchUsers'
import SelectGender from './components/SelectGender'
import User from './components/User'

const TOTAL_PAGES = 30

export default {
  name: 'App',
  components: {
    PulseLoader,
    SelectGender,
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
        gender: 'both',
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
        this.isLoading = true

        const response = await fetchUsersRequest(params)
        this.users = response.data.results
        this.isLoading = false
      } catch (error) {
        this.isError = true
      }
    },
    changeGender(gender) {
      this.$set(this.requestParams, 'gender', gender)
      this.$set(this.requestParams, 'page', 1)
      this.getUsers(this.requestParams)
    },
  },
  created: function() {
    this.getUsers(this.requestParams)
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  padding: 50px 100px;
}
.select-gender {
  margin-bottom: 30px;
}
.loader-block {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
