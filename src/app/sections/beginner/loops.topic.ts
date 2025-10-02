import { Topic } from '../../models/section';

export const loopsTopic: Topic = {
  id: 'control-flow-loops',
  name: 'Loops: for, while, do-while, foreach',
  sectionId: 'beginner',
  slug: 'loops',
  explanation: `
    <h3>Loops in C#</h3>
    <p>Loops allow you to execute a block of code repeatedly. C# provides several types of loops for different scenarios.</p>

    <h4>for Loop</h4>
    <p>Best when you know exactly how many times to iterate:</p>
    <pre><code>for (initialization; condition; increment) {
    // code to repeat
}</code></pre>

    <h4>while Loop</h4>
    <p>Executes while a condition is true. Condition is checked before each iteration:</p>
    <pre><code>while (condition) {
    // code to repeat
}</code></pre>

    <h4>do-while Loop</h4>
    <p>Similar to while, but condition is checked after each iteration (guaranteed to run at least once):</p>
    <pre><code>do {
    // code to repeat
} while (condition);</code></pre>

    <h4>foreach Loop</h4>
    <p>Iterates over collections and arrays. Cannot modify the collection during iteration:</p>
    <pre><code>foreach (var item in collection) {
    // code for each item
}</code></pre>

    <h4>Loop Control Statements</h4>
    <ul>
      <li><code>break</code> - Exits the loop immediately</li>
      <li><code>continue</code> - Skips current iteration and continues with next</li>
      <li><code>return</code> - Exits the method containing the loop</li>
    </ul>

    <h4>Nested Loops</h4>
    <p>Loops can be nested inside other loops for multi-dimensional iteration.</p>
  `,
  codeExample: `// for loop - counting from 1 to 5
Console.WriteLine("for loop:");
for (int i = 1; i <= 5; i++) {
    Console.WriteLine($"Count: {i}");
}

// for loop - iterating backwards
Console.WriteLine("\\nBackwards:");
for (int i = 10; i >= 1; i--) {
    Console.WriteLine($"Count: {i}");
}

// while loop - simple counter
Console.WriteLine("\\nwhile loop:");
int counter = 1;
while (counter <= 5) {
    Console.WriteLine($"Counter: {counter}");
    counter++;
}

// while loop with user input
Console.Write("\\nEnter numbers (0 to stop): ");
int sum = 0;
int number;
while (int.TryParse(Console.ReadLine(), out number) && number != 0) {
    sum += number;
    Console.Write("Enter another number (0 to stop): ");
}
Console.WriteLine($"Sum: {sum}");

// do-while loop - always executes at least once
Console.WriteLine("\\ndo-while loop:");
int choice;
do {
    Console.WriteLine("Menu:");
    Console.WriteLine("1. Option 1");
    Console.WriteLine("2. Option 2");
    Console.WriteLine("0. Exit");
    Console.Write("Choose: ");
} while (!int.TryParse(Console.ReadLine(), out choice) || choice < 0 || choice > 2);

// foreach loop with array
Console.WriteLine("\\nforeach with array:");
int[] numbers = { 10, 20, 30, 40, 50 };
foreach (int num in numbers) {
    Console.WriteLine($"Number: {num}");
}

// foreach with List
Console.WriteLine("\\nforeach with List:");
List<string> fruits = new List<string> { "Apple", "Banana", "Orange" };
foreach (string fruit in fruits) {
    Console.WriteLine($"Fruit: {fruit}");
}

// foreach with string (iterates over characters)
Console.WriteLine("\\nforeach with string:");
string text = "Hello";
foreach (char c in text) {
    Console.WriteLine($"Character: {c}");
}

// Nested loops - multiplication table
Console.WriteLine("\\nMultiplication Table:");
for (int i = 1; i <= 3; i++) {
    for (int j = 1; j <= 3; j++) {
        Console.Write($"{i * j}\\t");
    }
    Console.WriteLine();
}

// break and continue examples
Console.WriteLine("\\nbreak and continue:");
for (int i = 1; i <= 10; i++) {
    if (i == 5) {
        Console.WriteLine("Breaking at 5");
        break; // Exit loop completely
    }
    if (i % 2 == 0) {
        continue; // Skip even numbers
    }
    Console.WriteLine($"Odd number: {i}");
}

// Infinite loop prevention
Console.WriteLine("\\nInfinite loop (with break):");
int attempts = 0;
while (true) {
    attempts++;
    Console.WriteLine($"Attempt {attempts}");

    if (attempts >= 3) {
        Console.WriteLine("Breaking out of infinite loop");
        break;
    }
}`,
  keyPoints: [
    'for loops are best when you know the number of iterations',
    'while loops check condition before each iteration',
    'do-while loops always execute at least once',
    'foreach loops iterate over collections without indexing',
    'break exits the loop immediately',
    'continue skips to the next iteration',
    'Nested loops create multi-dimensional iteration',
    'Be careful to avoid infinite loops',
  ],
  exercise:
    'Write a program that prints a triangle pattern using nested loops, then creates a simple number guessing game using a while loop with input validation.',
};
