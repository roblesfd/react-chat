import { faker } from "@faker-js/faker";
import { pickRandom, pipeline, shortenString } from "./misc";

const itemListGenerator = <T, P extends any[]>(
  convNum: number,
  fn: (...args: P) => T
): T[] => {
  return Array.from({ length: convNum }, () => fn(...([] as unknown as P)));
};

const generateFakeUser = (msgList: string[]) => ({
  fullName: faker.person.fullName(),
  messageShort: pipeline(pickRandom, shortenString)(msgList) as string,
});

export { itemListGenerator, generateFakeUser };
