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