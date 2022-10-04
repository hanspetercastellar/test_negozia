import {Daxios, Paxios} from "./axios.config";
import axios from "axios";


export const authServices = {

    login: async (data) => {
        return await axios.post(`${process.env.REACT_APP_DEV_API_URI}/auth/login`, data);
    },
    getAllClients: async () => {
        return await Paxios.get(`/clients`);
    },
    postClient: async (data) => {
        return await Paxios.post(`/clients`, data);
    },
    patchClient: async (payload) => {
        return await Paxios.patch(`/clients/${payload.id}`, payload.data);
    },
    deleteClient: async (id) => {
        return await Paxios.delete(`/clients/${id}`);
    }
}