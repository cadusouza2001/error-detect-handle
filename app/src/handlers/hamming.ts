export function hammingEncode(input: string): string {
  if (input.length !== 4) {
    throw new Error('Input length must be 4');
  }

  const p1 = (
    parseInt(input[0]) ^
    parseInt(input[1]) ^
    parseInt(input[3])
  ).toString();
  const p2 = (
    parseInt(input[0]) ^
    parseInt(input[2]) ^
    parseInt(input[3])
  ).toString();
  const p3 = (
    parseInt(input[1]) ^
    parseInt(input[2]) ^
    parseInt(input[3])
  ).toString();

  return p1 + p2 + input[0] + p3 + input.slice(1);
}
