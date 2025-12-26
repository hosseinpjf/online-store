import { useEffect, useState } from "react";

import PostCard from "components/modules/PostCard";

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
        <div className="py-4 px-1 px-sm-3 py-md-5 w-100">
            {!!displayed?.length ? (
                <div className="p-0 m-0 d-flex flex-wrap gap-2 gap-sm-3 gap-lg-4 gap-xxl-5 justify-content-center justify-content-md-evenly">
                    {displayed?.map(post => (
                        <PostCard key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-center mt-5">در این دسته بندی هیچ پستی وجود ندارد</p>
            )}
        </div>
    )
}

export default Main