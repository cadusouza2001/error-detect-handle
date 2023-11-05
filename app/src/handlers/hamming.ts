export function hammingEncode(input: string): string {
  let encoded = '';
  for (let i = 0; i < input.length; i += 4) {
    const chunk = input.slice(i, i + 4).padEnd(4, '0');
    encoded += encodeChunk(chunk);
  }
  return encoded;
}

function encodeChunk(input: string): string {
  const d = input.split('').map((bit) => parseInt(bit));
  //Position 0 ensures that the whole code has an even number of 1s
  //Position 1 is parity bit where final bit is 1
  //Position 2 is parity bit where second to last bit is 1
  //Position 4 is parity bit where third to last bit is 1
  const position_one = d[0] ^ d[1] ^ d[3];
  const position_two = d[0] ^ d[2] ^ d[3];
  const position_four = d[1] ^ d[2] ^ d[3];
  const position_zero =
    d[0] ^ d[1] ^ d[2] ^ d[3] ^ position_one ^ position_two ^ position_four;
  return `${position_zero}${position_one}${position_two}${d[0]}${position_four}${d[1]}${d[2]}${d[3]}`;
}
