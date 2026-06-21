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