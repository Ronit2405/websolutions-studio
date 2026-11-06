import {
  Globe,
  FolderSync,
  Bot,
  PhoneCall,
  Blocks,
  type LucideIcon,
} from "lucide-react";

export const OWNER_EMAIL =
  (import.meta as any).env?.VITE_OWNER_EMAIL || "ronitsundrani0104@gmail.com";

/** Public business number used for both the call button and WhatsApp chats. */
const rawWhatsAppNumber =
  (import.meta as any).env?.VITE_WHATSAPP_NUMBER || "917470383241";

/** Digits only (with country code) — required by wa.me links. */
export const WHATSAPP_NUMBER = String(rawWhatsAppNumber).replace(/\D/g, "");

/** Number in tel: URI format so the click dials directly. */
export const OWNER_PHONE_TEL = `+${WHATSAPP_NUMBER}`;

/** Human readable number, e.g. "+91 74703 83241". */
export const OWNER_PHONE_DISPLAY = `+${WHATSAPP_NUMBER.slice(0, 2)} ${WHATSAPP_NUMBER.slice(2, 7)} ${WHATSAPP_NUMBER.slice(7)}`;

/** WhatsApp chat link with an optional prefilled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export interface Service {
  id: string;
  icon: LucideIcon;
  title: string;
  short: string;
  /** One-line hook shown on the service card. */
  tagline: string;
  description: string;
  /** Two or three scannable value points shown under the video. */
  quickPoints: string[];
  /** Who this service is a good fit for. */
  bestFor: string;
  includes: string[];
  /**
   * Per-service explainer video slot.
   * Paste a YouTube / Vimeo / MP4 link here (or null to keep the reserved
   * placeholder box). Only links for this service go in this field.
   */
  video: string | null;
  formValue: string;
}

export const SERVICES: Service[] = [
  {
    id: "website-development",
    icon: Globe,
    title: "Website Development",
    short: "Professional online presence",
    tagline: "Your website should sell while you sleep.",
    quickPoints: [
      "Looks sharp on every phone and desktop",
      "Fast loading pages built to convert visitors",
      "You can update content without a developer",
    ],
    bestFor: "Businesses that need a credible online presence and more enquiries.",
    video: null,
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
    tagline: "Stop chasing papers. Start finding files in seconds.",
    quickPoints: [
      "Every record searchable in one place",
      "No more lost documents or duplicate entries",
      "Approvals and follow-ups happen on time",
    ],
    bestFor: "Shops, offices and teams still running on registers, files and WhatsApp forwards.",
    video: null,
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
    tagline: "Let AI handle the boring replies.",
    quickPoints: [
      "Replies to customers instantly, 24×7",
      "Leads captured and organised automatically",
      "Your team focuses only on real work",
    ],
    bestFor: "Businesses getting the same customer questions again and again.",
    video: null,
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
    tagline: "Every call answered. No lead left behind.",
    quickPoints: [
      "Routine calls handled automatically",
      "Appointments booked without staff effort",
      "Follow-ups never get forgotten",
    ],
    bestFor: "Sales teams, clinics, service businesses and anyone missing calls.",
    video: null,
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
    tagline: "Built for how your business actually runs.",
    quickPoints: [
      "Made around your exact process",
      "One dashboard for your real data",
      "Grows with your business",
    ],
    bestFor: "Businesses whose process does not fit any ready-made software.",
    video: null,
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

/**
 * Project video slots for the "Our Work" page.
 *
 * Each project card has a reserved 16:9 video space where the project's own
 * walkthrough video goes (in place of a screenshot). While a value is `null`
 * the card shows a clean "video coming soon" frame, so the page never looks
 * empty or unfinished.
 *
 * To add a video, replace `null` with a link:
 *   "rice-mill": "https://youtu.be/VIDEO_ID",
 *
 * Supported links:
 *  - YouTube (watch / shorts / live / youtu.be)
 *  - Vimeo (vimeo.com/123456789)
 *  - Direct file (mp4 / webm / ogg / mov) — place the file in `public/videos/`
 *    and use a path like "/videos/rice-mill.mp4"
 *
 * Only that project's own video goes in its field.
 */
export const PROJECT_VIDEOS: Record<"rice-mill" | "dhurwadera", string | null> = {
  "rice-mill": null,
  "dhurwadera": null,
};

export const NAV_LINKS = [
  { label: "Home", href: "#/home" },
  { label: "Services", href: "#/services" },
  { label: "About", href: "#/about" },
  { label: "Our Work", href: "#/work" },
  { label: "Contact", href: "#/contact" },
];

export const IMAGES = {
  hero: "/images/hero-workspace.webp",
  heroFallback: "/images/hero-workspace.jpg",
  team: "https://images.pexels.com/photos/6326260/pexels-photo-6326260.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
  dev: "https://images.pexels.com/photos/5474300/pexels-photo-5474300.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
};
