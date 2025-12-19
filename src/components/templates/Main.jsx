import { Link } from "react-router-dom"
import styles from "./main.module.css"
import { useEffect, useState } from "react";

function Main({ posts, searchParams, categories }) {
    const [displayed, setDisplayed] = useState([]);

    useEffect(() => {
        const categoryParams = searchParams.get('category');
        if (categoryParams) {
            const findCategory = categories?.find(c => c.slug == categoryParams);
            const filteredPosts = posts?.posts.filter(post => post.category == findCategory?._id);
            if (!filteredPosts.length) {
                setDisplayed([]);
            }
            else {
                setDisplayed(filteredPosts);
            }
        }
        else {
            setDisplayed(posts?.posts);
        }
    }, [searchParams]);

    return (
        <div className={styles.container}>
            {!!displayed?.length ? (
                <ul>
                    {displayed.map(post => (
                        <li key={post._id}>
                            <Link to={`/post/${post._id}`} onClick={() => window.scrollTo(0, 0)}>
                                <div>
                                    <p>{post.options.title}</p>
                                    <div>
                                        <p>{post.amount.toLocaleString("fa-IR")}</p>
                                        <span>{post.options.city}</span>
                                    </div>
                                </div>
                                <img
                                    src={`${import.meta.env.VITE_BASE_URL}/${post.images[0]}`}
                                    alt=""
                                    onError={e => e.target.src = 'not-found.png'}
                                />
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>در این دسته بندی هیچ پستی وجود ندارد</p>
            )}
        </div>
    )
}

export default Main