/**
 * Canonical time-entry domain model.
 *
 * Categories are represented by a single categoryId. The category itself may
 * live at any depth in the category tree; no cat/sub pair is required.
 */
export function createTimeEntry({
  id,
  date,
  duration = 0,
  description = "",
  categoryId = null,
  projectId = null,
  volunteerId = null,
} = {}) {
  return {
    id,
    date,
    duration,
    description,
    categoryId,
    projectId,
    volunteerId,
  };
}

export function updateTimeEntry(entry, changes = {}) {
  return createTimeEntry({ ...entry, ...changes });
}

/**
 * Compatibility migration for persisted legacy entries.
 * This function is intentionally isolated from business logic and should be
 * removed once all persisted data has been migrated.
 */
export function migrateTimeEntryCategory(entry, resolveCategoryId) {
  if (entry?.categoryId != null) {
    return createTimeEntry(entry);
  }

  const categoryId = resolveCategoryId?.(entry?.cat, entry?.sub) ?? null;
  const { cat: _cat, sub: _sub, ...rest } = entry ?? {};

  return createTimeEntry({ ...rest, categoryId });
}
