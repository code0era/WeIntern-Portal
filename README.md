
---

# 🚀 WeIntern - Professional Internship & Job Portal

# visit WEINTERN

https://weinternportal.vercel.app/


**WeIntern** is a streamlined, responsive job portal platform designed to connect ambitious interns and job seekers with top-tier employers. Featuring a clean, modern **Sky Blue & White** aesthetic, the application provides a seamless experience for managing the entire hiring lifecycle.

# Some Working SS:
<img width="1920" height="1020" alt="Screenshot 2026-01-18 165656" src="https://github.com/user-attachments/assets/6fefd633-ab82-4adb-8d90-13bbfcc604d0" />


<img width="1920" height="1020" alt="Screenshot 2026-01-18 165704" src="https://github.com/user-attachments/assets/8eb3675d-4db7-408a-aa60-1640e7f04acd" />

<img width="1920" height="1020" alt="Screenshot 2026-01-18 165722" src="https://github.com/user-attachments/assets/2f6e4db3-5649-4630-88c9-714b3da5a957" />
<img width="1920" height="1020" alt="Screenshot 2026-01-18 165801" src="https://github.com/user-attachments/assets/66d50a55-3fd2-423f-9c2d-95e567375d73" />
<img width="1920" height="1020" alt="Screenshot 2026-01-18 165614" src="https://github.com/user-attachments/assets/0ad6f73c-1adb-491c-a258-4a7331218970" />
<img width="1920" height="1020" alt="Screenshot 2026-01-18 173522" src="https://github.com/user-attachments/assets/22dca0d1-19f8-4ec5-94d2-3a7af130f55a" />

<img width="1920" height="1020" alt="Screenshot 2026-01-18 173454" src="https://github.com/user-attachments/assets/bef9ce96-86de-406b-bef3-fe5bd3d6ca6f" />
<img width="1920" height="1020" alt="Screenshot 2026-01-18 173522" src="https://github.com/user-attachments/assets/faf92d4b-c2d1-4693-8dc3-956e10593384" />
<img width="1920" height="1020" alt="Screenshot 2026-01-18 173443" src="https://github.com/user-attachments/assets/ce737e8b-edd4-4a49-9091-939903f55b9b" />


<img width="1920" height="1020" alt="Screenshot 2026-01-18 173454" src="https://github.com/user-attachments/assets/47cfdfd5-2fdc-4c3d-bf16-e226dc60b96d" />
<img width="1920" height="1020" alt="Screenshot 2026-01-18 173522" src="https://github.com/user-attachments/assets/70370061-376e-4da1-a00e-25a222d3ad68" />
 
 1. Tech Stack

* **Frontend:** [React.js](https://react.dev/) (Vite) for a fast, component-based UI.
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) for custom utility-first design.
* **UI Components:** [Shadcn UI](https://ui.shadcn.com/) (Cards, Drawers, Buttons, Selects, Accordions).
* **Authentication:** [Clerk](https://clerk.com/) for secure role-based access control.
* **Backend & Database:** [Supabase](https://supabase.com/) for real-time data and authentication persistence.
* **Form Management:** React Hook Form with Zod validation.
* **Icons:** Lucide React.
* **Editor:** UIW React MD Editor for rich text job requirements.

---

## ✨ 2. Core Functionalities

### **A. For Job Seekers (Candidates)**

* **Job Discovery:** Search through thousands of internships using titles, locations, and company filters.
* **Save for Later:** Bookmark interesting opportunities to a dedicated "Saved Jobs" list.
* **Application Tracking:** Monitor the progress of your applications in real-time (Applied, Interviewing, Hired, or Rejected).
* **Detailed Insights:** View comprehensive job requirements and company details before applying.

### **B. For Employers (Recruiters)**

* **Company Branding:** Register your company and upload logos to build trust with candidates.
* **Job Lifecycle Management:** Post new listings, edit existing ones, or close hiring when a position is filled.
* **Candidate Management:** Access a centralized dashboard to review applicants, download resumes, and check candidate qualifications (Skills, Education, Experience).
* **Workflow Automation:** Update application statuses with a single click to keep candidates informed.

---

## 🎨 3. Design & Theme: "The Sky Blue Aesthetic"

The application has been unified under a professional **Sky Blue / Light Blue / White** palette to ensure a calm yet productive user experience.

| Element | Palette/Style |
| --- | --- |
| **Primary Background** | `bg-sky-100` (Light, airy feel) |
| **Navigation** | `bg-white/80` with `backdrop-blur` |
| **Action Buttons** | `bg-sky-500` to `bg-sky-700` |
| **Cards & Drawers** | White with `border-sky-200` and subtle shadows |
| **Typography** | `text-slate-900` (Headers) and `text-slate-700` (Body) |

---



## 📖 5. User Guides

### **For Recruiters: How to Post & Manage**

1. **Onboarding:** Sign in and select **Recruiter**.
2. **Add Company:** In the "Post Job" section, use the **Add Company Drawer** to register your firm if it doesn't exist.
3. **Posting:** Fill in the title and description. Use the **Markdown Editor** for clear, bulleted requirements.
4. **Managing:** Navigate to **"My Jobs"**. Click a card to see all applicants. Use the status dropdown to move candidates through your hiring pipeline.

### **For Candidates: How to Apply**

1. **Discovery:** Use the filters on the **Jobs Listing** page to find relevant roles.
2. **Application:** Click **"More Details"** and then **"Apply"**.
3. **Resume Upload:** Fill in your years of experience, skills, and upload your resume (PDF/DOC).
4. **Follow Up:** Check **"My Applications"** periodically to see status updates from employers.

---

## 📂 6. Project Structure

```bash
/src
  /api             # Supabase data fetching logic
  /components      # Reusable UI (JobCards, Header, Footer)
  /data            # Static JSON for FAQs and Companies
  /hooks           # Custom useFetch hook for API states
  /pages           # Main views (Landing, Listing, Post Job, Onboarding)
  /layouts         # AppLayout managing Flexbox and Sticky components

```

---

## ⚙️ 7. Installation & Setup

1. **Clone the repo:**
```bash
git clone https://github.com/yourusername/weintern.git

```


2. **Install dependencies:**
```bash
npm install

```


3. **Environment Variables:** Create a `.env` file with your **Clerk** and **Supabase** credentials:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_key
VITE_SUPABASE_URL=your_url
VITE_SUPABASE_ANON_KEY=your_key

```


4. **Start the development server:**
```bash
npm run dev

```



---

MADE by : CODE0ERA 💖
