<template>
  <aside>
    <div :class="$style.sidebar">
      <article :class="$style.categories">
        <span @click="updateSelectedCategory(null)" @keydown.enter="updateSelectedCategory(null)"
          :class="{ [$style.active]: activeCategory === null }">All</span>
        <span @click="updateSelectedCategory('ui')" @keydown.enter="updateSelectedCategory('ui')"
          :class="{ [$style.active]: activeCategory === 'ui' }">UI</span>
        <span @click="updateSelectedCategory('ux')" @keydown.enter="updateSelectedCategory('ux')"
          :class="{ [$style.active]: activeCategory === 'ux' }">UX</span>
        <span @click="updateSelectedCategory('enhancement')" @keydown="updateSelectedCategory('enhancement')"
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
    </div>

  </aside>
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
  name: 'SideBar',
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
      suggestionsCountByStatus,
      activeCategory,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/_variables.scss';

aside {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;

  .sidebar {
    width: 70%;
    height: 100vh;
    right: 0;
    position: absolute;
    background-color: $bg-blue;
    padding-top: 6rem;

    article {
      width: 85%;
      height: 11rem;
      background-color: $white;
      margin-bottom: 1.5rem;
      margin-left: auto;
      margin-right: auto;
      border-radius: 0.625rem;
    }

    .categories {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding: 1.5rem;

      span {
        background-color: $thin-blue;
        color: $blue;
        height: 1.875rem;
        padding: 0.3rem 1rem;
        font-size: 0.8rem;
        font-weight: 600;
        border-radius: 0.625rem;
        cursor: pointer;
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
}
</style>
