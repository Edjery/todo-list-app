// Function to compare two arrays of objects
export const areArrayObjectsEqual = (
  firstArray: {
    choice: string;
    status: boolean;
  }[],
  secondArray: {
    choice: string;
    status: boolean;
  }[]
): boolean => {
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  for (let i = 0; i < firstArray.length; i++) {
    if (!isObjectEqual(firstArray[i], secondArray[i])) {
      return false;
    }
  }

  return true;
};

// Function to compare two objects
export const isObjectEqual = (
  firstObject: {
    choice: string;
    status: boolean;
  },
  secondObject: {
    choice: string;
    status: boolean;
  }
): boolean => {
  const firstKeys = Object.keys(firstObject) as Array<keyof typeof firstObject>;
  const secondKeys = Object.keys(secondObject) as Array<
    keyof typeof secondObject
  >;

  if (firstKeys.length !== secondKeys.length) {
    return false;
  }

  for (const key of firstKeys) {
    if (firstObject[key] !== secondObject[key]) {
      return false;
    }
  }

  return true;
};
