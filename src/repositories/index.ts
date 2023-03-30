import { Repository } from '../types/repository';
import { Recipient } from '../types/recipient';

let singletonRepo: Repository<Recipient>;

export const useRepository = async (repositoryType = "MemoryRepository"): Promise<Repository<Recipient>> => {
    try {
        const Repository = (await import(`./${repositoryType}.ts`)).default;
        singletonRepo = new Repository()
        return singletonRepo;
    } catch (error) {
        console.error(error);
        throw new Error();
    }
}


export { singletonRepo as Repository }
