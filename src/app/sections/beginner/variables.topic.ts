import { Topic } from '../../models/section';

export const variablesTopic: Topic = {
  id: 'basics-variables',
  name: 'Variables, Constants, and Data Types',
  sectionId: 'beginner',
  slug: 'variables',
  explanation: `
    <h3>Variables</h3>
    <p>Variables are containers for storing data values. In C#, you declare variables with a specific data type.</p>

    <h3>Constants</h3>
    <p>Constants are immutable values that cannot be changed after declaration. Use the <code>const</code> or <code>readonly</code> keyword.</p>

    <h3>Data Types</h3>
    <ul>
      <li><strong>Value Types:</strong> int, double, float, decimal, bool, char, byte, short, long</li>
      <li><strong>Reference Types:</strong> string, object, arrays, classes</li>
      <li><strong>Nullable Types:</strong> int?, double?, etc.</li>
    </ul>
  `,
  codeExample: `// Variable declarations
int age = 25;
double price = 19.99;
string name = "John Doe";
bool isActive = true;
char grade = 'A';

// Constants
const double PI = 3.14159;
const string APP_NAME = "LearningGuru";

// Nullable types
int? nullableAge = null;

// Type inference with var
var inferredInt = 10;        // Compiler infers int
var inferredString = "Hello"; // Compiler infers string

// Multiple variable declarations
int x = 5, y = 10, z = 15;

Console.WriteLine($"Name: {name}, Age: {age}, Price: {price:C}");`,
  keyPoints: [
    'Variables must be declared with a data type',
    'Constants are declared with const or readonly keywords',
    'C# is a strongly-typed language',
    'Use var for type inference when type is obvious',
    'Nullable types allow null values for value types',
    'Choose appropriate data types for memory efficiency',
  ],
  exercise:
    'Create variables for storing student information: name, age, grade, GPA, and enrollment status. Use appropriate data types for each.',
};
