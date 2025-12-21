import { Ratio, Card } from "react-bootstrap"
import { Link } from "react-router-dom"

function PostCard({ post }) {
    return (
        <Link to={`/post/${post._id}`} onClick={() => window.scrollTo(0, 0)}>
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
    )
}

export default PostCard