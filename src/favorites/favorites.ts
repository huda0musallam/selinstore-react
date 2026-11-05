import { readStorage, writeStorage } from '../utils/storage';

const FAVORITES_STORAGE_KEY = 'selin-favorites';

export function loadFavorites(): string[] {
  const saved = readStorage(FAVORITES_STORAGE_KEY);
  if (!Array.isArray(saved)) return [];
  return saved.filter((id: unknown): id is string => typeof id === 'string');
}

export function saveFavorites(favoriteIds: string[]): void {
  writeStorage(FAVORITES_STORAGE_KEY, favoriteIds);
}
