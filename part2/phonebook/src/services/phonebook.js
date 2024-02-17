import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseUrl).then((response) => response.data);
};

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then((response) => response.data);
};

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`);
};

const updateEntry = (id, updatedEntry) => {
    return axios
        .put(`${baseUrl}/${id}`, updatedEntry)
        .then((response) => response.data);
};

export default { getAll, create, deleteEntry, updateEntry };
