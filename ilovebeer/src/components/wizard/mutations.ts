import type { MutationTree } from 'vuex';
import type { Wizard, WizardState } from './types';

export const mutations: MutationTree<WizardState> = {
  setWizard: (state, payload: Wizard) => {
    state.wizard = payload;
  }
}