import spellsApi from "@/api/spellsApi"

export const getAllSpells = async () => {
    const spellsArr = await spellsApi.get('/spells.json')
    return spellsArr
}
