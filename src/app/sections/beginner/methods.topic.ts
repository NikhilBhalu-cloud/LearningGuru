import { Topic } from '../../models/section';

export const methodsTopic: Topic = {
  id: 'methods-declaration',
  name: 'Method Declaration, Parameters, and Return Types',
  sectionId: 'beginner',
  slug: 'methods',
  explanation: `
    <h3>Methods in C#</h3>
    <p>Methods are reusable blocks of code that perform specific tasks. They help organize code and avoid repetition.</p>

    <h4>Method Declaration Syntax</h4>
    <pre><code>[access modifier] [static] returnType MethodName(parameters) {
    // method body
    return value; // if return type is not void
}</code></pre>

    <h4>Access Modifiers</h4>
    <ul>
      <li><code>public</code> - Accessible from anywhere</li>
      <li><code>private</code> - Accessible only within the same class</li>
      <li><code>protected</code> - Accessible within the class and derived classes</li>
      <li><code>internal</code> - Accessible within the same assembly</li>
    </ul>

    <h4>Return Types</h4>
    <ul>
      <li><code>void</code> - Method doesn't return a value</li>
      <li>Any data type (int, string, bool, etc.)</li>
      <li>Custom classes and structs</li>
    </ul>

    <h4>Parameters</h4>
    <ul>
      <li><strong>Value parameters:</strong> Pass by value (default)</li>
      <li><strong>Reference parameters:</strong> <code>ref</code> - Pass by reference</li>
      <li><strong>Output parameters:</strong> <code>out</code> - Used to return multiple values</li>
      <li><strong>Parameter arrays:</strong> <code>params</code> - Variable number of arguments</li>
      <li><strong>Optional parameters:</strong> Default values</li>
    </ul>

    <h4>Method Signatures</h4>
    <p>A method's signature includes its name and parameter list. Return type is not part of the signature.</p>
  `,
  codeExample: `// Simple method with no parameters and no return value
public void DisplayMessage() {
    Console.WriteLine("Hello, World!");
}

// Method with parameters but no return value
public void GreetUser(string name, int age) {
    Console.WriteLine($"Hello {name}, you are {age} years old!");
}

// Method with return value
public int AddNumbers(int a, int b) {
    return a + b;
}

// Method with reference parameter (ref)
public void SwapValues(ref int x, ref int y) {
    int temp = x;
    x = y;
    y = temp;
}

// Method with output parameter (out)
public bool TryParseNumber(string input, out int result) {
    return int.TryParse(input, out result);
}

// Method with optional parameters
public void ConfigureSettings(string theme = "light", int fontSize = 12) {
    Console.WriteLine($"Theme: {theme}, Font Size: {fontSize}");
}

// Method with parameter array (params)
public int SumNumbers(params int[] numbers) {
    int sum = 0;
    foreach (int num in numbers) {
        sum += num;
    }
    return sum;
}

// Static method
public static double CalculateCircleArea(double radius) {
    return Math.PI * radius * radius;
}

// Method demonstrating different parameter types
public void DemonstrateParameters() {
    // Value parameters
    int a = 10, b = 20;
    int sum = AddNumbers(a, b); // sum = 30, a and b unchanged

    // Reference parameters
    SwapValues(ref a, ref b); // Now a = 20, b = 10

    // Output parameters
    string input = "123";
    if (TryParseNumber(input, out int parsedNumber)) {
        Console.WriteLine($"Parsed: {parsedNumber}");
    }

    // Optional parameters
    ConfigureSettings(); // Uses defaults
    ConfigureSettings("dark"); // theme = "dark", fontSize = 12
    ConfigureSettings("dark", 14); // Both parameters specified

    // Parameter array
    int total = SumNumbers(1, 2, 3, 4, 5); // total = 15
    int[] array = { 10, 20, 30 };
    total = SumNumbers(array); // Also works with arrays
}

// Method with multiple return points
public string GetGradeDescription(int score) {
    if (score >= 90) return "Excellent";
    if (score >= 80) return "Good";
    if (score >= 70) return "Average";
    if (score >= 60) return "Below Average";
    return "Needs Improvement";
}

// Expression-bodied methods (C# 6.0+)
public double GetSquare(double x) => x * x;
public bool IsEven(int number) => number % 2 == 0;

// Usage examples
public void RunExamples() {
    DisplayMessage();

    GreetUser("Alice", 25);

    int result = AddNumbers(5, 3);
    Console.WriteLine($"5 + 3 = {result}");

    // Using ref parameters
    int x = 10, y = 20;
    Console.WriteLine($"Before swap: x={x}, y={y}");
    SwapValues(ref x, ref y);
    Console.WriteLine($"After swap: x={x}, y={y}");

    // Using out parameters
    if (TryParseNumber("42", out int number)) {
        Console.WriteLine($"Parsed number: {number}");
    }

    // Static method call
    double area = CalculateCircleArea(5.0);
    Console.WriteLine($"Circle area: {area:F2}");

    // Expression-bodied methods
    Console.WriteLine($"Square of 4: {GetSquare(4)}");
    Console.WriteLine($"Is 6 even? {IsEven(6)}");
}`,
  keyPoints: [
    'Methods must have a return type (void for no return)',
    'Parameters are passed by value by default',
    'Use ref for pass-by-reference, out for output parameters',
    'params allows variable number of arguments',
    'Optional parameters have default values',
    'Static methods belong to the class, not instances',
    'Expression-bodied methods (=>) provide concise syntax',
  ],
  exercise:
    'Create a Calculator class with methods for basic arithmetic operations. Include overloaded methods for different parameter types and use ref/out parameters where appropriate.',
};
