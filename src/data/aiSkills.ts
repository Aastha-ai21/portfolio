import { skillCategories } from './skills'
import { projectById } from './projects'

export interface AiMoon {
  /** short label drawn next to the moon */
  label: string
  /** full skill name, exactly as listed in skills.ts */
  name: string
  line: string
  projects: { id: string; name: string }[]
}

export interface AiRing {
  id: 'core' | 'gen' | 'auto'
  name: string
  blurb: string
  hue: number
  moons: AiMoon[]
}

const known = new Map(skillCategories.flatMap((c) => c.skills.map((s) => [s.name, s] as const)))

/**
 * Builds a moon from a skill that already exists in skills.ts (throws on an unknown name, so
 * this section can never show a skill that isn't in the main list). Project names come from
 * the skill's own `projects` mapping, so they're only listed where projects.ts supports them.
 */
const moon = (label: string, name: string, line: string): AiMoon => {
  const skill = known.get(name)
  if (!skill) throw new Error(`AI Skills: "${name}" is not in skills.ts`)
  return { label, name, line, projects: (skill.projects ?? []).map((id) => ({ id, name: projectById(id).name })) }
}

export const aiRings: AiRing[] = [
  {
    id: 'core',
    name: 'Core AI',
    blurb: 'Models that learn from data.',
    hue: 205,
    moons: [
      moon('Machine Learning', 'Machine Learning', 'I train models that turn raw data into crop and yield recommendations.'),
      moon('Deep Learning', 'Deep Learning', 'I build deep models that learn patterns straight from raw images.'),
      moon('Neural Networks', 'Neural Networks', 'I build convolutional networks that learn to classify medical images.'),
      moon('NLP', 'NLP (Natural Language Processing)', 'I turn messy text — resumes, documents, requests — into structured insight.'),
      moon('Computer Vision', 'Computer Vision', 'I make software see: tracking hands and classifying scans.'),
    ],
  },
  {
    id: 'gen',
    name: 'Generative AI',
    blurb: 'Language models put to work.',
    hue: 262,
    moons: [
      moon('Generative AI', 'Generative AI', 'I put generative models to work inside real, usable products.'),
      moon('LLMs', 'LLMs (Large Language Models)', 'I wire LLMs into apps that analyze, score and explain.'),
      moon('Prompt Engineering', 'Prompt Engineering', 'I shape prompts until model output is consistent, useful and on-brief.'),
      moon('RAG', 'RAG (Retrieval-Augmented Generation)', 'I ground LLM answers in the right documents, not guesswork.'),
      moon('AI Agents', 'AI Agents', 'I build agents that plan, call tools and finish multi-step tasks.'),
    ],
  },
  {
    id: 'auto',
    name: 'AI Automation',
    blurb: 'Making repetitive work run itself.',
    hue: 318,
    moons: [
      moon('n8n', 'n8n for AI Automation', 'I wire n8n workflows that let AI handle the repetitive steps.'),
      moon('Zapier', 'Zapier', 'I connect apps with Zaps so busywork runs itself.'),
      moon('Make.com', 'Make.com', 'I design Make scenarios that move data between tools automatically.'),
      moon('UiPath', 'UiPath', 'I automate repetitive desktop and browser tasks with UiPath robots.'),
      moon('Microsoft Power Automate', 'Microsoft Power Automate', 'I build Power Automate flows that remove manual hand-offs.'),
    ],
  },
]

export const aiSkillCount = aiRings.reduce((n, r) => n + r.moons.length, 0)
