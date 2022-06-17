export const getErrorMessage = (err: any) => {

  if (err && err.message) {
    return err.message;
  }
  if (err && err.errors && err.errors.length) {
    return err.errors[err.errors.length-1].message;
  }

  return err.toString() || "There was an error (-001)";
}

