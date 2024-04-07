import * as CryptoJS from "crypto-js";

export function stringToSplitHash(text: string) {
  const hash = CryptoJS.SHA256(text).toString();

  var words = CryptoJS.enc.Utf8.parse(textString); // WordArray object
  var base64 = CryptoJS.enc.Base64.stringify(words);
  return [hash.substring(0, 31), hash.substring(31), base64];
}

export function splitHashToString({ stringA, stringB }: { stringA: string, stringB: string }) {
  const hashWordArray = CryptoJS.enc.Hex.parse(stringA + stringB);
  return CryptoJS.SHA256(hashWordArray).toString(CryptoJS.enc.Hex);
}
