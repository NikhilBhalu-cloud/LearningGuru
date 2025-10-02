import { Topic } from '../../models/section';

export const delegatesLambdaTopic: Topic = {
  id: 'advanced-delegates-lambda',
  name: 'Delegates & Lambda Expressions',
  sectionId: 'advanced',
  slug: 'delegates-lambda',
  explanation: `
    <h3>Delegates and Lambda Expressions in C#</h3>
    <p>Delegates are type-safe function pointers that enable callback mechanisms and event-driven programming. Lambda expressions provide a concise syntax for creating anonymous methods.</p>

    <h4>Delegate Types</h4>
    <ul>
      <li><strong>Action&lt;T&gt;:</strong> Represents methods that return void</li>
      <li><strong>Func&lt;TResult&gt;:</strong> Represents methods that return a value</li>
      <li><strong>Predicate&lt;T&gt;:</strong> Represents methods that test a condition</li>
      <li><strong>Custom Delegates:</strong> User-defined delegate types</li>
    </ul>

    <h4>Lambda Expression Syntax</h4>
    <ul>
      <li><strong>(parameters) => expression</strong> - Single expression lambda</li>
      <li><strong>(parameters) => { statements }</strong> - Statement lambda</li>
      <li><strong>() => expression</strong> - Parameterless lambda</li>
      <li><strong>x => x * 2</strong> - Single parameter (parentheses optional)</li>
    </ul>

    <h4>Advanced Delegate Features</h4>
    <ul>
      <li><strong>Multicast Delegates:</strong> Chain multiple methods together</li>
      <li><strong>Anonymous Methods:</strong> Inline method definitions</li>
      <li><strong>Closure:</strong> Lambda capturing outer variables</li>
      <li><strong>Expression Trees:</strong> Runtime code analysis and generation</li>
    </ul>

    <h4>Common Patterns</h4>
    <ul>
      <li><strong>Observer Pattern:</strong> Event handling with delegates</li>
      <li><strong>Strategy Pattern:</strong> Runtime algorithm selection</li>
      <li><strong>Callback Pattern:</strong> Asynchronous operation completion</li>
      <li><strong>LINQ:</strong> Query composition with lambda expressions</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

// Basic Delegate Declaration
public delegate void SimpleDelegate();
public delegate void ParameterDelegate(string message);
public delegate int CalculationDelegate(int a, int b);
public delegate bool PredicateDelegate<T>(T item);

// Generic Delegate Types
public class DelegateExamples {
    // Action delegates (return void)
    public void DemonstrateActions() {
        Action greet = () => Console.WriteLine("Hello!");
        Action<string> greetPerson = name => Console.WriteLine("Hello, " + name + "!");
        Action<int, int> addAndPrint = (a, b) => Console.WriteLine(a + " + " + b + " = " + (a + b));

        greet();
        greetPerson("Alice");
        addAndPrint(5, 3);
    }

    // Func delegates (return value)
    public void DemonstrateFuncs() {
        Func<int> getRandomNumber = () => new Random().Next(1, 100);
        Func<int, int> square = x => x * x;
        Func<int, int, int> add = (a, b) => a + b;
        Func<string, int> getLength = s => s.Length;

        Console.WriteLine("Random: " + getRandomNumber());
        Console.WriteLine("Square of 5: " + square(5));
        Console.WriteLine("5 + 3 = " + add(5, 3));
        Console.WriteLine("Length of 'hello': " + getLength("hello"));
    }

    // Predicate delegates
    public void DemonstratePredicates() {
        Predicate<int> isEven = n => n % 2 == 0;
        Predicate<string> isLongWord = word => word.Length > 5;

        Console.WriteLine("4 is even: " + isEven(4));
        Console.WriteLine("2 is even: " + isEven(2));
        Console.WriteLine("'supercalifragilisticexpialidocious' is long: " + isLongWord("supercalifragilisticexpialidocious"));
        Console.WriteLine("'hello' is long: " + isLongWord("hello"));
    }
}

// Multicast Delegates
public class MulticastDelegateExample {
    public delegate void NotificationDelegate(string message);

    public void SendNotification(string message) {
        Console.WriteLine("Sending notification: " + message);
    }

    public void LogNotification(string message) {
        Console.WriteLine("LOG: " + message);
    }

    public void EmailNotification(string message) {
        Console.WriteLine("EMAIL: " + message);
    }

    public void DemonstrateMulticast() {
        NotificationDelegate notification = SendNotification;
        notification += LogNotification;
        notification += EmailNotification;

        Console.WriteLine("=== Multicast Delegate Invocation ===");
        notification("System started successfully");

        Console.WriteLine("\\n=== Removing a delegate ===");
        notification -= LogNotification;
        notification("System backup completed");
    }
}

// Anonymous Methods
public class AnonymousMethodExample {
    public delegate int MathOperation(int a, int b);

    public void DemonstrateAnonymousMethods() {
        // Traditional delegate
        MathOperation add = delegate(int a, int b) { return a + b; };

        // Lambda expression (preferred)
        MathOperation multiply = (a, b) => a * b;

        // Anonymous method with multiple statements
        MathOperation complexOp = delegate(int a, int b) {
            Console.WriteLine("Performing complex operation on " + a + " and " + b);
            int result = (a + b) * 2;
            Console.WriteLine("Result: " + result);
            return result;
        };

        Console.WriteLine("5 + 3 = " + add(5, 3));
        Console.WriteLine("5 * 3 = " + multiply(5, 3));
        complexOp(5, 3);
    }
}

// Closure and Captured Variables
public class ClosureExample {
    public void DemonstrateClosure() {
        int counter = 0;

        // Lambda captures the 'counter' variable from outer scope
        Action increment = () => {
            counter++;
            Console.WriteLine("Counter: " + counter);
        };

        Console.WriteLine("=== Closure Demonstration ===");
        increment();
        increment();
        increment();

        // Multiple closures capturing the same variable
        List<Action> actions = new List<Action>();
        for (int i = 0; i < 3; i++) {
            actions.Add(() => Console.WriteLine("Captured i: " + i));
        }

        Console.WriteLine("\\n=== Captured Variables in Loop ===");
        foreach (var action in actions) {
            action(); // All will print "Captured i: 3" due to closure
        }
    }

    public void DemonstrateClosureFix() {
        List<Action> actions = new List<Action>();
        for (int i = 0; i < 3; i++) {
            int capturedValue = i; // Capture the current value
            actions.Add(() => Console.WriteLine("Captured i: " + capturedValue));
        }

        Console.WriteLine("\\n=== Fixed Closure in Loop ===");
        foreach (var action in actions) {
            action(); // Now prints 0, 1, 2
        }
    }
}

// Expression Trees
public class ExpressionTreeExample {
    public void DemonstrateExpressionTrees() {
        // Lambda expression
        Expression<Func<int, int, int>> addExpression = (a, b) => a + b;

        // Compile the expression to a delegate
        Func<int, int, int> addFunction = addExpression.Compile();

        Console.WriteLine("=== Expression Trees ===");
        Console.WriteLine("5 + 3 = " + addFunction(5, 3));

        // Analyze the expression tree
        Console.WriteLine("Expression type: " + addExpression.Body.NodeType);
        if (addExpression.Body is BinaryExpression binaryExpr) {
            Console.WriteLine("Left operand: " + binaryExpr.Left);
            Console.WriteLine("Right operand: " + binaryExpr.Right);
            Console.WriteLine("Operator: " + binaryExpr.NodeType);
        }
    }

    // Dynamic query builder using expression trees
    public Func<T, bool> BuildPredicate<T>(string propertyName, object value) {
        var parameter = Expression.Parameter(typeof(T), "x");
        var property = Expression.Property(parameter, propertyName);
        var constant = Expression.Constant(value);
        var equality = Expression.Equal(property, constant);
        var lambda = Expression.Lambda<Func<T, bool>>(equality, parameter);

        return lambda.Compile();
    }
}

// Event Handling with Delegates
public class EventExample {
    public delegate void PriceChangedEventHandler(object sender, PriceChangedEventArgs e);

    public event PriceChangedEventHandler PriceChanged;

    private decimal _price;

    public decimal Price {
        get => _price;
        set {
            if (_price != value) {
                var oldPrice = _price;
                _price = value;
                OnPriceChanged(oldPrice, value);
            }
        }
    }

    protected virtual void OnPriceChanged(decimal oldPrice, decimal newPrice) {
        PriceChanged?.Invoke(this, new PriceChangedEventArgs(oldPrice, newPrice));
    }
}

public class PriceChangedEventArgs : EventArgs {
    public decimal OldPrice { get; }
    public decimal NewPrice { get; }

    public PriceChangedEventArgs(decimal oldPrice, decimal newPrice) {
        OldPrice = oldPrice;
        NewPrice = newPrice;
    }
}

public class PriceMonitor {
    public void SubscribeToPriceChanges(EventExample product) {
        product.PriceChanged += Product_PriceChanged;
    }

    private void Product_PriceChanged(object sender, PriceChangedEventArgs e) {
        Console.WriteLine($"Price changed from {e.OldPrice:C} to {e.NewPrice:C}");
    }
}

// Advanced Delegate Patterns
public class DelegatePatterns {
    // Strategy Pattern with Delegates
    public void DemonstrateStrategyPattern() {
        Func<int, int, int> addStrategy = (a, b) => a + b;
        Func<int, int, int> multiplyStrategy = (a, b) => a * b;
        Func<int, int, int> maxStrategy = (a, b) => Math.Max(a, b);

        Console.WriteLine("=== Strategy Pattern with Delegates ===");
        Console.WriteLine("Add: 5 + 3 = " + ExecuteStrategy(addStrategy, 5, 3));
        Console.WriteLine("Multiply: 5 * 3 = " + ExecuteStrategy(multiplyStrategy, 5, 3));
        Console.WriteLine("Max: max(5, 3) = " + ExecuteStrategy(maxStrategy, 5, 3));
    }

    private int ExecuteStrategy(Func<int, int, int> strategy, int a, int b) {
        return strategy(a, b);
    }

    // Callback Pattern
    public void DemonstrateCallbackPattern() {
        Console.WriteLine("\\n=== Callback Pattern ===");

        PerformAsyncOperation(
            onSuccess: result => Console.WriteLine("Operation succeeded: " + result),
            onError: error => Console.WriteLine("Operation failed: " + error)
        );
    }

    private void PerformAsyncOperation(Action<string> onSuccess, Action<string> onError) {
        // Simulate async operation
        var random = new Random();
        if (random.Next(2) == 0) {
            onSuccess("Data loaded successfully");
        } else {
            onError("Network connection failed");
        }
    }

    // LINQ-like operations with delegates
    public void DemonstrateLinqWithDelegates() {
        var numbers = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        Console.WriteLine("\\n=== LINQ-like Operations ===");

        // Where (filter)
        var evenNumbers = Filter(numbers, n => n % 2 == 0);
        Console.WriteLine("Even numbers: " + string.Join(", ", evenNumbers));

        // Select (transform)
        var squaredNumbers = Transform(numbers, n => n * n);
        Console.WriteLine("Squared numbers: " + string.Join(", ", squaredNumbers));

        // Aggregate (reduce)
        var sum = Aggregate(numbers, 0, (acc, n) => acc + n);
        Console.WriteLine("Sum: " + sum);
    }

    private IEnumerable<T> Filter<T>(IEnumerable<T> source, Predicate<T> predicate) {
        foreach (var item in source) {
            if (predicate(item)) {
                yield return item;
            }
        }
    }

    private IEnumerable<TResult> Transform<T, TResult>(IEnumerable<T> source, Func<T, TResult> selector) {
        foreach (var item in source) {
            yield return selector(item);
        }
    }

    private TAccumulate Aggregate<T, TAccumulate>(IEnumerable<T> source, TAccumulate seed, Func<TAccumulate, T, TAccumulate> accumulator) {
        var result = seed;
        foreach (var item in source) {
            result = accumulator(result, item);
        }
        return result;
    }
}

// Generic Delegate Combinations
public class GenericDelegateExample {
    public delegate TResult Processor<TInput, TResult>(TInput input);

    public void DemonstrateGenericDelegates() {
        // String processor
        Processor<string, int> stringLengthProcessor = s => s.Length;
        Processor<string, string> stringUpperProcessor = s => s.ToUpper();

        // Number processor
        Processor<int, bool> isEvenProcessor = n => n % 2 == 0;
        Processor<int, double> squareRootProcessor = n => Math.Sqrt(n);

        Console.WriteLine("=== Generic Delegates ===");
        Console.WriteLine("Length of 'hello': " + stringLengthProcessor("hello"));
        Console.WriteLine("'hello' uppercase: " + stringUpperProcessor("hello"));
        Console.WriteLine("4 is even: " + isEvenProcessor(4));
        Console.WriteLine("Square root of 16: " + squareRootProcessor(16));
    }
}

// Demonstration
public void DemonstrateDelegatesAndLambdas() {
    var delegateExamples = new DelegateExamples();
    delegateExamples.DemonstrateActions();
    delegateExamples.DemonstrateFuncs();
    delegateExamples.DemonstratePredicates();

    var multicastExample = new MulticastDelegateExample();
    multicastExample.DemonstrateMulticast();

    var anonymousExample = new AnonymousMethodExample();
    anonymousExample.DemonstrateAnonymousMethods();

    var closureExample = new ClosureExample();
    closureExample.DemonstrateClosure();
    closureExample.DemonstrateClosureFix();

    var expressionExample = new ExpressionTreeExample();
    expressionExample.DemonstrateExpressionTrees();

    // Expression tree predicate builder
    var products = new[] {
        new { Name = "Laptop", Price = 999.99 },
        new { Name = "Mouse", Price = 25.99 },
        new { Name = "Keyboard", Price = 75.99 }
    };

    var expensivePredicate = expressionExample.BuildPredicate<dynamic>("Price", 100.0);
    var expensiveProducts = products.Where(p => expensivePredicate(p));
    Console.WriteLine("Expensive products: " + string.Join(", ", expensiveProducts.Select(p => p.Name)));

    // Event handling
    var product = new EventExample { Price = 100.00m };
    var monitor = new PriceMonitor();
    monitor.SubscribeToPriceChanges(product);

    Console.WriteLine("\\n=== Event Handling ===");
    product.Price = 120.00m;
    product.Price = 95.00m;

    // Advanced patterns
    var patterns = new DelegatePatterns();
    patterns.DemonstrateStrategyPattern();
    patterns.DemonstrateCallbackPattern();
    patterns.DemonstrateLinqWithDelegates();

    var genericDelegateExample = new GenericDelegateExample();
    genericDelegateExample.DemonstrateGenericDelegates();
}`,
  keyPoints: [
    'Delegates are type-safe function pointers',
    'Lambda expressions provide concise syntax for anonymous methods',
    'Action<T> for void methods, Func<TResult> for methods with return values',
    'Multicast delegates can chain multiple method calls',
    'Closures capture variables from outer scope',
    'Expression trees enable runtime code analysis',
    'Use delegates for event handling, callbacks, and strategy patterns',
    'LINQ heavily uses lambda expressions for query composition',
  ],
  exercise:
    'Create a generic event system that supports multiple event types with type-safe handlers. Implement a delegate-based command pattern with undo/redo functionality. Build a LINQ provider that translates lambda expressions into SQL queries using expression trees. Create a reactive programming framework using delegates for observable sequences.',
};
