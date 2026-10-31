import { projectById, type Project } from './projects'

export type SpotArt = 'cnn' | 'gesture' | 'crop' | 'recruit'

export interface Spotlight {
  project: Project
  tag: string
  /** Opens with what the project does. */
  description: string
  steps: string[]
  art: SpotArt
}

/** Featured AI Projects series, in display order. */
export const spotlights: Spotlight[] = [
  {
    project: projectById('brain-tumor'),
    tag: 'AI · Deep Learning',
    description:
      'A Convolutional Neural Network classifies brain tumor images, built in Python on a Kaggle dataset and wrapped in a Streamlit interface so the model can be tried interactively.',
    steps: ['Kaggle image dataset', 'CNN (deep learning)', 'Tumor-image classification', 'Streamlit interface'],
    art: 'cnn',
  },
  {
    project: projectById('math-gestures'),
    tag: 'AI · Computer Vision',
    description:
      'An AI-powered application that lets you work with mathematical operations using hand gestures instead of a keyboard or mouse. CVZone handles the hand input, and Gemini handles the mathematical side.',
    steps: ['Hand gestures', 'CVZone hand tracking', 'Gemini for the maths', 'Answer on screen'],
    art: 'gesture',
  },
  {
    project: projectById('crop-yield'),
    tag: 'AI · Machine Learning',
    description:
      'A machine-learning system that recommends suitable crops and gives yield-related recommendations from input data, built in Python with a frontend to try it.',
    steps: ['Input data', 'Machine-learning model', 'Crop recommendation', 'Yield recommendation'],
    art: 'crop',
  },
  {
    project: projectById('recruitment-analyzer'),
    tag: 'AI · LLMs',
    description:
      'A multi-tenant application for HR teams: recruiters create job openings, AI analyzes job descriptions and resumes, and candidates receive scores backed by evidence. The final hiring decision stays with the human recruiter.',
    steps: ['Job description + resumes', 'AI analysis (Gemini)', 'Evidence-backed score', 'Recruiter decides'],
    art: 'recruit',
  },
]
