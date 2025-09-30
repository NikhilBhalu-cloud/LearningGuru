export interface Topic {
  id: string;
  title: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  explanation: string;
  examples: CodeExample[];
  keyPoints: string[];
  exercise?: Exercise;
  completed?: boolean;
}

export interface CodeExample {
  title: string;
  code: string;
  language: string;
  description?: string;
}

export interface Exercise {
  title: string;
  description: string;
  hints?: string[];
  solution?: string;
}
