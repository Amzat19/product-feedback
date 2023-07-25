import { CommentType, ProductRequest, RootState } from '@/store/types';

const getSuggestionById = (
  store: RootState,
  id: string,
): ProductRequest => { // Use the 'ProductRequest' type for the return value
  const suggestion = store.userAndSuggestions[0].productRequests.find(
    (request) => request.id === Number(id),
  );

  if (!suggestion) {
    throw new Error(`Suggestion with id ${id} not found.`);
    // Alternatively, you can return null:
    // return null;
  }

  return suggestion;
};

export const findRequestsById = (
  requests: ProductRequest[],
  requestId: number,
) => requests.find((req) => req.id === requestId);

export const findCommentsById = (
  comments: CommentType[] | undefined,
  commentId: number,
) => comments?.find((com) => com.id === commentId);

export default getSuggestionById;
