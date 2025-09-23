export interface User {
  id: string;
  email: string;
  passwordHash: string; // In a real app, this would be a hash
}

export enum SkillLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
}

export interface Material {
  name: string;
  quantity: string;
  estimatedPrice: string;
  buyLink: string;
}

export interface Tool {
  name: string;
}

export interface Instruction {
  step: number;
  description: string;
  visualDescription: string;
  tip?: string;
}

export interface ProjectKit {
  id: string;
  projectName: string;
  description: string;
  mockupDescription: string; // The user's initial prompt
  skillLevel: SkillLevel;
  estimatedTime: string;
  materials: Material[];
  tools: Tool[];
  instructions: Instruction[];
}
