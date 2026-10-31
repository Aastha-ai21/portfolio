export interface Skill {
  name: string
  /** ids of showcased projects where this skill clearly appears in the project description */
  projects?: string[]
}

export interface SkillCategory {
  id: string
  name: string
  blurb: string
  /** Optional panel heading shown instead of the blurb (the blurb then becomes its subline). */
  heading?: string
  /** Draws the stars as a numbered top-to-bottom path instead of a free-form constellation. */
  roadmap?: boolean
  skills: Skill[]
}

const R = 'recruitment-analyzer'
const PAY = 'payroll-compliance-calculator'
const PORTAL = 'client-request-portal'
const TASK = 'task-master'
const NOTES = 'peachy-notes'
const JOB = 'job-intelligence-bot'
const CROP = 'crop-yield'
const BRAIN = 'brain-tumor'
const MATH = 'math-gestures'
const TRAVEL = 'ai-travel'
const DESSERT = 'dessert-delight'
const CONV = 'payroll-file-converter'
const MOM = 'mom-payroll-checker'

export const skillCategories: SkillCategory[] = [
  {
    id: 'code',
    name: 'Programming & Web',
    blurb: 'The languages and frameworks I build interfaces and logic with.',
    skills: [
      { name: 'Python', projects: [CROP, BRAIN, MATH] },
      { name: 'SQL' },
      { name: 'JavaScript', projects: [PORTAL, TRAVEL, DESSERT] },
      { name: 'TypeScript', projects: [TRAVEL, DESSERT] },
      { name: 'HTML', projects: [PORTAL] },
      { name: 'CSS', projects: [PORTAL] },
      { name: 'React', projects: [TRAVEL, DESSERT] },
      { name: 'Next.js', projects: [R] },
      { name: 'Tailwind CSS', projects: [TRAVEL, DESSERT] },
    ],
  },
  {
    id: 'ai',
    name: 'AI & Machine Learning',
    blurb: 'From CNN classifiers to LLM-powered applications.',
    skills: [
      { name: 'Machine Learning', projects: [CROP] },
      { name: 'Deep Learning', projects: [BRAIN] },
      { name: 'Neural Networks', projects: [BRAIN] },
      { name: 'NLP (Natural Language Processing)' },
      { name: 'Computer Vision', projects: [MATH, BRAIN] },
      { name: 'Generative AI', projects: [R, MATH] },
      { name: 'LLMs (Large Language Models)', projects: [R, MATH] },
      { name: 'Prompt Engineering' },
      { name: 'RAG (Retrieval-Augmented Generation)' },
      { name: 'AI Agents' },
      { name: 'n8n for AI Automation' },
      { name: 'Zapier' },
      { name: 'Make.com' },
      { name: 'UiPath' },
      { name: 'Microsoft Power Automate' },
    ],
  },
  {
    id: 'automation',
    name: 'Automation & Integrations',
    blurb: 'Connecting tools so repetitive work runs itself.',
    skills: [
      { name: 'Workflow automation', projects: [TASK, JOB] },
      { name: 'APIs and webhooks' },
      { name: 'n8n' },
      { name: 'Zapier' },
      { name: 'Make.com' },
      { name: 'UiPath' },
      { name: 'Microsoft Power Automate' },
    ],
  },
  {
    id: 'data',
    name: 'Data Analysis',
    heading: 'Data Analyst Skills Roadmap',
    blurb: 'From raw numbers to real business decisions.',
    roadmap: true,
    skills: [
      { name: 'Excel', projects: [PAY, PORTAL, CONV, MOM] },
      { name: 'Python', projects: [CROP, BRAIN, MATH] },
      { name: 'NumPy & Pandas' },
      { name: 'SQL' },
      { name: 'Data Visualization & Statistics' },
      { name: 'Power BI' },
      { name: 'Projects & Business Understanding' },
    ],
  },
  {
    id: 'deploy',
    name: 'Development & Deployment',
    blurb: 'Shipping things so people can actually use them.',
    skills: [
      { name: 'GitHub', projects: [NOTES] },
      { name: 'Cloudflare Pages', projects: [PORTAL] },
      { name: 'Vercel', projects: [NOTES] },
      { name: 'Streamlit', projects: [BRAIN] },
      { name: 'Supabase', projects: [R] },
      { name: 'REST API integrations' },
      { name: 'Web application development', projects: [R, PAY, PORTAL, TRAVEL, DESSERT] },
    ],
  },
]

/** Distinct skills — a few (Python, SQL, Zapier…) appear in more than one constellation. */
export const totalSkills = new Set(skillCategories.flatMap((c) => c.skills.map((k) => k.name))).size

/** Skills that appear in a given project (reverse lookup). */
export const skillsForProject = (projectId: string) =>
  skillCategories.flatMap((c) => c.skills.filter((s) => s.projects?.includes(projectId)).map((s) => s.name))
