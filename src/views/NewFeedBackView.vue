<template>
  <NewFeedBack />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import NewFeedBack from '@/components/NewFeedBack.vue';

export default defineComponent({
  name: 'NewFeedBackView',
  components: {
    NewFeedBack,
  },
});
</script>
