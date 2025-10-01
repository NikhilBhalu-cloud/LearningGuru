# LearningGuru

A modern, interactive C# learning platform built with Angular 17, PrimeNG, and TailwindCSS. This application provides a Udemy/Coursera-style course player experience for mastering C# programming from beginner to expert level.

## ✨ Features

- 🎓 **Course Player Interface**: Modern, distraction-free learning experience inspired by Udemy and Coursera
- 📚 **16 Comprehensive Topics**: Organized into three difficulty levels:
  - **Beginner** (6 topics): Variables, Operators, Type Conversion, Console I/O, Comments, If/Else
  - **Intermediate** (6 topics): Switch, Loops, Methods, Overloading, Arrays, Strings
  - **Advanced** (4 topics): Exception Handling, OOP Basics, Constructors, Access Modifiers
- 🎨 **Modern UI Stack**: PrimeNG components + TailwindCSS for beautiful, responsive design
- 🔄 **Sequential Navigation**: Previous/Next buttons for smooth topic-by-topic learning
- 📊 **Progress Tracking**: Visual progress bar showing your current position in the course
- 💻 **Syntax-Highlighted Code**: Clean, readable code examples with copy functionality
- 🎯 **Focused Learning**: One topic at a time with detailed explanations and practical examples
- ✅ **Key Points**: Bullet-point summaries for quick reference
- 🏋️ **Practice Exercises**: Hands-on exercises to reinforce learning
- 📱 **Fully Responsive**: Optimized for desktop, tablet, and mobile devices
- ⚡ **Smooth Transitions**: Animated page transitions for enhanced UX

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

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

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to `http://localhost:4200/`

## 🏗️ Project Structure

```
src/
├── app/
│   ├── pages/
│   │   ├── home/                  # Landing page with "Begin Learning" button
│   │   └── learning-page/         # Main learning interface
│   ├── components/
│   │   ├── header/                # Top navbar with section name & progress
│   │   ├── footer/                # Footer component
│   │   └── navigation/            # Previous/Next navigation buttons
│   ├── services/
│   │   └── topic.service.ts       # Topic content provider with navigation logic
│   ├── models/
│   │   └── topic.ts               # Topic data model
│   ├── app-routing.module.ts      # Route configuration
│   ├── app.component.*            # Root component
│   └── app.module.ts              # Main module with PrimeNG imports
├── assets/                         # Static assets
├── styles.css                      # Global styles with Tailwind directives
└── index.html                      # Main HTML file
```

## 🛠️ Technologies Used

- **Angular 17**: Modern frontend framework
- **PrimeNG 17**: Rich UI component library
- **TailwindCSS**: Utility-first CSS framework
- **TypeScript**: Type-safe programming
- **RxJS**: Reactive programming
- **Angular CDK**: Component Dev Kit for clipboard functionality

## 🎯 Learning Flow

1. **Start**: Click "Begin Learning" on the home page
2. **Learn**: Read through topic explanations, code examples, and key points
3. **Navigate**: Use Previous/Next buttons to move between topics
4. **Progress**: Track your progress with the visual progress bar
5. **Practice**: Complete exercises to reinforce your understanding
6. **Advance**: Progress from Beginner → Intermediate → Advanced levels

## 🎨 UI Features

### Home Page
- Gradient background with modern design
- Clear call-to-action button
- Responsive layout

### Learning Page
- **Header**: Shows current section (Beginner/Intermediate/Advanced) and progress
- **Main Content**: 
  - Topic title and detailed explanation
  - Code examples in dark-themed code blocks
  - Key points in highlighted cards
  - Practice exercises when available
- **Navigation**: Sticky bottom navigation with Previous/Next buttons
- **Footer**: Copyright and branding information

## 📦 Building for Production

Build the project:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## 🧪 Testing

Run unit tests:
```bash
npm test
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👤 Author

NikhilBhalu-cloud

---

**Happy Learning! 🚀**

## Angular CLI Commands

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
