import { api } from "configs/api"
import { requestHandler } from "helpers/helper";


const addCategory = data => requestHandler(() => api.post('category', data));

const getCategory = () => requestHandler(() => api.get('category'));

const deleteCategory = id => requestHandler(() => api.delete(`category/${id}`));


export { addCategory, getCategory, deleteCategory };