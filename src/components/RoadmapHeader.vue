<template>
  <header :class="$style.roadmapHeader">
    <div :class="$style.roadmapBox">
      <div>
        <span :class="$style.goBack" @click="goBack" @keydown.enter="goBack">
          <LeftArrowIcon />
          Go back
        </span>
        <span :class="$style.title">
          Roadmap
        </span>
      </div>
      <button type="button" @click="goToCreateFeedback">+ Add Feedback</button>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import LeftArrowIcon from '../assets/svgComponents/left-arrow-icon.vue';

export default defineComponent({
  name: 'RoadmapHeader',
  components: {
    LeftArrowIcon,
  },
  setup() {
    const router = useRouter();

    const goBack = () => {
      router.back();
    };

    const goToCreateFeedback = () => {
      router.push('/create-new-feedback');
    };

    return {
      goBack,
      goToCreateFeedback,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.roadmapHeader {
  background: $very-dark-blue;
  height: 6.25rem;
  padding: 1.88rem 1.5rem;

  .roadmapBox {
    width: 85vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    div {
      display: grid;

      .goBack {
        color: $white;
        font-size: 0.8rem;
        font-weight: 700;
        margin-bottom: 0.3rem;
        cursor: pointer;

        svg {
          margin-right: 0.5rem;

          path {
            stroke: #CDD2EE;
          }
        }

        &:hover {
          text-decoration: underline;
        }
      }

      .title {
        font-size: 1.1rem;
        font-weight: 700;
        color: $white;
      }
    }

    button {
      background-color: $purple;
      color: $white;
      padding: 0.4rem 0.5rem;
      height: 2.5rem;
      border: none;
      border-radius: 0.625rem;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;

      &:hover {
        background-color: $active-purple;
        color: $white;
      }
    }
  }
}

@media (min-width: 768px) {
  .roadmapHeader {
    width: 85vw;
    border-radius: 0.625rem;
    margin: 3.5rem auto 0 auto;

    div {
      width: 100% !important;

      button {
        width: 9rem;
      }
    }
  }
}

@media (min-width: 1440px) {
  .roadmapHeader {
    width: 75vw;
  }
}
</style>
