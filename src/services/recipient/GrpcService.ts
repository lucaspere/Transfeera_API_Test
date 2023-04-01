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
        const list = await this.client.listRecipients({
            keyType: filter.key_type,
            keyValue: filter.key_value,
            ...filter
        })
        return list as unknown as ListRecipientResponse
    }
    async edit(payload: Partial<Recipient>): Promise<Recipient> {
        throw new Error("Method not implemented.")
    }
    async delete(payload: DeleteRecipientParamTypes): Promise<void> {
        throw new Error("Method not implemented.")
    }
    async bulkDelete(payload: BulkDeletionBodyTypes): Promise<BulkDeleteResponse> {
        throw new Error("Method not implemented.")
    }

}