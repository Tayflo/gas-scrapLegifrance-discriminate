// ESLint global variables
/* global */

/**
 * @param {Text} text
 * @param {string[][]} colorMatrice 100x100 Color matrice of hexadecimal value to use.
 * @returns {RichTextValue} RichTextValue
 */
function renderRichtext(text, colorMatrice) {
  const richTextValueBuilder = SpreadsheetApp.newRichTextValue();
  richTextValueBuilder.setText(text.value);
  for (const word of text.words) {
    const style = renderTextstyle(word, colorMatrice);
    if (word.end > text.value.length) throw new Error(`Cannot set TextStyle: Substring out of range (from ${word.start} to ${word.end} when Text is only ${text.value.length} chars)`);
    richTextValueBuilder.setTextStyle(word.start, word.end, style);
  }
  const richText = richTextValueBuilder.build();
  return richText;
}

/**
 * @param {TextWord} word
 * @param {string[][]} colorMatrice 100x100 Color matrice of hexadecimal value to use.
 * @returns {TextStyle}
 */
function renderTextstyle(word, colorMatrice) {
  // From 0 to 100
  const specificity = word.text.specificityRange ? Math.floor(100 * (word.specificity - word.text.minSpecificity) / word.text.specificityRange) : 0;
  // From 0 to 100
  const distinctiveness = word.corpus.distinctivenessRange ? Math.floor(100 * (word.corpusWord.distinctiveness - word.corpus.minDistinctiveness) / word.corpus.distinctivenessRange) : 0;

  const color = colorMatrice[distinctiveness][specificity];
  const textStyle = SpreadsheetApp.newTextStyle()
    .setForegroundColor(color)
    .build();
  return textStyle;
}