export function stringToBits(input: string): string {
  let output = '';
  for (const element of input) {
    let binary = element.charCodeAt(0).toString(2);
    while (binary.length < 8) {
      binary = '0' + binary;
    }
    output += binary;
  }
  return output;
}
