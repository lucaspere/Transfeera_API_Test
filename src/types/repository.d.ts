export interface Repository<T> {
    clear(): Promise<void>;
    find(id: string): Promise<T | undefined>;
    create(payload: T): Promise<T>;
    list<F extends ListFilters>(filter: F): Promise<T[]>;
    update(id: string, payload: T): Promise<T | undefined>;
    delete(id: string): Promise<T | undefined>;
    bulkDelete(ids: Array<string>): Promise<number>
}

export interface ListFilters {
    itemsPerPage?: number
}