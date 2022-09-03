import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useEventListener } from './useEventListener';

declare global {
  interface WindowEventMap {
    'local-storage': CustomEvent;
  }
}

type SetValue<T> = Dispatch<SetStateAction<T>>;

function useEventCallback<Args extends unknown[], R>(fn: (...args: Args) => R) {
  const ref = useRef<typeof fn>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useLayoutEffect(() => {
    ref.current = fn;
  }, [fn]);

  return useCallback((...args: Args) => ref.current(...args), [ref]);
}

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const readValue = useCallback((): T => {
    if (typeof window === 'undefined' || !window.localStorage) return initialValue;

    try {
      const item = window.localStorage.getItem(key);
      return item ? (parseJSON(item) as T) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);
      return initialValue;
    }
  }, [initialValue, key]);

  const [storedValue, setStoredValue] = useState<T>(readValue);

  const setValue: SetValue<T> = useEventCallback((value) => {
    if (typeof window === 'undefined' || !window.localStorage) {
      console.warn(
        `Tried setting localStorage key “${key}” even though environment is not a client`,
      );
    }

    try {
      const newValue = value instanceof Function ? value(storedValue) : value;
      window.localStorage.setItem(key, JSON.stringify(newValue));
      setStoredValue(newValue);
      window.dispatchEvent(new Event('local-storage'));
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error);
    }
  });

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  const handleStorageChange = useCallback(
    (event: StorageEvent | CustomEvent) => {
      if ((event as StorageEvent)?.key && (event as StorageEvent).key !== key) return;
      setStoredValue(readValue());
    },
    [key, readValue],
  );

  useEventListener('storage', handleStorageChange);
  useEventListener('local-storage', handleStorageChange);
  return [storedValue, setValue];
}

function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '');
  } catch {
    console.log('parsing error on', { value });
    return undefined;
  }
}
