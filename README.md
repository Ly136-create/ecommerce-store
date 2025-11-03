# Ecommerce Store

A full-stack ecommerce application built with React, TypeScript, Node.js, Express, and PostgreSQL.

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM for database
- **PostgreSQL** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

## 📋 Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ly136-create/ecommerce-store.git
   cd ecommerce-store
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   ```bash
   cd ../backend
   cp .env.example .env
   # Edit .env file with your configuration
   ```

## 🗄️ Database Setup

1. **Start PostgreSQL with Docker**
   ```bash
   docker-compose up -d
   ```

2. **Generate Prisma Client**
   ```bash
   cd backend
   npm run prisma:generate
   ```

3. **Run database migrations**
   ```bash
   npm run prisma:migrate
   ```

## 🚀 Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:5000`

2. **Start the frontend development server**
   ```bash
   cd frontend
   npm run dev
   ```
   Frontend will run on `http://localhost:3000`

### Production Mode

1. **Build the backend**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   npm run preview
   ```

## 📁 Project Structure

```
ecommerce-store/
├── backend/
│   ├── prisma/
│   │   └── schema.prisma      # Database schema
│   ├── src/
│   │   ├── app.ts             # Express app configuration
│   │   └── server.ts          # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/        # React components
│   │   ├── pages/             # Page components
│   │   ├── styles/            # CSS and styling
│   │   └── main.tsx           # App entry point
│   ├── package.json
│   └── vite.config.ts
└── docker-compose.yml         # Docker configuration
```

## 🔑 Environment Variables

Create a `.env` file in the `backend` directory:

```env
DATABASE_URL="postgresql://postgres:password@localhost:5432/ecommerce?schema=public"
PORT=5000
JWT_SECRET=your-secret-key-change-this-in-production
NODE_ENV=development
```

## 📝 Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🗃️ Database Schema

The application uses the following main models:
- **User** - User accounts and authentication
- **Product** - Product catalog
- **Cart** - Shopping cart
- **CartItem** - Items in cart
- **Order** - Customer orders
- **OrderItem** - Items in orders

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👤 Author

**Ly136-create**

- GitHub: [@Ly136-create](https://github.com/Ly136-create)

## 🙏 Acknowledgments

- Built with modern web technologies
- Inspired by best practices in full-stack development
