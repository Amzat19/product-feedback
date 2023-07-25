<template>
  <nav :class="$style.statusBar">
    <ul>
      <li @click="emitStatusUpdate('planned')" @keydown.enter="emitStatusUpdate('planned')">
        Planned ({{ getSuggestionByStatus('planned').length }})
        <span v-if="!isMobileView">Ideas prioritized for research</span>
      </li>
      <li @click="emitStatusUpdate('in-progress')" @keydown.enter="emitStatusUpdate('progress')">
        In-Progress ({{ getSuggestionByStatus('in-progress').length }})
        <span v-if="!isMobileView">Currently being developed</span>
      </li>
      <li @click="emitStatusUpdate('live')" @keydown.enter="emitStatusUpdate('live')">
        Live ({{ getSuggestionByStatus('live').length }})
        <span v-if="!isMobileView">Released features</span>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import { RootState } from '@/store/types';
import { PropType, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'RoadmapStatusBar',
  props: {
    isMobileView: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props, ctx) {
    const store = useStore<RootState>();

    const emitStatusUpdate = (status: string) => {
      ctx.emit('updateMobileStatus', status);
    };

    const getSuggestionByStatus = (
      status: string,
    ) => store.getters.productRequestsByStatus(status);

    return {
      emitStatusUpdate,
      getSuggestionByStatus,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.statusBar {
  height: 4rem;
  border-bottom: 1px solid #8C92B3;

  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 100%;

    li {
      list-style: none;
      color: #8C92B3;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
    }
  }

}

@media (min-width: 768px) {
  .statusBar {
    width: 85vw;
    border: none;
    display: block;
    margin: 2rem auto 0 auto;

    ul {
      justify-content: start;

      li {
        color: $very-dark-blue;
        display: grid;
        width: 28.3vw;
        padding-left: 0.5rem;

        span {
          color: $active-dark-blue;
          font-weight: 400;
          width: max-content;
        }
      }
    }
  }
}

@media (min-width: 1440px) {
  .statusBar {
    width: 75vw;

    ul {
      li {
        padding-left: 1rem;
      }
    }
  }
}
</style>
