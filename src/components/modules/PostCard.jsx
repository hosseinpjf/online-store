import { Ratio, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

import styles from "./postCard.module.css";

function PostCard({ post }) {
    return (
        <Link to={`/post/${post._id}`} onClick={() => window.scrollTo(0, 0)} className={styles.parent}>
            <Card className="bg-surface border-color w-100">
                <Ratio aspectRatio="16x9" className="overflow-hidden">
                    <Card.Img
                        variant="top"
                        className="image-fit"
                        src={`${import.meta.env.VITE_BASE_URL}/${post.images[post.options.mainPhoto]}`}
                        onError={e => e.target.src = 'not-found.png'}
                    />
                </Ratio>
                <Card.Body className="p-2 p-md-3">
                    <Card.Title as="h4" className="single-line h5">{post.options.title}</Card.Title>
                    <Card.Text as="div" className="d-flex justify-content-between align-items-center">
                        <span>{post.options.city}</span>
                        <p className="m-0">{post.amount.toLocaleString("fa-IR")}</p>
                    </Card.Text>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default PostCard