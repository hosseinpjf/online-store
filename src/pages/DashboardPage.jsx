import AddPost from "components/templates/AddPost"
import PostList from "components/templates/PostList"

function DashboardPage() {
  return (
    <div className="py-4 px-1 px-sm-3 py-md-5">
      <AddPost />
      <PostList />
    </div>
  )
}

export default DashboardPage