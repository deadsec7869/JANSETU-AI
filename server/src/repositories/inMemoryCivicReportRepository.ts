import { randomUUID } from 'crypto';
import {
  CivicReportEntity,
  CivicReportRepository,
  ReportStatus,
} from './civicReportRepository.js';

/**
 * InMemoryCivicReportRepository
 * 
 * NOTE: Development and in-memory storage only.
 * Implements the standard CivicReportRepository interface so it can be swapped
 * for PostgreSQL, DynamoDB, or SQLite in production without touching service logic.
 */
export class InMemoryCivicReportRepository implements CivicReportRepository {
  private reports = new Map<string, CivicReportEntity>();

  async create(data: Omit<CivicReportEntity, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): Promise<CivicReportEntity> {
    const now = new Date().toISOString();
    const id = data.id || randomUUID();

    const entity: CivicReportEntity = {
      ...data,
      id,
      createdAt: now,
      updatedAt: now,
    };

    this.reports.set(id, entity);
    return entity;
  }

  async getById(id: string): Promise<CivicReportEntity | null> {
    return this.reports.get(id) || null;
  }

  async list(filters?: { category?: string; ward?: string; status?: ReportStatus; limit?: number }): Promise<CivicReportEntity[]> {
    let result = Array.from(this.reports.values());

    if (filters?.category) {
      result = result.filter((r) => r.category.toLowerCase() === filters.category?.toLowerCase());
    }
    if (filters?.ward) {
      result = result.filter((r) => r.ward?.toLowerCase().includes(filters.ward?.toLowerCase() || ''));
    }
    if (filters?.status) {
      result = result.filter((r) => r.status === filters.status);
    }

    // Sort newest first
    result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if (filters?.limit && filters.limit > 0) {
      result = result.slice(0, filters.limit);
    }

    return result;
  }

  async update(id: string, updates: Partial<CivicReportEntity>): Promise<CivicReportEntity | null> {
    const existing = this.reports.get(id);
    if (!existing) return null;

    const updated: CivicReportEntity = {
      ...existing,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.reports.set(id, updated);
    return updated;
  }

  async delete(id: string): Promise<boolean> {
    return this.reports.delete(id);
  }

  async count(): Promise<number> {
    return this.reports.size;
  }

  /**
   * Helper for test teardown
   */
  clear(): void {
    this.reports.clear();
  }
}

export const reportRepository = new InMemoryCivicReportRepository();
