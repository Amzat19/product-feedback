<template>
  <div :class="$style.suggestions">
    <Suggestion :isMobileView="isMobileView" v-for="suggestion of sortedProductRequests" :suggestion="suggestion"
      :key="suggestion.id" />
  </div>
</template>

<script lang="ts">
import {
  PropType, computed, defineComponent,
} from 'vue';
import { useStore } from 'vuex';
import { ProductRequest, RootState } from '@/store/types';
import Suggestion from './Suggestion.vue';

export default defineComponent({
  name: 'SuggestionsBox',
  props: {
    isMobileView: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  components: {
    Suggestion,
  },
  setup() {
    const store = useStore<RootState>();

    const sortedProductRequests = computed<ProductRequest[]>(() => store.getters[
      'filterAndSortModule/sortedProductRequests']);

    return {
      sortedProductRequests,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/_variables.scss';

.suggestions {
  margin-top: 2rem;
  margin-bottom: 7rem;
  display: grid;
  justify-content: center;
  gap: 1rem;
}
</style>
