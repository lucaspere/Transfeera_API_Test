import { createChannel, createClient, Channel } from "nice-grpc"
import { ListRecipientsReply, RecipientsClient, RecipientsDefinition } from "../../generated/grpc_service/service/recipients"
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
    private channel: Channel

    get _client() {
        return this.client
    }
    get _channel() {
        return this.channel
    }
    constructor() {
        this.channel = createChannel(GRPC_ADDRESS)
        server.log.info(`Stablished a channel with grpc target ${this.channel.getTarget()}`)
        this.client = createClient(RecipientsDefinition, this.channel)
    }
    async create(payload: CreateEditRecepient & { id: string }): Promise<Recipient> {
        try {
            const { keyType, keyValue, cpfCnpj, accountType, ...rest } = await this.client.createRicipient({
                recipient: {
                    id: payload.id,
                    keyType: payload.key_type,
                    keyValue: payload.key_value,
                    cpfCnpj: payload.cpf_cnpj,
                    email: payload.email,
                    name: payload.name
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
            server.log.error(`Save recipient was not successful`, inspect(err))
            throw new InternalServerError("Internal Server Error")
        }
    }
    async list(filter: ListRecipientQueryType): Promise<ListRecipientResponse> {
        try {
            const list = await this.client.listRecipients(filter)

            return ListRecipientsReply.toJSON(list) as ListRecipientResponse
        } catch (err) {
            server.log.error(`list recipients was not successful`, inspect(err))
            throw new InternalServerError("Internal Server Error")
        }
    }
    async edit({ id, ...payload }: Partial<Recipient>): Promise<Recipient> {
        try {
            const { keyType, keyValue, cpfCnpj, accountType, ...rest } = await this.client.editRecipient({
                id, recipient: {
                    keyType: payload.key_type,
                    keyValue: payload.key_value,
                    cpfCnpj: payload.cpf_cnpj,
                    email: payload.email,
                    name: payload.name
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
            server.log.error(`edit recipient was not successful`, err)
            throw new InternalServerError("Internal Server Error")
        }
    }
    async delete({ id }: DeleteRecipientParamTypes): Promise<void> {
        try {
            server.log.info(`request to delete recipient with id ${id}.`)
            void await this.client.deleteRecipient({ id })
        } catch (err) {
            server.log.error(`Delete recipient was not successful`, inspect(err))
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