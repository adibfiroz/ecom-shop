export const getStorageItem = (key: string, defaultValue: any) => {
  if (typeof window === "undefined") return defaultValue;
  const saved = localStorage.getItem(key);
  return saved ? JSON.parse(saved) : defaultValue;
};
