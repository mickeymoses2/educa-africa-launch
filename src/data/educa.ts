import school1 from "@/assets/school-1.jpg";
import school2 from "@/assets/school-2.jpg";
import school3 from "@/assets/school-3.jpg";
import school4 from "@/assets/school-4.jpg";
import type { SchoolCardData } from "@/components/educa/SchoolCard";
import type { Status } from "@/components/educa/StatusBadge";

export const featuredSchools: SchoolCardData[] = [
  {
    name: "Kilimani Academy",
    location: "Nairobi, Kenya",
    level: "Primary & Secondary",
    curriculum: "CBC · IGCSE",
    boarding: "Boarding & Day",
    description:
      "A modern co-educational academy combining the Kenyan CBC with Cambridge international pathways.",
    image: school1,
    initials: "KA",
  },
  {
    name: "Hillcrest International",
    location: "Lagos, Nigeria",
    level: "Secondary",
    curriculum: "British · IB",
    boarding: "Day",
    description:
      "Award-winning campus with science labs, design studios and a robust university placement programme.",
    image: school3,
    initials: "HI",
  },
  {
    name: "Savannah Heights School",
    location: "Kigali, Rwanda",
    level: "Pre-Primary – Primary",
    curriculum: "Cambridge",
    boarding: "Day",
    description:
      "A nurturing, child-centred environment with inquiry-based learning and a strong arts programme.",
    image: school2,
    initials: "SH",
  },
  {
    name: "Mwangaza Boarding",
    location: "Eldoret, Kenya",
    level: "Secondary",
    curriculum: "8-4-4 · CBC",
    boarding: "Boarding",
    description:
      "Established boarding institution with strong STEM, athletics and pan-African student community.",
    image: school4,
    initials: "MB",
  },
];

export interface Application {
  id: string;
  student: string;
  parent: string;
  classApplied: string;
  submitted: string;
  status: Status;
  documents: "Complete" | "Pending" | "Partial";
  previousSchool: string;
  email: string;
  phone: string;
  initials: string;
}

export const applications: Application[] = [
  { id: "APP-10248", student: "Amara Okonkwo", parent: "Chinedu Okonkwo", classApplied: "Grade 6", submitted: "20 Jun 2026", status: "Under Review", documents: "Complete", previousSchool: "Bright Future Primary", email: "chinedu.o@mail.com", phone: "+234 803 200 1100", initials: "AO" },
  { id: "APP-10247", student: "Brian Mwangi", parent: "Faith Mwangi", classApplied: "Form 1", submitted: "19 Jun 2026", status: "Submitted", documents: "Pending", previousSchool: "Kileleshwa Primary", email: "faith.m@mail.com", phone: "+254 722 110 220", initials: "BM" },
  { id: "APP-10246", student: "Zola Dlamini", parent: "Sipho Dlamini", classApplied: "Grade 4", submitted: "18 Jun 2026", status: "Accepted", documents: "Complete", previousSchool: "Acacia Junior School", email: "sipho@mail.com", phone: "+27 71 555 1212", initials: "ZD" },
  { id: "APP-10245", student: "Kwame Asante", parent: "Akosua Asante", classApplied: "Grade 1", submitted: "18 Jun 2026", status: "Pending Documents", documents: "Partial", previousSchool: "Sunrise Kindergarten", email: "akosua.a@mail.com", phone: "+233 24 880 5500", initials: "KA" },
  { id: "APP-10244", student: "Lerato Khumalo", parent: "Tumi Khumalo", classApplied: "Form 2", submitted: "17 Jun 2026", status: "Waitlisted", documents: "Complete", previousSchool: "Northcliff Secondary", email: "tumi.k@mail.com", phone: "+27 82 410 7733", initials: "LK" },
  { id: "APP-10243", student: "Tariro Moyo", parent: "Rudo Moyo", classApplied: "Grade 5", submitted: "16 Jun 2026", status: "Rejected", documents: "Complete", previousSchool: "Borrowdale Primary", email: "rudo.m@mail.com", phone: "+263 77 200 8800", initials: "TM" },
  { id: "APP-10242", student: "Naledi Sibanda", parent: "Bongani Sibanda", classApplied: "Grade 3", submitted: "15 Jun 2026", status: "Accepted", documents: "Complete", previousSchool: "Acorn Day School", email: "bongani.s@mail.com", phone: "+27 73 220 4411", initials: "NS" },
  { id: "APP-10241", student: "Adaeze Ibe", parent: "Ngozi Ibe", classApplied: "Grade 6", submitted: "14 Jun 2026", status: "Under Review", documents: "Pending", previousSchool: "Citadel Schools", email: "ngozi.i@mail.com", phone: "+234 809 444 3300", initials: "AI" },
];

export const pipelineStages: { status: Status; description: string }[] = [
  { status: "Submitted", description: "Newly received applications" },
  { status: "Under Review", description: "Being assessed by admissions" },
  { status: "Pending Documents", description: "Awaiting applicant uploads" },
  { status: "Accepted", description: "Offers extended" },
  { status: "Waitlisted", description: "On reserve list" },
  { status: "Rejected", description: "Not accepted this intake" },
];

export function countByStatus(status: Status) {
  return applications.filter((a) => a.status === status).length;
}

/* ============================================================
 * Parent / Student portal mock data
 * ============================================================ */

export interface Child {
  id: string;
  educaId: string;
  name: string;
  initials: string;
  gender: "Male" | "Female";
  dob: string;
  currentSchool: string;
  currentClass: string;
  desiredClass: string;
  curriculum: string;
  completion: number; // 0-100
  guardian: string;
  avatarTone: string;
}

export const children: Child[] = [
  {
    id: "stu-001",
    educaId: "EDUCA-STU-000123",
    name: "Brian Mwangi",
    initials: "BM",
    gender: "Male",
    dob: "12 Mar 2014",
    currentSchool: "Kileleshwa Primary",
    currentClass: "Grade 6",
    desiredClass: "Form 1",
    curriculum: "CBC",
    completion: 82,
    guardian: "Grace Mwangi",
    avatarTone: "from-primary to-teal",
  },
  {
    id: "stu-002",
    educaId: "EDUCA-STU-000124",
    name: "Amani Mwangi",
    initials: "AM",
    gender: "Female",
    dob: "04 Aug 2017",
    currentSchool: "Little Stars Academy",
    currentClass: "Grade 3",
    desiredClass: "Grade 4",
    curriculum: "CBC",
    completion: 60,
    guardian: "Grace Mwangi",
    avatarTone: "from-teal to-gold",
  },
];

export interface MyApplication {
  id: string;
  studentId: string;
  student: string;
  initials: string;
  school: string;
  schoolInitials: string;
  location: string;
  classApplied: string;
  submitted: string;
  status: Status;
  nextAction: string;
}

export const myApplications: MyApplication[] = [
  {
    id: "APP-20451",
    studentId: "stu-001",
    student: "Brian Mwangi",
    initials: "BM",
    school: "Kilimani Academy",
    schoolInitials: "KA",
    location: "Nairobi, Kenya",
    classApplied: "Form 1",
    submitted: "18 Jun 2026",
    status: "Under Review",
    nextAction: "Awaiting school response",
  },
  {
    id: "APP-20452",
    studentId: "stu-001",
    student: "Brian Mwangi",
    initials: "BM",
    school: "Mwangaza Boarding",
    schoolInitials: "MB",
    location: "Eldoret, Kenya",
    classApplied: "Form 1",
    submitted: "16 Jun 2026",
    status: "Pending Documents",
    nextAction: "Upload updated report card",
  },
  {
    id: "APP-20453",
    studentId: "stu-002",
    student: "Amani Mwangi",
    initials: "AM",
    school: "Savannah Heights School",
    schoolInitials: "SH",
    location: "Kigali, Rwanda",
    classApplied: "Grade 4",
    submitted: "12 Jun 2026",
    status: "Accepted",
    nextAction: "View admission instructions",
  },
];

export interface AppNotification {
  id: string;
  type: "submitted" | "review" | "documents" | "accepted" | "rejected" | "profile" | "recommendation";
  title: string;
  description: string;
  time: string;
  read: boolean;
  action?: string;
}

export const notifications: AppNotification[] = [
  { id: "n1", type: "accepted", title: "Application Accepted", description: "Savannah Heights School has accepted Amani Mwangi for Grade 4.", time: "2h ago", read: false, action: "View Instructions" },
  { id: "n2", type: "documents", title: "Documents Requested", description: "Mwangaza Boarding has requested an updated report card for Brian Mwangi.", time: "5h ago", read: false, action: "Upload Document" },
  { id: "n3", type: "review", title: "Application Under Review", description: "Kilimani Academy has started reviewing Brian's Form 1 application.", time: "Yesterday", read: true },
  { id: "n4", type: "submitted", title: "Application Submitted", description: "Your application to Kilimani Academy was submitted successfully.", time: "2 days ago", read: true },
  { id: "n5", type: "recommendation", title: "New School Recommendation", description: "Hillcrest International matches Brian's curriculum preferences.", time: "3 days ago", read: true, action: "View School" },
  { id: "n6", type: "profile", title: "Profile Updated", description: "Brian Mwangi's education profile is now 82% complete.", time: "4 days ago", read: true },
];

export interface DocumentItem {
  id: string;
  name: string;
  description: string;
  required: boolean;
  status: "Uploaded" | "Missing" | "Verified";
  fileName?: string;
  updated?: string;
}

export const documents: DocumentItem[] = [
  { id: "d1", name: "Birth Certificate", description: "Government-issued birth certificate (PDF or image).", required: true, status: "Verified", fileName: "brian_birth_cert.pdf", updated: "12 Jun 2026" },
  { id: "d2", name: "Previous Report Card", description: "Most recent end-of-term report.", required: true, status: "Uploaded", fileName: "report_card_t2.pdf", updated: "14 Jun 2026" },
  { id: "d3", name: "Passport Photo", description: "Recent passport-sized colour photo.", required: true, status: "Uploaded", fileName: "brian_passport.jpg", updated: "10 Jun 2026" },
  { id: "d4", name: "Parent/Guardian ID", description: "National ID or passport of the guardian.", required: true, status: "Verified", fileName: "guardian_id.pdf", updated: "08 Jun 2026" },
  { id: "d5", name: "Transfer Letter", description: "Letter of release from current school.", required: false, status: "Missing" },
  { id: "d6", name: "Other Supporting Document", description: "Any extra document the school may request.", required: false, status: "Missing" },
];

/* ============================================================
 * Phase 2 — EDUCA Pay, Scholarships, Marketplace, Suppliers
 * ============================================================ */

export type PayStatus = "Paid" | "Pending" | "Overdue" | "Partially Paid";

export interface PaymentItem {
  id: string;
  title: string;
  type: "School Fees" | "Application Fee" | "Uniform Order" | "Marketplace Order";
  student: string;
  school: string;
  amount: number;
  dueDate: string;
  status: PayStatus;
  reference: string;
}

export const payments: PaymentItem[] = [
  { id: "pay-001", title: "Term 2 School Fees", type: "School Fees", student: "Brian Mwangi", school: "Kilimani Academy", amount: 35000, dueDate: "30 Jun 2026", status: "Pending", reference: "FEE-KA-20451" },
  { id: "pay-002", title: "Application Fee", type: "Application Fee", student: "Brian Mwangi", school: "Mwangaza Boarding", amount: 1500, dueDate: "22 Jun 2026", status: "Overdue", reference: "APF-MB-20452" },
  { id: "pay-003", title: "Term 2 School Fees", type: "School Fees", student: "Amani Mwangi", school: "Savannah Heights School", amount: 65000, dueDate: "12 Jun 2026", status: "Paid", reference: "FEE-SH-20453" },
  { id: "pay-004", title: "Uniform Order #UO-3012", type: "Uniform Order", student: "Brian Mwangi", school: "Kilimani Academy", amount: 8400, dueDate: "—", status: "Pending", reference: "UO-3012" },
  { id: "pay-005", title: "Marketplace Order #MO-9101", type: "Marketplace Order", student: "Amani Mwangi", school: "—", amount: 2100, dueDate: "—", status: "Paid", reference: "MO-9101" },
];

export interface Receipt {
  id: string;
  number: string;
  transactionCode: string;
  date: string;
  paidBy: string;
  student: string;
  party: string;
  purpose: string;
  amount: number;
  method: "M-Pesa";
  status: "Paid";
}

export const receipts: Receipt[] = [
  { id: "rc-001", number: "RCPT-2026-0001", transactionCode: "RJK7H2L9X1", date: "12 Jun 2026 · 10:42", paidBy: "Grace Mwangi", student: "Amani Mwangi", party: "Savannah Heights School", purpose: "Term 2 School Fees", amount: 65000, method: "M-Pesa", status: "Paid" },
  { id: "rc-002", number: "RCPT-2026-0002", transactionCode: "RBM4K0W8Q2", date: "08 Jun 2026 · 16:11", paidBy: "Grace Mwangi", student: "Brian Mwangi", party: "Kilimani Academy", purpose: "Application Fee", amount: 1500, method: "M-Pesa", status: "Paid" },
  { id: "rc-003", number: "RCPT-2026-0003", transactionCode: "RZP1L9N7T6", date: "02 Jun 2026 · 09:05", paidBy: "Grace Mwangi", student: "Amani Mwangi", party: "Asili Uniforms Ltd", purpose: "Marketplace Order MO-9101", amount: 2100, method: "M-Pesa", status: "Paid" },
];

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  level: "Primary" | "Secondary" | "Tertiary" | "All Levels";
  fundingType: "Full" | "Partial" | "Bursary" | "Grant";
  deadline: string;
  country: string;
  amount?: string;
  eligibility: string;
  description: string;
  documents: string[];
  instructions: string;
  saved?: boolean;
}

export const scholarships: Scholarship[] = [
  { id: "sch-001", title: "Equity Wings to Fly Scholarship", provider: "Equity Group Foundation", level: "Secondary", fundingType: "Full", deadline: "30 Sep 2026", country: "Kenya", amount: "Full tuition + stipend", eligibility: "KCPE top performers from low-income households.", description: "Comprehensive secondary scholarship covering tuition, boarding, books and mentorship.", documents: ["KCPE result slip", "Birth certificate", "Parent/Guardian ID", "Recommendation letter"], instructions: "Apply via the Equity Foundation website before the deadline. Shortlisted applicants will be invited for interviews.", saved: true },
  { id: "sch-002", title: "MasterCard Foundation Scholars Program", provider: "MasterCard Foundation", level: "Tertiary", fundingType: "Full", deadline: "15 Jan 2027", country: "Pan-African", amount: "Full tuition + living costs", eligibility: "Academically talented African students with leadership potential.", description: "Undergraduate scholarship at partner universities across Africa and abroad.", documents: ["Transcripts", "National ID/Passport", "Personal essay", "Two references"], instructions: "Applications open via partner universities each year." },
  { id: "sch-003", title: "Elimu Trust Primary Bursary", provider: "Elimu Trust Kenya", level: "Primary", fundingType: "Bursary", deadline: "10 Aug 2026", country: "Kenya", amount: "KES 25,000 per year", eligibility: "Pupils in Grades 4–6 from vulnerable families.", description: "Termly bursary supporting tuition, uniform and learning materials.", documents: ["Recent report card", "Chief's letter", "Parent ID"], instructions: "Submit a completed bursary form to your sub-county education office." },
  { id: "sch-004", title: "Africa Code Week STEM Grant", provider: "SAP Africa Code Week", level: "Secondary", fundingType: "Grant", deadline: "05 Oct 2026", country: "Pan-African", amount: "Up to USD 1,500", eligibility: "Students passionate about coding, robotics and STEM clubs.", description: "Grant for individuals or school clubs running STEM initiatives.", documents: ["Project proposal", "Teacher endorsement"], instructions: "Submit a project proposal via the Africa Code Week portal." },
  { id: "sch-005", title: "Aga Khan Academies Scholarship", provider: "Aga Khan Academies", level: "Secondary", fundingType: "Partial", deadline: "20 Nov 2026", country: "Kenya · Uganda · Tanzania", amount: "Up to 100% tuition (means-tested)", eligibility: "Top academic performers admitted to Aga Khan Academies.", description: "Need- and merit-based financial aid for the IB Diploma Programme.", documents: ["Academic records", "Family income statement", "References"], instructions: "Apply through the Aga Khan Academies admissions portal." },
  { id: "sch-006", title: "Nation Media Scholarship", provider: "Nation Media Group", level: "Secondary", fundingType: "Full", deadline: "12 Jul 2026", country: "Kenya", amount: "Full secondary tuition", eligibility: "KCPE candidates scoring 380+ with demonstrated financial need.", description: "Full scholarship to attend partner national schools.", documents: ["KCPE certificate", "Letter from school head", "Guardian ID"], instructions: "Submit the application form published in the Daily Nation newspaper.", saved: true },
];

/* Marketplace */

export type ProductCategory =
  | "Uniforms"
  | "Books"
  | "Stationery"
  | "School Bags"
  | "Shoes"
  | "Sportswear"
  | "Learning Materials"
  | "School Accessories";

export const productCategories: { key: ProductCategory; description: string; emoji: string }[] = [
  { key: "Uniforms", description: "School-approved uniform sets", emoji: "👕" },
  { key: "Books", description: "Course books & readers", emoji: "📚" },
  { key: "Stationery", description: "Pens, notebooks, geometry sets", emoji: "✏️" },
  { key: "School Bags", description: "Backpacks & satchels", emoji: "🎒" },
  { key: "Shoes", description: "Black, brown & sports shoes", emoji: "👟" },
  { key: "Sportswear", description: "PE kits & sports gear", emoji: "🏃" },
  { key: "Learning Materials", description: "Charts, kits & flashcards", emoji: "🧠" },
  { key: "School Accessories", description: "Ties, belts, socks & more", emoji: "🎀" },
];

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  supplier: string;
  supplierId: string;
  price: number;
  stock: number;
  rating: number;
  reviews: number;
  sizes: string[];
  description: string;
  featured?: boolean;
  schoolApproved?: boolean;
  gradient: string;
}

export const products: Product[] = [
  { id: "p-001", name: "Boys Cotton School Shirt", category: "Uniforms", supplier: "Asili Uniforms Ltd", supplierId: "sup-001", price: 850, stock: 142, rating: 4.7, reviews: 128, sizes: ["S","M","L","XL"], description: "Premium-grade cotton white shirt, breathable and easy-care. School-approved by 30+ institutions.", featured: true, schoolApproved: true, gradient: "from-primary to-teal" },
  { id: "p-002", name: "Girls Pleated Skirt", category: "Uniforms", supplier: "Asili Uniforms Ltd", supplierId: "sup-001", price: 1200, stock: 88, rating: 4.6, reviews: 96, sizes: ["S","M","L","XL"], description: "Durable pleated tartan skirt in school colours.", featured: true, schoolApproved: true, gradient: "from-teal to-gold" },
  { id: "p-003", name: "School Sweater · Navy", category: "Uniforms", supplier: "Threadworks Africa", supplierId: "sup-002", price: 1800, stock: 64, rating: 4.5, reviews: 72, sizes: ["S","M","L","XL"], description: "Cotton-blend pullover with embroidered crest placeholder.", featured: true, gradient: "from-navy to-primary" },
  { id: "p-004", name: "CBC Grade 6 Mathematics Coursebook", category: "Books", supplier: "Pamoja Publishers", supplierId: "sup-003", price: 650, stock: 220, rating: 4.8, reviews: 410, sizes: [], description: "Approved CBC coursebook with worked examples and assessments.", featured: true, gradient: "from-info to-primary" },
  { id: "p-005", name: "Geometry Set · 9-piece", category: "Stationery", supplier: "Pamoja Publishers", supplierId: "sup-003", price: 350, stock: 540, rating: 4.4, reviews: 180, sizes: [], description: "Sturdy geometry set for primary and secondary students.", gradient: "from-gold to-teal" },
  { id: "p-006", name: "Sahara Backpack 28L", category: "School Bags", supplier: "Jongo Gear", supplierId: "sup-004", price: 2400, stock: 96, rating: 4.6, reviews: 142, sizes: ["One Size"], description: "Water-resistant backpack with padded laptop sleeve.", featured: true, gradient: "from-primary to-info" },
  { id: "p-007", name: "Black Leather School Shoes", category: "Shoes", supplier: "Sokoni Footwear", supplierId: "sup-005", price: 2100, stock: 78, rating: 4.5, reviews: 88, sizes: ["35","36","37","38","39","40","41","42"], description: "Genuine leather lace-ups with comfort sole.", gradient: "from-navy to-teal" },
  { id: "p-008", name: "PE Tracksuit · Boys & Girls", category: "Sportswear", supplier: "Asili Uniforms Ltd", supplierId: "sup-001", price: 2600, stock: 54, rating: 4.7, reviews: 67, sizes: ["S","M","L","XL"], description: "Stretch-knit tracksuit set for PE and games.", schoolApproved: true, gradient: "from-teal to-primary" },
  { id: "p-009", name: "Wall Map of Africa", category: "Learning Materials", supplier: "Pamoja Publishers", supplierId: "sup-003", price: 1100, stock: 36, rating: 4.6, reviews: 41, sizes: [], description: "High-detail laminated map suitable for classrooms.", gradient: "from-gold to-primary" },
  { id: "p-010", name: "School Tie · Striped", category: "School Accessories", supplier: "Threadworks Africa", supplierId: "sup-002", price: 320, stock: 240, rating: 4.3, reviews: 55, sizes: [], description: "Pre-knot school tie in standard length.", gradient: "from-navy to-gold" },
];

export interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  rating: number;
  productsCount: number;
  status: "Active" | "Pending" | "Inactive";
  official?: boolean;
  description: string;
  initials: string;
  delivery: string;
}

export const suppliers: Supplier[] = [
  { id: "sup-001", name: "Asili Uniforms Ltd", category: "Uniforms · Sportswear", location: "Nairobi, Kenya", rating: 4.7, productsCount: 42, status: "Active", official: true, description: "Official uniform supplier for 30+ schools across East Africa.", initials: "AU", delivery: "2–3 days" },
  { id: "sup-002", name: "Threadworks Africa", category: "Uniforms · Accessories", location: "Mombasa, Kenya", rating: 4.5, productsCount: 28, status: "Active", official: true, description: "Bespoke uniform manufacturing with school-branded crests.", initials: "TA", delivery: "3–5 days" },
  { id: "sup-003", name: "Pamoja Publishers", category: "Books · Learning Materials", location: "Nairobi, Kenya", rating: 4.8, productsCount: 156, status: "Active", description: "Leading publisher of CBC and IGCSE coursebooks.", initials: "PP", delivery: "1–2 days" },
  { id: "sup-004", name: "Jongo Gear", category: "School Bags · Accessories", location: "Kampala, Uganda", rating: 4.4, productsCount: 18, status: "Active", description: "Durable bags engineered for African school routes.", initials: "JG", delivery: "4–7 days" },
  { id: "sup-005", name: "Sokoni Footwear", category: "Shoes", location: "Eldoret, Kenya", rating: 4.5, productsCount: 22, status: "Pending", description: "Quality leather school shoes at fair prices.", initials: "SF", delivery: "3–5 days" },
];

/* Orders */

export type OrderStatus =
  | "Pending Payment"
  | "Payment Received"
  | "Processing"
  | "Ready for Pickup"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export const orderStages: OrderStatus[] = [
  "Pending Payment",
  "Payment Received",
  "Processing",
  "Ready for Pickup",
  "Out for Delivery",
  "Delivered",
];

export interface OrderLine {
  productId: string;
  name: string;
  quantity: number;
  size?: string;
  price: number;
  gradient: string;
}

export interface Order {
  id: string;
  number: string;
  date: string;
  customer: string;
  student: string;
  school: string;
  supplier: string;
  supplierId: string;
  items: OrderLine[];
  amount: number;
  status: OrderStatus;
  delivery: "Home Delivery" | "School Pickup" | "Supplier Pickup";
  address?: string;
}

export const orders: Order[] = [
  { id: "ord-001", number: "ORD-9201", date: "20 Jun 2026", customer: "Grace Mwangi", student: "Brian Mwangi", school: "Kilimani Academy", supplier: "Asili Uniforms Ltd", supplierId: "sup-001", items: [
    { productId: "p-001", name: "Boys Cotton School Shirt", quantity: 3, size: "M", price: 850, gradient: "from-primary to-teal" },
    { productId: "p-008", name: "PE Tracksuit · Boys & Girls", quantity: 1, size: "M", price: 2600, gradient: "from-teal to-primary" },
  ], amount: 5150, status: "Out for Delivery", delivery: "Home Delivery", address: "Apt 4B, Kilimani, Nairobi" },
  { id: "ord-002", number: "ORD-9202", date: "18 Jun 2026", customer: "Grace Mwangi", student: "Amani Mwangi", school: "Savannah Heights School", supplier: "Pamoja Publishers", supplierId: "sup-003", items: [
    { productId: "p-004", name: "CBC Grade 6 Mathematics Coursebook", quantity: 1, price: 650, gradient: "from-info to-primary" },
    { productId: "p-005", name: "Geometry Set · 9-piece", quantity: 2, price: 350, gradient: "from-gold to-teal" },
  ], amount: 1350, status: "Delivered", delivery: "School Pickup" },
  { id: "ord-003", number: "ORD-9203", date: "16 Jun 2026", customer: "Grace Mwangi", student: "Brian Mwangi", school: "Kilimani Academy", supplier: "Sokoni Footwear", supplierId: "sup-005", items: [
    { productId: "p-007", name: "Black Leather School Shoes", quantity: 1, size: "38", price: 2100, gradient: "from-navy to-teal" },
  ], amount: 2100, status: "Processing", delivery: "Supplier Pickup" },
  { id: "ord-004", number: "ORD-9204", date: "15 Jun 2026", customer: "Grace Mwangi", student: "Brian Mwangi", school: "Kilimani Academy", supplier: "Asili Uniforms Ltd", supplierId: "sup-001", items: [
    { productId: "p-002", name: "Girls Pleated Skirt", quantity: 2, size: "M", price: 1200, gradient: "from-teal to-gold" },
  ], amount: 2400, status: "Pending Payment", delivery: "Home Delivery" },
];

/* Uniform requirements per class */

export interface UniformItem {
  id: string;
  classGrade: string;
  item: string;
  required: boolean;
  gender: "All" | "Boys" | "Girls";
  quantity: number;
  notes?: string;
}

export const uniformRequirements: UniformItem[] = [
  { id: "ur-1", classGrade: "Grade 1 – 3", item: "White Shirt", required: true, gender: "All", quantity: 3 },
  { id: "ur-2", classGrade: "Grade 1 – 3", item: "Grey Trouser", required: true, gender: "Boys", quantity: 2 },
  { id: "ur-3", classGrade: "Grade 1 – 3", item: "Tartan Skirt", required: true, gender: "Girls", quantity: 2 },
  { id: "ur-4", classGrade: "Grade 1 – 3", item: "Navy Sweater", required: true, gender: "All", quantity: 1 },
  { id: "ur-5", classGrade: "Form 1 – 4", item: "School Blazer", required: true, gender: "All", quantity: 1, notes: "With embroidered crest" },
  { id: "ur-6", classGrade: "Form 1 – 4", item: "Striped Tie", required: true, gender: "All", quantity: 1 },
  { id: "ur-7", classGrade: "Form 1 – 4", item: "PE Tracksuit", required: false, gender: "All", quantity: 1 },
  { id: "ur-8", classGrade: "Form 1 – 4", item: "Black Leather Shoes", required: true, gender: "All", quantity: 1 },
];

/* Fee structures (school-side) */

export interface FeeStructure {
  id: string;
  grade: string;
  tuition: number;
  boarding: number;
  activity: number;
  transport: number;
  other: number;
  termYear: string;
}

export const feeStructures: FeeStructure[] = [
  { id: "fs-1", grade: "Grade 1 – 3", tuition: 55000, boarding: 0, activity: 3000, transport: 8000, other: 4000, termYear: "Term 2 · 2026" },
  { id: "fs-2", grade: "Grade 4 – 6", tuition: 65000, boarding: 0, activity: 4000, transport: 8000, other: 5000, termYear: "Term 2 · 2026" },
  { id: "fs-3", grade: "Form 1 – 2", tuition: 85000, boarding: 35000, activity: 6000, transport: 0, other: 7500, termYear: "Term 2 · 2026" },
  { id: "fs-4", grade: "Form 3 – 4", tuition: 95000, boarding: 38000, activity: 7000, transport: 0, other: 8500, termYear: "Term 2 · 2026" },
];

export const orderStatusBadge: Record<OrderStatus, string> = {
  "Pending Payment": "bg-warning/15 text-warning-foreground",
  "Payment Received": "bg-info/10 text-info",
  "Processing": "bg-primary/10 text-primary",
  "Ready for Pickup": "bg-teal/15 text-teal-foreground",
  "Out for Delivery": "bg-gold/20 text-gold-foreground",
  "Delivered": "bg-success/15 text-success-foreground",
  "Cancelled": "bg-destructive/10 text-destructive",
};

export const payStatusBadge: Record<PayStatus, string> = {
  Paid: "bg-success/15 text-success-foreground",
  Pending: "bg-warning/15 text-warning-foreground",
  Overdue: "bg-destructive/10 text-destructive",
  "Partially Paid": "bg-info/10 text-info",
};

/* ============================================================
 * Phase 2 (v2) — Wallet, Logistics, Bundles, Deals
 * ============================================================ */

export type Role = "parent" | "student" | "school" | "supplier" | "logistics";

export interface WalletBalance {
  title: string;
  accountName: string;
  accountType: string;
  available: number;
  pending: number;
  extraLabel: string;
  extraValue: string;
  linkedLabel?: string;
  linkedValue?: string;
  gradient: string;
}

export const walletBalances: Record<Role, WalletBalance> = {
  parent: {
    title: "EDUCA Wallet",
    accountName: "Grace Mwangi",
    accountType: "Parent Account",
    available: 12500,
    pending: 4000,
    extraLabel: "Recent Deposit",
    extraValue: "KES 5,000",
    linkedLabel: "Linked Students",
    linkedValue: "2",
    gradient: "from-navy via-primary to-teal",
  },
  student: {
    title: "My EDUCA Balance",
    accountName: "Brian Mwangi",
    accountType: "Student Account",
    available: 2300,
    pending: 0,
    extraLabel: "Education Allowance",
    extraValue: "KES 1,500/wk",
    linkedLabel: "EDUCA ID",
    linkedValue: "EDUCA-STU-000123",
    gradient: "from-teal via-primary to-navy",
  },
  school: {
    title: "School Account Balance",
    accountName: "Kilimani Academy",
    accountType: "School Account",
    available: 84000,
    pending: 12000,
    extraLabel: "Collected Fees (Term)",
    extraValue: "KES 4.2M",
    linkedLabel: "Application Fees",
    linkedValue: "KES 48,000",
    gradient: "from-navy via-primary to-gold",
  },
  supplier: {
    title: "Supplier Wallet",
    accountName: "Asili Uniforms Ltd",
    accountType: "Supplier Account",
    available: 46800,
    pending: 18200,
    extraLabel: "Sales Balance",
    extraValue: "KES 142K",
    linkedLabel: "Pending Orders",
    linkedValue: "7",
    gradient: "from-navy via-teal to-primary",
  },
  logistics: {
    title: "Delivery Earnings",
    accountName: "SwiftEdu Deliveries",
    accountType: "Logistics Partner",
    available: 18400,
    pending: 4200,
    extraLabel: "Completed Deliveries",
    extraValue: "126 · 30d",
    linkedLabel: "Pending Deliveries",
    linkedValue: "5",
    gradient: "from-navy via-primary to-teal",
  },
};

export type TxType =
  | "Deposit"
  | "Payment"
  | "Refund"
  | "Order Payment"
  | "Fee Payment"
  | "Supplier Sale"
  | "Delivery Earning"
  | "Payout Request";

export type TxStatus = "Successful" | "Pending" | "Failed" | "Reversed";

export interface WalletTransaction {
  id: string;
  date: string;
  type: TxType;
  description: string;
  amount: number; // negative for outflow
  status: TxStatus;
}

export const walletTransactions: Record<Role, WalletTransaction[]> = {
  parent: [
    { id: "TX-9001", date: "23 Jun 2026 · 09:12", type: "Deposit", description: "M-Pesa deposit from +254 722 110 220", amount: 5000, status: "Successful" },
    { id: "TX-9000", date: "20 Jun 2026 · 14:08", type: "Order Payment", description: "Marketplace Order ORD-9201 · Asili Uniforms", amount: -5150, status: "Successful" },
    { id: "TX-8995", date: "18 Jun 2026 · 11:31", type: "Fee Payment", description: "Term 2 Fees · Savannah Heights School", amount: -65000, status: "Successful" },
    { id: "TX-8990", date: "15 Jun 2026 · 10:05", type: "Deposit", description: "M-Pesa deposit", amount: 20000, status: "Successful" },
    { id: "TX-8987", date: "14 Jun 2026 · 16:22", type: "Refund", description: "Refund for ORD-9180 (cancelled)", amount: 1800, status: "Successful" },
    { id: "TX-8980", date: "12 Jun 2026 · 08:47", type: "Order Payment", description: "Marketplace Order ORD-9180 · Pamoja Publishers", amount: -1800, status: "Reversed" },
  ],
  student: [
    { id: "TX-7012", date: "22 Jun 2026 · 12:00", type: "Deposit", description: "Top-up from parent (Grace Mwangi)", amount: 1500, status: "Successful" },
    { id: "TX-7008", date: "19 Jun 2026 · 09:30", type: "Order Payment", description: "Marketplace Order ORD-9205 · Stationery", amount: -800, status: "Successful" },
    { id: "TX-7003", date: "15 Jun 2026 · 10:00", type: "Deposit", description: "Education allowance · Weekly", amount: 1500, status: "Successful" },
  ],
  school: [
    { id: "TX-5301", date: "22 Jun 2026 · 16:11", type: "Fee Payment", description: "Term 2 Fees · Amani Mwangi", amount: 65000, status: "Successful" },
    { id: "TX-5298", date: "21 Jun 2026 · 14:55", type: "Fee Payment", description: "Term 2 Fees · Brian Mwangi (partial)", amount: 20000, status: "Successful" },
    { id: "TX-5290", date: "18 Jun 2026 · 09:20", type: "Payout Request", description: "Payout to school bank account", amount: -50000, status: "Pending" },
    { id: "TX-5285", date: "15 Jun 2026 · 11:00", type: "Fee Payment", description: "Application fees x 24", amount: 36000, status: "Successful" },
  ],
  supplier: [
    { id: "TX-4101", date: "20 Jun 2026 · 18:32", type: "Supplier Sale", description: "Order ORD-9201 · 4 items", amount: 5150, status: "Successful" },
    { id: "TX-4098", date: "19 Jun 2026 · 12:14", type: "Supplier Sale", description: "Order ORD-9198 · 2 items", amount: 3200, status: "Successful" },
    { id: "TX-4095", date: "17 Jun 2026 · 10:00", type: "Payout Request", description: "Bank payout · KCB", amount: -25000, status: "Pending" },
  ],
  logistics: [
    { id: "TX-3210", date: "22 Jun 2026 · 17:45", type: "Delivery Earning", description: "Delivery DLV-2204 · ORD-9201", amount: 250, status: "Successful" },
    { id: "TX-3208", date: "22 Jun 2026 · 14:10", type: "Delivery Earning", description: "Delivery DLV-2203 · ORD-9198", amount: 320, status: "Successful" },
    { id: "TX-3200", date: "20 Jun 2026 · 09:00", type: "Payout Request", description: "Bank payout · Equity", amount: -10000, status: "Successful" },
  ],
};

export const txStatusBadge: Record<TxStatus, string> = {
  Successful: "bg-success/15 text-success-foreground",
  Pending: "bg-warning/15 text-warning-foreground",
  Failed: "bg-destructive/10 text-destructive",
  Reversed: "bg-muted text-muted-foreground",
};

/* Bundles */

export interface Bundle {
  id: string;
  name: string;
  classGrade: string;
  schoolHint: string;
  itemsCount: number;
  price: number;
  oldPrice?: number;
  gradient: string;
  description: string;
}

export const bundles: Bundle[] = [
  { id: "b-001", name: "Form 1 Starter Pack", classGrade: "Form 1", schoolHint: "Boarding & Day Schools", itemsCount: 14, price: 12800, oldPrice: 14200, gradient: "from-navy to-primary", description: "Complete uniform set, books and stationery to start secondary school strong." },
  { id: "b-002", name: "Grade 1 Back-to-School Pack", classGrade: "Grade 1", schoolHint: "Primary Schools", itemsCount: 11, price: 7400, gradient: "from-teal to-primary", description: "Everything a first-grader needs — uniforms, books, bag and stationery." },
  { id: "b-003", name: "Boarding School Essentials", classGrade: "Form 1 – 4", schoolHint: "Boarding Secondary", itemsCount: 22, price: 18600, oldPrice: 21000, gradient: "from-primary to-info", description: "Bedding, toiletries, uniform and study kit for boarders." },
  { id: "b-004", name: "Sports & PE Kit", classGrade: "All Levels", schoolHint: "All Schools", itemsCount: 6, price: 4800, gradient: "from-gold to-teal", description: "Tracksuit, PE shirt, shorts, sports shoes and water bottle." },
  { id: "b-005", name: "Stationery Pack", classGrade: "Grade 4 – 8", schoolHint: "All Schools", itemsCount: 18, price: 2400, gradient: "from-info to-primary", description: "Notebooks, pens, geometry set and exam-day essentials." },
  { id: "b-006", name: "Full Uniform Set", classGrade: "Grade 1 – 6", schoolHint: "Primary Schools", itemsCount: 9, price: 6800, gradient: "from-navy to-teal", description: "Shirts, trousers/skirts, sweater, tie, socks and shoes." },
];

/* Featured / Deals */

export interface Deal {
  id: string;
  title: string;
  description: string;
  badge: string;
  gradient: string;
}

export const deals: Deal[] = [
  { id: "d-001", title: "10% off Stationery Bundles", description: "Save on stationery packs from Pamoja Publishers.", badge: "10% OFF", gradient: "from-primary to-info" },
  { id: "d-002", title: "Free Delivery · Asili Uniforms", description: "Free home delivery for orders over KES 3,000.", badge: "FREE DELIVERY", gradient: "from-teal to-primary" },
  { id: "d-003", title: "Uniform Combo Deals", description: "Buy 3 shirts and a sweater — save 15%.", badge: "15% OFF", gradient: "from-gold to-teal" },
  { id: "d-004", title: "Book Set Discounts", description: "Grade-level book sets up to 20% off.", badge: "UP TO 20% OFF", gradient: "from-navy to-primary" },
];

/* Logistics partners */

export interface LogisticsPartner {
  id: string;
  name: string;
  initials: string;
  location: string;
  distanceKm: number;
  eta: string;
  fee: number;
  vehicle: "Motorbike" | "Van" | "Van / Bike" | "Bicycle";
  rating: number;
  coverage: string;
  riders: number;
  capacity: string;
  gradient: string;
  official?: boolean;
}

export const logisticsPartners: LogisticsPartner[] = [
  { id: "lp-001", name: "SwiftEdu Deliveries", initials: "SE", location: "Westlands, Nairobi", distanceKm: 1.4, eta: "Same day", fee: 250, vehicle: "Motorbike", rating: 4.8, coverage: "Nairobi · Kiambu", riders: 12, capacity: "Up to 15kg per trip", gradient: "from-primary to-teal", official: true },
  { id: "lp-002", name: "ScholarExpress Logistics", initials: "SX", location: "Industrial Area, Nairobi", distanceKm: 2.2, eta: "Next day", fee: 180, vehicle: "Van / Bike", rating: 4.6, coverage: "Nairobi · Machakos · Thika", riders: 24, capacity: "Up to 200kg per trip", gradient: "from-teal to-primary" },
  { id: "lp-003", name: "Nairobi School Runs", initials: "NS", location: "Karen, Nairobi", distanceKm: 3.8, eta: "Scheduled", fee: 300, vehicle: "Van", rating: 4.5, coverage: "Nairobi metro · Schools", riders: 8, capacity: "Up to 500kg per trip", gradient: "from-navy to-primary" },
  { id: "lp-004", name: "Sambaza Riders", initials: "SR", location: "Kilimani, Nairobi", distanceKm: 2.6, eta: "Same day", fee: 220, vehicle: "Motorbike", rating: 4.4, coverage: "Nairobi CBD · Kilimani · Lavington", riders: 18, capacity: "Up to 10kg per trip", gradient: "from-gold to-primary" },
];

/* Deliveries (for logistics dashboard) */

export type DeliveryStatus =
  | "Pending Assignment"
  | "Assigned"
  | "Picked Up"
  | "In Transit"
  | "Delivered"
  | "Failed";

export const deliveryStages: DeliveryStatus[] = [
  "Assigned",
  "Picked Up",
  "In Transit",
  "Delivered",
];

export interface Delivery {
  id: string;
  number: string;
  orderRef: string;
  customer: string;
  customerPhone: string;
  supplier: string;
  supplierPhone: string;
  pickup: string;
  dropoff: string;
  distanceKm: number;
  fee: number;
  packageType: string;
  itemsSummary: string;
  status: DeliveryStatus;
  eta: string;
  assignedDate: string;
}

export const deliveries: Delivery[] = [
  { id: "dlv-001", number: "DLV-2210", orderRef: "ORD-9201", customer: "Grace Mwangi", customerPhone: "+254 722 110 220", supplier: "Asili Uniforms Ltd", supplierPhone: "+254 733 880 110", pickup: "Industrial Area, Nairobi", dropoff: "Apt 4B, Kilimani, Nairobi", distanceKm: 6.4, fee: 250, packageType: "Uniform package · Medium", itemsSummary: "3 shirts · 1 tracksuit", status: "In Transit", eta: "Today · 4:30 PM", assignedDate: "22 Jun 2026" },
  { id: "dlv-002", number: "DLV-2209", orderRef: "ORD-9203", customer: "Grace Mwangi", customerPhone: "+254 722 110 220", supplier: "Sokoni Footwear", supplierPhone: "+254 720 220 808", pickup: "Eldoret CBD", dropoff: "Pickup at supplier", distanceKm: 0, fee: 0, packageType: "Shoes · Small", itemsSummary: "1 pair leather shoes", status: "Picked Up", eta: "Tomorrow", assignedDate: "21 Jun 2026" },
  { id: "dlv-003", number: "DLV-2208", orderRef: "ORD-9202", customer: "Grace Mwangi", customerPhone: "+254 722 110 220", supplier: "Pamoja Publishers", supplierPhone: "+254 711 991 002", pickup: "Westlands, Nairobi", dropoff: "Savannah Heights School (Pickup)", distanceKm: 4.1, fee: 180, packageType: "Books · Small", itemsSummary: "1 coursebook · 2 geometry sets", status: "Delivered", eta: "Delivered", assignedDate: "18 Jun 2026" },
  { id: "dlv-004", number: "DLV-2211", orderRef: "ORD-9204", customer: "Grace Mwangi", customerPhone: "+254 722 110 220", supplier: "Asili Uniforms Ltd", supplierPhone: "+254 733 880 110", pickup: "Industrial Area, Nairobi", dropoff: "Apt 4B, Kilimani, Nairobi", distanceKm: 6.4, fee: 250, packageType: "Uniform · Small", itemsSummary: "2 pleated skirts", status: "Pending Assignment", eta: "Awaiting acceptance", assignedDate: "23 Jun 2026" },
  { id: "dlv-005", number: "DLV-2212", orderRef: "ORD-9220", customer: "James Otieno", customerPhone: "+254 700 100 200", supplier: "Threadworks Africa", supplierPhone: "+254 733 410 220", pickup: "Mombasa Rd", dropoff: "Brookside, Nairobi", distanceKm: 11.2, fee: 380, packageType: "Uniform package · Large", itemsSummary: "Blazer · tie · 4 shirts", status: "Pending Assignment", eta: "Awaiting acceptance", assignedDate: "23 Jun 2026" },
];

export const deliveryStatusBadge: Record<DeliveryStatus, string> = {
  "Pending Assignment": "bg-warning/15 text-warning-foreground",
  Assigned: "bg-info/10 text-info",
  "Picked Up": "bg-primary/10 text-primary",
  "In Transit": "bg-gold/20 text-gold-foreground",
  Delivered: "bg-success/15 text-success-foreground",
  Failed: "bg-destructive/10 text-destructive",
};

/* Shop-by-school list */
export const shopSchools = [
  { id: "ss-1", name: "Green Valley Academy", town: "Karen, Nairobi", initials: "GV", gradient: "from-primary to-teal" },
  { id: "ss-2", name: "Nairobi Hills School", town: "Lavington, Nairobi", initials: "NH", gradient: "from-teal to-gold" },
  { id: "ss-3", name: "St. Mary's Junior School", town: "Westlands, Nairobi", initials: "SM", gradient: "from-navy to-primary" },
  { id: "ss-4", name: "Brookside Preparatory", town: "Brookside, Nairobi", initials: "BP", gradient: "from-info to-primary" },
];