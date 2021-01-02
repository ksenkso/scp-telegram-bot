import {AppConfig} from "../utils/AppConfig";
import axios, { AxiosInstance } from 'axios';

export default class ApiService {

    protected transport: AxiosInstance

    constructor(config: AppConfig) {
        this.transport = axios.create({
            baseURL: config.get('SCP_API_URL')
        })
    }

    protected async get<T = any>(url: string): Promise<T | null> {
        // TODO: add error handling
        return this.transport.get(url)
            .then(res => {
                if (res.status === 200) {
                    return res.data as T
                } else {
                    return null
                }
            })
    }
}
