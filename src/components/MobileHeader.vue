<template>
  <header :class="$style.mobileHeader">
    <div :class="$style['header-texts']">
      <span>Product Feedback App</span>
      <span>Feedback Board</span>
    </div>
    <img v-if="isSideBarOpen" @click="toggleSideBar" @keydown="toggleSideBarOnEnter" src="../assets/close.svg"
      alt="Close sidebar logo" />
    <img v-else @click="toggleSideBar" @keydown="toggleSideBarOnEnter" src="../assets/hamburger.svg"
      alt="Open sidebar logo" />
  </header>
</template>

<script lang="ts">
import { PropType, SetupContext, defineComponent } from 'vue';

export default defineComponent({
  name: 'MobileHeader',
  props: {
    isSideBarOpen: {
      type: Boolean as PropType<boolean>,
      required: true,
    },
  },
  setup(props, ctx: SetupContext) {
    const toggleSideBar = () => {
      ctx.emit('toggle-sidebar');
    };

    const toggleSideBarOnEnter = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        ctx.emit('toggle-sidebar');
      }
    };

    return {
      toggleSideBar,
      toggleSideBarOnEnter,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.mobileHeader {
  background: $header-gradient;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem 1rem 1.5rem;
  height: 4.5rem;
  z-index: 1;
  position: relative;
  width: 100vw;

  .header-texts {
    display: grid;
    align-items: center;
    align-self: center;

    span {
      color: $white;
      height: 1.2rem;
    }

    span:first-child {
      font-size: 0.9375rem;
      font-weight: 500;
    }

    span:last-child {
      font-size: 0.8125rem;
      font-weight: 300;
    }
  }

  img {
    width: 20px;
    height: 17px;
  }
}
</style>
