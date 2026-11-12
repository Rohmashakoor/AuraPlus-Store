# Solène Fine Jewelry

Next.js (App Router) + Tailwind CSS storefront with cash on delivery.

## Run it

```bash
npm install
cp .env.example .env.local      # then fill in your email details
npm run dev                     # http://localhost:3000
```

Production: `npm run build && npm start`.

## How an order works

1. The customer fills the bag (any quantity of any piece, up to 20 per option) and clicks Proceed to Checkout.
2. They enter name, mobile, city and address. Payment is cash on delivery.
3. `/api/orders` re-prices everything from `src/data/products.js`, adds the Rs 250 delivery charge, and emails you the order. Telegram is optional.
4. The customer sees an order confirmation page, and their bag is cleared.

If neither email nor Telegram is set up, or both fail, the order is refused and the customer sees an error. Orders are also written to the server log.

## Edit the shop

- Products, prices (whole rupees), sizes and photo paths: `src/data/products.js`.
- Delivery charge: `DELIVERY_FEE` in the same file.
- Photos: drop files in `public/images/`. Missing photos show a drawn placeholder.
- Colors and fonts: `src/app/globals.css` and `tailwind.config.js`.

## Order alerts

- Email: set `SMTP_USER`, `SMTP_PASS` (Gmail App Password) and `ORDER_NOTIFY_EMAIL` in `.env.local`.
- Telegram (instant phone alert, optional): set `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`.
- Instagram is not supported. Instagram only allows automated messages through a Business account and Meta's approval process, so email plus Telegram is the practical route.

## Hosting note

On Vercel, set the same variables under Project Settings > Environment Variables. The site stores nothing on the server, so keep an eye on your email for orders, or add a database later.
