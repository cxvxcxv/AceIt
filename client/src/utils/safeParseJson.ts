export function safeParseJson<T>(jsonString: string): T | null {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed;
  } catch (error) {
    console.error('Failed to parse JSON:', error);
    return null;
  }
}
