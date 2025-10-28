# Personal Portfolio Website

A simple and elegant personal portfolio website built with Next.js 14.

## Features

- Modern Next.js 14 with App Router
- Responsive design with tan color scheme
- Navigation bar with Home, Resume, and Portfolio pages
- TypeScript support
- CSS Modules for styling

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
updated-portfolio/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Navbar.module.css
│   ├── portfolio/
│   │   ├── page.tsx
│   │   └── portfolio.module.css
│   ├── resume/
│   │   ├── page.tsx
│   │   └── resume.module.css
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── page.module.css
├── package.json
├── next.config.js
└── tsconfig.json
```

## Customization

- Update your name in `app/components/Navbar.tsx`
- Customize colors in the CSS files (currently using tan: #d2b48c)
- Add your own content to the Home, Resume, and Portfolio pages
- Add your projects to the Portfolio page

## Build for Production

```bash
npm run build
npm start
```

## Deploy

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com).

