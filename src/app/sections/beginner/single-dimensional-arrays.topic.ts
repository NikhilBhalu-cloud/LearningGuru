import { Topic } from '../../models/section';

export const singleDimensionalArraysTopic: Topic = {
  id: 'arrays-single-dimensional',
  name: 'Single-dimensional Arrays',
  sectionId: 'beginner',
  slug: 'single-dimensional-arrays',
  explanation: `
    <h3>Single-dimensional Arrays</h3>
    <p>Arrays are fixed-size collections of elements of the same type stored in contiguous memory locations.</p>

    <h4>Array Declaration</h4>
    <pre><code>// Declaration syntax
dataType[] arrayName;

// Examples
int[] numbers;
string[] names;
double[] prices;</code></pre>

    <h4>Array Initialization</h4>
    <ul>
      <li><strong>Default initialization:</strong> <code>new int[5]</code> - creates array with default values</li>
      <li><strong>Size with values:</strong> <code>new int[] {1, 2, 3, 4, 5}</code></li>
      <li><strong>Implicit typing:</strong> <code>new[] {1, 2, 3, 4, 5}</code></li>
      <li><strong>Shortcut syntax:</strong> <code>int[] arr = {1, 2, 3, 4, 5}</code></li>
    </ul>

    <h4>Array Properties and Methods</h4>
    <ul>
      <li><code>Length</code> - Gets the number of elements</li>
      <li><code>Rank</code> - Gets the number of dimensions</li>
      <li><code>GetValue(index)</code> - Gets value at index</li>
      <li><code>SetValue(value, index)</code> - Sets value at index</li>
      <li><code>Clone()</code> - Creates a shallow copy</li>
    </ul>

    <h4>Array Indexing</h4>
    <p>Arrays are zero-based. First element is at index 0, last element at index Length-1.</p>

    <h4>Common Array Operations</h4>
    <ul>
      <li>Accessing elements: <code>array[index]</code></li>
      <li>Modifying elements: <code>array[index] = value</code></li>
      <li>Iterating with loops</li>
      <li>Searching and sorting</li>
    </ul>
  `,
  codeExample: `// Array declarations
int[] numbers;              // Declaration only
string[] names;             // Declaration only
double[] prices;            // Declaration only

// Array initialization with size
numbers = new int[5];       // Creates array with 5 elements, all 0
names = new string[3];      // Creates array with 3 elements, all null

// Array initialization with values
int[] scores = new int[] { 85, 92, 78, 95, 88 };
string[] fruits = new string[] { "Apple", "Banana", "Orange" };

// Shortcut initialization (without new)
int[] fibonacci = { 1, 1, 2, 3, 5, 8, 13 };
char[] vowels = { 'a', 'e', 'i', 'o', 'u' };

// Implicitly typed array
var mixedNumbers = new[] { 1, 2, 3, 4, 5 }; // Compiler infers int[]

// Accessing array elements
Console.WriteLine($"First score: {scores[0]}");      // 85
Console.WriteLine($"Last fruit: {fruits[2]}");       // Orange

// Modifying array elements
scores[2] = 82;  // Change 78 to 82
fruits[1] = "Grape";  // Change "Banana" to "Grape"

// Array properties
Console.WriteLine($"Scores array length: {scores.Length}");    // 5
Console.WriteLine($"Fruits array length: {fruits.Length}");     // 3

// Iterating through arrays with for loop
Console.WriteLine("Scores:");
for (int i = 0; i < scores.Length; i++) {
    Console.WriteLine($"Score {i + 1}: {scores[i]}");
}

// Iterating through arrays with foreach loop
Console.WriteLine("\\nFruits:");
foreach (string fruit in fruits) {
    Console.WriteLine(fruit);
}

// Array methods
Array.Sort(scores);  // Sort in ascending order
Console.WriteLine("\\nSorted scores:");
foreach (int score in scores) {
    Console.WriteLine(score);
}

Array.Reverse(scores);  // Reverse the array
Console.WriteLine("\\nReversed scores:");
foreach (int score in scores) {
    Console.WriteLine(score);
}

// Searching in arrays
int searchValue = 95;
int index = Array.IndexOf(scores, searchValue);
if (index != -1) {
    Console.WriteLine($"Found {searchValue} at index {index}");
} else {
    Console.WriteLine($"{searchValue} not found");
}

// Array copying
int[] sourceArray = { 1, 2, 3, 4, 5 };
int[] destinationArray = new int[5];

// Copy all elements
Array.Copy(sourceArray, destinationArray, sourceArray.Length);

// Copy specific range
int[] partialCopy = new int[3];
Array.Copy(sourceArray, 1, partialCopy, 0, 3);  // Copy elements 1, 2, 3

// Using Clone() method
int[] clonedArray = (int[])sourceArray.Clone();

// Array initialization patterns
int[] evenNumbers = new int[10];
for (int i = 0; i < evenNumbers.Length; i++) {
    evenNumbers[i] = (i + 1) * 2;  // 2, 4, 6, 8, ...
}

// Multi-dimensional array (preview for next topic)
int[,] matrix = new int[2, 3] { {1, 2, 3}, {4, 5, 6} };

// Common array operations
public void ArrayOperations() {
    int[] data = { 64, 12, 89, 23, 45, 78, 34 };

    // Find maximum value
    int max = data[0];
    foreach (int value in data) {
        if (value > max) max = value;
    }
    Console.WriteLine($"Maximum value: {max}");

    // Calculate sum and average
    int sum = 0;
    foreach (int value in data) {
        sum += value;
    }
    double average = (double)sum / data.Length;
    Console.WriteLine($"Sum: {sum}, Average: {average:F2}");

    // Count elements meeting a condition
    int countAbove50 = 0;
    foreach (int value in data) {
        if (value > 50) countAbove50++;
    }
    Console.WriteLine($"Values above 50: {countAbove50}");
}`,
  keyPoints: [
    'Arrays have fixed size set at creation time',
    'Array indexing starts at 0',
    'Use Length property to get array size',
    'Arrays can be initialized with values or size',
    'foreach loop is preferred for iteration when index not needed',
    'Array.Sort() and Array.Reverse() modify the original array',
    'Array.IndexOf() returns -1 if element not found',
    'Arrays are reference types, passed by reference to methods',
  ],
  exercise:
    'Create a program that reads 10 integers from user input, stores them in an array, then displays the array in reverse order, calculates the sum and average, and finds the largest and smallest values.',
};
