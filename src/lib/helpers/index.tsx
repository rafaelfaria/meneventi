export const getErrorMessage = (err: any) => {

  if (err && err.message) {
    return err.message;
  }
  if (err && err.errors && err.errors.length) {
    return err.errors[err.errors.length-1].message;
  }

  return err.toString() || "There was an error (-001)";
}

export const stripTrailingSlash = (str: string) => {
    return str.endsWith('/') ?
        str.slice(0, -1) :
        str;
};

/**
 * Create a slug out of a text
 */
export const slugify = (text: string, separator = "-") => {
    return text
        .toString()
        .normalize('NFD')                   // split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '')   // remove all previously split accents
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '')   // remove all chars not letters, numbers and spaces (to be replaced)
        .trim()
        .replace(/\s+/g, separator);
};


export const zeroPad = (num: number, places: number = 2) => String(num).padStart(places, '0')