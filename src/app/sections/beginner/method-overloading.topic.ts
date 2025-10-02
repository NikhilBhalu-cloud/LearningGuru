import { Topic } from '../../models/section';

export const methodOverloadingTopic: Topic = {
  id: 'methods-overloading',
  name: 'Method Overloading',
  sectionId: 'beginner',
  slug: 'method-overloading',
  explanation: `
    <h3>Method Overloading</h3>
    <p>Method overloading allows multiple methods with the same name but different parameters. The compiler determines which method to call based on the arguments provided.</p>

    <h4>Rules for Overloading</h4>
    <ul>
      <li>Methods must have the same name</li>
      <li>Methods must have different parameter lists (different types, number, or order)</li>
      <li>Return type alone is not sufficient for overloading</li>
      <li>Access modifiers can be different</li>
    </ul>

    <h4>Types of Parameter Differences</h4>
    <ul>
      <li><strong>Different number of parameters:</strong> <code>Add(int a, int b)</code> vs <code>Add(int a, int b, int c)</code></li>
      <li><strong>Different parameter types:</strong> <code>Add(int a, int b)</code> vs <code>Add(double a, double b)</code></li>
      <li><strong>Different parameter order:</strong> <code>Process(int x, string y)</code> vs <code>Process(string x, int y)</code></li>
    </ul>

    <h4>Constructor Overloading</h4>
    <p>Constructors can also be overloaded, providing multiple ways to create objects.</p>

    <h4>Operator Overloading</h4>
    <p>C# allows overloading operators like +, -, *, etc., for custom types.</p>

    <h4>Method Resolution</h4>
    <p>The compiler chooses the best matching overloaded method based on:</p>
    <ol>
      <li>Exact type matches</li>
      <li>Implicit conversions</li>
      <li>Parameter count</li>
    </ol>
  `,
  codeExample: `// Method overloading examples
public class Calculator {
    // Overloaded Add methods with different parameter types
    public int Add(int a, int b) {
        Console.WriteLine("Adding two integers");
        return a + b;
    }

    public double Add(double a, double b) {
        Console.WriteLine("Adding two doubles");
        return a + b;
    }

    public int Add(int a, int b, int c) {
        Console.WriteLine("Adding three integers");
        return a + b + c;
    }

    // Overloaded Display methods with different parameters
    public void Display(int value) {
        Console.WriteLine($"Integer value: {value}");
    }

    public void Display(double value) {
        Console.WriteLine($"Double value: {value:F2}");
    }

    public void Display(string text) {
        Console.WriteLine($"String value: '{text}'");
    }

    public void Display(int value, string label) {
        Console.WriteLine($"{label}: {value}");
    }
}

// Constructor overloading
public class Person {
    public string Name { get; set; }
    public int Age { get; set; }
    public string Email { get; set; }

    // Default constructor
    public Person() {
        Name = "Unknown";
        Age = 0;
        Email = "";
    }

    // Constructor with name
    public Person(string name) {
        Name = name;
        Age = 0;
        Email = "";
    }

    // Constructor with name and age
    public Person(string name, int age) {
        Name = name;
        Age = age;
        Email = "";
    }

    // Constructor with all parameters
    public Person(string name, int age, string email) {
        Name = name;
        Age = age;
        Email = email;
    }
}

// Operator overloading example
public class ComplexNumber {
    public double Real { get; set; }
    public double Imaginary { get; set; }

    public ComplexNumber(double real, double imaginary) {
        Real = real;
        Imaginary = imaginary;
    }

    // Overload + operator
    public static ComplexNumber operator +(ComplexNumber a, ComplexNumber b) {
        return new ComplexNumber(a.Real + b.Real, a.Imaginary + b.Imaginary);
    }

    // Overload * operator
    public static ComplexNumber operator *(ComplexNumber a, ComplexNumber b) {
        double real = a.Real * b.Real - a.Imaginary * b.Imaginary;
        double imaginary = a.Real * b.Imaginary + a.Imaginary * b.Real;
        return new ComplexNumber(real, imaginary);
    }

    public override string ToString() {
        return $"{Real} + {Imaginary}i";
    }
}

// Usage examples
public void DemonstrateOverloading() {
    Calculator calc = new Calculator();

    // Method overloading - different types
    Console.WriteLine(calc.Add(5, 3));        // Calls int Add(int, int)
    Console.WriteLine(calc.Add(5.5, 3.2));    // Calls double Add(double, double)
    Console.WriteLine(calc.Add(1, 2, 3));     // Calls int Add(int, int, int)

    // Method overloading - different parameters
    calc.Display(42);                        // Calls Display(int)
    calc.Display(3.14159);                   // Calls Display(double)
    calc.Display("Hello");                   // Calls Display(string)
    calc.Display(100, "Score");              // Calls Display(int, string)

    // Constructor overloading
    Person p1 = new Person();                          // Default constructor
    Person p2 = new Person("Alice");                   // Name only
    Person p3 = new Person("Bob", 25);                 // Name and age
    Person p4 = new Person("Charlie", 30, "charlie@email.com"); // All parameters

    Console.WriteLine($"{p1.Name}, {p1.Age}");          // Unknown, 0
    Console.WriteLine($"{p2.Name}, {p2.Age}");          // Alice, 0
    Console.WriteLine($"{p3.Name}, {p3.Age}");          // Bob, 25
    Console.WriteLine($"{p4.Name}, {p4.Age}, {p4.Email}"); // Charlie, 30, charlie@email.com

    // Operator overloading
    ComplexNumber c1 = new ComplexNumber(3, 4);       // 3 + 4i
    ComplexNumber c2 = new ComplexNumber(1, 2);       // 1 + 2i

    ComplexNumber sum = c1 + c2;                       // Uses overloaded +
    ComplexNumber product = c1 * c2;                   // Uses overloaded *

    Console.WriteLine($"{c1} + {c2} = {sum}");          // (3+4i) + (1+2i) = (4+6i)
    Console.WriteLine($"{c1} * {c2} = {product}");      // (3+4i) * (1+2i) = (3*1-4*2) + (3*2+4*1)i = (-5+10i)
}

// Method resolution examples
public void MethodResolution() {
    Calculator calc = new Calculator();

    // Exact matches are preferred
    calc.Display(42);        // int parameter -> Display(int)

    // Implicit conversions
    short shortValue = 42;
    calc.Display(shortValue); // short -> int conversion, calls Display(int)

    // No exact match - uses "best" conversion
    calc.Display('A');       // char -> int conversion, calls Display(int)
}`,
  keyPoints: [
    'Overloaded methods must have different parameter lists',
    'Return type alone cannot distinguish overloaded methods',
    'Constructor overloading provides multiple object creation ways',
    'Operator overloading allows custom behavior for operators',
    'Compiler chooses best matching method based on arguments',
    'Method resolution considers exact matches first, then conversions',
  ],
  exercise:
    'Create a MathOperations class with overloaded methods for Add, Multiply, and Max operations that work with different numeric types (int, double, decimal). Also implement operator overloading for a Vector2D class.',
};
