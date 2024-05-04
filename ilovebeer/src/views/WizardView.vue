<script lang="ts">
import type { Wizard } from '@/components/wizard/types';
import { mapActions, mapGetters } from 'vuex';
export default  {
  name: "Wizard-view",
  computed: {
    // ...mapState([
    //   "wizardModule/wizard",
    // ]),
    ...mapGetters(['wizardModule/getWizard']),
  },
  methods: {
    ...mapActions(['wizardModule/fetchAndSetWizard']),
    ...mapActions({setWi: 'wizardModule/fetchAndSetWizard'}),
    ...mapGetters({getWi: 'wizardModule/getWizard'}),
    getClass: (wizard: Wizard): string => 
      wizard.ancestry=='pure-blood' ? 'pureBlooded' : 'notPureBlooded'
    
  },
};
</script>

<template>
  <button @click="setWi" style="background-color: rgb(34, 34, 150); color: white;"> fetch new Wizard</button>
  <div :class="{pureBlooded: getWi().ancestry == 'pure-blood', notPureBlooded: getWi().ancestry != 'pure-blood'}">
   name: {{ getWi().name }}<br>
   altername: {{ getWi().firstAlternateName }}<br>
   house: {{ getWi().house }}<br>
   ancestry: {{ getWi().ancestry }}<br>
  </div>

</template>

<style scoped>

  .notPureBlooded {
    color: gray;
  }
  .pureBlooded {
    color: gold; 
  }

</style>
