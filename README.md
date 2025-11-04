# Karnataka MP Directory

## Version: 1.0 (Consolidated)  
**Date:** November 4, 2025  
**Product Owner:** [Your Name/Team Name]  
**Product Goal:** To provide citizens with an easily accessible, accurate, and concise repository of information about their current Members of Parliament (MPs) representing Karnataka in both Lok Sabha and Rajya Sabha, thereby enhancing political transparency.

---

## 1. Goals and Objectives

### Primary Goal
Enhance political transparency and citizen engagement by creating a single, reliable source for current Karnataka MP data.

### Key Objectives
- Achieve a high level of data accuracy for all listed MPs (99.5%+).
- Ensure the website is intuitive and easy to navigate for users of all technical skill levels.
- Provide concise, scannable profiles that clearly communicate an MP's background, work, and performance.
- Maintain mobile-first responsiveness to ensure accessibility on all devices.

---

## 2. Target Audience

- **General Public/Voters:** Seeking to know their representative, background, and performance.
- **Students/Researchers:** Needing reliable, consolidated data for academic or research purposes.
- **Journalists/Media:** Requiring quick, verified facts and profiles.
- **Political Activists/NGOs:** Monitoring public representatives' activities.

---

## 3. Functional Requirements (What the product must do)

### 3.1 MP Directory Page (Home/Listing View)

| ID       | Requirement       | Description                                                                 |
|----------|-------------------|-----------------------------------------------------------------------------|
| **FR 3.1.1** | MP Directory Display | Display a clear, sortable, and filterable list of all current Lok Sabha (28) and Rajya Sabha (12) MPs from Karnataka. |
| **FR 3.1.2** | Core MP Info      | Each entry must concisely display the MP's Name, Constituency (LS) / State Represented (RS), Political Party, and a professional photograph. |
| **FR 3.1.3** | Filtering         | Users must be able to filter the list by: Lok Sabha/Rajya Sabha, Political Party, and Region/District. |
| **FR 3.1.4** | Sorting           | Users must be able to sort the list by Name (A-Z) and Constituency Name. |
| **FR 3.1.5** | Search            | A prominent search bar must allow searching by MP Name, Constituency Name, and Political Party. |

### 3.2 Detailed MP Profile Page (UX Defined)

| ID       | Requirement       | Description                                                                 |
|----------|-------------------|-----------------------------------------------------------------------------|
| **FR 3.2.1** | Identity Block    | Display large Photo, Full Name, Role/Party/Constituency, and a row of Official Social Media/Web Links (Twitter/X, Facebook, Parliament Profile). |
| **FR 3.2.2** | Performance Dashboard | A highly visible, metrics-driven block showing key performance indicators: Attendance %, Questions Raised, Debates Participated, and MPLADS Utilisation Status. |
| **FR 3.2.3** | Personal Details  | Concise display of Date/Place of Birth, Highest Education, and Primary Profession. |
| **FR 3.2.4** | Political Journey | A short, bulleted list of previous key political roles (e.g., MLA, Minister) and current Parliamentary Committees served on. |
| **FR 3.2.5** | Constituency Info | Official Constituency Office Address, Official Email ID, and Official Contact Number. |
| **FR 3.2.6** | Data Source       | A mandatory footnote linking to the Official Data Source (e.g., Digital Sansad) and the Last Updated timestamp. |

---

## 4. Non-Functional Requirements (How the product must perform)

| ID       | Requirement       | Description                                                                 |
|----------|-------------------|-----------------------------------------------------------------------------|
| **NFR 4.1** | Data Accuracy     | All data must be sourced from official government/parliamentary records. Data accuracy must be reviewed and verified quarterly. |
| **NFR 4.2** | Performance       | Page load time must be under 3 seconds (Time to Interactive) across all major devices. |
| **NFR 4.3** | Security          | Mandatory use of HTTPS and adherence to basic web security standards (e.g., prevention of SQL injection). |
| **NFR 4.4** | UX/Design         | Design must be clean, modern, and strictly non-partisan. Use of a simple, accessible colour palette. |
| **NFR 4.5** | Responsiveness    | Site must be fully mobile-first and responsive, adapting seamlessly to screen sizes from 320px up. |
| **NFR 4.6** | Accessibility     | Conformity to at least WCAG 2.1 Level AA standards (e.g., proper alt-text, contrast ratios, keyboard navigation). |

---

## 5. Technical Requirements

| ID       | Requirement       | Description                                                                 |
|----------|-------------------|-----------------------------------------------------------------------------|
| **TR 5.1** | Development Stack | Recommended: Modern front-end framework (React/Vue) and a lightweight, secure back-end (Node.js/Django) for speed. |
| **TR 5.2** | Database          | Scalable database (PostgreSQL/MongoDB) capable of handling structured MP data and performance metrics. |
| **TR 5.3** | Admin Panel       | A simple, password-protected Admin Portal must allow non-technical staff to Create, Read, Update, and Delete (CRUD) MP profiles and update performance metrics. |
| **TR 5.4** | Data Update Process | Implement a routine cron job or manual trigger for quarterly performance data updates. |

---

## 6. Success Metrics

| Metric Category | Metric                                | Target |
|-----------------|---------------------------------------|--------|
| **Usage**       | Average Monthly Unique Visitors       | 5,000+ within 6 months. |
| **Engagement**  | Average Time Spent on MP Profile Page | > 1 minute. |
| **Quality**     | Zero Reported Data Errors            | Zero within the first 3 months post-launch. |
| **Functionality** | Search/Filter Usage Rate           | > 50% of users interacting with the directory. |
| **Technical**   | Site Uptime                          | 99.9% uptime per month. |

