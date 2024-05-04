import type { ActionTree } from 'vuex';
import type { RootState, Wizard, WizardState } from './types';
import axios from 'axios';

export const actions: ActionTree<WizardState, RootState> = {
  fetchAndSetWizard: async ({ commit }) => {
    const wizres = await fetchWizard();
    if (wizres) {
      const newWizard: Wizard = {
        name: wizres.name,
        firstAlternateName: wizres.alternate_names[0],
        house: wizres.house,
        ancestry: wizres.ancestry
      }
      commit('setWizard', newWizard);
      return true;
    }
    return false;
  },
};

const fetchWizard = async () => {
 const num: number = Math.floor(Math.random() * 20)
  const res = await axios.get('https://hp-api.onrender.com/api/characters');
  return res?.data[num]; 
}
