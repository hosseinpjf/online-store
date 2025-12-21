import { useEffect, useState } from "react";

import PostCard from "components/templates/PostCard";

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
        <div className="p-3">
            {!!displayed?.length ? (
                <div className="p-0 m-0 d-flex flex-wrap gap-4 justify-content-evenly">
                    {displayed?.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))}

                </div >
            ) : (
                <p>در این دسته بندی هیچ پستی وجود ندارد</p>
            )}
        </div>
    )
}

export default Main