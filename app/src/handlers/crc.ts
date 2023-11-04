export function crcEncode(input: string, polynomial = '10011'): string {
  const appendedInput =
    input +
    Array(polynomial.length - 1)
      .fill('0')
      .join('');
  const remainder = mod2div(appendedInput, polynomial);
  return input + remainder;
}

function mod2div(dividend: string, divisor: string): string {
  let pick = divisor.length;
  let tmp = dividend.slice(0, pick);

  while (pick < dividend.length) {
    if (tmp[0] === '1') {
      tmp = xor(tmp, divisor) + dividend[pick];
    } else {
      tmp = xor(tmp, Array(pick).fill('0').join('')) + dividend[pick];
    }
    pick += 1;
  }

  if (tmp[0] === '1') {
    tmp = xor(tmp, divisor);
  } else {
    tmp = xor(tmp, Array(pick).fill('0').join(''));
  }

  return tmp;
}

function xor(a: string, b: string): string {
  let result = '';

  for (let i = 1; i < a.length; i++) {
    if (a[i] === b[i]) {
      result += '0';
    } else {
      result += '1';
    }
  }

  return result;
}
