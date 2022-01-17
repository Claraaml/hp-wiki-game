<template>
    <div>
        <h2>Wiki de los hechizos de las películas del mundo de Harry Potter</h2>

        <!-- <div class="buscador"></div> -->

        <table
            v-if="spellsList && spellsList.length"
            class="table table-striped table-hover table-bordered"
        >
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
                <tr v-for="spell in spellsList" :key="spell.id">
                    <td>{{ spell.name }}</td>
                    <td>{{ spell.effect }}</td>
                    <td>{{ spell.counterspell }}</td>
                    <td>{{ spell.type }}</td>
                    <td>
                        <button class="btn btn-success" @click="showDetail(spell.id, 'ver')">Ver</button>
                        <button class="btn btn-info" @click="showDetail(spell.id, 'editar')">Editar</button>
                        <button class="btn btn-danger" @click="deleteSpell(spell.id)">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>

import { getAllSpells } from "@/api/getAllSpells"
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

let spellsList = ref([]);
const router = useRouter();

async function getList() {
    const data = await getAllSpells().then(r => r.data);
    spellsList.value = data;
}

function showDetail(id, accion) {
    router.push({ name: 'wiki-detail', params: { id, accion } });
}

function deleteSpell(id) {
    console.log('Delete spell.. ', id);
}

onMounted(() => {
    getList();
})

</script>


<style lang="scss" scoped>
.page-navigation {
    display: flex;
    margin-top: 5px;
}
button {
    margin: 10px;
}
</style>