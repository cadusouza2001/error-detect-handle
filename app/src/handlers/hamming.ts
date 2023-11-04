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
  const p = [d[1] ^ d[2] ^ d[3], d[0] ^ d[2] ^ d[3], d[0] ^ d[1] ^ d[3]];
  return `${p[0]}${p[1]}${d[0]}${p[2]}${d[1]}${d[2]}${d[3]}`;
}
