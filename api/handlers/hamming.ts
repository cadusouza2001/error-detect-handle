export function hammingDecode(encoded: string): string {
  let decoded = "";
  for (let i = 0; i < encoded.length; i += 7) {
    const chunk = encoded.slice(i, i + 7).padEnd(7, "0");
    decoded += decodeChunk(chunk);
  }
  return decoded;
}

function decodeChunk(encoded: string): string {
  const bits = encoded.split("").map((bit) => parseInt(bit));
  const p = [bits[0], bits[1], bits[3]];
  const d = [bits[2], bits[4], bits[5], bits[6]];
  const errorBit = p[0] ^ d[1] ^ d[2] ^ d[3];
  if (errorBit) {
    d[0] ^= 1;
  }
  return d.join("");
}
