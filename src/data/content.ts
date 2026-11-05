import {
  Globe,
  FolderSync,
  Bot,
  PhoneCall,
  Blocks,
  type LucideIcon,
} from "lucide-react";

export const OWNER_EMAIL =
  (import.meta as any).env?.VITE_OWNER_EMAIL || "rontisundrani0104@gmail.com";

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
      "Respond to routine customer calls and follow-ups faster. An AI voice agent can answer approved FAQs, capture and qualify leads, book appointments, and pass complex or sensitive conversations to your team.",
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
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export const IMAGES = {
  hero: "https://images.pexels.com/photos/8102000/pexels-photo-8102000.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  team: "https://images.pexels.com/photos/6326260/pexels-photo-6326260.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  dev: "https://images.pexels.com/photos/5474300/pexels-photo-5474300.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};
