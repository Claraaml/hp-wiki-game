<template>
  <button v-for="let link in links" class="btn btn-primary"
  @click=""></button>
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
}
</script>

<style scoped>
</style>