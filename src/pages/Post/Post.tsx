import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { getPostBySlug } from "@services/posts";
import { getCommentsByPostId } from "@services/comments";
import { PostComment } from "@components/index";
import { getUsers } from "@services/users";
import { collect } from "@utils/collection";

import styes from "./Post.module.scss";

function Post() {
  const { slug } = useParams();

  const { data: post, isLoading: isLoadingPosts } = useQuery({
    enabled: !!slug,
    queryKey: ["posts", slug],
    queryFn: () => getPostBySlug(slug!)
  });

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    enabled: !!post,
    queryKey: ["comments", post?.id],
    queryFn: () => getCommentsByPostId(post!.id)
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  const postUser = useMemo(() => {
    if (!(post && users)) {
      return undefined;
    }

    const usersMap = collect(users).keyBy("id");

    return usersMap.get(post.userId);
  }, [post, users]);

  const commentsExtended = useMemo(() => {
    if (!(comments && users)) {
      return [];
    }

    const usersMap = collect(users).keyBy("id");

    return comments.map((comment) => ({
      ...comment,
      user: usersMap.get(comment.userId)
    }));
  }, [comments, users]);

  if (isLoadingPosts && isLoadingComments && isLoadingUsers) {
    return <h3>Loading...</h3>;
  }

  if (isLoadingPosts) {
    return <h3>Loading...</h3>;
  }

  const { id, title, thumbnail, content } = post!;

  return (
    <>
      <Link
        className="py-2 px-3 text-gray-900 rounded hover:bg-gray-100"
        to="/"
      >
        Back
      </Link>

      <div className={styes.post} key={id}>
        <img src={thumbnail} alt={slug} className="h-full" />
        <div>
          <h4>{title}</h4>
          <p>{content}</p>
          <p>
            {postUser?.firstname} {postUser?.lastname}
          </p>
        </div>
      </div>
      {commentsExtended?.map(({ id, comment, user }) => (
        <PostComment key={id} comment={comment} user={user} />
      ))}
    </>
  );
}

export default Post;
