import spellsApi from "@/api/spellsApi"

export const putSpellById = async (spell) => {
    const objId = Number(spell.id) - 1;
    const resp = await spellsApi.get(`/spells/${objId}.json`, spell);
    return resp;
}