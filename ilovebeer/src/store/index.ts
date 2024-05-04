"use strict"

import { createStore } from 'vuex';
import { wizardModule } from '@/components/wizard/wizardModule'
import type { RootState } from '@/components/wizard/types';

// Storeを生成
export const store = createStore<RootState>({
  state: {
    version: '1.0.0'
  },
  modules: {
    wizardModule: wizardModule
  }
});
