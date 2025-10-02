import { Topic } from '../../models/section';

export const multiDimensionalArraysTopic: Topic = {
  id: 'arrays-multi-dimensional',
  name: 'Multi-dimensional Arrays',
  sectionId: 'beginner',
  slug: 'multi-dimensional-arrays',
  explanation: `
    <h3>Multi-dimensional Arrays</h3>
    <p>Multi-dimensional arrays store data in multiple dimensions, like tables or matrices. C# supports rectangular arrays (fixed size in all dimensions) and jagged arrays (arrays of arrays).</p>

    <h4>Rectangular Arrays (2D)</h4>
    <pre><code>// Declaration
dataType[,] arrayName;

// Examples
int[,] matrix;
double[,] coordinates;

// Initialization
int[,] matrix = new int[3, 4];  // 3 rows, 4 columns
int[,] predefined = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};</code></pre>

    <h4>Rectangular Arrays (3D and higher)</h4>
    <pre><code>// 3D array
int[,,] cube = new int[2, 3, 4];  // 2 layers, 3 rows, 4 columns

// 4D array
int[,,,] hypercube = new int[2, 2, 2, 2];</code></pre>

    <h4>Jagged Arrays</h4>
    <p>Jagged arrays are arrays of arrays, where each sub-array can have different lengths:</p>
    <pre><code>// Declaration
dataType[][] arrayName;

// Examples
int[][] jaggedArray = new int[3][];  // Array of 3 int arrays
jaggedArray[0] = new int[2];          // First sub-array has 2 elements
jaggedArray[1] = new int[4];          // Second sub-array has 4 elements
jaggedArray[2] = new int[3];          // Third sub-array has 3 elements</code></pre>

    <h4>Accessing Elements</h4>
    <ul>
      <li><strong>Rectangular:</strong> <code>array[row, column]</code></li>
      <li><strong>3D:</strong> <code>array[layer, row, column]</code></li>
      <li><strong>Jagged:</strong> <code>array[row][column]</code></li>
    </ul>

    <h4>Properties and Methods</h4>
    <ul>
      <li><code>Length</code> - Total number of elements</li>
      <li><code>Rank</code> - Number of dimensions</li>
      <li><code>GetLength(dimension)</code> - Size of specific dimension</li>
      <li><code>GetUpperBound(dimension)</code> - Upper bound of dimension</li>
    </ul>
  `,
  codeExample: `// Rectangular 2D arrays
Console.WriteLine("=== Rectangular 2D Arrays ===");

// Declaration and initialization
int[,] matrix = new int[3, 4];  // 3 rows, 4 columns

// Initialize with values
int[,] predefinedMatrix = {
    {1, 2, 3, 4},
    {5, 6, 7, 8},
    {9, 10, 11, 12}
};

// Accessing elements
Console.WriteLine($"Element at [1,2]: {predefinedMatrix[1, 2]}");  // 7

// Modifying elements
predefinedMatrix[0, 0] = 99;
Console.WriteLine($"Modified [0,0]: {predefinedMatrix[0, 0]}");    // 99

// Array properties
Console.WriteLine($"Total elements: {predefinedMatrix.Length}");     // 12
Console.WriteLine($"Number of dimensions: {predefinedMatrix.Rank}"); // 2
Console.WriteLine($"Rows (dimension 0): {predefinedMatrix.GetLength(0)}"); // 3
Console.WriteLine($"Columns (dimension 1): {predefinedMatrix.GetLength(1)}"); // 4

// Iterating through 2D array
Console.WriteLine("\\nMatrix contents:");
for (int row = 0; row < predefinedMatrix.GetLength(0); row++) {
    for (int col = 0; col < predefinedMatrix.GetLength(1); col++) {
        Console.Write($"{predefinedMatrix[row, col],3} ");
    }
    Console.WriteLine();
}

// 3D arrays
Console.WriteLine("\\n=== 3D Arrays ===");
int[,,] cube = new int[2, 3, 4];  // 2 layers, 3 rows, 4 columns

// Initialize 3D array
int value = 1;
for (int layer = 0; layer < cube.GetLength(0); layer++) {
    for (int row = 0; row < cube.GetLength(1); row++) {
        for (int col = 0; col < cube.GetLength(2); col++) {
            cube[layer, row, col] = value++;
        }
    }
}

Console.WriteLine($"3D array dimensions: {cube.Rank}D");
Console.WriteLine($"Total elements: {cube.Length}");
Console.WriteLine($"Element [1,2,3]: {cube[1, 2, 3]}");

// Jagged arrays
Console.WriteLine("\\n=== Jagged Arrays ===");

// Declaration
int[][] jaggedArray = new int[4][];  // Array of 4 int arrays

// Initialize sub-arrays with different lengths
jaggedArray[0] = new int[] { 1, 2 };
jaggedArray[1] = new int[] { 3, 4, 5, 6 };
jaggedArray[2] = new int[] { 7, 8, 9 };
jaggedArray[3] = new int[] { 10 };

// Shortcut initialization
double[][] jaggedPrices = {
    new double[] { 1.99, 2.99 },
    new double[] { 5.99, 6.99, 7.99 },
    new double[] { 10.99 }
};

// Accessing jagged array elements
Console.WriteLine($"jaggedArray[1][2]: {jaggedArray[1][2]}");  // 5
Console.WriteLine($"jaggedArray[3][0]: {jaggedArray[3][0]}");  // 10

// Iterating through jagged array
Console.WriteLine("\\nJagged array contents:");
for (int i = 0; i < jaggedArray.Length; i++) {
    Console.Write($"Row {i}: ");
    for (int j = 0; j < jaggedArray[i].Length; j++) {
        Console.Write($"{jaggedArray[i][j]} ");
    }
    Console.WriteLine();
}

// Practical examples
Console.WriteLine("\\n=== Practical Examples ===");

// Tic-tac-toe board (3x3)
char[,] ticTacToe = new char[3, 3] {
    {'X', 'O', 'X'},
    {'O', 'X', 'O'},
    {'X', ' ', 'O'}
};

Console.WriteLine("Tic-Tac-Toe Board:");
for (int row = 0; row < 3; row++) {
    for (int col = 0; col < 3; col++) {
        Console.Write($"{ticTacToe[row, col]} ");
    }
    Console.WriteLine();
}

// Student grades (students x subjects)
int[,] grades = new int[3, 4];  // 3 students, 4 subjects
string[] subjects = { "Math", "Science", "English", "History" };
string[] students = { "Alice", "Bob", "Charlie" };

// Initialize with random grades
Random random = new Random();
for (int student = 0; student < grades.GetLength(0); student++) {
    for (int subject = 0; subject < grades.GetLength(1); subject++) {
        grades[student, subject] = random.Next(60, 101);  // 60-100
    }
}

Console.WriteLine("\\nStudent Grades:");
Console.Write("Student\\t");
foreach (string subject in subjects) {
    Console.Write($"{subject}\\t");
}
Console.WriteLine("Average");

for (int student = 0; student < grades.GetLength(0); student++) {
    Console.Write($"{students[student]}\\t");
    int sum = 0;
    for (int subject = 0; subject < grades.GetLength(1); subject++) {
        Console.Write($"{grades[student, subject]}\\t");
        sum += grades[student, subject];
    }
    double average = (double)sum / grades.GetLength(1);
    Console.WriteLine($"{average:F1}");
}

// Working with jagged arrays for different-sized data
Console.WriteLine("\\n=== Jagged Array Example: Shopping Lists ===");
string[][] shoppingLists = new string[3][];

shoppingLists[0] = new string[] { "Milk", "Bread", "Eggs" };
shoppingLists[1] = new string[] { "Apples", "Bananas", "Oranges", "Grapes" };
shoppingLists[2] = new string[] { "Chicken", "Rice", "Vegetables", "Spices", "Oil" };

string[] listNames = { "Basic Groceries", "Fruits", "Dinner Ingredients" };

for (int i = 0; i < shoppingLists.Length; i++) {
    Console.WriteLine($"{listNames[i]}:");
    foreach (string item in shoppingLists[i]) {
        Console.WriteLine($"  - {item}");
    }
    Console.WriteLine();
}

// Array methods work on multi-dimensional arrays too
Console.WriteLine("Array operations on 2D array:");
int[] flatArray = new int[predefinedMatrix.Length];
Buffer.BlockCopy(predefinedMatrix, 0, flatArray, 0, predefinedMatrix.Length * sizeof(int));
Array.Sort(flatArray);
Console.WriteLine("Sorted flattened array: " + string.Join(", ", flatArray));`,
  keyPoints: [
    'Rectangular arrays have fixed size in all dimensions',
    'Jagged arrays are arrays of arrays with potentially different sub-array lengths',
    'Use GetLength(dimension) to get size of specific dimension',
    'Rank property gives number of dimensions',
    'Nested loops are needed to iterate through multi-dimensional arrays',
    'Jagged arrays use [][] syntax, rectangular use [,] syntax',
    'Choose rectangular for matrices, jagged for variable-sized sub-arrays',
  ],
  exercise:
    'Create a program that implements a simple tic-tac-toe game using a 2D array for the board. Include functions to display the board, check for wins, and handle player moves. Also create a jagged array to store different student groups with varying numbers of students.',
};
