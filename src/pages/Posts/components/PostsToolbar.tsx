import { collect } from "@utils/collection";
import { Nullable, Post } from "@utils/types";
import { Dispatch, SetStateAction, useMemo } from "react";
import { Sorter } from "../Posts";

interface PostsToolbarProps {
  posts: Post[];
  setFilters: Dispatch<SetStateAction<Record<string, string>>>;
  setSorter: Dispatch<SetStateAction<Nullable<Sorter<Post>>>>;
}

export function PostsToolbar({
  posts,
  setFilters,
  setSorter
}: PostsToolbarProps) {
  const filterOptions: Record<string, string[]> = {
    category: useMemo(
      () => collect(posts).pluck<string>("category").unique().toArray(),
      [posts]
    ),
    status: useMemo(
      () => collect(posts).pluck<string>("status").unique().toArray(),
      [posts]
    )
  };

  const sorters: Sorter<Post>[] = [
    { label: "Published at ASC", field: "publishedAt", direction: 1 },
    { label: "Published at DESC", field: "publishedAt", direction: -1 },
    { label: "Updated at ASC", field: "updatedAt", direction: 1 },
    { label: "Updated at DESC", field: "updatedAt", direction: -1 }
  ];

  return (
    <>
      <div style={{ display: "flex", gap: "10px" }} className="px-3">
        <div>
          <label
            htmlFor="sort-date"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Date sort:
          </label>

          <select
            id="sort-date"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            defaultValue=""
            onChange={(event) => {
              const sorter = sorters[parseInt(event.target.value)];

              !!sorter && setSorter(sorter);
            }}
          >
            <option value="">---</option>
            {sorters.map(({ label }, index) => (
              <option key={index} value={index}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div className="container mx-auto">
          <label
            htmlFor="filter"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Filter by:
          </label>
          <div className="justify-center" style={{ maxWidth: "300px" }}>
            {Object.keys(filterOptions).map((filterKey) => (
              <select
                id="filter"
                key={filterKey}
                defaultValue=""
                className="mb-2 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(event) => {
                  setFilters((filters) => ({
                    ...filters,
                    [filterKey]: event.target.value
                  }));
                }}
              >
                <option value="">---</option>
                {filterOptions[filterKey]?.map((value, index) => (
                  <option key={index} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
