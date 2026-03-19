<script setup lang="ts">
import { useWizardStore } from '@/stores/wizard'
import { computed } from 'vue'

const store = useWizardStore()

const houseColor = computed(() => {
  const colors: Record<string, string> = {
    Gryffindor: '#ae0001',
    Slytherin: '#1a472a',
    Ravenclaw: '#0e1a40',
    Hufflepuff: '#ecb939'
  }
  return colors[store.wizard.house] ?? '#444'
})

const houseBg = computed(() => {
  const colors: Record<string, string> = {
    Gryffindor: 'rgba(174, 0, 1, 0.12)',
    Slytherin: 'rgba(26, 71, 42, 0.12)',
    Ravenclaw: 'rgba(14, 26, 64, 0.12)',
    Hufflepuff: 'rgba(236, 185, 57, 0.12)'
  }
  return colors[store.wizard.house] ?? 'rgba(255,255,255,0.05)'
})
</script>

<template>
  <div class="wizard-page">
    <div class="wizard-card" v-if="store.wizard.name">
      <div class="card-header" :style="{ background: houseBg, borderColor: houseColor }">
        <img
          v-if="store.wizard.image"
          :src="store.wizard.image"
          :alt="store.wizard.name"
          class="wizard-avatar"
        />
        <div v-else class="wizard-avatar placeholder">&#9733;</div>
        <h2>{{ store.wizard.name }}</h2>
        <p class="alternate" v-if="store.wizard.alternateName">
          aka {{ store.wizard.alternateName }}
        </p>
      </div>
      <div class="card-body">
        <div class="info-row">
          <span class="label">House</span>
          <span class="value house-badge" :style="{ background: houseColor }">
            {{ store.wizard.house }}
          </span>
        </div>
        <div class="info-row">
          <span class="label">Ancestry</span>
          <span class="value" :class="{ 'pure-blood': store.wizard.ancestry === 'pure-blood' }">
            {{ store.wizard.ancestry || 'unknown' }}
          </span>
        </div>
      </div>
    </div>

    <div class="empty-state" v-else-if="!store.loading">
      <span class="empty-icon">&#9733;</span>
      <p>Click the button to discover a wizard!</p>
    </div>

    <p v-if="store.error" class="error">{{ store.error }}</p>

    <button @click="store.fetchWizard()" :disabled="store.loading" class="fetch-btn">
      <span v-if="store.loading" class="spinner"></span>
      {{ store.loading ? 'Summoning...' : 'Summon a Wizard' }}
    </button>
  </div>
</template>

<style scoped>
.wizard-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  padding-top: 2rem;
}

.wizard-card {
  width: 100%;
  max-width: 400px;
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}

.card-header {
  padding: 2rem 1.5rem;
  text-align: center;
  border-bottom: 2px solid;
}

.wizard-avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin: 0 auto 1rem;
  display: block;
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.wizard-avatar.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.08);
  font-size: 2.5rem;
  color: #ffd700;
}

h2 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0;
}

.alternate {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 0.25rem;
  font-style: italic;
}

.card-body {
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.value {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  font-weight: 500;
}

.house-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
}

.pure-blood {
  color: #ffd700;
}

.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: rgba(255, 255, 255, 0.4);
}

.empty-icon {
  font-size: 3rem;
  display: block;
  margin-bottom: 1rem;
  color: #ffd700;
  opacity: 0.4;
}

.error {
  color: #ff6b6b;
  font-size: 0.85rem;
}

.fetch-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 2rem;
  border: none;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffd700, #f0a500);
  color: #1a1a2e;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 4px 16px rgba(255, 215, 0, 0.25);
}

.fetch-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 24px rgba(255, 215, 0, 0.35);
}

.fetch-btn:active:not(:disabled) {
  transform: translateY(0);
}

.fetch-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.spinner {
  width: 16px;
  height: 16px;
  border: 2px solid rgba(26, 26, 46, 0.3);
  border-top-color: #1a1a2e;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
