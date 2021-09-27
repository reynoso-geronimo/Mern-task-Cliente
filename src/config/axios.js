import axios from 'axios'

const clienteAxios = axios.create({
    baseURL:process.env.REACT_APP_BACKEDND_URL
});

export default clienteAxios;