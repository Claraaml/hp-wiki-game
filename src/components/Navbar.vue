<template>
  <button
    v-for="link in links"
    :key="link.to"
    class="btn btn-info"
    @click="goTo(link.to)"
  >{{ link.name }}</button>
</template>

<script>
export default {
  data() {
    return {
      links: [
        { to: 'home', name: 'Home' },
        { to: 'wiki-table', name: 'Wiki' },
        // { to: 'game', name: 'Game' },
      ]
    }
  },
  methods: {
    goTo(to) {
      this.$router.push({ name: to })
    }
  }
}
</script>

<style scoped>
button {
  margin: 10px;
}
</style>