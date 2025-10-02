import { Topic } from '../../models/section';

export const solidPrinciplesTopic: Topic = {
  id: 'advanced-oop-solid-principles',
  name: 'SOLID Principles',
  sectionId: 'advanced',
  slug: 'solid-principles',
  explanation: `
    <h3>SOLID Principles in Object-Oriented Design</h3>
    <p>SOLID is an acronym for five design principles that help create maintainable, understandable, and flexible software. These principles were introduced by Robert C. Martin (Uncle Bob).</p>

    <h4>S - Single Responsibility Principle (SRP)</h4>
    <p>A class should have only one reason to change, meaning it should have only one job or responsibility.</p>

    <h4>O - Open/Closed Principle (OCP)</h4>
    <p>Software entities should be open for extension but closed for modification. You should be able to extend functionality without changing existing code.</p>

    <h4>L - Liskov Substitution Principle (LSP)</h4>
    <p>Objects of a superclass should be replaceable with objects of its subclasses without affecting the correctness of the program.</p>

    <h4>I - Interface Segregation Principle (ISP)</h4>
    <p>Clients should not be forced to depend on interfaces they do not use. Keep interfaces small and focused.</p>

    <h4>D - Dependency Inversion Principle (DIP)</h4>
    <p>High-level modules should not depend on low-level modules. Both should depend on abstractions. Abstractions should not depend on details.</p>

    <h4>Benefits of SOLID Principles</h4>
    <ul>
      <li><strong>Maintainability:</strong> Easier to modify and extend code</li>
      <li><strong>Testability:</strong> Code is more testable with clear dependencies</li>
      <li><strong>Reusability:</strong> Components can be reused in different contexts</li>
      <li><strong>Flexibility:</strong> Changes have minimal impact on other parts</li>
      <li><strong>Readability:</strong> Code is more understandable and self-documenting</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.Linq;

// S - Single Responsibility Principle
// BAD: Class doing too many things
public class BadEmployee {
    public string Name { get; set; }
    public decimal Salary { get; set; }

    // Multiple responsibilities: data, business logic, persistence, reporting
    public void SaveToDatabase() { /* database logic */ }
    public decimal CalculateTax() { /* tax calculation */ }
    public void GenerateReport() { /* reporting logic */ }
    public void SendEmail() { /* email logic */ }
}

// GOOD: Separate classes for separate responsibilities
public class Employee {
    public string Name { get; set; }
    public decimal Salary { get; set; }
}

public class EmployeeRepository {
    public void Save(Employee employee) {
        // Only responsible for data persistence
        Console.WriteLine("Saving employee to database: " + employee.Name);
    }
}

public class TaxCalculator {
    public decimal CalculateTax(Employee employee) {
        // Only responsible for tax calculation
        return employee.Salary * 0.2m;
    }
}

public class EmployeeReportGenerator {
    public void GenerateReport(IEnumerable<Employee> employees) {
        // Only responsible for report generation
        Console.WriteLine("Generating employee report...");
        foreach (var emp in employees) {
            Console.WriteLine(emp.Name + ": $" + emp.Salary);
        }
    }
}

public class EmailService {
    public void SendEmail(string to, string subject, string body) {
        // Only responsible for email sending
        Console.WriteLine("Sending email to " + to + ": " + subject);
    }
}

// O - Open/Closed Principle
// BAD: Modifying existing code for new functionality
public class BadShapeCalculator {
    public double CalculateArea(object shape) {
        if (shape is Rectangle rect) {
            return rect.Width * rect.Height;
        }
        else if (shape is Circle circle) {
            return Math.PI * circle.Radius * circle.Radius;
        }
        // Adding new shape requires modifying this method
        else if (shape is Triangle triangle) {
            return 0.5 * triangle.Base * triangle.Height;
        }
        throw new ArgumentException("Unknown shape");
    }
}

// GOOD: Open for extension, closed for modification
public interface IShape {
    double CalculateArea();
}

public class Rectangle : IShape {
    public double Width { get; set; }
    public double Height { get; set; }

    public double CalculateArea() {
        return Width * Height;
    }
}

public class Circle : IShape {
    public double Radius { get; set; }

    public double CalculateArea() {
        return Math.PI * Radius * Radius;
    }
}

public class Triangle : IShape {
    public double Base { get; set; }
    public double Height { get; set; }

    public double CalculateArea() {
        return 0.5 * Base * Height;
    }
}

public class ShapeCalculator {
    public double CalculateTotalArea(IEnumerable<IShape> shapes) {
        return shapes.Sum(shape => shape.CalculateArea());
    }
}

// L - Liskov Substitution Principle
// BAD: Violating LSP - Square is not substitutable for Rectangle
public class BadRectangle {
    public virtual double Width { get; set; }
    public virtual double Height { get; set; }

    public virtual double CalculateArea() {
        return Width * Height;
    }
}

public class BadSquare : BadRectangle {
    public override double Width {
        get => base.Width;
        set {
            base.Width = value;
            base.Height = value; // This breaks LSP!
        }
    }

    public override double Height {
        get => base.Height;
        set {
            base.Width = value;  // This breaks LSP!
            base.Height = value;
        }
    }
}

// GOOD: Proper inheritance hierarchy
public abstract class Shape {
    public abstract double CalculateArea();
}

public class GoodRectangle : Shape {
    public double Width { get; set; }
    public double Height { get; set; }

    public override double CalculateArea() {
        return Width * Height;
    }
}

public class GoodSquare : Shape {
    public double Side { get; set; }

    public override double CalculateArea() {
        return Side * Side;
    }
}

// I - Interface Segregation Principle
// BAD: Fat interface forcing implementations to depend on methods they don't need
public interface IBadWorker {
    void Work();
    void Eat();
    void Sleep();
    void Code();      // Only developers need this
    void Design();    // Only designers need this
    void Test();      // Only testers need this
}

public class Developer : IBadWorker {
    public void Work() { Console.WriteLine("Working"); }
    public void Eat() { Console.WriteLine("Eating"); }
    public void Sleep() { Console.WriteLine("Sleeping"); }
    public void Code() { Console.WriteLine("Coding"); }
    public void Design() { throw new NotImplementedException(); } // Don't need this
    public void Test() { throw new NotImplementedException(); }   // Don't need this
}

// GOOD: Segregated interfaces
public interface IWorker {
    void Work();
    void Eat();
    void Sleep();
}

public interface IDeveloper : IWorker {
    void Code();
}

public interface IDesigner : IWorker {
    void Design();
}

public interface ITester : IWorker {
    void Test();
}

public class GoodDeveloper : IDeveloper {
    public void Work() { Console.WriteLine("Working"); }
    public void Eat() { Console.WriteLine("Eating"); }
    public void Sleep() { Console.WriteLine("Sleeping"); }
    public void Code() { Console.WriteLine("Coding"); }
}

public class Designer : IDesigner {
    public void Work() { Console.WriteLine("Working"); }
    public void Eat() { Console.WriteLine("Eating"); }
    public void Sleep() { Console.WriteLine("Sleeping"); }
    public void Design() { Console.WriteLine("Designing"); }
}

// D - Dependency Inversion Principle
// BAD: High-level module depends on low-level module
public class BadDataProcessor {
    private FileDataSource _dataSource; // Direct dependency on concrete class

    public BadDataProcessor() {
        _dataSource = new FileDataSource();
    }

    public void Process() {
        var data = _dataSource.GetData();
        // Process data...
        Console.WriteLine("Processing: " + string.Join(", ", data));
    }
}

public class FileDataSource {
    public IEnumerable<string> GetData() {
        return new[] { "data1", "data2", "data3" };
    }
}

// GOOD: Both high-level and low-level modules depend on abstractions
public interface IDataSource {
    IEnumerable<string> GetData();
}

public class FileDataSourceGood : IDataSource {
    public IEnumerable<string> GetData() {
        return new[] { "file_data1", "file_data2", "file_data3" };
    }
}

public class DatabaseDataSource : IDataSource {
    public IEnumerable<string> GetData() {
        return new[] { "db_data1", "db_data2", "db_data3" };
    }
}

public class ApiDataSource : IDataSource {
    public IEnumerable<string> GetData() {
        return new[] { "api_data1", "api_data2", "api_data3" };
    }
}

public class DataProcessor {
    private readonly IDataSource _dataSource;

    // Dependency injection through constructor
    public DataProcessor(IDataSource dataSource) {
        _dataSource = dataSource;
    }

    public void Process() {
        var data = _dataSource.GetData();
        // Process data...
        Console.WriteLine("Processing: " + string.Join(", ", data));
    }
}

// Dependency injection container (simple example)
public class ServiceContainer {
    private Dictionary<Type, object> _services = new Dictionary<Type, object>();

    public void Register<TInterface, TImplementation>() where TImplementation : TInterface, new() {
        _services[typeof(TInterface)] = new TImplementation();
    }

    public void Register<TInterface>(TInterface instance) {
        _services[typeof(TInterface)] = instance;
    }

    public TInterface Resolve<TInterface>() {
        return (TInterface)_services[typeof(TInterface)];
    }
}

// Real-world example combining all SOLID principles
public interface ILogger {
    void Log(string message);
}

public interface IRepository<T> {
    T GetById(int id);
    IEnumerable<T> GetAll();
    void Save(T entity);
    void Delete(int id);
}

public interface IEmailService {
    void SendEmail(string to, string subject, string body);
}

public class ConsoleLogger : ILogger {
    public void Log(string message) {
        Console.WriteLine("[LOG] " + message);
    }
}

public class EmailService : IEmailService {
    private readonly ILogger _logger;

    public EmailService(ILogger logger) {
        _logger = logger;
    }

    public void SendEmail(string to, string subject, string body) {
        _logger.Log("Sending email to " + to + ": " + subject);
        // Send email logic...
    }
}

public class User {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

public class UserRepository : IRepository<User> {
    private List<User> _users = new List<User>();

    public User GetById(int id) {
        return _users.FirstOrDefault(u => u.Id == id);
    }

    public IEnumerable<User> GetAll() {
        return _users;
    }

    public void Save(User entity) {
        var existing = _users.FirstOrDefault(u => u.Id == entity.Id);
        if (existing != null) {
            _users.Remove(existing);
        }
        _users.Add(entity);
    }

    public void Delete(int id) {
        var user = _users.FirstOrDefault(u => u.Id == id);
        if (user != null) {
            _users.Remove(user);
        }
    }
}

public class UserService {
    private readonly IRepository<User> _userRepository;
    private readonly IEmailService _emailService;
    private readonly ILogger _logger;

    public UserService(IRepository<User> userRepository, IEmailService emailService, ILogger logger) {
        _userRepository = userRepository;
        _emailService = emailService;
        _logger = logger;
    }

    public void RegisterUser(string name, string email) {
        var user = new User {
            Id = _userRepository.GetAll().Count() + 1,
            Name = name,
            Email = email
        };

        _userRepository.Save(user);
        _emailService.SendEmail(email, "Welcome!", "Welcome to our system, " + name + "!");
        _logger.Log("User registered: " + name);
    }

    public User GetUser(int id) {
        return _userRepository.GetById(id);
    }
}

// Demonstration
public void DemonstrateSOLIDPrinciples() {
    // Single Responsibility Principle
    Console.WriteLine("=== Single Responsibility Principle ===");
    var employee = new Employee { Name = "John Doe", Salary = 50000 };
    var repository = new EmployeeRepository();
    var taxCalculator = new TaxCalculator();
    var reportGenerator = new EmployeeReportGenerator();
    var emailService = new EmailService();

    repository.Save(employee);
    decimal tax = taxCalculator.CalculateTax(employee);
    reportGenerator.GenerateReport(new[] { employee });
    emailService.SendEmail("john@example.com", "Tax Info", "Your tax is: $" + tax);

    // Open/Closed Principle
    Console.WriteLine("\\n=== Open/Closed Principle ===");
    var shapes = new IShape[] {
        new Rectangle { Width = 5, Height = 10 },
        new Circle { Radius = 3 },
        new Triangle { Base = 4, Height = 6 }
    };

    var calculator = new ShapeCalculator();
    double totalArea = calculator.CalculateTotalArea(shapes);
    Console.WriteLine("Total area: " + totalArea);

    // Liskov Substitution Principle
    Console.WriteLine("\\n=== Liskov Substitution Principle ===");
    var goodShapes = new Shape[] {
        new GoodRectangle { Width = 4, Height = 5 },
        new GoodSquare { Side = 3 }
    };

    foreach (var shape in goodShapes) {
        Console.WriteLine("Area: " + shape.CalculateArea());
    }

    // Interface Segregation Principle
    Console.WriteLine("\\n=== Interface Segregation Principle ===");
    var developer = new GoodDeveloper();
    var designer = new Designer();

    developer.Work();
    developer.Code();

    designer.Work();
    designer.Design();

    // Dependency Inversion Principle
    Console.WriteLine("\\n=== Dependency Inversion Principle ===");
    var container = new ServiceContainer();
    container.Register<ILogger, ConsoleLogger>();
    container.Register<IEmailService>(new EmailService(container.Resolve<ILogger>()));
    container.Register<IRepository<User>, UserRepository>();

    var userService = new UserService(
        container.Resolve<IRepository<User>>(),
        container.Resolve<IEmailService>(),
        container.Resolve<ILogger>()
    );

    userService.RegisterUser("Jane Smith", "jane@example.com");
    var user = userService.GetUser(1);
    if (user != null) {
        Console.WriteLine("Retrieved user: " + user.Name);
    }
}`,
  keyPoints: [
    'Single Responsibility: One class, one reason to change',
    'Open/Closed: Open for extension, closed for modification',
    'Liskov Substitution: Subtypes must be substitutable for base types',
    'Interface Segregation: Keep interfaces small and focused',
    'Dependency Inversion: Depend on abstractions, not concretions',
    'SOLID principles work together to create maintainable code',
    'Use dependency injection to achieve loose coupling',
    'Testability improves when SOLID principles are followed',
  ],
  exercise:
    'Refactor a monolithic class that handles user management, email notifications, data persistence, and reporting. Apply all SOLID principles to create a clean, maintainable design. Use dependency injection and create appropriate interfaces and abstractions.',
};
