<template>
  <div class="field">
    <label class="label">性別で絞り込む</label>
    <div class="control">
      <div class="select">
        <select @change="changeGender()" v-model="gender">
          <option value="both">すべて</option>
          <option value="male">男性</option>
          <option value="female">女性</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectGender',
  data: function() {
    return {
      gender: 'both',
    }
  },
  methods: {
    changeGender: function() {
      this.$emit('change-gender', this.gender)
    },
  },
}
</script>

<style scoped lang="scss"></style>
