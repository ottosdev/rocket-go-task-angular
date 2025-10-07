export function generateIdWithTimestamp(): string {
  const timestamp = Date.now().toString(36);
  const randomId = Math.random().toString(36).substring(2, 9);
  return `${timestamp}-${randomId}`;
}
