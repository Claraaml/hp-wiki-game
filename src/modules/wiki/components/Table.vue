<template>
    <h1>Table</h1>
    <button @click="getList">clicar</button>
</template>

<script>
import { getAllSpells } from "../../../api/getAllSpells"

export default {
    data() {
        return {
            list: []
        }
    },
    methods: {
        async getList() {
            const data = await getAllSpells().then(r => r.data)
            this.list = data
        }
    },
    created() {
        this.getList()
    }
}
</script>

<style>
</style>