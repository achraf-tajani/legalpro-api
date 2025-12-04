import { SupabaseService } from '../../modules/supabase/supabase.service';
import { FindOptions, IBaseRepository } from '../interfaces/repository.interface';

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  protected abstract tableName: string;

  constructor(protected supabaseService: SupabaseService) {}

  async findAll(options: FindOptions = {}): Promise<T[]> {
    const supabase = this.supabaseService.getClient();
    let query = supabase.from(this.tableName).select(options.select || '*');

    if (options.filters) {
      Object.entries(options.filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });
    }

    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      });
    }

    if (options.limit) {
      query = query.limit(options.limit);
    }

    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }

    const { data, error } = await query;
    if (error) throw error;
    return (data as T[]) || [];
  }

  async findById(id: string): Promise<T | null> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // Not found
      throw error;
    }
    return data as T;
  }

  async create(entity: Partial<T>): Promise<T> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .insert([entity])
      .select()
      .single();

    if (error) throw error;
    return data as T;
  }

  async update(id: string, updates: Partial<T>): Promise<T> {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase
      .from(this.tableName)
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as T;
  }

  async delete(id: string): Promise<boolean> {
    const supabase = this.supabaseService.getClient();
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  async count(filters: Record<string, unknown> = {}): Promise<number> {
    const supabase = this.supabaseService.getClient();
    let query = supabase
      .from(this.tableName)
      .select('*', { count: 'exact', head: true });

    Object.entries(filters).forEach(([key, value]) => {
      query = query.eq(key, value);
    });

    const { count, error } = await query;
    if (error) throw error;
    return count || 0;
  }
}