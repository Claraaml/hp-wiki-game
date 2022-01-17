<template>
  <button
    v-for="link in links"
    :key="link.to"
    class="btn btn-info"
    @click="goTo(link.to)"
  >{{ link.name }}</button>
</template>

<script setup>
import { useRouter } from 'vue-router';


const links = [
  { to: 'home', name: 'Home' },
  { to: 'wiki-table', name: 'Wiki' },
  // { to: 'game', name: 'Game' },
];
const router = useRouter()

function goTo(to) {
  router.push({ name: to })
}

</script>

<style lang="scss" scoped>
button {
  margin: 10px;
}
</style>