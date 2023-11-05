export function repetitionDecode(encoded: string, n = 3): string {
  let decoded = "";
  for (let i = 0; i < encoded.length; i += n) {
    let count = 0;
    for (let j = 0; j < n; j++) {
      if (encoded[i + j] === "1") {
        count++;
      }
    }
    // Correct the error
    if (count !== n && count !== 0) {
      console.log(
        "REP: Error on chunk " +
          encoded.slice(i, i + n) +
          " on position " +
          i +
          " to " +
          (i + n)
      );
    }
    decoded += count > n / 2 ? "1" : "0";
  }
  return decoded;
}
