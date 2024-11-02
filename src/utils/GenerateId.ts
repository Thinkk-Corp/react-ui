// utils.ts

export function generateId(prefix = "id"): string {
	return `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
}
