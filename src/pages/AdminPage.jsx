import CategoryForm from "components/templates/CategoryForm"
import CategoryList from "components/templates/CategoryList"

function AdminPage() {
  return (
    <div className="py-4 px-1 px-sm-3 py-md-5">
      <CategoryList />
      <CategoryForm />
    </div>
  )
}

export default AdminPage