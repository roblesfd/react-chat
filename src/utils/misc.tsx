const pipeline =
  (...fns) =>
  (x) =>
    fns.reduce((v, fn) => fn(v), x);
const randomInt = (range: number) => Math.floor(Math.random() * range);
const pickRandom = (items: any[]) => items[randomInt(items.length)];
const shortenString = (str: string, maxChars: number = 13) =>
  str.slice(0, maxChars);

export { pipeline, randomInt, pickRandom, shortenString };
