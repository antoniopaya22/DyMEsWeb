/**
 * Web storage utility — localStorage wrapper matching mobile API
 */

export const STORAGE_KEYS = {
  CAMPAIGNS: "dyd:campaigns",
  CHARACTER_LIST: "dyd:character_list",
  CHARACTER: (id: string) => `dyd:character:${id}`,
  INVENTORY: (id: string) => `dyd:inventory:${id}`,
  NOTES: (characterId: string) => `dyd:notes:${characterId}`,
  CUSTOM_TAGS: "dyd:custom_tags",
  CREATION_DRAFT: (draftId?: string) => `dyd:draft:${draftId ?? "current"}`,
  SETTINGS: "dyd:settings",
} as const;

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`[Storage] Error saving "${key}":`, error);
  }
}

export function getItem<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch (error) {
    console.error(`[Storage] Error reading "${key}":`, error);
    return null;
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`[Storage] Error removing "${key}":`, error);
  }
}

export function clearUserData(): void {
  const keepPrefixes = ["dyd:settings"];
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key?.startsWith("dyd:") && !keepPrefixes.some(p => key.startsWith(p))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
  } catch (error) {
    console.error("[Storage] Error clearing user data:", error);
  }
}
