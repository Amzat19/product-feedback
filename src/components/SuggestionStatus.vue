<template>
  <article :class="[[$style.suggestion], {
    [$style.live]: mobileStatus === 'live', [$style.planned]:
      mobileStatus === 'planned', [$style.inProgress]: mobileStatus === 'in-progress'
  }]">
    <div :class="$style.status">
      <BlueDotIcon v-if="mobileStatus === 'live'" />
      <PurpleDotIcon v-if="mobileStatus === 'in-progress'" />
      <OrangeDotIcon v-if="mobileStatus === 'planned'" />
      <p>{{ suggestion?.status.charAt(0).toUpperCase() + suggestion?.status.slice(1) }}</p>
    </div>
    <h3>{{ suggestion?.title }}</h3>
    <p :class="$style.content">{{ suggestion?.description }}</p>
    <span :class="$style.category">{{ suggestion?.category.charAt(0).toUpperCase() + suggestion?.category.slice(1)
    }}</span>
    <div :class="$style.upvoteAndComment">
      <span :class="[[$style.upvote], { [$style['hasUpvoted']]: suggestion.hasUpvoted }]"
        @click="toggleUpvote(suggestion)" @keydown.enter="toggleUpvote(suggestion)">
        <UpvoteIcon />
        {{ suggestion?.upvotes }}
      </span>
      <span :class="$style.comment">
        <CommentIcon />
        {{ suggestion?.comments?.length }}
      </span>
    </div>
  </article>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { useStore } from 'vuex';
import PurpleDotIcon from '@/assets/svgComponents/purple-dot-icon.vue';
import OrangeDotIcon from '@/assets/svgComponents/orange-dot-icon.vue';
import BlueDotIcon from '@/assets/svgComponents/blue-dot-icon.vue';
import { ProductRequest, RootState } from '@/store/types';
import UpvoteIcon from '../assets/svgComponents/upvote-icon.vue';
import CommentIcon from '../assets/svgComponents/comment-icon.vue';

export default defineComponent({
  name: 'SuggestionStatus',
  props: {
    suggestion: {
      type: Object as PropType<ProductRequest>,
      required: true,
    },
    mobileStatus: {
      type: String as PropType<string>,
      required: true,
    },
  },
  components: {
    CommentIcon,
    UpvoteIcon,
    PurpleDotIcon,
    OrangeDotIcon,
    BlueDotIcon,
  },

  setup() {
    const store = useStore<RootState>();

    const toggleUpvote = (suggestion: ProductRequest) => {
      const voteType: 'downvote' | 'upvote' = suggestion.hasUpvoted ? 'downvote' : 'upvote';
      store.commit('updateUpvotes', { requestId: suggestion.id, voteType });
    };

    return {
      toggleUpvote,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.suggestion {
  background-color: $white;
  border-radius: 0.625rem;
  padding: 1rem 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;

  .status {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 1rem;

    p {
      font-weight: 400;
      color: $active-dark-blue;
      font-size: 0.8rem;
    }
  }

  h3 {
    color: $very-dark-blue;
    font-weight: 700;
    font-size: 0.8125rem;
    margin-bottom: 1rem;
    cursor: text;
  }

  .content {
    color: $active-dark-blue;
    font-weight: 400;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    cursor: text;
  }

  .category {
    display: block;
    background-color: $thin-blue;
    width: max-content;
    color: $blue;
    padding: 0.3rem 1rem;
    font-size: 0.8rem;
    font-weight: 600;
    border-radius: 0.625rem;
  }

  .upvoteAndComment {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1rem;

    .upvote {
      background-color: $thin-blue;
      color: $very-dark-blue;
      border-radius: 0.625rem;
      padding: 0.3rem 1rem;
      font-size: 0.8rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }

    .upvote:hover {
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

    .comment {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8rem;
      font-weight: 700;
      color: $very-dark-blue;
    }
  }
}

.inProgress {
  border-top: 0.375rem solid $purple;
}

.live {
  border-top: 0.375rem solid $light-blue;
}

.planned {
  border-top: 0.375rem solid $orange;
}
</style>
