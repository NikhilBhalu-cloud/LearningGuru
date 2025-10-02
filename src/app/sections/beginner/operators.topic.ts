import { Topic } from '../../models/section';

export const operatorsTopic: Topic = {
  id: 'basics-operators',
  name: 'Operators: Arithmetic, Comparison, Logical, Assignment',
  sectionId: 'beginner',
  slug: 'operators',
  explanation: `
    <h3>Arithmetic Operators</h3>
    <p>Used for mathematical calculations: +, -, *, /, % (modulus)</p>

    <h3>Comparison Operators</h3>
    <p>Used to compare values: ==, !=, >, <, >=, <=</p>

    <h3>Logical Operators</h3>
    <p>Used for logical operations: && (AND), || (OR), ! (NOT)</p>

    <h3>Assignment Operators</h3>
    <p>Used to assign values: =, +=, -=, *=, /=, %=, ++, --</p>
  `,
  codeExample: `// Arithmetic Operators
int a = 10, b = 3;
int sum = a + b;           // 13
int difference = a - b;    // 7
int product = a * b;       // 30
int quotient = a / b;      // 3
int remainder = a % b;     // 1

// Comparison Operators
bool isEqual = (a == b);        // false
bool isNotEqual = (a != b);     // true
bool isGreater = (a > b);       // true
bool isLessOrEqual = (a <= b);  // false

// Logical Operators
bool result1 = (a > 5) && (b < 5);  // true (both conditions true)
bool result2 = (a < 5) || (b < 5);  // true (at least one true)
bool result3 = !(a > b);            // false (negation)

// Assignment Operators
int x = 10;
x += 5;    // x = x + 5 = 15
x -= 3;    // x = x - 3 = 12
x *= 2;    // x = x * 2 = 24
x /= 4;    // x = x / 4 = 6
x++;       // x = x + 1 = 7
x--;       // x = x - 1 = 6

// Ternary Operator
int max = (a > b) ? a : b;  // Returns a if a > b, else returns b

Console.WriteLine($"Sum: {sum}, Max: {max}, Result: {result1}");`,
  keyPoints: [
    'Arithmetic operators follow standard mathematical precedence',
    'Comparison operators return boolean values',
    'Logical operators are short-circuited (evaluation stops when result is determined)',
    'Assignment operators provide shorthand for common operations',
    'Increment (++) and decrement (--) have prefix and postfix forms',
    'Ternary operator (?:) is a compact if-else statement',
  ],
  exercise:
    'Write a program that takes two numbers and performs all arithmetic operations, then uses comparison operators to determine which is larger.',
};
