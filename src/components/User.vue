<template>
  <div class="column is-3">
    <div class="card">
      <div class="card-image">
        <figure class="image is-1by1">
          <img :src="user.picture.large" alt="" />
        </figure>
      </div>

      <div class="card-content">
        <p class="title is-5">{{ user.name.first + ' ' + user.name.last }}</p>
        <dl class="list-item">
          <dt>性別</dt>
          <dd>{{ user.gender }}</dd>
        </dl>
        <dl class="list-item">
          <dt>メール</dt>
          <dd>{{ user.email }}</dd>
        </dl>
        <dl class="list-item">
          <dt>電話</dt>
          <dd>{{ user.phone }}</dd>
        </dl>
        <dl class="list-item">
          <dt>町</dt>
          <dd>{{ user.location.city }}</dd>
        </dl>
        <dl class="list-item">
          <dt>州</dt>
          <dd>{{ user.location.state }}</dd>
        </dl>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    user: {
      type: Object,
      require: true,
    },
  },
}
</script>

<style scoped lang="scss">
.card-content {
  word-break: break-word;
}

.list-item {
  display: flex;
  font-size: 13px;

  > dt {
    width: 30%;
    font-weight: bold;
  }

  > dd {
    width: 70%;
  }
}
</style>
