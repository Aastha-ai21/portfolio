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

/** One confident line per skill, shown first in its detail card. */
const descriptions: Record<string, string> = {
  'Python': 'The language I reach for first, from ML models to everyday automation.',
  'SQL': 'Asking databases the right questions and getting clean answers back.',
  'JavaScript': 'Making pages interactive and wiring the front end to real data.',
  'TypeScript': 'JavaScript with guardrails, for code that stays reliable as it grows.',
  'HTML': 'The semantic foundation every accessible, well-structured page starts from.',
  'CSS': 'Layout, motion and detail that make interfaces feel polished.',
  'React': 'Building fast, component-driven interfaces people enjoy using.',
  'Next.js': 'Full-stack React apps with routing, rendering and APIs in one place.',
  'Tailwind CSS': 'Designing clean, responsive interfaces quickly with utility-first styling.',
  'Machine Learning': 'Teaching models to find patterns in data and make useful predictions.',
  'Deep Learning': 'Training layered neural networks to tackle images, text and complex patterns.',
  'Neural Networks': 'Designing the layered models behind modern vision and language AI.',
  'NLP (Natural Language Processing)': 'Helping machines read, understand and work with human language.',
  'Computer Vision': 'Teaching software to understand images, video and hand gestures.',
  'Generative AI': 'Using models that create text, code and ideas to speed up real work.',
  'LLMs (Large Language Models)': 'Putting large language models to work inside practical, reliable applications.',
  'Prompt Engineering': 'Writing prompts that get consistent, accurate answers from language models.',
  'RAG (Retrieval-Augmented Generation)': 'Grounding AI answers in the right documents so they stay accurate.',
  'AI Agents': 'Building AI that plans, uses tools and completes tasks on its own.',
  'n8n for AI Automation': 'Building AI-powered workflows that connect apps and run on autopilot.',
  'Zapier': 'Quick no-code automations that link everyday tools together.',
  'Make.com': 'Visual scenarios that move data between apps without manual effort.',
  'UiPath': 'Robots that take over repetitive screen-based tasks so people don’t have to.',
  'Microsoft Power Automate': 'Automating routine office workflows across Microsoft apps and beyond.',
  'Workflow automation': 'Turning repeated manual steps into smooth, hands-off processes.',
  'APIs and webhooks': 'Letting separate systems talk to each other and react in real time.',
  'n8n': 'Self-hostable automation that links apps, APIs and AI in flexible flows.',
  'Excel': 'Formulas, pivots and clean reports that turn spreadsheets into real analysis.',
  'NumPy & Pandas': 'Cleaning, reshaping and exploring data quickly with Python’s core toolkit.',
  'Data Visualization & Statistics': 'Using charts and sound statistics to make the story in data obvious.',
  'Power BI': 'Turning raw data into dashboards people actually understand.',
  'Projects & Business Understanding': 'Connecting every analysis to the business question it needs to answer.',
  'GitHub': 'Version control and collaboration that keep every project safe and shareable.',
  'Cloudflare Pages': 'Fast, global static hosting with deployments straight from Git.',
  'Vercel': 'Shipping web apps live in minutes, with previews on every change.',
  'Streamlit': 'Turning Python models into interactive apps anyone can try.',
  'Supabase': 'A Postgres backend with auth and storage, ready in minutes.',
  'REST API integrations': 'Connecting apps to outside services and moving data between them cleanly.',
  'Web application development': 'Taking an idea from first sketch to a working, deployed product.',
}

export const skillDescription = (name: string) => descriptions[name]

/** Distinct skills — a few (Python, SQL, Zapier…) appear in more than one constellation. */
export const totalSkills = new Set(skillCategories.flatMap((c) => c.skills.map((k) => k.name))).size

/** Skills that appear in a given project (reverse lookup). */
export const skillsForProject = (projectId: string) =>
  skillCategories.flatMap((c) => c.skills.filter((s) => s.projects?.includes(projectId)).map((s) => s.name))
