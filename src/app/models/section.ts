export interface Section {
  id: string;
  name: string;
  slug: string;
  description?: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  name: string;
  sectionId: string;
  explanation: string;
  codeExample: string;
  keyPoints: string[];
  exercise?: string;
  slug?: string;
}
