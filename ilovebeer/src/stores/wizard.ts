import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export interface Wizard {
  name: string
  alternateName: string
  house: string
  ancestry: string
  image: string
}

const emptyWizard: Wizard = {
  name: '',
  alternateName: '',
  house: '',
  ancestry: '',
  image: ''
}

const fallbackWizards: Wizard[] = [
  { name: 'Harry Potter', alternateName: 'The Boy Who Lived', house: 'Gryffindor', ancestry: 'half-blood', image: '' },
  { name: 'Hermione Granger', alternateName: '', house: 'Gryffindor', ancestry: 'muggleborn', image: '' },
  { name: 'Ron Weasley', alternateName: 'Ronnie', house: 'Gryffindor', ancestry: 'pure-blood', image: '' },
  { name: 'Draco Malfoy', alternateName: '', house: 'Slytherin', ancestry: 'pure-blood', image: '' },
  { name: 'Luna Lovegood', alternateName: '', house: 'Ravenclaw', ancestry: 'half-blood', image: '' },
  { name: 'Neville Longbottom', alternateName: '', house: 'Gryffindor', ancestry: 'pure-blood', image: '' },
  { name: 'Cedric Diggory', alternateName: '', house: 'Hufflepuff', ancestry: 'half-blood', image: '' },
  { name: 'Severus Snape', alternateName: 'Half-Blood Prince', house: 'Slytherin', ancestry: 'half-blood', image: '' },
  { name: 'Albus Dumbledore', alternateName: '', house: 'Gryffindor', ancestry: 'half-blood', image: '' },
  { name: 'Minerva McGonagall', alternateName: '', house: 'Gryffindor', ancestry: 'half-blood', image: '' },
]

export const useWizardStore = defineStore('wizard', () => {
  const wizard = ref<Wizard>({ ...emptyWizard })
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchWizard() {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get('https://hp-api.onrender.com/api/characters', { timeout: 5000 })
      const characters = res.data.filter((c: any) => c.name && c.house)
      const idx = Math.floor(Math.random() * Math.min(characters.length, 40))
      const c = characters[idx]
      wizard.value = {
        name: c.name,
        alternateName: c.alternate_names?.[0] ?? '',
        house: c.house,
        ancestry: c.ancestry ?? 'unknown',
        image: c.image ?? ''
      }
    } catch {
      const idx = Math.floor(Math.random() * fallbackWizards.length)
      wizard.value = { ...fallbackWizards[idx] }
      error.value = 'API unavailable - showing offline data'
    } finally {
      loading.value = false
    }
  }

  return { wizard, loading, error, fetchWizard }
})
