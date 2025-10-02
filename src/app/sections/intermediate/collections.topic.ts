import { Topic } from '../../models/section';

export const collectionsTopic: Topic = {
  id: 'intermediate-collections',
  name: 'Collections and Generics',
  sectionId: 'intermediate',
  slug: 'collections',
  explanation: `
    <h3>Collections in C#</h3>
    <p>Collections are classes that store groups of related objects. They provide more flexibility than arrays and include generic and non-generic versions.</p>

    <h4>Types of Collections</h4>
    <ul>
      <li><strong>Generic Collections:</strong> Type-safe, preferred for new code
        <ul>
          <li>List&lt;T&gt; - Dynamic array</li>
          <li>Dictionary&lt;TKey, TValue&gt; - Key-value pairs</li>
          <li>HashSet&lt;T&gt; - Unique elements, no duplicates</li>
          <li>Queue&lt;T&gt; - First-in, first-out (FIFO)</li>
          <li>Stack&lt;T&gt; - Last-in, first-out (LIFO)</li>
          <li>LinkedList&lt;T&gt; - Doubly linked list</li>
        </ul>
      </li>
      <li><strong>Non-Generic Collections:</strong> Legacy, less type-safe
        <ul>
          <li>ArrayList - Dynamic array of objects</li>
          <li>Hashtable - Key-value pairs of objects</li>
          <li>Queue - FIFO collection of objects</li>
          <li>Stack - LIFO collection of objects</li>
        </ul>
      </li>
    </ul>

    <h3>Generics</h3>
    <p>Generics allow you to create type-safe, reusable code without sacrificing performance. They defer the specification of one or more types until the class or method is declared and instantiated.</p>

    <h4>Generic Benefits</h4>
    <ul>
      <li><strong>Type Safety:</strong> Compile-time type checking</li>
      <li><strong>Performance:</strong> No boxing/unboxing for value types</li>
      <li><strong>Code Reuse:</strong> Write once, use with any type</li>
      <li><strong>IntelliSense:</strong> Better IDE support</li>
    </ul>

    <h4>Generic Constraints</h4>
    <ul>
      <li><strong>where T : class</strong> - Reference type constraint</li>
      <li><strong>where T : struct</strong> - Value type constraint</li>
      <li><strong>where T : new()</strong> - Default constructor constraint</li>
      <li><strong>where T : BaseClass</strong> - Base class constraint</li>
      <li><strong>where T : IInterface</strong> - Interface constraint</li>
      <li><strong>where T : U</strong> - Naked type constraint</li>
    </ul>

    <h4>Collection Interfaces</h4>
    <ul>
      <li><strong>IEnumerable&lt;T&gt;:</strong> Supports iteration over a collection</li>
      <li><strong>ICollection&lt;T&gt;:</strong> Basic collection operations (Add, Remove, Contains)</li>
      <li><strong>IList&lt;T&gt;:</strong> Indexed access to elements</li>
      <li><strong>IDictionary&lt;TKey, TValue&gt;:</strong> Key-value pair operations</li>
      <li><strong>ISet&lt;T&gt;:</strong> Set operations (Union, Intersect, Except)</li>
    </ul>
  `,
  codeExample: `using System.Collections.Generic;
using System.Linq;

// Generic Collections Examples
public class CollectionsDemo {
    public void DemonstrateLists() {
        // List<T> - Dynamic array
        List<string> names = new List<string>();
        names.Add("Alice");
        names.Add("Bob");
        names.Add("Charlie");

        // Add multiple items
        names.AddRange(new[] { "David", "Eve" });

        // Insert at specific position
        names.Insert(1, "Brian");

        // Remove items
        names.Remove("Charlie");
        names.RemoveAt(0); // Remove first item

        // Access by index
        Console.WriteLine($"First name: {names[0]}");
        Console.WriteLine($"List contains 'Bob': {names.Contains("Bob")}");

        // Iterate through list
        foreach (string name in names) {
            Console.WriteLine(name);
        }

        // LINQ operations
        var longNames = names.Where(n => n.Length > 4).ToList();
        var sortedNames = names.OrderBy(n => n).ToList();
    }

    public void DemonstrateDictionaries() {
        // Dictionary<TKey, TValue> - Key-value pairs
        Dictionary<string, int> ages = new Dictionary<string, int>();

        // Add items
        ages["Alice"] = 25;
        ages.Add("Bob", 30);
        ages.Add("Charlie", 35);

        // Safe way to add (check if key exists)
        if (!ages.ContainsKey("David")) {
            ages.Add("David", 28);
        }

        // TryGetValue for safe retrieval
        if (ages.TryGetValue("Alice", out int aliceAge)) {
            Console.WriteLine($"Alice is {aliceAge} years old");
        }

        // Iterate through dictionary
        foreach (KeyValuePair<string, int> person in ages) {
            Console.WriteLine($"{person.Key}: {person.Value}");
        }

        // Get all keys or values
        List<string> keys = ages.Keys.ToList();
        List<int> values = ages.Values.ToList();
    }

    public void DemonstrateHashSets() {
        // HashSet<T> - Unique elements
        HashSet<string> uniqueNames = new HashSet<string>();

        uniqueNames.Add("Alice");
        uniqueNames.Add("Bob");
        uniqueNames.Add("Alice"); // Duplicate, won't be added

        Console.WriteLine($"Set contains 'Alice': {uniqueNames.Contains("Alice")}");

        // Set operations
        HashSet<string> set1 = new HashSet<string> { "A", "B", "C" };
        HashSet<string> set2 = new HashSet<string> { "B", "C", "D" };

        set1.UnionWith(set2);        // { "A", "B", "C", "D" }
        set1.IntersectWith(set2);    // { "B", "C" }
        set1.ExceptWith(set2);       // { "A" }
    }

    public void DemonstrateQueuesAndStacks() {
        // Queue<T> - FIFO
        Queue<string> printQueue = new Queue<string>();

        printQueue.Enqueue("Document1.pdf");
        printQueue.Enqueue("Document2.pdf");
        printQueue.Enqueue("Document3.pdf");

        Console.WriteLine($"Next to print: {printQueue.Peek()}");
        Console.WriteLine($"Printed: {printQueue.Dequeue()}");
        Console.WriteLine($"Queue count: {printQueue.Count}");

        // Stack<T> - LIFO
        Stack<string> browserHistory = new Stack<string>();

        browserHistory.Push("google.com");
        browserHistory.Push("stackoverflow.com");
        browserHistory.Push("github.com");

        Console.WriteLine($"Current page: {browserHistory.Peek()}");
        Console.WriteLine($"Going back to: {browserHistory.Pop()}");
        Console.WriteLine($"Stack count: {browserHistory.Count}");
    }

    public void DemonstrateLinkedLists() {
        // LinkedList<T> - Doubly linked list
        LinkedList<string> tasks = new LinkedList<string>();

        tasks.AddLast("Task 1");
        tasks.AddLast("Task 3");
        tasks.AddFirst("Task 0");

        // Add after specific node
        LinkedListNode<string> node = tasks.Find("Task 1");
        if (node != null) {
            tasks.AddAfter(node, "Task 2");
        }

        // Iterate through linked list
        foreach (string task in tasks) {
            Console.WriteLine(task);
        }
    }
}

// Generic Classes and Methods
public class GenericRepository<T> where T : class, new() {
    private List<T> _items = new List<T>();

    public void Add(T item) {
        _items.Add(item);
    }

    public T GetById(int id) {
        // Simplified - in real code, T would need an Id property
        return id < _items.Count ? _items[id] : null;
    }

    public List<T> GetAll() {
        return _items.ToList();
    }

    public void Remove(T item) {
        _items.Remove(item);
    }

    public int Count => _items.Count;
}

public class GenericUtilities {
    // Generic method
    public static T Max<T>(T a, T b) where T : IComparable<T> {
        return a.CompareTo(b) > 0 ? a : b;
    }

    // Generic method with multiple type parameters
    public static void Swap<T>(ref T a, ref T b) {
        T temp = a;
        a = b;
        b = temp;
    }

    // Generic method with constraints
    public static T CreateInstance<T>() where T : new() {
        return new T();
    }
}

// Generic constraints examples
public class DataProcessor<T> where T : IComparable<T>, IEquatable<T> {
    private List<T> _data = new List<T>();

    public void Add(T item) {
        _data.Add(item);
    }

    public T FindMax() {
        if (_data.Count == 0) return default(T);
        T max = _data[0];
        foreach (T item in _data) {
            if (item.CompareTo(max) > 0) {
                max = item;
            }
        }
        return max;
    }

    public bool Contains(T item) {
        return _data.Contains(item);
    }
}

// Covariance and Contravariance (advanced)
public interface IProducer<out T> {
    T Produce();
}

public interface IConsumer<in T> {
    void Consume(T item);
}

public class StringProducer : IProducer<string> {
    public string Produce() {
        return "Hello World";
    }
}

public class ObjectConsumer : IConsumer<object> {
    public void Consume(object item) {
        Console.WriteLine($"Consumed: {item}");
    }
}

// Custom Generic Collection
public class CircularBuffer<T> : IEnumerable<T> {
    private T[] _buffer;
    private int _head;
    private int _tail;
    private int _count;

    public CircularBuffer(int capacity) {
        _buffer = new T[capacity];
        _head = 0;
        _tail = 0;
        _count = 0;
    }

    public void Write(T item) {
        _buffer[_tail] = item;
        _tail = (_tail + 1) % _buffer.Length;

        if (_count < _buffer.Length) {
            _count++;
        } else {
            _head = (_head + 1) % _buffer.Length;
        }
    }

    public T Read() {
        if (_count == 0) throw new InvalidOperationException("Buffer is empty");

        T item = _buffer[_head];
        _head = (_head + 1) % _buffer.Length;
        _count--;

        return item;
    }

    public int Count => _count;
    public bool IsEmpty => _count == 0;
    public bool IsFull => _count == _buffer.Length;

    public IEnumerator<T> GetEnumerator() {
        for (int i = 0; i < _count; i++) {
            int index = (_head + i) % _buffer.Length;
            yield return _buffer[index];
        }
    }

    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() {
        return GetEnumerator();
    }
}

// Demonstration
public void DemonstrateGenericsAndCollections() {
    // Collections demo
    CollectionsDemo collections = new CollectionsDemo();
    collections.DemonstrateLists();
    collections.DemonstrateDictionaries();
    collections.DemonstrateHashSets();
    collections.DemonstrateQueuesAndStacks();
    collections.DemonstrateLinkedLists();

    // Generic repository
    GenericRepository<string> stringRepo = new GenericRepository<string>();
    stringRepo.Add("Item 1");
    stringRepo.Add("Item 2");
    Console.WriteLine($"Repository count: {stringRepo.Count}");

    // Generic utilities
    int maxInt = GenericUtilities.Max(5, 10);
    Console.WriteLine($"Max of 5 and 10: {maxInt}");

    string a = "Hello";
    string b = "World";
    GenericUtilities.Swap(ref a, ref b);
    Console.WriteLine($"After swap: a='{a}', b='{b}'");

    // Data processor with constraints
    DataProcessor<int> intProcessor = new DataProcessor<int>();
    intProcessor.Add(5);
    intProcessor.Add(10);
    intProcessor.Add(3);
    Console.WriteLine($"Max value: {intProcessor.FindMax()}");

    // Circular buffer
    CircularBuffer<int> buffer = new CircularBuffer<int>(3);
    buffer.Write(1);
    buffer.Write(2);
    buffer.Write(3);
    buffer.Write(4); // Overwrites 1

    Console.Write("Buffer contents: ");
    foreach (int item in buffer) {
        Console.Write($"{item} ");
    }
    Console.WriteLine();

    // Covariance/Contravariance
    IProducer<string> producer = new StringProducer();
    IConsumer<object> consumer = new ObjectConsumer();

    string data = producer.Produce();
    consumer.Consume(data);
}

// Performance comparison: Generic vs Non-generic
public void PerformanceComparison() {
    const int iterations = 1000000;

    // Generic List
    List<int> genericList = new List<int>();
    var genericStart = DateTime.Now;

    for (int i = 0; i < iterations; i++) {
        genericList.Add(i);
        int value = genericList[i % genericList.Count];
    }

    var genericTime = DateTime.Now - genericStart;

    // Non-generic ArrayList
    System.Collections.ArrayList nonGenericList = new System.Collections.ArrayList();
    var nonGenericStart = DateTime.Now;

    for (int i = 0; i < iterations; i++) {
        nonGenericList.Add(i);
        int value = (int)nonGenericList[i % nonGenericList.Count]; // Boxing/Unboxing
    }

    var nonGenericTime = DateTime.Now - nonGenericStart;

    Console.WriteLine($"Generic List time: {genericTime.TotalMilliseconds}ms");
    Console.WriteLine($"Non-generic ArrayList time: {nonGenericTime.TotalMilliseconds}ms");
    Console.WriteLine($"Performance improvement: {(nonGenericTime.TotalMilliseconds / genericTime.TotalMilliseconds):F2}x");
}`,
  keyPoints: [
    'Use generic collections (List<T>, Dictionary<TKey, TValue>) over non-generic ones',
    'Generics provide type safety and better performance',
    'Choose the right collection type based on your access patterns',
    'Use constraints to limit generic types when necessary',
    'LINQ works seamlessly with generic collections',
    'Consider covariance and contravariance for advanced scenarios',
    'Custom generic collections can provide specialized functionality',
  ],
  exercise:
    'Create a generic PriorityQueue<T> class that stores items with priorities. Implement methods to enqueue items with priorities, dequeue the highest priority item, and peek at the highest priority item. Use a List<T> internally and maintain sorted order.',
};
