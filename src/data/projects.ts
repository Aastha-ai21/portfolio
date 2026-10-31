export interface Project {
  id: string
  name: string
  summary: string
  highlights: string[]
  /** Languages, frameworks and AI tech shown as tags on cards. Never hosting platforms. */
  tech: string[]
  /** Where it is hosted — shown only as one small line in the detail dialog. */
  hostedOn?: string
  /** hue (0-360) used for the project's planet in the Atlas */
  hue: number
  /** Optional public link. Only rendered when provided. */
  href?: string
}

export const projects: Project[] = [
  {
    id: 'recruitment-analyzer',
    name: 'AI Recruitment & Candidate Analyzer',
    summary:
      'A multi-tenant SaaS application for HR teams. Recruiters create job openings, AI analyzes job descriptions and resumes, and candidates receive scores supported by evidence.',
    highlights: [
      'Multi-tenant SaaS built for HR teams',
      'AI analysis of job descriptions and resumes',
      'Candidate scores backed by evidence',
      'Pipeline view to manage candidates',
      'The final hiring or rejection decision stays with the human recruiter',
    ],
    tech: ['Next.js', 'Supabase', 'Gemini API'],
    hue: 262,
  },
  {
    id: 'payroll-compliance-calculator',
    name: 'Payroll Compliance Calculator',
    summary:
      'An employee-wise payroll compliance calculator for PF, pension, EDLI, and ESIC, protected with team-password access.',
    highlights: [
      'Pro-rata calculations and wage rounding rules',
      'ECR text-file export and Excel reports',
      'Separate ESIC reports and upload templates',
      'Salary calculations run in the browser, so employee salary data stays local during processing',
    ],
    tech: ['Browser-side calculation', 'Excel reports', 'ECR export'],
    hostedOn: 'Cloudflare',
    hue: 200,
  },
  {
    id: 'client-request-portal',
    name: 'Client Request Portal',
    summary: 'A client-facing portal for onboarding, exit requests, and helpdesk workflows.',
    highlights: [
      'Client access and offer-letter data collection',
      'Onboarding links for new joiners',
      'Editable submissions, draft saving, and document uploads',
      'Excel exports',
      'Expanding: exit-request workflows and automatic escalation of helpdesk tickets unanswered for 48 hours',
    ],
    tech: ['JavaScript', 'Google Apps Script', 'HTML', 'CSS', 'Google Sheets'],
    hostedOn: 'Cloudflare Pages',
    hue: 288,
  },
  {
    id: 'task-master',
    name: 'Task Master + Learning Moments',
    summary:
      'A Google Apps Script web application connected to Google Sheets that organizes tasks across departments.',
    highlights: [
      'Tracks tasks from “Yet to start” to “Done”',
      'Records lessons learned from mistakes',
      'Monthly department leaderboards and rewards',
    ],
    tech: ['Google Apps Script', 'Google Sheets'],
    hue: 330,
  },
  {
    id: 'peachy-notes',
    name: 'Peachy Notes',
    summary:
      'A cute, pastel-themed notes and to-do application.',
    highlights: ['Notes and to-do list in one pastel-themed app', 'Pastel visual design throughout'],
    tech: ['Web app', 'Notes & to-dos', 'Pastel UI'],
    hostedOn: 'Vercel (source on GitHub)',
    hue: 18,
  },
  {
    id: 'mentors-website',
    name: "Mentor's Personal Website",
    summary:
      "A personal website sharing a mentor's story, perspectives on life, and an upcoming book launch.",
    highlights: ['Soft green tones and nature-inspired elements', '3D animation as part of the visual direction'],
    tech: ['3D animation', 'Web design'],
    hue: 150,
  },
  {
    id: 'business-directory-scraper',
    name: 'Business Directory Scraper',
    summary:
      'A Chrome extension that extracts accessible business-directory information from filtered results and profiles, handles duplicate records, and exports to CSV or Excel.',
    highlights: [
      'Works from filtered results and profiles',
      'Handles duplicate records',
      'Exports to CSV or Excel',
      'Focused on data extraction and organization — not on sending messages or emails',
    ],
    tech: ['Chrome extension', 'CSV / Excel export'],
    hue: 190,
  },
  {
    id: 'business-workspace',
    name: 'All-in-One Business Workspace',
    summary: 'A large business software platform spanning many connected modules.',
    highlights: [
      'Suite: CRM, HR and people management, recruitment, accounting, helpdesk',
      'Workflow automation, analytics, mail, projects, payroll',
      'Campaigns, forms, and a custom application builder',
    ],
    tech: ['Business software', 'Platform'],
    hue: 245,
  },
  {
    id: 'job-intelligence-bot',
    name: 'Job Intelligence Bot',
    summary:
      'An automation project that collects job-posting information to identify actively hiring companies and supports a broader hiring-intelligence and outreach workflow.',
    highlights: [
      'Collects job-posting information',
      'Identifies actively hiring companies',
      'Feeds a wider hiring-intelligence and outreach workflow',
    ],
    tech: ['Automation'],
    hue: 300,
  },
  {
    id: 'payroll-file-converter',
    name: 'Payroll File Converter',
    summary:
      'A tool intended to transform inconsistent client payroll Excel files into standardized, upload-ready formats for an HRMS platform.',
    highlights: [
      'Takes inconsistent client Excel files as input',
      'Outputs standardized, upload-ready formats for an HRMS platform',
    ],
    tech: ['Excel'],
    hue: 215,
  },
  {
    id: 'mom-payroll-checker',
    name: 'Month-over-Month Payroll Checker',
    summary:
      'A maker-checker tool intended to compare payroll and compliance files across consecutive months, identify changes, and help validate calculations and employee records.',
    highlights: [
      'Maker-checker workflow',
      'Compares payroll and compliance files month over month',
      'Surfaces changes to validate calculations and employee records',
    ],
    tech: ['Excel', 'Payroll'],
    hue: 350,
  },
  {
    id: 'crop-yield',
    name: 'Crop & Yield Recommendation System',
    summary:
      'A machine-learning project that recommends suitable crops and provides yield-related recommendations from input data.',
    highlights: ['Recommends suitable crops from input data', 'Provides yield-related recommendations'],
    tech: ['Python', 'Machine learning', 'Frontend'],
    hue: 120,
  },
  {
    id: 'brain-tumor',
    name: 'Brain Tumor Classification System',
    summary:
      'An AI project that uses a Convolutional Neural Network (CNN) to classify brain tumor images, with a Streamlit interface for interaction.',
    highlights: [
      'CNN-based deep learning model for image classification',
      'Built in Python on a Kaggle dataset',
      'Streamlit interface for interaction',
    ],
    tech: ['Python', 'CNN', 'Deep learning', 'Kaggle datasets', 'Streamlit'],
    hue: 275,
  },
  {
    id: 'math-gestures',
    name: 'Math with Gestures Using AI',
    summary:
      'An AI-powered application that uses hand gestures to interact with mathematical operations.',
    highlights: ['Hand-gesture input instead of keyboard or mouse', 'Gemini used for the mathematical side'],
    tech: ['Python', 'CVZone', 'Gemini'],
    hue: 170,
  },
  {
    id: 'ai-travel',
    name: 'AI Travel Recommendation & Planning',
    summary:
      'An AI-based travel recommendation and planning application built with modern web technologies.',
    highlights: ['Travel recommendations and planning in one app', 'Built with a modern React + TypeScript stack'],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
    hue: 205,
  },
  {
    id: 'dessert-delight',
    name: 'Dessert Delight Website',
    summary: 'A dessert-themed website created with frontend development technologies.',
    highlights: ['Dessert-themed visual design', 'Built with a modern React + TypeScript stack'],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'JavaScript'],
    hue: 340,
  },
]

export const projectById = (id: string) => projects.find((p) => p.id === id)!
export const featuredIds = [
  'recruitment-analyzer',
  'payroll-compliance-calculator',
  'client-request-portal',
  'task-master',
]
