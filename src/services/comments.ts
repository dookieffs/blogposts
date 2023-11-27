import type { PostComment } from "@utils/types";
import { client } from "@services/client";

export async function getComments() {
  const { data } = await client.get<PostComment[]>("/comments");

  return data;
}
export async function getCommentsByPostId(postId: number) {
  // const { data } = await client.get<PostComment[]>(
  //   `/comments?postId=${postId}`
  // );
  // return data;

  const comments = await getComments();

  return Promise.resolve(
    comments.filter(({ postId: commentPostId }) => commentPostId === postId)
  );
}
