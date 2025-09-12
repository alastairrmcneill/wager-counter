## EPIC 0 – ✅ Done Project Bootstrap & DX

### Story 0.1 – ✅ Done Set Up Expo + TypeScript + Expo Router

**Description:**

Initialize the project with latest Expo SDK, enable TypeScript (strict mode), and configure Expo Router for file-based navigation.

**Acceptance Criteria:**

- App boots in dev on iOS and Android.
- `/` route renders a test screen.
- `tsconfig.json` uses `strict: true`.

---

### Story 0.3 – ✅ Done Define Brand Design System

**Description:**

Define base design tokens (colors, fonts) and styling approach using React Native StyleSheet.

**Acceptance Criteria:**

- Brand colors defined: gunmetal, mint, coral.
- System font stack configured.
- Design tokens accessible in components.

---

### Story 0.4 – ✅ Done Create Shared UI Primitives

**Description:**

Build base UI components using React Native styling with design system colors.

**Acceptance Criteria:**

- Components exist: `<Button>`, `<Chip>`, `<Card>`, `<ProgressBar>`.
- Accept styling overrides via props.
- Use system fonts and brand colors.
- Built with React Native StyleSheet.

---

## 🧠 EPIC 1 – ✅ Done Domain Model & Local Storage Foundation

### Story 1.1 – ✅ Done Define Domain Types and Helpers

**Description:**

Create types and utility functions for counters, spins, and currency conversions.

**Acceptance Criteria:**

- Types for `Counter`, `Spin` created.
- Utility functions: `toPence`, `fromPence`, `formatGBP`, `ceilDiv`.

---

### Story 1.2 – ✅ Done Zustand Store Setup with Slices

**Description:**

Use Zustand to manage app state and slice logic by feature.

**Acceptance Criteria:**

- Stores: `counterStore`, `spinStore`, `sessionStore`.
- Each store exposes get/set actions.

---

### Story 1.3 – ✅ Done MMKV Persistence and Hydration

**Description:**

Integrate MMKV for local storage and hydrate state on app start.

**Acceptance Criteria:**

- Counters and spins are saved/loaded from MMKV.
- Hydration completes under 150ms with 1000+ spins.

---

### Story 1.4 – ✅ Done Validate WageredPence Against Spin History

**Description:**

Verify that `wageredPence` equals the sum of all spins and auto-correct if mismatched.

**Acceptance Criteria:**

- Validation runs on load.
- Drift is logged and fixed in background.

---

## ⚙️ EPIC 2 – ✅ Done Core Counting Engine

### Story 2.1 – ✅ Done Implement Increment Logic

**Description:**

Add spin with current stake and update `wageredPence`. Debounce taps to avoid duplicates.

**Acceptance Criteria:**

- Spin saved with timestamp, stake, counterId.
- `wageredPence` updates correctly.
- Tap debounce ~120ms.
- Haptic feedback triggered.

---

### Story 2.2 – ✅ Done Implement Undo Logic

**Description:**

Allow user to undo the last spin for a counter. Unlimited depth.

**Acceptance Criteria:**

- Removes most recent spin.
- Recalculates `wageredPence`.
- Multiple undos allowed.

---

### Story 2.3 – ✅ Done Implement Stake Change (Future Spins Only)

**Description:**

Allow users to change the stake mid-session. Affects only new spins.

**Acceptance Criteria:**

- `currentStakePence` updates on change.
- Previous spins retain original stake.

---

## 📱 EPIC 3 – ✅ Done Counter Detail Screen

### Story 3.1 – ✅ Done Build Counter Screen Layout

**Description:**

Implement data zone with all display fields and layout per spec.

**Acceptance Criteria:**

- Shows name, `£wagered/£target`, progress bar.
- Shows overshoot if exceeded.
- Shows session stats: elapsed time, avg spins/min.

---

### Story 3.2 – ✅ Done Add Increment and Undo Buttons

**Description:**

Implement primary actions area with styled buttons and interactions.

**Acceptance Criteria:**

- Increment button shows `+£x.xx` (current stake).
- Undo button removes last spin.
- Buttons styled with correct size and radius.

---

### Story 3.3 – ✅ Done Implement Change Stake Panel

**Description:**

Create panel with quick chip options and a numeric input.

**Acceptance Criteria:**

- Chips: 0.10 / 0.20 / 0.40 / 0.60 / 1.00 / 2.00.
- Input: numeric, decimal (2dp), dot separator.
- Updates stake for next spin.

---

## 🧭 EPIC 4 – Onboarding Wizard

### Story 4.1 – ✅ Done Create Welcome Screen

**Description:**

First screen shown on fresh install with a “Continue” action.

**Acceptance Criteria:**

- Icon, app name, subtitle, testimonials and Continue button.
- Navigates to first step in wizard.

---

### Story 4.2 – ✅ Done Build 3-Step Wizard (Name → Target → Stake)

**Description:**

Allow users to configure their first counter in a guided flow.

**Acceptance Criteria:**

- Step 1: Name (prefilled with “Counter”).
- Step 2: Target input (GBP, 2dp, >0).
- Step 3: Stake input (GBP, 2dp, >0).
- “Spins needed” calculated live.
- After create → navigates to Counter screen.

---

### Story 4.4 – Complete onboarding

**Description:**

Only after user has successfully created their first counter will the onbaording be complete. On subsequenet app opens if the onboarding hasn't been completed the start again, if the onboarding has been completed then lets go straight to the counter screen

**Acceptance Criteria:**

- Onboarding marked as completed after counter created
- Opening app before onboarding has been completed takes you to welcome page
- Opening app after onboarding has been completed takes you to counter screen

---

## 🏠 EPIC 5 – Home Screen & Subsequent Counter Creation

---

### Story 5.1 – Build Home Screen with Counter List

**Description:**

Show a scrollable vertical list of all existing counters with basic progress info.

**Acceptance Criteria:**

- List shows: name, `£wagered / £target`, progress bar.
- Virtualized list supports 100+ counters.
- Empty state prompts user to create a counter.

---

### Story 5.2 – Single-Screen Counter Creator

**Description:**

Allow users to create new counters after onboarding.

**Acceptance Criteria:**

- Inputs: Name, Target (GBP), Stake (GBP).
- Validation: all > 0, 2dp, numeric keypad.
- Optional live “Spins needed” calculation.
- On create → navigates to Counter screen.

---

### Story 5.3 – List Item Navigation to Counter Detail

**Description:**

Allow tapping on a counter in the list to open its detail screen.

**Acceptance Criteria:**

- Tapping item opens corresponding counter screen.
- Screen shows correct data for selected counter.

---

### Story 5.4 – Trigger Paywall After Each Counter Creation

**Description:**

Show the paywall after a new counter is created.

**Acceptance Criteria:**

- After create, paywall shows.
- If under limit (<=2), show upsell with “Continue free”.
- If over limit (>2), block until purchase or restore.

---

## ✅ EPIC 6 – Completion UX

---

### Story 6.1 – Show Completed Dialog on Target Reached

**Description:**

Display summary dialog when a counter hits or exceeds its target.

**Acceptance Criteria:**

- Shows “Target reached” message.
- Includes total spins, elapsed time, avg spins/min.
- “OK” dismisses the dialog.
- Counter remains active (not archived).

---

## 💰 EPIC 7 – Monetization & RevenueCat Integration

---

### Story 7.1 – Integrate RevenueCat SDK

**Description:**

Add RevenueCat with lifetime unlock and 3-day trial.

**Acceptance Criteria:**

- SDK is installed and configured.
- Products fetched on app start.
- Entitlement: `pro_lifetime` respected

---

### Story 7.2 – Build Paywall Screen

**Description:**

Design paywall with upsell messaging and purchase options.

**Acceptance Criteria:**

- Shows benefits of Pro.
- Buttons: Purchase, Restore, Continue Free (only when <=2 counters).
- Responsive layout for small devices.

---

### Story 7.3 – Purchase and Restore Flow

**Description:**

Enable purchasing and restoring of `pro_lifetime`.

**Acceptance Criteria:**

- Purchase succeeds and unlocks entitlement.
- Restore button reinstates access if previously purchased.

---

### Story 7.4 – Gate Exports Behind Entitlement

**Description:**

Restrict CSV/PDF export to Pro users.

**Acceptance Criteria:**

- Export buttons disabled or hidden for free users.
- Entitlement check used before allowing export.

---

## 📤 EPIC 8 – Exports (CSV & PDF)

---

### Story 8.1 – Export Counters as CSV (All)

**Description:**

Allow Pro users to export all counters as a CSV file.

**Acceptance Criteria:**

- CSV columns: `id,name,target,totalWagered,progress%,createdAt,updatedAt`.
- Uses `expo-file-system` and `expo-sharing` to save/share.
- Fires `export_csv`.

---

### Story 8.2 – Export Spins as CSV (Per Counter)

**Description:**

Allow Pro users to export spins for a single counter.

**Acceptance Criteria:**

- CSV columns: `spinId,timestamp ISO,stake,cumulativeWagered`.
- Filename includes counter name or ID.
- Fires `export_csv`.

---

### Story 8.3 – Export PDF Summary (Per Counter)

**Description:**

Generate a branded PDF report for a single counter.

**Acceptance Criteria:**

- Header: name, created date, target, total wagered, progress %, overshoot.
- Stats: total spins, elapsed time, avg/min.
- Mini history table: first + last N spins with counts.
- Styled brand header and progress bar.
- Fires `export_pdf`.

---

## 📊 EPIC 9 – Analytics & Instrumentation

---

### Story 9.1 – Analytics Client with Swappable Backends

**Description:**

Create an abstraction layer over analytics providers.

**Acceptance Criteria:**

- Unified `trackEvent(name, payload)` function.

---

### Story 9.2 – Connect Analytics Client to Mixpanel

**Description:**

Connect the analytics client created before to mixpanel, while keeping the project token out of the github repo

**Acceptance Criteria:**

- Analytics client logs events to mixpanel
- Mixpanel project token is not in source control

---

### Story 9.3 – Emit Core Events

**Description:**

Track key app interactions as defined in the spec.

**Acceptance Criteria:**

- Events emitted:
  - `onboarding_start/page1/page2/page3/complete`
  - `counter_create`
  - `paywall_view`
  - `purchase_start/success/fail`
  - `increment_tap`
  - `undo_tap`
  - `stake_change`
  - `export_csv`
  - `export_pdf`

---

### Story 9.4 – Add Context to Analytics Payloads

**Description:**

Include useful metadata in all events.

**Acceptance Criteria:**

- Fields: platform, appVersion, isPro, counterId (when relevant), stakePence, targetPence, timeSinceStart (when applicable).

---

## 🎨 EPIC 10 – Brand, Theming, Haptics & Polish

---

### Story 10.1 – Apply Final Brand Colors and Fonts

**Description:**

Apply the 60/30/10 Calm Mint palette and system fonts across the app.

**Acceptance Criteria:**

- Gunmetal/Mint/Coral applied correctly via Tailwind config.
- Text uses system fonts (SF / Roboto).
- Screens meet basic WCAG contrast.

---

### Story 10.2 – Add App Icon, Splash Screen & Logo

**Description:**

Implement branding assets across platforms.

**Acceptance Criteria:**

- Logo: Counter Ring style.
- App icon and splash screen use brand palette.
- Assets load correctly on iOS and Android.

---

### Story 10.3 – Haptics on Increment and Undo

**Description:**

Add subtle vibration feedback to key user actions.

**Acceptance Criteria:**

- Light impact on `increment` and `undo` using `expo-haptics`.
- Controlled by feature flag.

---

### Story 10.4 – Polish Buttons and Progress Styles

**Description:**

Ensure key components reflect final UI polish.

**Acceptance Criteria:**

- Buttons: correct radius, padding, sizing.
- Progress bar: rounded ends, mint fill.
- Dynamic type support verified.

---

## 📈 EPIC 11 – User analytics

---

### Story 10.1 – Setup app to use mixpanel for user analytics

**Description:**

Connect app to mixpanel project

**Acceptance Criteria:**

- App can send events to mixpanel
- Project token is not stored in git repo

---

### Story 10.2 – Create analytics service

**Description:**

Implement a scalable service for handling analytics that allows for user defined events and injects some custom properties to every event.

**Acceptance Criteria:**

- Service that can be used across the app for logging events.
- Inject user uuid into each event

---

### Story 10.3 – Add analytics logging thorughout the app

**Description:**

Add events to the onboarding flow to track progress and completion, to the home screen for when a user creates a new counter, in the counter to track spins and undos and spin value changes.

**Acceptance Criteria:**

- Events logged throughout the app

---
