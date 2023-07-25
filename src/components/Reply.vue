<template>
  <div :class="$style.reply">
    <div :class="$style.header">
      <div :class="$style.userDetails">
        <img :src="reply?.user.image" alt="profile picture of user" />
        <div>
          <span :class="$style.name">{{ reply?.user.name }}</span>
          <span :class="$style.username">@{{ reply?.user.username }}</span>
        </div>
      </div>
      <span :class="$style.reply" @click="replyToComment" @keydown.enter="replyToComment">Reply</span>
    </div>
    <p><span>@{{ reply?.replyingTo }}</span> {{ reply?.content }}</p>
  </div>
</template>

<script lang="ts">
import { CommentType } from '@/store/types';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
  name: 'ReplyComponent',
  props: {
    reply: {
      type: Object as PropType<CommentType>,
      required: true,
    },
  },
  setup(props, ctx) {
    const replyToComment = () => {
      ctx.emit('reply', props.reply.user.username);
    };

    return {
      replyToComment,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.reply {
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

      &:hover {
        color: $active-bright-blue;
        text-decoration: underline;
      }
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
}
</style>
