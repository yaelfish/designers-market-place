import history from '../history';
import Axios from 'axios';


const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

var axios = Axios.create({
    withCredentials: true
});
// data ? `${endpoint}/${data}` : endpoint

export default {
    get(endpoint, params){
      
        //?name=${filterBy.name}&artist=${filterBy.artist}&tags=${filterBy.tags}
        return ajax(`${endpoint}`, 'GET', null, params)
    },
    post(endpoint, data) {
        return ajax(endpoint, 'POST', data)
    },
    put(endpoint, data) {
        return ajax(endpoint, 'PUT', data)
    },
    delete(endpoint, data) {
        return ajax(endpoint, 'DELETE', data)
    }
}


async function ajax(endpoint, method='get', data=null, params=null) {
    try {
        const res = await axios({
            
            url: `${BASE_URL}${endpoint}`,
            method,
            data,
            params
        })
        return res.data;
    } catch (err) {
        console.log(`Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: ${data}`);
        console.dir(err);
        if (err.response && err.response.status === 401) {
            history.push('/');
        }
        throw err;
    }
}