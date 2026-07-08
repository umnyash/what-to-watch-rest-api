export class CSVParser {
  static parseRow(row: string): string[] {
    const values = []
    let currentValue = '';
    let isInsideQuotes = false;

    const isDoubleQuote = (char: string): boolean => char === '"';
    const isComma = (char: string): boolean => char === ',';

    for (let i = 0; i < row.length; i++) {
      const currentChar = row[i];

      if (isDoubleQuote(currentChar)) {
        if (!isInsideQuotes) {
          isInsideQuotes = true;
          continue;
        }

        const nextChar = row[i + 1];
        const isEscapedQuote = isDoubleQuote(nextChar);

        if (isEscapedQuote) {
          currentValue += currentChar;
          i++;
        } else {
          isInsideQuotes = false;
        }
      } else if (isComma(currentChar) && !isInsideQuotes) {
        values.push(currentValue);
        currentValue = '';
      } else {
        currentValue += currentChar;
      }
    }

    values.push(currentValue);
    return values;
  }
}
