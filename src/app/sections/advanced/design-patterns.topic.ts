import { Topic } from '../../models/section';

export const designPatternsTopic: Topic = {
  id: 'advanced-design-patterns',
  name: 'Design Patterns',
  sectionId: 'advanced',
  slug: 'design-patterns',
  explanation: `
    <h3>Advanced Design Patterns in C#</h3>
    <p>Design patterns are proven solutions to common software design problems. They provide reusable templates for solving recurring design challenges, improving code maintainability, flexibility, and scalability.</p>

    <h4>Creational Patterns</h4>
    <ul>
      <li><strong>Singleton:</strong> Ensures single instance of a class</li>
      <li><strong>Factory Method:</strong> Creates objects without specifying exact classes</li>
      <li><strong>Abstract Factory:</strong> Creates families of related objects</li>
      <li><strong>Builder:</strong> Constructs complex objects step by step</li>
      <li><strong>Prototype:</strong> Creates objects by copying existing ones</li>
    </ul>

    <h4>Structural Patterns</h4>
    <ul>
      <li><strong>Adapter:</strong> Converts interface of a class into another interface</li>
      <li><strong>Bridge:</strong> Separates abstraction from implementation</li>
      <li><strong>Composite:</strong> Treats individual and composite objects uniformly</li>
      <li><strong>Decorator:</strong> Adds behavior to objects dynamically</li>
      <li><strong>Facade:</strong> Provides simplified interface to complex subsystem</li>
      <li><strong>Flyweight:</strong> Shares objects to support large numbers efficiently</li>
      <li><strong>Proxy:</strong> Provides placeholder for another object</li>
    </ul>

    <h4>Behavioral Patterns</h4>
    <ul>
      <li><strong>Chain of Responsibility:</strong> Passes request along handler chain</li>
      <li><strong>Command:</strong> Encapsulates request as an object</li>
      <li><strong>Interpreter:</strong> Defines grammar and interpreter for language</li>
      <li><strong>Iterator:</strong> Provides sequential access to collection elements</li>
      <li><strong>Mediator:</strong> Defines communication between objects</li>
      <li><strong>Memento:</strong> Captures and restores object state</li>
      <li><strong>Observer:</strong> Defines dependency between objects</li>
      <li><strong>State:</strong> Changes object behavior based on state</li>
      <li><strong>Strategy:</strong> Defines family of algorithms</li>
      <li><strong>Template Method:</strong> Defines algorithm skeleton</li>
      <li><strong>Visitor:</strong> Defines operations on object structure</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.Linq;

// Creational Patterns

// Singleton Pattern
public class Singleton {
    private static Singleton _instance;
    private static readonly object _lock = new object();

    public string Data { get; set; }

    private Singleton() { }

    public static Singleton Instance {
        get {
            if (_instance == null) {
                lock (_lock) {
                    if (_instance == null) {
                        _instance = new Singleton();
                    }
                }
            }
            return _instance;
        }
    }
}

// Factory Method Pattern
public abstract class Document {
    public abstract void Open();
    public abstract void Save();
}

public class WordDocument : Document {
    public override void Open() => Console.WriteLine("Opening Word document");
    public override void Save() => Console.WriteLine("Saving Word document");
}

public class PdfDocument : Document {
    public override void Open() => Console.WriteLine("Opening PDF document");
    public override void Save() => Console.WriteLine("Saving PDF document");
}

public abstract class DocumentFactory {
    public abstract Document CreateDocument();

    public void ProcessDocument() {
        var doc = CreateDocument();
        doc.Open();
        doc.Save();
    }
}

public class WordDocumentFactory : DocumentFactory {
    public override Document CreateDocument() => new WordDocument();
}

public class PdfDocumentFactory : DocumentFactory {
    public override Document CreateDocument() => new PdfDocument();
}

// Abstract Factory Pattern
public interface IButton {
    void Render();
}

public interface ICheckbox {
    void Render();
}

public class WindowsButton : IButton {
    public void Render() => Console.WriteLine("Rendering Windows button");
}

public class WindowsCheckbox : ICheckbox {
    public void Render() => Console.WriteLine("Rendering Windows checkbox");
}

public class MacButton : IButton {
    public void Render() => Console.WriteLine("Rendering Mac button");
}

public class MacCheckbox : ICheckbox {
    public void Render() => Console.WriteLine("Rendering Mac checkbox");
}

public interface IGUIFactory {
    IButton CreateButton();
    ICheckbox CreateCheckbox();
}

public class WindowsFactory : IGUIFactory {
    public IButton CreateButton() => new WindowsButton();
    public ICheckbox CreateCheckbox() => new WindowsCheckbox();
}

public class MacFactory : IGUIFactory {
    public IButton CreateButton() => new MacButton();
    public ICheckbox CreateCheckbox() => new MacCheckbox();
}

// Builder Pattern
public class Computer {
    public string CPU { get; set; }
    public string RAM { get; set; }
    public string Storage { get; set; }
    public string GraphicsCard { get; set; }

    public override string ToString() {
        return $"Computer: CPU={CPU}, RAM={RAM}, Storage={Storage}, Graphics={GraphicsCard}";
    }
}

public interface IComputerBuilder {
    IComputerBuilder SetCPU(string cpu);
    IComputerBuilder SetRAM(string ram);
    IComputerBuilder SetStorage(string storage);
    IComputerBuilder SetGraphicsCard(string card);
    Computer Build();
}

public class ComputerBuilder : IComputerBuilder {
    private Computer _computer = new Computer();

    public IComputerBuilder SetCPU(string cpu) {
        _computer.CPU = cpu;
        return this;
    }

    public IComputerBuilder SetRAM(string ram) {
        _computer.RAM = ram;
        return this;
    }

    public IComputerBuilder SetStorage(string storage) {
        _computer.Storage = storage;
        return this;
    }

    public IComputerBuilder SetGraphicsCard(string card) {
        _computer.GraphicsCard = card;
        return this;
    }

    public Computer Build() {
        return _computer;
    }
}

// Structural Patterns

// Adapter Pattern
public interface IMediaPlayer {
    void Play(string audioType, string fileName);
}

public interface IAdvancedMediaPlayer {
    void PlayVlc(string fileName);
    void PlayMp4(string fileName);
}

public class VlcPlayer : IAdvancedMediaPlayer {
    public void PlayVlc(string fileName) => Console.WriteLine("Playing VLC file: " + fileName);
    public void PlayMp4(string fileName) => Console.WriteLine("Playing MP4 file: " + fileName);
}

public class MediaAdapter : IMediaPlayer {
    private IAdvancedMediaPlayer _advancedPlayer;

    public MediaAdapter(string audioType) {
        if (audioType.Equals("vlc", StringComparison.OrdinalIgnoreCase)) {
            _advancedPlayer = new VlcPlayer();
        }
    }

    public void Play(string audioType, string fileName) {
        if (audioType.Equals("vlc", StringComparison.OrdinalIgnoreCase)) {
            _advancedPlayer.PlayVlc(fileName);
        }
    }
}

public class AudioPlayer : IMediaPlayer {
    public void Play(string audioType, string fileName) {
        if (audioType.Equals("mp3", StringComparison.OrdinalIgnoreCase)) {
            Console.WriteLine("Playing MP3 file: " + fileName);
        } else if (audioType.Equals("vlc", StringComparison.OrdinalIgnoreCase) ||
                   audioType.Equals("mp4", StringComparison.OrdinalIgnoreCase)) {
            var adapter = new MediaAdapter(audioType);
            adapter.Play(audioType, fileName);
        } else {
            Console.WriteLine("Invalid media type: " + audioType);
        }
    }
}

// Composite Pattern
public interface IGraphic {
    void Draw();
    void Move(int x, int y);
}

public class Dot : IGraphic {
    public int X { get; set; }
    public int Y { get; set; }

    public void Draw() => Console.WriteLine($"Drawing dot at ({X}, {Y})");
    public void Move(int x, int y) {
        X += x;
        Y += y;
    }
}

public class Circle : Dot {
    public int Radius { get; set; }

    public new void Draw() => Console.WriteLine($"Drawing circle at ({X}, {Y}) with radius {Radius}");
}

public class CompoundGraphic : IGraphic {
    private List<IGraphic> _children = new List<IGraphic>();

    public void Add(IGraphic child) => _children.Add(child);
    public void Remove(IGraphic child) => _children.Remove(child);

    public void Draw() {
        foreach (var child in _children) {
            child.Draw();
        }
    }

    public void Move(int x, int y) {
        foreach (var child in _children) {
            child.Move(x, y);
        }
    }
}

// Decorator Pattern
public interface ICoffee {
    string GetDescription();
    double GetCost();
}

public class SimpleCoffee : ICoffee {
    public string GetDescription() => "Simple coffee";
    public double GetCost() => 2.0;
}

public abstract class CoffeeDecorator : ICoffee {
    protected ICoffee _coffee;

    public CoffeeDecorator(ICoffee coffee) {
        _coffee = coffee;
    }

    public virtual string GetDescription() => _coffee.GetDescription();
    public virtual double GetCost() => _coffee.GetCost();
}

public class MilkDecorator : CoffeeDecorator {
    public MilkDecorator(ICoffee coffee) : base(coffee) { }

    public override string GetDescription() => _coffee.GetDescription() + ", milk";
    public override double GetCost() => _coffee.GetCost() + 0.5;
}

public class SugarDecorator : CoffeeDecorator {
    public SugarDecorator(ICoffee coffee) : base(coffee) { }

    public override string GetDescription() => _coffee.GetDescription() + ", sugar";
    public override double GetCost() => _coffee.GetCost() + 0.2;
}

// Facade Pattern
public class CPU {
    public void Freeze() => Console.WriteLine("CPU frozen");
    public void Jump(long position) => Console.WriteLine("CPU jumped to " + position);
    public void Execute() => Console.WriteLine("CPU executing");
}

public class Memory {
    public void Load(long position, byte[] data) => Console.WriteLine("Memory loaded at " + position);
}

public class HardDrive {
    public byte[] Read(long lba, int size) {
        Console.WriteLine("Hard drive read from " + lba);
        return new byte[size];
    }
}

public class ComputerFacade {
    private CPU _cpu;
    private Memory _memory;
    private HardDrive _hardDrive;

    public ComputerFacade() {
        _cpu = new CPU();
        _memory = new Memory();
        _hardDrive = new HardDrive();
    }

    public void Start() {
        _cpu.Freeze();
        _memory.Load(0, _hardDrive.Read(0, 1024));
        _cpu.Jump(0);
        _cpu.Execute();
        Console.WriteLine("Computer started");
    }
}

// Behavioral Patterns

// Observer Pattern
public interface IObserver {
    void Update(string message);
}

public interface ISubject {
    void Attach(IObserver observer);
    void Detach(IObserver observer);
    void Notify();
}

public class ConcreteSubject : ISubject {
    private List<IObserver> _observers = new List<IObserver>();
    private string _state;

    public string State {
        get => _state;
        set {
            _state = value;
            Notify();
        }
    }

    public void Attach(IObserver observer) => _observers.Add(observer);
    public void Detach(IObserver observer) => _observers.Remove(observer);

    public void Notify() {
        foreach (var observer in _observers) {
            observer.Update(_state);
        }
    }
}

public class ConcreteObserver : IObserver {
    private string _name;

    public ConcreteObserver(string name) {
        _name = name;
    }

    public void Update(string message) {
        Console.WriteLine(_name + " received update: " + message);
    }
}

// Strategy Pattern
public interface ISortStrategy {
    void Sort(List<int> list);
}

public class BubbleSort : ISortStrategy {
    public void Sort(List<int> list) {
        Console.WriteLine("Sorting using bubble sort");
        // Bubble sort implementation
        for (int i = 0; i < list.Count - 1; i++) {
            for (int j = 0; j < list.Count - i - 1; j++) {
                if (list[j] > list[j + 1]) {
                    var temp = list[j];
                    list[j] = list[j + 1];
                    list[j + 1] = temp;
                }
            }
        }
    }
}

public class QuickSort : ISortStrategy {
    public void Sort(List<int> list) {
        Console.WriteLine("Sorting using quick sort");
        // Quick sort implementation (simplified)
        list.Sort();
    }
}

public class Sorter {
    private ISortStrategy _strategy;

    public void SetStrategy(ISortStrategy strategy) {
        _strategy = strategy;
    }

    public void Sort(List<int> list) {
        _strategy?.Sort(list);
    }
}

// Command Pattern
public interface ICommand {
    void Execute();
    void Undo();
}

public class Light {
    public void TurnOn() => Console.WriteLine("Light is on");
    public void TurnOff() => Console.WriteLine("Light is off");
}

public class LightOnCommand : ICommand {
    private Light _light;

    public LightOnCommand(Light light) {
        _light = light;
    }

    public void Execute() => _light.TurnOn();
    public void Undo() => _light.TurnOff();
}

public class LightOffCommand : ICommand {
    private Light _light;

    public LightOffCommand(Light light) {
        _light = light;
    }

    public void Execute() => _light.TurnOff();
    public void Undo() => _light.TurnOn();
}

public class RemoteControl {
    private List<ICommand> _commands = new List<ICommand>();

    public void ExecuteCommand(ICommand command) {
        command.Execute();
        _commands.Add(command);
    }

    public void UndoLastCommand() {
        if (_commands.Any()) {
            var lastCommand = _commands.Last();
            lastCommand.Undo();
            _commands.RemoveAt(_commands.Count - 1);
        }
    }
}

// Template Method Pattern
public abstract class DataProcessor {
    public void ProcessData() {
        LoadData();
        ValidateData();
        ProcessDataCore();
        SaveResults();
    }

    protected abstract void LoadData();
    protected abstract void ValidateData();
    protected abstract void ProcessDataCore();
    protected abstract void SaveResults();
}

public class CsvDataProcessor : DataProcessor {
    protected override void LoadData() => Console.WriteLine("Loading CSV data");
    protected override void ValidateData() => Console.WriteLine("Validating CSV data");
    protected override void ProcessDataCore() => Console.WriteLine("Processing CSV data");
    protected override void SaveResults() => Console.WriteLine("Saving CSV results");
}

public class XmlDataProcessor : DataProcessor {
    protected override void LoadData() => Console.WriteLine("Loading XML data");
    protected override void ValidateData() => Console.WriteLine("Validating XML data");
    protected override void ProcessDataCore() => Console.WriteLine("Processing XML data");
    protected override void SaveResults() => Console.WriteLine("Saving XML results");
}

// State Pattern
public interface IState {
    void Handle(Context context);
}

public class Context {
    private IState _state;

    public Context(IState state) {
        _state = state;
    }

    public void SetState(IState state) {
        _state = state;
    }

    public void Request() {
        _state.Handle(this);
    }
}

public class ConcreteStateA : IState {
    public void Handle(Context context) {
        Console.WriteLine("State A handling request");
        context.SetState(new ConcreteStateB());
    }
}

public class ConcreteStateB : IState {
    public void Handle(Context context) {
        Console.WriteLine("State B handling request");
        context.SetState(new ConcreteStateA());
    }
}

// Chain of Responsibility Pattern
public abstract class Handler {
    protected Handler _nextHandler;

    public void SetNext(Handler handler) {
        _nextHandler = handler;
    }

    public abstract void HandleRequest(int request);
}

public class ConcreteHandler1 : Handler {
    public override void HandleRequest(int request) {
        if (request < 10) {
            Console.WriteLine("Handler 1 processed request " + request);
        } else if (_nextHandler != null) {
            _nextHandler.HandleRequest(request);
        }
    }
}

public class ConcreteHandler2 : Handler {
    public override void HandleRequest(int request) {
        if (request >= 10 && request < 20) {
            Console.WriteLine("Handler 2 processed request " + request);
        } else if (_nextHandler != null) {
            _nextHandler.HandleRequest(request);
        }
    }
}

public class ConcreteHandler3 : Handler {
    public override void HandleRequest(int request) {
        if (request >= 20) {
            Console.WriteLine("Handler 3 processed request " + request);
        } else if (_nextHandler != null) {
            _nextHandler.HandleRequest(request);
        }
    }
}

// Visitor Pattern
public interface IVisitor {
    void VisitConcreteElementA(ConcreteElementA element);
    void VisitConcreteElementB(ConcreteElementB element);
}

public interface IElement {
    void Accept(IVisitor visitor);
}

public class ConcreteElementA : IElement {
    public void Accept(IVisitor visitor) {
        visitor.VisitConcreteElementA(this);
    }

    public void OperationA() => Console.WriteLine("ConcreteElementA operation");
}

public class ConcreteElementB : IElement {
    public void Accept(IVisitor visitor) {
        visitor.VisitConcreteElementB(this);
    }

    public void OperationB() => Console.WriteLine("ConcreteElementB operation");
}

public class ConcreteVisitor : IVisitor {
    public void VisitConcreteElementA(ConcreteElementA element) {
        Console.WriteLine("Visitor visiting ConcreteElementA");
        element.OperationA();
    }

    public void VisitConcreteElementB(ConcreteElementB element) {
        Console.WriteLine("Visitor visiting ConcreteElementB");
        element.OperationB();
    }
}

// Demonstration
public void DemonstrateDesignPatterns() {
    // Creational Patterns
    Console.WriteLine("=== Creational Patterns ===");

    // Singleton
    var singleton1 = Singleton.Instance;
    singleton1.Data = "Hello";
    var singleton2 = Singleton.Instance;
    Console.WriteLine("Singleton data: " + singleton2.Data);

    // Factory Method
    var wordFactory = new WordDocumentFactory();
    wordFactory.ProcessDocument();

    // Abstract Factory
    IGUIFactory factory = new WindowsFactory();
    var button = factory.CreateButton();
    var checkbox = factory.CreateCheckbox();
    button.Render();
    checkbox.Render();

    // Builder
    var computer = new ComputerBuilder()
        .SetCPU("Intel i7")
        .SetRAM("16GB")
        .SetStorage("1TB SSD")
        .SetGraphicsCard("RTX 3080")
        .Build();
    Console.WriteLine(computer);

    // Structural Patterns
    Console.WriteLine("\\n=== Structural Patterns ===");

    // Adapter
    var audioPlayer = new AudioPlayer();
    audioPlayer.Play("mp3", "song.mp3");
    audioPlayer.Play("vlc", "movie.vlc");

    // Composite
    var compound = new CompoundGraphic();
    compound.Add(new Dot { X = 1, Y = 2 });
    compound.Add(new Circle { X = 3, Y = 4, Radius = 5 });
    compound.Draw();
    compound.Move(10, 10);

    // Decorator
    ICoffee coffee = new SimpleCoffee();
    coffee = new MilkDecorator(coffee);
    coffee = new SugarDecorator(coffee);
    Console.WriteLine(coffee.GetDescription() + " costs $" + coffee.GetCost());

    // Facade
    var computerFacade = new ComputerFacade();
    computerFacade.Start();

    // Behavioral Patterns
    Console.WriteLine("\\n=== Behavioral Patterns ===");

    // Observer
    var subject = new ConcreteSubject();
    var observer1 = new ConcreteObserver("Observer 1");
    var observer2 = new ConcreteObserver("Observer 2");

    subject.Attach(observer1);
    subject.Attach(observer2);
    subject.State = "New State";

    // Strategy
    var sorter = new Sorter();
    var numbers = new List<int> { 3, 1, 4, 1, 5, 9, 2, 6 };

    sorter.SetStrategy(new BubbleSort());
    sorter.Sort(numbers.ToList()); // Copy to avoid modifying original

    sorter.SetStrategy(new QuickSort());
    sorter.Sort(numbers);

    // Command
    var light = new Light();
    var remote = new RemoteControl();

    var lightOn = new LightOnCommand(light);
    var lightOff = new LightOffCommand(light);

    remote.ExecuteCommand(lightOn);
    remote.ExecuteCommand(lightOff);
    remote.UndoLastCommand();

    // Template Method
    var csvProcessor = new CsvDataProcessor();
    var xmlProcessor = new XmlDataProcessor();

    csvProcessor.ProcessData();
    xmlProcessor.ProcessData();

    // State
    var context = new Context(new ConcreteStateA());
    context.Request();
    context.Request();

    // Chain of Responsibility
    var handler1 = new ConcreteHandler1();
    var handler2 = new ConcreteHandler2();
    var handler3 = new ConcreteHandler3();

    handler1.SetNext(handler2);
    handler2.SetNext(handler3);

    handler1.HandleRequest(5);
    handler1.HandleRequest(15);
    handler1.HandleRequest(25);

    // Visitor
    var elements = new List<IElement> {
        new ConcreteElementA(),
        new ConcreteElementB()
    };

    var visitor = new ConcreteVisitor();
    foreach (var element in elements) {
        element.Accept(visitor);
    }
}`,
  keyPoints: [
    'Design patterns provide proven solutions to common problems',
    'Creational patterns manage object creation',
    'Structural patterns organize relationships between objects',
    'Behavioral patterns manage communication between objects',
    'Choose patterns based on specific problem requirements',
    'Patterns should be adapted to fit your specific context',
    'Overuse of patterns can lead to unnecessary complexity',
    'Understand the intent and consequences of each pattern',
    'Patterns work best when combined appropriately',
    'Document pattern usage for maintainability',
  ],
  exercise:
    'Implement a plugin architecture using the Factory pattern and Strategy pattern combined. Create a flexible logging system using the Observer pattern and Chain of Responsibility. Build a GUI framework using Abstract Factory and Builder patterns. Develop a workflow engine using Command pattern and State pattern. Design a caching system using Proxy pattern and Singleton pattern.',
};
