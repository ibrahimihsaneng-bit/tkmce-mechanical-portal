# Resource Manager — interaction and data contract

## Primary flow
1. Destination: scheme, semester, verified course, module/experiment or course-wide, optional topic. Use dependent selects and display a human-readable breadcrumb. No automatic publish if matching is ambiguous.
2. Type: detailed notes, short notes, PYQ, model answers, formulas, numericals, diagram/reference, lab notes, video link or structured package.
3. Add files: drag-and-drop, file chooser, or authorised URL. Show allowed types, limits, filenames, sizes, upload progress. Support batch mapping and retry; preserve form state.
4. Review: show preview, suggested title (editable), source/licence, academic destination, duplicate/validation status. Advanced metadata (year, marks, exam type) conditional by type. If source unknown, save as draft; don't publish redistributed images without permissions.
5. Submit draft or publish when authorised. Show success only after server confirms publication; link to academic page. On error explain what to fix and preserve draft. Never silently overwrite.

## State model
Draft → staged upload → validated → awaiting review → approved → published → archived. Invalid or rejected items stay in draft with specific issues. Only server-authorised reviewers/admins can publish. Revisions are immutable. Publication atomically changes the active resource version; rollback points to previous valid version. Avoid stale indexes/caches. Public users see only published records.

## ZIP import
Use `resource-manifest.json` at archive root; paths relative to ZIP root, all payload under `files/`. Schema is in templates. A batch may contain multiple resources; present a row for each, destination and validation status. Verify SHA-256 checksums (required in production), ensure declared files exist and reject undeclared executable/unsafe payloads. Reject path traversal, absolute paths, symlinks, archive bombs, nested archives by default. Use server-side MIME detection and content sanitisation. Check max compressed/uncompressed size and file count before extraction; upload to staging, not public assets. No actual resource is supplied in the example manifest.

## Role model
Student: read published resources, local bookmarks. Contributor: create/edit own drafts, submit. Reviewer: review assigned submissions, request changes, approve. Admin: curriculum management, publication, revision rollback and permissions. Enforce roles on server, not merely hidden UI. Log resource change events with minimal private metadata. Apply content rights and moderation checks. Do not expose unreviewed files via public URLs.

## Friendly empty/error states
No module available: choose course-wide or contact admin if curriculum is missing. Unknown course: show catalogue search, do not invent. Duplicate: link existing record and offer authorised new revision. Unsupported file: specify allowed format and retain other files. Missing attribution: save draft and identify required fields. Upload interrupted: retry without reselecting destination. Publication failure: retain validated draft. All examples and previews must be clearly labelled until actual data is loaded.
