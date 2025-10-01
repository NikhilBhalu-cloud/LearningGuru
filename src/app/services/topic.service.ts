import { Injectable } from '@angular/core';
import { Topic } from '../models/topic';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  private topics: Topic[] = [
    // Basics - Variables, Constants, Data Types
    {
      id: 'basics-variables',
      name: 'Variables, Constants, and Data Types',
      section: 'Beginner',
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
        'Choose appropriate data types for memory efficiency'
      ],
      exercise: 'Create variables for storing student information: name, age, grade, GPA, and enrollment status. Use appropriate data types for each.'
    },

    // Operators
    {
      id: 'basics-operators',
      name: 'Operators: Arithmetic, Comparison, Logical, Assignment',
      section: 'Beginner',
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
        'Ternary operator (?:) is a compact if-else statement'
      ],
      exercise: 'Write a program that takes two numbers and performs all arithmetic operations, then uses comparison operators to determine which is larger.'
    },

    // Type Conversion and Casting
    {
      id: 'basics-type-conversion',
      name: 'Type Conversion and Casting',
      section: 'Beginner',
      explanation: `
        <h3>Implicit Conversion</h3>
        <p>Automatic conversion from smaller to larger data types (no data loss).</p>
        
        <h3>Explicit Conversion (Casting)</h3>
        <p>Manual conversion that may result in data loss. Requires explicit cast operator.</p>
        
        <h3>Helper Methods</h3>
        <p>Convert class provides methods like ToInt32(), ToDouble(), ToString(), etc.</p>
        
        <h3>Parse and TryParse</h3>
        <p>Methods to convert strings to numeric types.</p>
      `,
      codeExample: `// Implicit Conversion (automatic)
int numInt = 100;
long numLong = numInt;      // int to long
float numFloat = numInt;    // int to float
double numDouble = numFloat; // float to double

// Explicit Conversion (casting)
double doubleNum = 123.456;
int intNum = (int)doubleNum;  // Result: 123 (decimal part lost)

long longNum = 1000000;
int castInt = (int)longNum;   // May lose data if value too large

// Using Convert class
string strNumber = "123";
int converted1 = Convert.ToInt32(strNumber);
double converted2 = Convert.ToDouble("45.67");
bool converted3 = Convert.ToBoolean("true");
string converted4 = Convert.ToString(123);

// Parse methods
string str1 = "100";
int parsed1 = int.Parse(str1);
double parsed2 = double.Parse("3.14");

// TryParse (safer - returns bool indicating success)
string input = "456";
int result;
bool success = int.TryParse(input, out result);
if (success)
{
    Console.WriteLine($"Converted: {result}");
}
else
{
    Console.WriteLine("Conversion failed");
}

// ToString method
int number = 42;
string numberStr = number.ToString();
string formatted = number.ToString("N2"); // Format with 2 decimal places

Console.WriteLine($"Converted: {converted1}, Parsed: {parsed1}, Formatted: {formatted}");`,
      keyPoints: [
        'Implicit conversion happens automatically when no data loss occurs',
        'Explicit casting is required when converting from larger to smaller types',
        'Always use TryParse when converting user input to avoid exceptions',
        'Convert class provides comprehensive conversion methods',
        'Parse methods throw exceptions if conversion fails',
        'ToString() method is available on all types'
      ],
      exercise: 'Create a program that reads a string input, tries to convert it to different data types using TryParse, and displays the results.'
    },

    // Console Input/Output
    {
      id: 'basics-console-io',
      name: 'Console Input/Output',
      section: 'Beginner',
      explanation: `
        <h3>Console Output</h3>
        <p>Console.WriteLine() writes text followed by a line break. Console.Write() writes without line break.</p>
        
        <h3>Console Input</h3>
        <p>Console.ReadLine() reads a line of text from user input.</p>
        
        <h3>String Formatting</h3>
        <p>String interpolation ($"..."), composite formatting, and format specifiers.</p>
      `,
      codeExample: `// Basic Output
Console.WriteLine("Hello, World!");
Console.Write("This is ");
Console.WriteLine("on the same line");

// String Interpolation
string name = "Alice";
int age = 30;
Console.WriteLine($"Name: {name}, Age: {age}");

// Composite Formatting
Console.WriteLine("Name: {0}, Age: {1}", name, age);

// Format Specifiers
double price = 49.99;
Console.WriteLine($"Price: {price:C}");        // Currency: $49.99
Console.WriteLine($"Price: {price:F2}");       // Fixed-point: 49.99
Console.WriteLine($"Percentage: {0.85:P}");    // Percentage: 85.00%

// Console Input
Console.Write("Enter your name: ");
string userName = Console.ReadLine();

Console.Write("Enter your age: ");
string ageInput = Console.ReadLine();
int userAge = int.Parse(ageInput);

// Safe input with TryParse
Console.Write("Enter a number: ");
string input = Console.ReadLine();
if (int.TryParse(input, out int number))
{
    Console.WriteLine($"You entered: {number}");
}
else
{
    Console.WriteLine("Invalid number!");
}

// Reading characters
Console.Write("Press any key: ");
ConsoleKeyInfo keyInfo = Console.ReadKey();
Console.WriteLine($"\nYou pressed: {keyInfo.Key}");

// Colored output
Console.ForegroundColor = ConsoleColor.Green;
Console.WriteLine("Success!");
Console.ResetColor();

Console.WriteLine($"Welcome {userName}, you are {userAge} years old!");`,
      keyPoints: [
        'Console.WriteLine() adds a new line, Console.Write() does not',
        'String interpolation ($"") is the modern way to format strings',
        'Console.ReadLine() returns string - convert to other types as needed',
        'Always validate user input before using it',
        'Use format specifiers for currency, percentages, and decimal places',
        'Console.ReadKey() is useful for pausing execution'
      ],
      exercise: 'Create a simple calculator that reads two numbers and an operator from the user, then displays the result.'
    },

    // Comments and Documentation
    {
      id: 'basics-comments',
      name: 'Comments and Documentation',
      section: 'Beginner',
      explanation: `
        <h3>Single-line Comments</h3>
        <p>Use // for single-line comments.</p>
        
        <h3>Multi-line Comments</h3>
        <p>Use /* */ for comments spanning multiple lines.</p>
        
        <h3>XML Documentation Comments</h3>
        <p>Use /// for documenting classes, methods, and properties. Enables IntelliSense.</p>
      `,
      codeExample: `// Single-line comment
// This is a comment explaining the next line
int x = 10; // You can also add comments at the end of a line

/*
 * Multi-line comment
 * This comment spans
 * multiple lines
 */
int y = 20;

/// <summary>
/// Calculates the sum of two integers.
/// </summary>
/// <param name="a">The first integer</param>
/// <param name="b">The second integer</param>
/// <returns>The sum of a and b</returns>
/// <example>
/// <code>
/// int result = Add(5, 3); // Returns 8
/// </code>
/// </example>
public int Add(int a, int b)
{
    return a + b;
}

/// <summary>
/// Represents a student in the system.
/// </summary>
public class Student
{
    /// <summary>
    /// Gets or sets the student's name.
    /// </summary>
    public string Name { get; set; }
    
    /// <summary>
    /// Gets or sets the student's age.
    /// </summary>
    public int Age { get; set; }
}

// TODO: Implement error handling
// FIXME: This calculation might overflow for large numbers
// NOTE: This is optimized for performance

// Good practice: Write self-documenting code
int studentCount = 50; // Clear variable name
CalculateAverageScore(); // Clear method name

Console.WriteLine("Comments help explain complex logic!");`,
      keyPoints: [
        'Use comments to explain WHY, not WHAT (code should be self-explanatory)',
        'XML documentation comments enable IntelliSense and auto-generated documentation',
        'Use TODO, FIXME, NOTE for special markers',
        'Keep comments up-to-date with code changes',
        'Write self-documenting code with clear names',
        'Avoid over-commenting obvious code'
      ],
      exercise: 'Write a class with at least three methods and add proper XML documentation comments to each.'
    },

    // Control Flow - if, if-else, nested if
    {
      id: 'control-if-else',
      name: 'if, if-else, and nested if statements',
      section: 'Beginner',
      explanation: `
        <h3>if Statement</h3>
        <p>Executes a block of code if a condition is true.</p>
        
        <h3>if-else Statement</h3>
        <p>Executes one block if condition is true, another if false.</p>
        
        <h3>else if</h3>
        <p>Tests multiple conditions in sequence.</p>
        
        <h3>Nested if</h3>
        <p>if statements inside other if statements.</p>
      `,
      codeExample: `// Simple if statement
int age = 20;
if (age >= 18)
{
    Console.WriteLine("You are an adult");
}

// if-else statement
int score = 75;
if (score >= 60)
{
    Console.WriteLine("Pass");
}
else
{
    Console.WriteLine("Fail");
}

// else if (multiple conditions)
if (score >= 90)
{
    Console.WriteLine("Grade: A");
}
else if (score >= 80)
{
    Console.WriteLine("Grade: B");
}
else if (score >= 70)
{
    Console.WriteLine("Grade: C");
}
else if (score >= 60)
{
    Console.WriteLine("Grade: D");
}
else
{
    Console.WriteLine("Grade: F");
}

// Nested if statements
int temperature = 30;
bool isRaining = false;

if (temperature > 25)
{
    if (isRaining)
    {
        Console.WriteLine("It's warm but raining - bring an umbrella");
    }
    else
    {
        Console.WriteLine("It's a nice warm day");
    }
}
else
{
    if (isRaining)
    {
        Console.WriteLine("It's cold and raining - stay inside");
    }
    else
    {
        Console.WriteLine("It's cold - wear a jacket");
    }
}

// Compound conditions
int x = 10, y = 20, z = 30;
if (x < y && y < z)
{
    Console.WriteLine("Numbers are in ascending order");
}

// Ternary operator (shorthand if-else)
string status = (age >= 18) ? "Adult" : "Minor";
Console.WriteLine($"Status: {status}");`,
      keyPoints: [
        'Use curly braces {} even for single statements for better readability',
        'Conditions must evaluate to boolean (true/false)',
        'else if allows testing multiple conditions',
        'Order matters in else if chains - first true condition executes',
        'Avoid deeply nested if statements - consider refactoring',
        'Use logical operators (&&, ||, !) for compound conditions'
      ],
      exercise: 'Write a program that determines if a year is a leap year using nested if statements.'
    },

    // Switch Statements
    {
      id: 'control-switch',
      name: 'switch statements',
      section: 'Beginner',
      explanation: `
        <h3>switch Statement</h3>
        <p>Tests a variable against multiple cases. More readable than multiple if-else for many conditions.</p>
        
        <h3>case Labels</h3>
        <p>Each case represents a possible value of the expression.</p>
        
        <h3>break Statement</h3>
        <p>Exits the switch block. Required in C# (unlike C++).</p>
        
        <h3>default Case</h3>
        <p>Executes if no case matches (optional but recommended).</p>
      `,
      codeExample: `// Basic switch statement
int dayNumber = 3;
switch (dayNumber)
{
    case 1:
        Console.WriteLine("Monday");
        break;
    case 2:
        Console.WriteLine("Tuesday");
        break;
    case 3:
        Console.WriteLine("Wednesday");
        break;
    case 4:
        Console.WriteLine("Thursday");
        break;
    case 5:
        Console.WriteLine("Friday");
        break;
    case 6:
        Console.WriteLine("Saturday");
        break;
    case 7:
        Console.WriteLine("Sunday");
        break;
    default:
        Console.WriteLine("Invalid day number");
        break;
}

// Multiple cases with same result
char grade = 'B';
switch (grade)
{
    case 'A':
    case 'a':
        Console.WriteLine("Excellent!");
        break;
    case 'B':
    case 'b':
        Console.WriteLine("Good job!");
        break;
    case 'C':
    case 'c':
        Console.WriteLine("Fair");
        break;
    case 'D':
    case 'd':
        Console.WriteLine("Needs improvement");
        break;
    case 'F':
    case 'f':
        Console.WriteLine("Failed");
        break;
    default:
        Console.WriteLine("Invalid grade");
        break;
}

// Switch with string
string fruit = "apple";
switch (fruit.ToLower())
{
    case "apple":
        Console.WriteLine("An apple a day keeps the doctor away");
        break;
    case "banana":
        Console.WriteLine("Bananas are rich in potassium");
        break;
    case "orange":
        Console.WriteLine("Oranges are rich in Vitamin C");
        break;
    default:
        Console.WriteLine("Unknown fruit");
        break;
}

// Switch expression (C# 8.0+)
string dayType = dayNumber switch
{
    1 or 2 or 3 or 4 or 5 => "Weekday",
    6 or 7 => "Weekend",
    _ => "Invalid day"
};
Console.WriteLine($"Day type: {dayType}");`,
      keyPoints: [
        'switch is more readable than multiple if-else for many conditions',
        'break is required in C# (prevents fall-through)',
        'Multiple cases can share the same code block',
        'default case handles unmatched values',
        'switch works with int, char, string, enum types',
        'Switch expressions (C# 8.0+) provide more concise syntax'
      ],
      exercise: 'Create a simple calculator using switch statement that takes two numbers and an operator (+, -, *, /) and displays the result.'
    },

    // Loops
    {
      id: 'control-loops',
      name: 'Loops: for, while, do-while, foreach',
      section: 'Beginner',
      explanation: `
        <h3>for Loop</h3>
        <p>Used when the number of iterations is known.</p>
        
        <h3>while Loop</h3>
        <p>Executes while a condition is true. Condition checked before execution.</p>
        
        <h3>do-while Loop</h3>
        <p>Executes at least once, then checks condition.</p>
        
        <h3>foreach Loop</h3>
        <p>Iterates through collections and arrays.</p>
      `,
      codeExample: `// for loop
Console.WriteLine("for loop:");
for (int i = 1; i <= 5; i++)
{
    Console.WriteLine($"Iteration {i}");
}

// Nested for loop
Console.WriteLine("\nMultiplication table:");
for (int i = 1; i <= 3; i++)
{
    for (int j = 1; j <= 3; j++)
    {
        Console.Write($"{i * j}\t");
    }
    Console.WriteLine();
}

// while loop
Console.WriteLine("\nwhile loop:");
int count = 1;
while (count <= 5)
{
    Console.WriteLine($"Count: {count}");
    count++;
}

// do-while loop (executes at least once)
Console.WriteLine("\ndo-while loop:");
int num = 1;
do
{
    Console.WriteLine($"Number: {num}");
    num++;
} while (num <= 5);

// foreach loop with array
Console.WriteLine("\nforeach loop:");
string[] fruits = { "Apple", "Banana", "Orange", "Mango" };
foreach (string fruit in fruits)
{
    Console.WriteLine($"Fruit: {fruit}");
}

// Loop control statements
Console.WriteLine("\nLoop control:");
for (int i = 1; i <= 10; i++)
{
    if (i == 3)
        continue; // Skip this iteration
    
    if (i == 8)
        break; // Exit loop
    
    Console.WriteLine($"i = {i}");
}

// Infinite loop (use with caution!)
// while (true)
// {
//     // Must have break condition
//     break;
// }

Console.WriteLine("All loops completed!");`,
      keyPoints: [
        'Use for when iteration count is known',
        'Use while when iteration count depends on a condition',
        'do-while guarantees at least one execution',
        'foreach is best for iterating collections',
        'break exits the loop immediately',
        'continue skips to next iteration',
        'Avoid infinite loops - always have an exit condition'
      ],
      exercise: 'Write a program that uses loops to: 1) Print numbers 1-100, 2) Find all prime numbers between 1-50, 3) Calculate factorial of a number.'
    },

    // Methods
    {
      id: 'methods-basics',
      name: 'Method Declaration, Parameters, Return Types',
      section: 'Beginner',
      explanation: `
        <h3>Methods</h3>
        <p>Methods are reusable blocks of code that perform specific tasks.</p>
        
        <h3>Method Signature</h3>
        <p>Includes access modifier, return type, method name, and parameters.</p>
        
        <h3>Parameters</h3>
        <p>Values passed to methods. Can be required, optional, or params.</p>
        
        <h3>Return Types</h3>
        <p>void (no return value) or specific data type.</p>
      `,
      codeExample: `// Method with no parameters and void return
public void Greet()
{
    Console.WriteLine("Hello, World!");
}

// Method with parameters and return value
public int Add(int a, int b)
{
    return a + b;
}

// Method with multiple parameters
public double Calculate(double num1, double num2, char operation)
{
    switch (operation)
    {
        case '+': return num1 + num2;
        case '-': return num1 - num2;
        case '*': return num1 * num2;
        case '/': return num2 != 0 ? num1 / num2 : 0;
        default: return 0;
    }
}

// Method with optional parameters
public void DisplayInfo(string name, int age = 18, string city = "Unknown")
{
    Console.WriteLine($"Name: {name}, Age: {age}, City: {city}");
}

// Method with params keyword (variable number of arguments)
public int Sum(params int[] numbers)
{
    int total = 0;
    foreach (int num in numbers)
    {
        total += num;
    }
    return total;
}

// Method with out parameter
public void Divide(int dividend, int divisor, out int quotient, out int remainder)
{
    quotient = dividend / divisor;
    remainder = dividend % divisor;
}

// Method with ref parameter
public void Increment(ref int value)
{
    value++;
}

// Using the methods
Greet();
int sum = Add(5, 3);
double result = Calculate(10, 5, '+');
DisplayInfo("John");
DisplayInfo("Jane", 25);
DisplayInfo("Bob", 30, "New York");

int total = Sum(1, 2, 3, 4, 5);

Divide(17, 5, out int q, out int r);
Console.WriteLine($"Quotient: {q}, Remainder: {r}");

int x = 10;
Increment(ref x);
Console.WriteLine($"x = {x}"); // x is now 11

Console.WriteLine($"Sum: {sum}, Result: {result}, Total: {total}");`,
      keyPoints: [
        'Methods improve code reusability and organization',
        'Use descriptive method names (verbs for actions)',
        'Keep methods focused on a single task',
        'out parameters must be assigned before method returns',
        'ref parameters pass by reference, allowing modification',
        'params allows variable number of arguments',
        'Optional parameters must come after required parameters'
      ],
      exercise: 'Create methods for: 1) Checking if a number is prime, 2) Reversing a string, 3) Finding the maximum of three numbers.'
    },

    // Method Overloading
    {
      id: 'methods-overloading',
      name: 'Method Overloading',
      section: 'Beginner',
      explanation: `
        <h3>Method Overloading</h3>
        <p>Multiple methods with the same name but different parameters (number, type, or order).</p>
        
        <h3>Benefits</h3>
        <p>Provides flexibility and improves code readability by using the same method name for similar operations.</p>
        
        <h3>Rules</h3>
        <p>Methods must differ in parameter list. Return type alone is not enough.</p>
      `,
      codeExample: `// Method overloading examples
public class Calculator
{
    // Overloaded Add methods
    public int Add(int a, int b)
    {
        Console.WriteLine("Adding two integers");
        return a + b;
    }

    public double Add(double a, double b)
    {
        Console.WriteLine("Adding two doubles");
        return a + b;
    }

    public int Add(int a, int b, int c)
    {
        Console.WriteLine("Adding three integers");
        return a + b + c;
    }

    public string Add(string a, string b)
    {
        Console.WriteLine("Concatenating strings");
        return a + b;
    }

    // Overloaded Print methods
    public void Print(int value)
    {
        Console.WriteLine($"Integer: {value}");
    }

    public void Print(double value)
    {
        Console.WriteLine($"Double: {value:F2}");
    }

    public void Print(string value)
    {
        Console.WriteLine($"String: {value}");
    }

    public void Print(int[] values)
    {
        Console.WriteLine("Array: " + string.Join(", ", values));
    }

    // Overloaded Area calculation methods
    public double Area(double radius)
    {
        Console.WriteLine("Calculating circle area");
        return Math.PI * radius * radius;
    }

    public double Area(double length, double width)
    {
        Console.WriteLine("Calculating rectangle area");
        return length * width;
    }

    public double Area(double baseLength, double height, bool isTriangle)
    {
        Console.WriteLine("Calculating triangle area");
        return 0.5 * baseLength * height;
    }
}

// Using overloaded methods
Calculator calc = new Calculator();

int sum1 = calc.Add(5, 3);           // Calls Add(int, int)
double sum2 = calc.Add(5.5, 3.2);    // Calls Add(double, double)
int sum3 = calc.Add(1, 2, 3);        // Calls Add(int, int, int)
string combined = calc.Add("Hello", " World"); // Calls Add(string, string)

calc.Print(42);
calc.Print(3.14);
calc.Print("Test");
calc.Print(new int[] { 1, 2, 3, 4, 5 });

double circleArea = calc.Area(5.0);
double rectArea = calc.Area(4.0, 6.0);
double triArea = calc.Area(3.0, 4.0, true);

Console.WriteLine($"Circle: {circleArea:F2}, Rectangle: {rectArea}, Triangle: {triArea}");`,
      keyPoints: [
        'Method overloading provides multiple implementations of the same operation',
        'Overloaded methods must differ in parameter list (count, type, or order)',
        'Return type alone cannot distinguish overloaded methods',
        'Compiler chooses the best match based on arguments',
        'Improves code readability and API design',
        'Common in constructors and utility methods'
      ],
      exercise: 'Create an overloaded method called "Display" that can handle different data types: int, string, array, and object.'
    },

    // Arrays and Strings
    {
      id: 'arrays-basics',
      name: 'Single-dimensional and Multi-dimensional Arrays',
      section: 'Beginner',
      explanation: `
        <h3>Single-dimensional Arrays</h3>
        <p>Collection of elements of the same type, stored in contiguous memory.</p>
        
        <h3>Multi-dimensional Arrays</h3>
        <p>Arrays with multiple dimensions (2D, 3D, etc.). Can be rectangular or jagged.</p>
        
        <h3>Array Features</h3>
        <p>Fixed size, zero-based indexing, Length property, various built-in methods.</p>
      `,
      codeExample: `// Single-dimensional array declaration and initialization
int[] numbers = new int[5];           // Array of 5 integers
numbers[0] = 10;
numbers[1] = 20;
numbers[2] = 30;
numbers[3] = 40;
numbers[4] = 50;

// Array initialization with values
int[] scores = { 85, 90, 78, 92, 88 };
string[] names = { "Alice", "Bob", "Charlie", "Diana" };

// Accessing array elements
Console.WriteLine($"First score: {scores[0]}");
Console.WriteLine($"Last name: {names[names.Length - 1]}");

// Iterating through array
Console.WriteLine("All scores:");
for (int i = 0; i < scores.Length; i++)
{
    Console.WriteLine($"Score {i + 1}: {scores[i]}");
}

// Using foreach
foreach (string name in names)
{
    Console.WriteLine($"Name: {name}");
}

// Multi-dimensional array (rectangular)
int[,] matrix = new int[3, 3]
{
    { 1, 2, 3 },
    { 4, 5, 6 },
    { 7, 8, 9 }
};

Console.WriteLine("Matrix:");
for (int i = 0; i < matrix.GetLength(0); i++)
{
    for (int j = 0; j < matrix.GetLength(1); j++)
    {
        Console.Write($"{matrix[i, j]}\t");
    }
    Console.WriteLine();
}

// Jagged array (array of arrays)
int[][] jaggedArray = new int[3][];
jaggedArray[0] = new int[] { 1, 2, 3 };
jaggedArray[1] = new int[] { 4, 5 };
jaggedArray[2] = new int[] { 6, 7, 8, 9 };

Console.WriteLine("Jagged array:");
for (int i = 0; i < jaggedArray.Length; i++)
{
    Console.Write($"Row {i}: ");
    for (int j = 0; j < jaggedArray[i].Length; j++)
    {
        Console.Write($"{jaggedArray[i][j]} ");
    }
    Console.WriteLine();
}

// Array methods
int[] data = { 5, 2, 8, 1, 9, 3 };
Array.Sort(data);
Console.WriteLine("Sorted: " + string.Join(", ", data));

Array.Reverse(data);
Console.WriteLine("Reversed: " + string.Join(", ", data));

int index = Array.IndexOf(data, 8);
Console.WriteLine($"Index of 8: {index}");`,
      keyPoints: [
        'Arrays have fixed size once created',
        'Array indices start at 0',
        'Use Length property for single-dimensional arrays',
        'Use GetLength(dimension) for multi-dimensional arrays',
        'Rectangular arrays are more memory efficient than jagged arrays',
        'Array class provides useful static methods (Sort, Reverse, etc.)',
        'Consider List<T> for dynamic-size collections'
      ],
      exercise: 'Create a program that: 1) Stores exam scores in an array, 2) Calculates average, 3) Finds highest and lowest scores, 4) Displays results.'
    },

    // String Operations
    {
      id: 'strings-operations',
      name: 'String Operations and Methods',
      section: 'Beginner',
      explanation: `
        <h3>Strings in C#</h3>
        <p>Strings are immutable reference types representing text. Every modification creates a new string.</p>
        
        <h3>Common Operations</h3>
        <p>Concatenation, comparison, searching, manipulation, formatting.</p>
        
        <h3>StringBuilder</h3>
        <p>For efficient string manipulation when making many changes.</p>
      `,
      codeExample: `using System;
using System.Text;

// String declaration and initialization
string str1 = "Hello";
string str2 = "World";
string str3 = str1 + " " + str2;  // Concatenation

// String properties and methods
string text = "  Learning C# Programming  ";
Console.WriteLine($"Length: {text.Length}");
Console.WriteLine($"Uppercase: {text.ToUpper()}");
Console.WriteLine($"Lowercase: {text.ToLower()}");
Console.WriteLine($"Trimmed: '{text.Trim()}'");

// String searching
string sentence = "The quick brown fox jumps over the lazy dog";
bool contains = sentence.Contains("fox");
int index = sentence.IndexOf("fox");
int lastIndex = sentence.LastIndexOf("o");
bool startsWith = sentence.StartsWith("The");
bool endsWith = sentence.EndsWith("dog");

Console.WriteLine($"Contains 'fox': {contains}");
Console.WriteLine($"Index of 'fox': {index}");
Console.WriteLine($"Starts with 'The': {startsWith}");

// String manipulation
string original = "Hello World";
string replaced = original.Replace("World", "C#");
string substring = original.Substring(0, 5);  // "Hello"
string[] words = sentence.Split(' ');

Console.WriteLine($"Replaced: {replaced}");
Console.WriteLine($"Substring: {substring}");
Console.WriteLine($"Word count: {words.Length}");

// String comparison
string a = "apple";
string b = "Apple";
bool areEqual = (a == b);  // false (case-sensitive)
bool areEqualIgnoreCase = a.Equals(b, StringComparison.OrdinalIgnoreCase); // true

Console.WriteLine($"Equal (case-sensitive): {areEqual}");
Console.WriteLine($"Equal (ignore case): {areEqualIgnoreCase}");

// String formatting
string name = "John";
int age = 30;
string formatted1 = string.Format("Name: {0}, Age: {1}", name, age);
string formatted2 = $"Name: {name}, Age: {age}";  // String interpolation

Console.WriteLine(formatted2);

// String joining
string[] fruits = { "Apple", "Banana", "Orange" };
string joined = string.Join(", ", fruits);
Console.WriteLine($"Fruits: {joined}");

// StringBuilder (for multiple modifications)
StringBuilder sb = new StringBuilder();
sb.Append("Hello");
sb.Append(" ");
sb.Append("World");
sb.AppendLine("!");
sb.Insert(6, "Beautiful ");
sb.Replace("World", "C#");
string result = sb.ToString();

Console.WriteLine($"StringBuilder result: {result}");

// String is null or empty
string empty = "";
string nullStr = null;
bool isEmpty = string.IsNullOrEmpty(empty);
bool isNullOrWhiteSpace = string.IsNullOrWhiteSpace("   ");

Console.WriteLine($"Is empty: {isEmpty}");
Console.WriteLine($"Is null or whitespace: {isNullOrWhiteSpace}");`,
      keyPoints: [
        'Strings are immutable - operations create new strings',
        'Use StringBuilder for multiple string modifications',
        'String comparison is case-sensitive by default',
        'Use StringComparison enum for case-insensitive comparison',
        'IndexOf returns -1 if substring not found',
        'Always check for null before calling string methods',
        'String interpolation ($"") is preferred over concatenation'
      ],
      exercise: 'Create a program that: 1) Takes a sentence as input, 2) Counts words, 3) Reverses the sentence, 4) Checks if it\'s a palindrome.'
    },

    // Exception Handling
    {
      id: 'exception-handling',
      name: 'try-catch-finally and Custom Exceptions',
      section: 'Beginner',
      explanation: `
        <h3>Exception Handling</h3>
        <p>Mechanism to handle runtime errors gracefully without crashing the application.</p>
        
        <h3>try-catch-finally</h3>
        <p>try: Code that might throw exceptions. catch: Handles exceptions. finally: Always executes.</p>
        
        <h3>throw</h3>
        <p>Explicitly throw exceptions.</p>
        
        <h3>Custom Exceptions</h3>
        <p>Create custom exception classes for specific scenarios.</p>
      `,
      codeExample: `using System;

// Basic try-catch
try
{
    int[] numbers = { 1, 2, 3 };
    Console.WriteLine(numbers[5]);  // IndexOutOfRangeException
}
catch (IndexOutOfRangeException ex)
{
    Console.WriteLine($"Error: {ex.Message}");
}

// Multiple catch blocks
try
{
    Console.Write("Enter a number: ");
    string input = Console.ReadLine();
    int number = int.Parse(input);
    int result = 100 / number;
    Console.WriteLine($"Result: {result}");
}
catch (FormatException ex)
{
    Console.WriteLine("Invalid input format!");
}
catch (DivideByZeroException ex)
{
    Console.WriteLine("Cannot divide by zero!");
}
catch (Exception ex)  // General exception (should be last)
{
    Console.WriteLine($"An error occurred: {ex.Message}");
}

// try-catch-finally
System.IO.StreamReader reader = null;
try
{
    reader = new System.IO.StreamReader("file.txt");
    string content = reader.ReadToEnd();
    Console.WriteLine(content);
}
catch (System.IO.FileNotFoundException ex)
{
    Console.WriteLine("File not found!");
}
catch (Exception ex)
{
    Console.WriteLine($"Error reading file: {ex.Message}");
}
finally
{
    // Always executes, even if exception occurs
    if (reader != null)
    {
        reader.Close();
        Console.WriteLine("File closed");
    }
}

// Throwing exceptions
public class Account
{
    private decimal balance;

    public void Withdraw(decimal amount)
    {
        if (amount <= 0)
        {
            throw new ArgumentException("Amount must be positive");
        }
        
        if (amount > balance)
        {
            throw new InvalidOperationException("Insufficient funds");
        }
        
        balance -= amount;
    }
}

// Custom exception
public class InsufficientFundsException : Exception
{
    public decimal RequiredAmount { get; }
    public decimal AvailableAmount { get; }

    public InsufficientFundsException(decimal required, decimal available)
        : base($"Insufficient funds. Required: {required}, Available: {available}")
    {
        RequiredAmount = required;
        AvailableAmount = available;
    }
}

// Using custom exception
public class BankAccount
{
    private decimal balance = 1000;

    public void Withdraw(decimal amount)
    {
        if (amount > balance)
        {
            throw new InsufficientFundsException(amount, balance);
        }
        balance -= amount;
    }
}

// Handling custom exception
BankAccount account = new BankAccount();
try
{
    account.Withdraw(1500);
}
catch (InsufficientFundsException ex)
{
    Console.WriteLine(ex.Message);
    Console.WriteLine($"Available: {ex.AvailableAmount}");
}

Console.WriteLine("Exception handling demonstration completed!");`,
      keyPoints: [
        'Always catch specific exceptions before general Exception',
        'Use finally for cleanup code that must always execute',
        'Don\'t catch exceptions you can\'t handle properly',
        'Custom exceptions should inherit from Exception',
        'Include meaningful messages in exceptions',
        'Use throw; to rethrow caught exception',
        'Consider using statement for automatic resource disposal'
      ],
      exercise: 'Create a program with a custom exception for invalid age (should be 0-150), then use try-catch to validate user input.'
    },

    // Introduction to OOP
    {
      id: 'oop-intro',
      name: 'Classes, Objects, Fields, Properties, Methods',
      section: 'Beginner',
      explanation: `
        <h3>Object-Oriented Programming</h3>
        <p>Programming paradigm based on objects that contain data and code.</p>
        
        <h3>Classes</h3>
        <p>Blueprint for creating objects. Defines properties and methods.</p>
        
        <h3>Objects</h3>
        <p>Instances of classes with actual data.</p>
        
        <h3>Fields and Properties</h3>
        <p>Fields: Variables in a class. Properties: Controlled access to fields.</p>
      `,
      codeExample: `// Class definition
public class Person
{
    // Fields (private data)
    private string name;
    private int age;

    // Properties (controlled access to fields)
    public string Name
    {
        get { return name; }
        set { name = value; }
    }

    public int Age
    {
        get { return age; }
        set 
        { 
            if (value >= 0 && value <= 150)
                age = value;
            else
                throw new ArgumentException("Invalid age");
        }
    }

    // Auto-implemented properties
    public string Email { get; set; }
    public string Phone { get; set; }

    // Read-only property
    public string Info
    {
        get { return $"{Name}, Age: {Age}"; }
    }

    // Methods
    public void Introduce()
    {
        Console.WriteLine($"Hi, I'm {Name} and I'm {Age} years old.");
    }

    public void Celebrate Birthday()
    {
        Age++;
        Console.WriteLine($"Happy Birthday! Now I'm {Age}!");
    }
}

// Creating and using objects
Person person1 = new Person();
person1.Name = "Alice";
person1.Age = 25;
person1.Email = "alice@example.com";
person1.Introduce();

Person person2 = new Person();
person2.Name = "Bob";
person2.Age = 30;
person2.Phone = "123-456-7890";
person2.CelebrateBirthday();

// More complex class example
public class BankAccount
{
    // Fields
    private decimal balance;
    private string accountNumber;

    // Properties
    public string AccountNumber
    {
        get { return accountNumber; }
        private set { accountNumber = value; }
    }

    public decimal Balance
    {
        get { return balance; }
    }

    public string Owner { get; set; }

    // Constructor (covered in next topic)
    public BankAccount(string owner, string accountNum)
    {
        Owner = owner;
        AccountNumber = accountNum;
        balance = 0;
    }

    // Methods
    public void Deposit(decimal amount)
    {
        if (amount > 0)
        {
            balance += amount;
            Console.WriteLine($"Deposited: {amount:C}. New balance: {balance:C}");
        }
    }

    public bool Withdraw(decimal amount)
    {
        if (amount > 0 && amount <= balance)
        {
            balance -= amount;
            Console.WriteLine($"Withdrawn: {amount:C}. New balance: {balance:C}");
            return true;
        }
        Console.WriteLine("Insufficient funds or invalid amount");
        return false;
    }

    public void DisplayInfo()
    {
        Console.WriteLine($"Account: {AccountNumber}, Owner: {Owner}, Balance: {Balance:C}");
    }
}

// Using BankAccount
BankAccount account = new BankAccount("John Doe", "12345");
account.Deposit(1000);
account.Withdraw(250);
account.DisplayInfo();

Console.WriteLine("OOP basics demonstration completed!");`,
      keyPoints: [
        'Classes are blueprints, objects are instances',
        'Use properties instead of public fields for encapsulation',
        'Auto-implemented properties simplify code',
        'Properties can have validation logic in setters',
        'Methods define behavior of objects',
        'Keep fields private and expose through properties',
        'Use meaningful names for classes, properties, and methods'
      ],
      exercise: 'Create a Student class with properties (Name, ID, GPA) and methods (EnrollCourse, DisplayInfo, CalculateHonors).'
    },

    // Constructors and Destructors
    {
      id: 'oop-constructors',
      name: 'Constructors and Destructors',
      section: 'Beginner',
      explanation: `
        <h3>Constructors</h3>
        <p>Special methods called when an object is created. Initialize object state.</p>
        
        <h3>Types of Constructors</h3>
        <p>Default, parameterized, copy, and static constructors.</p>
        
        <h3>Destructor</h3>
        <p>Called when object is destroyed. Used for cleanup (rarely needed in C#).</p>
      `,
      codeExample: `public class Student
{
    public string Name { get; set; }
    public int Age { get; set; }
    public string StudentId { get; set; }

    // Default constructor
    public Student()
    {
        Name = "Unknown";
        Age = 0;
        StudentId = "N/A";
        Console.WriteLine("Default constructor called");
    }

    // Parameterized constructor
    public Student(string name, int age)
    {
        Name = name;
        Age = age;
        StudentId = GenerateStudentId();
        Console.WriteLine("Parameterized constructor called");
    }

    // Constructor overloading
    public Student(string name, int age, string studentId)
    {
        Name = name;
        Age = age;
        StudentId = studentId;
        Console.WriteLine("Constructor with all parameters called");
    }

    // Copy constructor
    public Student(Student other)
    {
        Name = other.Name;
        Age = other.Age;
        StudentId = other.StudentId;
        Console.WriteLine("Copy constructor called");
    }

    private string GenerateStudentId()
    {
        return $"STU{new Random().Next(1000, 9999)}";
    }

    public void DisplayInfo()
    {
        Console.WriteLine($"Student: {Name}, Age: {Age}, ID: {StudentId}");
    }

    // Destructor (finalizer)
    ~Student()
    {
        Console.WriteLine($"Destructor called for {Name}");
        // Cleanup code here (rarely used in C#)
    }
}

// Using constructors
Student student1 = new Student();  // Default constructor
student1.DisplayInfo();

Student student2 = new Student("Alice", 20);  // Parameterized
student2.DisplayInfo();

Student student3 = new Student("Bob", 22, "STU1001");  // All parameters
student3.DisplayInfo();

Student student4 = new Student(student2);  // Copy constructor
student4.DisplayInfo();

// Constructor chaining
public class Employee
{
    public string Name { get; set; }
    public int Id { get; set; }
    public decimal Salary { get; set; }

    // Constructor chaining with this
    public Employee() : this("Unknown", 0)
    {
    }

    public Employee(string name, int id) : this(name, id, 0)
    {
    }

    public Employee(string name, int id, decimal salary)
    {
        Name = name;
        Id = id;
        Salary = salary;
        Console.WriteLine("Main constructor called");
    }

    public void DisplayInfo()
    {
        Console.WriteLine($"Employee: {Name}, ID: {Id}, Salary: {Salary:C}");
    }
}

// Static constructor
public class Configuration
{
    public static string AppName { get; set; }
    public static string Version { get; set; }

    // Static constructor - called once when class is first used
    static Configuration()
    {
        AppName = "LearningGuru";
        Version = "1.0.0";
        Console.WriteLine("Static constructor called - initializing configuration");
    }

    public static void DisplayConfig()
    {
        Console.WriteLine($"{AppName} v{Version}");
    }
}

// Using constructor chaining
Employee emp1 = new Employee();
emp1.DisplayInfo();

Employee emp2 = new Employee("John", 101);
emp2.DisplayInfo();

Employee emp3 = new Employee("Jane", 102, 50000);
emp3.DisplayInfo();

// Static constructor is called automatically
Configuration.DisplayConfig();

Console.WriteLine("Constructor demonstration completed!");`,
      keyPoints: [
        'Constructors have the same name as the class',
        'Default constructor is provided if no constructor is defined',
        'Constructor overloading provides flexible object initialization',
        'Use constructor chaining (this) to avoid code duplication',
        'Static constructors initialize static members',
        'Destructors are rarely needed due to garbage collection',
        'Use IDisposable pattern instead of destructors for cleanup'
      ],
      exercise: 'Create a Rectangle class with constructors for: 1) Default (1x1), 2) Square (one parameter), 3) Rectangle (two parameters). Add Area and Perimeter methods.'
    },

    // Access Modifiers
    {
      id: 'oop-access-modifiers',
      name: 'Access Modifiers (public, private, protected, internal)',
      section: 'Beginner',
      explanation: `
        <h3>Access Modifiers</h3>
        <p>Keywords that set the accessibility level of classes, methods, and properties.</p>
        
        <h3>Types</h3>
        <ul>
          <li><strong>public:</strong> Accessible from anywhere</li>
          <li><strong>private:</strong> Accessible only within the class</li>
          <li><strong>protected:</strong> Accessible within class and derived classes</li>
          <li><strong>internal:</strong> Accessible within the same assembly</li>
          <li><strong>protected internal:</strong> protected OR internal</li>
          <li><strong>private protected:</strong> protected AND internal (C# 7.2+)</li>
        </ul>
      `,
      codeExample: `// Demonstrating access modifiers
public class BankAccount
{
    // Private field - only accessible within this class
    private decimal balance;
    
    // Private field with backing property
    private string accountNumber;

    // Public property - accessible from anywhere
    public string AccountNumber
    {
        get { return accountNumber; }
        private set { accountNumber = value; }  // Private setter
    }

    // Public property - accessible from anywhere
    public string Owner { get; set; }

    // Protected field - accessible in this class and derived classes
    protected decimal interestRate = 0.02m;

    // Internal property - accessible within same assembly
    internal string BankCode { get; set; }

    // Protected internal - accessible in derived classes OR same assembly
    protected internal string AccountType { get; set; }

    // Public constructor
    public BankAccount(string owner, string accountNum)
    {
        Owner = owner;
        AccountNumber = accountNum;
        balance = 0;
        BankCode = "BANK001";
        AccountType = "Savings";
    }

    // Public method
    public void Deposit(decimal amount)
    {
        if (ValidateAmount(amount))  // Calling private method
        {
            balance += amount;
            Console.WriteLine($"Deposited: {amount:C}");
        }
    }

    // Public method
    public bool Withdraw(decimal amount)
    {
        if (ValidateAmount(amount) && HasSufficientFunds(amount))
        {
            balance -= amount;
            Console.WriteLine($"Withdrawn: {amount:C}");
            return true;
        }
        return false;
    }

    // Private method - only accessible within this class
    private bool ValidateAmount(decimal amount)
    {
        if (amount <= 0)
        {
            Console.WriteLine("Amount must be positive");
            return false;
        }
        return true;
    }

    // Private method
    private bool HasSufficientFunds(decimal amount)
    {
        return balance >= amount;
    }

    // Protected method - accessible in derived classes
    protected decimal CalculateInterest()
    {
        return balance * interestRate;
    }

    // Public method to display balance
    public void DisplayBalance()
    {
        Console.WriteLine($"Current Balance: {balance:C}");
    }

    // Internal method
    internal void ResetAccount()
    {
        balance = 0;
        Console.WriteLine("Account reset");
    }
}

// Derived class demonstrating protected access
public class SavingsAccount : BankAccount
{
    public SavingsAccount(string owner, string accountNum) 
        : base(owner, accountNum)
    {
    }

    // Can access protected members from base class
    public void ApplyInterest()
    {
        decimal interest = CalculateInterest();  // Accessing protected method
        decimal rate = interestRate;             // Accessing protected field
        Console.WriteLine($"Interest Applied: {interest:C} at rate {rate:P}");
        Deposit(interest);
    }

    // Cannot access private members from base class
    // This would cause error: balance is private
    // public void ShowBalance()
    // {
    //     Console.WriteLine(balance);  // ERROR!
    // }
}

// Using the classes
BankAccount account = new BankAccount("John Doe", "12345");
account.Deposit(1000);           // OK - public method
account.DisplayBalance();        // OK - public method
// account.balance = 500;        // ERROR - private field
// account.ValidateAmount(100);  // ERROR - private method

SavingsAccount savings = new SavingsAccount("Jane Doe", "67890");
savings.Deposit(2000);
savings.ApplyInterest();         // Can call public method that uses protected members
// savings.interestRate = 0.03m; // ERROR - protected, not accessible here

// Internal and protected internal are accessible within same assembly
account.ResetAccount();          // OK - internal method (same assembly)

Console.WriteLine($"Account Owner: {account.Owner}");  // OK - public property

// Example showing encapsulation benefits
public class SecureClass
{
    private string password;  // Private - good security

    public bool VerifyPassword(string input)
    {
        // Password check logic hidden from outside
        return password == ComputeHash(input);
    }

    private string ComputeHash(string input)
    {
        // Hashing logic - implementation detail
        return input.GetHashCode().ToString();
    }

    public void SetPassword(string newPassword)
    {
        if (newPassword.Length >= 8)
        {
            password = ComputeHash(newPassword);
        }
    }
}

Console.WriteLine("Access modifiers demonstration completed!");`,
      keyPoints: [
        'Use private for fields to enforce encapsulation',
        'Use public for methods/properties that form the class interface',
        'Use protected for members that derived classes need',
        'Use internal for assembly-level access',
        'Default access is private for class members',
        'Default access is internal for classes',
        'Proper use of access modifiers improves security and maintainability'
      ],
      exercise: 'Create a class hierarchy with a base Vehicle class and derived Car class. Use appropriate access modifiers for fields, properties, and methods to demonstrate encapsulation.'
    }
  ];

  constructor() { }

  getTopicsBySection(section: string): Observable<Topic[]> {
    return of(this.topics.filter(topic => topic.section === section));
  }

  getAllTopics(): Observable<Topic[]> {
    return of(this.topics);
  }

  getTopicById(id: string): Observable<Topic | undefined> {
    return of(this.topics.find(topic => topic.id === id));
  }
}
