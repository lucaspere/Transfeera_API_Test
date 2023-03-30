import { DeleteReceiverParamTypes, ListReceiverQueryType } from "../../routes/receivers"
import type { Receiver } from "../../types/receiver"
import { Repository } from '../../repositories'

type ListReceiverResponse = {
    total: number,
    data: Array<Receiver>
}

const listReceiver = async (filter: ListReceiverQueryType): Promise<ListReceiverResponse> => {
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
export { listReceiver, deleteRecipient }