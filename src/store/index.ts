import { createStore } from 'vuex';
import { findCommentsById, findRequestsById } from '@/utils/getElements';
import userAndSuggestions from '../data.json';
import filterAndSortModule from './filterAndSortModule';
import { ProductRequest, RootState } from './types';

// Initialize your store
export default createStore<RootState>({
  state: { userAndSuggestions } as RootState,
  mutations: {
    addProductRequest(state, suggestion: ProductRequest) {
      state.userAndSuggestions[0].productRequests.push(suggestion);
    },
    editProductRequest(state, { updatedSuggestion }: { updatedSuggestion: ProductRequest }) {
      const suggestionToEditIndex = state.userAndSuggestions[0]
        .productRequests.findIndex((req) => req.id === updatedSuggestion.id);
      if (suggestionToEditIndex !== -1) {
        state.userAndSuggestions[0].productRequests[suggestionToEditIndex] = updatedSuggestion;
      }
    },
    deleteProductRequest(state, id: number) {
      const suggestionToDeleteindex = state.userAndSuggestions[0]
        .productRequests.findIndex((suggestion) => suggestion.id === id);
      if (suggestionToDeleteindex !== -1) {
        state.userAndSuggestions[0].productRequests.splice(suggestionToDeleteindex, 1);
      }
    },
    addComment(state, {
      suggestionId, newCommentId, content, user,
    }) {
      const suggestionToComment = state.userAndSuggestions[0].productRequests.find(
        (s) => s.id === suggestionId,
      );
      if (suggestionToComment) {
        suggestionToComment.comments?.push(
          { id: newCommentId, content, user },
        );
      }
    },
    addReply(state, { requestId, commentId, reply }) {
      const request = findRequestsById(state.userAndSuggestions[0].productRequests, requestId);
      console.log(request);
      if (request) {
        const comment = findCommentsById(request.comments, commentId);
        if (comment) {
          console.log(comment);
          if (!comment.replies) {
            comment.replies = [];
          }
          comment.replies.push(reply);
        }
      }
    },
    updateUpvotes(state, { requestId, voteType }) {
      const suggestion = state.userAndSuggestions[0].productRequests.find(
        (s) => s.id === requestId,
      );
      if (suggestion) {
        if (voteType === 'upvote') {
          suggestion.upvotes += 1;
          suggestion.hasUpvoted = true;
        } else if (voteType === 'downvote') {
          suggestion.upvotes -= 1;
          suggestion.hasUpvoted = false;
        }
      }
    },
  },
  getters: {
    productRequestsByStatus: (state) => (status: string) => {
      const { productRequests } = state.userAndSuggestions[0];
      return productRequests.filter((request) => request.status === status);
    },
  },
  actions: {
    // Your actions here
  },
  modules: {
    filterAndSortModule,
  },
});
