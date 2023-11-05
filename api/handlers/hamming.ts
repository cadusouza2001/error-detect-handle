export function hammingDecode(encoded: string): string {
  let decoded = "";
  for (let i = 0; i < encoded.length; i += 8) {
    const chunk = encoded.slice(i, i + 8).padEnd(8, "0");
    decoded += decodeChunk(chunk);
  }
  return decoded;
}

function decodeChunk(encoded: string): string {
  const bits = encoded.split("").map((bit) => parseInt(bit));

  //Position 0 ensures that the whole code has an even number of 1s
  //Position 1 is parity bit where final bit is 1
  const errorOnPositionOne = bits[1] ^ bits[3] ^ bits[5] ^ bits[7];
  //Position 2 is parity bit where second to last bit is 1
  const errorOnPositionTwo = bits[2] ^ bits[3] ^ bits[6] ^ bits[7];
  //Position 4 is parity bit where third to last bit is 1
  const errorOnPositionFour = bits[4] ^ bits[5] ^ bits[6] ^ bits[7];

  //If overall parity is 0 but there was errors detected, then there is more than one error
  const overallParity =
    bits[0] ^
    bits[1] ^
    bits[2] ^
    bits[3] ^
    bits[4] ^
    bits[5] ^
    bits[6] ^
    bits[7];

  if (
    overallParity === 0 &&
    (errorOnPositionOne || errorOnPositionTwo || errorOnPositionFour)
  ) {
    console.log("Hamming: More than one error detected");
  } else if (
    overallParity === 1 &&
    (errorOnPositionOne || errorOnPositionTwo || errorOnPositionFour)
  ) {
    const errorPosition =
      errorOnPositionOne * 1 + errorOnPositionTwo * 2 + errorOnPositionFour * 4;
    bits[errorPosition] = bits[errorPosition] ^ 1;
    console.log("Hamming: Error corrected at position " + errorPosition);
  }
  return `${bits[3]}${bits[5]}${bits[6]}${bits[7]}`;
}
