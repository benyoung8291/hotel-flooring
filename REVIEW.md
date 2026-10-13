# Hotel Flooring design, imagery and SEO review

Reviewed 13 October 2026 against `main` commit `170de76c49c8c152a831ba32ff7720795b2cc09e`.

## Findings and changes

| Area | Finding | Change |
| --- | --- | --- |
| Photography | Corridor cards showed a bedroom; function-room images showed flowers; the carpet page showed a timber-floor suite. | Selected Airlay hotel guest-room, apartment, corridor and conference-room photographs and Forbo safety-vinyl photographs. Retained the licensed stock corridor hero where its landscape composition works better. |
| Photo accuracy | A resort pool was described as a lobby; a finished interior was described as installation in progress. | Corrected alt text and gallery captions. Manufacturer examples are attributed and distinguished from Premrest work. |
| Responsive images | Small cards loaded large photos without responsive candidates. | Added optimised WebP derivatives and `srcset`/`sizes` for new manufacturer assets; preserved lazy loading below the fold. |
| Mobile form | The contact panel lost its horizontal padding, and reserved error space made the form unnecessarily tall. | Restored panel gutters, removed empty error gaps, marked required fields, and linked the privacy policy. |
| Contact journey | Visitors had to pass a large unrelated pool image and information panels before reaching the form. | Removed the contact-page photo, moved the enquiry form immediately after the introductory hero, and linked the hero button to the form. |
| City field | Generic pages silently defaulted to Melbourne. | Added an explicit selected placeholder; city landing pages retain their intentional city selection. |
| Phone field | The validator rejected ordinary punctuation such as `(03) 9123-4567`. | Accept formatted phone numbers with 8–15 digits and sensible phone characters. |
| Form reliability | No request timeout; non-JSON HTTP errors could expose a parsing error. | Added timeout, readable HTTP failure handling, retry controls, and preserved entered details after failures. |
| Form accessibility | Error messages were not programmatically associated with inputs. | Added error IDs and `aria-describedby`; native required-field validation remains available without JavaScript. |
| Menu | Focus could escape the modal; closing did not restore focus; short screens could make navigation difficult to scroll. | Inert background, keyboard focus trap, Escape/close focus restoration, and a scrollable flex child. |
| Slideshow | Continuous automatic rotation, tiny dots and incomplete tab semantics. | Pause/play control, 44px-high controls, labelled button-group semantics, inactive slide hiding, pause on user interaction, background-tab pause and reduced-motion handling. |
| Navigation | Every desktop service link was behind the menu. | Added direct carpet, vinyl and refurbishment links at desktop widths. |
| FAQ | Expandable rows lacked a visible expansion affordance. | Added clear plus/minus indicators and comfortable tap targets. |
| SEO copy | Most descriptions were unnecessarily long; some service headlines obscured the primary search term. | Rewrote page-specific descriptions and service H1s; retained city keyword targeting and Australian English. |
| Content depth | Product choice lacked practical supporting criteria. | Added carpet specification guidance and a clear LVT-versus-safety-vinyl explanation, with manufacturer references and relevant internal links. |
| Structured data | Sister brands were represented as equivalent `sameAs` identities. | Removed the identity conflation; retained the parent organisation. Added logo, sales contact, WebSite and WebPage/ContactPage entities and language declarations. Existing guide Article and breadcrumb data are preserved. |
| Crawling | The sitemap already matched the canonical page set. | Retained the sitemap and robots configuration; added factual modification dates for the edited pages. |
| Caching | A one-year immutable policy was applied to filenames that are edited in place. | Changed asset caching to one day with revalidation and versioned CSS/JS references to avoid stale designs on rollout. |

## Image publication prerequisite

See [photo sources](assets/img/photos/SOURCES.md) for original manufacturer URLs and local filenames. These images were selected at the owner's request; public access and attribution do not establish a commercial reuse licence. Confirm existing supplier/photographer permission before merging and deploying the manufacturer photographs. This review is prepared on a separate branch for review, not published to the production site. Existing stock assets remain available for fallback.

## Verification

- The live production sitemap’s 18 URLs all returned HTTP 200 during the baseline crawl.
- All 19 designed HTML pages checked for unique titles, one H1, unique IDs, internal links, image attributes and parseable JSON-LD. Search Console verification file preserved.
- All 18 indexable pages checked in Chromium at widths of 320, 390, 768 and 1440px: no horizontal overflow, no JavaScript runtime errors and every image loaded. Screenshots inspected for the homepage, service cards and mobile enquiry layout.
- Canonical URLs match all 18 sitemap entries. FAQ structured-data questions match the visible questions.
- Keyboard menu opening, repeated Tab navigation, Escape, focus restoration and reduced-motion/manual slideshow controls checked.
- Required-field validation, explicit city choice, punctuated phone number, HTTP failure/retry, preserved message and successful thank-you rendering checked in a browser. Formspree requests intercepted: no test enquiry was sent to the business. Actual Formspree delivery and inbox receipt remain unverified.
- `node --check assets/js/site.js` and `git diff --check` passed.
- Browser checks are local, against the review branch. Production still reflects `main` until the PR is merged/deployed. This is not a measured Core Web Vitals improvement or a Lighthouse performance score.

## SEO priorities after deployment

The site has a sound static foundation: crawlable HTML, dedicated service/city URLs, a sitemap, canonical tags, mobile layouts, internal links, analytics and a Search Console verification file. These changes improve that foundation; they cannot guarantee first-page placement. Rankings depend on the query, location, competing pages, authority and Google's assessment.

1. **Confirm indexing in Google Search Console.** Check the domain property, submit `https://hotelflooring.com.au/sitemap.xml`, and inspect the homepage, three city pages, carpet page and refurbishment page. A verification file in GitHub does not prove the property is verified or indexed.
2. **Measure the right terms and enquiries.** Track Australian non-brand searches for hotel flooring, hotel carpet, hotel corridor carpet, hotel vinyl flooring and occupied hotel refurbishment, plus Melbourne/Sydney/Brisbane variants. Record impressions, clicks, CTR, average position and GA4 `generate_lead` conversions by landing page. First-page visibility for one phrase is not evidence for every target.
3. **Add real project evidence.** Obtain approved photographs and write genuine hotel installation case studies covering location, material, staging constraints and the outcome. Use verified details; do not invent customers, testimonials, certifications, prices or performance statistics. Manufacturer inspiration supports product understanding but does not prove Premrest's installation experience.
4. **Strengthen local relevance.** Add truthful city-specific service information, project evidence and operating details. Keep Google Business Profile and reputable directory records accurate for eligible real business locations; do not invent city offices or publish fake addresses. Keep sister-brand relationships explicit and consistent.
5. **Earn relevant links.** Request legitimate supplier/partner references and relevant trade or hospitality directory listings. Avoid bought links and repetitive city doorway pages. Manufacturer outbound links alone do not establish authority.
6. **Measure real performance.** Run PageSpeed Insights after deployment, then use Search Console's Core Web Vitals report when sufficient field data exists. Review image sizing, font loading and third-party analytics against observed LCP, INP and CLS; do not infer a score from source changes.
7. **Review actual search results.** Use Search Console data to refine titles, descriptions and missing content. Keep each target query mapped to its most relevant service or city page and expand genuinely useful specification/maintenance advice.

## Explicit limits

No rank tracking, competitor ranking analysis, Search Console account data, GA4 reporting data or independently verified project portfolio was available in this review. No first-page claim, fabricated review schema or unsupported local-business address has been added. Form delivery was simulated for safe testing and must be checked through an authorised business enquiry before claiming end-to-end inbox delivery.
