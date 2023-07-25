<template>
  <section :class="$style.editFeedback">
    <span :class="$style.goBack" @click="goBack" @keydown.enter="goBack">
      <LeftArrowIcon />
      Go back
    </span>
    <article :class="$style.editFeedbackForm">
      <EditIcon />
      <h1>Editing ‘{{ suggestion?.title }}’</h1>
      <form @submit.prevent="validateAndEditFeedback">
        <label for="title" :class="$style.title">
          <span>Feedback Title</span>
          <p>Add a short, descriptive headline</p>
          <input id="title" type="text" v-model="editedFeedbackValues.title" :class="{ [$style.error]: !isTitleValid }"
            @input="handleInput" />
          <span v-if="!isTitleValid" :class="$style['error-message']">Title can not be empty</span>
        </label>
        <label for="category" :class="$style.category">
          <span>Category</span>
          <p>Choose a category for your feedback</p>
          <select id="category" v-model="editedFeedbackValues.category" :class="{ [$style.error]: !isCategoryValid }"
            @change="handleInput">
            <option value="ui">UI</option>
            <option value="ux">UX</option>
            <option value="enhancement">Enhancement</option>
            <option value="bug">Bug</option>
            <option value="feature">Feature</option>
          </select>
          <span v-if="!isCategoryValid" :class="$style['error-message']">Category can not be empty</span>
        </label>
        <label for="status">
          <span>Update Status</span>
          <p>Change feature state</p>
          <select id="status" v-model="editedFeedbackValues.status" :class="{ [$style.error]: !isStatusValid }"
            @change="handleInput">
            <option value="suggestion">Suggestion</option>
            <option value="planned">Planned</option>
            <option value="in-progress">In-progress</option>
            <option value="live">Live</option>
          </select>
          <span v-if="!isStatusValid" :class="$style['error-message']">Status can not be empty</span>
        </label>
        <label for="detail" :class="$style.detail">
          <span>Feedback Detail</span>
          <p>Include any specific comments on what should be improved, added, etc.</p>
          <textarea id="detail" v-model="editedFeedbackValues.description"
            :class="{ [$style.error]: !isDescriptionValid }" @input="handleInput" />
          <span v-if="!isDescriptionValid" :class="$style['error-message']">Detail can not be empty</span>
        </label>
        <div>
          <div>
            <button type="submit" :class="$style.add">Save Changes</button>
            <button type="button" :class="$style.cancel" @click="cancelEdit">Cancel</button>
          </div>
          <button type="button" :class="$style.delete" @click="deleteFeedback">Delete</button>
        </div>
      </form>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { ProductRequest, RootState } from '@/store/types';
import getSuggestionById from '@/utils/getElements';
import EditIcon from '../assets/svgComponents/edit-icon.vue';
import LeftArrowIcon from '../assets/svgComponents/left-arrow-icon.vue';

export default defineComponent({
  name: 'EditFeedback',
  components: {
    EditIcon,
    LeftArrowIcon,
  },
  setup() {
    const router = useRouter();
    const id = useRoute().params.id.toString();
    const store = useStore<RootState>();

    const goBack = () => {
      router.back();
    };

    const isTitleValid = ref<boolean>(true);
    const isCategoryValid = ref<boolean>(true);
    const isDescriptionValid = ref<boolean>(true);
    const isStatusValid = ref<boolean>(true);

    const suggestion: ProductRequest = getSuggestionById(store.state, id);

    const editedFeedbackValues = ref<ProductRequest>({
      id: Number(id),
      title: suggestion ? suggestion.title : '',
      category: suggestion ? suggestion.category : '',
      upvotes: suggestion ? suggestion.upvotes : 0,
      status: suggestion ? suggestion.status : 'suggestion',
      description: suggestion ? suggestion.description : '',
      comments: suggestion ? suggestion.comments : [],
    });

    const handleInput = () => {
      isTitleValid.value = editedFeedbackValues.value.title.trim() !== '';
      isCategoryValid.value = editedFeedbackValues.value.category !== '';
      isDescriptionValid.value = editedFeedbackValues.value.description.trim() !== '';
      isStatusValid.value = editedFeedbackValues.value.status !== '';
    };

    const editFeedback = () => {
      store.commit('editProductRequest', { updatedSuggestion: editedFeedbackValues.value });

      editedFeedbackValues.value = {
        id: 0,
        title: '',
        category: '',
        upvotes: 0,
        status: 'suggestion',
        description: '',
        comments: [],
      };

      router.push(`/feedback-detail/${id}`);
    };

    const validateAndEditFeedback = () => {
      isTitleValid.value = editedFeedbackValues.value.title.trim() !== '';
      isCategoryValid.value = editedFeedbackValues.value.category !== '';
      isDescriptionValid.value = editedFeedbackValues.value.description.trim() !== '';

      if (isTitleValid.value
        && isCategoryValid.value
        && isDescriptionValid.value
        && isStatusValid.value) {
        editFeedback();
      }
    };

    const deleteFeedback = () => {
      store.commit('deleteProductRequest', Number(id));
      router.push('/');
    };

    const cancelEdit = () => {
      router.push(`/feedback-detail/${id}`);
    };

    return {
      goBack,
      suggestion,
      editedFeedbackValues,
      validateAndEditFeedback,
      isTitleValid,
      isCategoryValid,
      isDescriptionValid,
      isStatusValid,
      handleInput,
      cancelEdit,
      deleteFeedback,
    };
  },
});
</script>

<style module lang="scss">
@import '../styles/variables';

.editFeedback {
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

  .editFeedbackForm {
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
      width: 2.5rem;
      height: 2.5rem;
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
        font-weight: 400;
        color: red;
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
        color: $white;
      }
    }

    .cancel {
      background-color: $very-dark-blue;
      color: $white;
      margin-bottom: 1rem;

      &:hover {
        background-color: $active-very-dark-blue;
        color: $white;
      }
    }

    .delete {
      background-color: #D73737;
      color: $white;

      &:hover {
        background-color: $active-orange;
        color: $white;
      }
    }
  }
}

@media (min-width: 768px) {
  .editFeedback {
    .editFeedbackForm {
      padding-top: 3.2rem;

      svg {
        width: 3.5rem;
        height: 3.5rem;
      }

      div {
        display: flex;
        flex-direction: row-reverse;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        margin-top: 2rem;

        button {
          width: max-content;
          height: 2.75rem;
          margin: 0 !important;
        }

        div {
          margin: 0 !important;
        }
      }
    }
  }
}

@media (min-width: 1440px) {
  .editFeedback {
    .goBack {
      width: 46vw;
    }

    .editFeedbackForm {
      width: 46vw;
    }
  }
}
</style>
../utils/get
../utils/getElements
