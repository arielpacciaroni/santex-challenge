import { useState } from "react";

export default function useStateWithStorage<T>(
  key: string,
  defaultValue: T
) {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
  });

  const setValueWithStorage = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setValueWithStorage] as const;
}

