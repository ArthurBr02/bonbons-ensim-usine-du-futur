export function generateOrderId(): string {
  const a = Math.random().toString(36).substring(2, 7).toUpperCase();
  const b = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `CB-${a}-${b}`;
}
