import { customAlphabet } from "nanoid";

const ALPHABET =
  "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

function shortId() {
  return customAlphabet(ALPHABET, 11)();
}

export default shortId;
