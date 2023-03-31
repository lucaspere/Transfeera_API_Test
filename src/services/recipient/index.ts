import type { Recipient } from "../../types/recipient"
import { InternalServerError } from "../../utils/errors"
import { NODE_ENV } from '../../server';
import { resolve } from 'path';
import { inspect } from 'util';
import { Service } from "../../types/service"

export type ListRecipientResponse = {
    total: number,
    data: Array<Recipient>
}

export type BulkDeleteResponse = {
    total: number,
}

const EXTENSION = NODE_ENV === 'development' || NODE_ENV == 'test' ? 'ts' : 'js'

let service: Service;
export const useService = async (serviceType = 'InProcessService'): Promise<Service> => {
    try {
        const path = resolve(__dirname, `./${serviceType}.${EXTENSION}`)
        const Service = (await import(path)).default;
        service = new Service()
        return service;
    } catch (error) {
        throw new InternalServerError("Internal Error " + inspect(error));
    }
}

export { service as RecipientService }
