<template>
  <FeedbackDetail :isMobileView="isMobileView" />
</template>

<script lang="ts">
import {
  computed, defineComponent, onBeforeUnmount, onMounted, ref,
} from 'vue';
import FeedbackDetail from '@/components/FeedbackDetail.vue';

export default defineComponent({
  name: 'FeedbackDetailView',
  components: {
    FeedbackDetail,
  },
  setup() {
    const viewportWidth = ref<number>(window.innerWidth);

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
      viewportWidth,
    };
  },
});
</script>
