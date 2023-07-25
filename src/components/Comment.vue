<template>
  <div :class="$style.comment">
    <div :class="$style.header">
      <div :class="$style.userDetails">
        <img :src="comment?.user.image" alt="profile picture of user" />
        <div>
          <span :class="$style.name">{{ comment?.user.name }}</span>
          <span :class="$style.username">@{{ comment?.user.username }}</span>
        </div>
      </div>
      <span :class="$style.reply" @click="setReply" @keydown.enter="setReply">Reply</span>
    </div>
    <p><span v-if="comment?.replyingTo">@{{ comment?.replyingTo }}</span> {{ comment?.content }}</p>
    <div :class="$style.replies">
      <Reply v-for="reply in comment?.replies" :key="reply.id" :reply="reply" @reply="replyToReplies" />
    </div>
    <div v-if="showReplyInput" :class="$style.replyField">
      <label for="reply">
        <textarea id="reply" v-model="replyContent" maxlength="250" />
      </label>
      <button type="button" @click="addReply">Post Reply</button>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { CommentType, RootState } from '@/store/types';
import Reply from './Reply.vue';

export default defineComponent({
  name: 'CommentComponent',
  props: {
    comment: {
      type: Object as PropType<CommentType>,
      required: true,
    },
    commentId: {
      type: Number as PropType<number>,
    },
  },
  components: {
    Reply,
  },
  setup(props) {
    const showReplyInput = ref<boolean>(false);
    const replyContent = ref<string>('');
    const store = useStore<RootState>();
    const requestId: string = useRoute().params.id.toString();
    const replyingTo = ref<string>('');

    const toggleReplyInput = () => {
      showReplyInput.value = !showReplyInput.value;
      replyContent.value = '';
    };

    const setReply = () => {
      if (props.comment) {
        replyingTo.value = props.comment.user.username;
      }
      toggleReplyInput();
    };

    const replyToReplies = (replyingToUserName: string) => {
      replyingTo.value = replyingToUserName;
      toggleReplyInput();
    };

    const addReply = () => {
      const commentId: number = props.comment.id || Number(props.commentId);

      const reply = {
        replyingTo,
        content: replyContent.value,
        user: store.state.userAndSuggestions[0].currentUser,
      };

      store.commit('addReply', { requestId: Number(requestId), commentId, reply });

      toggleReplyInput();
    };

    return {
      showReplyInput,
      replyContent,
      setReply,
      replyToReplies,
      addReply,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.comment {
  margin-top: 1.5rem;

  p {
    color: $active-dark-blue;
    font-size: 0.8rem;
    font-weight: 400;
    margin-top: 1rem;
    margin-bottom: 1rem;

    span {
      color: $purple;
      font-weight: 700;
    }
  }

  .header {
    display: flex;
    justify-content: space-between;

    span {
      color: blue;
      font-size: 0.8rem;
      font-weight: 600;
      cursor: pointer;
    }

    span:hover {
      color: $active-bright-blue;
      text-decoration: underline;
    }

    .userDetails {
      display: flex;
      gap: 1rem;

      img {
        border-radius: 50%;
        width: 2.5rem;
        height: 2.5rem;
      }

      div {
        display: grid;

        .name {
          font-size: 0.8rem;
          font-weight: 700;
          color: $very-dark-blue;
        }

        .username {
          font-size: 0.8rem;
          font-weight: 400;
          color: $active-dark-blue;
        }
      }
    }
  }

  .replies {
    padding-left: 1.5rem;
  }

  .replyField {
    width: 100%;
    display: flex;
    gap: 1rem;

    label {
      width: 100%;
      cursor: pointer;

      textarea {
        width: 100%;
        height: 5rem;
        border: 1px solid $blue;
        border-radius: 0.3125rem;
        padding: 1rem;
        background-color: $bg-blue;
        resize: none;
      }

      textarea:focus {
        border-color: 1px solid $blue;
        outline: none;
      }
    }

    button {
      height: 2.75rem;
      min-width: 7.3rem;
      background-color: $purple;
      color: $white;
      padding: 0.3rem 1rem;
      border: none;
      border-radius: 0.625rem;
      font-size: 0.8rem;
      font-weight: 700;
      cursor: pointer;

      &:hover {
        background-color: $active-purple;
        color: $active-white;
      }
    }
  }
}
</style>
