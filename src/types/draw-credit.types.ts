/**
 * Lightweight credit-line shape used by the draw-credit flow.
 *
 * This is intentionally a narrower projection of the canonical
 * `CreditLine` defined in `creditLine.ts` — the wizard only needs the
 * fields required to choose a line and validate the requested amount.
 */
export interface CreditLine {
  id: string;
  name: string;
  limit: number;
  available: number;
  utilization: number;
}

export interface Transaction {
  id: string;
  creditLineId: string;
  amount: number;
  status: "pending" | "success" | "error";
  message?: string;
  timestamp?: Date;
}

/**
 * Linear step machine for the draw-credit wizard. The UI advances through
 * these in order and never branches.
 */
export type DrawStep = "select" | "amount" | "confirm" | "status";
