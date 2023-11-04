export function bitsToString(input: string): string {
  let output = "";
  for (let i = 0; i < input.length; i += 8) {
    let byte = input.slice(i, i + 8);
    output += String.fromCharCode(parseInt(byte, 2));
  }
  return output;
}
