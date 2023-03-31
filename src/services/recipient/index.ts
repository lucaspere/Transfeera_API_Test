import type { BulkDeletionBodyTypes, DeleteRecipientParamTypes, EditRecipientBodyTypes, ListRecipientQueryType } from "../../routes/recipients"
import type { Recipient } from "../../types/recipient"
import { Repository } from '../../repositories'
import { CreateEditRecepient } from "../../types/createEditRecipientBody"
import { InternalServerError } from "../../utils/errors"
type ListRecipientResponse = {
    total: number,
    data: Array<Recipient>
}

type BulkDeleteResponse = {
    total: number,
}

export const DEFAULT_STATUS = 'RASCUNHO'
export const createRecipient = async (payload: CreateEditRecepient): Promise<Recipient> => {
    const recipient: Recipient = {
        id: payload.id as string,
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
        return Repository.create(recipient)

    } catch (err) {
        console.error(`Bulk Deletion was not successful`, err)
        throw new InternalServerError("Internal Server Error")
    }
}

export const listRecipient = async (filter: ListRecipientQueryType): Promise<ListRecipientResponse> => {
    try {
        const data = await Repository.list(filter)
        const res: ListRecipientResponse = {
            total: data.length,
            data: data
        }
        return Promise.resolve(res)
    } catch (err: any) {
        console.error(`Bulk Deletion was not successful`, err)
        throw new InternalServerError("Internal Server Error")
    }

}
export const deleteRecipient = async ({ id }: DeleteRecipientParamTypes): Promise<void> => {
    try {
        console.info(`Started deletion of recipient with id ${id}.`)
        void await Repository.delete(id)
        console.info('Deletion completed successfully.')
    } catch (err) {
        console.error(`Deletion was not successful`, err)
        throw new InternalServerError("Internal Server Error")
    }
}
export const bulkDelete = async ({ ids }: BulkDeletionBodyTypes): Promise<BulkDeleteResponse> => {
    try {
        console.info(`Started bulk deletion of total recipient ${ids.length}.`)
        const total = await Repository.bulkDelete(ids)
        return { total }
    } catch (err) {
        console.error(`Bulk Deletion was not successful`, err)
        throw new InternalServerError("Internal Server Error")
    }
}
export const editRecipient = async (recipientPayload: EditRecipientBodyTypes): Promise<Recipient | undefined> => {
    try {
        let updateRecipient;
        const recipient = await Repository.find(recipientPayload.id!)
        if (recipient?.status === "VALIDADO") {
            updateRecipient = recipientPayload.email ? { ...recipient, email: recipientPayload.email } : recipient
        } else {
            updateRecipient = { ...recipient, ...recipientPayload }
            updateRecipient.status = recipient?.status
        }
        return await Repository.update(updateRecipient.id!, updateRecipient as Recipient)

    } catch (err) {
        console.error(`Bulk Deletion was not successful`, err)
        throw new InternalServerError("Internal Server Error")
    }
}
