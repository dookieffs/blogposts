import type { Nullable, User } from "@utils/types";
import { Link } from "react-router-dom";
import styles from "./PostPreview.module.scss";

interface PostProps {
  id: number;
  slug: string;
  title: string;
  content: string;
  image: string;
  thumbnail: string;
  status: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  user: Nullable<User>;
  commentCount?: number;
}
function Post({
  id,
  slug,
  title,
  content,
  thumbnail,
  status,
  category,
  publishedAt,
  updatedAt,
  user,
  commentCount = 0
}: PostProps) {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg border px-3 py-3 mb-2">
      <img className="float-left m-6" src={thumbnail} alt={slug} />
      <div>
        <h4>{title}</h4>
        <p>{content}</p>
        <span>
          Comments count: <b>{commentCount}</b>
        </span>
        <span>
          <p>
            Full name:{" "}
            <b>
              {user?.firstname} {user?.lastname}
            </b>
          </p>
        </span>
        <p>
          Category: <b>{category}</b>
        </p>
        <p>
          Published at: <b>{publishedAt}</b>
        </p>
        <p>
          Updated at: <b>{updatedAt}</b>
        </p>
        <Link
          to={`/posts/${slug}`}
          className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 text-center mb-2"
        >
          View details
        </Link>
      </div>
    </div>
  );
}

export default Post;
