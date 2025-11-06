// src/lib/serialize.ts
import { Decimal } from "@prisma/client/runtime/library"; // <- this is the most robust import

export function safeJson<T>(data: T): T {
  return JSON.parse(
    JSON.stringify(data, (_key, value) => {
      if (value instanceof Decimal) {
        return value.toNumber();
      }
      if (value instanceof Date) {
        return value.toISOString();
      }
      if (typeof value === "bigint") {
        return Number(value);
      }
      return value;
    })
  );
}
