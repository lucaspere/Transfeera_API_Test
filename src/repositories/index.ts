import { Repository } from '../types/repository';
import { Receiver } from '../types/receiver';

export class ReceiverRepositoryFactory {
    constructor(private repositoryType: string = "MemoryRepository") { }

    async create(): Promise<Repository<Receiver>> {
        try {
            const repository = await import(`./${this.repositoryType}.ts`);
            const Note = repository.default;
            return new Note();
        } catch (error) {
            console.error(error);
            throw new Error();
        }
    }
}

