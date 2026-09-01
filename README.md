# Inclusive Health Training — Module 1

Interactive compliance and legal-foundations training for Inclusive Health.

This repository is a lightweight browser-based training application designed to grow into a small internal learning-management system without requiring a commercial LMS.

## Current release

### Module 1.1 — HIPAA, WA Privacy, 42 CFR Part 2 & Minor Privacy

The first working course includes:

- Learner profile with role selection
- Role-based course content
- Seven core lessons
- Knowledge checks with immediate feedback
- Role-specific scenario practice for Reception, MA/Clinical Support, Provider, and Management
- 10-question final assessment
- 80% passing requirement
- Retake and attempt history
- Required attestation
- Completion certificate
- Browser-local progress/resume
- CSV training-record export
- Course version and regulatory review date
- Mobile-responsive and keyboard-friendly interface

The final assessment is locked until the core lessons and role practice are completed. Completion/attestation requires a passing assessment.

## Module 1 curriculum scaffold

The dashboard also includes placeholders for:

- 1.2 OSHA & HazMat
- 1.3 Infection Control
- 1.4 Workplace Violence Prevention
- 1.5 Fraud, Waste & Abuse
- 1.6 Mandatory Reporting
- 1.7 OSHA Bloodborne Pathogens
- 1.8 Emergency Action Plan & Fire Safety
- 1.9 CLIA Waived Testing
- 1.10 Cybersecurity Awareness & Data Security
- 1.11 Risk Management & Incident Reporting

The source curriculum for these modules can be converted into the same interactive structure as Module 1.1.

## Run locally

No build step or package manager is required.

1. Download/clone the repository.
2. Open `index.html` in a modern browser.
3. Set a learner profile and start Module 1.1.

For the most reliable local behavior, serve the folder with any simple static web server.

## Publish with GitHub Pages

This project is intentionally static so it can be hosted directly from GitHub Pages.

In the repository:

1. Open **Settings → Pages**.
2. Under **Build and deployment**, choose **Deploy from a branch**.
3. Select the repository's active/default branch and `/ (root)`.
4. Save.

GitHub will provide the published Pages URL after deployment.

## Tracking model

The current release stores learner records in browser `localStorage`. That is suitable for testing the course experience but is not centralized employee tracking.

Learners can export a CSV training record. For production use, employee records should be moved to an authenticated database or approved business platform; they should **not** be committed to this public repository.

See [`docs/CENTRAL_TRACKING.md`](docs/CENTRAL_TRACKING.md) for the recommended production schema and manager-dashboard roadmap.

## Regulatory review

The source material contained several statements that needed updating for September 2026, including 42 CFR Part 2, HIPAA breach timing/risk assessment, Washington My Health My Data framing, and Washington minor STI consent age.

See [`docs/REGULATORY_NOTES.md`](docs/REGULATORY_NOTES.md) for the documented review notes and official sources.

> **Training status:** Draft curriculum. Before treating a release as formal required compliance training, Inclusive Health should approve clinic-specific policies/workflows and periodically review content against current HHS, OSHA, Washington DOH/L&I, and RCW requirements.

## Project files

- `index.html` — application shell and dashboard
- `styles.css` — responsive visual system
- `content.js` — course catalog, lessons, scenarios, quiz, and regulatory references
- `app.js` — learner state, progress, quizzes, completion, certificates, and CSV export
- `course-guards.js` — prerequisite enforcement for assessment and attestation
- `docs/REGULATORY_NOTES.md` — change-control notes for compliance content
- `docs/CENTRAL_TRACKING.md` — centralized LMS/database roadmap
