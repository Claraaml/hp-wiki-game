<template>
    <div>
        <h2>Wiki de los hechizos de las películas del mundo de Harry Potter</h2>

        <!-- <div class="buscador"></div> -->

        <table
            v-if="spellsListRef && spellsListRef.length"
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
                <tr v-for="spell in spellsListRef" :key="spell.id">
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
        <div class="pagination justify-content-end">
            <button class="btn btn-light" @click="changePage('previous')">Anterior</button>
            <button class="btn btn-light" @click="changePage('next')">Siguiente</button>
        </div>
    </div>
</template>

<script setup>

import { getAllSpells } from "@/api/getAllSpells";
import { deleteSpellById } from "@/api/deleteSpellById";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const allDataRef = ref([]);
const currentPageRef = ref(1);
const pageSizeRef = ref(10);
let spellsListRef = ref([]);
const router = useRouter();

async function setAllData() {
    const { data } = await getAllSpells();
    allDataRef.value = data.filter((x) => Boolean(x));
}

async function init() {
    await setAllData();
}

function setCurrentPage(newValue) {
    const invalid = !newValue || typeof newValue !== 'number' && newValue <= 0;
    if (invalid) {
        currentPageRef.value = currentPageRef.value || 1;
        return;
    }
    currentPageRef.value = newValue;
}

function setList() {
    spellsListRef.value = allDataRef.value.filter((x, i) => {
        const position = i + 1;
        return position <= currentPageRef.value * pageSizeRef.value &&
            position > (currentPageRef.value - 1) * pageSizeRef.value;
    });
}

function setPageSize(newValue) {
    const invalid = !newValue || typeof newValue !== 'number' && newValue <= 0;
    if (invalid) {
        pageSizeRef.value = pageSizeRef.value || 1;
        return;
    }

    pageSizeRef.value = newValue;
}

function showDetail(id, accion) {
    router.push({ name: 'wiki-detail', params: { id, accion } });
}

async function deleteSpell(id) {
    await deleteSpellById(id);
    const index = spellsListRef.value.findIndex(x => x.id === id);
    spellsListRef.value.splice(index, 1);
}

function changePage(change) {
    if (change === 'next') {
        currentPageRef.value++;
    } else {
        currentPageRef.value--;
    }
    setList()
}


onMounted(() => {
    init();
})

watch(
    allDataRef,
    () => {
        setCurrentPage();
        setPageSize();
        setList();
    },
);

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