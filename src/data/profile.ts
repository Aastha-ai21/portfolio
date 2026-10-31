/** Single source of truth for personal details. */
export const profile = {
  name: 'Aastha Bhagat',
  role: 'AI Engineer',
  roleLong: 'AI Engineer / AI Automation Engineer',
  company: 'An HR & compliance services firm, Navi Mumbai',
  /** Same employer, phrased for use mid-sentence. */
  companyInline: 'an HR & compliance services firm, Navi Mumbai',
  location: 'Airoli, Navi Mumbai, India',

  contact: {
    email: 'bhagat.aastha.ai120@gmail.com',
    phone: '+91 91524 73255',
    phoneHref: 'tel:+919152473255',
    linkedin: 'https://www.linkedin.com/in/aastha-bhagat-ai2112',
    linkedinLabel: 'linkedin.com/in/aastha-bhagat-ai2112',
    instagram: 'https://www.instagram.com/aastha.say.cheese/',
    instagramLabel: '@aastha.say.cheese',
  },

  experience: {
    title: 'AI Engineer',
    company: 'An HR & compliance services firm, Navi Mumbai',
    period: 'August 2026 – Present',
    summary:
      'Contributing to AI-driven solutions and practical applications involving Python, machine learning, data analysis, and automation.',
  },

  education: {
    degree: 'Bachelor of Engineering in Artificial Intelligence and Data Science',
    school: 'Datta Meghe College of Engineering, University of Mumbai',
    period: '2022 – 2026',
  },

  internships: [
    { org: 'Oasis Infobyte', title: 'Python Programming Internship' },
    { org: 'Imarticus', title: 'Data Analytics Internship' },
    { org: 'Tata', title: 'Job Simulation' },
    { org: 'Deloitte', title: 'Job Simulation' },
  ],

  certifications: [
    { issuer: 'Oracle Cloud Infrastructure', title: '2025 Certified AI Foundations Associate' },
    { issuer: 'Oracle Cloud Infrastructure', title: 'Certified Generative AI Associate' },
    { issuer: 'Udemy', title: 'Data Analytics Bootcamp' },
    { issuer: 'Udemy', title: '100 Days of Python Bootcamp' },
    { issuer: 'Oasis Infobyte', title: 'Python Programming' },
  ],

  interests: [
    { name: 'Travelling', note: 'New places, new perspectives — the best way I know to reset my thinking.' },
    { name: 'Content creation', note: 'Turning what I see and learn into stories worth sharing.' },
    { name: 'Experiencing life', note: 'Saying yes, paying attention, and collecting moments, not just things.' },
  ],
}
