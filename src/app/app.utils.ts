export function isPastDate(date: Date) {
  const today = new Date();

  return (
    date.getFullYear() <= today.getFullYear() &&
    date.getMonth() <= today.getMonth() &&
    date.getDate() < today.getDate()
  );
}

export function maskCardNumber(num: string) {
  const len = num.length;
  const last4 = num.substr(-4);

  return last4.padStart(len, "x");
}
