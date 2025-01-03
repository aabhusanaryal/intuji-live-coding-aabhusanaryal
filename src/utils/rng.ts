export const generateRandomNumber = (min: number, max: number): number =>
  Math.random() * (max - min + 1) + min;

export const generateRandomDate = (from: Date, to: Date) => {
  return new Date(
    from.getTime() + Math.random() * (to.getTime() - from.getTime())
  );
};
