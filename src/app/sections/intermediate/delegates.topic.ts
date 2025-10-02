import { Topic } from '../../models/section';

export const delegatesTopic: Topic = {
  id: 'intermediate-delegates',
  name: 'Delegates and Events',
  sectionId: 'intermediate',
  slug: 'delegates',
  explanation: `
    <h3>Delegates in C#</h3>
    <p>Delegates are type-safe function pointers that allow methods to be passed as parameters. They form the foundation for events and are extensively used in LINQ, asynchronous programming, and event-driven architectures.</p>

    <h4>Types of Delegates</h4>
    <ul>
      <li><strong>Single-cast Delegate:</strong> References a single method</li>
      <li><strong>Multi-cast Delegate:</strong> References multiple methods (invocation list)</li>
      <li><strong>Generic Delegates:</strong> Action&lt;T&gt;, Func&lt;TResult&gt;, Predicate&lt;T&gt;</li>
      <li><strong>Anonymous Methods:</strong> Inline method definitions</li>
      <li><strong>Lambda Expressions:</strong> Concise anonymous methods</li>
    </ul>

    <h4>Built-in Generic Delegates</h4>
    <ul>
      <li><strong>Action:</strong> Represents methods that return void
        <ul>
          <li>Action&lt;T&gt; - One parameter</li>
          <li>Action&lt;T1, T2&gt; - Two parameters</li>
          <li>Action&lt;T1, T2, T3&gt; - Three parameters</li>
        </ul>
      </li>
      <li><strong>Func:</strong> Represents methods that return a value
        <ul>
          <li>Func&lt;TResult&gt; - No parameters, returns TResult</li>
          <li>Func&lt;T, TResult&gt; - One parameter, returns TResult</li>
          <li>Func&lt;T1, T2, TResult&gt; - Two parameters, returns TResult</li>
        </ul>
      </li>
      <li><strong>Predicate&lt;T&gt;:</strong> Represents methods that take one parameter and return bool</li>
    </ul>

    <h3>Events</h3>
    <p>Events are a way for a class to provide notifications to clients when something interesting happens. They are based on delegates and follow the publisher-subscriber pattern.</p>

    <h4>Event Best Practices</h4>
    <ul>
      <li><strong>Event Handler Pattern:</strong> Use EventHandler or EventHandler&lt;TEventArgs&gt;</li>
      <li><strong>Custom EventArgs:</strong> Inherit from EventArgs for custom event data</li>
      <li><strong>Thread Safety:</strong> Consider thread safety for multi-threaded scenarios</li>
      <li><strong>Null Checking:</strong> Always check for null before invoking events</li>
      <li><strong>Weak References:</strong> Use weak references to prevent memory leaks</li>
    </ul>

    <h4>Delegate vs Interface</h4>
    <ul>
      <li><strong>Use Delegates when:</strong>
        <ul>
          <li>You need callback functionality</li>
          <li>The caller determines the method to call</li>
          <li>You need multicast capabilities</li>
        </ul>
      </li>
      <li><strong>Use Interfaces when:</strong>
        <ul>
          <li>You need multiple related methods</li>
          <li>You want to define a contract</li>
          <li>You need implementation inheritance</li>
        </ul>
      </li>
    </ul>
  `,
  codeExample: `using System;

// Custom Delegate Declarations
public delegate void MessageHandler(string message);
public delegate int MathOperation(int a, int b);
public delegate bool CriteriaChecker<T>(T item);

// Generic Delegates (built-in)
public class DelegateDemo {
    // Single-cast delegate example
    public void DemonstrateSingleCastDelegate() {
        Console.WriteLine("=== Single-cast Delegate ===");

        MathOperation addOperation = Add;
        int result = addOperation(5, 3);
        Console.WriteLine($"5 + 3 = {result}");

        // Change the method the delegate points to
        MathOperation multiplyOperation = Multiply;
        result = multiplyOperation(5, 3);
        Console.WriteLine($"5 * 3 = {result}");
    }

    // Multi-cast delegate example
    public void DemonstrateMulticastDelegate() {
        Console.WriteLine("\\n=== Multi-cast Delegate ===");

        MessageHandler handler = null;

        // Add multiple methods to the invocation list
        handler += LogToConsole;
        handler += LogToFile;
        handler += SendEmail;

        // Invoke all methods in the list
        handler?.Invoke("System started successfully");

        Console.WriteLine("\\nRemoving LogToFile from invocation list...");
        handler -= LogToFile;

        handler?.Invoke("System shutdown initiated");
    }

    // Anonymous methods
    public void DemonstrateAnonymousMethods() {
        Console.WriteLine("\\n=== Anonymous Methods ===");

        MathOperation powerOperation = delegate(int a, int b) {
            int result = 1;
            for (int i = 0; i < b; i++) {
                result *= a;
            }
            return result;
        };

        Console.WriteLine($"2^3 = {powerOperation(2, 3)}");
        Console.WriteLine($"3^2 = {powerOperation(3, 2)}");
    }

    // Lambda expressions
    public void DemonstrateLambdaExpressions() {
        Console.WriteLine("\\n=== Lambda Expressions ===");

        // Func delegate with lambda
        Func<int, int, int> addLambda = (a, b) => a + b;
        Func<int, int, int> multiplyLambda = (a, b) => a * b;
        Func<int, int, int> maxLambda = (a, b) => a > b ? a : b;

        Console.WriteLine($"Add: 10 + 5 = {addLambda(10, 5)}");
        Console.WriteLine($"Multiply: 10 * 5 = {multiplyLambda(10, 5)}");
        Console.WriteLine($"Max: max(10, 5) = {maxLambda(10, 5)}");

        // Action delegate with lambda
        Action<string> greet = name => Console.WriteLine($"Hello, {name}!");
        greet("Alice");

        // Predicate with lambda
        Predicate<int> isEven = n => n % 2 == 0;
        Console.WriteLine($"Is 4 even? {isEven(4)}");
        Console.WriteLine($"Is 7 even? {isEven(7)}");
    }

    // Delegate as parameter
    public void DemonstrateDelegateAsParameter() {
        Console.WriteLine("\\n=== Delegate as Parameter ===");

        List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        // Filter using different criteria
        List<int> evenNumbers = Filter(numbers, n => n % 2 == 0);
        List<int> oddNumbers = Filter(numbers, n => n % 2 != 0);
        List<int> greaterThan5 = Filter(numbers, n => n > 5);

        Console.WriteLine($"Even numbers: {string.Join(", ", evenNumbers)}");
        Console.WriteLine($"Odd numbers: {string.Join(", ", oddNumbers)}");
        Console.WriteLine($"Numbers > 5: {string.Join(", ", greaterThan5)}");
    }

    // LINQ-like operations using delegates
    public void DemonstrateLinqStyleOperations() {
        Console.WriteLine("\\n=== LINQ-style Operations ===");

        List<int> numbers = new List<int> { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        // Custom Where implementation
        var evenNumbers = Where(numbers, n => n % 2 == 0);

        // Custom Select implementation
        var squaredNumbers = Select(evenNumbers, n => n * n);

        // Custom Aggregate implementation
        int sum = Aggregate(squaredNumbers, 0, (acc, n) => acc + n);

        Console.WriteLine($"Sum of squares of even numbers: {sum}");

        // Method chaining
        var result = numbers
            .Where(n => n > 3)
            .Select(n => n * n)
            .Where(n => n < 50)
            .Sum();

        Console.WriteLine($"Chained result: {result}");
    }

    // Helper methods for LINQ-style operations
    private List<T> Where<T>(List<T> source, Predicate<T> predicate) {
        List<T> result = new List<T>();
        foreach (T item in source) {
            if (predicate(item)) {
                result.Add(item);
            }
        }
        return result;
    }

    private List<TResult> Select<T, TResult>(List<T> source, Func<T, TResult> selector) {
        List<TResult> result = new List<TResult>();
        foreach (T item in source) {
            result.Add(selector(item));
        }
        return result;
    }

    private TAccumulate Aggregate<T, TAccumulate>(List<T> source, TAccumulate seed, Func<TAccumulate, T, TAccumulate> accumulator) {
        TAccumulate result = seed;
        foreach (T item in source) {
            result = accumulator(result, item);
        }
        return result;
    }

    // Helper methods for delegates
    private int Add(int a, int b) => a + b;
    private int Multiply(int a, int b) => a * b;

    private void LogToConsole(string message) {
        Console.WriteLine($"[CONSOLE] {DateTime.Now:HH:mm:ss}: {message}");
    }

    private void LogToFile(string message) {
        Console.WriteLine($"[FILE] Writing to log file: {message}");
    }

    private void SendEmail(string message) {
        Console.WriteLine($"[EMAIL] Sending notification: {message}");
    }

    private List<T> Filter<T>(List<T> source, Predicate<T> predicate) {
        return Where(source, predicate);
    }
}

// Events Example
public class Button {
    // Event declaration using EventHandler
    public event EventHandler Click;

    // Event declaration with custom EventArgs
    public event EventHandler<ButtonClickEventArgs> AdvancedClick;

    public string Text { get; set; }

    public Button(string text) {
        Text = text;
    }

    public void SimulateClick() {
        Console.WriteLine($"Button '{Text}' was clicked!");

        // Raise the event (null-conditional operator for safety)
        Click?.Invoke(this, EventArgs.Empty);

        // Raise the advanced event
        AdvancedClick?.Invoke(this, new ButtonClickEventArgs {
            ClickTime = DateTime.Now,
            ButtonText = Text
        });
    }
}

public class ButtonClickEventArgs : EventArgs {
    public DateTime ClickTime { get; set; }
    public string ButtonText { get; set; }
}

public class Window {
    private List<Button> _buttons = new List<Button>();

    public Window() {
        // Create some buttons
        Button saveButton = new Button("Save");
        Button cancelButton = new Button("Cancel");
        Button helpButton = new Button("Help");

        // Subscribe to events
        saveButton.Click += OnButtonClick;
        saveButton.AdvancedClick += OnAdvancedButtonClick;

        cancelButton.Click += OnButtonClick;
        cancelButton.AdvancedClick += OnAdvancedButtonClick;

        helpButton.Click += OnButtonClick;
        helpButton.AdvancedClick += OnAdvancedButtonClick;

        _buttons.AddRange(new[] { saveButton, cancelButton, helpButton });
    }

    private void OnButtonClick(object sender, EventArgs e) {
        Button button = (Button)sender;
        Console.WriteLine($"Window: {button.Text} button clicked");
    }

    private void OnAdvancedButtonClick(object sender, ButtonClickEventArgs e) {
        Console.WriteLine($"Window: Advanced click on '{e.ButtonText}' at {e.ClickTime:HH:mm:ss}");
    }

    public void SimulateUserInteraction() {
        Console.WriteLine("\\n=== Event Demonstration ===");

        foreach (Button button in _buttons) {
            button.SimulateClick();
            Thread.Sleep(1000); // Simulate time between clicks
        }
    }
}

// Observer Pattern using Delegates and Events
public class Stock {
    private decimal _price;

    public string Symbol { get; }
    public decimal Price {
        get => _price;
        set {
            if (_price != value) {
                _price = value;
                OnPriceChanged(new PriceChangedEventArgs(Symbol, _price));
            }
        }
    }

    public event EventHandler<PriceChangedEventArgs> PriceChanged;

    public Stock(string symbol, decimal initialPrice) {
        Symbol = symbol;
        _price = initialPrice;
    }

    protected virtual void OnPriceChanged(PriceChangedEventArgs e) {
        PriceChanged?.Invoke(this, e);
    }
}

public class PriceChangedEventArgs : EventArgs {
    public string Symbol { get; }
    public decimal NewPrice { get; }
    public DateTime Timestamp { get; }

    public PriceChangedEventArgs(string symbol, decimal newPrice) {
        Symbol = symbol;
        NewPrice = newPrice;
        Timestamp = DateTime.Now;
    }
}

public class StockTrader {
    private List<string> _watchedStocks = new List<string>();

    public StockTrader(StockMarket market) {
        // Subscribe to all stocks
        market.StockPriceChanged += OnStockPriceChanged;
    }

    private void OnStockPriceChanged(object sender, PriceChangedEventArgs e) {
        if (_watchedStocks.Contains(e.Symbol)) {
        Console.WriteLine("Trader Alert: " + e.Symbol + " price changed to $" + e.NewPrice.toFixed(2) + " at " + e.Timestamp.toTimeString());

            // Trading logic
            if (e.NewPrice < 100) {
                Console.WriteLine("  -> Buying " + e.Symbol);
            } else if (e.NewPrice > 200) {
                Console.WriteLine("  -> Selling " + e.Symbol);
            }
        }
    }

    public void WatchStock(string symbol) {
        _watchedStocks.Add(symbol);
    }
}

public class StockMarket {
    private List<Stock> _stocks = new List<Stock>();

    public event EventHandler<PriceChangedEventArgs> StockPriceChanged;

    public StockMarket() {
        _stocks.Add(new Stock("AAPL", 150.00m));
        _stocks.Add(new Stock("GOOGL", 2500.00m));
        _stocks.Add(new Stock("MSFT", 300.00m));

        // Subscribe to individual stock price changes
        foreach (Stock stock in _stocks) {
            stock.PriceChanged += OnIndividualStockPriceChanged;
        }
    }

    private void OnIndividualStockPriceChanged(object sender, PriceChangedEventArgs e) {
        // Forward the event to market subscribers
        StockPriceChanged?.Invoke(sender, e);
    }

    public void SimulateMarketActivity() {
        Random random = new Random();

        foreach (Stock stock in _stocks) {
            // Random price change
            decimal change = (decimal)(random.NextDouble() * 20 - 10); // -10 to +10
            stock.Price += change;
        }
    }

    public void DisplayStocks() {
        Console.WriteLine("\\nCurrent Stock Prices:");
        foreach (Stock stock in _stocks) {
        Console.WriteLine("  " + stock.Symbol + ": $" + stock.Price.toFixed(2));
        }
    }
}

// Asynchronous delegates and callbacks
public class AsyncDelegateDemo {
    public delegate int LongRunningOperation(int input);

    public void DemonstrateAsyncDelegates() {
        Console.WriteLine("\\n=== Asynchronous Delegates ===");

        LongRunningOperation operation = PerformLongOperation;

        // Start async operation
        IAsyncResult asyncResult = operation.BeginInvoke(5, null, null);

        Console.WriteLine("Async operation started...");

        // Do other work while operation runs
        for (int i = 0; i < 3; i++) {
            Console.WriteLine($"Doing other work... {i + 1}");
            Thread.Sleep(500);
        }

        // Get the result (this will block if operation not complete)
        int result = operation.EndInvoke(asyncResult);

        Console.WriteLine($"Async operation result: {result}");
    }

    private int PerformLongOperation(int input) {
        Console.WriteLine($"Starting long operation with input: {input}");
        Thread.Sleep(2000); // Simulate long operation
        int result = input * input;
        Console.WriteLine($"Long operation completed: {input} * {input} = {result}");
        return result;
    }
}

// Main demonstration
public void RunDelegateAndEventDemo() {
    DelegateDemo delegateDemo = new DelegateDemo();
    delegateDemo.DemonstrateSingleCastDelegate();
    delegateDemo.DemonstrateMulticastDelegate();
    delegateDemo.DemonstrateAnonymousMethods();
    delegateDemo.DemonstrateLambdaExpressions();
    delegateDemo.DemonstrateDelegateAsParameter();
    delegateDemo.DemonstrateLinqStyleOperations();

    Window window = new Window();
    window.SimulateUserInteraction();

    // Stock market simulation
    Console.WriteLine("\\n=== Stock Market Simulation ===");
    StockMarket market = new StockMarket();
    StockTrader trader = new StockTrader(market);

    trader.WatchStock("AAPL");
    trader.WatchStock("MSFT");

    market.DisplayStocks();

    for (int i = 0; i < 3; i++) {
        Console.WriteLine($"\\nMarket update {i + 1}:");
        market.SimulateMarketActivity();
        market.DisplayStocks();
        Thread.Sleep(1000);
    }

    AsyncDelegateDemo asyncDemo = new AsyncDelegateDemo();
    asyncDemo.DemonstrateAsyncDelegates();
}`,
  keyPoints: [
    'Delegates are type-safe function pointers',
    'Use Action<T> for void methods, Func<T, TResult> for methods that return values',
    'Events use delegates but provide encapsulation',
    'Lambda expressions provide concise syntax for anonymous methods',
    'Multicast delegates can invoke multiple methods',
    'Always check for null before invoking events',
    'Use EventHandler<T> for custom event arguments',
  ],
  exercise:
    'Create a custom event system for a file watcher. Implement a FileWatcher class that monitors a directory and raises events when files are created, modified, or deleted. Create a FileLogger class that subscribes to these events and logs them. Use delegates and events to implement the observer pattern.',
};
