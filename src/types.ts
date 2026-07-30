/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export enum WasteCategory {
  ORGANIC = 'Organic',
  PLASTIC = 'Plastic',
  PAPER = 'Paper',
  GLASS = 'Glass',
  METAL = 'Metal',
  E_WASTE = 'E-Waste',
  HAZARDOUS = 'Hazardous',
  GENERAL = 'General',
}

export interface WasteAnalysis {
  item: string;
  category: WasteCategory;
  confidence: number;
  instructions: string[];
  recyclable: boolean;
  reusable: boolean;
  environmentalImpact: string;
  commonMistakes: string[];
  alternatives: string[];
}

export interface UserStats {
  itemsScanned: number;
  correctlySegregated: number;
  recyclingPoints: number;
  streak: number;
  impactSaved: number; // in kg CO2 or similar
}

export interface RecyclingCenter {
  id: string;
  name: string;
  address: string;
  distance: string;
  acceptedWaste: WasteCategory[];
  hours: string;
  status: 'Open' | 'Closed';
  lat: number;
  lng: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface LearningModule {
  id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  content: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  unlocked: boolean;
}
