<template>
  <article :class="$style.filterBar">
    <div>
      <span v-if="!isMobileView">
        <BulbIcon />
        6 Suggestions
      </span>
      <label for="sort">
        Sort By :
        <select id="sort" name="sortBy" v-model="selectedSortType" @change="updateSortType">
          <option value="mostUpvotes">Most Upvotes</option>
          <option value="leastUpvotes">Least Upvotes</option>
          <option value="mostComments">Most Comments</option>
          <option value="leastComments">Least Comments</option>
        </select>
      </label>
    </div>
    <button type="submit" @click="goToCreateFeedback">+ Add Feedback</button>
  </article>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { RootState } from '@/store/types';
import BulbIcon from '../assets/svgComponents/bulb-icon.vue';

export default defineComponent({
  name: 'FilterBar',
  props: {
    isMobileView: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  components: {
    BulbIcon,
  },
  setup() {
    const router = useRouter();
    const store = useStore<RootState>();
    const selectedSortType = ref<string>('mostUpvotes');

    const goToCreateFeedback = () => {
      router.push('create-new-feedback');
    };

    const updateSortType = () => {
      store.commit('filterAndSortModule/setSortType', selectedSortType.value);
    };

    return {
      goToCreateFeedback,
      selectedSortType,
      updateSortType,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.filterBar {
  height: 3.5rem;
  background-color: $dark-blue;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem 1rem 1.5rem;

  div {
    width: 60%;
    display: flex;
    align-items: center;
    gap: 1.2rem;

    span {
      display: flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 600;
      font-size: 1rem;
      color: $white;
    }

    label {
      color: $white;
      font-size: 0.8rem;
      font-weight: 400;
      cursor: pointer;

      select {
        background-color: $dark-blue;
        border-color: $dark-blue;
        color: white;
        width: 7rem;
        font-size: 0.8rem;
        font-weight: 600;
        cursor: pointer;
      }
    }

    label:hover {
      color: #F2F4FE;

      select:hover {
        color: #F2F4FE;

      }
    }

  }

  button {
    background-color: $purple;
    color: $white;
    font-weight: 600;
    font-size: 0.875rem;
    height: 2.5rem;
    width: 8rem;
    border: none;
    border-radius: 0.625rem;
    cursor: pointer;
  }

  button:hover {
    background-color: $active-purple;
    color: $active-white
  }
}

@media (min-width: 768px) {
  .filterBar {
    width: 85vw;
    margin-left: auto;
    margin-right: auto;
    border-radius: 0.625rem;
    height: 4.5rem;
  }
}

@media (min-width: 1440px) {
  .filterBar {
    width: 56vw;
  }
}
</style>
