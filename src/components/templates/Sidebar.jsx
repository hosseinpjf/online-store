import useStore from "store/store";
import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { IoClose } from "react-icons/io5";

import icons from "constants/icons";

import styles from "./sidebar.module.css"

function Sidebar({ categories, setSearchParams, searchParams }) {
    const categoryParams = searchParams.get('category');
    const { showOffcanvas, setShowOffcanvas } = useStore();

    const addUrlQuery = slug => {
        setSearchParams({ category: slug });
        setShowOffcanvas(false);
        window.scrollTo(0, 0);
    }

    const removeUrlQuery = () => {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('category');
        setSearchParams(newParams);
        setShowOffcanvas(false);
        window.scrollTo(0, 0);
    }

    const categoryIcon = name => {
        const Icon = icons[name];
        return Icon ? <Icon size="18px" /> : null
    }

    return (
        <div className={`${styles.sidebar} bg-side pt-3`}>
            <Offcanvas className="bg-side h-100"
                style={{ width: "280px" }}
                show={showOffcanvas}
                onHide={() => setShowOffcanvas(false)}
                responsive="xl"
                placement="end">
                <Offcanvas.Header>
                    <Offcanvas.Title className="ms-auto">سایت فروشگاه آنلاین</Offcanvas.Title>
                    <Button onClick={() => setShowOffcanvas(false)} className="bg-transparent border-0 p-0">
                        <IoClose fontSize="30px" />
                    </Button>
                </Offcanvas.Header>
                <Offcanvas.Body className={`${styles.sidebarBody} position-sticky flex-column p-3 w-100 overflow-auto`}>
                    <h4 className="mb-4">دسته بندی ها</h4>
                    <ListGroup className="border-0">
                        <ListGroup.Item
                            action
                            active={!categoryParams}
                            onClick={removeUrlQuery}
                            className={`${styles.allCategory} pe-5 bg-transparent border-0 border-bottom py-2 my-1 border-color single-line rounded-0 color-neutral position-relative`}
                        >همه
                        </ListGroup.Item>
                        {categories?.map(category => (
                            <ListGroup.Item
                                key={category._id}
                                action
                                active={categoryParams == category.slug}
                                onClick={() => addUrlQuery(category.slug)}
                                title={category.name}
                                className="bg-transparent border-0 border-bottom py-2 my-1 border-color rounded-0 color-neutral d-flex align-items-center justify-content-start gap-3"
                            >
                                {categoryIcon(category.icon)}
                                <span className="single-line w-100">
                                    {category.name}
                                </span>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default Sidebar