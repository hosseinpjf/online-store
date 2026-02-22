import { useSearchParams } from "react-router-dom";

import { useGetCategory } from "services/admin";
import { useGetAllPosts } from "services/user";

import Loader from "components/modules/Loader"
import Main from "components/templates/Main"
import Sidebar from "components/templates/Sidebar"

function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: categories, isLoading: categoriesLoading } = useGetCategory();
  const { data: posts, isLoading: postsLoading } = useGetAllPosts();

  return (
    <>
      {postsLoading || categoriesLoading ? <Loader /> : (
        <div className="d-flex">
          <Sidebar categories={categories} setSearchParams={setSearchParams} searchParams={searchParams} />
          <Main posts={posts} categories={categories} searchParams={searchParams} />
        </div>
      )}
    </>
  )
}

export default HomePage