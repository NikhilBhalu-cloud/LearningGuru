import { Topic } from '../../models/section';

export const advancedLinqTopic: Topic = {
  id: 'advanced-linq',
  name: 'Advanced LINQ',
  sectionId: 'advanced',
  slug: 'advanced-linq',
  explanation: `
    <h3>Advanced LINQ Concepts and Techniques</h3>
    <p>Language Integrated Query (LINQ) provides powerful query capabilities in C#. Beyond basic operations, advanced LINQ features enable complex data transformations, custom operators, query optimization, and integration with various data sources.</p>

    <h4>LINQ Architecture</h4>
    <ul>
      <li><strong>LINQ to Objects:</strong> Query in-memory collections</li>
      <li><strong>LINQ to SQL:</strong> Query relational databases</li>
      <li><strong>LINQ to XML:</strong> Query XML documents</li>
      <li><strong>LINQ to Entities:</strong> Query Entity Framework</li>
      <li><strong>Parallel LINQ (PLINQ):</strong> Parallel query execution</li>
    </ul>

    <h4>Deferred vs Immediate Execution</h4>
    <ul>
      <li><strong>Deferred Execution:</strong> Query executed when enumerated (Where, Select, etc.)</li>
      <li><strong>Immediate Execution:</strong> Query executed immediately (Count, ToList, etc.)</li>
      <li><strong>Streaming vs Buffering:</strong> How results are processed</li>
    </ul>

    <h4>Custom LINQ Operators</h4>
    <ul>
      <li><strong>Extension Methods:</strong> Add custom query operators</li>
      <li><strong>Query Expression Syntax:</strong> SQL-like syntax support</li>
      <li><strong>Composition:</strong> Chain multiple operations</li>
      <li><strong>Lazy Evaluation:</strong> Defer execution until needed</li>
    </ul>

    <h4>Performance Considerations</h4>
    <ul>
      <li><strong>Query Optimization:</strong> Minimize iterations and memory usage</li>
      <li><strong>PLINQ:</strong> Parallel execution for CPU-bound operations</li>
      <li><strong>Caching:</strong> Store frequently used query results</li>
      <li><strong>Indexing:</strong> Use appropriate data structures</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Xml.Linq;

// Basic LINQ Review and Advanced Concepts
public class LinqFundamentals {
    public void DemonstrateExecutionModels() {
        var numbers = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        Console.WriteLine("=== Deferred vs Immediate Execution ===");

        // Deferred execution - query defined but not executed
        var evenNumbersQuery = numbers.Where(n => {
            Console.WriteLine("Evaluating " + n);
            return n % 2 == 0;
        });

        Console.WriteLine("Query defined, but not executed yet");

        // Immediate execution - forces evaluation
        var evenNumbersList = evenNumbersQuery.ToList();
        Console.WriteLine("Query executed, results: " + string.Join(", ", evenNumbersList));

        // Second enumeration - query executed again
        Console.WriteLine("Second enumeration:");
        foreach (var num in evenNumbersQuery) {
            Console.WriteLine("Processing " + num);
        }
    }

    public void DemonstrateStreamingVsBuffering() {
        var numbers = GenerateNumbers(5);

        Console.WriteLine("\\n=== Streaming (Deferred) ===");
        var streamingQuery = numbers.Where(n => n > 3);
        foreach (var num in streamingQuery) {
            Console.WriteLine("Streaming: " + num);
            if (num > 6) break; // Can stop early
        }

        Console.WriteLine("\\n=== Buffering (Immediate) ===");
        var bufferedQuery = numbers.Where(n => n > 3).ToList();
        Console.WriteLine("All results buffered: " + string.Join(", ", bufferedQuery));
    }

    private IEnumerable<int> GenerateNumbers(int count) {
        for (int i = 1; i <= count; i++) {
            Console.WriteLine("Generating " + i);
            yield return i;
        }
    }
}

// Custom LINQ Operators
public static class CustomLinqOperators {
    // Custom Where implementation
    public static IEnumerable<T> WhereCustom<T>(this IEnumerable<T> source, Func<T, bool> predicate) {
        foreach (var item in source) {
            if (predicate(item)) {
                yield return item;
            }
        }
    }

    // Batch operator - groups items into batches
    public static IEnumerable<IEnumerable<T>> Batch<T>(this IEnumerable<T> source, int batchSize) {
        var batch = new List<T>();
        foreach (var item in source) {
            batch.Add(item);
            if (batch.Count == batchSize) {
                yield return batch;
                batch = new List<T>();
            }
        }
        if (batch.Any()) {
            yield return batch;
        }
    }

    // DistinctBy - distinct by a key selector
    public static IEnumerable<T> DistinctBy<T, TKey>(this IEnumerable<T> source, Func<T, TKey> keySelector) {
        var seenKeys = new HashSet<TKey>();
        foreach (var item in source) {
            var key = keySelector(item);
            if (seenKeys.Add(key)) {
                yield return item;
            }
        }
    }

    // Interleave - interleave multiple sequences
    public static IEnumerable<T> Interleave<T>(this IEnumerable<IEnumerable<T>> sources) {
        var enumerators = sources.Select(s => s.GetEnumerator()).ToList();
        try {
            while (enumerators.Any()) {
                for (int i = enumerators.Count - 1; i >= 0; i--) {
                    if (enumerators[i].MoveNext()) {
                        yield return enumerators[i].Current;
                    } else {
                        enumerators[i].Dispose();
                        enumerators.RemoveAt(i);
                    }
                }
            }
        } finally {
            foreach (var enumerator in enumerators) {
                enumerator.Dispose();
            }
        }
    }

    // Windowed - sliding window over a sequence
    public static IEnumerable<IEnumerable<T>> Windowed<T>(this IEnumerable<T> source, int size) {
        var window = new Queue<T>();
        foreach (var item in source) {
            window.Enqueue(item);
            if (window.Count > size) {
                window.Dequeue();
            }
            if (window.Count == size) {
                yield return window.ToArray();
            }
        }
    }

    // Aggregate with seed and result selector
    public static TResult Aggregate<TSource, TAccumulate, TResult>(
        this IEnumerable<TSource> source,
        TAccumulate seed,
        Func<TAccumulate, TSource, TAccumulate> accumulator,
        Func<TAccumulate, TResult> resultSelector) {
        var result = seed;
        foreach (var item in source) {
            result = accumulator(result, item);
        }
        return resultSelector(result);
    }
}

// Expression Trees and Dynamic Queries
public class DynamicQueries {
    public void DemonstrateExpressionTrees() {
        Console.WriteLine("=== Expression Trees ===");

        // Build expression tree dynamically
        var parameter = System.Linq.Expressions.Expression.Parameter(typeof(int), "x");
        var constant = System.Linq.Expressions.Expression.Constant(5);
        var comparison = System.Linq.Expressions.Expression.GreaterThan(parameter, constant);
        var lambda = System.Linq.Expressions.Expression.Lambda<Func<int, bool>>(comparison, parameter);

        var compiledLambda = lambda.Compile();

        var numbers = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };
        var results = numbers.Where(compiledLambda);
        Console.WriteLine("Numbers > 5: " + string.Join(", ", results));
    }

    public void DemonstrateDynamicGrouping() {
        var products = new[] {
            new { Category = "Electronics", Name = "Laptop", Price = 999 },
            new { Category = "Electronics", Name = "Mouse", Price = 25 },
            new { Category = "Books", Name = "C# Guide", Price = 45 },
            new { Category = "Books", Name = "LINQ Book", Price = 35 },
            new { Category = "Electronics", Name = "Keyboard", Price = 75 }
        };

        Console.WriteLine("\\n=== Dynamic Grouping ===");

        // Group by category and calculate statistics
        var categoryStats = products
            .GroupBy(p => p.Category)
            .Select(g => new {
                Category = g.Key,
                Count = g.Count(),
                TotalPrice = g.Sum(p => p.Price),
                AveragePrice = g.Average(p => p.Price),
                MinPrice = g.Min(p => p.Price),
                MaxPrice = g.Max(p => p.Price)
            });

        foreach (var stat in categoryStats) {
            Console.WriteLine(stat.Category + ": " + stat.Count + " items, Total: $" + stat.TotalPrice +
                           ", Avg: $" + stat.AveragePrice);
        }
    }
}

// Parallel LINQ (PLINQ)
public class ParallelLinqDemo {
    public void DemonstratePLINQ() {
        var numbers = Enumerable.Range(1, 1000000);

        Console.WriteLine("=== Parallel LINQ ===");

        // Sequential processing
        var stopwatch = Stopwatch.StartNew();
        var sequentialResult = numbers.Where(n => n % 2 == 0).Take(100).ToList();
        stopwatch.Stop();
        Console.WriteLine("Sequential time: " + stopwatch.ElapsedMilliseconds + "ms");

        // Parallel processing
        stopwatch.Restart();
        var parallelResult = numbers.AsParallel()
                                   .Where(n => n % 2 == 0)
                                   .Take(100)
                                   .ToList();
        stopwatch.Stop();
        Console.WriteLine("Parallel time: " + stopwatch.ElapsedMilliseconds + "ms");

        // Parallel with ordering preserved
        var orderedParallel = numbers.AsParallel()
                                    .AsOrdered()
                                    .Where(n => IsPrime(n))
                                    .Take(10)
                                    .ToList();

        Console.WriteLine("First 10 primes: " + string.Join(", ", orderedParallel));
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
        var data = Enumerable.Range(1, 100);

        Console.WriteLine("\\n=== PLINQ Options ===");

        // Force parallel execution
        var forcedParallel = data.AsParallel()
                                .WithExecutionMode(ParallelExecutionMode.ForceParallelism)
                                .Where(n => n > 50)
                                .ToList();

        // Limit degree of parallelism
        var limitedParallel = data.AsParallel()
                                 .WithDegreeOfParallelism(2)
                                 .Select(n => n * n)
                                 .ToList();

        // Merge options
        var mergedResults = data.AsParallel()
                               .WithMergeOptions(ParallelMergeOptions.FullyBuffered)
                               .Where(n => n % 10 == 0)
                               .ToList();

        Console.WriteLine("Limited parallel results: " + string.Join(", ", limitedParallel.Take(5)));
    }
}

// LINQ to XML
public class LinqToXmlDemo {
    public void DemonstrateLinqToXml() {
        Console.WriteLine("=== LINQ to XML ===");

        // Create XML
        var booksXml = new XElement("Books",
            new XElement("Book",
                new XAttribute("Id", "1"),
                new XElement("Title", "C# Programming"),
                new XElement("Author", "John Doe"),
                new XElement("Price", "29.99")
            ),
            new XElement("Book",
                new XAttribute("Id", "2"),
                new XElement("Title", "LINQ Guide"),
                new XElement("Author", "Jane Smith"),
                new XElement("Price", "39.99")
            ),
            new XElement("Book",
                new XAttribute("Id", "3"),
                new XElement("Title", "Advanced C#"),
                new XElement("Author", "Bob Johnson"),
                new XElement("Price", "49.99")
            )
        );

        // Query XML with LINQ
        var expensiveBooks = from book in booksXml.Elements("Book")
                           let price = decimal.Parse(book.Element("Price").Value)
                           where price > 35
                           select new {
                               Title = book.Element("Title").Value,
                               Author = book.Element("Author").Value,
                               Price = price
                           };

        Console.WriteLine("Expensive books:");
        foreach (var book in expensiveBooks) {
            Console.WriteLine(book.Title + " by " + book.Author + " - $" + book.Price);
        }

        // Transform XML
        var bookSummaries = booksXml.Elements("Book")
                                   .Select(book => new XElement("Summary",
                                       new XAttribute("Id", book.Attribute("Id").Value),
                                       book.Element("Title").Value + " - " + book.Element("Author").Value
                                   ));

        Console.WriteLine("\\nBook summaries:");
        foreach (var summary in bookSummaries) {
            Console.WriteLine(summary.Attribute("Id").Value + ": " + summary.Value);
        }
    }
}

// LINQ Query Optimization
public class LinqOptimization {
    public void DemonstrateOptimization() {
        var data = GenerateLargeDataset(100000);

        Console.WriteLine("=== LINQ Optimization ===");

        // Inefficient: Multiple enumerations
        var stopwatch = Stopwatch.StartNew();
        var result1 = data.Where(x => x > 50000)
                         .Select(x => x * 2)
                         .Where(x => x < 150000)
                         .ToList();
        stopwatch.Stop();
        Console.WriteLine("Multiple enumerations time: " + stopwatch.ElapsedMilliseconds + "ms");

        // Optimized: Single enumeration with combined conditions
        stopwatch.Restart();
        var result2 = data.Where(x => x > 50000 && x * 2 < 150000)
                         .Select(x => x * 2)
                         .ToList();
        stopwatch.Stop();
        Console.WriteLine("Optimized time: " + stopwatch.ElapsedMilliseconds + "ms");

        // Use appropriate data structures
        var hashSet = new HashSet<int>(data);
        var list = data.ToList();

        stopwatch.Restart();
        var containsInList = list.Contains(75000);
        stopwatch.Stop();
        Console.WriteLine("List.Contains time: " + stopwatch.ElapsedMilliseconds + "ms");

        stopwatch.Restart();
        var containsInHashSet = hashSet.Contains(75000);
        stopwatch.Stop();
        Console.WriteLine("HashSet.Contains time: " + stopwatch.ElapsedMilliseconds + "ms");
    }

    private IEnumerable<int> GenerateLargeDataset(int size) {
        var random = new Random();
        for (int i = 0; i < size; i++) {
            yield return random.Next(100000);
        }
    }
}

// Advanced Grouping and Aggregation
public class AdvancedGrouping {
    public void DemonstrateAdvancedGrouping() {
        var sales = new[] {
            new { Product = "Laptop", Category = "Electronics", Region = "North", Amount = 1200 },
            new { Product = "Mouse", Category = "Electronics", Region = "North", Amount = 50 },
            new { Product = "Book", Category = "Education", Region = "South", Amount = 30 },
            new { Product = "Laptop", Category = "Electronics", Region = "South", Amount = 1100 },
            new { Product = "Pen", Category = "Office", Region = "North", Amount = 10 },
            new { Product = "Book", Category = "Education", Region = "North", Amount = 25 }
        };

        Console.WriteLine("=== Advanced Grouping ===");

        // Multi-level grouping
        var salesByCategoryAndRegion = sales
            .GroupBy(s => new { s.Category, s.Region })
            .Select(g => new {
                Category = g.Key.Category,
                Region = g.Key.Region,
                TotalSales = g.Sum(s => s.Amount),
                ProductCount = g.Count(),
                AverageSale = g.Average(s => s.Amount)
            })
            .OrderByDescending(g => g.TotalSales);

        foreach (var group in salesByCategoryAndRegion) {
            Console.WriteLine(group.Category + " - " + group.Region +
                           ": $" + group.TotalSales + " (" + group.ProductCount + " products)");
        }

        // Pivot-like operation
        var pivotData = sales
            .GroupBy(s => s.Product)
            .Select(g => new {
                Product = g.Key,
                NorthSales = g.Where(s => s.Region == "North").Sum(s => s.Amount),
                SouthSales = g.Where(s => s.Region == "South").Sum(s => s.Amount),
                TotalSales = g.Sum(s => s.Amount)
            });

        Console.WriteLine("\\nProduct Sales by Region:");
        foreach (var item in pivotData) {
            Console.WriteLine(item.Product + " - North: $" + item.NorthSales +
                           ", South: $" + item.SouthSales + ", Total: $" + item.TotalSales);
        }
    }
}

// Custom LINQ Provider Concept
public class SimpleLinqProvider {
    public void DemonstrateCustomProvider() {
        Console.WriteLine("=== Custom LINQ Provider Concept ===");

        var data = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        // Custom query builder
        var query = new QueryBuilder<int>(data)
            .Where(x => x > 3)
            .Select(x => x * 10)
            .OrderByDescending(x => x);

        var results = query.Execute();
        Console.WriteLine("Custom query results: " + string.Join(", ", results));
    }
}

public class QueryBuilder<T> {
    private IEnumerable<T> _source;
    private List<Func<T, bool>> _whereClauses = new List<Func<T, bool>>();
    private Func<T, T> _selectClause;
    private Func<T, IComparable> _orderByClause;
    private bool _descending;

    public QueryBuilder(IEnumerable<T> source) {
        _source = source;
    }

    public QueryBuilder<T> Where(Func<T, bool> predicate) {
        _whereClauses.Add(predicate);
        return this;
    }

    public QueryBuilder<T> Select(Func<T, T> selector) {
        _selectClause = selector;
        return this;
    }

    public QueryBuilder<T> OrderBy(Func<T, IComparable> keySelector) {
        _orderByClause = keySelector;
        _descending = false;
        return this;
    }

    public QueryBuilder<T> OrderByDescending(Func<T, IComparable> keySelector) {
        _orderByClause = keySelector;
        _descending = true;
        return this;
    }

    public IEnumerable<T> Execute() {
        var result = _source;

        // Apply where clauses
        foreach (var whereClause in _whereClauses) {
            result = result.Where(whereClause);
        }

        // Apply select
        if (_selectClause != null) {
            result = result.Select(_selectClause);
        }

        // Apply ordering
        if (_orderByClause != null) {
            result = _descending
                ? result.OrderByDescending(_orderByClause)
                : result.OrderBy(_orderByClause);
        }

        return result;
    }
}

// Demonstration
public void DemonstrateAdvancedLinq() {
    var fundamentals = new LinqFundamentals();
    fundamentals.DemonstrateExecutionModels();
    fundamentals.DemonstrateStreamingVsBuffering();

    var numbers = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3 };

    Console.WriteLine("\\n=== Custom Operators ===");
    var batches = numbers.Batch(3);
    foreach (var batch in batches) {
        Console.WriteLine("Batch: " + string.Join(", ", batch));
    }

    var distinctByFirstDigit = numbers.DistinctBy(n => n);
    Console.WriteLine("Distinct: " + string.Join(", ", distinctByFirstDigit));

    var windows = numbers.Windowed(3);
    foreach (var window in windows) {
        Console.WriteLine("Window: " + string.Join(", ", window));
    }

    var interleaved = new[] {
        new[] { 1, 4, 7 },
        new[] { 2, 5, 8 },
        new[] { 3, 6, 9 }
    }.Interleave();

    Console.WriteLine("Interleaved: " + string.Join(", ", interleaved));

    var dynamicQueries = new DynamicQueries();
    dynamicQueries.DemonstrateExpressionTrees();
    dynamicQueries.DemonstrateDynamicGrouping();

    var plinq = new ParallelLinqDemo();
    plinq.DemonstratePLINQ();
    plinq.DemonstratePLINQOptions();

    var xmlDemo = new LinqToXmlDemo();
    xmlDemo.DemonstrateLinqToXml();

    var optimization = new LinqOptimization();
    optimization.DemonstrateOptimization();

    var advancedGrouping = new AdvancedGrouping();
    advancedGrouping.DemonstrateAdvancedGrouping();

    var customProvider = new SimpleLinqProvider();
    customProvider.DemonstrateCustomProvider();
}`,
  keyPoints: [
    'Deferred execution delays query evaluation until enumeration',
    'Immediate execution forces immediate evaluation with methods like ToList()',
    'Custom LINQ operators extend query capabilities',
    'PLINQ enables parallel query execution for performance',
    'Expression trees enable dynamic query construction',
    'LINQ to XML provides powerful XML querying and transformation',
    'Query optimization reduces memory usage and improves performance',
    'Choose appropriate data structures for optimal query performance',
    'Streaming operators are more memory-efficient than buffering operators',
    'Custom LINQ providers enable domain-specific query languages',
  ],
  exercise:
    'Create a custom LINQ provider for querying CSV files with support for filtering, sorting, and aggregation. Implement a reactive LINQ operator that processes data streams asynchronously. Build a LINQ-based rule engine that can evaluate complex business rules against collections of objects. Develop a parallel query optimizer that automatically chooses between sequential and parallel execution based on data size and available cores.',
};
