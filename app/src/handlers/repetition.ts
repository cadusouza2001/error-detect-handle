export function repetitionEncode(input: string, n = 3): string {
  let encoded = '';
  for (const element of input) {
    for (let j = 0; j < n; j++) {
      encoded += element;
    }
  }
  return encoded;
}
