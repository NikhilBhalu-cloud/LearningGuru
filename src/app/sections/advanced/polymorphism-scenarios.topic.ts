import { Topic } from '../../models/section';

export const polymorphismScenariosTopic: Topic = {
  id: 'advanced-oop-polymorphism-scenarios',
  name: 'Polymorphism Scenarios',
  sectionId: 'advanced',
  slug: 'polymorphism-scenarios',
  explanation: `
    <h3>Advanced Polymorphism Scenarios</h3>
    <p>Polymorphism allows objects of different types to be treated as objects of a common base type. This topic explores advanced scenarios and patterns where polymorphism shines.</p>

    <h4>Types of Polymorphism</h4>
    <ul>
      <li><strong>Subtype Polymorphism:</strong> Inheritance-based polymorphism</li>
      <li><strong>Parametric Polymorphism:</strong> Generics-based polymorphism</li>
      <li><strong>Ad-hoc Polymorphism:</strong> Method overloading and operator overloading</li>
      <li><strong>Coercion Polymorphism:</strong> Type conversion polymorphism</li>
    </ul>

    <h4>Advanced Polymorphism Patterns</h4>
    <ul>
      <li><strong>Strategy Pattern:</strong> Interchangeable algorithms</li>
      <li><strong>Factory Pattern:</strong> Object creation polymorphism</li>
      <li><strong>Visitor Pattern:</strong> Double dispatch polymorphism</li>
      <li><strong>Decorator Pattern:</strong> Dynamic behavior modification</li>
      <li><strong>Command Pattern:</strong> Encapsulated method calls</li>
    </ul>

    <h4>Covariance and Contravariance</h4>
    <ul>
      <li><strong>Covariance:</strong> Allows more derived return types</li>
      <li><strong>Contravariance:</strong> Allows less derived parameter types</li>
      <li><strong>Invariant:</strong> No variance allowed</li>
    </ul>

    <h4>Runtime Type Information (RTTI)</h4>
    <ul>
      <li><strong>is/as operators:</strong> Type checking and safe casting</li>
      <li><strong>GetType():</strong> Runtime type inspection</li>
      <li><strong>typeof operator:</strong> Compile-time type information</li>
      <li><strong>Type class:</strong> Reflection-based type operations</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.Linq;

// Strategy Pattern - Algorithm Polymorphism
public interface IPaymentStrategy {
    void Pay(decimal amount);
    string GetPaymentMethod();
}

public class CreditCardPayment : IPaymentStrategy {
    private string _cardNumber;
    private string _cardHolder;

    public CreditCardPayment(string cardNumber, string cardHolder) {
        _cardNumber = cardNumber;
        _cardHolder = cardHolder;
    }

    public void Pay(decimal amount) {
        Console.WriteLine("Processing credit card payment of $" + amount + " for " + _cardHolder);
        // Simulate payment processing
        Console.WriteLine("Payment approved ✓");
    }

    public string GetPaymentMethod() => "Credit Card";
}

public class PayPalPayment : IPaymentStrategy {
    private string _email;

    public PayPalPayment(string email) {
        _email = email;
    }

    public void Pay(decimal amount) {
        Console.WriteLine("Processing PayPal payment of $" + amount + " for " + _email);
        Console.WriteLine("Payment approved ✓");
    }

    public string GetPaymentMethod() => "PayPal";
}

public class BankTransferPayment : IPaymentStrategy {
    private string _accountNumber;

    public BankTransferPayment(string accountNumber) {
        _accountNumber = accountNumber;
    }

    public void Pay(decimal amount) {
        Console.WriteLine("Processing bank transfer of $" + amount + " to account " + _accountNumber);
        Console.WriteLine("Transfer initiated ✓");
    }

    public string GetPaymentMethod() => "Bank Transfer";
}

public class ShoppingCart {
    private List<CartItem> _items = new List<CartItem>();
    private IPaymentStrategy _paymentStrategy;

    public void AddItem(CartItem item) {
        _items.Add(item);
    }

    public void SetPaymentStrategy(IPaymentStrategy strategy) {
        _paymentStrategy = strategy;
    }

    public decimal CalculateTotal() {
        return _items.Sum(item => item.Price * item.Quantity);
    }

    public void Checkout() {
        decimal total = CalculateTotal();
        Console.WriteLine("Total amount: $" + total);

        if (_paymentStrategy == null) {
            throw new InvalidOperationException("Payment strategy not set");
        }

        _paymentStrategy.Pay(total);
    }
}

public class CartItem {
    public string Name { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}

// Factory Pattern - Creation Polymorphism
public abstract class Animal {
    public abstract string MakeSound();
    public abstract string GetDescription();
}

public class Dog : Animal {
    public override string MakeSound() => "Woof!";
    public override string GetDescription() => "A loyal dog";
}

public class Cat : Animal {
    public override string MakeSound() => "Meow!";
    public override string GetDescription() => "A curious cat";
}

public class Bird : Animal {
    public override string MakeSound() => "Tweet!";
    public override string GetDescription() => "A colorful bird";
}

public interface IAnimalFactory {
    Animal CreateAnimal();
}

public class DogFactory : IAnimalFactory {
    public Animal CreateAnimal() => new Dog();
}

public class CatFactory : IAnimalFactory {
    public Animal CreateAnimal() => new Cat();
}

public class BirdFactory : IAnimalFactory {
    public Animal CreateAnimal() => new Bird();
}

public class Zoo {
    private Dictionary<string, IAnimalFactory> _factories = new Dictionary<string, IAnimalFactory>();

    public Zoo() {
        _factories["dog"] = new DogFactory();
        _factories["cat"] = new CatFactory();
        _factories["bird"] = new BirdFactory();
    }

    public Animal CreateAnimal(string type) {
        if (_factories.TryGetValue(type.ToLower(), out var factory)) {
            return factory.CreateAnimal();
        }
        throw new ArgumentException($"Unknown animal type: {type}");
    }
}

// Visitor Pattern - Double Dispatch Polymorphism
public interface IShapeVisitor {
    void Visit(Circle circle);
    void Visit(Rectangle rectangle);
    void Visit(Triangle triangle);
}

public interface IShape {
    void Accept(IShapeVisitor visitor);
    double GetArea();
}

public class Circle : IShape {
    public double Radius { get; set; }

    public Circle(double radius) {
        Radius = radius;
    }

    public void Accept(IShapeVisitor visitor) {
        visitor.Visit(this);
    }

    public double GetArea() {
        return Math.PI * Radius * Radius;
    }
}

public class Rectangle : IShape {
    public double Width { get; set; }
    public double Height { get; set; }

    public Rectangle(double width, double height) {
        Width = width;
        Height = height;
    }

    public void Accept(IShapeVisitor visitor) {
        visitor.Visit(this);
    }

    public double GetArea() {
        return Width * Height;
    }
}

public class Triangle : IShape {
    public double Base { get; set; }
    public double Height { get; set; }

    public Triangle(double @base, double height) {
        Base = @base;
        Height = height;
    }

    public void Accept(IShapeVisitor visitor) {
        visitor.Visit(this);
    }

    public double GetArea() {
        return 0.5 * Base * Height;
    }
}

public class AreaCalculatorVisitor : IShapeVisitor {
    public double TotalArea { get; private set; }

    public void Visit(Circle circle) {
        double area = circle.GetArea();
        Console.WriteLine($"Circle area: {area:F2}");
        TotalArea += area;
    }

    public void Visit(Rectangle rectangle) {
        double area = rectangle.GetArea();
        Console.WriteLine($"Rectangle area: {area:F2}");
        TotalArea += area;
    }

    public void Visit(Triangle triangle) {
        double area = triangle.GetArea();
        Console.WriteLine($"Triangle area: {area:F2}");
        TotalArea += area;
    }
}

public class ShapeDescriptionVisitor : IShapeVisitor {
    public void Visit(Circle circle) {
        Console.WriteLine($"This is a circle with radius {circle.Radius}");
    }

    public void Visit(Rectangle rectangle) {
        Console.WriteLine($"This is a rectangle {rectangle.Width} x {rectangle.Height}");
    }

    public void Visit(Triangle triangle) {
        Console.WriteLine($"This is a triangle with base {triangle.Base} and height {triangle.Height}");
    }
}

// Decorator Pattern - Dynamic Polymorphism
public interface ITextProcessor {
    string Process(string text);
}

public class BaseTextProcessor : ITextProcessor {
    public virtual string Process(string text) {
        return text;
    }
}

public abstract class TextProcessorDecorator : ITextProcessor {
    protected ITextProcessor _processor;

    protected TextProcessorDecorator(ITextProcessor processor) {
        _processor = processor;
    }

    public virtual string Process(string text) {
        return _processor.Process(text);
    }
}

public class UpperCaseDecorator : TextProcessorDecorator {
    public UpperCaseDecorator(ITextProcessor processor) : base(processor) { }

    public override string Process(string text) {
        return base.Process(text).ToUpper();
    }
}

public class TrimDecorator : TextProcessorDecorator {
    public TrimDecorator(ITextProcessor processor) : base(processor) { }

    public override string Process(string text) {
        return base.Process(text).Trim();
    }
}

public class ReverseDecorator : TextProcessorDecorator {
    public ReverseDecorator(ITextProcessor processor) : base(processor) { }

    public override string Process(string text) {
        char[] charArray = base.Process(text).ToCharArray();
        Array.Reverse(charArray);
        return new string(charArray);
    }
}

// Command Pattern - Encapsulated Polymorphism
public interface ICommand {
    void Execute();
    void Undo();
    string GetDescription();
}

public class Light {
    public bool IsOn { get; private set; }

    public void TurnOn() {
        IsOn = true;
        Console.WriteLine("Light is ON");
    }

    public void TurnOff() {
        IsOn = false;
        Console.WriteLine("Light is OFF");
    }
}

public class LightOnCommand : ICommand {
    private Light _light;

    public LightOnCommand(Light light) {
        _light = light;
    }

    public void Execute() {
        _light.TurnOn();
    }

    public void Undo() {
        _light.TurnOff();
    }

    public string GetDescription() => "Turn light on";
}

public class LightOffCommand : ICommand {
    private Light _light;

    public LightOffCommand(Light light) {
        _light = light;
    }

    public void Execute() {
        _light.TurnOff();
    }

    public void Undo() {
        _light.TurnOn();
    }

    public string GetDescription() => "Turn light off";
}

public class RemoteControl {
    private Stack<ICommand> _commandHistory = new Stack<ICommand>();

    public void ExecuteCommand(ICommand command) {
        command.Execute();
        _commandHistory.Push(command);
    }

    public void UndoLastCommand() {
        if (_commandHistory.Count > 0) {
            var command = _commandHistory.Pop();
            command.Undo();
        }
    }
}

// Covariance and Contravariance
public interface IProducer<out T> {
    T Produce();
}

public interface IConsumer<in T> {
    void Consume(T item);
}

public class AnimalProducer : IProducer<Animal> {
    public Animal Produce() {
        // Randomly return different animals
        var animals = new Animal[] { new Dog(), new Cat(), new Bird() };
        return animals[new Random().Next(animals.Length)];
    }
}

public class DogConsumer : IConsumer<Dog> {
    public void Consume(Dog dog) {
        Console.WriteLine($"Consuming dog: {dog.GetDescription()}");
    }
}

// Covariant assignment
public class CovariantExample {
    public void DemonstrateCovariance() {
        IProducer<Animal> animalProducer = new AnimalProducer();
        Animal animal = animalProducer.Produce();
        Console.WriteLine($"Produced: {animal.GetDescription()}");
    }

    public void DemonstrateContravariance() {
        IConsumer<Dog> dogConsumer = new DogConsumer();
        // Contravariant assignment - more general consumer can accept more specific types
        IConsumer<Animal> animalConsumer = dogConsumer;

        Dog dog = new Dog();
        animalConsumer.Consume(dog); // This works due to contravariance
    }
}

// Runtime Type Information and Polymorphism
public class TypeInspector {
    public void InspectObject(object obj) {
        Console.WriteLine($"Object type: {obj.GetType().Name}");

        // is/as operators with polymorphism
        if (obj is Animal animal) {
            Console.WriteLine($"It's an animal: {animal.GetDescription()}");
            Console.WriteLine($"Sound: {animal.MakeSound()}");
        }
        else if (obj is IShape shape) {
            Console.WriteLine($"It's a shape with area: {shape.GetArea()}");
        }
        else if (obj is string str) {
            Console.WriteLine($"It's a string: '{str}'");
        }
        else {
            Console.WriteLine("Unknown object type");
        }
    }

    public void DemonstrateTypeOf() {
        Type animalType = typeof(Animal);
        Type dogType = typeof(Dog);

        Console.WriteLine($"Animal type: {animalType.Name}");
        Console.WriteLine($"Dog type: {dogType.Name}");
        Console.WriteLine($"Dog is subclass of Animal: {dogType.IsSubclassOf(animalType)}");
        Console.WriteLine($"Dog implements ICloneable: {typeof(ICloneable).IsAssignableFrom(dogType)}");
    }
}

// Parametric Polymorphism with Generics
public class PolymorphicContainer<T> {
    private List<T> _items = new List<T>();

    public void Add(T item) {
        _items.Add(item);
    }

    public void ProcessItems(Action<T> processor) {
        foreach (var item in _items) {
            processor(item);
        }
    }

    public TResult TransformItems<TResult>(Func<T, TResult> transformer) {
        // This is a simplified example - in practice you'd return a collection
        if (_items.Count > 0) {
            return transformer(_items[0]);
        }
        return default(TResult);
    }
}

// Demonstration
public void DemonstratePolymorphismScenarios() {
    // Strategy Pattern
    Console.WriteLine("=== Strategy Pattern ===");
    var cart = new ShoppingCart();
    cart.AddItem(new CartItem { Name = "Laptop", Price = 999.99m, Quantity = 1 });
    cart.AddItem(new CartItem { Name = "Mouse", Price = 29.99m, Quantity = 2 });

    cart.SetPaymentStrategy(new CreditCardPayment("1234-5678-9012-3456", "John Doe"));
    cart.Checkout();

    // Factory Pattern
    Console.WriteLine("\\n=== Factory Pattern ===");
    var zoo = new Zoo();
    Animal dog = zoo.CreateAnimal("dog");
    Animal cat = zoo.CreateAnimal("cat");
    Animal bird = zoo.CreateAnimal("bird");

    Console.WriteLine($"{dog.GetDescription()}: {dog.MakeSound()}");
    Console.WriteLine($"{cat.GetDescription()}: {cat.MakeSound()}");
    Console.WriteLine($"{bird.GetDescription()}: {bird.MakeSound()}");

    // Visitor Pattern
    Console.WriteLine("\\n=== Visitor Pattern ===");
    var shapes = new IShape[] {
        new Circle(5),
        new Rectangle(4, 6),
        new Triangle(3, 4)
    };

    var areaCalculator = new AreaCalculatorVisitor();
    var descriptionVisitor = new ShapeDescriptionVisitor();

    foreach (var shape in shapes) {
        shape.Accept(descriptionVisitor);
        shape.Accept(areaCalculator);
    }
    Console.WriteLine($"Total area: {areaCalculator.TotalArea:F2}");

    // Decorator Pattern
    Console.WriteLine("\\n=== Decorator Pattern ===");
    ITextProcessor processor = new BaseTextProcessor();
    processor = new UpperCaseDecorator(processor);
    processor = new TrimDecorator(processor);
    processor = new ReverseDecorator(processor);

    string result = processor.Process("  hello world  ");
    Console.WriteLine($"Processed text: '{result}'");

    // Command Pattern
    Console.WriteLine("\\n=== Command Pattern ===");
    var light = new Light();
    var remote = new RemoteControl();

    var lightOn = new LightOnCommand(light);
    var lightOff = new LightOffCommand(light);

    remote.ExecuteCommand(lightOn);
    remote.ExecuteCommand(lightOff);
    remote.UndoLastCommand(); // Should turn light back on

    // Covariance/Contravariance
    Console.WriteLine("\\n=== Covariance/Contravariance ===");
    var covariantExample = new CovariantExample();
    covariantExample.DemonstrateCovariance();
    covariantExample.DemonstrateContravariance();

    // Runtime Type Information
    Console.WriteLine("\\n=== Runtime Type Information ===");
    var inspector = new TypeInspector();
    inspector.InspectObject(new Dog());
    inspector.InspectObject(new Circle(3));
    inspector.InspectObject("Hello World");
    inspector.DemonstrateTypeOf();

    // Parametric Polymorphism
    Console.WriteLine("\\n=== Parametric Polymorphism ===");
    var stringContainer = new PolymorphicContainer<string>();
    stringContainer.Add("Hello");
    stringContainer.Add("World");

    stringContainer.ProcessItems(s => Console.WriteLine($"Processing: {s}"));
    string uppercased = stringContainer.TransformItems(s => s.ToUpper());
    Console.WriteLine($"Transformed: {uppercased}");
}`,
  keyPoints: [
    'Strategy pattern enables algorithm interchangeability',
    'Factory pattern provides polymorphic object creation',
    'Visitor pattern implements double dispatch',
    'Decorator pattern allows dynamic behavior modification',
    'Command pattern encapsulates method calls',
    'Covariance allows more derived return types',
    'Contravariance allows less derived parameter types',
    'Runtime type information enables dynamic behavior',
  ],
  exercise:
    'Implement a drawing application using polymorphism. Create shapes (Circle, Rectangle, Triangle) that implement a drawable interface. Implement different rendering strategies (Console, SVG, Bitmap). Use the visitor pattern to calculate total area and the strategy pattern for different rendering approaches. Demonstrate covariance with shape collections.',
};
