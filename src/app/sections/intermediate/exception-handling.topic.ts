import { Topic } from '../../models/section';

export const exceptionHandlingTopic: Topic = {
  id: 'intermediate-exception-handling',
  name: 'Exception Handling and Debugging',
  sectionId: 'intermediate',
  slug: 'exception-handling',
  explanation: `
    <h3>Exception Handling in C#</h3>
    <p>Exception handling is crucial for building robust applications. C# provides structured exception handling using try-catch-finally blocks to manage runtime errors gracefully.</p>

    <h4>Exception Hierarchy</h4>
    <ul>
      <li><strong>System.Exception:</strong> Base class for all exceptions
        <ul>
          <li><strong>SystemException:</strong> System-generated exceptions
            <ul>
              <li>ArgumentException, ArgumentNullException, ArgumentOutOfRangeException</li>
              <li>ArithmeticException (DivideByZeroException, OverflowException)</li>
              <li>IOException (FileNotFoundException, DirectoryNotFoundException)</li>
              <li>NullReferenceException, IndexOutOfRangeException</li>
              <li>InvalidCastException, InvalidOperationException</li>
            </ul>
          </li>
          <li><strong>ApplicationException:</strong> User-defined exceptions (legacy)</li>
        </ul>
      </li>
    </ul>

    <h4>Exception Handling Best Practices</h4>
    <ul>
      <li><strong>Catch specific exceptions first:</strong> Order from most specific to most general</li>
      <li><strong>Don't catch System.Exception:</strong> Unless re-throwing or at top level</li>
      <li><strong>Use finally for cleanup:</strong> Resources are always disposed</li>
      <li><strong>Preserve stack trace:</strong> Use throw; not throw ex;</li>
      <li><strong>Create custom exceptions:</strong> When specific error conditions need handling</li>
      <li><strong>Log exceptions:</strong> For debugging and monitoring</li>
      <li><strong>Fail fast:</strong> Don't hide serious errors</li>
    </ul>

    <h4>Debugging Techniques</h4>
    <ul>
      <li><strong>Breakpoints:</strong> Pause execution at specific lines</li>
      <li><strong>Watch windows:</strong> Monitor variable values</li>
      <li><strong>Call stack:</strong> See method call sequence</li>
      <li><strong>Immediate window:</strong> Execute code during debugging</li>
      <li><strong>Conditional breakpoints:</strong> Break only when conditions met</li>
      <li><strong>Data tips:</strong> View object properties on hover</li>
      <li><strong>Exception settings:</strong> Control which exceptions break execution</li>
    </ul>

    <h4>Custom Exceptions</h4>
    <p>Create custom exceptions by inheriting from Exception or ApplicationException. Include error codes, additional data, and meaningful messages.</p>
  `,
  codeExample: `using System;
using System.IO;
using System.Collections.Generic;
using System.Diagnostics;

public class ExceptionHandlingDemo {
    // Basic Exception Handling
    public void DemonstrateBasicExceptionHandling() {
        Console.WriteLine("=== Basic Exception Handling ===");

        try {
            Console.Write("Enter a number: ");
            string input = Console.ReadLine();
            int number = int.Parse(input);
            Console.WriteLine($"Parsed number: {number}");

            // Potential division by zero
            int divisor = new Random().Next(3); // 0, 1, or 2
            int result = number / divisor;
            Console.WriteLine($"Result: {number} / {divisor} = {result}");
        }
        catch (FormatException ex) {
            Console.WriteLine($"Format error: {ex.Message}");
        }
        catch (DivideByZeroException ex) {
            Console.WriteLine($"Division by zero: {ex.Message}");
        }
        catch (Exception ex) {
            Console.WriteLine($"Unexpected error: {ex.Message}");
        }
        finally {
            Console.WriteLine("This always executes (cleanup code)");
        }
    }

    // Nested Try-Catch Blocks
    public void DemonstrateNestedExceptionHandling() {
        Console.WriteLine("\\n=== Nested Exception Handling ===");

        try {
            Console.WriteLine("Outer try block");

            try {
                Console.WriteLine("Inner try block");
                throw new InvalidOperationException("Inner exception");
            }
            catch (InvalidOperationException ex) {
                Console.WriteLine($"Inner catch: {ex.Message}");
                // Re-throw to outer catch
                throw;
            }
            finally {
                Console.WriteLine("Inner finally block");
            }
        }
        catch (Exception ex) {
            Console.WriteLine($"Outer catch: {ex.Message}");
        }
        finally {
            Console.WriteLine("Outer finally block");
        }
    }

    // Multiple Exception Types
    public void DemonstrateMultipleExceptions() {
        Console.WriteLine("\\n=== Multiple Exception Types ===");

        List<string> operations = new List<string> {
            "valid", "null", "empty", "invalid", "overflow"
        };

        foreach (string operation in operations) {
            try {
                PerformOperation(operation);
                Console.WriteLine($"{operation}: Success");
            }
            catch (ArgumentNullException ex) {
                Console.WriteLine($"{operation}: Null argument - {ex.Message}");
            }
            catch (ArgumentException ex) {
                Console.WriteLine($"{operation}: Invalid argument - {ex.Message}");
            }
            catch (OverflowException ex) {
                Console.WriteLine($"{operation}: Overflow - {ex.Message}");
            }
            catch (Exception ex) {
                Console.WriteLine($"{operation}: Unexpected error - {ex.Message}");
            }
        }
    }

    private void PerformOperation(string operation) {
        switch (operation) {
            case "null":
                throw new ArgumentNullException("operation", "Operation cannot be null");
            case "empty":
                throw new ArgumentException("Operation cannot be empty", "operation");
            case "invalid":
                throw new InvalidOperationException("Invalid operation requested");
            case "overflow":
                checked {
                    int maxValue = int.MaxValue;
                    int result = maxValue + 1; // This will overflow
                }
                break;
            case "valid":
                // No exception
                break;
        }
    }

    // Using Statement and IDisposable
    public void DemonstrateUsingStatement() {
        Console.WriteLine("\\n=== Using Statement and IDisposable ===");

        // Manual resource management (not recommended)
        StreamWriter manualWriter = null;
        try {
            manualWriter = new StreamWriter("manual.txt");
            manualWriter.WriteLine("Manual resource management");
        }
        finally {
            if (manualWriter != null) {
                manualWriter.Dispose();
            }
        }

        // Using statement (recommended)
        using (StreamWriter writer = new StreamWriter("using.txt")) {
            writer.WriteLine("Automatic resource management");
            writer.WriteLine("Resources disposed automatically");
        } // Dispose() called automatically here

        // Multiple resources
        using (StreamReader reader = new StreamReader("using.txt"))
        using (StreamWriter writer = new StreamWriter("copy.txt")) {
            string line;
            while ((line = reader.ReadLine()) != null) {
                writer.WriteLine(line);
            }
        }
    }

    // Custom Exceptions
    public class InsufficientFundsException : Exception {
        public decimal CurrentBalance { get; }
        public decimal RequiredAmount { get; }

        public InsufficientFundsException(decimal currentBalance, decimal requiredAmount)
            : base($"Insufficient funds. Current balance: {currentBalance:C}, Required: {requiredAmount:C}") {
            CurrentBalance = currentBalance;
            RequiredAmount = requiredAmount;
        }

        public InsufficientFundsException(decimal currentBalance, decimal requiredAmount, Exception innerException)
            : base($"Insufficient funds. Current balance: {currentBalance:C}, Required: {requiredAmount:C}", innerException) {
            CurrentBalance = currentBalance;
            RequiredAmount = requiredAmount;
        }
    }

    public class BankAccount {
        public string AccountNumber { get; }
        public decimal Balance { get; private set; }

        public BankAccount(string accountNumber, decimal initialBalance) {
            AccountNumber = accountNumber;
            Balance = initialBalance;
        }

        public void Deposit(decimal amount) {
            if (amount <= 0) {
                throw new ArgumentException("Deposit amount must be positive", "amount");
            }
            Balance += amount;
        }

        public void Withdraw(decimal amount) {
            if (amount <= 0) {
                throw new ArgumentException("Withdrawal amount must be positive", "amount");
            }

            if (amount > Balance) {
                throw new InsufficientFundsException(Balance, amount);
            }

            Balance -= amount;
        }

        public void Transfer(BankAccount targetAccount, decimal amount) {
            if (targetAccount == null) {
                throw new ArgumentNullException("targetAccount");
            }

            // Start transaction
            decimal originalBalance = Balance;
            decimal originalTargetBalance = targetAccount.Balance;

            try {
                Withdraw(amount);
                targetAccount.Deposit(amount);
                Console.WriteLine($"Transfer of {amount:C} completed successfully");
            }
            catch (InsufficientFundsException ex) {
                // Rollback not needed since withdrawal failed
                Console.WriteLine($"Transfer failed: {ex.Message}");
                throw;
            }
            catch (Exception ex) {
                // Rollback needed
                Balance = originalBalance;
                targetAccount.Balance = originalTargetBalance;
                throw new InvalidOperationException("Transfer failed and was rolled back", ex);
            }
        }
    }

    public void DemonstrateCustomExceptions() {
        Console.WriteLine("\\n=== Custom Exceptions ===");

        BankAccount account1 = new BankAccount("12345", 1000.00m);
        BankAccount account2 = new BankAccount("67890", 500.00m);

        try {
            Console.WriteLine($"Account 1 balance: {account1.Balance:C}");
            Console.WriteLine($"Account 2 balance: {account2.Balance:C}");

            // Successful operations
            account1.Deposit(500);
            account1.Withdraw(200);
            Console.WriteLine($"After deposit/withdrawal: {account1.Balance:C}");

            // Transfer
            account1.Transfer(account2, 300);
            Console.WriteLine($"After transfer - Account 1: {account1.Balance:C}, Account 2: {account2.Balance:C}");

            // This will fail
            account1.Withdraw(2000);
        }
        catch (InsufficientFundsException ex) {
            Console.WriteLine($"Banking error: {ex.Message}");
            Console.WriteLine($"Current balance: {ex.CurrentBalance:C}, Required: {ex.RequiredAmount:C}");
        }
        catch (ArgumentException ex) {
            Console.WriteLine($"Invalid argument: {ex.Message}");
        }
        catch (Exception ex) {
            Console.WriteLine($"Unexpected banking error: {ex.Message}");
        }
    }

    // Exception Filtering (C# 6.0+)
    public void DemonstrateExceptionFiltering() {
        Console.WriteLine("\\n=== Exception Filtering ===");

        for (int i = 0; i < 5; i++) {
            try {
                PerformRiskyOperation(i);
            }
            catch (IOException ex) when (ex.Message.Contains("network")) {
                Console.WriteLine($"Network error (will rethrow): {ex.Message}");
                throw;
            }
            catch (IOException ex) when (ex.Message.Contains("disk")) {
                Console.WriteLine($"Disk error (handled): {ex.Message}");
                // Handle disk errors but continue
            }
            catch (Exception ex) {
                Console.WriteLine($"Other error: {ex.Message}");
            }
        }
    }

    private void PerformRiskyOperation(int attempt) {
        switch (attempt) {
            case 0:
                throw new IOException("Network connection failed");
            case 1:
                throw new IOException("Disk is full");
            case 2:
                throw new InvalidOperationException("Invalid operation");
            default:
                Console.WriteLine("Operation succeeded");
                break;
        }
    }

    // Global Exception Handling
    public void DemonstrateGlobalExceptionHandling() {
        Console.WriteLine("\\n=== Global Exception Handling ===");

        // Set up global exception handlers
        AppDomain.CurrentDomain.UnhandledException += (sender, e) => {
            Exception ex = e.ExceptionObject as Exception;
            Console.WriteLine($"[GLOBAL] Unhandled exception: {ex?.Message}");
            LogException(ex);
        };

        // Simulate unhandled exception
        Task.Run(() => {
            Thread.Sleep(100);
            throw new InvalidOperationException("Unhandled exception in background task");
        });

        Console.WriteLine("Background task started. Waiting for exception...");
        Thread.Sleep(200);
    }

    // Logging and Debugging
    public void DemonstrateLoggingAndDebugging() {
        Console.WriteLine("\\n=== Logging and Debugging ===");

        try {
            // Code that might fail
            ProcessData(null);
        }
        catch (Exception ex) {
            LogException(ex);

            // Use debugger breakpoints in development
            if (Debugger.IsAttached) {
                Debugger.Break(); // This will break into debugger
            }
        }
    }

    private void ProcessData(object data) {
        if (data == null) {
            throw new ArgumentNullException("data", "Data cannot be null");
        }

        // Process data...
        Debug.WriteLine("Processing data: " + data.ToString());
        Trace.WriteLine("Processing data: " + data.ToString());
    }

    private void LogException(Exception ex) {
        string logMessage = $"[{DateTime.Now:yyyy-MM-dd HH:mm:ss}] Exception: {ex.GetType().Name}\\n" +
                           $"Message: {ex.Message}\\n" +
                           $"Stack Trace: {ex.StackTrace}\\n";

        // In a real application, write to file, database, or logging service
        Console.WriteLine("LOGGED: " + logMessage.Replace("\\n", " | "));

        // Log inner exception if present
        if (ex.InnerException != null) {
            LogException(ex.InnerException);
        }
    }

    // Defensive Programming
    public void DemonstrateDefensiveProgramming() {
        Console.WriteLine("\\n=== Defensive Programming ===");

        List<string> names = new List<string> { "Alice", "Bob", null, "Charlie" };

        foreach (string name in names) {
            // Defensive checks
            if (string.IsNullOrEmpty(name)) {
                Console.WriteLine("Warning: Null or empty name encountered");
                continue;
            }

            if (name.Length < 2) {
                Console.WriteLine($"Warning: Name '{name}' is too short");
                continue;
            }

            // Safe processing
            string processedName = ProcessNameSafely(name);
            Console.WriteLine($"Processed: {processedName}");
        }
    }

    private string ProcessNameSafely(string name) {
        try {
            // Simulate processing that might fail
            if (name.Contains("Bob")) {
                throw new InvalidOperationException("Bob is not allowed");
            }

            return name.ToUpper();
        }
        catch (Exception ex) {
            Console.WriteLine($"Error processing name '{name}': {ex.Message}");
            return "ERROR";
        }
    }

    // Performance Considerations
    public void DemonstratePerformanceConsiderations() {
        Console.WriteLine("\\n=== Performance Considerations ===");

        Stopwatch stopwatch = new Stopwatch();

        // Inefficient exception handling (don't do this)
        stopwatch.Start();
        int inefficientResult = 0;
        for (int i = 0; i < 100000; i++) {
            try {
                inefficientResult += i / (i % 100); // Will cause many exceptions
            }
            catch (DivideByZeroException) {
                inefficientResult += 1;
            }
        }
        stopwatch.Stop();
        Console.WriteLine($"Inefficient approach took: {stopwatch.ElapsedMilliseconds}ms");

        // Efficient approach
        stopwatch.Reset();
        stopwatch.Start();
        int efficientResult = 0;
        for (int i = 0; i < 100000; i++) {
            if (i % 100 == 0) {
                efficientResult += 1;
            } else {
                efficientResult += i / (i % 100);
            }
        }
        stopwatch.Stop();
        Console.WriteLine($"Efficient approach took: {stopwatch.ElapsedMilliseconds}ms");

        Console.WriteLine($"Results match: {inefficientResult == efficientResult}");
    }

    // Async Exception Handling
    public async Task DemonstrateAsyncExceptionHandling() {
        Console.WriteLine("\\n=== Async Exception Handling ===");

        try {
            await PerformAsyncOperation(true);
            Console.WriteLine("Async operation succeeded");
        }
        catch (InvalidOperationException ex) {
            Console.WriteLine($"Async operation failed: {ex.Message}");
        }

        // Multiple concurrent operations
        Task[] tasks = new Task[] {
            PerformAsyncOperation(false),
            PerformAsyncOperation(true),  // This will fail
            PerformAsyncOperation(false)
        };

        try {
            await Task.WhenAll(tasks);
            Console.WriteLine("All async operations succeeded");
        }
        catch (Exception ex) {
            Console.WriteLine($"Some async operations failed: {ex.Message}");
        }

        // Handle individual task results
        foreach (Task task in tasks) {
            if (task.IsFaulted) {
                Console.WriteLine($"Task failed: {task.Exception?.InnerException?.Message}");
            } else {
                Console.WriteLine("Task succeeded");
            }
        }
    }

    private async Task PerformAsyncOperation(bool shouldFail) {
        await Task.Delay(100); // Simulate async work

        if (shouldFail) {
            throw new InvalidOperationException("Async operation failed as requested");
        }
    }
}

// Main demonstration
public async Task RunExceptionHandlingDemo() {
    ExceptionHandlingDemo demo = new ExceptionHandlingDemo();

    demo.DemonstrateBasicExceptionHandling();
    demo.DemonstrateNestedExceptionHandling();
    demo.DemonstrateMultipleExceptions();
    demo.DemonstrateUsingStatement();
    demo.DemonstrateCustomExceptions();
    demo.DemonstrateExceptionFiltering();
    demo.DemonstrateDefensiveProgramming();
    demo.DemonstratePerformanceConsiderations();
    await demo.DemonstrateAsyncExceptionHandling();

    // Note: Global exception handling demo would interfere with other demos
    // demo.DemonstrateGlobalExceptionHandling();
    // demo.DemonstrateLoggingAndDebugging();
}`,
  keyPoints: [
    'Catch specific exceptions before general ones',
    'Use finally blocks for cleanup and resource disposal',
    'Create custom exceptions for specific error conditions',
    'Use throw; to preserve stack traces, not throw ex;',
    'Exception handling is expensive - avoid in performance-critical code',
    'Use using statements for automatic resource management',
    'Log exceptions with full context for debugging',
    'Fail fast for serious errors, handle gracefully for recoverable ones',
  ],
  exercise:
    'Create a robust file processing application that: 1) Reads multiple files concurrently, 2) Handles various file-related exceptions, 3) Implements retry logic for transient failures, 4) Logs all errors with context, 5) Provides progress reporting, 6) Allows cancellation of long-running operations.',
};
