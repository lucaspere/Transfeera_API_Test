import { Repository } from '../types/repository';
import { Receiver } from '../types/receiver';

let singletonRepo: Repository<Receiver>;

export const useRepository = async (repositoryType = "MemoryRepository"): Promise<Repository<Receiver>> => {
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
