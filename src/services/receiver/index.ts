import { BulkDeletionBodyTypes, DeleteReceiverParamTypes, ListReceiverQueryType } from "../../routes/receivers"
import type { Receiver } from "../../types/receiver"
import { Repository } from '../../repositories'

type ListReceiverResponse = {
    total: number,
    data: Array<Receiver>
}

type BulkDeleteResponse = {
    total: number,
}

const DEFAULT_STATUS = 'RASCUNHO'
export const createRecipient = async (payload: CreateRecipientBodyTypes): Promise<void> => {
    const recipient: Receiver = {
        id: randomUUID(),
        cpf_cnpj: payload.cpf_cnpj,
        email: payload.email,
        name: payload.name,
        status: DEFAULT_STATUS,
        key_type: payload.key_type,
        key_value: payload.key_value,
        account: '00000-1',
        agency: '111',
        bank: 'SANTANDER'
    }
    try {
        void await Repository.create(recipient)

    } catch (err) {
        console.error(`Bulk Deletion was not successful`, err)
        throw new Error("Internal Server Error")
    }
}

export const listReceiver = async (filter: ListReceiverQueryType): Promise<ListReceiverResponse> => {
    const data = await Repository.list(filter)
    const res: ListReceiverResponse = {
        total: data.length,
        data: data
    }

    return Promise.resolve(res)
}
const deleteRecipient = async ({ id }: DeleteReceiverParamTypes): Promise<void> => {
    try {
        console.info(`Started deletion of recipient with id ${id}.`)
        void await Repository.delete(id)
        console.info('Deletion completed successfully.')
    } catch (err) {
        console.error(`Deletion was not successful`, err)
        throw new Error("Internal Server Error")
    }
}
const bulkDelete = async ({ ids }: BulkDeletionBodyTypes): Promise<BulkDeleteResponse> => {
    try {
        console.info(`Started bulk deletion of total recipient ${ids.length}.`)
        const total = await Repository.bulkDelete(ids)
        return { total }
    } catch (err) {
        console.error(`Bulk Deletion was not successful`, err)
        throw new Error("Internal Server Error")
    }
}
export { listReceiver, deleteRecipient, bulkDelete }