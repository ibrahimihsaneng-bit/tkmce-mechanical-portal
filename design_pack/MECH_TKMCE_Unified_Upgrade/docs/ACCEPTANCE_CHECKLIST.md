# Acceptance checklist — run against actual repository

| Area | Pass condition |
|---|---|
| Navigation | Exactly one existing Focus Studio entry; no duplicated focus menu; mobile and desktop work; deep links restore correct subview. |
| Focus session | Custom/preset timer, pause/resume, refresh, sleep, break, finish, duplicate event prevention, paper mode, safe exit; no unrelated navigation in reader. |
| Protection | Web-only status honest; extension/native status reflects actual acknowledgements; rule expiry/restart/revocation and emergency access tested; unsupported features disabled with explanation. |
| Schedule | Timezone, recurrence, missed events, offline and permission loss handled. |
| History | Actual recorded durations, paused excluded, no overlapping double count, no fabricated screen time. |
| Pairing | Authenticated own-device consent, short-lived codes, revoke, offline expiry, failed connection visible. |
| Resource mapping | Verified dependent scheme/semester/course/module/topic choices; course-wide and lab options; invalid combination rejected server-side. |
| Upload | PDF/image/text/ZIP preview, actual MIME, file size, hash, path traversal, zip bomb, XSS/unsafe SVG, permission and interrupted upload tests. |
| Review | Duplicate checks, draft review, attribution, role checks, publish confirmation, immutable revision and rollback. |
| Student resource | Correct published academic location, real image display with attribution, equation rendering, search, direct focus launch and download where allowed. |
| Preservation | Original content inventory matches migrated routes; no broken links or silent deletion. |
| Accessibility | Keyboard, visible focus, labels, reduced motion, contrast, mobile widths 320/390/768/1440, no accidental overflow. |
| Performance | Record measured Lighthouse and web vitals; don't claim targets without results. |
| Deployment | Preview, build output, test logs, real device matrix, known limitations, rollback plan and owner approval. |

Record each item as PASS / FAIL / NOT RUN / NOT APPLICABLE with evidence. A design mockup is not evidence of a working backend, native restriction or production integration.
