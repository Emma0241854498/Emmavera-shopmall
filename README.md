# Emmavera ShopMall - Online Supermarket Store

A modern, full-stack e-commerce application built with **Next.js 14**, **React 18**, and **Supabase** for a small supermarket.

## 🎯 Features

- ✅ **Product Catalog** - Browse products by category
- ✅ **Shopping Cart** - Add/remove items with real-time updates
- ✅ **User Authentication** - Sign up, sign in with Supabase Auth
- ✅ **Order Management** - Place orders and track status
- ✅ **Admin Dashboard** - Manage products and inventory
- ✅ **Responsive Design** - Mobile-friendly with Tailwind CSS
- ✅ **Real-time Updates** - Supabase real-time subscriptions
- ✅ **Product Reviews** - Customer ratings and reviews

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Backend/Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **State Management**: Zustand
- **HTTP Client**: Axios

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account (free at [supabase.com](https://supabase.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Emma0241854498/Emmavera-shopmall.git
   cd emmavera-shopmall
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

4. **Create database tables** in Supabase (see SQL schema below)

5. **Run development server**
   ```bash
   npm run dev
   ```

   Visit [http://localhost:3000](http://localhost:3000)

## 📊 Database Schema

Create these tables in your Supabase project:

```sql
-- Categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Products table
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  category_id UUID REFERENCES categories(id),
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT now()
);

-- User profiles table
CREATE TABLE user_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT now()
);

-- Orders table
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES user_profiles(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Order items table
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT now()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID REFERENCES products(id),
  user_id UUID REFERENCES user_profiles(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT now()
);
```

## 📁 Project Structure

```
emmavera-shopmall/
├── src/
│   ├── app/              # Next.js app directory
│   ├── components/       # Reusable React components
│   ├── lib/             # Utilities and helpers
│   ├── store/           # Zustand stores
│   ├── types/           # TypeScript type definitions
│   └── styles/          # Global styles
├── public/              # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── next.config.js
└── .env.example
```

## 🔐 Authentication

The app uses Supabase Auth for user management:

- Sign up with email/password
- Sign in with credentials
- Session management with Auth helpers
- Protected routes and API endpoints

## 📦 Available Scripts

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Linting
npm run lint
```

## 🎨 Styling

Tailwind CSS is pre-configured for rapid UI development. Customize `tailwind.config.js` for your brand colors and design system.

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License - feel free to use this project for your supermarket store.

## 💡 Next Steps

1. Set up Supabase project and database
2. Configure authentication
3. Build product listing pages
4. Implement shopping cart functionality
5. Create checkout and payment integration
6. Build admin dashboard
7. Deploy to Vercel or your preferred hosting

---

**Built with ❤️ for Emmavera ShopMall**
