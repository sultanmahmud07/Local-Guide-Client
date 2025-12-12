# 🌍 Local Guide Frontend (Next.js 16 + TypeScript)

A modern, high-performance frontend powering the **Local Guide Platform**, where travelers explore tours, book local guides, make payments, and share experiences through reviews.

This repository contains the full UI/UX implementation for tourists, guides, and admin dashboards.

---

## 🔗 Live Website  
**Production:** https://local-guide-client-fz9u.vercel.app 
**Explore Page:** https://local-guide-client-fz9u.vercel.app/explore  
**Backend API:** https://native-ways-api.onrender.com  

---

## 🚀 Features  

### 🧭 **Explore Tours & Guides**
- Search by destination, city, category, language  
- Filter by price range, rating, duration  
- Real-time URL sync (`/explore?search=dhaka&category=Food`)  
- Responsive grid view for tours & guides  
- Review-based ranking

### 🎒 **Tour System (Guide Panel)**
- Create listings (thumbnail + multiple images)
- Update listings section-by-section
- Delete or replace uploaded images  
- Status control: `PUBLIC / PRIVATE / HOLD / SUSPENDED`
- Auto-generate slug from title  
- Guide analytics:  
  - Total tours  
  - Recent bookings  
  - Earnings  
  - Ratings overview  

### 📅 **Booking Workflow**
- Tourist can book a tour with:
  - Date & time selection  
  - Group size  
  - Notes  
- Real-time calendar with disabled dates  
- Booking detail modal  
- Guide can confirm/decline  
- Booking status timeline (UI optimized)  
- Payment button showing only when eligible  

### ⭐ **Reviews Module**
- Tourist can review a tour after status → `COMPLETED`
- Star rating + comment  
- Display in tour details  
- Auto-sliding review carousel section  
- Guide profile shows aggregated ratings  

### 💬 **Messaging / Custom Tour Request**
- Tourist can send personalized tour request  
- Guide receives structured message  
- Clean modern form UI  

### 💳 **Payment Integration**
- Integrated **SSLCommerz Gateway**  
- Redirects user to new payment tab  
- Payment data stored in booking  
- Admin can update payment status  

### 📊 **Dashboard Analytics**
#### **Tourist Dashboard**
- Total bookings  
- Completed/pending status  
- Payment history  
- Reviews overview  

#### **Guide Dashboard**
- Total earnings  
- Tour performance  
- Recent customer reviews  
- Booking timeline  

#### **Admin Dashboard**
- Overview of:
  - Users  
  - Guides  
  - Tours  
  - Bookings  
  - Payments  
- Chart-ready analytics  
- Role-based access  

---

## 🛠️ Technology Stack

### **Frontend**
- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **TailwindCSS**
- **shadcn/ui**
- **Zod Validation**
- **React Hook Form (optional)**
- **Next/Image**
- **React Slick Carousel**
- **Lucide Icons**

### **Integrations**
- Cloudinary — image hosting  
- SSLCommerz — payment gateway  
- REST API communication with backend  

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the repository
```sh
git clone https://github.com/sultanmahmud07/local-guide-client.git
cd local-guide-client
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Create `.env`
```
JWT_SECRET= your_access_secret
NODE_ENV=development

NEXT_PUBLIC_BASE_API_URL=https://native-ways-api.onrender.com/api/v1
```

### 4️⃣ Run Development Server
```sh
npm run dev
```

### 5️⃣ Build for Production
```sh
npm run build
npm start
```

---

