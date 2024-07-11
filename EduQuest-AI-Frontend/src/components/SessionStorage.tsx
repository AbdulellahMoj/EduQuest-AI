// src/utils/sessionStorageUtils.ts

const SESSION_STORAGE_KEY = "completedLevels";

// Retrieve completed levels from session storage
export const getCompletedLevels = (courseCode: string): number[] | null => {
  const storedLevels = sessionStorage.getItem(
    `${SESSION_STORAGE_KEY}-${courseCode}`
  );
  return storedLevels ? JSON.parse(storedLevels) : null;
};

// Store completed levels in session storage
export const setCompletedLevels = (
  courseCode: string,
  completedLevels: number[]
): void => {
  sessionStorage.setItem(
    `${SESSION_STORAGE_KEY}-${courseCode}`,
    JSON.stringify(completedLevels)
  );
};

// Clear completed levels from session storage
export const clearCompletedLevels = (courseCode: string): void => {
  sessionStorage.removeItem(`${SESSION_STORAGE_KEY}-${courseCode}`);
};
