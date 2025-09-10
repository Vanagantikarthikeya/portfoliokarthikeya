import { MapPin, MessageCircle, Brain, Globe } from 'lucide-react';

export const projects = [
  {
    title: 'Naa Ooru Naa Sarvam – My Village, My Everything',
    description: 'A community-driven web platform built to preserve and promote the cultural and linguistic identity of rural India. The application enables users to contribute voice, text, and video data in Telugu, helping create an open-source dataset for regional AI and NLP projects.',
    icon: Globe,
    highlights: [
      'Audio, text, and video data submission',
      'Real-time Telugu ↔ English language toggle',
      'Login system to track user contributions',
      'Personal profile with contribution analytics',
      'Built entirely with Streamlit for easy deployment',
      'Motivational content to inspire local participation'
    ],
    technologies: ['Streamlit', 'Python', 'SQLite', 'Telugu NLP', 'Multilingual UI'],
    status: 'Completed',
    color: 'from-orange-500 to-red-500'
  },
  {
    title: 'Console Chatbot with Gemini API',
    description: 'A powerful console-based chatbot developed using just 10 lines of .NET code. Demonstrates advanced prompt engineering techniques with Gemini API for intelligent and contextual responses.',
    icon: MessageCircle,
    highlights: [
      'Minimal code implementation (10 lines)',
      'Advanced prompt engineering',
      'Gemini API integration',
      'Intelligent conversation handling',
      'Efficient response generation'
    ],
    technologies: ['.NET', 'C#', 'Gemini API', 'Prompt Engineering'],
    status: 'Open Source',
    color: 'from-green-500 to-emerald-500'
  },
  {
    title: 'Viswam AI - Telugu LLM',
    description: 'A groundbreaking Telugu Large Language Model developed at IIIT Hyderabad. Focused on creating AI that understands and processes native Telugu language, making artificial intelligence more accessible to regional communities.',
    icon: Brain,
    highlights: [
      'Regional Language Model for Telugu',
      'Developed at IIIT Hyderabad',
      'Backend optimization and scaling',
      'Advanced prompt tuning',
      'Cultural context understanding'
    ],
    technologies: ['Python', 'Transformers', 'PyTorch', 'Telugu NLP', 'AI/ML'],
    status: 'In Development',
    color: 'from-purple-500 to-pink-500'
  },
  {
    title: '.NET Builder',
    description: 'A tool that builds .NET projects based on user prompts. This innovative development platform streamlines the .NET project creation process through intelligent prompt interpretation and automated code generation.',
    icon: Brain,
    highlights: [
      'Prompt-based project generation',
      'Automated .NET scaffolding',
      'Intelligent code structure creation',
      'User-friendly interface',
      'Live project preview'
    ],
    technologies: ['.NET', 'C#', 'AI/ML', 'Prompt Engineering', 'Web APIs'],
    status: 'In Development',
    color: 'from-blue-500 to-indigo-500',
    liveLink: 'https://net-builder-457985c7.base44.app'
  },
  {
    title: 'Excel-like App',
    description: 'An Excel-style application with prompt-based data cleaning/management and link-sharing features. Provides advanced spreadsheet functionality with AI-powered data processing capabilities.',
    icon: Globe,
    highlights: [
      'Excel-style interface',
      'Prompt-based data cleaning',
      'Data management tools',
      'Link sharing functionality',
      'Advanced filtering and sorting'
    ],
    technologies: ['JavaScript', 'React', 'AI/ML', 'Data Processing', 'Web APIs'],
    status: 'In Development',
    color: 'from-emerald-500 to-green-500',
    liveLink: 'https://karthikeya-excel-88523531.base44.app'
  },
  {
    title: 'Mood-Based Navigation App',
    description: 'An innovative ASP.NET application that provides personalized location suggestions based on user mood. Integrated with Google Maps API and Events API to offer tailored recommendations for entertainment, dining, and activities.',
    icon: MapPin,
    highlights: [
      'Built during Hackathon at Pallavi Engineering College',
      'Google Maps API integration',
      'Events API for real-time suggestions',
      'Personalized mood-based algorithms',
      'Interactive user interface'
    ],
    technologies: ['ASP.NET', 'C#', 'Google Maps API', 'Events API', 'JavaScript'],
    status: 'In Development',
    color: 'from-blue-500 to-cyan-500'
  }
];

export const certifications = [
  { name: 'Foundation of C# - Microsoft (FreeCodeCamp)', color: 'bg-blue-500' },
  { name: 'Getting Started with AI - IBM', color: 'bg-green-500' },
  { name: 'JavaScript - Infosys', color: 'bg-yellow-500' },
  { name: 'Bootstrap - Infosys', color: 'bg-purple-500' },
  { name: 'Prompting - Simplilearn', color: 'bg-pink-500' },
  { name: 'AI Data Engineering - Reliance Foundation', color: 'bg-indigo-500' },
  { name: 'OCI AI Foundation Associate', color: 'bg-orange-500' }
];

export const skillCategories = [
  {
    title: '.NET Development',
    skills: [
      { name: 'C#', level: 90 },
      { name: 'ASP.NET', level: 85 },
      { name: '.NET Core', level: 60 },
      { name: 'Entity Framework', level: 60 }
    ]
  },
  {
    title: 'AI & Machine Learning',
    skills: [
      { name: 'Prompt Engineering', level: 95 },
      { name: 'LLM Development', level: 80 },
      { name: 'AI Integration', level: 85 },
      { name: 'Gemini API', level: 90 }
    ]
  },
  {
    title: 'Web Development',
    skills: [
      { name: 'JavaScript', level: 50 },
      { name: 'Bootstrap', level: 80 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'REST APIs', level: 50 }
    ]
  },
  {
    title: 'Cloud & Microsoft Technologies',
    skills: [
      { name: 'Microsoft Fabric', level: 75 },
      { name: 'Power Platforms', level: 70 },
      { name: 'Azure Services', level: 65 },
      { name: 'SQL Server', level: 80 },
      { name: 'Handling Oracle Cloud', level: 70 }
    ]
  }
];

// Personal brand
export const personalBrand = {
  tagline: "Vibe Coder - Turning ideas into intelligent solutions"
};

// Computed values for dynamic counts
export const portfolioStats = {
  projectsCount: projects.length,
  certificationsCount: certifications.length,
  technologiesCount: skillCategories.reduce((total, category) => total + category.skills.length, 0)
};