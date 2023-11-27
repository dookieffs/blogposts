import type { Nullable, Post } from "@utils/types";
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@services/posts";
import { getComments } from "@services/comments";
import { useMemo, useState } from "react";
import { collect } from "@utils/collection";
import { getUsers } from "@services/users";
import { PostPreview } from "@components/index";
import { PostsToolbar } from "./components/PostsToolbar";
import moment from "moment";

type FilterHandler<T> = (value: T) => boolean;
type SortDirection = 1 | -1;
type SortHandler<T> = (current: T, next: T) => number;

export type Sorter<T> = {
  label: string;
  field: keyof T;
  direction: SortDirection;
};

function Posts() {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sorter, setSorter] = useState<Nullable<Sorter<Post>>>(null);

  const { data: posts, isLoading: isLoadingPosts } = useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
  });

  const { data: comments, isLoading: isLoadingComments } = useQuery({
    queryKey: ["comments"],
    queryFn: getComments
  });

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers
  });

  const postsExtended = useMemo(() => {
    if (!(posts && comments && users)) {
      return [];
    }

    const postsCommentCount = collect(comments)
      .groupBy("postId")
      .map((group) => group.length);
    const usersMap = collect(users).keyBy("id");

    return posts.map((post) => ({
      ...post,
      user: usersMap.get(post.userId),
      commentCount: postsCommentCount.get(post.id, 0) as number
    }));
  }, [posts, comments, users]);

  const filterHandlers: Record<string, FilterHandler<Post>> = {
    category: ({ category }) => category === filters.category,
    status: ({ status }) => status === filters.status
  };

  const sortHandlers: Record<string, SortHandler<Post>> = {
    publishedAt: (current, next) => {
      const currentValue = moment(current.publishedAt, "DD/MM/YYYY HH:mm:ss");
      const nextValue = moment(next.publishedAt, "DD/MM/YYYY HH:mm:ss");
      const delta = currentValue.diff(nextValue, "milliseconds");

      return delta === 0 ? 0 : delta / Math.abs(delta);
    },
    updatedAt: (current, next) => {
      const currentValue = moment(current.updatedAt, "DD/MM/YYYY HH:mm:ss");
      const nextValue = moment(next.updatedAt, "DD/MM/YYYY HH:mm:ss");
      const delta = currentValue.diff(nextValue, "milliseconds");

      return delta === 0 ? 0 : delta / Math.abs(delta);
    }
  };

  const filteredPosts = useMemo(() => {
    let filtered = [...postsExtended];

    for (const key in filters) {
      const filterValue = filters[key];

      if (!filterValue) {
        continue;
      }

      filtered = filtered.filter(filterHandlers[key]);
    }

    return filtered;
  }, [postsExtended, filters]);

  const sortedPosts = useMemo(() => {
    if (!sorter) {
      return [...filteredPosts];
    }

    const { field, direction } = sorter;

    return filteredPosts.sort((current, next) => {
      return sortHandlers[field]?.(current, next) * direction ?? 0;
    });
  }, [sorter, filteredPosts]);

  if (isLoadingPosts && isLoadingComments && isLoadingUsers) {
    return <h3>Loading...</h3>;
  }

  return (
    <>
      <PostsToolbar
        posts={posts ?? []}
        setFilters={setFilters}
        setSorter={setSorter}
      />

      {sortedPosts?.map(({ id, ...props }) => (
        <PostPreview key={id} id={id} {...props} />
      ))}
    </>
  );
}

export default Posts;
