import { createChannel, createClient } from "nice-grpc"
import { DeepPartial, ListRecipientsRequest, RecipientsClient, RecipientsDefinition } from "../../generated/grpc_service/service/recipients"
import { BulkDeletionBodyTypes, DeleteRecipientParamTypes, ListRecipientQueryType } from "../../routes/recipients"
import { BulkDeleteResponse, ListRecipientResponse } from "."
import { Service } from '../../types/service'
import { CreateEditRecepient } from "../../types/createEditRecipientBody"
import { Recipient } from "../../types/recipient"
import { GRPC_ADDRESS } from "../../server"

export default class GrpcRecipientService implements Service {
    private client: RecipientsClient

    constructor() {
        const channel = createChannel(GRPC_ADDRESS)
        this.client = createClient(RecipientsDefinition, channel)
    }
    async create(payload: CreateEditRecepient): Promise<Recipient> {
        throw new Error("Method not implemented.")
    }
    async list(filter: ListRecipientQueryType): Promise<ListRecipientResponse> {
        const list = await this.client.listRecipients(filter as DeepPartial<ListRecipientsRequest>)
        console.log(list.data[0])
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