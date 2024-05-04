import type { Module } from "vuex";
import { initWizard, type RootState, type Wizard, type WizardState } from "./types";
import { mutations } from "./mutations";
import { actions } from "./actions";

export const wizardModule: Module<WizardState, RootState>= {
  namespaced: true,
  state: {wizard: initWizard},
  getters: {getWizard: (state): Wizard => state.wizard},
  mutations,
  actions
}
