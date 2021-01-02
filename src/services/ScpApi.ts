import ApiService from "./ApiService";
import { ScpObject } from "../types";

export default class ScpApi extends ApiService {
    getInfo(objectNumber: number): Promise<ScpObject> {
        return this.get<ScpObject>(`/objects/${objectNumber}`)
    }
}
