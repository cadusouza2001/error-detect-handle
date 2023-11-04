export function hammingDecode(encoded: string): string {
  if (encoded.length !== 7) {
    throw new Error("Encoded length must be 7");
  }

  const p1 = (
    parseInt(encoded[2]) ^
    parseInt(encoded[4]) ^
    parseInt(encoded[6])
  ).toString();
  const p2 = (
    parseInt(encoded[2]) ^
    parseInt(encoded[5]) ^
    parseInt(encoded[6])
  ).toString();
  const p3 = (
    parseInt(encoded[4]) ^
    parseInt(encoded[5]) ^
    parseInt(encoded[6])
  ).toString();

  const errorBit = parseInt(p1 + p2 + p3, 2);

  if (errorBit !== 0) {
    encoded =
      encoded.slice(0, errorBit - 1) +
      (1 - parseInt(encoded[errorBit - 1])).toString() +
      encoded.slice(errorBit);
  }

  return encoded[2] + encoded.slice(4);
}
