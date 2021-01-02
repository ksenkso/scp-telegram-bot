import {AppConfig} from "../utils/AppConfig";
import axios, { AxiosInstance } from 'axios';

export default class ApiService {

    protected transport: AxiosInstance

    constructor(config: AppConfig) {
        this.transport = axios.create({
            baseURL: config.get('SCP_API_URL')
        })
    }

    protected async get<T = any>(url: string): Promise<T> {
        // TODO: add error handling
        return this.transport.get(url)
            .then(res => res.data as T)
    }
}
