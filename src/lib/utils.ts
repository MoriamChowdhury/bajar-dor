const BN_DIGITS = "০১২৩৪৫৬৭৮৯";

export const toBn = (value: number | string) =>
  String(value).replace(/\d/g, (d) => BN_DIGITS[Number(d)]);

// 1850 -> ১,৮৫০
export const formatPrice = (n: number) => n.toLocaleString("bn-BD");

// আজকের বাংলা তারিখ: "শনিবার, ১০ অক্টোবর, ২০২৬"
export const todayBn = () =>
  new Date().toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  });