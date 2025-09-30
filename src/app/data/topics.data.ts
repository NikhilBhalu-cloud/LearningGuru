import { Topic } from '../models/topic.model';

export const TOPICS_DATA: Topic[] = [
  // BEGINNER TOPICS
  {
    id: 'variables-datatypes',
    title: 'Variables and Data Types',
    level: 'beginner',
    explanation: `
      <h3>What are Variables?</h3>
      <p>A variable is a named storage location in memory that holds a value. In C#, every variable has a specific data type that determines what kind of data it can store.</p>
      
      <h3>Common Data Types in C#</h3>
      <ul>
        <li><strong>int</strong> - Stores whole numbers (e.g., 123, -456)</li>
        <li><strong>double</strong> - Stores decimal numbers (e.g., 3.14, -0.5)</li>
        <li><strong>string</strong> - Stores text (e.g., "Hello World")</li>
        <li><strong>bool</strong> - Stores true or false values</li>
        <li><strong>char</strong> - Stores a single character (e.g., 'A')</li>
      </ul>
      
      <h3>Variable Declaration</h3>
      <p>To declare a variable in C#, you specify the data type followed by the variable name:</p>
      <p><code>dataType variableName = value;</code></p>
    `,
    examples: [
      {
        title: 'Declaring Variables',
        code: '// Integer variable\nint age = 25;\n\n// Double variable\ndouble price = 19.99;\n\n// String variable\nstring name = "John Doe";\n\n// Boolean variable\nbool isStudent = true;\n\n// Character variable\nchar grade = \'A\';',
        language: 'csharp',
        description: 'Basic variable declarations in C#'
      },
      {
        title: 'Using Variables',
        code: 'int quantity = 5;\ndouble pricePerItem = 10.50;\ndouble totalPrice = quantity * pricePerItem;\n\nConsole.WriteLine("Total: " + totalPrice);\n// Output: Total: 52.5',
        language: 'csharp',
        description: 'Performing calculations with variables'
      }
    ],
    keyPoints: [
      'Variables store data in memory',
      'Each variable has a specific data type',
      'int for whole numbers, double for decimals',
      'string for text, bool for true/false',
      'Use meaningful variable names',
      'Variables must be declared before use'
    ],
    exercise: {
      title: 'Create a Simple Calculator',
      description: 'Create variables to store two numbers and perform addition, subtraction, multiplication, and division. Print all results to the console.',
      hints: [
        'Declare two double variables for the numbers',
        'Create variables for each operation result',
        'Use Console.WriteLine to display results'
      ],
      solution: 'double num1 = 10;\ndouble num2 = 5;\n\ndouble sum = num1 + num2;\ndouble difference = num1 - num2;\ndouble product = num1 * num2;\ndouble quotient = num1 / num2;\n\nConsole.WriteLine("Sum: " + sum);\nConsole.WriteLine("Difference: " + difference);\nConsole.WriteLine("Product: " + product);\nConsole.WriteLine("Quotient: " + quotient);'
    }
  },
  {
    id: 'conditional-statements',
    title: 'Conditional Statements (if/else)',
    level: 'beginner',
    explanation: `
      <h3>What are Conditional Statements?</h3>
      <p>Conditional statements allow your program to make decisions and execute different code based on certain conditions.</p>
      
      <h3>The if Statement</h3>
      <p>The basic if statement executes code only if a condition is true.</p>
      
      <h3>The if-else Statement</h3>
      <p>Provides an alternative path when the condition is false.</p>
    `,
    examples: [
      {
        title: 'Simple if Statement',
        code: 'int temperature = 30;\n\nif (temperature > 25)\n{\n    Console.WriteLine("It\'s hot outside!");\n}',
        language: 'csharp',
        description: 'Checking a single condition'
      },
      {
        title: 'if-else Statement',
        code: 'int age = 18;\n\nif (age >= 18)\n{\n    Console.WriteLine("You are an adult.");\n}\nelse\n{\n    Console.WriteLine("You are a minor.");\n}',
        language: 'csharp',
        description: 'Choosing between two options'
      }
    ],
    keyPoints: [
      'if statements control program flow',
      'Conditions evaluate to true or false',
      'else provides alternative execution path',
      'else-if allows multiple conditions'
    ],
    exercise: {
      title: 'Grade Calculator',
      description: 'Write a program that takes a numeric score and prints the corresponding letter grade.',
      hints: ['Use else-if statements', 'Start with highest grade first']
    }
  },
  {
    id: 'loops',
    title: 'Loops (for, while, foreach)',
    level: 'beginner',
    explanation: `
      <h3>What are Loops?</h3>
      <p>Loops allow you to execute a block of code repeatedly.</p>
      
      <h3>Types of Loops</h3>
      <ul>
        <li><strong>for</strong> - Used when you know iteration count</li>
        <li><strong>while</strong> - Repeats while condition is true</li>
        <li><strong>foreach</strong> - Iterates through collections</li>
      </ul>
    `,
    examples: [
      {
        title: 'for Loop',
        code: 'for (int i = 1; i <= 5; i++)\n{\n    Console.WriteLine("Number: " + i);\n}',
        language: 'csharp',
        description: 'Counting from 1 to 5'
      }
    ],
    keyPoints: [
      'Loops repeat code execution',
      'for loop best when count is known',
      'while loop checks condition first',
      'foreach simplifies collection iteration'
    ],
    exercise: {
      title: 'Sum Calculator',
      description: 'Calculate the sum of all numbers from 1 to 100 using a loop.',
      hints: ['Use a for loop', 'Keep a running total']
    }
  },

  // INTERMEDIATE TOPICS
  {
    id: 'methods-functions',
    title: 'Methods and Functions',
    level: 'intermediate',
    explanation: `
      <h3>What are Methods?</h3>
      <p>Methods are reusable blocks of code that perform specific tasks.</p>
      
      <h3>Method Structure</h3>
      <pre>returnType MethodName(parameters)
{
    // method body
    return value;
}</pre>
    `,
    examples: [
      {
        title: 'Simple Method',
        code: 'void Greet()\n{\n    Console.WriteLine("Hello, World!");\n}\n\nGreet();',
        language: 'csharp',
        description: 'Basic method without return value'
      },
      {
        title: 'Method with Return Value',
        code: 'int Add(int a, int b)\n{\n    return a + b;\n}\n\nint result = Add(5, 3);\nConsole.WriteLine("Sum: " + result);',
        language: 'csharp',
        description: 'Method returning a value'
      }
    ],
    keyPoints: [
      'Methods organize and reuse code',
      'Return type specifies what method returns',
      'Parameters pass data into methods',
      'void means method returns nothing'
    ],
    exercise: {
      title: 'Temperature Converter',
      description: 'Create methods to convert between Celsius and Fahrenheit.',
      hints: ['Create two separate methods', 'Each method should take one parameter']
    }
  },
  {
    id: 'classes-objects',
    title: 'Classes and Objects',
    level: 'intermediate',
    explanation: `
      <h3>Object-Oriented Programming</h3>
      <p>Classes are blueprints for creating objects.</p>
      
      <h3>Key Components</h3>
      <ul>
        <li><strong>Properties</strong> - Store object data</li>
        <li><strong>Constructors</strong> - Initialize objects</li>
        <li><strong>Methods</strong> - Define object behavior</li>
      </ul>
    `,
    examples: [
      {
        title: 'Simple Class',
        code: 'public class Person\n{\n    public string Name { get; set; }\n    public int Age { get; set; }\n    \n    public void Introduce()\n    {\n        Console.WriteLine("Hi, I\'m " + Name);\n    }\n}\n\nPerson person = new Person();\nperson.Name = "Alice";\nperson.Introduce();',
        language: 'csharp',
        description: 'Basic class with properties and methods'
      }
    ],
    keyPoints: [
      'Classes are blueprints for objects',
      'Properties store object data',
      'Constructors initialize objects',
      'Each object has independent state'
    ],
    exercise: {
      title: 'Rectangle Class',
      description: 'Create a Rectangle class with methods to calculate area and perimeter.',
      hints: ['Properties: Width and Height', 'Area = width × height']
    }
  },
  {
    id: 'collections-lists',
    title: 'Collections and Lists',
    level: 'intermediate',
    explanation: `
      <h3>What are Collections?</h3>
      <p>Collections store multiple related items and can grow dynamically.</p>
      
      <h3>Common Types</h3>
      <ul>
        <li><strong>List&lt;T&gt;</strong> - Dynamic array</li>
        <li><strong>Dictionary&lt;K,V&gt;</strong> - Key-value pairs</li>
      </ul>
    `,
    examples: [
      {
        title: 'List Basics',
        code: 'List<string> fruits = new List<string>();\nfruits.Add("Apple");\nfruits.Add("Banana");\n\nforeach (string fruit in fruits)\n{\n    Console.WriteLine(fruit);\n}',
        language: 'csharp',
        description: 'Basic List operations'
      }
    ],
    keyPoints: [
      'Lists can grow and shrink dynamically',
      'Use List<T> for ordered collections',
      'Dictionary<K,V> for key-value pairs',
      'Collections are type-safe with generics'
    ],
    exercise: {
      title: 'Student Grade Manager',
      description: 'Use a Dictionary to store student names and grades, then calculate average.',
      hints: ['Use Dictionary<string, double>', 'Loop through to calculate sum']
    }
  },

  // ADVANCED TOPICS
  {
    id: 'linq-queries',
    title: 'LINQ (Language Integrated Query)',
    level: 'advanced',
    explanation: `
      <h3>What is LINQ?</h3>
      <p>LINQ allows you to query and manipulate data using a consistent syntax.</p>
      
      <h3>Common Operations</h3>
      <ul>
        <li>Filtering (Where)</li>
        <li>Projection (Select)</li>
        <li>Sorting (OrderBy)</li>
        <li>Aggregation (Sum, Average, Count)</li>
      </ul>
    `,
    examples: [
      {
        title: 'Filtering with Where',
        code: 'List<int> numbers = new List<int> { 1, 2, 3, 4, 5 };\n\nvar evenNumbers = numbers.Where(n => n % 2 == 0);\n\nforeach (var num in evenNumbers)\n{\n    Console.WriteLine(num);\n}',
        language: 'csharp',
        description: 'Filtering data with LINQ'
      }
    ],
    keyPoints: [
      'LINQ provides SQL-like querying in C#',
      'Works with any IEnumerable collection',
      'Method syntax uses lambda expressions',
      'Common operations: Where, Select, OrderBy'
    ],
    exercise: {
      title: 'Employee Query System',
      description: 'Use LINQ to filter employees, group by department, and sort by salary.',
      hints: ['Use Where for filtering', 'Use GroupBy for grouping']
    }
  },
  {
    id: 'async-await',
    title: 'Asynchronous Programming (async/await)',
    level: 'advanced',
    explanation: `
      <h3>What is Asynchronous Programming?</h3>
      <p>Async programming allows operations to run without blocking the main thread.</p>
      
      <h3>Key Concepts</h3>
      <ul>
        <li><strong>async</strong> - Marks method as asynchronous</li>
        <li><strong>await</strong> - Pauses execution until task completes</li>
        <li><strong>Task</strong> - Represents async operation</li>
      </ul>
    `,
    examples: [
      {
        title: 'Basic Async Method',
        code: 'public async Task DoSomethingAsync()\n{\n    Console.WriteLine("Starting...");\n    await Task.Delay(2000);\n    Console.WriteLine("Completed!");\n}\n\nawait DoSomethingAsync();',
        language: 'csharp',
        description: 'Simple async method'
      }
    ],
    keyPoints: [
      'async methods enable asynchronous programming',
      'await pauses execution without blocking',
      'Task represents an async operation',
      'Improves application responsiveness'
    ],
    exercise: {
      title: 'Async Data Processor',
      description: 'Create an async method to process multiple files in parallel.',
      hints: ['Use Task.WhenAll for parallel processing', 'Measure time taken']
    }
  },
  {
    id: 'delegates-events',
    title: 'Delegates and Events',
    level: 'advanced',
    explanation: `
      <h3>What are Delegates?</h3>
      <p>Delegates are type-safe function pointers that reference methods.</p>
      
      <h3>What are Events?</h3>
      <p>Events provide a publish-subscribe mechanism for notifications.</p>
    `,
    examples: [
      {
        title: 'Events Example',
        code: 'public class Button\n{\n    public event EventHandler Clicked;\n    \n    public void Click()\n    {\n        Clicked?.Invoke(this, EventArgs.Empty);\n    }\n}\n\nButton button = new Button();\nbutton.Clicked += (sender, args) => \n{\n    Console.WriteLine("Button clicked!");\n};\n\nbutton.Click();',
        language: 'csharp',
        description: 'Creating and using events'
      }
    ],
    keyPoints: [
      'Delegates are type-safe function pointers',
      'Events enable publish-subscribe pattern',
      'Use += to subscribe to events',
      'Use -= to unsubscribe from events'
    ],
    exercise: {
      title: 'Stock Price Monitor',
      description: 'Create a class with an event that fires when price changes significantly.',
      hints: ['Create custom EventArgs', 'Calculate percentage change']
    }
  }
];
