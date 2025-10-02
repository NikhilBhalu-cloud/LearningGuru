import { Topic } from '../../models/section';

export const inheritanceTopic: Topic = {
  id: 'intermediate-oop-inheritance',
  name: 'Inheritance',
  sectionId: 'intermediate',
  slug: 'inheritance',
  explanation: `
    <h3>Inheritance in C#</h3>
    <p>Inheritance allows a class to inherit properties and methods from another class. The inheriting class is called the <strong>derived class</strong> or <strong>child class</strong>, and the class being inherited from is called the <strong>base class</strong> or <strong>parent class</strong>.</p>

    <h4>Inheritance Syntax</h4>
    <pre><code>class BaseClass {
    // Base class members
}

class DerivedClass : BaseClass {
    // Derived class members
}</code></pre>

    <h4>Types of Inheritance</h4>
    <ul>
      <li><strong>Single Inheritance:</strong> A class inherits from one base class</li>
      <li><strong>Multilevel Inheritance:</strong> A class inherits from a derived class</li>
      <li><strong>Hierarchical Inheritance:</strong> Multiple classes inherit from the same base class</li>
    </ul>

    <h4>Access Modifiers in Inheritance</h4>
    <ul>
      <li><code>public</code> - Accessible everywhere</li>
      <li><code>protected</code> - Accessible in derived classes</li>
      <li><code>private</code> - Not accessible in derived classes</li>
      <li><code>internal</code> - Accessible within the same assembly</li>
    </ul>

    <h4>Key Concepts</h4>
    <ul>
      <li><strong>Base keyword:</strong> Access base class members</li>
      <li><strong>Virtual methods:</strong> Can be overridden in derived classes</li>
      <li><strong>Override methods:</strong> Provide new implementation</li>
      <li><strong>Sealed classes:</strong> Cannot be inherited</li>
    </ul>
  `,
  codeExample: `// Base class
public class Animal {
    public string Name { get; set; }
    public int Age { get; set; }

    public Animal(string name, int age) {
        Name = name;
        Age = age;
    }

    public virtual void MakeSound() {
        Console.WriteLine("Some generic animal sound");
    }

    public void Eat() {
        Console.WriteLine($"{Name} is eating.");
    }

    protected void Breathe() {
        Console.WriteLine($"{Name} is breathing.");
    }
}

// Derived class - Single inheritance
public class Dog : Animal {
    public string Breed { get; set; }

    public Dog(string name, int age, string breed) : base(name, age) {
        Breed = breed;
    }

    // Override virtual method
    public override void MakeSound() {
        Console.WriteLine($"{Name} says: Woof!");
    }

    // New method specific to Dog
    public void Fetch() {
        Console.WriteLine($"{Name} is fetching the ball.");
    }
}

// Another derived class
public class Cat : Animal {
    public Cat(string name, int age) : base(name, age) {
    }

    public override void MakeSound() {
        Console.WriteLine($"{Name} says: Meow!");
    }

    public void Climb() {
        Console.WriteLine($"{Name} is climbing.");
    }
}

// Multilevel inheritance
public class Puppy : Dog {
    public Puppy(string name, int age, string breed) : base(name, age, breed) {
    }

    public void Play() {
        Console.WriteLine($"{Name} the puppy is playing!");
    }
}

// Sealed class - cannot be inherited
public sealed class GoldenRetriever : Dog {
    public GoldenRetriever(string name, int age) : base(name, age, "Golden Retriever") {
    }

    public void Swim() {
        Console.WriteLine($"{Name} is swimming.");
    }
}

// Usage example
public void DemonstrateInheritance() {
    // Create instances of different animals
    Dog dog = new Dog("Buddy", 3, "Labrador");
    Cat cat = new Cat("Whiskers", 2);
    Puppy puppy = new Puppy("Max", 1, "Golden Retriever");

    // All animals can eat (inherited from Animal)
    dog.Eat();      // Buddy is eating.
    cat.Eat();      // Whiskers is eating.
    puppy.Eat();    // Max is eating.

    // Each animal makes its own sound (polymorphism)
    dog.MakeSound();    // Buddy says: Woof!
    cat.MakeSound();    // Whiskers says: Meow!
    puppy.MakeSound();  // Max says: Woof! (inherited from Dog)

    // Specific behaviors
    dog.Fetch();        // Buddy is fetching the ball.
    cat.Climb();        // Whiskers is climbing.
    puppy.Play();       // Max the puppy is playing!

    // Accessing properties
    Console.WriteLine($"{dog.Name} is a {dog.Breed}");     // Buddy is a Labrador
    Console.WriteLine($"{cat.Name} is {cat.Age} years old"); // Whiskers is 2 years old
}

// Constructor chaining
public class Vehicle {
    public string Make { get; set; }
    public string Model { get; set; }

    public Vehicle(string make, string model) {
        Make = make;
        Model = model;
    }
}

public class Car : Vehicle {
    public int Year { get; set; }
    public string Color { get; set; }

    // Constructor chaining with base()
    public Car(string make, string model, int year, string color)
        : base(make, model) {
        Year = year;
        Color = color;
    }
}

public class ElectricCar : Car {
    public int BatteryCapacity { get; set; }

    public ElectricCar(string make, string model, int year, string color, int batteryCapacity)
        : base(make, model, year, color) {
        BatteryCapacity = batteryCapacity;
    }
}

// Method hiding vs overriding
public class Parent {
    public void ShowMessage() {
        Console.WriteLine("Parent message");
    }

    public virtual void VirtualMessage() {
        Console.WriteLine("Parent virtual message");
    }
}

public class Child : Parent {
    // Method hiding (not recommended)
    public new void ShowMessage() {
        Console.WriteLine("Child message");
    }

    // Method overriding (recommended)
    public override void VirtualMessage() {
        Console.WriteLine("Child virtual message");
    }
}

// Usage
public void DemonstrateMethodHiding() {
    Parent parent = new Parent();
    Child child = new Child();
    Parent parentRefToChild = child;

    parent.ShowMessage();           // Parent message
    child.ShowMessage();            // Child message
    parentRefToChild.ShowMessage(); // Parent message (hiding)

    parent.VirtualMessage();           // Parent virtual message
    child.VirtualMessage();            // Child virtual message
    parentRefToChild.VirtualMessage(); // Child virtual message (overriding)
}`,
  keyPoints: [
    'Use : base() to call base class constructors',
    'Mark methods as virtual to allow overriding',
    'Use override keyword to provide new implementation',
    'protected members are accessible in derived classes',
    'sealed classes cannot be inherited from',
    'base keyword accesses base class members',
    'Method overriding provides polymorphism',
    'Constructor chaining ensures proper initialization',
  ],
  exercise:
    'Create a class hierarchy for a university system with Person as the base class, and Student, Professor, and Staff as derived classes. Each class should have appropriate properties and methods, with proper use of inheritance and method overriding.',
};
