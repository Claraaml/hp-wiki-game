import axios from 'axios'

const spellsApi = axios.create({
    baseURL: 'https://hp-wiki-game-default-rtdb.europe-west1.firebasedatabase.app'
})

export default spellsApi