<template>
  <div :class="$style.suggestionView">
    <MobileHeader v-if="isMobileView" :isSideBarOpen="isSideBarOpen" @toggle-sidebar="toggleSideBar" />
    <div v-else>
      <DeskTopStatusBar />
    </div>
    <div>
      <FilterBar :isMobileView="isMobileView" />
      <SideBar v-if="isSideBarOpen" />
      <main>
        <Suggestions :isMobileView="isMobileView" />
      </main>
    </div>

  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, onBeforeUnmount, onMounted, ref,
} from 'vue';
import Suggestions from '@/components/Suggestions.vue';
import SideBar from '@/components/SideBar.vue';
import DeskTopStatusBar from '@/components/DeskTopStatusBar.vue';
import MobileHeader from '../components/MobileHeader.vue';
import FilterBar from '../components/FilterBar.vue';

export default defineComponent({
  name: 'SuggestionsView',
  components: {
    MobileHeader,
    FilterBar,
    Suggestions,
    SideBar,
    DeskTopStatusBar,
  },
  setup() {
    const isSideBarOpen = ref(false);
    const viewportWidth = ref(window.innerWidth);

    const handleResize = () => {
      viewportWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    const toggleSideBar = () => {
      isSideBarOpen.value = !isSideBarOpen.value;
    };

    const isMobileView = computed<boolean>(() => viewportWidth.value < 768);

    return {
      isSideBarOpen,
      toggleSideBar,
      viewportWidth,
      isMobileView,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

@media (min-width: 1440px) {
  .suggestionView {
    display: flex;
    justify-content: center;
    gap: 2rem;
    padding-top: 6rem;
  }
}
</style>
