import { Topic } from '../../models/section';

export const ifStatementsTopic: Topic = {
  id: 'control-flow-if',
  name: 'if, if-else, and Nested if Statements',
  sectionId: 'beginner',
  slug: 'if-statements',
  explanation: `
    <h3>Conditional Statements</h3>
    <p>Conditional statements allow your program to make decisions based on conditions. The most basic conditional statement is the <code>if</code> statement.</p>

    <h4>if Statement</h4>
    <p>Executes a block of code if a condition is true:</p>
    <pre><code>if (condition) {
    // code to execute if condition is true
}</code></pre>

    <h4>if-else Statement</h4>
    <p>Executes one block if condition is true, another if false:</p>
    <pre><code>if (condition) {
    // code if true
} else {
    // code if false
}</code></pre>

    <h4>if-else if-else Statement</h4>
    <p>Tests multiple conditions in sequence:</p>
    <pre><code>if (condition1) {
    // code if condition1 is true
} else if (condition2) {
    // code if condition2 is true
} else {
    // code if all conditions are false
}</code></pre>

    <h4>Nested if Statements</h4>
    <p>An if statement inside another if statement:</p>
    <pre><code>if (outerCondition) {
    if (innerCondition) {
        // code when both conditions are true
    }
}</code></pre>

    <h4>Boolean Expressions</h4>
    <p>Conditions use comparison and logical operators:</p>
    <ul>
      <li><code>==</code> equal to</li>
      <li><code>!=</code> not equal to</li>
      <li><code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> comparison operators</li>
      <li><code>&amp;&amp;</code> logical AND</li>
      <li><code>||</code> logical OR</li>
      <li><code>!</code> logical NOT</li>
    </ul>
  `,
  codeExample: `// Simple if statement
int age = 18;
if (age >= 18) {
    Console.WriteLine("You are an adult.");
}

// if-else statement
bool isRaining = true;
if (isRaining) {
    Console.WriteLine("Take an umbrella.");
} else {
    Console.WriteLine("Enjoy the weather!");
}

// if-else if-else chain
int score = 85;
if (score >= 90) {
    Console.WriteLine("Grade: A");
} else if (score >= 80) {
    Console.WriteLine("Grade: B");
} else if (score >= 70) {
    Console.WriteLine("Grade: C");
} else if (score >= 60) {
    Console.WriteLine("Grade: D");
} else {
    Console.WriteLine("Grade: F");
}

// Nested if statements
int temperature = 75;
bool isSunny = true;

if (temperature > 70) {
    if (isSunny) {
        Console.WriteLine("Perfect weather for outdoor activities!");
    } else {
        Console.WriteLine("Warm but cloudy.");
    }
} else {
    Console.WriteLine("It's cooler today.");
}

// Complex conditions with logical operators
int x = 10, y = 20, z = 30;
if (x < y && y < z) {
    Console.WriteLine("Numbers are in ascending order.");
}

if (x > 5 || y > 25) {
    Console.WriteLine("At least one condition is true.");
}

// Using boolean variables
bool hasPermission = true;
bool isLoggedIn = false;

if (hasPermission && isLoggedIn) {
    Console.WriteLine("Access granted.");
} else {
    Console.WriteLine("Access denied.");
}`,
  keyPoints: [
    'if statements execute code when condition is true',
    'else clause executes when if condition is false',
    'else if chains multiple conditions',
    'Nested if statements test multiple levels of conditions',
    'Conditions use comparison (==, !=, <, >) and logical (&&, ||, !) operators',
    'Use parentheses for complex conditions',
    'Boolean variables can be used directly in conditions',
  ],
  exercise:
    'Write a program that determines if a year is a leap year using nested if statements and logical operators.',
};
