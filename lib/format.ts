export function formatDuration(seconds: number | null | undefined) {
  const minutes = Math.round((seconds ?? 0) / 60);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }

  return `${minutes}m`;
}

export function formatCount(count: number | null | undefined) {
  const value = count ?? 0;

  if (value >= 1000) {
    return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1).replace(".0", "")}k`;
  }

  return value.toLocaleString();
}

export function formatLevel(level: string | null | undefined) {
  if (!level) {
    return "";
  }

  return level.charAt(0).toUpperCase() + level.slice(1).toLowerCase();
}

export function moduleLabel(index: number) {
  return `Module ${index + 1}`;
}

export function lessonLabel(moduleIndex: number, lessonIndex: number) {
  return `${moduleIndex + 1}.${lessonIndex + 1}`;
}