export function huffmanDecompression(
  encodedText: string,
  codeMap: { [key: string]: string },
): string {
  let decodedText = '';
  let currentCode = '';

  for (const bit of encodedText) {
    currentCode += bit;
    if (Object.values(codeMap).includes(currentCode)) {
      const foundKey = Object.keys(codeMap).find(
        (key) => codeMap[key] === currentCode,
      );
      decodedText += foundKey;
      currentCode = '';
    }
  }

  return decodedText;
}
