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

export const useWizardStore = defineStore('wizard', () => {
  const wizard = ref<Wizard>({ ...emptyWizard })
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchWizard() {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get('https://hp-api.onrender.com/api/characters')
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
    } catch (e: any) {
      error.value = 'Failed to fetch wizard. Please try again.'
    } finally {
      loading.value = false
    }
  }

  return { wizard, loading, error, fetchWizard }
})
