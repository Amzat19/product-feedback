<template>
  <div :class="$style.suggestionStatus">
    <h2 v-if="isMobileView && mobileStatus === 'in-progress'">In-Progress ({{ inProgressSuggestion.length }})</h2>
    <h2 v-if="isMobileView && mobileStatus === 'planned'">Planned ({{ plannedSuggestion.length }})</h2>
    <h2 v-if="isMobileView && mobileStatus === 'live'">Live ({{ liveSuggestion.length }})</h2>
    <span v-if="isMobileView && mobileStatus === 'in-progress'">Features currently being developed</span>
    <span v-if="isMobileView && mobileStatus === 'planned'">Ideas prioritized for research</span>
    <span v-if="isMobileView && mobileStatus === 'live'">Released Features</span>

    <div :class="$style.currentSuggestions" v-if="isMobileView">
      <SuggestionStatus v-for="suggestion of mobileSuggestionStatus()" :key="suggestion.id" :suggestion="suggestion"
        :mobileStatus="mobileStatus" />
    </div>
    <div v-else :class="$style.desktopCurrentSuggestions">
      <div>
        <SuggestionStatus v-for="suggestion of plannedSuggestion" :key="suggestion?.id" :suggestion="suggestion"
          mobileStatus="planned" />
      </div>
      <div>
        <SuggestionStatus v-for="suggestion of inProgressSuggestion" :key="suggestion.id" :suggestion="suggestion"
          mobileStatus="in-progress" />
      </div>
      <div>
        <SuggestionStatus v-for="suggestion of liveSuggestion" :key="suggestion.id" :suggestion="suggestion"
          mobileStatus="live" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  PropType, computed, defineComponent,
} from 'vue';
import { useStore } from 'vuex';
import { ProductRequest, RootState } from '@/store/types';
import SuggestionStatus from './SuggestionStatus.vue';

export default defineComponent({
  name: 'SuggestionStatusRoadmap',
  props: {
    isMobileView: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    mobileStatus: {
      type: String as PropType<string>,
      required: true,
    },
  },
  components: {
    SuggestionStatus,
  },
  setup(props) {
    const store = useStore<RootState>();

    const getSuggestionByStatus = (
      status: string,
    ): ProductRequest[] => store.getters.productRequestsByStatus(status);

    const plannedSuggestion = computed<ProductRequest[]>(() => getSuggestionByStatus('planned'));
    const inProgressSuggestion = computed<ProductRequest[]>(
      () => getSuggestionByStatus('in-progress'),
    );
    const liveSuggestion = computed<ProductRequest[]>(() => getSuggestionByStatus('live'));

    const mobileSuggestionStatus = (): ProductRequest[] => {
      switch (props.mobileStatus) {
        case 'planned':
          return plannedSuggestion.value;
        case 'in-progress':
          return inProgressSuggestion.value;
        default:
          return liveSuggestion.value;
      }
    };

    return {
      getSuggestionByStatus,
      plannedSuggestion,
      inProgressSuggestion,
      liveSuggestion,
      mobileSuggestionStatus,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.suggestionStatus {
  width: 85vw;
  margin: 1.5rem auto 5.5rem auto;

  h2 {
    color: $very-dark-blue;
    font-size: 1.125rem;
    font-weight: 700;
  }

  span {
    color: $active-dark-blue;
    font-weight: 400;
    font-size: 0.8rem;
  }

  .currentSuggestions {
    margin-top: 1.5rem;
  }

  .desktopCurrentSuggestions {
    display: flex;
    gap: 0.6rem;

    article {
      width: 27vw;
    }
  }
}

@media (min-width: 1440px) {
  .suggestionStatus {
    width: 75vw;

    .desktopCurrentSuggestions {
      gap: 1.88rem
    }
  }
}
</style>
