import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

import { deleteCategory, getCategory } from "services/admin"

import Loader from "components/modules/Loader";

import styles from "./CategoryList.module.css";
import { Button } from "react-bootstrap";
import { RiDeleteBin7Line } from "react-icons/ri";

function CategoryList() {
    const queryClient = useQueryClient();
    const [disabledId, setDisabledId] = useState('');

    const { data, isLoading } = useQuery({
        queryKey: ['list-category'],
        queryFn: getCategory
    });

    const { mutate } = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            queryClient.invalidateQueries('list-category');
            toast.success('دسته بندی با موفقیت حذف شد');
            setDisabledId('');
        },
        onError: () => {
            toast.error('حذف دسته بندی به مشکل خورد لطفا دوباره تلاش کنید');
            setDisabledId('');
        }
    })

    const deleteHandler = id => {
        setDisabledId(id);
        mutate(id);
    }

    return (
        <div className={styles.list}>
            <h3 className="mb-4">دسته بندی ها</h3>
            {isLoading ? <Loader /> : (
                <ul className="p-0 d-flex gap-3 flex-wrap">
                    {data?.map(item => (
                        <li key={item._id} className="flex-grow-1 bg-surface border border-2 border-disabled d-flex align-items-center justify-content-between gap-2 p-3">
                            <span className="ms-auto">{item.name}</span>
                            <span className="color-secondary">slug: {item.slug}</span>
                            <Button
                                onClick={() => deleteHandler(item._id)}
                                disabled={item._id == disabledId}
                                className="bg-error color-side-text fw-light border-0 px-1 py-1 color-side-svg"
                            >
                                <RiDeleteBin7Line fontSize="20px" />
                            </Button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CategoryList