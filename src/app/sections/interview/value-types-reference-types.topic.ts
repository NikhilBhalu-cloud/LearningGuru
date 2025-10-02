import { Topic } from '../../models/section';

export const valueTypesReferenceTypesTopic: Topic = {
  id: 'interview-value-types-reference-types',
  name: 'What is the difference between value types and reference types in C#?',
  sectionId: 'interview',
  slug: 'value-types-reference-types',
  explanation: `
    <h3>Value Types vs Reference Types in C#</h3>
    <p>In C#, types are divided into value types and reference types, which differ in how they store data and behave in memory.</p>

    <h4>Value Types</h4>
    <ul>
      <li><strong>Storage:</strong> Stored directly on the stack</li>
      <li><strong>Assignment:</strong> Creates a copy of the value</li>
      <li><strong>Examples:</strong> int, float, double, bool, char, struct, enum</li>
      <li><strong>Default:</strong> Each variable has its own copy</li>
      <li><strong>Nullability:</strong> Cannot be null (except Nullable&lt;T&gt;)</li>
    </ul>

    <h4>Reference Types</h4>
    <ul>
      <li><strong>Storage:</strong> Stored on the heap, variable holds reference</li>
      <li><strong>Assignment:</strong> Copies the reference, not the object</li>
      <li><strong>Examples:</strong> class, interface, delegate, string, array, object</li>
      <li><strong>Default:</strong> Reference is null if not initialized</li>
      <li><strong>Nullability:</strong> Can be null</li>
    </ul>

    <h4>Key Differences</h4>
    <ul>
      <li><strong>Memory:</strong> Value types on stack, reference types on heap</li>
      <li><strong>Performance:</strong> Value types often faster for small data</li>
      <li><strong>Behavior:</strong> Value types copied by value, reference types by reference</li>
      <li><strong>Inheritance:</strong> Only reference types support inheritance</li>
      <li><strong>Boxing:</strong> Converting value to reference type requires boxing</li>
    </ul>
  `,
  codeExample: `using System;

// Value Types
public struct Point {
    public int X { get; set; }
    public int Y { get; set; }

    public Point(int x, int y) {
        X = x;
        Y = y;
    }

    public override string ToString() => $"({X}, {Y})";
}

// Reference Types
public class Rectangle {
    public Point TopLeft { get; set; }
    public Point BottomRight { get; set; }

    public Rectangle(Point topLeft, Point bottomRight) {
        TopLeft = topLeft;
        BottomRight = bottomRight;
    }

    public override string ToString() => $"Rectangle from {TopLeft} to {BottomRight}";
}

public class ValueReferenceDemo {
    public void DemonstrateValueTypes() {
        Console.WriteLine("=== Value Types ===");

        int a = 10;
        int b = a; // Copy of value
        b = 20;

        Console.WriteLine($"a: {a}, b: {b}"); // a: 10, b: 20

        Point p1 = new Point(1, 2);
        Point p2 = p1; // Copy of struct
        p2.X = 5;

        Console.WriteLine($"p1: {p1}, p2: {p2}"); // p1: (1,2), p2: (5,2)
    }

    public void DemonstrateReferenceTypes() {
        Console.WriteLine("=== Reference Types ===");

        Rectangle r1 = new Rectangle(new Point(0, 0), new Point(10, 10));
        Rectangle r2 = r1; // Copy of reference
        r2.TopLeft.X = 5; // Modifies the same object

        Console.WriteLine($"r1: {r1}"); // r1: Rectangle from (5,0) to (10,10)
        Console.WriteLine($"r2: {r2}"); // r2: Rectangle from (5,0) to (10,10)

        // Null reference
        Rectangle r3 = null;
        // Console.WriteLine(r3.ToString()); // NullReferenceException
    }

    public void DemonstrateBoxingUnboxing() {
        Console.WriteLine("=== Boxing and Unboxing ===");

        int value = 42;
        object boxed = value; // Boxing: value type to reference type
        Console.WriteLine($"Boxed type: {boxed.GetType()}"); // System.Int32

        int unboxed = (int)boxed; // Unboxing: reference type to value type
        Console.WriteLine($"Unboxed value: {unboxed}");

        // Performance impact
        const int iterations = 1000000;
        var stopwatch = System.Diagnostics.Stopwatch.StartNew();

        long sum = 0;
        for (int i = 0; i < iterations; i++) {
            sum += i; // No boxing
        }
        stopwatch.Stop();
        Console.WriteLine($"No boxing time: {stopwatch.ElapsedMilliseconds}ms");

        stopwatch.Restart();
        object objSum = 0L;
        for (int i = 0; i < iterations; i++) {
            objSum = (long)objSum + i; // Boxing/unboxing
        }
        stopwatch.Stop();
        Console.WriteLine($"With boxing time: {stopwatch.ElapsedMilliseconds}ms");
    }
}

// Demonstration
public void RunDemo() {
    var demo = new ValueReferenceDemo();
    demo.DemonstrateValueTypes();
    demo.DemonstrateReferenceTypes();
    demo.DemonstrateBoxingUnboxing();
}`,
  keyPoints: [
    'Value types are stored on the stack and copied by value',
    'Reference types are stored on the heap with variables holding references',
    'Modifying a copied value type doesn\'t affect the original',
    'Modifying a copied reference type affects the original object',
    'Boxing converts value types to reference types on the heap',
    'Unboxing converts reference types back to value types',
    'Value types cannot be null (except with Nullable<T>)',
    'Reference types can be null and support inheritance'
  ],
  exercise: 'Create a struct and a class with the same properties. Demonstrate how assignment and modification behave differently between them. Implement a method that takes both value and reference types as parameters and show the differences in behavior. Create a scenario where boxing and unboxing occur and measure the performance impact.'
};