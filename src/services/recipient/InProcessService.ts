import { ListRecipientResponse, BulkDeleteResponse } from ".";
import { server } from "../../app";
import { Repository } from '../../repositories'
import { ListRecipientQueryType, BulkDeletionBodyTypes, DeleteRecipientParamTypes } from "../../routes/recipients";
import { CreateEditRecepient } from "../../types/createEditRecipientBody";
import { Recipient } from "../../types/recipient";
import { Service } from "../../types/service";
import { inspect } from "util"
import { InternalServerError } from "../../utils/errors";

export const DEFAULT_STATUS = 'RASCUNHO'

export default class InProcessRecipientService implements Service {
    async create(payload: CreateEditRecepient): Promise<Recipient> {
        const recipient: Recipient = {
            id: payload.id as string,
            cpf_cnpj: payload.cpf_cnpj,
            email: payload.email!,
            name: payload.name,
            status: DEFAULT_STATUS,
            key_type: payload.key_type,
            key_value: payload.key_value,
            account_type: 'POUPANÇA',
            account: '00000-1',
            agency: '111',
            bank: 'SANTANDER'
        }
        try {
            server.log.info(`request to save a new recipient with ${inspect(recipient)}.`)
            return Repository.create(recipient)
        } catch (err) {
            server.log.error(`Save recipient was not successful`, inspect(err))
            throw new InternalServerError("Internal Server Error")
        }
    }
    async list(filter: ListRecipientQueryType): Promise<ListRecipientResponse> {
        try {
            server.log.info(`request to list recipients with filters: ${inspect(filter)}.`)
            const data = await Repository.list(filter)
            const res: ListRecipientResponse = {
                total: data.length,
                data: data
            }
            return res
        } catch (err: any) {
            server.log.error(`List Recipient was not successful`, inspect(err))
            throw new InternalServerError("Internal Server Error")
        }
    }
    async edit(payload: Partial<Recipient>): Promise<Recipient | undefined> {
        try {
            let updateRecipient;
            server.log.info(`request to find recipient with id ${payload.id}.`)
            const recipient = await Repository.find(payload.id!)
            server.log.info(`found recipient ${inspect(recipient)}.`)
            if (recipient?.status === "VALIDADO") {
                server.log.info(`recipient status is VALIDADO, assign only email.`)
                updateRecipient = payload.email ? { ...recipient, email: payload.email } : recipient
            } else {
                updateRecipient = { ...recipient, ...payload }
                updateRecipient.status = recipient?.status
            }
            server.log.info(`request to update recipient with id ${updateRecipient.id} and data ${inspect(updateRecipient)}.`)
            return await Repository.update(updateRecipient.id!, updateRecipient as Recipient)

        } catch (err) {
            server.log.error(`Update was not successful`, inspect(err))
            throw new InternalServerError("Internal Server Error")
        }
    }
    async delete({ id }: DeleteRecipientParamTypes): Promise<void> {
        try {
            server.log.info(`request to delete recipient with id ${id}.`)
            void await Repository.delete(id)
        } catch (err) {
            server.log.error(`Deletion was not successful`, inspect(err))
            throw new InternalServerError("Internal Server Error")
        }
    }
    async bulkDelete({ ids }: BulkDeletionBodyTypes): Promise<BulkDeleteResponse> {
        try {
            server.log.info(`request to bulk delete with total of recipient ${ids.length}.`)
            const total = await Repository.bulkDelete(ids)

            return { total }
        } catch (err) {
            server.log.error(`Bulk Deletion was not successful`, inspect(err))
            throw new InternalServerError("Internal Server Error")
        }
    }

}