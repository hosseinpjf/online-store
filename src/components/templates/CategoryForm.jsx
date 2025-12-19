import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import styles from './categoryForm.module.css'
import { addCategory } from "services/admin";

function CategoryForm() {
    const [form, setForm] = useState({ name: "", slug: "", icon: "" });
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        mutationFn: addCategory,
        onSuccess: () => {
            toast.success('دسته بندی جدید با موفقیت اضافه شد');
            queryClient.invalidateQueries('list-category');
        },
        onError: () => toast.error('اضافه شدن دسته بندی جدید با مشکل مواجه شد')
    });


    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const submitHandler = event => {
        event.preventDefault();
        if (!form.name || !form.slug || !form.icon) return;

        mutate(form);
    }

    return (
        <form onChange={changeHandler} onSubmit={submitHandler} className={styles.form}>
            <h3>ایجاد دسته بندی جدید</h3>
            <div>
                <label htmlFor="name">اسم دسته بندی</label>
                <input type="text" name="name" id="name" />
            </div>
            <div>
                <label htmlFor="slug">اسلاگ</label>
                <input type="text" name="slug" id="slug" />
            </div>
            <div>
                <label htmlFor="icon">آیکون</label>
                <input type="text" name="icon" id="icon" />
            </div>
            <button type="submit" disabled={isPending}>ایجاد</button>
        </form>
    )
}

export default CategoryForm