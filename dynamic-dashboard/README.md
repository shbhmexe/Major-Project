# Dynamic Dashboard

A modern, responsive dashboard built with Next.js 15, React 19, and Tailwind CSS. This project features light and dark theme support, interactive charts, data tables, and a clean user interface.

![Dynamic Dashboard Screenshot](public/dashboard-preview.png)

## 🚀 Features

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Light & Dark Mode**: Full theme support with system preference detection
- **Interactive Dashboard**: Data visualization with charts and tables
- **Authentication**: Login system with JWT for secure access
- **Clean UI**: Modern interface using TailwindCSS and shadcn/ui components
- **Static Export**: Optimized for Vercel deployment

## 📋 Pages

- **Dashboard**: Main analytics view with charts and statistics
- **Login**: Authentication page
- **Profile**: User profile information
- **Settings**: Application settings

## 🛠️ Technology Stack

- **Framework**: Next.js 15.2.3
- **UI**: React 19.0.0
- **Styling**: TailwindCSS 4
- **Charts**: Recharts
- **Form Handling**: React Hook Form
- **Authentication**: JWT for token-based auth
- **Data Fetching**: Axios
- **Type Safety**: TypeScript
- **Component Library**: shadcn/ui
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/dynamic-dashboard.git
   cd dynamic-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3001
   ```
   Note: The port might be different if 3000 and 3001 are already in use (check terminal output)

## 🏗️ Project Structure

```
dynamic-dashboard/
├── app/                  # Next.js application pages
│   ├── dashboard/        # Dashboard page
│   ├── login/            # Login page
│   ├── profile/          # Profile page
│   ├── settings/         # Settings page
│   ├── layout.tsx        # Root layout with theme provider
│   └── page.tsx          # Home page
├── components/           # React components
│   ├── ui/               # UI components (buttons, cards, etc.)
│   ├── data-table.tsx    # Data table component
│   ├── dashboard-layout.tsx # Main layout for dashboard
│   ├── header.tsx        # Header component
│   └── sidebar.tsx       # Sidebar navigation
├── lib/                  # Utility functions and hooks
│   ├── auth.ts           # Authentication utilities
│   ├── theme-provider.tsx # Theme context provider
│   └── utils.ts          # Helper functions
├── public/               # Static assets
├── .gitignore            # Git ignore file
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## 📊 Dashboard Components

The dashboard features various components:

- **Statistics Cards**: Shows total users, posts, and averages
- **Charts**: Bar charts for data visualization
- **Data Tables**: Interactive tables with search and pagination
- **Responsive Sidebar**: Navigation that adapts to screen size
- **Theme Toggle**: Switch between light and dark modes

## 💻 Development

### Available Scripts

- `npm run dev` - Start the development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run export` - Generate static export
- `npm run lint` - Run ESLint

### Custom Styling

This project uses Tailwind CSS for styling. Configure the theme in `tailwind.config.js`.

### UI Customization

The dashboard UI can be customized in several ways:

1. **Theme Colors**: Edit the color scheme in `tailwind.config.js`:
   ```js
   theme: {
     extend: {
       colors: {
         // Customize your colors here
         primary: {...},
         secondary: {...},
       }
     }
   }
   ```

2. **Component Styling**: All UI components are in `components/ui` directory. Modify these files to change the appearance of buttons, cards, etc.

3. **Layout Adjustments**: 
   - `components/dashboard-layout.tsx` - Overall dashboard structure
   - `components/sidebar.tsx` - Navigation sidebar
   - `components/header.tsx` - Top header bar

4. **Dark/Light Mode**: The theme implementation is in `lib/theme-provider.tsx` if you want to customize theme behavior.

### Adding New Components

1. Create a new component in the `components` directory
2. Import and use existing UI components from `components/ui`
3. Use the `cn` utility for conditional class names

### Data Fetching

The dashboard uses mock data from JSONPlaceholder API. To use real data:

1. Update API endpoints in the appropriate page components
2. Adjust the data structures as needed

## 🚢 Deployment

### Building for Production

```bash
npm run build
# or
yarn build
```

### Static Export

The project is configured for static exports which makes it ideal for hosting on Vercel, Netlify, or any static hosting service.

```bash
npm run export
# or
yarn export
```

### Deploying to Vercel

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import the project in Vercel dashboard
3. Keep the default settings (Vercel will automatically detect it's a Next.js project)
4. Click "Deploy"

## 🔄 State Management

The application uses React Context for state management:

- `ThemeProvider`: Manages light/dark theme state
- `AuthContext`: Handles user authentication state

## 🧪 Testing

Run tests with:

```bash
npm run test
# or
yarn test
```

## ❓ Troubleshooting

### Build Issues

If you encounter build errors:

1. Clear the Next.js cache:
   ```bash
   rm -r -fo .next
   # or on Unix
   rm -rf .next
   ```

2. Delete node_modules and reinstall:
   ```bash
   rm -r -fo node_modules
   npm install
   ```

3. Make sure your Node.js version is compatible (18.17.0+ required)

### Deployment Issues

1. Static export errors:
   - Check that your code doesn't use Next.js features not supported in static exports (like server components with data fetching)
   - Ensure `next.config.js` has proper export configuration

2. Styling issues:
   - Verify that Tailwind is properly configured
   - Check for conflicting CSS classes

3. Vercel deployment:
   - If deployment fails, check the build logs
   - Ensure environment variables are properly set in the Vercel dashboard

## 📄 License

This project is MIT licensed.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Recharts](https://recharts.org/)
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) for the mock API
