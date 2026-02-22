import { Ratio, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

import { useGetImage } from "services/user";

import styles from "./postCard.module.css";

function PostCard({ post }) {
    return (
        <Link to={`/post/${post.$id}`} onClick={() => window.scrollTo(0, 0)} className={styles.parent}>
            <Card className="bg-surface border-color w-100">
                <Ratio aspectRatio="16x9" className="overflow-hidden">
                    <Card.Img
                        variant="top"
                        className="image-fit"
                        src={post.images[post.mainphoto] ? useGetImage(post.images[post.mainphoto]) : ""}
                        onError={e => e.target.src = 'not-found.png'}
                    />
                </Ratio>
                <Card.Body className="p-2 p-md-3">
                    <Card.Title as="h4" className="single-line h5">{post.title}</Card.Title>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default PostCard