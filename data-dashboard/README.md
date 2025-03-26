# Data Dashboard Application

A modern data dashboard application built with Next.js and Tailwind CSS.

## Features

- **Authentication**: User login functionality with local storage
- **Responsive Design**: Works on both desktop and mobile devices
- **Dashboard Overview**: Statistics and recent activities
- **Data Table**: With sorting, searching, and pagination features
- **User Profile**: User icon with dropdown menu showing user details and options
- **State Management**: Using React Context API

## Tech Stack

- Next.js (App Router)
- Tailwind CSS
- React Context API for state management
- Lucide React for icons

## Getting Started

1. Clone this repository
2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Login Credentials

For demo purposes, you can use any email and password to log in.

## Project Structure

- `/app`: Next.js pages using the App Router
- `/src/components`: UI components
  - `/layout`: Layout components (Header, Sidebar)
  - `/ui`: Reusable UI components (DataTable)
- `/src/context`: React Context for state management
- `/src/lib`: Utility functions and helpers

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
