<template>
  <div class="field">
    <label class="label">性別で絞り込む</label>
    <div class="control">
      <div class="select">
        <select @change="changeGender($event)" :value="gender">
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
  props: {
    gender: {
      type: String,
      require: true,
    },
  },
  methods: {
    changeGender: function(event) {
      this.$emit('change-gender', event.target.value)
    },
  },
}
</script>

<style scoped lang="scss"></style>
