export interface User {
  $id: string;
  name: string;
  email: string;
  avatarUrl?: string;
}

export interface Discussion {
  $id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  authorId: string;
  author: User;
  images: string[];
  tags: string[];
  upvotes: number;
  downvotes: number;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  $id: string;
  discussionId: string;
  content: string;
  authorId: string;
  author: User;
  parentId?: string;
  createdAt: string;
}

export interface Tag {
  $id: string;
  name: string;
  slug: string;
}