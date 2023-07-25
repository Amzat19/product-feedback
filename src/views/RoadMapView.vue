<template>
  <RoadmapHeader />
  <RoadMapStatusBar :isMobileView="isMobileView" @updateMobileStatus="updateMobileStatus" />
  <SuggestionStatusRoadmap :isMobileView="isMobileView" :mobileStatus="mobileStatus" />
</template>

<script lang="ts">
import {
  computed, defineComponent, onBeforeUnmount, onMounted, ref,
} from 'vue';
import RoadmapHeader from '@/components/RoadmapHeader.vue';
import RoadMapStatusBar from '@/components/RoadMapStatusBar.vue';
import SuggestionStatusRoadmap from '@/components/SuggestionStatusRoadmap.vue';

export default defineComponent({
  name: 'RoadMapView',
  components: {
    RoadmapHeader,
    RoadMapStatusBar,
    SuggestionStatusRoadmap,
  },
  setup() {
    const viewportWidth = ref<number>(window.innerWidth);
    const mobileStatus = ref<string>('planned');

    const updateMobileStatus = (status: string) => {
      mobileStatus.value = status;
    };

    const handleResize = () => {
      viewportWidth.value = window.innerWidth;
    };

    onMounted(() => {
      window.addEventListener('resize', handleResize);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handleResize);
    });

    const isMobileView = computed<boolean>(() => viewportWidth.value < 768);

    return {
      isMobileView,
      mobileStatus,
      updateMobileStatus,
    };
  },
});
</script>
