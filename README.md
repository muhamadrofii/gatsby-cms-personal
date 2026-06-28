# M. Rofi'i's Personal Website

Personal website and digital garden built with Gatsby, React, and Vanilla CSS. It uses Decap CMS for content management and is ready to be hosted on Vercel.

## 🚀 Features

- **Gatsby 5** & React for blazing-fast performance.
- **Vanilla CSS** with a custom grid and responsive layout.
- **Decap CMS** (formerly Netlify CMS) for managing Blog, Notes, and Experience from the browser.
- **OAuth Login** using GitHub for admin access.
- Fully responsive design with dark mode support.

## 🛠️ Development Setup

To run this project locally, make sure you have [Node.js](https://nodejs.org/) installed, then follow these steps:

1. Clone or download the repository.
2. Go to the project directory:
   ```bash
   cd taniarascia.com
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run develop
   ```
5. Open [http://localhost:8000](http://localhost:8000) in your browser.
6. To test the CMS locally, open [http://localhost:8000/admin/](http://localhost:8000/admin/).

## 🌐 Deployment to Vercel

This project is configured to deploy easily on **Vercel**:

1. Push this project to your GitHub account.
2. Link the repository to your Vercel project dashboard.
3. Configure the following **Environment Variables** in Vercel Settings to enable GitHub login for the Admin CMS:
   - `GITHUB_CLIENT_ID`: Your GitHub OAuth App Client ID.
   - `GITHUB_CLIENT_SECRET`: Your GitHub OAuth App Client Secret.
   - `REDIRECT_URI`: `https://your-site.vercel.app/api/callback`
4. Set the framework preset to **Gatsby** (Vercel will auto-detect this and handle building to `public`).

## 📄 License

This project is licensed under the [MIT License](LICENSE).
