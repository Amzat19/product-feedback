export interface User {
  image: string;
  name: string;
  username: string;
}

export interface CommentType {
  id?: number;
  content: string;
  replyingTo?: string;
  user: User;
  replies?: CommentType[];
}

export interface ProductRequest {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  hasUpvoted?: boolean;
  status: string;
  description: string;
  comments?: CommentType[];
}

export interface UserAndProductRequests {
  currentUser: User;
  productRequests: ProductRequest[];
}

export interface FilterAndSortState {
  selectedCategory: string | null;
  sortType: string;
}

export interface RootState {
  userAndSuggestions: UserAndProductRequests[];
  filterAndSortModule: FilterAndSortState
}
