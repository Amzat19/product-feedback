<template>
  <article :class="$style.filterBar">
    <div>
      <span v-if="!isMobileView">
        <img src="../assets/bulb.svg" alt="bulb" />
        6 Suggestions
      </span>
      <label for="sort">
        Sort By :
        <select id="sort" name="sortBy" value="">
          <option value="">Most Upvotes</option>
          <option value="">Least Upvotes</option>
          <option value="">Most Comments</option>
          <option value="">Least Comments</option>
        </select>
      </label>
    </div>
    <button type="submit">+ Add Feedback</button>
  </article>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FilterBar',
  props: {
    isMobileView: {
      type: Boolean,
      required: true,
    },
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

      select {
        background-color: $dark-blue;
        border-color: $dark-blue;
        color: white;
        width: 7rem;
        font-size: 0.8rem;
        font-weight: 600;
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
