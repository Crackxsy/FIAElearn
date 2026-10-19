import "server-only";
import bcrypt from "bcryptjs";

let dummyHash: Promise<string> | null = null;

export const hashPassword = (password: string) => bcrypt.hash(password, 12);

/** Prüft immer gegen einen Hash – auch wenn es das Konto nicht gibt (gleiche Antwortzeit). */
export async function verifyPassword(password: string, hash: string | null) {
  if (!hash) {
    dummyHash ??= bcrypt.hash("fiaelearn-dummy", 12);
    await bcrypt.compare(password, await dummyHash);
    return false;
  }
  return bcrypt.compare(password, hash);
}
