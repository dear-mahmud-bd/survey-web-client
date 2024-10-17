import axios from "axios";

export const axiosPublic = axios.create({
    baseURL: 'https://survey-app-server-03.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;