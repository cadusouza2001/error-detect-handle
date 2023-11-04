export function repetitionDecode(encoded: string, n = 3): string {
  let decoded = "";
  for (let i = 0; i < encoded.length; i += n) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (encoded[i + j] === "1") {
        count++;
      }
    }
    decoded += count > n / 2 ? "1" : "0";
  }
  return decoded;
}
