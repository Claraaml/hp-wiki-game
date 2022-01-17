import spellsApi from "@/api/spellsApi"

export const getSpellById = async (id) => {
    const spellsArr = await spellsApi.get(`/spells/${id}.json`);
    return spellsArr;
}
