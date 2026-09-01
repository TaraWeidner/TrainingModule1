# Centralized Tracking Roadmap

The current app intentionally stores learner progress in `localStorage`. That makes the first version easy to test and safe to host as a static site, but it is **not** a centralized LMS.

## What the current build records

For each learner profile on a browser, the app records:

- Employee name
- Optional employee ID / initials
- Role
- Lessons completed
- Knowledge-check status
- Role-scenario status
- Assessment attempts
- Best assessment score
- Pass/fail status
- Attestation timestamp
- Completion timestamp
- Course version
- Last activity timestamp

A learner record can be exported to CSV.

## Recommended production model

For a small clinic, a lightweight hosted database is enough. A full commercial LMS is not required unless you want SCORM, large-scale reporting, SSO, or HRIS integrations.

Recommended architecture:

1. **Static training front end** — this repository / GitHub Pages.
2. **Authentication** — employee email magic link or Microsoft/Google sign-in.
3. **Database** — Supabase/Postgres, Firebase, or Microsoft Lists/Dataverse.
4. **Role-based access** — learners see their own records; management sees reports and competency sign-offs.
5. **Audit trail** — never overwrite attempts or completion events; record each event with timestamp and course version.

## Suggested database tables

### employees

- id
- employee_number
- full_name
- email
- role
- active
- hire_date
- created_at

### courses

- id
- module_number
- title
- version
- passing_score
- published_at
- renewal_interval_months
- active

### enrollments

- id
- employee_id
- course_id
- assigned_at
- due_at
- status
- completed_at
- expires_at

### lesson_progress

- id
- enrollment_id
- lesson_id
- completed_at
- course_version

### assessment_attempts

- id
- enrollment_id
- score
- passed
- started_at
- submitted_at
- course_version

### attestations

- id
- enrollment_id
- attestation_text_version
- attested_at
- employee_name_snapshot

### competencies

- id
- enrollment_id
- competency_code
- status
- observed_at
- supervisor_id
- supervisor_note

## Manager dashboard goals

A production dashboard should show:

- Not started / in progress / complete / overdue
- Current score and attempt count
- Course expiration / renewal date
- Required hands-on competencies still pending
- Employee training transcript
- Exportable audit report by employee or course
- Course-version history

## Privacy and security

Do **not** store employee training records in the public GitHub repository. GitHub Pages should contain only the training application and curriculum. Employee records belong in an authenticated database or approved business system.

The app should never store patient PHI. Training scenarios should remain fictional and de-identified.

## Next implementation step

Once the learner experience is approved, replace the local storage functions in `app.js` with a tracking adapter that reads/writes to the selected backend. The course content and UI can remain substantially unchanged.
