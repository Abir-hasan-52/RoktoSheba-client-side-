# 🩸 RoktoSheba - Blood Donation Management System

## 🔍 Project Overview

RoktoSheba is a comprehensive blood donation management platform designed to connect donors with recipients efficiently across Bangladesh. The platform enables users to request, manage, and track blood donations seamlessly through role-based dashboards, ensuring timely medical assistance for those in critical need.

---

## 🌐 Live Project

🔗 **Live Demo:** [https://roktosheba-f14d4.web.app/](https://roktosheba-f14d4.web.app/)

---

## 🛠 Technologies Used

### Frontend
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?style=for-the-badge&logo=daisyui&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)

- React.js
- React Router
- Tailwind CSS
- DaisyUI
- React Hook Form
- React Query (TanStack Query)
- SweetAlert2
- Jodit Editor (Rich text)
- Firebase Authentication & Hosting

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- Firebase Admin SDK
- Stripe (Payment Gateway)

---

## 📸 Screenshots

<div align="center">
  <img src="https://i.ibb.co/fzMdN7dP/roktosheba-f14d4-web-app.png" alt="RoktoSheba Homepage" width="45%" />
  <img src="https://i.ibb.co/qMgspTyz/roktosheba-f14d4-web-app-1.png" alt="Dashboard" width="45%" />
</div>

---

## 🚀 Core Features

### 🔐 Authentication & Authorization
- **Multi-role System:** Admin, Donor, and Volunteer dashboards
- **Firebase Authentication:** Google Sign-in and Email/Password
- **JWT Security:** Protected API routes with token verification

### 🩸 Blood Donation Management
- **Donation Requests:** Create, edit, and cancel blood donation requests
- **Advanced Search:** Find donors by blood group, district, and upazila
- **Real-time Updates:** Live donation status tracking
- **Request Management:** Donors can respond to and manage requests

### 📊 Admin Dashboard
- **User Management:** Manage donors, volunteers, and admins
- **Statistics:** Real-time dashboard with donation metrics
- **Blog System:** Publish health awareness articles with rich text editor
- **Content Control:** Manage platform content and announcements

### 💳 Payment Integration
- **Stripe Gateway:** Secure online donation processing
- **Multiple Payment Methods:** Card payments and digital wallets
- **Transaction History:** Track all donations and payments

### 🌍 Location Services
- **Bangladesh Districts:** Complete district and upazila database
- **Location-based Search:** Find donors in specific areas
- **Geolocation Support:** Auto-detect user location

---

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- Firebase project setup
- Stripe account

### Clone the Repository
```bash
# Clone client-side
git clone https://github.com/yourusername/roktosheba-client.git
cd roktosheba-client

# Clone server-side (in a separate directory)
git clone https://github.com/yourusername/roktosheba-server.git
cd roktosheba-server
```

### Backend Setup
```bash
# Install dependencies
npm install

# Create .env file with the following variables:
DB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
FIREBASE_ADMIN_SDK_KEY=your_firebase_admin_key
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=5000

# Start the server
npm run dev
```

### Frontend Setup
```bash
# Install dependencies
npm install

# Create .env.local file with:
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_firebase_app_id
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Start the development server
npm run dev
```

### Access the Application
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

---

## 📁 Project Structure

```
roktosheba-client/
├── src/
│   ├── components/          # Reusable UI components
│   ├── pages/              # Application pages
│   ├── hooks/              # Custom React hooks
│   ├── context/            # React context providers
│   ├── utils/              # Helper functions
│   └── assets/             # Static assets
├── public/                 # Public assets
└── package.json

roktosheba-server/
├── controllers/            # Route controllers
├── models/                # MongoDB models
├── routes/                # API routes
├── middleware/            # Custom middleware
├── utils/                 # Helper functions
└── server.js              # Main server file
```

---

## 🔑 Test Credentials

### Admin Access
- **Email:** `abirhasan5208@gmail.com`
- **Password:** `123456`

### Sample Donor Account
- **Email:** `abir@gmail.com`
- **Password:** `123456`

---

## 🤝 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Donations
- `GET /api/donations` - Get all donation requests
- `POST /api/donations` - Create donation request
- `PUT /api/donations/:id` - Update donation request
- `DELETE /api/donations/:id` - Delete donation request

### Users
- `GET /api/users` - Get all users (Admin only)
- `PUT /api/users/:id/role` - Update user role (Admin only)
- `GET /api/users/stats` - Get user statistics (Admin only)

---

## 🌟 Key Challenges Solved

1. **Role-based Access Control:** Implemented secure role management with JWT
2. **Real-time Data:** Used React Query for efficient data fetching and caching
3. **Payment Integration:** Successfully integrated Stripe for secure transactions
4. **Location Services:** Implemented comprehensive Bangladesh location database
5. **Rich Text Editing:** Integrated Jodit editor for blog content management

---

## 🚀 Future Enhancements

- [ ] Mobile app development (React Native)
- [ ] SMS notifications for urgent requests
- [ ] Blood bank inventory management
- [ ] Multi-language support (Bengali/English)
- [ ] Advanced analytics dashboard
- [ ] Social media integration

---

 


## 🔗 Links

- **Live Site:** [https://roktosheba-f14d4.web.app/](https://roktosheba-f14d4.web.app/)
- **Client Repository:** [GitHub Client Repo](https://github.com/Abir-hasan-52/roktosheba-client-side--)
- **Server Repository:** [GitHub Server Repo](https://github.com/Abir-hasan-52/roktosheba-serve-side)

---

## 📞 Contact

**Abir Hasan Mahmud**
- Email: abirhasan5208@gmail.com
- LinkedIn: [linkedin.com/in/ah-abir](https://linkedin.com/in/ah-abir)
- GitHub: [github.com/yourusername](https://github.com/Abir-hasan-52)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Thanks to all blood donors who inspire this project
- Firebase team for excellent authentication services
- Stripe for secure payment processing
- Tailwind CSS and DaisyUI for beautiful UI components

---

<div align="center">
  <h3>⭐ If you found this project helpful, please give it a star! ⭐</h3>
</div>
