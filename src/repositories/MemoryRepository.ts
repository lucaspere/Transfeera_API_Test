import type { Repository } from '../types/repository';
import type { Recipient, Recipients } from '../types/recipient';
import RecipientData from '../data/recipients.json'
import { ListRecipientQueryType } from '../routes/recipients';

let recipients: Recipients = []

export default class RecipientMemoryRepository implements Repository<Recipient> {
    constructor() {
        if (!recipients.length) {
            recipients = RecipientData as Recipients
        }
    }
    clear(): Promise<void> {
        recipients.splice(0, recipients.length);

        return Promise.resolve();
    }
    find(id: string): Promise<Recipient | undefined> {
        const recipient = recipients.find(recipient => recipient.id === id);
        if (recipient) return Promise.resolve(recipient);

        return Promise.resolve(undefined);
    }
    create(recipient: Recipient): Promise<Recipient> {
        recipients.push(recipient);

        return Promise.resolve(recipients[recipients.length - 1] as Recipient);
    }
    list<F extends ListRecipientQueryType>(filter: F): Promise<Recipients> {
        if (!filter.itemsPerPage) {
            filter.itemsPerPage = 10
        }
        const res: Recipients = []
        const data = recipients.filter(recipient => (
            recipient.status.includes(filter.status ?? "") &&
            recipient.name.toLowerCase().includes(filter.name?.toLocaleLowerCase() ?? "") &&
            recipient.key_type.includes(filter.key_type ?? "") &&
            recipient.key_value.includes(filter.key_value ?? "")
        ))

        for (let i = 0; i < data.length && i < filter.itemsPerPage!; i++) {
            res.push(data[i])
        }
        return Promise.resolve(res);
    }
    update(id: string, payload: Partial<Recipient>): Promise<Recipient | undefined> {
        const recipientIdx = recipients.findIndex(recipient => recipient.id === id);
        if (recipientIdx !== -1) {
            const recipientUpdated = {
                ...recipients[recipientIdx],
                ...payload,
            };
            recipients[recipientIdx] = recipientUpdated;

            return Promise.resolve(recipients[recipientIdx]);
        }

        return Promise.resolve(undefined);
    }
    delete(id: string): Promise<Recipient | undefined> {
        const recipientIdx = recipients.findIndex(recipient => recipient.id === id);
        if (recipientIdx !== -1) {
            const recipient = recipients.splice(recipientIdx, 1)[0];

            return Promise.resolve(recipient);
        }

        return Promise.resolve(undefined);
    }
    bulkDelete(ids: Array<string>): Promise<number> {
        return new Promise((res, _) => {
            Promise.all(ids.map(id => this.delete(id))).then(result => {
                const total = result.reduce(
                    (total, cur) => total += cur ? 1 : 0
                    , 0
                )
                res(total)
            })
        })
    }
}
