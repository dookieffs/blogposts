import type { Post } from "@utils/types";
import { client } from "@services/client";

export async function getPosts() {
  const { data } = await client.get<Post[]>("/posts");

  return data;
}

export async function getPostBySlug(productSlug: string) {
  // const { data } = await client.get<Post[]>(`/posts?slug=${slug}`);
  // return data;

  const posts = await getPosts();
  const post = posts.find(({ slug }) => slug === productSlug);

  if (!post) {
    return Promise.reject("Failed to fetch post.");
  }

  return Promise.resolve(post);
}
