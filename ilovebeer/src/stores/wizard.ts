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

interface HpApiCharacter {
  name: string
  alternate_names: string[]
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

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

export const useWizardStore = defineStore('wizard', () => {
  const wizard = ref<Wizard>({ ...emptyWizard })
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchWizard() {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get<HpApiCharacter[]>(
        'https://hp-api.onrender.com/api/characters',
        { timeout: 5000 }
      )
      const characters = res.data.filter((c) => c.name && c.house)
      if (characters.length === 0) throw new Error('No characters found')
      const c = pickRandom(characters.slice(0, 40))
      wizard.value = {
        name: c.name,
        alternateName: c.alternate_names?.[0] ?? '',
        house: c.house,
        ancestry: c.ancestry ?? 'unknown',
        image: c.image ?? ''
      }
    } catch {
      wizard.value = { ...pickRandom(fallbackWizards) }
      error.value = 'API unavailable - showing offline data'
    } finally {
      loading.value = false
    }
  }

  return { wizard, loading, error, fetchWizard }
})
