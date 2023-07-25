<template>
  <section :class="$style.newFeedback">
    <span :class="$style.goBack" @click="goBack" @keydown.enter="goBack">
      <LeftArrowIcon />
      Go back
    </span>
    <article :class="$style.newFeedbackForm">
      <PlusIcon />
      <h1>Create New Feedback</h1>
      <form @submit.prevent="validateAndAddFeedback">
        <label for="title" :class="$style.title">
          <span>Feedback Title</span>
          <p>Add a short, descriptive headline</p>
          <input id="title" type="text" v-model="newFeedback.title" :class="{ [$style.error]: !isTitleValid }"
            @input="handleInput" />
          <span v-if="!isTitleValid" :class="$style['error-message']">Title can not be empty</span>
        </label>
        <label for="category" :class="$style.category">
          <span>Category</span>
          <p>Choose a category for your feedback</p>
          <select id="category" v-model="newFeedback.category" :class="{ [$style.error]: !isCategoryValid }"
            @change="handleInput">
            <option value="ui">UI</option>
            <option value="ux">UX</option>
            <option value="enhancement">Enhancement</option>
            <option value="feature">Feature</option>
            <option value="bug">Bug</option>
          </select>
          <span v-if="!isCategoryValid" :class="$style['error-message']">Category can not be empty</span>
        </label>
        <label for="detail" :class="$style.detail">
          <span>Feedback Detail</span>
          <p>Include any specific comments on what should be improved, added, etc.</p>
          <textarea id="detail" v-model="newFeedback.description" :class="{ [$style.error]: !isDescriptionValid }"
            @input="handleInput" />
          <span v-if="!isDescriptionValid" :class="$style['error-message']">Detail can not be empty</span>
        </label>
        <div>
          <button type="submit" :class="$style.add">Add Feedback</button>
          <button type="button" :class="$style.cancel" @click="cancelCreateNewFeedback">Cancel</button>
        </div>
      </form>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ProductRequest, RootState } from '@/store/types';
import LeftArrowIcon from '../assets/svgComponents/left-arrow-icon.vue';
import PlusIcon from '../assets/svgComponents/plus-icon.vue';

export default defineComponent({
  name: 'newFeedback',
  components: {
    LeftArrowIcon,
    PlusIcon,
  },
  setup() {
    const router = useRouter();
    const store = useStore<RootState>();
    const newFeedback = ref<ProductRequest>({
      id: 0,
      title: '',
      category: '',
      upvotes: 0,
      status: 'suggestion',
      description: '',
      comments: [],
    });

    const goBack = () => {
      router.back();
    };

    const isTitleValid = ref<boolean>(true);
    const isCategoryValid = ref<boolean>(true);
    const isDescriptionValid = ref<boolean>(true);

    const handleInput = () => {
      isTitleValid.value = newFeedback.value.title.trim() !== '';
      isCategoryValid.value = newFeedback.value.category !== '';
      isDescriptionValid.value = newFeedback.value.description.trim() !== '';
    };

    // Function to generate a random ID
    const generateId = (): number => Math.floor(Math.random() * 1000000);

    const addNewFeedback = () => {
      const newRequestId: number = generateId();
      newFeedback.value.id = newRequestId;

      store.commit('addProductRequest', newFeedback.value);

      newFeedback.value = {
        id: 0,
        title: '',
        category: '',
        upvotes: 0,
        status: 'suggestion',
        description: '',
        comments: [],
      };

      router.push('/');
    };

    const validateAndAddFeedback = () => {
      isTitleValid.value = newFeedback.value.title.trim() !== '';
      isCategoryValid.value = newFeedback.value.category !== '';
      isDescriptionValid.value = newFeedback.value.description.trim() !== '';

      if (isTitleValid.value && isCategoryValid.value && isDescriptionValid.value) {
        addNewFeedback();
      }
    };

    const cancelCreateNewFeedback = () => {
      router.push('/');
    };

    return {
      goBack,
      newFeedback,
      validateAndAddFeedback,
      isCategoryValid,
      isTitleValid,
      isDescriptionValid,
      cancelCreateNewFeedback,
      handleInput,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.newFeedback {
  margin-top: 2.12rem;

  .goBack {
    display: block;
    width: 85vw;
    margin: 0 auto;
    font-size: 0.8rem;
    font-weight: 600;
    color: $active-dark-blue;
    cursor: pointer;

    svg {
      margin-right: 1rem;
    }

    &:hover {
      text-decoration: underline;
    }
  }

  .newFeedbackForm {
    position: relative;
    width: 85vw;
    margin: 3.7rem auto;
    border-radius: 0.625rem;
    background-color: $white;
    padding: 2.75rem 1.5rem;

    svg {
      position: absolute;
      top: -1.2rem;
      left: 1.5rem;
    }

    h1 {
      color: $very-dark-blue;
      font-size: 1.125rem;
      font-weight: 700;
    }

    label {
      display: block;
      margin-top: 1.5rem;

      span {
        color: $very-dark-blue;
        font-size: 0.8rem;
        font-weight: 700;
      }

      p {
        color: $active-dark-blue;
        font-size: 0.8rem;
        font-weight: 400;
      }

      input,
      select,
      textarea {
        background-color: $bg-blue;
        width: 100%;
        border: none;
        height: 3rem;
        border-radius: 0.625rem;
        margin-top: 1rem;
        padding: 0 0.75rem;

        &:focus {
          border: 1px solid $blue;
          outline: none;
        }
      }

      textarea {
        height: 7.5rem !important;
        padding: 0.75rem;
        resize: none;
      }

      .error {
        border: 1px solid red;
      }

      .error-message {
        color: red;
        font-weight: 400;
      }
    }

    button {
      width: 100%;
      height: 2.5rem;
      padding: 0.6rem 2.15rem;
      border: none;
      border-radius: 0.625rem;
      font-weight: 700;
      font-size: 0.8rem;
      cursor: pointer;
    }

    .add {
      margin-top: 2.5rem;
      margin-bottom: 1rem;
      background-color: $purple;
      color: $white;

      &:hover {
        background-color: $active-purple;
        color: $active-white;
      }
    }

    .cancel {
      background-color: $very-dark-blue;
      color: $white;

      &:hover {
        background-color: $active-very-dark-blue;
        color: $active-white;
      }
    }
  }
}

@media (min-width: 768px) {
  .newFeedback {
    .newFeedbackForm {
      padding-top: 3.2rem;

      svg {
        width: 2.5rem;
        height: 2.5rem;
      }

      div {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        gap: 1rem;
        margin-top: 2rem;

        button {
          width: max-content;
          height: 2.75rem;
          margin: 0 !important;
        }
      }
    }
  }
}

@media (min-width: 1440px) {
  .newFeedback {
    .goBack {
      width: 46vw;
    }

    .newFeedbackForm {
      width: 46vw;
    }
  }
}
</style>
