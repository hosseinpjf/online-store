import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";
import { Button } from "react-bootstrap";

import { RiDeleteBin7Line } from "react-icons/ri";

import { useDeleteCategory, useGetCategory } from "services/admin"

import icons from "constants/icons";
import Loader from "components/modules/Loader";

import styles from "./CategoryList.module.css";

function CategoryList() {
    const queryClient = useQueryClient();
    const [disabledId, setDisabledId] = useState('');
    const { data, isFetching } = useGetCategory();
    const { mutate } = useDeleteCategory();

    const deleteHandler = id => {
        setDisabledId(id);
        mutate(id, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['list-category'] });
                toast.success('دسته بندی با موفقیت حذف شد');
                setDisabledId('');
            },
            onError: () => {
                toast.error('حذف دسته بندی به مشکل خورد لطفا دوباره تلاش کنید');
                setDisabledId('');
            }
        });
    }

    const categoryIcon = (name) => {
        const Icon = icons[name];
        return Icon ? <Icon size="20px" /> : null
    }

    return (
        <div className={styles.list}>
            <h3 className="mb-4">دسته بندی ها</h3>
            {isFetching ? <Loader /> : (
                <ul className="p-0 d-flex gap-3 flex-wrap">
                    {data?.documents.map(item => (
                        <li key={item.$id} className="flex-grow-1 bg-surface border border-2 border-disabled d-flex align-items-center justify-content-between gap-2 p-3 rounded-3">
                            {categoryIcon(item.icon)}
                            <span className="ms-auto">{item.name}</span>
                            <span className="color-secondary text-start">slug: {encodeURIComponent(item.slug)}</span>
                            <Button
                                onClick={() => deleteHandler(item.$id)}
                                disabled={item.$id == disabledId}
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