<template>
  <div :class="$style.suggestions">
    <article v-for="suggestion of suggestions[0].productRequests" :key="suggestion.id" :class="$style.suggestion">
      <span v-if="!isMobileView" :class="$style.upvote">
        <img src="../assets/upvote-icon.svg" alt="Upvote icon" />
        {{ suggestion.upvotes }}
      </span>
      <div :class="$style.feedback">
        <h2>{{ suggestion.title }}</h2>
        <p>{{ suggestion.description }}</p>
        <span :class="$style.category"> {{ suggestion.category.charAt(0).toUpperCase() + suggestion.category.slice(1)
        }}</span>
      </div>
      <div v-if="isMobileView">
        <span>
          <img src="../assets/upvote-icon.svg" alt="Upvote icon" />
          {{ suggestion.upvotes }}
        </span>
        <span>
          <img src="../assets/comment.svg" alt="Comment icon" />
          {{ suggestion?.comments?.length }}
        </span>
      </div>
      <span v-else :class="$style.comment">
        <img src="../assets/comment.svg" alt="Comment icon" />
        {{ suggestion?.comments?.length }}
      </span>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import allSuggestions from '../data.json';

interface User {
  image: string;
  name: string;
  username: string;
}

interface Comment {
  id?: number;
  content: string;
  user: User;
  replies?: Comment[];
}

interface ProductRequest {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
}

interface SuggestionsData {
  currentUser: User;
  productRequests: ProductRequest[];
}

export default defineComponent({
  name: 'SuggestionsBox',
  props: {
    isMobileView: {
      type: Boolean,
      required: true,
    },
  },
  setup() {
    const suggestions: SuggestionsData[] = allSuggestions;

    return {
      suggestions,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/_variables.scss';

.suggestions {
  margin-top: 2rem;
  margin-bottom: 7rem;
  display: grid;
  justify-content: center;
  gap: 1rem;

  .suggestion {
    width: 85vw;
    height: max-content;
    background-color: $white;
    border-radius: 0.625rem;
    padding: 1.5rem;

    .feedback {
      display: grid;

      h2 {
        font-weight: 700;
        font-size: 0.8rem;
        color: $dark-blue;
        margin-bottom: 0.25rem;
      }

      p {
        font-weight: 400;
        font-size: 0.8rem;
        color: $active-dark-blue;
        margin-bottom: 0.7rem;
      }

      .category {
        background-color: $thin-blue;
        color: $blue;
        padding: 0.3rem 1rem;
        font-size: 0.8rem;
        border-radius: 0.625rem;
        width: max-content;
      }
    }

    div {
      margin-top: 1.1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      span:first-child {
        background-color: $thin-blue;
        color: $very-dark-blue;
        display: flex;
        align-items: center;
        font-size: 0.8rem;
        font-weight: 700;
        height: 2rem;
        padding: 0.3rem 1rem;
        border-radius: 0.625rem;

        img {
          width: 1rem;
          height: 0.4rem;
          margin-right: 0.25rem;
        }
      }

      span:last-child {
        color: $very-dark-blue;
        font-size: 0.8rem;
        font-weight: 700;
        display: flex;
        align-items: center;

        img {
          margin-right: 0.25rem;
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .suggestions {
    .suggestion {
      display: grid;
      grid-template-columns: 10% 80% 10%;

      div {
        display: grid;
        justify-self: center;
        width: 90%;
        margin: 0;

        span {
          width: max-content;
        }
      }

      .upvote {
        background-color: $thin-blue;
        color: $very-dark-blue;
        display: grid;
        font-size: 0.8rem;
        font-weight: 700;
        width: 2.5rem;
        height: 3.5rem;
        padding: 0.3rem 0.5rem;
        border-radius: 0.625rem;
        align-self: center;
        text-align: center;

        img {
          width: 1rem;
          height: 0.4rem;
          margin-left: 0.25rem;
          margin-top: 0.5rem;

        }
      }

      .comment {
        color: $very-dark-blue;
        font-size: 0.8rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        justify-self: end;
        align-self: center;

        img {
          margin-right: 0.6rem;
        }
      }
    }
  }
}

@media (min-width: 1440px) {
  .suggestions {
    .suggestion {
      width: 56vw;

    }
  }
}
</style>
