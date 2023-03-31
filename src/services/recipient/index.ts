import type { BulkDeletionBodyTypes, DeleteRecipientParamTypes, EditRecipientBodyTypes, ListRecipientQueryType } from "../../routes/recipients"
import type { Recipient } from "../../types/recipient"
import { Repository } from '../../repositories'
import { CreateEditRecepient } from "../../types/createEditRecipientBody"
import { InternalServerError } from "../../utils/errors"
import { server } from "../../app"
import * as util from "util"

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
        email: payload.email!,
        name: payload.name,
        status: DEFAULT_STATUS,
        key_type: payload.key_type,
        key_value: payload.key_value,
        account: '00000-1',
        agency: '111',
        bank: 'SANTANDER'
    }
    try {
        server.log.info(`request to save a new recipient with ${util.inspect(recipient)}.`)
        return Repository.create(recipient)
    } catch (err) {
        server.log.error(`Save recipient was not successful`, err)
        throw new InternalServerError("Internal Server Error")
    }
}

export const listRecipient = async (filter: ListRecipientQueryType): Promise<ListRecipientResponse> => {
    try {
        server.log.info(`request to list recipients with filters: ${util.inspect(filter)}.`)
        const data = await Repository.list(filter)
        const res: ListRecipientResponse = {
            total: data.length,
            data: data
        }
        return res
    } catch (err: any) {
        server.log.error(`List Recipient was not successful`, err)
        throw new InternalServerError("Internal Server Error")
    }

}
export const deleteRecipient = async ({ id }: DeleteRecipientParamTypes): Promise<void> => {
    try {
        server.log.info(`request to delete recipient with id ${id}.`)
        void await Repository.delete(id)
    } catch (err) {
        server.log.error(`Deletion was not successful`, err)
        throw new InternalServerError("Internal Server Error")
    }
}
export const bulkDelete = async ({ ids }: BulkDeletionBodyTypes): Promise<BulkDeleteResponse> => {
    try {
        server.log.info(`request to bulk delete with total of recipient ${ids.length}.`)
        const total = await Repository.bulkDelete(ids)
        return { total }
    } catch (err) {
        server.log.error(`Bulk Deletion was not successful`, err)
        throw new InternalServerError("Internal Server Error")
    }
}
export const editRecipient = async (recipientPayload: EditRecipientBodyTypes): Promise<Recipient | undefined> => {
    try {
        let updateRecipient;
        server.log.info(`request to find recipient with id ${recipientPayload.id}.`)
        const recipient = await Repository.find(recipientPayload.id!)
        server.log.info(`found recipient ${util.inspect(recipient)}.`)
        if (recipient?.status === "VALIDADO") {
            server.log.info(`recipient status is VALIDADO, assign only email.`)
            updateRecipient = recipientPayload.email ? { ...recipient, email: recipientPayload.email } : recipient
        } else {
            updateRecipient = { ...recipient, ...recipientPayload }
            updateRecipient.status = recipient?.status
        }
        server.log.info(`request to update recipient with id ${updateRecipient.id} and data ${util.inspect(updateRecipient)}.`)
        return await Repository.update(updateRecipient.id!, updateRecipient as Recipient)

    } catch (err) {
        server.log.error(`Update was not successful`, err)
        throw new InternalServerError("Internal Server Error")
    }
}
