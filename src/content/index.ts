import { AP1_ARBEITSPLATZ } from "./topics/ap1-arbeitsplatz";
import { AP1_NETZ_SICHERHEIT } from "./topics/ap1-netz-sicherheit";
import { AP1_DATEN } from "./topics/ap1-daten";
import { AP2_SOFTWARE } from "./topics/ap2-software";
import { AP2_ALGO } from "./topics/ap2-algo";
import { AP2_WISO } from "./topics/ap2-wiso";
import { AP2_PROJEKT } from "./topics/ap2-projekt";
import type { TopicSeed } from "./types";

export const ALL_TOPICS: TopicSeed[] = [
  ...AP1_ARBEITSPLATZ,
  ...AP1_NETZ_SICHERHEIT,
  ...AP1_DATEN,
  ...AP2_PROJEKT,
  ...AP2_SOFTWARE,
  ...AP2_ALGO,
  ...AP2_WISO,
];

/** Stabile IDs: Fragen und Karten werden pro Thema durchnummeriert. */
export const questionId = (topicId: string, index: number) => `${topicId}-q${index + 1}`;
export const cardId = (topicId: string, index: number) => `${topicId}-c${index + 1}`;
