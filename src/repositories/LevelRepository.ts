import { Level } from 'level';
import { Recipient, Recipients } from '../types/recipient';
import { Repository } from '../types/repository';
import { ListRecipientQueryType } from '../routes/recipients';

export const levelDB = new Level<string, Recipient>(
    process.env.LEVELDB_LOCATION || 'recipients.level',
    {
        createIfMissing: true,
        valueEncoding: 'json',
    },
);

export default class LevelrecipientRepository implements Repository<Recipient> {
    async bulkDelete(ids: string[]): Promise<number> {
        const res = (await Promise.all(ids.map(id => this.delete(id)))).filter(total => total)

        return res?.length
    }
    async clear(): Promise<void> {
        await levelDB.clear();
    }
    async create(newrecipient: Recipient): Promise<Recipient> {
        await levelDB.put(newrecipient.id!, newrecipient);

        const recipient = await this.find(newrecipient.id!);

        return recipient!;
    }
    async find(id: string): Promise<Recipient | undefined> {
        try {
            const recipient = await levelDB.get(id);
            return recipient;
        } catch (error) {
            const err = error as {
                code: string;
                error: string;
                message: string;
            };
            if (err.code === 'LEVEL_NOT_FOUND') return undefined;
        }
    }
    async list<F extends ListRecipientQueryType>(filter: F): Promise<Recipient[]> {
        if (!filter.itemsPerPage) {
            filter.itemsPerPage = 10
        }
        const recipients: Recipients = [];
        for await (const recipient of levelDB.values()) {
            recipients.push(recipient);
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

        return res;
    }
    async update(
        id: string,
        payload: Partial<Recipient>,
    ): Promise<Recipient | undefined> {
        const recipient = await this.find(id);
        if (recipient) {
            const updatedrecipient = Object.assign(recipient, payload);

            await levelDB.put(id, updatedrecipient);

            return updatedrecipient;
        }
    }
    async delete(id: string): Promise<Recipient | undefined> {
        const recipient = await this.find(id);

        if (recipient) {
            await levelDB.del(id);
            return recipient;
        }
    }
    async close(): Promise<void> {
        await levelDB.close()
    }
}
