# LearningGuru

A comprehensive Angular-based learning platform for mastering C# programming from basics to advanced concepts.

## Features

- **Structured Learning Path**: Topics organized into three difficulty levels (Beginner, Intermediate, Advanced)
- **Detailed Content**: Each topic includes:
  - Comprehensive explanations with theory and concepts
  - Practical code examples in C#
  - Key points and summary
  - Optional hands-on exercises with solutions
- **Interactive UI**: 
  - Expandable/collapsible topic cards
  - Progress tracking with localStorage
  - Search functionality to filter topics
  - Responsive design for desktop and mobile
- **Clean Architecture**: Built with Angular 17 standalone components
- **No External CSS Frameworks**: Pure Angular CSS for styling

## Technology Stack

- **Angular 17**: Latest version with standalone components
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming
- **CSS3**: Custom styling with responsive design
- **LocalStorage**: Client-side progress tracking

## Project Structure

```
src/
├── app/
│   ├── components/          # Reusable UI components
│   │   ├── navigation/      # Top navigation bar
│   │   ├── sidebar/         # Sidebar with progress tracking
│   │   └── topic-card/      # Expandable topic display
│   ├── pages/               # Route pages
│   │   ├── home/           # Landing page
│   │   ├── beginner/       # Beginner topics
│   │   ├── intermediate/   # Intermediate topics
│   │   └── advanced/       # Advanced topics
│   ├── services/           # Business logic
│   │   └── topic.service   # Topic management and search
│   ├── models/             # TypeScript interfaces
│   │   └── topic.model     # Topic data structure
│   └── data/               # Static data
│       └── topics.data     # All topic content
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/NikhilBhalu-cloud/LearningGuru.git
cd LearningGuru
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200`

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Features Overview

### Learning Sections

#### Beginner
- Variables and Data Types
- Conditional Statements (if/else)
- Loops (for, while, foreach)

#### Intermediate
- Methods and Functions
- Classes and Objects
- Collections and Lists

#### Advanced
- LINQ (Language Integrated Query)
- Asynchronous Programming (async/await)
- Delegates and Events

### User Interface

- **Navigation Bar**: Quick access to all sections with search functionality
- **Sidebar**: Shows learning progress and section navigation
- **Topic Cards**: Expandable cards with all topic information
- **Progress Tracking**: Mark topics as completed, stored in browser localStorage
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Search Functionality

Use the search button in the navigation bar to filter topics by:
- Topic title
- Keywords in explanation
- Key points

## Customization

### Adding New Topics

Edit `src/app/data/topics.data.ts` and add new topic objects following the structure:

```typescript
{
  id: 'unique-id',
  title: 'Topic Title',
  level: 'beginner' | 'intermediate' | 'advanced',
  explanation: `HTML formatted explanation`,
  examples: [
    {
      title: 'Example Title',
      code: 'Code here',
      language: 'csharp',
      description: 'Description'
    }
  ],
  keyPoints: ['Point 1', 'Point 2'],
  exercise: {
    title: 'Exercise Title',
    description: 'Exercise description',
    hints: ['Hint 1', 'Hint 2'],
    solution: 'Solution code'
  }
}
```

### Styling

All styling is done with component-specific CSS files. No external CSS frameworks are used.

- Global styles: `src/styles.css`
- Component styles: Located alongside each component

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Author

Created for learning purposes to help developers master C# programming.
