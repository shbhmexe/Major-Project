# Dynamic Dashboard

A modern, responsive dashboard application built with Next.js, React, and Tailwind CSS. This dashboard provides data visualization, user management, and interactive tables with real-time data fetching.

## Features

- **Interactive Dashboard**: Data visualization with Recharts
- **User Authentication**: Secure login system with JWT
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Data Tables**: Interactive tables with sorting and filtering
- **Dark/Light Mode**: Built-in theme toggle
- **User Profiles**: Manage user information
- **Settings Management**: Customize dashboard settings

## Tech Stack

- **Framework**: Next.js 15
- **UI Library**: React 19
- **Styling**: Tailwind CSS 4
- **Components**: shadcn-ui
- **Authentication**: NextAuth.js
- **Charts**: Recharts
- **Form Handling**: React Hook Form with Zod validation
- **HTTP Client**: Axios

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dynamic-dashboard.git
cd dynamic-dashboard

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
```

## Project Structure

- `/app`: Main application code (Next.js App Router)
  - `/dashboard`: Dashboard views and functionality
  - `/login`: Authentication pages
  - `/profile`: User profile management
  - `/settings`: Application settings
- `/components`: Reusable UI components
- `/lib`: Utility functions and API services
- `/public`: Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
