<template>
    <li class="nav-item">
        <!-- <a v-if="isExternalLink" target="_blank" class="nav-link" :href="link.to">{{ link.name }}</a> -->
        <!-- <router-link v-else :to="route" v-slot="{ href, isActive }"> -->
        <router-link :to="route" v-slot="{ href, isActive }">
            <!-- href, isActive -->
            <a :href="href" :class="isActive ? 'nav-link active' : 'nav-link'">{{ link.name }}</a>
        </router-link>
    </li>
</template>

<script>
export default {
    props: {
        link: {
            type: Object,
            required: true
        }
    },
    computed: {
        isExternalLink() {
            return this.link.to.startsWith('http')
        },
        route() {
            return this.link.id === undefined ? { name: this.link.to } : { name: this.link.to, params: { id: this.link.id } }
        }
    }
}
</script>

<style>
</style>