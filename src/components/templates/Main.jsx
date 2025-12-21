import { Link } from "react-router-dom"
import styles from "./main.module.css"
import { useEffect, useState } from "react";
import { Card, Ratio } from "react-bootstrap";

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
        <div className={`${styles.container} p-3`}>
            {!!displayed?.length ? (
                <div className="p-0 m-0 d-flex flex-wrap gap-4 justify-content-evenly">
                    {displayed.map(post => (
                        <Link key={post._id} to={`/post/${post._id}`} onClick={() => window.scrollTo(0, 0)}>
                            <Card className="bg-surface border-color" style={{ width: '18rem' }}>
                                <Ratio aspectRatio={2 / 3} className="overflow-hidden">
                                    <Card.Img
                                        variant="top"
                                        className="image-fit"
                                        src={`${import.meta.env.VITE_BASE_URL}/${post.images[0]}`}
                                        onError={e => e.target.src = 'not-found.png'}
                                    />
                                </Ratio>
                                <Card.Body>
                                    <Card.Title className="single-line">{post.options.title}</Card.Title>
                                    <Card.Text as="div" className="d-flex justify-content-between align-items-center">
                                        <span>{post.options.city}</span>
                                        <p className="m-0">{post.amount.toLocaleString("fa-IR")}</p>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    ))}

                </div >
            ) : (
                <p>در این دسته بندی هیچ پستی وجود ندارد</p>
            )}
        </div>
    )
}

export default Main

// < li key = { post._id } >
//     <Link to={`/post/${post._id}`} onClick={() => window.scrollTo(0, 0)}>
//         <div>
//             <p>{post.options.title}</p>
//             <div>
//                 <p>{post.amount.toLocaleString("fa-IR")}</p>
//                 <span>{post.options.city}</span>
//             </div>
//         </div>
//         <img
//             src={`${import.meta.env.VITE_BASE_URL}/${post.images[0]}`}
//             alt=""
//             onError={e => e.target.src = 'not-found.png'}
//         />
//     </Link>
//                         </li >