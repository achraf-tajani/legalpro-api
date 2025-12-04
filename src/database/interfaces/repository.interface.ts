export interface FindOptions {
  select?: string;
  filters?: Record<string, unknown>;
  orderBy?: {
    column: string;
    ascending?: boolean;
  };
  limit?: number;
  offset?: number;
}

export interface IBaseRepository<T> {
  findAll(options?: FindOptions): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(entity: Partial<T>): Promise<T>;
  update(id: string, updates: Partial<T>): Promise<T>;
  delete(id: string): Promise<boolean>;
  count(filters?: Record<string, unknown>): Promise<number>;
}