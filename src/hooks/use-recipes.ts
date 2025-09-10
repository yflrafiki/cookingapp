import { useCallback } from 'react';
import { initDB } from '@/lib/db';
import { Recipe } from '@/types';

const STORE_NAME = 'recipes';


export function useCreateRecipe() {
  return useCallback(async (recipe: Omit<Recipe, 'id'>): Promise<number> => {
    const db = await initDB();
    return await db.add(STORE_NAME, recipe);
  }, []);
}

export function useUpdateRecipe() {
  return useCallback(async (id: string, updates: Partial<Recipe>): Promise<Recipe> => {
    const db = await initDB();
    const existing = await db.get(STORE_NAME, id) as Recipe | undefined;
    if (!existing) throw new Error('Recipe not found');
    const updated: Recipe = { ...existing, ...updates };
    await db.put(STORE_NAME, updated);
    return updated;
  }, []);
}


export function useGetRecipe() {
  return useCallback(async (id: string): Promise<Recipe | undefined> => {
    const db = await initDB();
    return await db.get(STORE_NAME, id);
  }, []);
}


export function useListRecipes() {
  return useCallback(async (): Promise<Recipe[]> => {
    const db = await initDB();
    return await db.getAll(STORE_NAME);
  }, []);
}
export function useDeleteRecipe() {
  return useCallback(async (id: string): Promise<void> => {
    const db = await initDB();
    await db.delete(STORE_NAME, id);
  }, []);
}
