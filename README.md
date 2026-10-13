# Hotel Flooring

Static HTML site for [hotelflooring.com.au](https://hotelflooring.com.au) — SEO lead generation for **Hotel Flooring, a Premrest business** (Premier Restorations Group). Hotel flooring supply and installation for occupied hotels, motels and serviced apartments in Melbourne, Sydney and Brisbane.

Plain HTML/CSS/vanilla JS. No framework. No build step. Deploy the repo root on Vercel.

## Deploy

- `vercel.json` enables `cleanUrls` and `trailingSlash`, and 301s `www.hotelflooring.com.au` to the apex.
- Folder URLs: `melbourne/index.html` → `/melbourne/`.
- Forms POST to Formspree `https://formspree.io/f/mkolyele`.
- GA4 measurement ID `G-CW60MQTLVF` is in every page `<head>`. On successful submit, `generate_lead` fires only if `window.gtag` exists.
- Google Search Console file: `/googlecd542bdb4b02289d.html`.

## Brand rules

- Brand line: Hotel Flooring, a Premrest business
- Phone: [1300 207 915](tel:1300207915)
- Australian English
- No NATA claims, invented certifications, awards, prices, project names, client names, testimonials or stats
- Do not call Melbourne the home city, mention Thomastown, or describe the staff/subcontractor org chart
- Do not use “attic stock”

## Pages and title tags

| URL | Title tag |
| --- | --- |
| `/` | Hotel Flooring Supply & Install \| Melbourne, Sydney, Brisbane |
| `/melbourne/` | Hotel Flooring Melbourne \| Carpet, LVT & Occupied Install |
| `/sydney/` | Hotel Flooring Sydney \| Guest Rooms, Corridors & Lobbies |
| `/brisbane/` | Hotel Flooring Brisbane \| Supply & Install for Trading Hotels |
| `/hotel-carpet/` | Hotel Carpet Supply & Installation \| Broadloom, Axminster & Tiles |
| `/hotel-corridor-carpet/` | Hotel Corridor Carpet \| Quiet, Durable Corridor Flooring |
| `/hotel-room-flooring/` | Hotel Room Flooring \| Guest Room Carpet & LVT |
| `/hotel-vinyl-flooring/` | Hotel Vinyl Flooring \| LVT, Sheet Vinyl & Wet Areas |
| `/hotel-refurbishment/` | Hotel Refurbishment Flooring \| Install Without Closing Floors |
| `/function-rooms/` | Hotel Function Room & Ballroom Flooring \| Carpet & LVT |
| `/wet-areas/` | Hotel Wet Area Flooring \| Slip-Resistant Vinyl & Pool Surrounds |
| `/motel-carpet/` | Motel Carpet Replacement \| Room-by-Room Without Closing |
| `/guides/` | Hotel Flooring Guides \| Spec, Staging & Wet Areas |
| `/guides/occupied-hotel-refurbishment/` | How to Replace Hotel Floors Without Closing the Property |
| `/guides/carpet-or-lvt-hotels/` | Hotel Carpet or LVT? A Practical Choice for Rooms and Corridors |
| `/guides/slip-resistance-wet-areas/` | Slip Resistance for Hotel Wet Areas and Pool Surrounds |
| `/contact/` | Request a Hotel Flooring Quote \| Melbourne, Sydney, Brisbane |
| `/privacy/` | Privacy Policy \| Hotel Flooring |
| `/404.html` | Page not found \| Hotel Flooring (noindex) |

`sitemap.xml` lists every indexable page above except the 404.

## Keyword map

| Target keyword (AU) | Primary page | Supporting pages |
| --- | --- | --- |
| hotel flooring | `/` | city pages, `/contact/` |
| hotel carpet | `/hotel-carpet/` | `/hotel-room-flooring/`, `/hotel-corridor-carpet/` |
| hotel carpet installation | `/hotel-carpet/` | `/hotel-refurbishment/` |
| hotel flooring Melbourne | `/melbourne/` | `/hotel-carpet/`, `/contact/` |
| hotel flooring Sydney | `/sydney/` | `/hotel-carpet/`, `/contact/` |
| hotel flooring Brisbane | `/brisbane/` | `/hotel-carpet/`, `/contact/` |
| hotel carpet Melbourne / Sydney / Brisbane | city pages | `/hotel-carpet/` |
| hotel corridor carpet | `/hotel-corridor-carpet/` | `/hotel-carpet/` |
| hotel room flooring | `/hotel-room-flooring/` | `/guides/carpet-or-lvt-hotels/` |
| hotel refurbishment flooring | `/hotel-refurbishment/` | `/guides/occupied-hotel-refurbishment/` |
| hospitality flooring | `/` | `/function-rooms/`, city pages |
| hotel vinyl flooring | `/hotel-vinyl-flooring/` | `/wet-areas/` |
| motel carpet replacement | `/motel-carpet/` | `/hotel-room-flooring/` |
| hotel function room / ballroom flooring | `/function-rooms/` | `/hotel-carpet/` |
| hotel wet area / pool flooring, slip resistance | `/wet-areas/` | `/guides/slip-resistance-wet-areas/` |

## Design

Typography, colour tokens, sheet layout, pill buttons, nav overlay and forest footer follow the sister site [comcorkflooring.com.au](https://comcorkflooring.com.au) (Newsreader + Inter Tight, charcoal / burnt orange / warm page / forest). Hotel interiors are licensed Unsplash/Pexels stock plus Premrest/Comcork hospitality photos — sources and licences in `assets/img/photos/SOURCES.md`. Stock is not captioned as a Premrest hotel project.

Sister links: [premrest.com.au](https://premrest.com.au), [premrestflooring.com.au](https://premrestflooring.com.au), [modularcarpet.com.au](https://modularcarpet.com.au), [comcorkflooring.com.au](https://comcorkflooring.com.au).
