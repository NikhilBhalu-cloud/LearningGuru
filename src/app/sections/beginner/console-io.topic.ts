import { Topic } from '../../models/section';

export const consoleIoTopic: Topic = {
  id: 'basics-console-io',
  name: 'Console Input/Output',
  sectionId: 'beginner',
  slug: 'console-io',
  explanation: `
    <h3>Console Input/Output</h3>
    <p>In C#, console applications interact with users through the console window. The <code>Console</code> class provides methods for reading input and writing output.</p>

    <h4>Console Output</h4>
    <ul>
      <li><code>Console.Write()</code> - Writes text without a newline</li>
      <li><code>Console.WriteLine()</code> - Writes text with a newline</li>
      <li><code>Console.WriteLine(string format, params object[] args)</code> - Formatted output</li>
    </ul>

    <h4>Console Input</h4>
    <ul>
      <li><code>Console.Read()</code> - Reads a single character</li>
      <li><code>Console.ReadLine()</code> - Reads a line of text</li>
      <li><code>Console.ReadKey()</code> - Reads a key press</li>
    </ul>

    <h4>String Formatting</h4>
    <p>C# provides several ways to format strings for output:</p>
    <ul>
      <li>String interpolation: <code>$"Hello {name}"</code></li>
      <li>Composite formatting: <code>string.Format("Hello {0}", name)</code></li>
      <li>String concatenation: <code>"Hello " + name</code></li>
    </ul>
  `,
  codeExample: `// Console Output Examples
Console.Write("Enter your name: ");
string name = Console.ReadLine();

Console.WriteLine($"Hello, {name}!");
Console.WriteLine("Welcome to C# programming.");

// Formatted Output
int age = 25;
double height = 5.9;
Console.WriteLine("Name: {0}, Age: {1}, Height: {2:F1}", name, age, height);

// String Interpolation (C# 6.0+)
Console.WriteLine($"Name: {name}, Age: {age}, Height: {height:F1}");

// Reading Different Data Types
Console.Write("Enter your age: ");
int userAge = Convert.ToInt32(Console.ReadLine());

Console.Write("Enter your salary: ");
double salary = Convert.ToDouble(Console.ReadLine());

// Reading Key Press
Console.WriteLine("Press any key to continue...");
Console.ReadKey();`,
  keyPoints: [
    'Use Console.WriteLine() for output with automatic newline',
    'Use Console.ReadLine() to read user input as string',
    'Convert strings to other data types using Convert.ToXxx() methods',
    'String interpolation ($) is the modern way to format strings',
    'Console.ReadKey() can be used to pause program execution',
  ],
  exercise:
    "Create a program that asks for user's name, age, and favorite color, then displays a personalized message using string interpolation.",
};
