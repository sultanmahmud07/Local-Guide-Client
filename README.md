# 🌍 Local Guide Frontend (Next.js 16 + TypeScript)

A modern, high-performance frontend powering the **Local Guide Platform**, where travelers explore tours, book local guides, make payments, and share experiences through reviews.

This repository contains the full UI/UX implementation for tourists, guides, and admin dashboards.

---

## 🔗 Live Website  
**Production:** https://your-frontend-domain.com  
**Explore Page:** https://your-frontend-domain.com/explore  
**Admin Dashboard:** https://your-frontend-domain.com/admin  

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

## 📂 Folder Structure
```
src/
 ├── app/
 │    ├── explore/
 │    ├── tour-view/[slug]/
 │    ├── guide/[id]/
 │    ├── dashboard/
 │    │     ├── tourist/
 │    │     ├── guide/
 │    │     └── admin/
 │    ├── auth/
 │    ├── payment/
 │
 ├── components/
 │    ├── ui/
 │    ├── shared/
 │    ├── layouts/
 │    ├── module/
 │         ├── Tour/
 │         ├── Booking/
 │         ├── Guide/
 │         ├── Review/
 │
 ├── services/
 │    ├── tour/
 │    ├── booking/
 │    ├── review/
 │    ├── payment/
 │
 ├── hooks/
 ├── lib/
 ├── types/
 ├── utils/
```

---

## ⚙️ Installation & Setup  

### 1️⃣ Clone the repository
```sh
git clone https://github.com/yourusername/local-guide-frontend.git
cd local-guide-frontend
```

### 2️⃣ Install dependencies
```sh
npm install
```

### 3️⃣ Create `.env.local`
```
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxxx
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=xxxx
NEXT_PUBLIC_SSL_SUCCESS_URL=https://your-domain.com/payment/success
NEXT_PUBLIC_SSL_FAIL_URL=https://your-domain.com/payment/fail
NEXT_PUBLIC_SSL_CANCEL_URL=https://your-domain.com/payment/cancel
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

## 🤝 Contribution Guide  
1. Fork the repo  
2. Create a feature branch  
3. Commit with meaningful messages  
4. Submit a Pull Request  

---

## 📜 License  
Licensed under the **MIT License**.

---

## 📧 Contact  
For support or collaboration:  
support@localguide.com
