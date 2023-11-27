import type { Nullable, User } from "@utils/types";

interface PostCommentProps {
  comment: string;
  user: Nullable<User>;
}
function PostComment({ comment, user }: PostCommentProps) {
  return (
    <div className="px-3 mb-2">
      <p>
        {!user ? (
          <>UNKNOWN USER</>
        ) : (
          <>
            {" "}
            <b>
              {user?.firstname} {user?.lastname}
            </b>
          </>
        )}
      </p>

      <p>{comment}</p>
    </div>
  );
}

export default PostComment;
