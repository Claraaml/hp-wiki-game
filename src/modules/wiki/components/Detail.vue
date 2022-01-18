<template>
  <h2>Detalle del hechizo</h2>
  <form class="row g-3">
    <div class="col-6">
      <label for="name" class="visually">Nombre del hechizo</label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="spellRef.name"
        :readonly="!activeRef"
      />
    </div>
    <div class="col-6">
      <label for="effect" class="visually">Efecto del hechizo</label>
      <input
        type="text"
        class="form-control"
        id="effect"
        v-model="spellRef.effect"
        :readonly="!activeRef"
      />
    </div>
    <div class="col-3">
      <label for="counterspell" class="visually">Contrahechizo</label>
      <input
        type="text"
        class="form-control"
        id="counterspell"
        v-model="spellRef.counterspell"
        :readonly="!activeRef"
      />
    </div>
    <div class="col-3">
      <label for="type" class="visually">Tipo</label>
      <input
        type="text"
        class="form-control"
        id="type"
        v-model="spellRef.type"
        :readonly="!activeRef"
      />
    </div>
    <div class="col-3 buttons">
      <button v-show="activeRef" class="btn btn-primary guardar-btn" @click="save()">Guardar</button>
      <button class="btn btn-secondary" @click="backToWiki">Volver</button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getSpellById } from "@/api/getSpellById"
import { putSpellById } from "@/api/putSpellById"
import { useRouter } from "vue-router";

const props$$ = defineProps({
  id: {
    type: Number,
    required: true
  },
  accion: {
    type: String,
    required: true
  }
})

const router = useRouter();
let spellRef = ref({})
let activeRef = ref(true)

async function getSpell() {
  const data = await getSpellById(props$$.id).then(r => r.data)
  spellRef.value = data
}

function backToWiki() {
  router.push({ name: 'wiki-table' })
}

async function save() {
  const spell = {
    id: spellRef.value.id,
    name: spellRef.value.name,
    type: spellRef.value.type,
    effect: spellRef.value.effect,
    counterspell: spellRef.value.counterspell
  }
  await putSpellById(spell)
  router.push({ name: 'wiki-table' })

}

onMounted(() => {
  getSpell()
  if (props$$.accion === 'ver') { activeRef.value = false; }
})
</script>

<style lang="scss" scoped>
form {
  margin: 20px;
  border: 1px solid #699fa1;
  padding: 20px;
}
.buttons {
  margin-top: 40px;
  color: white;
  button {
    margin-right: 20px;
  }
}
</style>