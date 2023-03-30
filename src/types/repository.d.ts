export interface Repository<T> {
    clear(): Promise<void>;
    create(payload: T): Promise<T>;
    list<F extends ListFilters>(filter: F): Promise<T[]>;
    update(id: string, payload: T): Promise<T | undefined>;
    delete(id: string): Promise<T | undefined>;
}

export interface ListFilters {
    itemsPerPage?: number
}