import spellsApi from "@/api/spellsApi"

export const getSpellById = async (id) => {
    const objId = Number(id) - 1;
    const spellsArr = await spellsApi.get(`/spells/${objId}.json`);
    return spellsArr;
}
