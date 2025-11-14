# Netflix Clone

A modern, full-featured Netflix clone built with React, TypeScript, and Supabase. This application replicates the core Netflix experience with user authentication, profile management, content browsing, and personalized features.

## 🚀 Features

- **User Authentication**: Sign up and sign in functionality powered by Supabase Auth
- **Multi-Profile Support**: Create and manage multiple user profiles per account
- **Content Browsing**: Browse content organized by categories with a beautiful UI
- **Hero Banner**: Featured content display with play and info actions
- **Content Details**: Modal view with detailed information about movies and shows
- **Watchlist**: Save content to your personal watchlist
- **Viewing History**: Track your viewing progress and history
- **Responsive Design**: Fully responsive layout that works on all devices
- **Dark Theme**: Netflix-inspired dark theme with smooth animations

## 🛠️ Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Routing**: React Router DOM
- **Backend & Auth**: Supabase
- **Icons**: Lucide React
- **Code Quality**: ESLint

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A [Supabase](https://supabase.com/) account

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/SLANIMAL/netflix-clone.git
   cd project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project on [Supabase](https://supabase.com/)
   - Run the migrations in the `supabase/migrations/` directory to set up your database schema
   - Get your Supabase URL and anon key from your project settings

4. **Configure environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

5. **Run database migrations**
   - Apply the migrations from `supabase/migrations/` to your Supabase project
   - You can do this through the Supabase dashboard SQL editor or using the Supabase CLI

## 🚀 Getting Started

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
project/
├── src/
│   ├── components/          # React components
│   │   ├── auth/           # Authentication components
│   │   ├── common/         # Shared components (NavBar, Footer)
│   │   ├── details/        # Content detail modal
│   │   ├── home/           # Home page components
│   │   └── profile/        # Profile management components
│   ├── data/               # Mock data and constants
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Library configurations (Supabase client)
│   ├── pages/              # Page components
│   ├── stores/             # Zustand state management stores
│   └── types/              # TypeScript type definitions
├── supabase/
│   └── migrations/         # Database migration files
├── dist/                   # Production build output
└── public/                 # Static assets
```

## 🗄️ Database Schema

The application uses the following main tables:

- **profiles**: User profiles with name and avatar
- **watchlist**: Saved content for each profile
- **viewing_history**: Tracked viewing progress and history

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## 🔐 Authentication Flow

1. User signs up or signs in through the `AuthForm` component
2. Upon successful authentication, users are prompted to select or create a profile
3. Once a profile is selected, users can access the main application

## 🎨 Key Components

- **AuthForm**: Handles user registration and login
- **ProfileSelection**: Allows users to select or create profiles
- **Home**: Main content browsing page with hero banner and content rows
- **ContentModal**: Displays detailed information about selected content
- **NavBar**: Navigation bar with profile and logout functionality
- **ProfileManagement**: Create, edit, and delete user profiles

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🌐 Deployment

The application can be deployed to any static hosting service:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service:
   - [Vercel](https://vercel.com/)
   - [Netlify](https://www.netlify.com/)
   - [GitHub Pages](https://pages.github.com/)
   - Any other static hosting service

3. **Configure environment variables** on your hosting platform

4. **Set up redirects** (if needed) - The `dist/_redirects` file is included for Netlify

## 🔒 Security

- All database operations use Row Level Security (RLS) policies
- Authentication is handled securely through Supabase Auth
- Environment variables are used for sensitive configuration

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by Netflix's user interface and user experience
- Built with modern web technologies and best practices

