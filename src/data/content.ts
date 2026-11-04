import {
  Globe,
  FolderSync,
  Bot,
  PhoneCall,
  Blocks,
  type LucideIcon,
} from "lucide-react";

export const OWNER_EMAIL =
  (import.meta as any).env?.VITE_OWNER_EMAIL || "hello@websolutionsstudio.com";

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  description: string;
  includes: string[];
  formValue: string;
}

export const SERVICES: Service[] = [
  {
    id: "website-development",
    icon: Globe,
    title: "Website Development",
    short: "Professional online presence",
    description:
      "Professional, responsive and custom-built websites designed to establish your online presence and help your business grow.",
    includes: [
      "Business Websites",
      "Corporate Websites",
      "Landing Pages",
      "Portfolio Websites",
      "Custom Web Applications",
    ],
    formValue: "Website Development",
  },
  {
    id: "document-workflow",
    icon: FolderSync,
    title: "Digital Document & Workflow Management",
    short: "Paperless, organized operations",
    description:
      "Reduce paperwork and manage your business processes digitally with organized and efficient systems.",
    includes: [
      "Digital Document Management",
      "Record Management",
      "Digital Form Management",
      "Document Organization",
      "Workflow Automation",
      "Business Process Digitization",
    ],
    formValue: "Digital Document Management",
  },
  {
    id: "ai-agents",
    icon: Bot,
    title: "AI Agents & Automation",
    short: "Intelligent task automation",
    description:
      "Automate repetitive business tasks using intelligent AI agents that help improve efficiency and save time.",
    includes: [
      "AI Customer Support Agents",
      "AI-powered Business Assistants",
      "Lead Management Automation",
      "Customer Query Handling",
      "Workflow Automation",
    ],
    formValue: "AI Agents",
  },
  {
    id: "ai-calling",
    icon: PhoneCall,
    title: "AI Calling Solutions",
    short: "Smarter business communication",
    description:
      "Make business communication smarter with AI-powered calling solutions designed to handle repetitive communication tasks.",
    includes: [
      "AI Voice Calling Agents",
      "Automated Customer Calls",
      "Appointment Booking Calls",
      "Lead Follow-up Calls",
      "Customer Query Handling",
    ],
    formValue: "AI Calling Solutions",
  },
  {
    id: "custom-solutions",
    icon: Blocks,
    title: "Custom Digital Solutions",
    short: "Built around your business",
    description:
      "Every business has different requirements. We develop customized digital solutions according to your business needs.",
    includes: [
      "Custom Business Software",
      "Management Systems",
      "Data Management Systems",
      "Business-specific Web Applications",
    ],
    formValue: "Custom Business Software",
  },
];

export const SERVICE_OPTIONS = [
  "Website Development",
  "Digital Document Management",
  "Business Workflow Automation",
  "AI Agents",
  "AI Calling Solutions",
  "Custom Business Software",
  "Appointment / Consultation",
  "Other",
];

export const NAV_LINKS = [
  { label: "Home", href: "#/" },
  { label: "Services", href: "#/services" },
  { label: "About", href: "#/about" },
  { label: "Work", href: "#/work" },
  { label: "Contact", href: "#/contact" },
];

export interface Founder {
  initials: string;
  name: string;
  role: string;
  tag: string;
  bio: string;
}

export const FOUNDERS: Founder[] = [
  {
    initials: "RS",
    name: "Ronit Sundrani",
    role: "Founder, WebSolutions Studio",
    tag: "Founder",
    bio: "Started WebSolutions Studio with a simple vision — helping businesses simplify their work through technology.",
  },
  {
    initials: "HB",
    name: "Harsh Barmeda",
    role: "Co-Founder, WebSolutions Studio",
    tag: "Co-Founder",
    bio: "Works alongside the team to make sure every project is planned carefully and delivered on what was promised.",
  },
];

export const IMAGES = {
  hero: "https://images.pexels.com/photos/8102000/pexels-photo-8102000.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  team: "https://images.pexels.com/photos/6326260/pexels-photo-6326260.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  dev: "https://images.pexels.com/photos/5474300/pexels-photo-5474300.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};
