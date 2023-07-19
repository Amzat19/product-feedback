<template>
  <aside>
    <div :class="$style.sidebar">
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
    </div>

  </aside>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SideBar',
});
</script>

<style module lang="scss">
@import '../styles/_variables.scss';

aside {
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;

  .sidebar {
    width: 70%;
    height: 100vh;
    right: 0;
    position: absolute;
    background-color: $bg-blue;
    padding-top: 6rem;

    article {
      width: 85%;
      height: 11rem;
      background-color: $white;
      margin-bottom: 1.5rem;
      margin-left: auto;
      margin-right: auto;
      border-radius: 0.625rem;
    }

    .categories {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      padding: 1.5rem;

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
}
</style>
