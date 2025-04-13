import { Client, Account, Databases, Storage } from 'appwrite';

const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export const appwriteConfig = {
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  discussionsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_DISCUSSIONS_COLLECTION_ID!,
  commentsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_COMMENTS_COLLECTION_ID!,
  tagsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_TAGS_COLLECTION_ID!,
  imagesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_IMAGES_BUCKET_ID!,
};