<template>
  <article :class="$style.addComment">
    <h2>Add Comment</h2>
    <label for="comment">
      <textarea id="comment" placeholder="Type your comment here" :maxlength="maxChars" v-model="content" />
    </label>
    <div>
      <span>{{ remainingChars }} characters left</span>
      <button @click="submitComment">Post Comment</button>
    </div>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { RootState } from '../store/types/index';

export default defineComponent({
  name: 'AddComment',
  setup() {
    const maxChars = 250;
    const content = ref<string>('');
    const suggestionId = useRoute().params.id.toString();
    const store = useStore<RootState>();

    // Compute the number of characters left
    const remainingChars = computed<number>(() => maxChars - content.value.length);

    const submitComment = () => {
      // Get the user details from the current user or use mock data if not available.
      const { currentUser } = store.state.userAndSuggestions[0];

      // Call the addComment mutation and pass the necessary information.
      store.commit('addComment', {
        suggestionId: Number(suggestionId),
        content: content.value,
        user: currentUser,
      });

      // Clear the input field after adding the comment.
      content.value = '';
    };

    return {
      maxChars,
      content,
      remainingChars,
      submitComment,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.addComment {
  width: 85vw;
  margin: 1.5rem auto;
  padding: 1.5rem 1.4rem;
  background-color: $white;
  border-radius: 0.625rem;

  h2 {
    font-size: 1.1rem;
    font-weight: 700;
    color: $active-dark-blue;
    margin-bottom: 1.5rem;
  }

  label {

    textarea {
      width: 100%;
      background-color: $bg-blue;
      padding: 1rem;
      border: none;
      border-radius: 0.625rem;
      resize: none;

      &:focus {
        outline: none;
        border: 1px solid $blue;
      }
    }
  }

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1.5rem;

    span {
      font-size: 0.8rem;
      font-weight: 400;
      color: $active-dark-blue;
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
      padding: 0.3rem 0.5rem;
      cursor: pointer;

      &:hover {
        background-color: $active-purple;
        color: $active-white;
      }
    }
  }
}
</style>
