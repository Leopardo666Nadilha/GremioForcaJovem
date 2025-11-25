# 🦉 Força Jovem - Student Council Website

A modern, high-performance web platform developed for the **Força Jovem** Student Council at *EEB Alinor Vieira Corte*. 

This project was designed to bridge the gap between students and the student council, providing a digital hub for news, events, anonymous feedback, and membership applications. It features a **Cyberpunk/Neon aesthetic** with a mobile-first approach, fully responsive for desktop environments.

## ✨ Key Features

- **📰 Dynamic News Feed:** Real-time news updates fetched directly from a Google Sheet (used as a Headless CMS).
- **📅 Event Agenda:** An interactive calendar where event types are automatically color-coded using a custom hashing algorithm to ensure visual variety without collisions.
- **📣 Anonymous Ombudsman (Ouvidoria):** A secure channel for students to send suggestions or complaints anonymously.
  - **Security:** Implemented **Honeypot protection** to filter out spam bots without degrading user experience with captchas.
- **🤝 Membership Application:** A streamlined form for students interested in joining the council.
- **🎨 Modern UI/UX:** - Glassmorphism effects and Neon borders.
  - Smooth transitions and responsive layouts (Grid/Flexbox).
  - Adaptive Header and Navigation (Bottom Nav for Mobile, Centered Links for Desktop).

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) (App Router & Server Actions)
- **Styling:** CSS Modules (Scoped CSS for modularity)
- **CMS / Database:** Google Sheets API (via `google-spreadsheet`)
- **Authentication:** Service Account (JWT) for secure server-side API communication
- **Deployment:** Vercel

## 🧠 Technical Highlights

### Google Sheets as a Headless CMS
To keep maintenance costs zero and allow non-technical students to update the site, I integrated the **Google Sheets API**.
- The council updates a spreadsheet row (Title, Date, Content).
- Next.js fetches this data at build time (or on-demand via ISR) and renders the UI.

### Anti-Bot "Honeypot" Strategy
Instead of using intrusive CAPTCHAs, I implemented a logical trap (Honeypot) in the server actions. A hidden input field (`nometruque`) is rendered:
- **Humans** don't see it (hidden via CSS).
- **Bots** see it in the HTML and fill it out.
- **Server Logic:** If the field is filled, the request is silently rejected.

### Color Hashing Algorithm
For the Agenda section, event tags ("Exam", "Party", "Meeting") receive consistent colors automatically. I used a **DJB2-like hashing algorithm** to generate a unique index based on the string characters, ensuring that "Exam" always appears in the same color without manual configuration.
