<template>
  <article :class="$style.suggestion" @click="viewFeedbackDetail(suggestion)"
    @keydown.enter="viewFeedbackDetail(suggestion)">
    <span v-if="!isMobileView" :class="[[$style.upvote], { [$style['hasUpvoted']]: suggestion.hasUpvoted }]"
      @click="toggleUpvote(suggestion, $event)" @keydown.enter="toggleUpvote(suggestion, $event)">
      <UpvoteIcon />
      {{ suggestion.upvotes }}
    </span>
    <div :class="$style.feedback">
      <h2 @click="viewFeedbackDetail(suggestion)" @keydown.enter="viewFeedbackDetail(suggestion)">{{ suggestion.title }}
      </h2>
      <p>{{ suggestion.description }}</p>
      <span :class="$style.category"> {{ suggestion.category.charAt(0).toUpperCase() + suggestion.category.slice(1)
      }}</span>
    </div>
    <div v-if="isMobileView">
      <span @click="toggleUpvote(suggestion, $event)" @keydown.enter="toggleUpvote(suggestion, $event)"
        :class="[{ [$style['hasUpvoted']]: suggestion.hasUpvoted }]">
        <UpvoteIcon />
        {{ suggestion.upvotes }}
      </span>
      <span @click="viewFeedbackDetail(suggestion)" @keydown.enter="viewFeedbackDetail(suggestion)">
        <CommentIcon />
        {{ suggestion?.comments ? totalCommentsWithReplies(suggestion?.comments) : 0 }}
      </span>
    </div>
    <span v-else :class="$style.comment">
      <CommentIcon />
      {{ suggestion?.comments ? totalCommentsWithReplies(suggestion?.comments) : 0 }}
    </span>
  </article>
</template>

<script lang="ts">
import { PropType, computed, defineComponent } from 'vue';
import router from '@/router';
import { useStore } from 'vuex';
import { CommentType, ProductRequest, RootState } from '@/store/types';
import UpvoteIcon from '../assets/svgComponents/upvote-icon.vue';
import CommentIcon from '../assets/svgComponents/comment-icon.vue';

export default defineComponent({
  name: 'SuggestionComponent',
  props: {
    isMobileView: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
    suggestion: {
      type: Object as PropType<ProductRequest>,
      required: true,
    },
  },
  components: {
    CommentIcon,
    UpvoteIcon,
  },
  setup() {
    const store = useStore<RootState>();
    const { currentUser, productRequests } = store.state.userAndSuggestions[0];

    const viewFeedbackDetail = (suggestion: ProductRequest) => {
      router.push(`/feedback-detail/${suggestion.id}`);
    };

    const totalCommentsWithReplies = (comments: CommentType[]) => computed(
      () => comments?.reduce((totalCount, comment) => {
        const repliesCount = comment.replies ? comment.replies.length : 0;
        return totalCount + 1 + repliesCount;
      }, 0),
    );

    const toggleUpvote = (suggestion: ProductRequest, event: MouseEvent | KeyboardEvent) => {
      if (event) {
        // Stop the click event from propagating to the parent element (the article)
        event.stopPropagation();
      }

      const voteType: 'downvote' | 'upvote' = suggestion.hasUpvoted ? 'downvote' : 'upvote';
      store.commit('updateUpvotes', { requestId: suggestion.id, voteType });
    };

    return {
      currentUser,
      productRequests,
      viewFeedbackDetail,
      totalCommentsWithReplies,
      toggleUpvote,
    };
  },

});
</script>

<style module lang="scss">
@import '../styles/variables';

.suggestion {
  width: 85vw;
  height: max-content;
  background-color: $white;
  border-radius: 0.625rem;
  padding: 1.5rem;
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
      cursor: pointer;

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
}

.suggestion:hover {
  .feedback {
    h2 {
      color: $blue;
    }
  }
}

@media(min-width: 768px) {
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
      cursor: pointer;

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

@media (min-width: 1440px) {

  .suggestion {
    width: 56vw;
  }
}
</style>
