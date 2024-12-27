export const normalizeSearchQuery = (query) => {
  const turkishMap = {
    ç: "c",
    Ç: "C",
    ğ: "g",
    Ğ: "G",
    ı: "i",
    İ: "I",
    ö: "o",
    Ö: "O",
    ş: "s",
    Ş: "S",
    ü: "u",
    Ü: "U",
  };

  return query
    .split("")
    .map((char) => turkishMap[char] || char)
    .join("");
};
