# Cyber Scan Dashboard 🛡️

Hey there! 👋 Welcome to my Cybersecurity Scan Dashboard built with React and Vite. I built this to solve a common problem I've faced: making security scan data feel approachable and easy to digest right out of the box, without needing weeks of setup.

## 🚀 What's inside

I wanted to ensure everything feels extremely responsive and clean, so I paired React with TailwindCSS for the UI footprint. Here's a quick rundown of the stack:

- **React + Vite:** Super fast setup and hot module reloading.
- **TailwindCSS:** For slick, scalable, and fully responsive styling.
- **Lucide Icons:** To give it that premium, enterprise-level aesthetic.
- **Micro-Animations:** Heavy focus on UX with custom staggering animations and active-state styles (because details matter).

## 🛠️ Getting Started

I made sure getting this running locally is as painless as possible.

1.  **Clone the repo** (if you haven't already 😉).
2.  **Install dependencies:** I usually just run `npm install`, but `yarn` or `pnpm` work great here too.
3.  **Spin up the dev server:** `npm run dev`
4.  Hit `http://localhost:5173` and start exploring the UI.

## 🤝 Need some context?

If you jump into the `src/screens` directory, you'll see a few core views:
*   `LoginPage.jsx`: Basic barrier/auth intro view with slick animations.
*   `DashboardPage.jsx`: The main hub displaying scan progress, severity overviews, and targets.
*   `ScanDetailPage.jsx`: A drill-down view monitoring live terminal outputs and step-by-step progressions.

### A note on linting

If you decide to fork this and push it to production, I'd highly recommend enabling type-aware linting rules. The stock ESLint setup here is great for rapid prototyping, but swapping in `eslint-plugin-react-x` in `eslint.config.js` will save you lots of debugging time down the road!

Enjoy checking out the source, and feel free to reach out or drop a PR if you spot any bugs!
