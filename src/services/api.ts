import axios from 'axios';

const api = axios.create({
    baseURL: 'https://192.168.0.108:3333'
})

export default api;

//expo link => exp://192.168.0.108:19000
// 3333 é a porta do servidor node
//isto é para funcionar no emulador