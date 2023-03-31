import { Repository } from '../types/repository';
import { Recipient } from '../types/recipient';
import { InternalServerError } from '../utils/errors';

let singletonRepo: Repository<Recipient>;

export const useRepository = async (repositoryType = "MemoryRepository"): Promise<Repository<Recipient>> => {
    try {
        const Repository = (await import(`./${repositoryType}.ts`)).default;
        singletonRepo = new Repository()
        return singletonRepo;
    } catch (error) {
        throw new InternalServerError("Fails to load Repository");
    }
}

export { singletonRepo as Repository }
