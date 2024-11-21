import { jwtDecode } from "jwt-decode";
import { decodedEmpty } from "./mockData";

const pipeline =
  (...fns) =>
  (x) =>
    fns.reduce((v, fn) => fn(v), x);
const randomInt = (range: number) => Math.floor(Math.random() * range);
const pickRandom = (items: any[]) => items[randomInt(items.length)];
const shortenString = (str: string, maxChars: number = 13) =>
  str.slice(0, maxChars);
const capitalizeString = (str: string) => str[0].toUpperCase() + str.slice(1);

const getDecodedUser = () => {
  const token : string = sessionStorage.getItem("jwt")  
  ? JSON.parse(sessionStorage.getItem("jwt") as string) 
  : "";

return token ?  jwtDecode(token) as typeof decodedEmpty : decodedEmpty;

}

export { pipeline, randomInt, pickRandom, shortenString, capitalizeString, getDecodedUser };
