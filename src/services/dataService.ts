import prayers from "../data/prayer-data.json";

// Yangi JSON qo'shsangiz, faqat shu yerga qo'shasiz
const sources = {
  prayers
} as const;

export type DataName = keyof typeof sources;
export type DataOf<K extends DataName> = (typeof sources)[K];

export async function getData<K extends DataName>(name: K): Promise<DataOf<K>> {
  return sources[name];
}