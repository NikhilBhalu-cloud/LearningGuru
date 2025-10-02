import { Topic } from '../../models/section';

export const asyncProgrammingTopic: Topic = {
  id: 'advanced-async-programming',
  name: 'Asynchronous Programming',
  sectionId: 'advanced',
  slug: 'async-programming',
  explanation: `
    <h3>Asynchronous Programming in C#</h3>
    <p>Asynchronous programming enables applications to remain responsive while performing I/O-bound or CPU-bound operations. C# provides async/await keywords, Task-based patterns, and various synchronization primitives for building scalable concurrent applications.</p>

    <h4>Async/Await Fundamentals</h4>
    <ul>
      <li><strong>async:</strong> Marks a method as asynchronous</li>
      <li><strong>await:</strong> Suspends execution until the awaited task completes</li>
      <li><strong>Task:</strong> Represents an asynchronous operation</li>
      <li><strong>Task&lt;T&gt;:</strong> Represents an asynchronous operation that returns a value</li>
    </ul>

    <h4>Asynchronous Patterns</h4>
    <ul>
      <li><strong>Task-based Asynchronous Pattern (TAP):</strong> Modern async pattern</li>
      <li><strong>Asynchronous Programming Model (APM):</strong> Legacy Begin/End pattern</li>
      <li><strong>Event-based Asynchronous Pattern (EAP):</strong> Event-driven async pattern</li>
      <li><strong>Reactive Extensions:</strong> Observable sequences and LINQ</li>
    </ul>

    <h4>Concurrency vs Parallelism</h4>
    <ul>
      <li><strong>Concurrency:</strong> Dealing with multiple tasks (can be interleaved)</li>
      <li><strong>Parallelism:</strong> Executing multiple tasks simultaneously</li>
      <li><strong>Asynchronous:</strong> Non-blocking I/O operations</li>
    </ul>

    <h4>Synchronization Primitives</h4>
    <ul>
      <li><strong>SemaphoreSlim:</strong> Limits concurrent access</li>
      <li><strong>Mutex:</strong> Cross-process synchronization</li>
      <li><strong>ReaderWriterLockSlim:</strong> Multiple readers, single writer</li>
      <li><strong>Interlocked:</strong> Atomic operations on variables</li>
      <li><strong>Volatile:</strong> Prevents compiler optimizations on variables</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;

// Basic Async/Await
public class AsyncBasics {
    public async Task DemonstrateAsyncAwait() {
        Console.WriteLine("Starting async operation...");

        // Simulate async work
        await Task.Delay(1000);
        Console.WriteLine("Async operation completed");

        // Async method with return value
        int result = await CalculateSumAsync(10, 20);
        Console.WriteLine("Sum result: " + result);

        // Multiple concurrent operations
        var task1 = Task.Delay(500).ContinueWith(_ => "Task 1 completed");
        var task2 = Task.Delay(800).ContinueWith(_ => "Task 2 completed");
        var task3 = Task.Delay(300).ContinueWith(_ => "Task 3 completed");

        string[] results = await Task.WhenAll(task1, task2, task3);
        foreach (var res in results) {
            Console.WriteLine(res);
        }
    }

    private async Task<int> CalculateSumAsync(int a, int b) {
        // Simulate some async work
        await Task.Delay(500);
        return a + b;
    }

    public async Task DemonstrateExceptionHandling() {
        try {
            await ProcessDataAsync("invalid");
        } catch (ArgumentException ex) {
            Console.WriteLine("Caught ArgumentException: " + ex.Message);
        } catch (Exception ex) {
            Console.WriteLine("Caught general exception: " + ex.Message);
        }
    }

    private async Task ProcessDataAsync(string data) {
        if (string.IsNullOrEmpty(data)) {
            throw new ArgumentException("Data cannot be null or empty");
        }

        await Task.Delay(100);
        if (data == "invalid") {
            throw new InvalidOperationException("Invalid data format");
        }

        Console.WriteLine("Data processed: " + data);
    }
}

// Task Parallel Library (TPL)
public class TaskParallelLibrary {
    public async Task DemonstrateTPL() {
        Console.WriteLine("=== Task Parallel Library ===");

        // Parallel.ForEach
        var numbers = Enumerable.Range(1, 10);
        await Task.Run(() => {
            Parallel.ForEach(numbers, number => {
                Console.WriteLine("Processing " + number + " on thread " + Thread.CurrentThread.ManagedThreadId);
                Task.Delay(100).Wait(); // Simulate work
            });
        });

        // Parallel LINQ (PLINQ)
        var evenSquares = numbers
            .AsParallel()
            .Where(n => n % 2 == 0)
            .Select(n => n * n)
            .ToList();

        Console.WriteLine("Even squares: " + string.Join(", ", evenSquares));

        // Task.Factory for advanced task creation
        var task = Task.Factory.StartNew(() => {
            Console.WriteLine("Task running on thread: " + Thread.CurrentThread.ManagedThreadId);
            return 42;
        });

        int result = await task;
        Console.WriteLine("Task result: " + result);
    }
}

// Cancellation and Timeouts
public class CancellationAndTimeouts {
    public async Task DemonstrateCancellation() {
        using (var cts = new CancellationTokenSource()) {
            // Cancel after 2 seconds
            cts.CancelAfter(2000);

            try {
                await LongRunningOperationAsync(cts.Token);
            } catch (OperationCanceledException) {
                Console.WriteLine("Operation was cancelled");
            }
        }
    }

    private async Task LongRunningOperationAsync(CancellationToken cancellationToken) {
        for (int i = 0; i < 10; i++) {
            cancellationToken.ThrowIfCancellationRequested();

            Console.WriteLine("Step " + (i + 1) + "/10");
            await Task.Delay(500, cancellationToken);
        }
    }

    public async Task DemonstrateTimeout() {
        try {
            var result = await SlowOperationAsync().TimeoutAfter(1000);
            Console.WriteLine("Operation completed: " + result);
        } catch (TimeoutException) {
            Console.WriteLine("Operation timed out");
        }
    }

    private async Task<string> SlowOperationAsync() {
        await Task.Delay(2000); // Takes longer than timeout
        return "Completed";
    }
}

// Synchronization Primitives
public class SynchronizationPrimitives {
    private readonly SemaphoreSlim _semaphore = new SemaphoreSlim(3); // Allow 3 concurrent operations
    private readonly ReaderWriterLockSlim _rwLock = new ReaderWriterLockSlim();
    private int _sharedCounter = 0;

    public async Task DemonstrateSemaphore() {
        Console.WriteLine("=== Semaphore Demo ===");
        var tasks = new List<Task>();

        for (int i = 0; i < 10; i++) {
            tasks.Add(ProcessWithSemaphoreAsync(i));
        }

        await Task.WhenAll(tasks);
    }

    private async Task ProcessWithSemaphoreAsync(int id) {
        Console.WriteLine("Task " + id + " waiting for semaphore...");
        await _semaphore.WaitAsync();

        try {
            Console.WriteLine("Task " + id + " acquired semaphore");
            await Task.Delay(1000); // Simulate work
            Console.WriteLine("Task " + id + " releasing semaphore");
        } finally {
            _semaphore.Release();
        }
    }

    public void DemonstrateReaderWriterLock() {
        Console.WriteLine("\\n=== ReaderWriterLock Demo ===");

        // Multiple readers
        Parallel.Invoke(
            () => ReadData("Reader 1"),
            () => ReadData("Reader 2"),
            () => ReadData("Reader 3"),
            () => WriteData("Writer 1", 100)
        );
    }

    private void ReadData(string readerName) {
        _rwLock.EnterReadLock();
        try {
            Console.WriteLine(readerName + " reading: " + _sharedCounter);
            Thread.Sleep(500);
        } finally {
            _rwLock.ExitReadLock();
        }
    }

    private void WriteData(string writerName, int newValue) {
        _rwLock.EnterWriteLock();
        try {
            Console.WriteLine(writerName + " writing: " + newValue);
            _sharedCounter = newValue;
            Thread.Sleep(1000);
        } finally {
            _rwLock.ExitWriteLock();
        }
    }

    public void DemonstrateInterlocked() {
        Console.WriteLine("\\n=== Interlocked Operations ===");
        int counter = 0;

        Parallel.For(0, 1000000, _ => {
            Interlocked.Increment(ref counter);
        });

        Console.WriteLine("Final counter value: " + counter);
    }
}

// Async Streams (C# 8.0+)
public class AsyncStreams {
    public async Task DemonstrateAsyncStreams() {
        Console.WriteLine("=== Async Streams ===");

        await foreach (var number in GenerateNumbersAsync()) {
            Console.WriteLine("Received: " + number);
            if (number >= 5) break; // Stop early
        }

        Console.WriteLine("\\nProcessing data stream:");
        await foreach (var data in ProcessDataStreamAsync()) {
            Console.WriteLine("Processed: " + data);
        }
    }

    private async IAsyncEnumerable<int> GenerateNumbersAsync() {
        for (int i = 1; i <= 10; i++) {
            await Task.Delay(200); // Simulate async work
            yield return i;
        }
    }

    private async IAsyncEnumerable<string> ProcessDataStreamAsync() {
        var data = new[] { "apple", "banana", "cherry", "date" };

        foreach (var item in data) {
            await Task.Delay(300); // Simulate processing
            yield return item.ToUpper();
        }
    }
}

// Async Factory Pattern
public class AsyncFactoryPattern {
    private readonly Dictionary<string, Func<Task<IService>>> _serviceFactories =
        new Dictionary<string, Func<Task<IService>>>();

    public void RegisterService<TService>(string name) where TService : IService, new() {
        _serviceFactories[name] = async () => {
            await Task.Delay(100); // Simulate initialization
            return new TService();
        };
    }

    public async Task<IService> CreateServiceAsync(string name) {
        if (_serviceFactories.TryGetValue(name, out var factory)) {
            return await factory();
        }
        throw new ArgumentException("Service not found: " + name);
    }
}

public interface IService {
    Task ExecuteAsync();
}

public class DatabaseService : IService {
    public async Task ExecuteAsync() {
        await Task.Delay(200);
        Console.WriteLine("Database operation completed");
    }
}

public class EmailService : IService {
    public async Task ExecuteAsync() {
        await Task.Delay(150);
        Console.WriteLine("Email sent successfully");
    }
}

// Async Lazy Initialization
public class AsyncLazy<T> {
    private readonly Func<Task<T>> _factory;
    private readonly object _lock = new object();
    private Task<T> _instance;

    public AsyncLazy(Func<Task<T>> factory) {
        _factory = factory;
    }

    public Task<T> Value {
        get {
            lock (_lock) {
                return _instance ?? (_instance = _factory());
            }
        }
    }
}

// HttpClient Best Practices
public class HttpClientBestPractices {
    // Singleton HttpClient (don't create multiple instances)
    private static readonly HttpClient _httpClient = new HttpClient {
        Timeout = TimeSpan.FromSeconds(30)
    };

    public async Task DemonstrateHttpClientUsage() {
        try {
            // GET request
            var response = await _httpClient.GetAsync("https://jsonplaceholder.typicode.com/posts/1");
            response.EnsureSuccessStatusCode();

            var content = await response.Content.ReadAsStringAsync();
            Console.WriteLine("GET Response: " + content.Substring(0, 100) + "...");

            // POST request
            var postData = new { title = "Test Post", body = "Test content", userId = 1 };
            var json = System.Text.Json.JsonSerializer.Serialize(postData);
            var httpContent = new StringContent(json, System.Text.Encoding.UTF8, "application/json");

            var postResponse = await _httpClient.PostAsync("https://jsonplaceholder.typicode.com/posts", httpContent);
            postResponse.EnsureSuccessStatusCode();

            var postResult = await postResponse.Content.ReadAsStringAsync();
            Console.WriteLine("POST Response: " + postResult);

        } catch (HttpRequestException ex) {
            Console.WriteLine("HTTP Error: " + ex.Message);
        } catch (TaskCanceledException) {
            Console.WriteLine("Request timed out");
        }
    }
}

// ValueTask for High-Performance Scenarios
public class ValueTaskExample {
    private readonly Dictionary<string, string> _cache = new Dictionary<string, string>();

    public async ValueTask<string> GetDataAsync(string key) {
        // Check cache first (synchronous)
        if (_cache.TryGetValue(key, out var cachedValue)) {
            return cachedValue;
        }

        // Simulate async I/O
        await Task.Delay(100);
        var value = "Data for " + key;
        _cache[key] = value;

        return value;
    }

    public async Task DemonstrateValueTask() {
        Console.WriteLine("=== ValueTask Demo ===");

        // First call - cache miss, async operation
        var result1 = await GetDataAsync("key1");
        Console.WriteLine("First call result: " + result1);

        // Second call - cache hit, synchronous operation
        var result2 = await GetDataAsync("key1");
        Console.WriteLine("Second call result: " + result2);
    }
}

// Extension Methods for Async Operations
public static class AsyncExtensions {
    public static async Task TimeoutAfter(this Task task, int milliseconds) {
        using (var cts = new CancellationTokenSource()) {
            var timeoutTask = Task.Delay(milliseconds, cts.Token);
            var completedTask = await Task.WhenAny(task, timeoutTask);

            if (completedTask == timeoutTask) {
                cts.Cancel();
                throw new TimeoutException();
            }

            await task; // Re-throw any exceptions from the original task
        }
    }

    public static async Task<T> TimeoutAfter<T>(this Task<T> task, int milliseconds) {
        using (var cts = new CancellationTokenSource()) {
            var timeoutTask = Task.Delay(milliseconds, cts.Token);
            var completedTask = await Task.WhenAny(task, timeoutTask);

            if (completedTask == timeoutTask) {
                cts.Cancel();
                throw new TimeoutException();
            }

            return await task; // Re-throw any exceptions from the original task
        }
    }

    public static async Task<T[]> WhenAll<T>(this IEnumerable<Task<T>> tasks) {
        return await Task.WhenAll(tasks);
    }

    public static async Task WhenAll(this IEnumerable<Task> tasks) {
        await Task.WhenAll(tasks);
    }
}

// Comprehensive Async Example
public class AsyncDataProcessor {
    private readonly HttpClientBestPractices _httpClient = new HttpClientBestPractices();
    private readonly SemaphoreSlim _processingSemaphore = new SemaphoreSlim(5);

    public async Task ProcessMultipleRequestsAsync() {
        var urls = new[] {
            "https://jsonplaceholder.typicode.com/posts/1",
            "https://jsonplaceholder.typicode.com/posts/2",
            "https://jsonplaceholder.typicode.com/posts/3",
            "https://jsonplaceholder.typicode.com/posts/4",
            "https://jsonplaceholder.typicode.com/posts/5"
        };

        var processingTasks = urls.Select(async url => {
            await _processingSemaphore.WaitAsync();
            try {
                using (var cts = new CancellationTokenSource(5000)) { // 5 second timeout
                    var response = await _httpClient._httpClient.GetAsync(url, cts.Token);
                    response.EnsureSuccessStatusCode();

                    var content = await response.Content.ReadAsStringAsync();
                    Console.WriteLine("Processed " + url + " - Length: " + content.Length);
                }
            } catch (Exception ex) {
                Console.WriteLine("Error processing " + url + ": " + ex.Message);
            } finally {
                _processingSemaphore.Release();
            }
        });

        await Task.WhenAll(processingTasks);
    }
}

// Demonstration
public void DemonstrateAsyncProgramming() {
    var asyncBasics = new AsyncBasics();
    asyncBasics.DemonstrateAsyncAwait().Wait();
    asyncBasics.DemonstrateExceptionHandling().Wait();

    var tpl = new TaskParallelLibrary();
    tpl.DemonstrateTPL().Wait();

    var cancellation = new CancellationAndTimeouts();
    cancellation.DemonstrateCancellation().Wait();
    cancellation.DemonstrateTimeout().Wait();

    var syncPrimitives = new SynchronizationPrimitives();
    syncPrimitives.DemonstrateSemaphore().Wait();
    syncPrimitives.DemonstrateReaderWriterLock();
    syncPrimitives.DemonstrateInterlocked();

    var asyncStreams = new AsyncStreams();
    asyncStreams.DemonstrateAsyncStreams().Wait();

    var factory = new AsyncFactoryPattern();
    factory.RegisterService<DatabaseService>("database");
    factory.RegisterService<EmailService>("email");

    var service = factory.CreateServiceAsync("database").Result;
    service.ExecuteAsync().Wait();

    var valueTaskExample = new ValueTaskExample();
    valueTaskExample.DemonstrateValueTask().Wait();

    var httpClientDemo = new HttpClientBestPractices();
    httpClientDemo.DemonstrateHttpClientUsage().Wait();

    var dataProcessor = new AsyncDataProcessor();
    dataProcessor.ProcessMultipleRequestsAsync().Wait();
}`,
  keyPoints: [
    'async/await provides readable asynchronous code',
    'Task represents asynchronous operations',
    'Use ConfigureAwait(false) for library code',
    'CancellationToken enables cooperative cancellation',
    'SemaphoreSlim controls concurrent access',
    'ValueTask optimizes for high-performance scenarios',
    'Async streams provide memory-efficient data processing',
    'Always handle exceptions in async methods',
    'Use Task.WhenAll for concurrent operations',
    'Avoid async void except for event handlers',
  ],
  exercise:
    'Build an asynchronous web scraper that processes multiple URLs concurrently with proper error handling, timeouts, and rate limiting. Implement a producer-consumer pattern using async queues and semaphores. Create an async retry mechanism with exponential backoff and circuit breaker pattern. Develop an async file processor that handles large files using streams and reports progress.',
};
