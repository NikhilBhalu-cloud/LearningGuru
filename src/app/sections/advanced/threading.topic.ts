import { Topic } from '../../models/section';

export const threadingTopic: Topic = {
  id: 'advanced-threading',
  name: 'Threading',
  sectionId: 'advanced',
  slug: 'threading',
  explanation: `
    <h3>Advanced Threading in C#</h3>
    <p>Threading enables concurrent execution of code, improving application responsiveness and performance. C# provides comprehensive threading support through the Task Parallel Library (TPL), async/await, and synchronization primitives.</p>

    <h4>Threading Fundamentals</h4>
    <ul>
      <li><strong>Processes vs Threads:</strong> Isolation vs shared memory</li>
      <li><strong>Thread Pool:</strong> Managed thread reuse</li>
      <li><strong>Task-based Programming:</strong> Higher-level concurrency abstraction</li>
      <li><strong>Async/Await:</strong> Simplified asynchronous programming</li>
    </ul>

    <h4>Synchronization Primitives</h4>
    <ul>
      <li><strong>lock:</strong> Simple mutual exclusion</li>
      <li><strong>Monitor:</strong> Advanced locking with wait/notify</li>
      <li><strong>Mutex:</strong> Cross-process synchronization</li>
      <li><strong>Semaphore:</strong> Resource count limiting</li>
      <li><strong>ReaderWriterLock:</strong> Multiple readers, single writer</li>
    </ul>

    <h4>Advanced Patterns</h4>
    <ul>
      <li><strong>Producer-Consumer:</strong> Decoupled data processing</li>
      <li><strong>Thread-Safe Collections:</strong> Concurrent data structures</li>
      <li><strong>Parallel LINQ:</strong> Data parallelism</li>
      <li><strong>Task Coordination:</strong> WhenAll, WhenAny, ContinueWith</li>
    </ul>

    <h4>Common Pitfalls</h4>
    <ul>
      <li><strong>Race Conditions:</strong> Unpredictable concurrent access</li>
      <li><strong>Deadlocks:</strong> Circular waiting for resources</li>
      <li><strong>Thread Starvation:</strong> Threads unable to progress</li>
      <li><strong>Context Switching:</strong> Performance overhead</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

// Threading Fundamentals
public class ThreadingBasics {
    public void DemonstrateThreadCreation() {
        Console.WriteLine("=== Thread Creation ===");

        // Create and start a thread
        var thread = new Thread(WorkerMethod);
        thread.Name = "Worker Thread";
        thread.Start("Hello from thread");

        // Create background thread
        var backgroundThread = new Thread(() => {
            Console.WriteLine("Background thread working...");
            Thread.Sleep(1000);
            Console.WriteLine("Background thread finished");
        });
        backgroundThread.IsBackground = true;
        backgroundThread.Start();

        // Wait for thread to complete
        thread.Join();
        Console.WriteLine("Main thread continues");
    }

    private void WorkerMethod(object parameter) {
        Console.WriteLine($"Worker thread: {parameter}");
        Console.WriteLine($"Thread ID: {Thread.CurrentThread.ManagedThreadId}");
        Console.WriteLine($"Thread Name: {Thread.CurrentThread.Name}");
    }

    public void DemonstrateThreadPool() {
        Console.WriteLine("\\n=== Thread Pool ===");

        for (int i = 0; i < 10; i++) {
            int taskId = i;
            ThreadPool.QueueUserWorkItem(state => {
                Console.WriteLine($"Thread pool task {taskId} on thread {Thread.CurrentThread.ManagedThreadId}");
                Thread.Sleep(100);
            });
        }

        Thread.Sleep(2000); // Wait for all tasks to complete
    }
}

// Task-based Asynchronous Programming
public class TaskProgramming {
    public async Task DemonstrateTasks() {
        Console.WriteLine("=== Task-based Programming ===");

        // Create and start a task
        var task1 = Task.Run(() => {
            Console.WriteLine("Task 1 executing");
            Thread.Sleep(1000);
            return 42;
        });

        // Create another task
        var task2 = Task.Run(() => {
            Console.WriteLine("Task 2 executing");
            Thread.Sleep(500);
            return "Hello World";
        });

        // Wait for both tasks
        await Task.WhenAll(task1, task2);

        Console.WriteLine($"Task 1 result: {task1.Result}");
        Console.WriteLine($"Task 2 result: {task2.Result}");
    }

    public async Task DemonstrateTaskCoordination() {
        Console.WriteLine("\\n=== Task Coordination ===");

        var tasks = new List<Task<int>>();

        for (int i = 0; i < 5; i++) {
            int taskId = i;
            var task = Task.Run(() => {
                Console.WriteLine($"Task {taskId} starting");
                Thread.Sleep(new Random().Next(100, 1000));
                Console.WriteLine($"Task {taskId} completed");
                return taskId * 10;
            });
            tasks.Add(task);
        }

        // Wait for any task to complete
        var completedTask = await Task.WhenAny(tasks);
        Console.WriteLine($"First completed task result: {completedTask.Result}");

        // Wait for all tasks
        var results = await Task.WhenAll(tasks);
        Console.WriteLine($"All results: {string.Join(", ", results)}");
    }

    public async Task DemonstrateCancellation() {
        Console.WriteLine("\\n=== Task Cancellation ===");

        using (var cts = new CancellationTokenSource()) {
            // Cancel after 2 seconds
            cts.CancelAfter(2000);

            try {
                await LongRunningTaskAsync(cts.Token);
            } catch (OperationCanceledException) {
                Console.WriteLine("Task was cancelled");
            }
        }
    }

    private async Task LongRunningTaskAsync(CancellationToken cancellationToken) {
        for (int i = 0; i < 10; i++) {
            cancellationToken.ThrowIfCancellationRequested();
            Console.WriteLine($"Step {i + 1}/10");
            await Task.Delay(500, cancellationToken);
        }
    }
}

// Synchronization Primitives
public class SynchronizationDemo {
    private readonly object _lock = new object();
    private int _counter = 0;

    public void DemonstrateLock() {
        Console.WriteLine("=== Lock Statement ===");

        var tasks = new List<Task>();

        for (int i = 0; i < 10; i++) {
            tasks.Add(Task.Run(() => IncrementCounter()));
        }

        Task.WaitAll(tasks.ToArray());
        Console.WriteLine($"Final counter value: {_counter}");
    }

    private void IncrementCounter() {
        for (int i = 0; i < 1000; i++) {
            lock (_lock) {
                _counter++;
            }
        }
    }

    public void DemonstrateMonitor() {
        Console.WriteLine("\\n=== Monitor Class ===");

        var queue = new Queue<int>();
        var producer = Task.Run(() => {
            for (int i = 0; i < 10; i++) {
                lock (queue) {
                    queue.Enqueue(i);
                    Monitor.Pulse(queue); // Signal waiting thread
                }
                Thread.Sleep(100);
            }
        });

        var consumer = Task.Run(() => {
            for (int i = 0; i < 10; i++) {
                lock (queue) {
                    while (queue.Count == 0) {
                        Monitor.Wait(queue); // Wait for signal
                    }
                    var item = queue.Dequeue();
                    Console.WriteLine($"Consumed: {item}");
                }
            }
        });

        Task.WaitAll(producer, consumer);
    }

    public void DemonstrateSemaphore() {
        Console.WriteLine("\\n=== Semaphore ===");

        var semaphore = new SemaphoreSlim(3); // Allow 3 concurrent operations
        var tasks = new List<Task>();

        for (int i = 0; i < 10; i++) {
            int taskId = i;
            tasks.Add(Task.Run(async () => {
                Console.WriteLine($"Task {taskId} waiting for semaphore");
                await semaphore.WaitAsync();

                try {
                    Console.WriteLine($"Task {taskId} acquired semaphore");
                    await Task.Delay(1000);
                    Console.WriteLine($"Task {taskId} releasing semaphore");
                } finally {
                    semaphore.Release();
                }
            }));
        }

        Task.WaitAll(tasks.ToArray());
    }
}

// ReaderWriterLock for concurrent read access
public class ReaderWriterLockDemo {
    private readonly ReaderWriterLockSlim _rwLock = new ReaderWriterLockSlim();
    private readonly Dictionary<string, string> _data = new Dictionary<string, string>();

    public void DemonstrateReaderWriterLock() {
        Console.WriteLine("=== ReaderWriterLock ===");

        var tasks = new List<Task>();

        // Multiple readers
        for (int i = 0; i < 5; i++) {
            int readerId = i;
            tasks.Add(Task.Run(() => ReadData(readerId)));
        }

        // Single writer
        tasks.Add(Task.Run(() => WriteData()));

        Task.WaitAll(tasks.ToArray());
    }

    private void ReadData(int readerId) {
        _rwLock.EnterReadLock();
        try {
            Console.WriteLine($"Reader {readerId} reading {string.Join(", ", _data)}");
            Thread.Sleep(100);
        } finally {
            _rwLock.ExitReadLock();
        }
    }

    private void WriteData() {
        for (int i = 0; i < 5; i++) {
            _rwLock.EnterWriteLock();
            try {
                _data["key" + i] = "value" + i;
                Console.WriteLine($"Writer added key{i}");
                Thread.Sleep(200);
            } finally {
                _rwLock.ExitWriteLock();
            }
        }
    }
}

// Producer-Consumer Pattern
public class ProducerConsumer<T> {
    private readonly BlockingCollection<T> _queue = new BlockingCollection<T>();
    private readonly CancellationTokenSource _cts = new CancellationTokenSource();

    public void Start(int producerCount, int consumerCount) {
        Console.WriteLine("=== Producer-Consumer Pattern ===");

        var producers = new List<Task>();
        var consumers = new List<Task>();

        // Start producers
        for (int i = 0; i < producerCount; i++) {
            int producerId = i;
            producers.Add(Task.Run(() => Produce(producerId)));
        }

        // Start consumers
        for (int i = 0; i < consumerCount; i++) {
            int consumerId = i;
            consumers.Add(Task.Run(() => Consume(consumerId)));
        }

        // Let them run for a bit
        Thread.Sleep(3000);

        // Stop producers
        _cts.Cancel();

        // Wait for producers to finish
        Task.WaitAll(producers.ToArray());

        // Complete adding to queue
        _queue.CompleteAdding();

        // Wait for consumers to finish
        Task.WaitAll(consumers.ToArray());

        Console.WriteLine("Producer-consumer completed");
    }

    private void Produce(int producerId) {
        try {
            for (int i = 0; ; i++) {
                _cts.Token.ThrowIfCancellationRequested();
                var item = $"Item_{producerId}_{i}";
                _queue.Add(item);
                Console.WriteLine($"Produced: {item}");
                Thread.Sleep(200);
            }
        } catch (OperationCanceledException) {
            Console.WriteLine($"Producer {producerId} cancelled");
        }
    }

    private void Consume(int consumerId) {
        try {
            foreach (var item in _queue.GetConsumingEnumerable()) {
                Console.WriteLine($"Consumed by {consumerId}: {item}");
                Thread.Sleep(300);
            }
        } catch (Exception ex) {
            Console.WriteLine($"Consumer {consumerId} error: {ex.Message}");
        }
    }
}

// Thread-Safe Collections
public class ThreadSafeCollections {
    public void DemonstrateConcurrentCollections() {
        Console.WriteLine("=== Thread-Safe Collections ===");

        var concurrentDictionary = new ConcurrentDictionary<string, int>();
        var concurrentQueue = new ConcurrentQueue<string>();
        var concurrentBag = new ConcurrentBag<int>();

        // ConcurrentDictionary
        var dictTasks = new List<Task>();
        for (int i = 0; i < 10; i++) {
            int taskId = i;
            dictTasks.Add(Task.Run(() => {
                concurrentDictionary.AddOrUpdate("key", 1, (k, v) => v + 1);
                Console.WriteLine($"Dict task {taskId} completed");
            }));
        }

        // ConcurrentQueue
        var queueTasks = new List<Task>();
        for (int i = 0; i < 5; i++) {
            int producerId = i;
            queueTasks.Add(Task.Run(() => {
                for (int j = 0; j < 10; j++) {
                    concurrentQueue.Enqueue($"Item_{producerId}_{j}");
                }
            }));
        }

        for (int i = 0; i < 5; i++) {
            int consumerId = i;
            queueTasks.Add(Task.Run(() => {
                for (int j = 0; j < 10; j++) {
                    if (concurrentQueue.TryDequeue(out var item)) {
                        // Process item
                    }
                }
            }));
        }

        Task.WaitAll(dictTasks.Concat(queueTasks).ToArray());

        Console.WriteLine($"Final dictionary value: {concurrentDictionary["key"]}");
        Console.WriteLine($"Queue size: {concurrentQueue.Count}");
    }
}

// Parallel LINQ
public class ParallelLinqDemo {
    public void DemonstratePLINQ() {
        Console.WriteLine("=== Parallel LINQ ===");

        var numbers = Enumerable.Range(1, 1000000);

        // Sequential
        var stopwatch = Stopwatch.StartNew();
        var sequentialPrimes = numbers.Where(IsPrime).Take(100).ToList();
        stopwatch.Stop();
        var sequentialTime = stopwatch.ElapsedMilliseconds;

        // Parallel
        stopwatch.Restart();
        var parallelPrimes = numbers.AsParallel()
                                   .Where(IsPrime)
                                   .Take(100)
                                   .ToList();
        stopwatch.Stop();
        var parallelTime = stopwatch.ElapsedMilliseconds;

        Console.WriteLine($"Sequential time: {sequentialTime}ms");
        Console.WriteLine($"Parallel time: {parallelTime}ms");
        Console.WriteLine($"Speedup: {(double)sequentialTime / parallelTime:F2}x");

        // PLINQ with ordering
        var orderedPrimes = numbers.AsParallel()
                                  .AsOrdered()
                                  .Where(IsPrime)
                                  .Take(10)
                                  .ToList();

        Console.WriteLine($"First 10 primes: {string.Join(", ", orderedPrimes)}");
    }

    private bool IsPrime(int number) {
        if (number <= 1) return false;
        if (number == 2) return true;
        if (number % 2 == 0) return false;

        for (int i = 3; i <= Math.Sqrt(number); i += 2) {
            if (number % i == 0) return false;
        }
        return true;
    }

    public void DemonstratePLINQOptions() {
        Console.WriteLine("\\n=== PLINQ Options ===");

        var data = Enumerable.Range(1, 1000);

        // Force parallel execution
        var forcedParallel = data.AsParallel()
                                .WithExecutionMode(ParallelExecutionMode.ForceParallelism)
                                .Where(n => n % 2 == 0)
                                .ToList();

        // Limit parallelism
        var limitedParallel = data.AsParallel()
                                 .WithDegreeOfParallelism(2)
                                 .Select(n => n * n)
                                 .ToList();

        // Merge options
        var mergedResults = data.AsParallel()
                               .WithMergeOptions(ParallelMergeOptions.FullyBuffered)
                               .Where(n => n > 500)
                               .ToList();

        Console.WriteLine($"Forced parallel results count: {forcedParallel.Count}");
        Console.WriteLine($"Limited parallel results count: {limitedParallel.Count}");
        Console.WriteLine($"Merged results count: {mergedResults.Count}");
    }
}

// Avoiding Common Pitfalls
public class ThreadingPitfalls {
    public void DemonstrateRaceCondition() {
        Console.WriteLine("=== Race Condition ===");

        int counter = 0;
        var tasks = new List<Task>();

        for (int i = 0; i < 10; i++) {
            tasks.Add(Task.Run(() => {
                for (int j = 0; j < 1000; j++) {
                    counter++; // Race condition!
                }
            }));
        }

        Task.WaitAll(tasks.ToArray());
        Console.WriteLine($"Counter value (should be 10000): {counter}");
    }

    public void DemonstrateDeadlock() {
        Console.WriteLine("\\n=== Deadlock Demonstration ===");

        object lock1 = new object();
        object lock2 = new object();

        var task1 = Task.Run(() => {
            lock (lock1) {
                Console.WriteLine("Task 1 acquired lock1");
                Thread.Sleep(100);
                lock (lock2) {
                    Console.WriteLine("Task 1 acquired lock2");
                }
            }
        });

        var task2 = Task.Run(() => {
            lock (lock2) {
                Console.WriteLine("Task 2 acquired lock2");
                Thread.Sleep(100);
                lock (lock1) {
                    Console.WriteLine("Task 2 acquired lock1");
                }
            }
        });

        // This might deadlock - don't wait indefinitely in real code
        var completed = Task.WaitAll(new[] { task1, task2 }, 5000);
        if (!completed) {
            Console.WriteLine("Deadlock detected!");
        }
    }

    public void DemonstrateProperLocking() {
        Console.WriteLine("\\n=== Proper Synchronization ===");

        int counter = 0;
        var tasks = new List<Task>();

        for (int i = 0; i < 10; i++) {
            tasks.Add(Task.Run(() => {
                for (int j = 0; j < 1000; j++) {
                    Interlocked.Increment(ref counter);
                }
            }));
        }

        Task.WaitAll(tasks.ToArray());
        Console.WriteLine($"Counter value with Interlocked: {counter}");
    }
}

// Async Coordination
public class AsyncCoordination {
    public async Task DemonstrateAsyncCoordination() {
        Console.WriteLine("=== Async Coordination ===");

        var task1 = SlowOperationAsync("Task 1", 1000);
        var task2 = SlowOperationAsync("Task 2", 1500);
        var task3 = SlowOperationAsync("Task 3", 800);

        // Continue with when any completes
        var anyTask = await Task.WhenAny(task1, task2, task3);
        Console.WriteLine($"First completed: {anyTask.Result}");

        // Continue with when all complete
        var results = await Task.WhenAll(task1, task2, task3);
        Console.WriteLine($"All completed: {string.Join(", ", results)}");

        // Continue with pattern
        var continuation = task1.ContinueWith(t => {
            Console.WriteLine($"Continuation: {t.Result} completed, starting follow-up work");
            return t.Result.ToUpper();
        });

        var finalResult = await continuation;
        Console.WriteLine($"Final result: {finalResult}");
    }

    private async Task<string> SlowOperationAsync(string name, int delayMs) {
        await Task.Delay(delayMs);
        return $"{name} completed in {delayMs}ms";
    }
}

// Demonstration
public void DemonstrateThreading() {
    var threadingBasics = new ThreadingBasics();
    threadingBasics.DemonstrateThreadCreation();
    threadingBasics.DemonstrateThreadPool();

    var taskProgramming = new TaskProgramming();
    taskProgramming.DemonstrateTasks().Wait();
    taskProgramming.DemonstrateTaskCoordination().Wait();
    taskProgramming.DemonstrateCancellation().Wait();

    var synchronization = new SynchronizationDemo();
    synchronization.DemonstrateLock();
    synchronization.DemonstrateMonitor();
    synchronization.DemonstrateSemaphore();

    var rwLock = new ReaderWriterLockDemo();
    rwLock.DemonstrateReaderWriterLock();

    var producerConsumer = new ProducerConsumer<string>();
    producerConsumer.Start(3, 2);

    var threadSafeCollections = new ThreadSafeCollections();
    threadSafeCollections.DemonstrateConcurrentCollections();

    var plinq = new ParallelLinqDemo();
    plinq.DemonstratePLINQ();
    plinq.DemonstratePLINQOptions();

    var pitfalls = new ThreadingPitfalls();
    pitfalls.DemonstrateRaceCondition();
    pitfalls.DemonstrateDeadlock();
    pitfalls.DemonstrateProperLocking();

    var asyncCoordination = new AsyncCoordination();
    asyncCoordination.DemonstrateAsyncCoordination().Wait();
}`,
  keyPoints: [
    'Use Task-based programming instead of raw threads for better performance',
    'Async/await simplifies asynchronous programming',
    'Choose appropriate synchronization primitives for different scenarios',
    'Avoid race conditions with proper synchronization',
    'Be aware of deadlock potential when acquiring multiple locks',
    'Use concurrent collections for thread-safe data structures',
    'PLINQ provides easy data parallelism',
    'Cancellation tokens enable cooperative cancellation',
    'Monitor thread pool usage to avoid thread starvation',
    'Profile and measure performance when using concurrency',
  ],
  exercise:
    'Implement a thread-safe producer-consumer queue with multiple producers and consumers. Create a parallel merge sort algorithm using the Task Parallel Library. Build a thread pool that dynamically adjusts its size based on workload. Develop a concurrent web crawler that respects rate limits and handles timeouts. Design a deadlock detection mechanism for your application.',
};
