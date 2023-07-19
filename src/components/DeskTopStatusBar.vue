<template>
  <header>
    <article>
      <div>
        <span>FeedBack App</span>
        <span>Feedback Board</span>
      </div>
    </article>
    <article :class="$style.categories">
      <span>All</span>
      <span>UI</span>
      <span>UX</span>
      <span>Enhancement</span>
      <span>Bug</span>
      <span>Feature</span>
    </article>
    <article :class="$style.roadmap">
      <div :class="$style.roadmapHeading">
        <h2>Roadmap</h2>
        <span>View</span>
      </div>
      <div>
        <div>
          <span>
            <img src="../assets/orange-dot.svg" alt="color tracker" />
            Planned
          </span>
          <span>2</span>
        </div>
        <div>
          <span>
            <img src="../assets/purple-dot.svg" alt="color tracker" />
            In-Progress
          </span>
          <span>3</span>
        </div>
        <div>
          <span>
            <img src="../assets/blue-dot.svg" alt="color tracker" />
            Live
          </span>
          <span>1</span>
        </div>
      </div>
    </article>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DesktopStatusBar',
});
</script>

<style module lang="scss">
@import '../styles/variables';

header {
  width: 85vw;
  margin-left: auto;
  margin-right: auto;
  padding-top: 3.5rem;
  padding-bottom: 2.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0.6rem;

  article {
    height: 11rem;
    border-radius: 0.625rem;
  }

  article:first-child {
    background: $header-gradient;
    padding-left: 1.5rem;
    padding-top: 6.1rem;

    div {
      display: grid;

      span {
        white-space: nowrap;
        color: $white;
      }

      span:first-child {
        font-weight: 600;
        font-size: 1.25rem;
      }

      span:last-child {
        font-weight: 300;
        font-size: 0.9rem;
      }
    }

  }

  .categories {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    padding: 1.5rem;
    background-color: $white;

    span {
      background-color: $thin-blue;
      color: $blue;
      height: 1.875rem;
      padding: 0.3rem 1rem;
      font-size: 0.8rem;
      font-weight: 600;
      border-radius: 0.625rem;
    }
  }

  .roadmap {
    display: grid;
    gap: 1.5rem;
    padding: 1.1rem 1.5rem;
    background-color: $white;

    .roadmapHeading {
      display: flex;
      justify-content: space-between;
      align-items: center;

      h2 {
        font-size: 1.125rem;
        color: $very-dark-blue;
        font-weight: 700;
      }

      span {
        color: $blue;
        font-size: 0.8rem;
        font-weight: 600;
        text-decoration: underline;
      }
    }

    div:last-child {
      div {
        display: flex;
        justify-content: space-between;
        align-items: center;

        span:first-child {
          display: flex;
          gap: 1rem;
          color: $active-dark-blue;
          font-weight: 400;
          font-size: 1rem;
        }

        span:last-child {
          font-weight: 600;
          font-size: 1rem;
          color: $active-dark-blue;
        }
      }
    }
  }
}

@media (min-width: 1440px) {
  header {
    grid-template-columns: none;
    grid-template-rows: 1fr 1fr 1fr;
    width: 18vw;
    padding: 0;
    gap: 1.5rem;
  }
}
</style>
