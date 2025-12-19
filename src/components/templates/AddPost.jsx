import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast';

import { getCategory } from 'services/admin'
import { addPost } from 'services/user';

import styles from './addPost.module.css'

function AddPost() {
    const queryClient = useQueryClient();
    const [form, setForm] = useState({ title: "", content: "", amount: null, city: "", category: "", images: null });

    const { data } = useQuery({
        queryKey: ['list-category'],
        queryFn: getCategory,
    });

    const { mutate, isPending } = useMutation({
        mutationFn: addPost,
        onSuccess: () => {
            toast.success('آگهی با موفقیت ایجاد شد');
            ['my-post-list', 'posts-list'].forEach(key => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });
            queryClient.refetchQueries({ queryKey: ['posts-list'] });
        },
        onError: () => toast.error('مشکلی پیش آمده'),
    })

    const changeHandler = event => {
        if (event.target.name !== "images") {
            setForm({ ...form, [event.target.name]: event.target.value });
        }
        else {
            setForm({ ...form, [event.target.name]: [...event.target.files] });
        }
    }

    const addHandler = async event => {
        event.preventDefault();
        if (!form.amount || !form.category) return;

        const formData = new FormData();
        for (const item in form) {
            if (item != "images") {
                formData.append(item, form[item]);
            }
            else {
                form[item]?.forEach(image => {
                    formData.append(item, image);
                })
            }
        }

        mutate(formData);
    }
    return (
        <form onChange={changeHandler} className={styles.form}>
            <h3>افزودن آگهی</h3>
            <div>
                <label htmlFor="title">عنوان</label>
                <input type="text" name='title' id='title' />
            </div>
            <div>
                <label htmlFor="content">توضیحات</label>
                <textarea name="content" id="content" />
            </div>
            <div>
                <label htmlFor="amount">قیمت</label>
                <input type="number" name='amount' id='amount' />
            </div>
            <div>
                <label htmlFor="city">شهر</label>
                <input type="text" name='city' id='city' />
            </div>
            <div>
                <label htmlFor="category">دسته بندی</label>
                <select name="category" id="category" >
                    {data?.map(item => <option key={item._id} value={item._id}>{item.name}</option>)}
                </select>
            </div>
            <div>
                <label htmlFor="images">عکس</label>
                <input type="file" name="images" id="images" accept="image/*" multiple />
            </div>
            <button type='submit' onClick={addHandler} disabled={isPending}>ایجاد</button>
        </form>
    )
}

export default AddPost