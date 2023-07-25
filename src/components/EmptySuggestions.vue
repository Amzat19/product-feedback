<template>
  <section :class="$style.emptySuggestions">
    <div>
      <EmptyManIcon />
      <h1>There is no feedback yet.</h1>
      <p>Got a suggestion? Found a bug that needs to be squashed? We love hearing about new ideas to improve our app.</p>
      <button>+ Add Feedback</button>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import EmptyManIcon from '../assets/svgComponents/empty-man-icon.vue';

export default defineComponent({
  name: 'EmptySuggestions',
  components: {
    EmptyManIcon,
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.emptySuggestions {
  width: 85vw;
  height: 85vh;
  background-color: $white;
  margin-left: auto;
  margin-right: auto;
  margin-top: 2rem;
  margin-bottom: 2.9rem;
  border-radius: 0.625rem;

  div {
    padding: 4.5rem 1rem;

    svg {
      display: block;
      margin-left: auto;
      margin-right: auto;
    }

    h1 {
      text-align: center;
      color: $very-dark-blue;
      font-size: 1.1rem;
      font-weight: 700;
      margin-top: 2rem;
    }

    p {
      color: $active-dark-blue;
      font-size: 0.8rem;
      font-weight: 400;
      text-align: center;
      margin-top: 0.8rem;
      margin-bottom: 1.5rem;
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
      display: block;
      margin-left: auto;
      margin-right: auto;
      cursor: pointer;
    }

    button:hover {
      background-color: $active-purple;
      color: $active-white;
    }
  }
}

@media (min-width: 768px) {
  section {
    div {

      svg {
        width: 8rem;
        height: 8rem;
      }

      h1 {
        font-size: 1.5rem;
      }

      p {
        width: 26rem;
        font-size: 1rem;
        margin-left: auto;
        margin-right: auto;
      }

      button {
        width: 9.8rem;
        height: 2.75rem;
      }
    }
  }
}
</style>
