export function detectChanges(
  oldData: Record<string, any>,
  newData: Record<string, any>,
  ignoredFields: string[] = [],
) {
  const changes: Record<string, any> = {};

  for (const key of Object.keys(newData)) {
    if (ignoredFields.includes(key)) {
      continue;
    }

    if (newData[key] === undefined) {
      continue;
    }

    if (oldData[key] !== newData[key]) {
      changes[key] = {
        old: oldData[key] ?? null,
        new: newData[key],
      };
    }
  }

  return changes;
}