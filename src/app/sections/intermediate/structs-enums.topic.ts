import { Topic } from '../../models/section';

export const structsEnumsTopic: Topic = {
  id: 'intermediate-structs-enums',
  name: 'Structs and Enums',
  sectionId: 'intermediate',
  slug: 'structs-enums',
  explanation: `
    <h3>Structs in C#</h3>
    <p>Structs are value types that encapsulate data and related functionality. They are similar to classes but with key differences in memory allocation and behavior.</p>

    <h4>Structs vs Classes</h4>
    <table>
      <tr><th>Aspect</th><th>Struct</th><th>Class</th></tr>
      <tr><td>Inheritance</td><td>Cannot inherit (except from interfaces)</td><td>Can inherit from one class</td></tr>
      <tr><td>Memory</td><td>Stack (value type)</td><td>Heap (reference type)</td></tr>
      <tr><td>Default Constructor</td><td>Parameterless constructor not allowed</td><td>Default constructor provided</td></tr>
      <tr><td>Null Values</td><td>Cannot be null</td><td>Can be null</td></tr>
      <tr><td>Performance</td><td>Faster for small data structures</td><td>Overhead of reference management</td></tr>
      <tr><td>When to Use</td><td>Small, immutable data structures</td><td>Large objects, inheritance needed</td></tr>
    </table>

    <h4>Struct Guidelines</h4>
    <ul>
      <li><strong>Size:</strong> Keep structs small (16 bytes or less recommended)</li>
      <li><strong>Immutability:</strong> Prefer readonly structs for thread safety</li>
      <li><strong>Interfaces:</strong> Can implement interfaces</li>
      <li><strong>Constructors:</strong> Must initialize all fields</li>
      <li><strong>Destructors:</strong> Not allowed</li>
    </ul>

    <h3>Enums in C#</h3>
    <p>Enums provide a way to define named constants. They improve code readability and type safety by restricting values to a predefined set.</p>

    <h4>Enum Features</h4>
    <ul>
      <li><strong>Underlying Type:</strong> int by default, can be byte, sbyte, short, ushort, int, uint, long, ulong</li>
      <li><strong>Flags:</strong> Use FlagsAttribute for bitwise combinations</li>
      <li><strong>Extension Methods:</strong> Can add methods to enums</li>
      <li><strong>Parsing:</strong> Convert strings to enum values</li>
      <li><strong>Description:</strong> Use attributes for display names</li>
    </ul>

    <h4>Enum Best Practices</h4>
    <ul>
      <li>Use singular names for simple enums, plural for flags</li>
      <li>Specify underlying type explicitly when needed</li>
      <li>Use 0 as default/none value</li>
      <li>Consider using [Flags] for combinable values</li>
      <li>Validate enum values when parsing from external sources</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.ComponentModel;

// Struct Examples
public struct Point {
    public int X { get; set; }
    public int Y { get; set; }

    // Constructor must initialize all fields
    public Point(int x, int y) {
        X = x;
        Y = y;
    }

    // Custom methods
    public double DistanceFromOrigin() {
        return Math.Sqrt(X * X + Y * Y);
    }

    public Point Move(int deltaX, int deltaY) {
        return new Point(X + deltaX, Y + deltaY);
    }

    public override string ToString() {
        return $"({X}, {Y})";
    }
}

public struct Rectangle {
    public Point TopLeft { get; set; }
    public Point BottomRight { get; set; }

    public Rectangle(Point topLeft, Point bottomRight) {
        TopLeft = topLeft;
        BottomRight = bottomRight;
    }

    public int Width => Math.Abs(BottomRight.X - TopLeft.X);
    public int Height => Math.Abs(BottomRight.Y - TopLeft.Y);
    public int Area => Width * Height;

    public bool Contains(Point point) {
        return point.X >= TopLeft.X && point.X <= BottomRight.X &&
               point.Y >= TopLeft.Y && point.Y <= BottomRight.Y;
    }

    public override string ToString() {
        return $"Rectangle[{TopLeft} to {BottomRight}, Area: {Area}]";
    }
}

// Readonly struct (C# 7.2+)
public readonly struct ImmutablePoint {
    public int X { get; }
    public int Y { get; }

    public ImmutablePoint(int x, int y) {
        X = x;
        Y = y;
    }

    public double DistanceFromOrigin() => Math.Sqrt(X * X + Y * Y);

    public ImmutablePoint Move(int deltaX, int deltaY) {
        return new ImmutablePoint(X + deltaX, Y + deltaY);
    }

    public override string ToString() => $"Immutable({X}, {Y})";
}

// Struct implementing interface
public interface IShape {
    double CalculateArea();
    double CalculatePerimeter();
    string GetDescription();
}

public struct Circle : IShape {
    public Point Center { get; set; }
    public double Radius { get; set; }

    public Circle(Point center, double radius) {
        Center = center;
        Radius = radius;
    }

    public double CalculateArea() {
        return Math.PI * Radius * Radius;
    }

    public double CalculatePerimeter() {
        return 2 * Math.PI * Radius;
    }

    public string GetDescription() {
        return $"Circle at {Center} with radius {Radius}";
    }

    public bool Contains(Point point) {
        double distance = Math.Sqrt(
            Math.Pow(point.X - Center.X, 2) +
            Math.Pow(point.Y - Center.Y, 2)
        );
        return distance <= Radius;
    }
}

// Enum Examples
public enum DayOfWeek {
    Sunday = 0,
    Monday = 1,
    Tuesday = 2,
    Wednesday = 3,
    Thursday = 4,
    Friday = 5,
    Saturday = 6
}

public enum Priority {
    Low = 1,
    Medium = 2,
    High = 3,
    Critical = 4
}

// Enum with custom underlying type
public enum StatusCode : byte {
    Success = 200,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    InternalServerError = 500
}

// Flags enum for bitwise operations
[Flags]
public enum FilePermissions {
    None = 0,
    Read = 1,
    Write = 2,
    Execute = 4,
    ReadWrite = Read | Write,
    All = Read | Write | Execute
}

// Enum with extension methods
public static class EnumExtensions {
    public static string GetDescription(this Enum value) {
        var field = value.GetType().GetField(value.ToString());
        var attribute = field?.GetCustomAttributes(typeof(DescriptionAttribute), false)
                              .FirstOrDefault() as DescriptionAttribute;
        return attribute?.Description ?? value.ToString();
    }

    public static T ParseEnum<T>(string value, T defaultValue = default(T)) where T : struct {
        if (Enum.TryParse(value, true, out T result)) {
            return result;
        }
        return defaultValue;
    }

    public static IEnumerable<T> GetValues<T>() where T : struct {
        return Enum.GetValues(typeof(T)).Cast<T>();
    }

    public static bool IsValid<T>(T value) where T : struct {
        return Enum.IsDefined(typeof(T), value);
    }
}

// Structs and Enums in action
public class StructsAndEnumsDemo {
    public void DemonstrateStructs() {
        Console.WriteLine("=== Struct Demonstrations ===");

        // Basic struct usage
        Point p1 = new Point(3, 4);
        Point p2 = new Point(6, 8);

        Console.WriteLine($"Point 1: {p1}");
        Console.WriteLine($"Point 2: {p2}");
        Console.WriteLine($"Distance from origin: {p1.DistanceFromOrigin():F2}");

        // Struct assignment (creates copy)
        Point p3 = p1;
        p3.X = 10;
        Console.WriteLine($"Original: {p1}, Modified copy: {p3}");

        // Rectangle struct
        Rectangle rect = new Rectangle(new Point(0, 0), new Point(5, 3));
        Console.WriteLine($"Rectangle: {rect}");
        Console.WriteLine($"Contains (2,2): {rect.Contains(new Point(2, 2))}");
        Console.WriteLine($"Contains (6,2): {rect.Contains(new Point(6, 2))}");

        // Immutable struct
        ImmutablePoint ip1 = new ImmutablePoint(1, 2);
        ImmutablePoint ip2 = ip1.Move(3, 4);
        Console.WriteLine($"Original: {ip1}, Moved: {ip2}");

        // Interface implementation
        Circle circle = new Circle(new Point(0, 0), 5.0);
        Console.WriteLine($"Circle: {circle.GetDescription()}");
        Console.WriteLine($"Area: {circle.CalculateArea():F2}");
        Console.WriteLine($"Contains (3,4): {circle.Contains(new Point(3, 4))}");

        // Array of structs
        Point[] points = new Point[] {
            new Point(0, 0),
            new Point(1, 1),
            new Point(2, 2)
        };

        foreach (Point p in points) {
            Console.WriteLine($"Point: {p}, Distance: {p.DistanceFromOrigin():F2}");
        }
    }

    public void DemonstrateEnums() {
        Console.WriteLine("\\n=== Enum Demonstrations ===");

        // Basic enum usage
        DayOfWeek today = DayOfWeek.Monday;
        Console.WriteLine($"Today is: {today}");
        Console.WriteLine($"Numeric value: {(int)today}");

        // Enum iteration
        Console.WriteLine("All days of week:");
        foreach (DayOfWeek day in Enum.GetValues(typeof(DayOfWeek))) {
            Console.WriteLine($"  {day} = {(int)day}");
        }

        // Priority enum
        Priority taskPriority = Priority.High;
        Console.WriteLine($"Task priority: {taskPriority}");

        if (taskPriority >= Priority.High) {
            Console.WriteLine("This is a high priority task!");
        }

        // Status code enum
        StatusCode response = StatusCode.NotFound;
        Console.WriteLine($"HTTP Status: {response} ({(int)response})");

        // Parsing enums
        string dayString = "wednesday";
        if (Enum.TryParse(dayString, true, out DayOfWeek parsedDay)) {
            Console.WriteLine($"Parsed '{dayString}' to {parsedDay}");
        }

        // Invalid parsing
        if (!Enum.TryParse("invalid", true, out DayOfWeek invalidDay)) {
            Console.WriteLine("'invalid' is not a valid day");
        }
    }

    public void DemonstrateFlagsEnums() {
        Console.WriteLine("\\n=== Flags Enum Demonstrations ===");

        // File permissions
        FilePermissions userPerms = FilePermissions.Read | FilePermissions.Write;
        FilePermissions adminPerms = FilePermissions.All;

        Console.WriteLine($"User permissions: {userPerms}");
        Console.WriteLine($"Admin permissions: {adminPerms}");

        // Check permissions
        Console.WriteLine($"User can read: {userPerms.HasFlag(FilePermissions.Read)}");
        Console.WriteLine($"User can execute: {userPerms.HasFlag(FilePermissions.Execute)}");
        Console.WriteLine($"Admin has all permissions: {adminPerms.HasFlag(FilePermissions.All)}");

        // Add permissions
        userPerms |= FilePermissions.Execute;
        Console.WriteLine($"User permissions after adding execute: {userPerms}");

        // Remove permissions
        userPerms &= ~FilePermissions.Write;
        Console.WriteLine($"User permissions after removing write: {userPerms}");

        // Check for specific combination
        if ((userPerms & FilePermissions.ReadWrite) == FilePermissions.ReadWrite) {
            Console.WriteLine("User has both read and write permissions");
        }

        // Display all permissions
        Console.WriteLine("All possible permission combinations:");
        foreach (FilePermissions perm in Enum.GetValues(typeof(FilePermissions))) {
            if (perm != FilePermissions.None) {
                Console.WriteLine($"  {perm} = {Convert.ToString((int)perm, 2).PadLeft(3, '0')}b");
            }
        }
    }

    public void DemonstrateEnumExtensions() {
        Console.WriteLine("\\n=== Enum Extension Methods ===");

        // Using extension methods
        DayOfWeek day = DayOfWeek.Friday;
        Console.WriteLine($"Day: {day.GetDescription()}");

        // Safe parsing
        Priority parsedPriority = EnumExtensions.ParseEnum("high", Priority.Medium);
        Console.WriteLine($"Parsed priority: {parsedPriority}");

        // Invalid parsing with default
        Priority invalidPriority = EnumExtensions.ParseEnum("urgent", Priority.Low);
        Console.WriteLine($"Invalid priority defaults to: {invalidPriority}");

        // Get all values
        Console.WriteLine("All priority values:");
        foreach (Priority p in EnumExtensions.GetValues<Priority>()) {
            Console.WriteLine($"  {p} ({(int)p})");
        }

        // Validation
        Console.WriteLine($"Is Priority.High valid? {EnumExtensions.IsValid(Priority.High)}");
        Console.WriteLine($"Is (Priority)999 valid? {EnumExtensions.IsValid((Priority)999)}");
    }

    public void DemonstrateStructPerformance() {
        Console.WriteLine("\\n=== Struct Performance Comparison ===");

        const int iterations = 1000000;

        // Struct performance
        var structStart = DateTime.Now;
        Point[] structArray = new Point[iterations];
        for (int i = 0; i < iterations; i++) {
            structArray[i] = new Point(i, i);
            Point p = structArray[i];
            double distance = p.DistanceFromOrigin();
        }
        var structTime = DateTime.Now - structStart;

        // Class performance (for comparison)
        var classStart = DateTime.Now;
        PointClass[] classArray = new PointClass[iterations];
        for (int i = 0; i < iterations; i++) {
            classArray[i] = new PointClass(i, i);
            PointClass p = classArray[i];
            double distance = p.DistanceFromOrigin();
        }
        var classTime = DateTime.Now - classStart;

        Console.WriteLine($"Struct operations took: {structTime.TotalMilliseconds:F2}ms");
        Console.WriteLine($"Class operations took: {classTime.TotalMilliseconds:F2}ms");
        Console.WriteLine($"Struct is {classTime.TotalMilliseconds / structTime.TotalMilliseconds:F2}x faster");
    }

    public void DemonstrateStructLimitations() {
        Console.WriteLine("\\n=== Struct Limitations ===");

        // Structs cannot be null
        Point? nullablePoint = null;
        if (nullablePoint.HasValue) {
            Console.WriteLine($"Point: {nullablePoint.Value}");
        } else {
            Console.WriteLine("Point is null");
        }

        // Boxing occurs when treating struct as object
        Point p = new Point(1, 2);
        object boxed = p; // Boxing
        Point unboxed = (Point)boxed; // Unboxing
        Console.WriteLine($"Original: {p}, Unboxed: {unboxed}");

        // Large structs should be classes
        LargeStruct largeStruct = new LargeStruct();
        Console.WriteLine("Large struct created (this might be inefficient)");
    }
}

// Supporting class for performance comparison
public class PointClass {
    public int X { get; set; }
    public int Y { get; set; }

    public PointClass(int x, int y) {
        X = x;
        Y = y;
    }

    public double DistanceFromOrigin() {
        return Math.Sqrt(X * X + Y * Y);
    }
}

// Large struct (demonstrates when to use class instead)
public struct LargeStruct {
    public long Field1, Field2, Field3, Field4, Field5;
    public double Double1, Double2, Double3, Double4, Double5;
    public string String1, String2, String3;

    // This struct is over 100 bytes - consider using a class
}

// Advanced enum usage
public enum LogLevel {
    [Description("Trace")]
    Trace = 0,

    [Description("Debug")]
    Debug = 1,

    [Description("Information")]
    Information = 2,

    [Description("Warning")]
    Warning = 3,

    [Description("Error")]
    Error = 4,

    [Description("Critical")]
    Critical = 5
}

public static class Logger {
    public static void Log(LogLevel level, string message) {
        string description = level.GetDescription();
        Console.WriteLine($"[{DateTime.Now:HH:mm:ss}] {description}: {message}");
    }
}

// Enum with methods
public enum OperationResult {
    Success = 0,
    InvalidInput = 1,
    NotFound = 2,
    AccessDenied = 3,
    ServerError = 4
}

public static class OperationResultExtensions {
    public static bool IsSuccess(this OperationResult result) {
        return result == OperationResult.Success;
    }

    public static bool IsClientError(this OperationResult result) {
        return result == OperationResult.InvalidInput ||
               result == OperationResult.NotFound ||
               result == OperationResult.AccessDenied;
    }

    public static bool IsServerError(this OperationResult result) {
        return result == OperationResult.ServerError;
    }

    public static string GetErrorMessage(this OperationResult result) {
        return result switch {
            OperationResult.Success => "Operation completed successfully",
            OperationResult.InvalidInput => "The provided input is invalid",
            OperationResult.NotFound => "The requested resource was not found",
            OperationResult.AccessDenied => "Access to the resource is denied",
            OperationResult.ServerError => "An internal server error occurred",
            _ => "Unknown error occurred"
        };
    }
}

// Main demonstration
public void RunStructsAndEnumsDemo() {
    StructsAndEnumsDemo demo = new StructsAndEnumsDemo();

    demo.DemonstrateStructs();
    demo.DemonstrateEnums();
    demo.DemonstrateFlagsEnums();
    demo.DemonstrateEnumExtensions();
    demo.DemonstrateStructPerformance();
    demo.DemonstrateStructLimitations();

    // Advanced enum usage
    Console.WriteLine("\\n=== Advanced Enum Usage ===");

    Logger.Log(LogLevel.Information, "Application started");
    Logger.Log(LogLevel.Warning, "Low disk space detected");
    Logger.Log(LogLevel.Error, "Database connection failed");

    // Operation results
    OperationResult[] results = {
        OperationResult.Success,
        OperationResult.InvalidInput,
        OperationResult.ServerError
    };

    foreach (OperationResult result in results) {
        Console.WriteLine($"{result}: {result.GetErrorMessage()}");
        Console.WriteLine($"  Is success: {result.IsSuccess()}");
        Console.WriteLine($"  Is client error: {result.IsClientError()}");
        Console.WriteLine($"  Is server error: {result.IsServerError()}");
    }
}`,
  keyPoints: [
    'Structs are value types stored on the stack, classes are reference types on the heap',
    'Use structs for small, immutable data structures; classes for larger objects',
    'Enums provide type-safe constants and improve code readability',
    'Use [Flags] attribute for enums that support bitwise combinations',
    'Extension methods can enhance enums with additional functionality',
    'Structs cannot be null and cannot inherit from other structs',
    'Prefer readonly structs for immutable data to ensure thread safety',
  ],
  exercise:
    'Create a graphics system using structs and enums: 1) Define Color enum with RGB values, 2) Create Pixel struct with position and color, 3) Implement Shape enum (Circle, Rectangle, Triangle), 4) Create Shape struct with type, dimensions, and fill color, 5) Build Canvas class that can draw shapes and get pixel colors, 6) Add extension methods for color mixing and shape area calculations.',
};
