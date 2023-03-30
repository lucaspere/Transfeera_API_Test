import { ListReceiverQueryType } from "../../routes/receivers"
import type { Receiver } from "../../types/receiver"
import { ReceiverRepositoryFactory } from '../../repositories'

type ListReceiverResponse = {
    total: number,
    data: Array<Receiver>
}

const listReceiver = async (filter: ListReceiverQueryType): Promise<ListReceiverResponse> => {
    const repository = await new ReceiverRepositoryFactory().create()
    const data = await repository.list(filter)
    const res: ListReceiverResponse = {
        total: data.length,
        data: data
    }

    return Promise.resolve(res)
}

export { listReceiver }