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


  export const UNIT_FULL: Record<string, string> = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};

export const UNIT_SHORT: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

// 2.1 / -2.9 / 0  ->  ২.১ / ২.৯ / ০.০
export const fmtPct = (pct: number) => toBn(Math.abs(pct).toFixed(1));