import { createChannel, createClient } from "nice-grpc"
import { RecipientsClient, RecipientsDefinition } from "../../generated/grpc_service/service/recipients"
import { BulkDeletionBodyTypes, DeleteRecipientParamTypes, ListRecipientQueryType } from "../../routes/recipients"
import { BulkDeleteResponse, ListRecipientResponse } from "."
import { Service } from '../../types/service'
import { CreateEditRecepient } from "../../types/createEditRecipientBody"
import { Recipient } from "../../types/recipient"
import { GRPC_ADDRESS } from "../../server"
import { server } from "../../app"
import { InternalServerError } from "../../utils/errors"
import { inspect } from "node:util"

export default class GrpcRecipientService implements Service {
    private client: RecipientsClient

    constructor() {
        const channel = createChannel(GRPC_ADDRESS)
        server.log.info(`Stablished a channel with grpc target ${channel.getTarget()}`)
        this.client = createClient(RecipientsDefinition, channel)
    }
    async create(payload: CreateEditRecepient): Promise<Recipient> {
        try {
            const { keyType, keyValue, cpfCnpj, accountType, ...rest } = await this.client.createRicipient({
                recipient: {
                    keyType: payload.key_type,
                    keyValue: payload.key_value,
                    cpfCnpj: payload.cpf_cnpj,
                    ...payload
                }
            })

            return {
                key_type: keyType,
                key_value: keyValue,
                cpf_cnpj: cpfCnpj,
                account_type: accountType,
                ...rest
            } as Recipient
        } catch (err) {
            server.log.error(`Save recipient was not successful`, err)
            throw new InternalServerError("Internal Server Error")
        }
    }
    async list(filter: ListRecipientQueryType): Promise<ListRecipientResponse> {
        const list = await this.client.listRecipients(filter)
        return list as unknown as ListRecipientResponse
    }
    async edit({ id, ...payload }: Partial<Recipient>): Promise<Recipient> {
        try {
            const { keyType, keyValue, cpfCnpj, accountType, ...rest } = await this.client.editRecipient({
                id, recipient: {
                    keyType: payload.key_type,
                    keyValue: payload.key_value,
                    cpfCnpj: payload.cpf_cnpj,
                    ...payload
                }
            })
            return {
                key_type: keyType,
                key_value: keyValue,
                cpf_cnpj: cpfCnpj,
                account_type: accountType,
                ...rest
            } as Recipient
        } catch (err) {
            server.log.error(`Save recipient was not successful`, err)
            throw new InternalServerError("Internal Server Error")
        }
    }
    async delete({ id }: DeleteRecipientParamTypes): Promise<void> {
        try {
            server.log.info(`request to delete recipient with id ${id}.`)
            void await this.client.deleteRecipient({ id })
        } catch (err) {
            server.log.error(`Deletion was not successful`, inspect(err))
            throw new InternalServerError("Internal Server Error")
        }
    }
    async bulkDelete({ ids }: BulkDeletionBodyTypes): Promise<BulkDeleteResponse> {
        try {
            server.log.info(`request to bulk delete with total of recipient ${ids.length}.`)
            const { total } = await this.client.bulkDeleteRecipients({ ids })

            return { total }
        } catch (err) {
            server.log.error(`Bulk Deletion was not successful`, inspect(err))
            throw new InternalServerError("Internal Server Error")
        }
    }
}