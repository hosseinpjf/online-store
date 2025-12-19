import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast";

import { deleteCategory, getCategory } from "services/admin"

import Loader from "components/modules/Loader";

import styles from "./CategoryList.module.css";

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
            <h3>دسته بندی ها</h3>
            {isLoading ? <Loader /> : (
                <ul>
                    {data?.map(item => (
                        <li key={item._id}>
                            <span>{item.name}</span>
                            <span>slug: {item.slug}</span>
                            <button onClick={() => deleteHandler(item._id)} disabled={item._id == disabledId}>حذف</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}

export default CategoryList