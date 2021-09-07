const UPPER_BOUNDARY = 0x80;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const modulo = (a: number, n: number): number => ((a % n) + n) % n;

function toBase64(string: string): string {
  //return encodeURIComponent(string);
  return Buffer.from(string).toString("base64");
}

function fromBase64(string: string): string {
  //return decodeURIComponent(string);
  return Buffer.from(string, "base64").toString();
}

function toCodeArray(string: string): Uint8Array {
  return encoder.encode(string);
}

function fromCodeArray(arr: Uint8Array): string {
  return decoder.decode(arr);
}

export function caesarCipher(text: string, shiftAmount: number = 1): string {
  const codes = toCodeArray(toBase64(text));
  const ciphered = new Uint8Array(codes);

  ciphered.map((value: number, i: number) => {
    return (ciphered[i] = modulo(value + shiftAmount, UPPER_BOUNDARY));
  });

  return fromCodeArray(ciphered);
}

export function caesarDecipher(
  cipheredText: string,
  shiftAmount: number = 1,
): string {
  const cipheredCodes = toCodeArray(cipheredText);
  const decipheredCodes = new Uint8Array(cipheredCodes);

  decipheredCodes.map((value: number, i: number) => {
    return (decipheredCodes[i] = modulo(value - shiftAmount, UPPER_BOUNDARY));
  });

  return fromBase64(fromCodeArray(decipheredCodes));
}
