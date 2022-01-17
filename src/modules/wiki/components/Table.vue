<template>
    <div>
        <h2>Wiki de los hechizos de las películas del mundo de Harry Potter</h2>
        <table class="table table-striped table-hover table-bordered">
            <thead>
                <tr>
                    <th scope="col">Nombre</th>
                    <th scope="col">Efecto</th>
                    <th scope="col">Contrahechizo</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in list" :key="item.id">
                    <td>{{ item.name }}</td>
                    <td>{{ item.effect }}</td>
                    <td>{{ item.counterspell }}</td>
                    <td>{{ item.type }}</td>
                    <td>
                        <button class="btn btn-success" @click="showDetail(item.id, 'ver')">Ver</button>
                        <button class="btn btn-info" @click="showDetail(item.id, 'editar')">Editar</button>
                        <button
                            class="btn btn-danger"
                            @click="showDetail(item.id, 'eliminar')"
                        >Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { getAllSpells } from "../../../api/getAllSpells"

export default {
    data() {
        return {
            list: [],
            pagination: {
                currentPage: 0,
                perPage: 10,
                totalItems: 0
            }
        }
    },
    methods: {
        async getList() {
            const data = await getAllSpells().then(r => r.data)
            this.list = data
            this.pagination.totalItems = data.lenth
        },
        showDetail(id, accion) {
            this.$router.push({ name: 'wiki-detail', params: { id, accion } })
        }
    },
    created() {
        this.getList()
    }
}
</script>

<style scoped>
h2 {
    margin-bottom: 20px;
}
.page-navigation {
    display: flex;
    margin-top: 5px;
}
button {
    margin: 10px;
}
</style>