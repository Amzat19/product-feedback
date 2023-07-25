<template>
  <EditFeedBack />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EditFeedBack from '@/components/EditFeedBack.vue';

export default defineComponent({
  name: 'EditFeedbackView',
  components: {
    EditFeedBack,
  },
});
</script>
