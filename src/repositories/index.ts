import { Repository } from '../types/repository';
import { Recipient } from '../types/recipient';
import { InternalServerError } from '../utils/errors';
import { NODE_ENV } from '../server';
import { join } from 'path';
import { inspect } from 'util';

const EXTENSION = NODE_ENV === 'development' || NODE_ENV == 'test' ? 'ts' : 'js'

let singletonRepo: Repository<Recipient>;
export const useRepository = async (repositoryType = "MemoryRepository"): Promise<Repository<Recipient>> => {
    try {
        const Repository = (await import(join(__dirname, `./${repositoryType}.${EXTENSION}`))).default;
        singletonRepo = new Repository()
        return singletonRepo;
    } catch (error) {
        throw new InternalServerError("Internal Error " + inspect(error));
    }
}

export { singletonRepo as Repository }
