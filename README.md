# Eleanor & James — Wedding Website

A static HTML/CSS/JS site. No build tools, no framework — just open `index.html` in a browser to preview it locally, or drop the whole folder onto any static host.

## What to edit first

1. **Names & date** — search and replace `Eleanor`, `James`, and `September 12, 2026` across all `.html` files with your real names and date.
2. **Countdown date** — in `script.js`, update the `WEDDING_DATE` constant at the top (line 4) to your real date and time.
3. **Venue & schedule** — edit `details.html`.
4. **Our Story** — edit the timeline in `story.html`.
5. **Wedding Party** — edit names/roles in `wedding-party.html`.
6. **Travel & Registry links** — edit `travel.html` and `registry.html` (registry links are currently `#` placeholders).
7. **FAQ** — edit questions/answers in `faq.html`.

## Adding real photos

Every photo spot is currently a placeholder `<div class="photo-placeholder">...</div>`. To swap in a real photo, replace that div with:

```html
<img src="images/your-photo.jpg" alt="Description of the photo">
```

Drop your image files into the `images/` folder. For best results, use similarly-cropped images per section (the panels on the homepage are roughly square-to-landscape; wedding party photos are square).

## RSVP form

The RSVP page (`rsvp.html`) is a fully styled form, but it doesn't send anywhere yet — right now submitting just shows an alert. To actually collect responses, the easiest no-backend option is:

1. Create a free form at [formspree.io](https://formspree.io).
2. Change `<form class="rsvp-form" id="rsvp-form">` to include `action="https://formspree.io/f/YOUR_ID" method="POST"`.
3. Remove the `<script>` block at the bottom of `rsvp.html` that intercepts the submit with an alert.

I'm also happy to wire this up for you — just ask.

## Putting it on your own domain

This is a static site, so it works with any static host. A few easy, mostly-free options:

- **Netlify** — drag-and-drop the folder onto netlify.com, then add your custom domain in site settings.
- **Vercel** — similar drag-and-drop deploy, custom domains supported.
- **GitHub Pages** — push this folder to a GitHub repo and enable Pages in settings.
- **Cloudflare Pages** — same idea, with Cloudflare handling DNS if you buy your domain there.

Buy the domain wherever you like (Namecheap, Google Domains successor Squarespace Domains, Cloudflare Registrar), then point it at whichever host you pick — each has a short "connect custom domain" guide.

## Notes

- The envelope-opening intro only plays once per browser session (`sessionStorage`) so returning visitors aren't stuck watching it every time.
- Reduced-motion preferences are respected — animations are minimized for visitors who have that OS setting on.
- The nav collapses to a mobile menu under 800px width.
