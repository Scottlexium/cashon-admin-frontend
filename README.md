# CashOn Admin Dashboard

A modern admin dashboard for the CashOn financial platform built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Authentication & Authorization**: Secure login with role-based access control
- **User Management**: Comprehensive user administration tools
- **Transaction Monitoring**: Real-time transaction tracking and management
- **Analytics Dashboard**: Detailed insights and performance metrics
- **Report Generation**: Automated report creation and export
- **Responsive Design**: Mobile-first responsive interface
- **Modern UI**: Clean, professional design with Tailwind CSS

## 📁 Project Structure

```
├── app/                    # Next.js 15 App Router
│   ├── dashboard/         # Protected dashboard routes
│   │   ├── layout.tsx     # Dashboard layout with sidebar
│   │   └── page.tsx       # Main dashboard page
│   ├── users/             # User management
│   ├── transactions/      # Transaction management
│   ├── analytics/         # Analytics and charts
│   ├── reports/           # Report generation
│   ├── settings/          # Application settings
│   ├── login/             # Authentication
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # Reusable UI components
│   ├── layout/           # Layout components
│   │   ├── header.tsx    # Top navigation
│   │   └── sidebar.tsx   # Side navigation
│   └── ui/               # Base UI components
│       └── button.tsx    # Button component
├── lib/                   # Utility libraries
│   ├── api.ts            # API service functions
│   ├── auth.ts           # Authentication utilities
│   ├── types.ts          # TypeScript type definitions
│   └── utils.ts          # Common utility functions
├── middleware.ts          # Next.js middleware for auth
└── public/               # Static assets
```

## 🛠️ Setup & Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Environment Configuration:**
   ```bash
   cp .env.example .env.local
   ```
   Update the environment variables in `.env.local` with your actual values.

3. **Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔐 Authentication Flow

The application uses a comprehensive authentication system:

1. **Middleware Protection**: `middleware.ts` protects routes and handles redirects
2. **Role-based Access**: Different access levels (admin, user, moderator)
3. **Secure Cookies**: JWT tokens stored in secure HTTP-only cookies
4. **Route Guards**: Automatic redirects based on authentication state

### Protected Routes
- `/dashboard/*` - Main admin interface
- `/users/*` - User management
- `/transactions/*` - Transaction oversight
- `/analytics/*` - Analytics and insights
- `/reports/*` - Report generation
- `/settings/*` - Application configuration

### Public Routes
- `/login` - Authentication
- `/register` - User registration
- `/forgot-password` - Password recovery

## 🎨 UI Components

The dashboard uses a component-based architecture with:

- **Layout Components**: Header, Sidebar, and page layouts
- **UI Components**: Reusable buttons, forms, and data displays
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Styling**: Professional design with proper spacing and typography

## 📊 Dashboard Features

### Main Dashboard
- Key performance indicators (KPIs)
- Recent activity feed
- Quick action buttons
- Real-time statistics

### User Management
- User listing with search and filters
- User profile management
- Role assignment
- Account status controls

### Transaction Monitoring
- Transaction history
- Status tracking
- Export capabilities
- Detailed transaction views

### Analytics
- Revenue trends
- User growth metrics
- Transaction volume analysis
- Regional distribution

### Reports
- Automated report generation
- Multiple report types
- Export in various formats
- Scheduled reporting

## 🚀 Deployment

### Production Build
```bash
npm run build
npm start
```

### Docker (Optional)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🔧 Configuration

### Middleware Configuration
The `middleware.ts` file handles:
- Route protection
- Authentication checks
- Role-based access control
- Security headers
- Automatic redirects

### API Integration
The `lib/api.ts` service provides:
- Centralized API calls
- Authentication token management
- Error handling
- Type-safe responses

## 📝 Development Guidelines

1. **File Naming**: Use kebab-case for files and folders
2. **Components**: Use PascalCase for component names
3. **Types**: Define interfaces in `lib/types.ts`
4. **Styling**: Use Tailwind CSS utility classes
5. **State Management**: Use React hooks for local state

## 🔍 Code Quality

- **TypeScript**: Full type safety throughout the application
- **Biome**: Code formatting and linting
- **ESLint**: Additional code quality checks
- **Path Mapping**: Clean imports with `@/` prefix

## 📚 Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: Custom components with Headless UI patterns
- **Authentication**: JWT with secure cookies
- **Code Quality**: Biome for formatting and linting

## 🤝 Contributing

1. Follow the established project structure
2. Use TypeScript for all new code
3. Add proper types for API responses
4. Test authentication flows
5. Ensure responsive design
6. Follow the component patterns

## 📄 License

This project is part of the CashOn platform. All rights reserved.
