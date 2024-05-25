const capitalize = (string: string) =>
  string.replace(/\b\w/g, (l) => l.toUpperCase());

const prettify = (string: string, delimitter = " ") => {
  const [firstWord, ...remainingWords] = string.split(delimitter);
  const capitalizedFirstWord = capitalize(firstWord);
  return [capitalizedFirstWord, ...remainingWords].join(delimitter);
};

export { prettify };
