import styles from "./sidebar.module.css"

function Sidebar({ categories, setSearchParams, searchParams }) {
    const categoryParams = searchParams.get('category');

    const addUrlQuery = slug => {
        setSearchParams({ category: slug });
    }

    const removeUrlQuery = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('category');
        setSearchParams(newParams);
    }

    return (
        <div className={styles.sidebar}>
            <h3>دسته بندی ها</h3>
            <ul>
                <li onClick={removeUrlQuery} className={!categoryParams ? styles.active : null}>همه دسته بندی ها</li>
                {categories?.map(category => (
                    <li key={category._id} onClick={() => addUrlQuery(category.slug)} className={categoryParams == category.slug ? styles.active : null}>
                        <p>{category.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar