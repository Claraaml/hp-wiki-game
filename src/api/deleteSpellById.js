import spellsApi from "@/api/spellsApi"

export const deleteSpellById = async (id) => {
    const objId = Number(id) - 1;
    await spellsApi.delete(`/spells/${objId}.json`)
    return id
}