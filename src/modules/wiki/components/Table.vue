<template>
    <div>
        <h2>Wiki de los hechizos de las películas del mundo de Harry Potter</h2>

        <div v-if="!spellsListRef || spellsListRef.length <= 0" class="no-data">
            <h3>No hay datos para mostrar</h3>
        </div>
        <div v-if="spellsListRef && spellsListRef.length > 0">
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
                    <tr v-for="spell in spellsListRef" :key="spell.id">
                        <td>{{ spell.name }}</td>
                        <td>{{ spell.effect }}</td>
                        <td>{{ spell.counterspell }}</td>
                        <td>{{ spell.type }}</td>
                        <td>
                            <button class="btn btn-success" @click="showDetail(spell.id, 'ver')">Ver</button>
                            <button
                                class="btn btn-info"
                                @click="showDetail(spell.id, 'editar')"
                            >Editar</button>
                            <button class="btn btn-danger" @click="deleteSpell(spell.id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="pagination justify-content-end pages-block">
                <span class="total-pages">Página {{ currentPageRef }} de {{ totalPages }}</span>
                <button class="btn btn-light" @click="changePage('first')">Primera</button>
                <button class="btn btn-light" @click="changePage('previous')">
                    <i class="fas fa-angle-double-left"></i>
                </button>
                <button class="btn btn-light" @click="changePage('next')">
                    <i class="fas fa-angle-double-right"></i>
                </button>
                <button class="btn btn-light" @click="changePage('last')">Ultima</button>
            </div>
        </div>
    </div>
</template>

<script setup>

import { getAllSpells } from "@/api/getAllSpells";
import { deleteSpellById } from "@/api/deleteSpellById";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const allDataRef = ref([]);
const currentPageRef = ref(1);
const pageSizeRef = ref(8);
let spellsListRef = ref([]);

const router = useRouter();

async function setAllData() {
    const { data } = await getAllSpells();
    allDataRef.value = data.filter((x) => Boolean(x));
}

const totalPages = computed(() => {
    const entero = Math.floor(allDataRef.value.length / pageSizeRef.value);
    const resto = allDataRef.value.length % pageSizeRef.value;
    let total;
    if (resto > 0) {
        total = entero + 1;
    } else {
        total = entero;
    }
    return total;
});


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
    switch (change) {
        case 'previous':
            currentPageRef.value--;
            break;
        case 'next':
            currentPageRef.value++;
            break;
        case 'first':
            currentPageRef.value = 1;
            break;
        case 'last':
            currentPageRef.value = totalPages.value;
            break;
    }
    setList();
    console.log('currentPageRef.value', currentPageRef.value)
    console.log('totalPages', totalPages.value)
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
.no-data {
    border: 5px solid #fedc00;
    padding: 25px;
    margin: 25px;
    width: 30%;
}
.pages-block {
    margin-right: 250px;
}
.total-pages {
    margin: 25px;
}

table {
    width: 85%;
    margin: 30px;
}
</style>