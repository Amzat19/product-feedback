<template>
  <main>
    <div :class="$style.historyAndEdit">
      <span @click="goBack" @keydown.enter="goBack">
        <LeftArrowIcon />
        Go back
      </span>
      <button type="button" @click="goToEditFeedback">Edit Feedback</button>
    </div>
    <article :class="$style.feedbackMsg">
      <span v-if="!isMobileView" @click="toggleUpvote(suggestion)" @keydown.enter="toggleUpvote(suggestion)"
        :class="[[$style.upvote], { [$style['hasUpvoted']]: suggestion.hasUpvoted }]">
        <UpvoteIcon />
        {{ suggestion?.upvotes }}
      </span>
      <div :class="$style.feedback">
        <h2>{{ suggestion?.title }}</h2>
        <p>{{ suggestion?.description }}</p>
        <span :class="$style.category" v-if="suggestion?.category">{{ suggestion?.category.charAt(0).toUpperCase() +
          suggestion?.category.slice(1)
        }}</span>
      </div>
      <div v-if="isMobileView">
        <span @click="toggleUpvote(suggestion)" @keydown.enter="toggleUpvote(suggestion)"
          :class="[{ [$style['hasUpvoted']]: suggestion.hasUpvoted }]">
          <UpvoteIcon />
          {{ suggestion?.upvotes }}
        </span>
        <span>
          <CommentIcon />
          {{ totalCommentsWithReplies }}
        </span>
      </div>
      <span v-else :class="$style.comment">
        <CommentIcon />
        {{ totalCommentsWithReplies }}
      </span>
    </article>
    <article :class="$style.feedbackComments">
      <h2>{{ totalCommentsWithReplies }} Comments</h2>
      <Comment v-for="comment of suggestion?.comments" :key="comment.id" :comment="comment" />
    </article>
    <AddComment />
  </main>
</template>

<script lang="ts">
/* eslint-disable */
import { PropType, computed, defineComponent } from 'vue';
import Comment from './Comment.vue';
import AddComment from './AddComment.vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import CommentIcon from '../assets/svgComponents/comment-icon.vue';
import LeftArrowIcon from '../assets/svgComponents/left-arrow-icon.vue';
import UpvoteIcon from '../assets/svgComponents/upvote-icon.vue';
import { ProductRequest, RootState } from '@/store/types';
import getSuggestionById from '@/utils/getElements';
import getTotalComments from '@/utils/totalComments';

export default defineComponent({
  name: 'FeedbackDetail',
  props: {
    isMobileView: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  components: {
    Comment,
    AddComment,
    CommentIcon,
    LeftArrowIcon,
    UpvoteIcon
  },
  setup() {
    const router = useRouter();
    const id = useRoute().params.id.toString()
    const store = useStore<RootState>();

    const goBack = () => {
      router.back()
    };

    const goToEditFeedback = () => {
      router.push(`/edit-feedback/${id}`)
    }

    const suggestion: ProductRequest = getSuggestionById(store.state, id);
    const totalCommentsWithReplies = computed<number>(() => getTotalComments(suggestion));

    const toggleUpvote = (suggestion: ProductRequest) => {
      const voteType: "downvote" | "upvote" = suggestion.hasUpvoted ? 'downvote' : 'upvote';
      store.commit('updateUpvotes', { requestId: suggestion.id, voteType });
    };

    return {
      goBack,
      suggestion,
      totalCommentsWithReplies,
      goToEditFeedback,
      toggleUpvote
    }
  }
});
</script>

<style module lang="scss">
@import '../styles/variables';

main {
  margin-bottom: 5.5rem;

  .historyAndEdit {
    width: 85vw;
    margin: 1.5rem auto;
    display: flex;
    justify-content: space-between;
    align-items: center;

    span {
      width: max-content;
      font-size: 0.8rem;
      font-weight: 600;
      color: $active-dark-blue;
      cursor: pointer;

      svg {
        margin-right: 1rem;
      }
    }

    span:hover {
      text-decoration: underline;
    }

    button {
      background-color: $blue;
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
      background-color: $active-light-blue;
      color: $active-white;
    }
  }

  .feedbackMsg {
    width: 85vw;
    height: max-content;
    background-color: $white;
    border-radius: 0.625rem;
    padding: 1.5rem;
    margin: 0 auto;
    cursor: pointer;

    .feedback {
      display: grid;

      h2 {
        font-weight: 700;
        font-size: 0.8rem;
        color: $dark-blue;
        margin-bottom: 0.25rem;
        cursor: text;
      }

      p {
        font-weight: 400;
        font-size: 0.8rem;
        color: $active-dark-blue;
        margin-bottom: 0.7rem;
        cursor: text;
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

        svg {
          width: 1rem;
          height: 0.4rem;
          margin-right: 0.25rem;
        }
      }

      span:first-child:hover {
        background-color: $active-blue;
      }

      .hasUpvoted {
        background-color: $blue !important;
        color: $white !important;

        svg {
          path {
            stroke: $white;
          }
        }
      }

      span:last-child {
        color: $very-dark-blue;
        font-size: 0.8rem;
        font-weight: 700;
        display: flex;
        align-items: center;
        cursor: pointer;

        svg {
          margin-right: 0.25rem;
        }
      }
    }

    div:last-child {
      margin-top: 1.1rem;
    }
  }

  .feedbackMsg:hover {
    .feedback {
      h2 {
        color: $blue;
      }
    }
  }

  .feedbackComments {
    background-color: $white;
    width: 85vw;
    padding: 1.5rem 1.4rem;
    margin: 1.5rem auto;
    border-radius: 0.625rem;

    h2 {
      color: $very-dark-blue;
      font-size: 1.1rem;
      font-weight: 700;
    }
  }
}

@media (min-width: 768px) {
  main {
    .feedbackMsg {
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

        svg {
          width: 1rem;
          height: 0.4rem;
          margin-left: 0.25rem;
          margin-top: 0.5rem;

        }
      }

      .upvote:hover {
        background-color: $active-blue;
      }

      .hasUpvoted {
        background-color: $blue;
        color: $white;

        svg {
          path {
            stroke: $white;
          }
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
        cursor: pointer;

        svg {
          margin-right: 0.6rem;
        }
      }
    }
  }
}

@media (min-width: 1440px) {
  main {
    .historyAndEdit {
      width: 56vw;
    }

    .feedbackMsg {
      width: 56vw;
    }
  }
}
</style>
@/utils/get@/utils/getElements