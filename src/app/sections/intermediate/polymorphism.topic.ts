import { Topic } from '../../models/section';

export const polymorphismTopic: Topic = {
  id: 'intermediate-oop-polymorphism',
  name: 'Polymorphism (Compile-time and Runtime)',
  sectionId: 'intermediate',
  slug: 'polymorphism',
  explanation: `
    <h3>Polymorphism in C#</h3>
    <p>Polymorphism means "many forms" and allows objects of different classes to be treated as objects of a common base class. There are two main types: compile-time polymorphism and runtime polymorphism.</p>

    <h4>Compile-time Polymorphism (Static Binding)</h4>
    <ul>
      <li><strong>Method Overloading:</strong> Multiple methods with same name but different parameters</li>
      <li><strong>Operator Overloading:</strong> Custom behavior for operators</li>
      <li><strong>Resolved at compile time</strong></li>
    </ul>

    <h4>Runtime Polymorphism (Dynamic Binding)</h4>
    <ul>
      <li><strong>Method Overriding:</strong> Derived classes provide specific implementations</li>
      <li><strong>Virtual and Abstract methods:</strong> Base class defines contract</li>
      <li><strong>Resolved at runtime based on actual object type</strong></li>
    </ul>

    <h4>Key Concepts</h4>
    <ul>
      <li><strong>Late Binding:</strong> Method call resolved at runtime</li>
      <li><strong>Early Binding:</strong> Method call resolved at compile time</li>
      <li><strong>Base class reference to derived class object:</strong> Enables polymorphism</li>
      <li><strong>is and as operators:</strong> Type checking and casting</li>
    </ul>

    <h4>Abstract Classes vs Interfaces</h4>
    <ul>
      <li><strong>Abstract classes:</strong> Can have implementation and state</li>
      <li><strong>Interfaces:</strong> Only method signatures, no implementation</li>
      <li><strong>Multiple inheritance:</strong> Classes can implement multiple interfaces</li>
    </ul>
  `,
  codeExample: `// Compile-time Polymorphism - Method Overloading
public class Calculator {
    public int Add(int a, int b) {
        return a + b;
    }

    public double Add(double a, double b) {
        return a + b;
    }

    public int Add(int a, int b, int c) {
        return a + b + c;
    }

    public string Add(string a, string b) {
        return a + b;
    }
}

// Runtime Polymorphism - Method Overriding
public abstract class Shape {
    public abstract double CalculateArea();
    public abstract double CalculatePerimeter();

    public virtual void Display() {
        Console.WriteLine("This is a shape.");
    }
}

public class Circle : Shape {
    public double Radius { get; set; }

    public Circle(double radius) {
        Radius = radius;
    }

    public override double CalculateArea() {
        return Math.PI * Radius * Radius;
    }

    public override double CalculatePerimeter() {
        return 2 * Math.PI * Radius;
    }

    public override void Display() {
        Console.WriteLine($"Circle with radius {Radius}");
    }
}

public class Rectangle : Shape {
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle(double width, double height) {
        Width = width;
        Height = height;
    }

    public override double CalculateArea() {
        return Width * Height;
    }

    public override double CalculatePerimeter() {
        return 2 * (Width + Height);
    }

    public override void Display() {
        Console.WriteLine($"Rectangle {Width} x {Height}");
    }
}

// Interface example
public interface IDrawable {
    void Draw();
    string GetDescription();
}

public interface IResizable {
    void Resize(double factor);
}

public class Triangle : Shape, IDrawable, IResizable {
    public double Base { get; set; }
    public double Height { get; set; }

    public Triangle(double baseLength, double height) {
        Base = baseLength;
        Height = height;
    }

    public override double CalculateArea() {
        return 0.5 * Base * Height;
    }

    public override double CalculatePerimeter() {
        // Approximation for equilateral triangle
        return 3 * Base;
    }

    public void Draw() {
        Console.WriteLine("Drawing a triangle");
    }

    public string GetDescription() {
        return $"Triangle with base {Base} and height {Height}";
    }

    public void Resize(double factor) {
        Base *= factor;
        Height *= factor;
    }
}

// Operator Overloading (Compile-time Polymorphism)
public class ComplexNumber {
    public double Real { get; set; }
    public double Imaginary { get; set; }

    public ComplexNumber(double real, double imaginary) {
        Real = real;
        Imaginary = imaginary;
    }

    public static ComplexNumber operator +(ComplexNumber a, ComplexNumber b) {
        return new ComplexNumber(a.Real + b.Real, a.Imaginary + b.Imaginary);
    }

    public static ComplexNumber operator -(ComplexNumber a, ComplexNumber b) {
        return new ComplexNumber(a.Real - b.Real, a.Imaginary - b.Imaginary);
    }

    public static ComplexNumber operator *(ComplexNumber a, ComplexNumber b) {
        double real = a.Real * b.Real - a.Imaginary * b.Imaginary;
        double imaginary = a.Real * b.Imaginary + a.Imaginary * b.Real;
        return new ComplexNumber(real, imaginary);
    }

    public override string ToString() {
        return $"{Real} + {Imaginary}i";
    }
}

// Demonstration of polymorphism
public void DemonstratePolymorphism() {
    // Compile-time polymorphism - method overloading
    Calculator calc = new Calculator();
    Console.WriteLine(calc.Add(5, 3));           // 8 (int)
    Console.WriteLine(calc.Add(5.5, 3.2));       // 8.7 (double)
    Console.WriteLine(calc.Add(1, 2, 3));        // 6 (three ints)
    Console.WriteLine(calc.Add("Hello ", "World")); // "Hello World" (string)

    // Runtime polymorphism - method overriding
    Shape[] shapes = new Shape[] {
        new Circle(5),
        new Rectangle(4, 6),
        new Triangle(3, 4)
    };

    foreach (Shape shape in shapes) {
        shape.Display();
        Console.WriteLine($"Area: {shape.CalculateArea():F2}");
        Console.WriteLine($"Perimeter: {shape.CalculatePerimeter():F2}");
        Console.WriteLine();
    }

    // Interface polymorphism
    IDrawable[] drawables = new IDrawable[] {
        new Triangle(6, 8)
    };

    foreach (IDrawable drawable in drawables) {
        drawable.Draw();
        Console.WriteLine(drawable.GetDescription());
    }

    // Operator overloading
    ComplexNumber c1 = new ComplexNumber(3, 4);
    ComplexNumber c2 = new ComplexNumber(1, 2);

    ComplexNumber sum = c1 + c2;
    ComplexNumber difference = c1 - c2;
    ComplexNumber product = c1 * c2;

    Console.WriteLine($"{c1} + {c2} = {sum}");
    Console.WriteLine($"{c1} - {c2} = {difference}");
    Console.WriteLine($"{c1} * {c2} = {product}");
}

// Type checking and casting with polymorphism
public void TypeCheckingAndCasting() {
    Shape[] shapes = new Shape[] {
        new Circle(5),
        new Rectangle(4, 6),
        new Triangle(3, 4)
    };

    foreach (Shape shape in shapes) {
        // Using 'is' operator for type checking
        if (shape is Circle circle) {
            Console.WriteLine($"Found circle with radius {circle.Radius}");
        } else if (shape is Rectangle rectangle) {
            Console.WriteLine($"Found rectangle {rectangle.Width} x {rectangle.Height}");
        } else if (shape is Triangle triangle) {
            Console.WriteLine($"Found triangle with base {triangle.Base}");
        }

        // Using 'as' operator for safe casting
        Triangle triangleShape = shape as Triangle;
        if (triangleShape != null) {
            triangleShape.Resize(2.0);
            Console.WriteLine("Triangle resized!");
        }

        // Interface checking
        if (shape is IDrawable drawable) {
            drawable.Draw();
        }

        if (shape is IResizable resizable) {
            resizable.Resize(1.5);
            Console.WriteLine("Shape resized!");
        }
    }
}

// Abstract class with both abstract and concrete methods
public abstract class Employee {
    public string Name { get; set; }
    public string EmployeeId { get; set; }

    protected Employee(string name, string employeeId) {
        Name = name;
        EmployeeId = employeeId;
    }

    // Abstract method - must be implemented by derived classes
    public abstract double CalculateSalary();

    // Concrete method - inherited as-is
    public void DisplayInfo() {
        Console.WriteLine($"Employee: {Name}, ID: {EmployeeId}");
    }

    // Virtual method - can be overridden
    public virtual void Work() {
        Console.WriteLine($"{Name} is working.");
    }
}

public class Manager : Employee {
    public double BaseSalary { get; set; }
    public double Bonus { get; set; }

    public Manager(string name, string employeeId, double baseSalary, double bonus)
        : base(name, employeeId) {
        BaseSalary = baseSalary;
        Bonus = bonus;
    }

    public override double CalculateSalary() {
        return BaseSalary + Bonus;
    }

    public override void Work() {
        Console.WriteLine($"{Name} is managing the team.");
    }
}

public class Developer : Employee {
    public double HourlyRate { get; set; }
    public int HoursWorked { get; set; }

    public Developer(string name, string employeeId, double hourlyRate, int hoursWorked)
        : base(name, employeeId) {
        HourlyRate = hourlyRate;
        HoursWorked = hoursWorked;
    }

    public override double CalculateSalary() {
        return HourlyRate * HoursWorked;
    }

    public override void Work() {
        Console.WriteLine($"{Name} is writing code.");
    }
}`,
  keyPoints: [
    'Method overloading is compile-time polymorphism',
    'Method overriding is runtime polymorphism',
    'Abstract classes can have both abstract and concrete methods',
    'Interfaces define contracts without implementation',
    'Base class references can hold derived class objects',
    'is and as operators help with type checking and casting',
    'Operator overloading allows custom operator behavior',
    'Virtual methods can be overridden, abstract methods must be',
  ],
  exercise:
    'Create an abstract class Vehicle with abstract methods Start() and Stop(), and a virtual method Drive(). Create derived classes Car, Motorcycle, and Truck that implement these methods differently. Demonstrate polymorphism by creating an array of Vehicle objects and calling methods on each.',
};
