import { ProductRequest } from '@/store/types';

function getTotalComments(productRequest: ProductRequest): number {
  if (!productRequest.comments) {
    return 0;
  }

  const commentsCount = productRequest.comments.length;
  const repliesCount = productRequest.comments.reduce(
    (totalReplies, comment) => (
      comment.replies ? totalReplies + comment.replies.length : totalReplies
    ),
    0,
  );

  return commentsCount + repliesCount;
}

export default getTotalComments;
