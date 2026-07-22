import "server-only";

/**
 * Limitation de débit best-effort, en mémoire (fenêtre glissante).
 *
 * ⚠️ En environnement serverless, la mémoire n'est pas partagée entre instances :
 * cette protection est un premier rempart, à compléter par une solution
 * distribuée (Upstash Redis, etc.) en production à fort trafic. Voir README.
 */
type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export type RateLimitResult = { success: boolean; remaining: number; resetAt: number };

export function rateLimit(
  key: string,
  { limit = 5, windowMs = 60_000 }: { limit?: number; windowMs?: number } = {},
): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt < now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { success: true, remaining: limit - 1, resetAt };
  }

  existing.count += 1;
  const success = existing.count <= limit;
  return {
    success,
    remaining: Math.max(0, limit - existing.count),
    resetAt: existing.resetAt,
  };
}

/** Nettoyage opportuniste pour éviter une croissance mémoire non bornée. */
export function sweepRateLimits() {
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}
