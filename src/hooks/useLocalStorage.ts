import { useCallback, useEffect, useState } from 'react';

import type { LocalStorageKey } from '@/enums/local-storage-key';
import { getLocalStorage } from '@/helpers/local-storage';

const useLocalStorage = <T>(key: LocalStorageKey) => {
  const localStorageItem: T | null = getLocalStorage<T>(key);
  const [localState, setLocalState] = useState(localStorageItem);

  const syncLocalStorage = useCallback(
    (event: StorageEvent) => {
      if (event.key !== key) return;
      setLocalState(getLocalStorage<T>(key));
    },
    [key],
  );

  useEffect(() => {
    window.addEventListener('storage', syncLocalStorage);

    return () => {
      window.removeEventListener('storage', syncLocalStorage);
    };
  }, [syncLocalStorage]);

  return localState;
};

export default useLocalStorage;
