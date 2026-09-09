/**
 * Joins a person's name parts, skipping any that are missing so there is no
 * stray whitespace. Falls back to `fallback` when nothing is set.
 */
export function fullName(
  person: { firstName?: string | null; lastName?: string | null },
  fallback = 'Unknown'
): string {
  return [person.firstName, person.lastName].filter(Boolean).join(' ') || fallback;
}
