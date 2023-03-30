import { ListReceiverQueryType } from "../../routes/receivers"
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

export { listReceiver }