import { Module } from 'vuex';
import getTotalComments from '@/utils/totalComments';
import {
  FilterAndSortState, RootState,
} from './types';

const filterAndSortModule: Module<FilterAndSortState, RootState> = {
  namespaced: true,
  state: () => ({
    selectedCategory: null,
    sortType: 'mostUpvotes',
    sortedProductRequestsLength: 0,
  }),
  mutations: {
    setSelectedCategory(state, category: string | null) {
      state.selectedCategory = category;
    },
    setSortType(state, type: string) {
      state.sortType = type;
    },
  },
  getters: {
    filteredProductRequests(state, getters, rootState) {
      const { selectedCategory } = state;
      const { productRequests } = rootState.userAndSuggestions[0];

      if (!selectedCategory) {
        return productRequests;
      }
      return productRequests.filter(
        (request) => request.category === selectedCategory,
      );
    },
    sortedProductRequests(state, getters) {
      const { sortType } = state;
      const { filteredProductRequests } = getters;

      if (sortType === 'mostUpvotes') {
        const filteredRequests = [...filteredProductRequests].sort((a, b) => b.upvotes - a.upvotes);
        return filteredRequests;
      } if (sortType === 'mostComments') {
        const filteredRequests = [...filteredProductRequests].sort(
          (a, b) => getTotalComments(b) - getTotalComments(a),
        );
        return filteredRequests;
      } if (sortType === 'leastUpvotes') {
        const filteredRequests = [...filteredProductRequests].sort((a, b) => a.upvotes - b.upvotes);
        return filteredRequests;
      } if (sortType === 'leastComments') {
        const filteredRequests = [...filteredProductRequests].sort(
          (a, b) => getTotalComments(a) - getTotalComments(b),
        );
        return filteredRequests;
      }
      return filteredProductRequests;
    },
  },
};

export default filterAndSortModule;
