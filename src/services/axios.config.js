import axios from "axios";
import store from '../redux/store';

const baseUri = process.env.REACT_APP_ENTORNO == "local" ? process.env.REACT_APP_DEV_API_URI : process.env.REACT_APP_PROD_API_URI;


var axiosDef = axios.create({
    baseURL: baseUri,
    headers: {
        'Content-Type': 'application/json',
        "Accept": "application/json",
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"},
    timeout: 0,
    maxContentLength: 1000000
});

export const Daxios = axiosDef;

//********Confguracion para las peticiones protegidas********** */

var axiosPrivate = axios.create({
    baseURL: baseUri,
    //baseURL: 'http://localhost/DismelAdminPage/public/api',
    timeout: 0,
    maxContentLength: 1000000
});
axiosPrivate.interceptors.request.use((config) => {
    const dataStorage = store.getState().auth
    let token = dataStorage.token;

    token = token.replace(/['"]+/g, '')
    console.log(token, "token")
    //config.headers["Access-Control-Allow-Headers"]="*"
    config.headers["Authorization"] = token ? `Bearer ${token}` : "";
    config.headers['Accept'] = 'application/json'
    return config;
});

export const Paxios = axiosPrivate;