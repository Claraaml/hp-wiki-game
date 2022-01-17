<template>
  <h2>Detalle del hechizo</h2>
  <form class="row g-3">
    <div class="col-6">
      <label for="name" class="visually">Nombre del hechizo</label>
      <input type="text" class="form-control" id="name" :value="spell.name" :readonly="!active" />
    </div>
    <div class="col-6">
      <label for="effect" class="visually">Efecto del hechizo</label>
      <input type="text" class="form-control" id="effect" :value="spell.effect" :readonly="!active" />
    </div>
    <div class="col-3">
      <label for="counterspell" class="visually">Contrahechizo</label>
      <input
        type="text"
        class="form-control"
        id="counterspell"
        :value="spell.counterspell"
        :readonly="!active"
      />
    </div>
    <div class="col-3">
      <label for="type" class="visually">Tipo</label>
      <input type="text" class="form-control" id="type" :value="spell.type" :readonly="!active" />
    </div>
    <div class="col-3 buttons">
      <button v-show="active" class="btn btn-primary guardar-btn">Guardar Cambios</button>
      <button class="btn btn-secondary" @click="backToWiki">Volver</button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { getSpellById } from "@/api/getSpellById"
import { useRouter } from "vue-router";

const props = defineProps({
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
let spell = ref({})
let active = ref(true)

async function getSpell() {
  const data = await getSpellById(props.id).then(r => r.data)
  spell.value = data
}

function backToWiki() {
  router.push({ name: 'wiki-table' })
}

onMounted(() => {
  getSpell()
  if (props.accion === 'ver') { active.value = false; }
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