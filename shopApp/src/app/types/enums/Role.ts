export const ROLE = {
  Admin: 'Admin',
  User: 'User',
} as const; // The "as const" makes the values of the object literals literal types

// Type inferred for each of the values is the literal type
export type Role = (typeof ROLE)[keyof typeof ROLE];
