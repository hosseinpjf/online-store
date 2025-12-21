import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

import { getCategory } from "services/admin";
import { getAllPosts } from "services/user";

import Loader from "components/modules/Loader"
import Main from "components/templates/Main"
import Sidebar from "components/templates/Sidebar"

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: posts, isLoading: postsLoading } = useQuery({
    queryKey: ['posts-list'],
    queryFn: getAllPosts,
  });

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['list-category'],
    queryFn: getCategory
  });

  return (
    <>
      {postsLoading || categoriesLoading ? <Loader /> : (
        <div className="d-flex" style={{minHeight: "100dvh" }}>
          <Sidebar categories={categories} setSearchParams={setSearchParams} searchParams={searchParams} />
          <Main posts={posts} categories={categories} searchParams={searchParams} />
        </div>
      )}
    </>
  )
}

export default HomePage