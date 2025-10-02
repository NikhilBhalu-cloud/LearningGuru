import { Topic } from '../../models/section';

export const interfacesAbstractClassesTopic: Topic = {
  id: 'intermediate-oop-interfaces-abstract',
  name: 'Interfaces and Abstract Classes',
  sectionId: 'intermediate',
  slug: 'interfaces-abstract-classes',
  explanation: `
    <h3>Interfaces in C#</h3>
    <p>Interfaces define contracts that implementing classes must follow. They contain method signatures, properties, events, and indexers but no implementation.</p>

    <h4>Key Characteristics of Interfaces</h4>
    <ul>
      <li><strong>No implementation:</strong> Only method signatures and property declarations</li>
      <li><strong>Cannot have fields:</strong> Only properties, methods, events, and indexers</li>
      <li><strong>Multiple inheritance:</strong> Classes can implement multiple interfaces</li>
      <li><strong>Default implementations:</strong> C# 8.0+ allows default method implementations</li>
      <li><strong>Access modifiers:</strong> All members are implicitly public</li>
    </ul>

    <h3>Abstract Classes in C#</h3>
    <p>Abstract classes are incomplete classes that cannot be instantiated. They provide a base for derived classes and can contain both abstract and concrete members.</p>

    <h4>Key Characteristics of Abstract Classes</h4>
    <ul>
      <li><strong>Partial implementation:</strong> Can have both abstract and concrete methods</li>
      <li><strong>Can have fields:</strong> Instance and static fields are allowed</li>
      <li><strong>Single inheritance:</strong> Classes can inherit from only one abstract class</li>
      <li><strong>Constructors:</strong> Can have constructors (called by derived classes)</li>
      <li><strong>Access modifiers:</strong> All access modifiers are supported</li>
    </ul>

    <h4>When to Use Interfaces vs Abstract Classes</h4>
    <ul>
      <li><strong>Use Interfaces when:</strong>
        <ul>
          <li>You need multiple inheritance</li>
          <li>You want to define a contract without implementation</li>
          <li>You need to support different implementations</li>
          <li>You want to achieve loose coupling</li>
        </ul>
      </li>
      <li><strong>Use Abstract Classes when:</strong>
        <ul>
          <li>You want to share common code among related classes</li>
          <li>You need to define default behavior</li>
          <li>You have a class hierarchy with shared state</li>
          <li>You want to provide a template for subclasses</li>
        </ul>
      </li>
    </ul>

    <h4>Interface Segregation Principle</h4>
    <p>Keep interfaces small and focused. A class should not be forced to implement methods it doesn't need.</p>

    <h4>Explicit Interface Implementation</h4>
    <p>When a class implements multiple interfaces with the same method signature, you can implement them explicitly to avoid ambiguity.</p>
  `,
  codeExample: `// Basic Interface Example
public interface IVehicle {
    string Make { get; set; }
    string Model { get; set; }
    int Year { get; set; }

    void Start();
    void Stop();
    void Drive();
    string GetInfo();
}

public interface IElectricVehicle {
    double BatteryLevel { get; }
    void Charge();
    double GetRange();
}

public interface IMaintenance {
    void PerformMaintenance();
    DateTime LastMaintenance { get; set; }
}

// Abstract base class
public abstract class VehicleBase {
    public string Make { get; set; }
    public string Model { get; set; }
    public int Year { get; set; }

    protected VehicleBase(string make, string model, int year) {
        Make = make;
        Model = model;
        Year = year;
    }

    // Abstract methods - must be implemented by derived classes
    public abstract void Start();
    public abstract void Stop();
    public abstract void Drive();

    // Concrete method - inherited by all derived classes
    public virtual string GetInfo() {
        return $"{Year} {Make} {Model}";
    }

    // Concrete method with implementation
    public void Honk() {
        Console.WriteLine("Honk! Honk!");
    }
}

// Concrete class implementing interface and inheriting from abstract class
public class Car : VehicleBase, IVehicle, IMaintenance {
    public int NumberOfDoors { get; set; }
    public DateTime LastMaintenance { get; set; }

    public Car(string make, string model, int year, int doors)
        : base(make, model, year) {
        NumberOfDoors = doors;
        LastMaintenance = DateTime.Now;
    }

    public override void Start() {
        Console.WriteLine($"Starting the {GetInfo()} car...");
    }

    public override void Stop() {
        Console.WriteLine($"Stopping the {GetInfo()} car...");
    }

    public override void Drive() {
        Console.WriteLine($"Driving the {GetInfo()} car...");
    }

    public override string GetInfo() {
        return $"{base.GetInfo()} ({NumberOfDoors} doors)";
    }

    public void PerformMaintenance() {
        Console.WriteLine("Performing maintenance on car...");
        LastMaintenance = DateTime.Now;
    }
}

// Electric car implementing multiple interfaces
public class ElectricCar : VehicleBase, IVehicle, IElectricVehicle, IMaintenance {
    public double BatteryCapacity { get; set; }
    public double CurrentCharge { get; private set; }
    public DateTime LastMaintenance { get; set; }

    public ElectricCar(string make, string model, int year, double batteryCapacity)
        : base(make, model, year) {
        BatteryCapacity = batteryCapacity;
        CurrentCharge = batteryCapacity; // Start fully charged
        LastMaintenance = DateTime.Now;
    }

    public double BatteryLevel => (CurrentCharge / BatteryCapacity) * 100;

    public override void Start() {
        if (BatteryLevel > 5) {
            Console.WriteLine($"Starting the electric {GetInfo()}...");
        } else {
            Console.WriteLine("Battery too low to start!");
        }
    }

    public override void Stop() {
        Console.WriteLine($"Stopping the electric {GetInfo()}...");
    }

    public override void Drive() {
        if (BatteryLevel > 10) {
            CurrentCharge -= 5; // Consume battery
            Console.WriteLine($"Driving the electric {GetInfo()}... Battery: {BatteryLevel:F1}%");
        } else {
            Console.WriteLine("Battery too low to drive!");
        }
    }

    public void Charge() {
        CurrentCharge = BatteryCapacity;
        Console.WriteLine($"Charging complete. Battery: {BatteryLevel:F1}%");
    }

    public double GetRange() {
        // Simplified calculation: 5 miles per kWh
        return CurrentCharge * 5;
    }

    public void PerformMaintenance() {
        Console.WriteLine("Performing maintenance on electric car...");
        LastMaintenance = DateTime.Now;
    }
}

// Interface with default implementation (C# 8.0+)
public interface ILogger {
    void Log(string message);

    // Default implementation
    void LogError(string message) {
        Log($"ERROR: {message}");
    }

    void LogWarning(string message) {
        Log($"WARNING: {message}");
    }
}

// Class implementing interface with default methods
public class ConsoleLogger : ILogger {
    public void Log(string message) {
        Console.WriteLine($"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] {message}");
    }

    // Can override default implementation
    public void LogError(string message) {
        // Custom error logging
        Console.ForegroundColor = ConsoleColor.Red;
        Log($"CRITICAL ERROR: {message}");
        Console.ResetColor();
    }
}

// Multiple interface implementation with explicit implementation
public interface IPrintable {
    void Print();
}

public interface IDisplayable {
    void Display();
}

public class Document : IPrintable, IDisplayable {
    public string Title { get; set; }
    public string Content { get; set; }

    public Document(string title, string content) {
        Title = title;
        Content = content;
    }

    // Explicit interface implementation
    void IPrintable.Print() {
        Console.WriteLine($"Printing document: {Title}");
        Console.WriteLine(Content);
    }

    void IDisplayable.Display() {
        Console.WriteLine($"Displaying document: {Title}");
        Console.WriteLine(Content);
    }

    // Regular method
    public void Save() {
        Console.WriteLine($"Saving document: {Title}");
    }
}

// Abstract class with different access levels
public abstract class DatabaseConnection {
    protected string ConnectionString { get; set; }
    public bool IsConnected { get; protected set; }

    protected DatabaseConnection(string connectionString) {
        ConnectionString = connectionString;
        IsConnected = false;
    }

    public abstract void Connect();
    public abstract void Disconnect();
    protected abstract void ExecuteQuery(string query);

    public void TestConnection() {
        Connect();
        if (IsConnected) {
            Console.WriteLine("Connection test successful");
            Disconnect();
        } else {
            Console.WriteLine("Connection test failed");
        }
    }
}

public class SqlConnection : DatabaseConnection {
    public SqlConnection(string connectionString) : base(connectionString) { }

    public override void Connect() {
        // Simulate SQL connection
        Console.WriteLine("Connecting to SQL database...");
        IsConnected = true;
    }

    public override void Disconnect() {
        Console.WriteLine("Disconnecting from SQL database...");
        IsConnected = false;
    }

    protected override void ExecuteQuery(string query) {
        if (IsConnected) {
            Console.WriteLine($"Executing SQL query: {query}");
        } else {
            throw new InvalidOperationException("Not connected to database");
        }
    }

    public void ExecuteSqlQuery(string query) {
        ExecuteQuery(query);
    }
}

// Demonstration
public void DemonstrateInterfacesAndAbstractClasses() {
    // Using abstract class and interface
    Car car = new Car("Toyota", "Camry", 2023, 4);
    car.Start();
    car.Drive();
    car.Honk(); // Inherited from abstract class
    car.Stop();
    car.PerformMaintenance();

    Console.WriteLine();

    // Using multiple interfaces
    ElectricCar tesla = new ElectricCar("Tesla", "Model 3", 2023, 75.0);
    tesla.Start();
    tesla.Drive();
    Console.WriteLine($"Range: {tesla.GetRange()} miles");
    tesla.Charge();
    tesla.PerformMaintenance();

    Console.WriteLine();

    // Interface with default implementation
    ILogger logger = new ConsoleLogger();
    logger.Log("This is a regular log message");
    logger.LogWarning("This is a warning");
    logger.LogError("This is an error");

    Console.WriteLine();

    // Explicit interface implementation
    Document doc = new Document("My Document", "This is the content of my document.");
    IPrintable printable = doc;
    IDisplayable displayable = doc;

    printable.Print();
    Console.WriteLine();
    displayable.Display();
    Console.WriteLine();
    doc.Save(); // Regular method call

    Console.WriteLine();

    // Abstract class with protected members
    SqlConnection sqlConn = new SqlConnection("Server=myServer;Database=myDB;");
    sqlConn.TestConnection();
    sqlConn.Connect();
    sqlConn.ExecuteSqlQuery("SELECT * FROM Users");
    sqlConn.Disconnect();
}

// Interface segregation example
public interface IOrderProcessor {
    void ProcessOrder(Order order);
}

public interface IOrderValidator {
    bool ValidateOrder(Order order);
}

public interface IOrderNotifier {
    void SendOrderConfirmation(Order order);
}

public interface IPaymentProcessor {
    bool ProcessPayment(Order order);
}

// Better than having one large interface
public class OrderService : IOrderProcessor, IOrderValidator, IOrderNotifier {
    public void ProcessOrder(Order order) {
        if (ValidateOrder(order)) {
            if (ProcessPayment(order)) {
                SendOrderConfirmation(order);
            }
        }
    }

    public bool ValidateOrder(Order order) {
        // Validation logic
        return order.Items.Count > 0 && order.Total > 0;
    }

    public void SendOrderConfirmation(Order order) {
        Console.WriteLine($"Order {order.Id} confirmed and notification sent.");
    }

    public bool ProcessPayment(Order order) {
        // Payment processing logic
        Console.WriteLine($"Processing payment for order {order.Id}");
        return true;
    }
}

public class Order {
    public int Id { get; set; }
    public List<string> Items { get; set; }
    public decimal Total { get; set; }
}`,
  keyPoints: [
    'Interfaces define contracts, abstract classes provide partial implementations',
    'Classes can implement multiple interfaces but inherit from only one abstract class',
    'Abstract classes can have fields and concrete methods, interfaces cannot',
    'Use explicit interface implementation to resolve method name conflicts',
    'C# 8.0+ allows default implementations in interfaces',
    'Follow Interface Segregation Principle for better design',
    'Abstract classes are better for sharing code, interfaces for defining capabilities',
  ],
  exercise:
    'Design a system for a media library. Create interfaces IMediaPlayer, IAudioPlayer, IVideoPlayer. Create an abstract class MediaFile with common properties. Implement concrete classes for AudioFile and VideoFile. Demonstrate polymorphism by creating a playlist that can play different types of media.',
};
