# Repair, October 13, 2026

RN confirmed on October 13, 2026 that the Ask a Neuroscientist (AaN) brand owns this atlas and asked for the live site and repo to be fixed. Claude made these changes. Everything removed is still in git history.

## 1. Dose and interaction data removed from the served page

The site said its dose and interaction tools had been withdrawn, but the page still carried that data and still showed it. Each substance window had a "Dose Response" panel with dose ranges and a "Drug Interactions" panel with specific combinations.

- Removed the `doseResponse` data from all ten substances and the panel that displayed it.
- Removed the dose calculator code (`DOSE_DATA`, `renderDoseCalculator`, `calcDose`), which could compute a dose from body weight.
- Replaced each substance's interaction list with short, plain safety text with no numbers, ending: "Education, not medical advice. Talk with a clinician or pharmacist before combining any medicine or substance, and contact poison control or emergency services if someone is unwell." The panel is now called "Safety note".
- Removed dose amounts from page text, citations, the glossary (half-life, flood dose, microdosing), the timeline (Bicycle Day), the brain-activity chart labels and the cross-tolerance note. Trial descriptions now name dose arms ("highest dose arm", "very-low-dose control") rather than amounts.
- Judgment call for RN: onset and duration times are still shown in the substance profiles and the comparison table. They are not dose amounts, but RN may want them removed too.

## 2. Terence McKenna

The Key Researchers card said "Timothy McKenna". It now says Terence McKenna. The card also credited "Terence McKenna" as his own co-author; the 1976 cultivation guide was co-written with his brother Dennis McKenna, and the card now says so.

## 3. Psilocybin versus escitalopram

The essay (The Clinical Paradox) said psilocybin was "non-inferior to escitalopram across all secondary outcome measures, and superior on several". The trial (Carhart-Harris et al. 2021, NEJM; PubMed 33852780) found no significant difference on its primary outcome (P = 0.17), was not a non-inferiority trial, and reported secondary outcomes without correction for multiple comparisons. The essay paragraph and the citation's key finding now say this, matching register entry EA-SCI-002, which was already correct and is now marked re-verified on October 13, 2026.

## 4. Citations

- Timmermann et al. 2019 was listed as a PET study about receptor occupancy and opioid receptors. It was an EEG study (Scientific Reports 9:16324). Corrected, and the paper was added to the citation library.
- Hoffmann 2001: the exact alpha and theta percentages could not be checked and were removed.
- The Science Pipeline table listed ten trial registry numbers; none matched the trial described. The table now lists nine trials checked on ClinicalTrials.gov.
- Five quotes attributed to real researchers could not be found in any source and were removed.
- Other corrections: Zarate 2006 timing, Addy 2012, Feduccia 2019 (relies on the retracted pooled data), Slotkin (1952, not 1956), the MDMA phase 3 figures (90 participants, not 104), and the 2021 microdosing study (self-blinding, not the first LSD microdosing trial).
- Full log with counts: CITATIONS-Oct13.md.

## 5. AaN rules

- "Education, not medical advice." added to the home notice, the footer (every view of the single-page site), each substance window and the governance page.
- No dose amounts remain on the served pages or in the page code.
- Product and brand names removed from drug topics (an esketamine nasal spray brand, the LSD trade name, a psilocybin product code, stock tickers). Company and research-organization names such as Sandoz, MAPS and Usona are kept where they are history or research sponsors; RN may want to review these.
- All em and en dashes reworded (index.html, governance.html, evidence-register.json, README.md). Ranges now read "3780 to 3660"; page ranges in citations use a hyphen.
- One exclamation point (an album title) reworded.

## Checks run

- Inline scripts pass `node --check`; the page was rendered in jsdom and the substance window, Science Pipeline, Key Researchers and Brain Science views were opened. The substance window no longer shows dose or interaction lists (the previous version did).
- Searched the served files for dose patterns, brand names, "non-inferior", "Timothy McKenna" and dashes after the changes.

## Not done, for RN

- The DMN percentage chart on the Brain Science page and the survey figures on the home page have no checked source.
- Several substance profile lines read as unsupported claims (for example "efficacy unmatched by any approved treatment" was rewritten, but others such as the endogenous-analog lines were not reviewed one by one).
- The repo is public, so the removed dose data remains readable in git history until the repo is made private.

## 6. Onset and duration times removed (October 14, 2026)

RN decided on October 14, 2026 that the site must not show onset or duration times for any substance, because next to each substance they read like instructions for use. Claude made these changes. The removed text is still in git history.

- Removed the `onset` and `duration` fields from all ten substance records.
- Removed the Onset and Duration rows from each substance window, from the comparison matrix and from the PDF export view.
- Removed the DURATION and ONSET columns from the static comparison table.
- Reworded text that gave effect timings so the science stays without the times: mescaline "explains its unusually long effects"; noribogaine's "long half-life" explains prolonged effects; DMT and salvinorin A are "rapidly metabolized" (the "< 1 min" figures are gone); the DMT and salvia abstracts call the experience brief; the Transiency dimension no longer lists hours per substance; the ketamine abstract says "a rapid antidepressant effect"; the phenomenology comparator's "Duration Curve" row now describes the shape of the arc with no hours or minutes.
- Kept: the radar chart's relative "Duration" axis and its legend ("Duration=experience length"), which show no times; the glossary entries that name onset and duration as concepts; "short duration" in the salvia sovereignty note. The ceremony card field `c.duration` is the length of a ceremony, not a drug effect, and the ceremony list is currently empty, so nothing renders from it.
- Judgment call for RN: citation findings that report trial measurement times are kept, for example ketamine response "at 24 hours", "within 72 hours" and "improvement began within 2 hours", and synaptogenesis "within 24 hours" (Abdallah 2017). These are study results, not effect lengths, but RN may want them reworded too.
- Checks: inline scripts pass `node --check`; the page was rendered in jsdom with every substance window and the matrix opened, with no JavaScript errors and no onset or duration times in visible text.
