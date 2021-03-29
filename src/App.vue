<template>
  <div class="wrapper">
    <SelectGender :gender="requestParams.gender" @change-gender="changeGender($event)" class="select-gender" />

    <div class="users-block">
      <pulse-loader v-if="isLoading" class="loader-block"></pulse-loader>
      <div v-else class="columns is-multiline">
        <User v-for="user in users" :key="user.email" :user="user" />
      </div>
    </div>

    <paginate
      v-model="requestParams.page"
      :page-count="totalPages"
      :click-handler="changePage"
      :prev-text="'Prev'"
      :next-text="'Next'"
      :container-class="'pagination is-centered'"
      :page-link-class="'pagination-link'"
      :prev-link-class="'pagination-previous'"
      :next-link-class="'pagination-next'"
      :break-view-link-class="'pagination-ellipsis'"
      :active-class="'is-current'"
      :no-li-surround="true"
    >
    </paginate>
  </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/PulseLoader'
import Paginate from 'vuejs-paginate'

import { fetchUsersRequest } from './api/fetchUsers'
import SelectGender from './components/SelectGender'
import User from './components/User'

export default {
  name: 'App',
  components: {
    PulseLoader,
    Paginate,
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
      totalPages: 30,
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
    changePage(page) {
      this.$set(this.requestParams, 'page', page)
      this.getUsers(this.requestParams)
      window.scrollTo(0, 0)
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
.users-block {
  position: relative;
  min-height: 500px;
}
.loader-block {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.pagination {
  max-width: 400px;
  margin: 30px auto;
}
// 子コンポーネントにもstyleが効くようにする
::v-deep .pagination-ellipsis {
  border: none;
}
::v-deep .disabled {
  opacity: 0.3;
}
</style>
