# LearningGuru

A comprehensive C# learning platform built with Angular and Angular Material. This application provides structured learning content for mastering C# programming from beginner to expert level.

## Features

- 📚 **Comprehensive Topics**: Complete coverage of C# fundamentals including:
  - Basics (Variables, Data Types, Operators, Type Conversion, Console I/O, Comments)
  - Control Flow (if/else, switch, loops)
  - Methods (Declaration, Overloading)
  - Arrays and Strings
  - Exception Handling
  - Object-Oriented Programming (Classes, Objects, Constructors, Access Modifiers)

- 🎨 **Modern UI**: Built with Angular Material for a beautiful, responsive interface
- 📱 **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- 💻 **Code Examples**: Every topic includes detailed C# code examples
- 📋 **Copy Functionality**: One-click code copying for easy practice
- ✅ **Key Points**: Summarized takeaways for each topic
- 🏋️ **Practice Exercises**: Optional exercises to reinforce learning

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/NikhilBhalu-cloud/LearningGuru.git
cd LearningGuru
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload if you change any of the source files.

## Building for Production

Build the project:
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   └── beginner-section/     # Beginner level topics component
│   ├── models/
│   │   └── topic.ts               # Topic data model
│   ├── services/
│   │   └── topic.service.ts       # Service with all topic data
│   ├── app.component.*            # Root component
│   └── app.module.ts              # Main module with Material imports
├── assets/                        # Static assets
├── styles.css                     # Global styles
└── index.html                     # Main HTML file
```

## Technologies Used

- **Angular 17**: Frontend framework
- **Angular Material**: UI component library
- **TypeScript**: Programming language
- **RxJS**: Reactive programming
- **CSS3**: Styling with custom responsive design

## Features in Detail

### Expansion Panels
Each topic is presented in an expandable panel for easy navigation and focused learning.

### Code Examples
All code examples are syntax-highlighted and include:
- Detailed comments
- Best practices
- Real-world use cases

### Copy to Clipboard
Every code example includes a copy button for quick copying to practice editors.

### Responsive Layout
The application adapts to all screen sizes:
- Desktop: Full-width layout with optimal reading experience
- Tablet: Adjusted spacing and font sizes
- Mobile: Single-column layout with touch-friendly controls

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Author

NikhilBhalu-cloud

---

**Happy Learning! 🚀**App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
