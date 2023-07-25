<template>
  <header :class="$style.desktopStatusBar">
    <article>
      <div>
        <span>FeedBack App</span>
        <span>Feedback Board</span>
      </div>
    </article>
    <article :class="$style.categories">
      <span @click="updateSelectedCategory(null)" @keydown.enter="updateSelectedCategory(null)"
        :class="{ [$style.active]: activeCategory === null }">All</span>
      <span @click="updateSelectedCategory('ui')" @keydown.enter="updateSelectedCategory('ui')"
        :class="{ [$style.active]: activeCategory === 'ui' }">UI</span>
      <span @click="updateSelectedCategory('ux')" @keydown.enter="updateSelectedCategory('ux')"
        :class="{ [$style.active]: activeCategory === 'ux' }">UX</span>
      <span @click="updateSelectedCategory('enhancement')" @keydown.enter="updateSelectedCategory('enhancement')"
        :class="{ [$style.active]: activeCategory === 'enhancement' }">Enhancement</span>
      <span @click="updateSelectedCategory('bug')" @keydown.enter="updateSelectedCategory('bug')"
        :class="{ [$style.active]: activeCategory === 'bug' }">Bug</span>
      <span @click="updateSelectedCategory('feature')" @keydown.enter="updateSelectedCategory('feature')"
        :class="{ [$style.active]: activeCategory === 'feature' }">Feature</span>
    </article>
    <article :class="$style.roadmap">
      <div :class="$style.roadmapHeading">
        <h2>Roadmap</h2>
        <span @click="goToRoadMap" @keydown.enter="goToRoadMap">View</span>
      </div>
      <div>
        <div>
          <span>
            <OrangeDotIcon />
            Planned
          </span>
          <span>{{ suggestionsCountByStatus('planned') }}</span>
        </div>
        <div>
          <span>
            <PurpleDotIcon />
            In-Progress
          </span>
          <span>{{ suggestionsCountByStatus('in-progress') }}</span>
        </div>
        <div>
          <span>
            <BlueDotIcon />
            Live
          </span>
          <span>{{ suggestionsCountByStatus('live') }}</span>
        </div>
      </div>
    </article>
  </header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { RootState } from '@/store/types';
import BlueDotIcon from '../assets/svgComponents/blue-dot-icon.vue';
import OrangeDotIcon from '../assets/svgComponents/orange-dot-icon.vue';
import PurpleDotIcon from '../assets/svgComponents/purple-dot-icon.vue';

export default defineComponent({
  name: 'DesktopStatusBar',
  components: {
    BlueDotIcon,
    OrangeDotIcon,
    PurpleDotIcon,
  },
  setup() {
    const store = useStore<RootState>();
    const router = useRouter();
    const activeCategory = computed<string | null>(
      () => store.state.filterAndSortModule.selectedCategory,
    );

    const updateSelectedCategory = (category: string | null) => {
      store.commit('filterAndSortModule/setSelectedCategory', category);
    };

    const goToRoadMap = () => {
      router.push('/roadmap');
    };

    const suggestionsCountByStatus = (status: string) => computed<number>(
      () => store.getters.productRequestsByStatus(status).length,
    );

    return {
      updateSelectedCategory,
      goToRoadMap,
      activeCategory,
      suggestionsCountByStatus,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.desktopStatusBar {
  width: 85vw;
  margin-left: auto;
  margin-right: auto;
  padding-top: 3.5rem;
  padding-bottom: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.6rem;

  article {
    height: 11rem;
    border-radius: 0.625rem;
  }

  article:first-child {
    background: $header-gradient;
    padding-left: 1.5rem;
    padding-top: 6.1rem;

    div {
      display: grid;

      span {
        white-space: nowrap;
        color: $white;
      }

      span:first-child {
        font-weight: 600;
        font-size: 1.25rem;
      }

      span:last-child {
        font-weight: 300;
        font-size: 0.9rem;
      }
    }

  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1.5rem;
    background-color: $white;

    span {
      background-color: $thin-blue;
      color: $blue;
      height: 1.875rem;
      padding: 0.3rem 1rem;
      font-size: 0.8rem;
      font-weight: 600;
      border-radius: 0.625rem;
      cursor: pointer
    }

    span:hover {
      background-color: $active-blue;
    }

    .active {
      background-color: $blue;
      color: $white;
    }
  }

  .roadmap {
    display: grid;
    gap: 1.5rem;
    padding: 1.1rem 1.5rem;
    background-color: $white;

    .roadmapHeading {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        font-size: 1.125rem;
        color: $very-dark-blue;
        font-weight: 700;
      }

      span {
        color: $blue;
        font-size: 0.8rem;
        font-weight: 600;
        text-decoration: underline;
        cursor: pointer;
      }

      span:hover {
        color: #8397F8;
      }
    }

    div:last-child {
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span:first-child {
          display: flex;
          gap: 1rem;
          color: $active-dark-blue;
          font-weight: 400;
          font-size: 1rem;

          svg {
            align-self: center;
          }
        }

        span:last-child {
          font-weight: 600;
          font-size: 1rem;
          color: $active-dark-blue;
        }
      }
    }
  }
}

@media (min-width: 1440px) {
  header {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr 1fr;
    width: 18vw;
    padding: 0;
    gap: 1.5rem;
  }
}
</style>
