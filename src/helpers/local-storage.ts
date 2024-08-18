import type { LocalStorageKey } from '@/enums/local-storage-key';

export const isBrowser = () => typeof window !== 'undefined';

export function getLocalStorage<T>(key: LocalStorageKey): T {
  return isBrowser() ? JSON.parse(localStorage.getItem(key) ?? 'null') : null;
}

export function setLocalStorage<T>(key: LocalStorageKey, data: T) {
  const oldValue = localStorage.getItem(key);
  const newValue = JSON.stringify(data);

  localStorage.setItem(key, newValue);

  const event = new StorageEvent('storage', { key, oldValue, newValue });
  dispatchEvent(event);
}

export function removeLocalStorage(key: LocalStorageKey) {
  return localStorage.removeItem(key);
}
