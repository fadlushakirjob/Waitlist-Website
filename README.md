# TravelZync Labs — Waitlist Platform

> **Brand Tagline:** *Your journey perfectly synced.*  
> **Official Website:** [travelzync.com](https://travelzync.com)  
> **Company:** TravelZync Labs Private Limited

---

## 📌 Project Overview

This is the modern, responsive, full-stack waitlist platform for **TravelZync Labs Private Limited**, developed strictly according to the company's official requirements document (`trvlzncweb.pdf`), the approved landing page design mockup, and authentic milestone archives (`Best Startup Runner up- NIT- Calicut.pdf`).

The platform introduces TravelZync to daily commuters and private bus operators across Kerala, showcases verified milestones, and captures early-access waitlist registrations with anti-spam protections and secure database storage.

---

## 🛠️ Technology Stack

| Layer | Technology | Details |
|---|---|---|
| **Frontend** | React.js (Vite) | Responsive, mobile-first, high performance |
| **UI Framework** | Bootstrap 5 + Custom Design | Clean tokens, TravelZync Red (`#ED1C24`), soft shadows, glassmorphism |
| **Backend** | Python Django 5.x | Modular architecture, security best practices |
| **API** | Django REST Framework | RESTful endpoints, CSRF/CORS configuration, JSON validation |
| **Database** | PostgreSQL / SQLite | Pre-configured for PostgreSQL with automated zero-config SQLite development fallback |
| **Spam Protection** | Client & Server Validation | Honeypot trap, duplicate email check, rate-limiting ready |

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 2. Automatic One-Click Launch (Windows)
Double-click `start-dev.bat` or run:
```powershell
.\start-dev.ps1
```

### 3. Manual Launch

#### Backend (Django REST Framework):
```bash
cd backend
python -m pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 127.0.0.1:8000
```

#### Frontend (React + Vite):
```bash
cd frontend
npm install
npm run dev
```

- **Frontend URL:** [http://localhost:5173](http://localhost:5173)
- **Backend API Root:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **Django Admin:** [http://127.0.0.1:8000/admin/](http://127.0.0.1:8000/admin/)  
  - *Default Superuser:* `admin` / `admin123`
- **Admin Dashboard Key (Built-in Web Portal):** `travelzync_admin_2026`

---

## 📐 Implemented Website Sections

1. **Navigation Bar:**
   - Official TravelZync logo & emblem with cursive sub-tagline *"Your journey perfectly synced."*
   - Smooth navigation: `Home`, `About`, `Features`, `Our Journey`, `Contact`.
   - Prominent Red Pill CTA: `Join Waitlist`.
   - Mobile responsive toggle menu.

2. **Hero Section (Matching Mockup Design):**
   - **Headline:** *"A Smarter Way to Travel in Kerala"*
   - **Subtitle:** *"Real-time bus tracking, digital ticketing, AI travel assistant and more — all in one platform. Join the waitlist and be the first to experience TravelZync."*
   - **Hero Inline Waitlist Form:** Email input + `Join Waitlist ->` button with instant prefill.
   - **4 Feature Pills:** Real-Time Bus Tracking, Digital Ticketing, AI Travel Assistant, Live ETA & Crowd.
   - **4 Live Metric Counters:**
     - 👥 **10,000+** People on Waitlist
     - 🚌 **300+** Private Buses (Target)
     - 📍 **Kerala** Our Starting Point
     - 📱 **All-in-One** Buses, Autos, Cabs
   - **Hero Artwork:** Composite graphic featuring the official red Kerala private bus and smartphone app mockup against a scenic Kerala road backdrop, topped with the cursive signature *"Your journey perfectly synced."*

3. **Our Achievements Section (from Authentic Archive):**
   - **Best Startup Runner-up, NIT- Calicut:** Stage presentation photograph, verified narrative, and full story modal.
   - **Discussions for KSRTC Integration:** Photo with Shri P. K. Kunhalikutty AI Minister of Kerala, exploring state-wide transit integration.
   - **Showcased to Transport Minister:** Photo with the Hon’ble Transport Minister of Kerala, presenting the TravelZync AI platform.
   - **Follow Our Journey:** Official social media handles (LinkedIn, Instagram, YouTube, X).

4. **Features Section:**
   - 4 detailed interactive feature cards:
     1. Real-Time Bus Tracking (Live GPS, route progression, delay alerts)
     2. Digital Ticketing (Cashless ticketing, dynamic QR pass, instant receipts)
     3. AI Travel Assistant (Multi-modal transit suggestions, conversational guidance)
     4. Smart ETA and Crowd Prediction (Machine learning seat density & arrival predictions)

5. **About Section:**
   - Story of TravelZync Labs Private Limited.
   - The Kerala Commuting Challenge vs TravelZync Solutions matrix.

6. **Waitlist Modal & Functionality:**
   - Collects: Email (required), Full Name (optional), Mobile Number (optional), Preferred District in Kerala (all 14 districts dropdown).
   - Strict email validation.
   - Duplicate registration prevention with reserved spot retrieval.
   - Anti-spam hidden honeypot.
   - Success modal with assigned queue spot (e.g., `#10,426`), celebration confetti, and WhatsApp / referral sharing.

7. **Admin Management Dashboard:**
   - Security-key protected interface (`travelzync_admin_2026`).
   - View all registrations with dates and times.
   - Search by email, name, or phone.
   - Filter by district and date range.
   - **One-Click CSV Export:** Generates standardized `.csv` file.
   - Direct link to Django Admin (`/admin/`).

8. **Contact Section:**
   - Kerala headquarters address (Calicut & Kochi), official email (`contact@travelzync.com`), and role-based inquiry form.

9. **Footer:**
   - Official branding, company information, verified highlights, Privacy Policy modal, Terms and Conditions modal, and staff Admin Portal link.

---

## 🗄️ PostgreSQL Setup (Production)

To connect to a production PostgreSQL database, update `backend/.env`:
```env
POSTGRES_DB=travelzync_db
POSTGRES_USER=postgres
POSTGRES_PASSWORD=your_secure_password
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
```
When these variables are set, Django automatically connects to PostgreSQL via `psycopg2`.

---

## 🧪 Testing

Run backend automated tests:
```bash
cd backend
python manage.py test
```
All tests validate:
- Waitlist join success and queue increment
- Duplicate email prevention
- Spam honeypot detection
- Statistics API integrity
