# বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের আজকের বাজারদর, দামের উঠানামা এবং বিভিন্ন বাজারের তুলনা এক জায়গায় দেখার একটি ওয়েব অ্যাপ্লিকেশন। Programming Hero Assignment 07-এর জন্য তৈরি।

🔗 **Live Site:** https://bajar-dor-beryl.vercel.app
📦 **GitHub:** https://github.com/MoriamChowdhury/bajar-dor

## বিবরণ

BazarDor ব্যবহারকারীকে আজকের পণ্যের দাম, গতকালের তুলনায় বাড়া-কমা এবং বাজারভেদে সর্বনিম্ন, সর্বোচ্চ ও গড় দাম দেখায়। ক্যাটাগরি অনুযায়ী পণ্য ফিল্টার ও সর্ট করা যায়। পণ্যের বিস্তারিত পেজ দেখতে লগইন করতে হয়।

## Tech Stack

- **Framework:** Next.js 16 (App Router), React, TypeScript
- **Styling:** Tailwind CSS v4, DaisyUI
- **Authentication:** Better Auth (Email/Password, Google, GitHub)
- **Database:** MongoDB Atlas (auth data)
- **Notifications:** react-hot-toast
- **Deployment:** Vercel

## Features

1. **Live price ticker:** নেভবারের নিচে মার্কি আকারে পণ্যের দাম ও পরিবর্তন চলতে থাকে।
2. **দাম বাড়া/কমার তালিকা:** হোম পেজে সবচেয়ে বেশি বাড়া ৬টি ও কমা ৬টি পণ্য (▲ লাল / ▼ সবুজ ব্যাজ, Figma ডিজাইন অনুযায়ী)।
3. **ক্যাটাগরি পেজ:** ক্যাটাগরির আইকনসহ পণ্যের তালিকা, দাম অনুযায়ী সংখ্যাগতভাবে (numeric) সর্ট ড্রপডাউন, স্কেলিটন লোডিং এবং খালি/৪০৪ স্টেট।
4. **পণ্যের বিস্তারিত (Protected):** সর্বনিম্ন, সর্বোচ্চ ও গড় দাম এবং বাজারভিত্তিক দামের টেবিল। লগইন ছাড়া ঢুকলে `/signin`-এ রিডাইরেক্ট হয়।
5. **Authentication:** Email/Password সাইন আপ ও সাইন ইন, এবং Google ও GitHub দিয়ে সোশ্যাল লগইন।
6. **প্রোফাইল:** আলাদা রুটে (`/profile/update`) নাম আপডেট করার সুবিধা।
7. **রেসপন্সিভ ডিজাইন:** মোবাইল, ট্যাবলেট ও ডেস্কটপে কাজ করে; বাংলা তারিখ ও সংখ্যা সমর্থিত।
8. **UX:** টোস্ট নোটিফিকেশন, স্কেলিটন লোডার এবং কাস্টম ৪০৪ পেজ।

## Demo Credentials

```
Email:    maria@gmail.com
Password: 11111111
```

অথবা Google / GitHub দিয়ে সরাসরি লগইন করা যাবে।

## লোকালি চালানোর নিয়ম

```bash
git clone https://github.com/MoriamChowdhury/bajar-dor.git
cd bajar-dor
npm install
```

রুটে `.env.local` ফাইল বানিয়ে নিচের মানগুলো দাও:

```env
NEXT_PUBLIC_API_URL=https://openapi.programming-hero.com/api/bazardor
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

তারপর:

```bash
npm run dev
```

ব্রাউজারে [http://localhost:3000](http://localhost:3000) খোলো।

## Routes

| Route | বিবরণ | Access |
| --- | --- | --- |
| `/` | হোম | Public |
| `/category/[slug]` | ক্যাটাগরি পেজ | Public |
| `/product/[slug]` | পণ্যের বিস্তারিত | Protected |
| `/signin`, `/signup` | লগইন / রেজিস্টার | Public |
| `/profile`, `/profile/update` | প্রোফাইল | Protected |