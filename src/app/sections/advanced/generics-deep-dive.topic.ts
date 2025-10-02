import { Topic } from '../../models/section';

export const genericsDeepDiveTopic: Topic = {
  id: 'advanced-generics-deep-dive',
  name: 'Generics Deep Dive',
  sectionId: 'advanced',
  slug: 'generics-deep-dive',
  explanation: `
    <h3>Advanced Generics in C#</h3>
    <p>Generics provide type safety, performance benefits, and code reusability by allowing you to write code that works with any data type while maintaining compile-time type checking.</p>

    <h4>Generic Type Parameters</h4>
    <ul>
      <li><strong>T:</strong> Single type parameter (most common)</li>
      <li><strong>TKey, TValue:</strong> Multiple type parameters with descriptive names</li>
      <li><strong>TInput, TOutput:</strong> Input/output type parameters</li>
      <li><strong>TEntity, TProperty:</strong> Entity and property type parameters</li>
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

    <h4>Covariance and Contravariance</h4>
    <p>Advanced variance concepts that allow more flexible generic type usage:</p>
    <ul>
      <li><strong>Covariance (out):</strong> Allows more derived types (IEnumerable&lt;out T&gt;)</li>
      <li><strong>Contravariance (in):</strong> Allows less derived types (IComparer&lt;in T&gt;)</li>
      <li><strong>Invariant:</strong> No variance (IList&lt;T&gt;)</li>
    </ul>

    <h4>Generic Methods vs Generic Types</h4>
    <ul>
      <li><strong>Generic Methods:</strong> Methods with their own type parameters</li>
      <li><strong>Generic Types:</strong> Classes, interfaces, structs with type parameters</li>
      <li><strong>Type Inference:</strong> Compiler can often infer generic method type arguments</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.Linq;

// Basic Generic Class
public class GenericContainer<T> {
    private T _value;

    public GenericContainer(T value) {
        _value = value;
    }

    public T GetValue() {
        return _value;
    }

    public void SetValue(T value) {
        _value = value;
    }
}

// Generic Methods
public class GenericMethods {
    // Generic method with type inference
    public static void Swap<T>(ref T a, ref T b) {
        T temp = a;
        a = b;
        b = temp;
    }

    // Generic method with constraints
    public static T Max<T>(T a, T b) where T : IComparable<T> {
        return a.CompareTo(b) > 0 ? a : b;
    }

    // Generic method with multiple constraints
    public static T CreateInstance<T>() where T : class, new() {
        return new T();
    }
}

// Generic Constraints Deep Dive
public interface IRepository<T> where T : class, IEntity, new() {
    T GetById(int id);
    IEnumerable<T> GetAll();
    void Save(T entity);
    void Delete(T entity);
}

public interface IEntity {
    int Id { get; set; }
}

public class Customer : IEntity {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
}

public class Order : IEntity {
    public int Id { get; set; }
    public int CustomerId { get; set; }
    public DateTime OrderDate { get; set; }
    public decimal Total { get; set; }
}

// Generic Repository Implementation
public class GenericRepository<T> : IRepository<T> where T : class, IEntity, new() {
    private readonly List<T> _entities = new List<T>();
    private int _nextId = 1;

    public T GetById(int id) {
        return _entities.FirstOrDefault(e => e.Id == id);
    }

    public IEnumerable<T> GetAll() {
        return _entities;
    }

    public void Save(T entity) {
        var existing = _entities.FirstOrDefault(e => e.Id == entity.Id);
        if (existing != null) {
            _entities.Remove(existing);
        } else {
            entity.Id = _nextId++;
        }
        _entities.Add(entity);
    }

    public void Delete(T entity) {
        _entities.Remove(entity);
    }
}

// Covariance and Contravariance
public interface ICovariant<out T> {
    T GetItem();
    // void AddItem(T item); // Not allowed - covariance only for output positions
}

public interface IContravariant<in T> {
    void ProcessItem(T item);
    // T GetItem(); // Not allowed - contravariance only for input positions
}

public class CovariantList<T> : ICovariant<T> {
    private readonly List<T> _items = new List<T>();

    public CovariantList(IEnumerable<T> items) {
        _items.AddRange(items);
    }

    public T GetItem() {
        return _items.FirstOrDefault();
    }
}

public class ContravariantProcessor<T> : IContravariant<T> {
    public void ProcessItem(T item) {
        Console.WriteLine("Processing item: " + item?.ToString());
    }
}

// Advanced Generic Patterns
public class GenericFactory<T> where T : class, new() {
    private readonly Dictionary<Type, Func<T>> _creators = new Dictionary<Type, Func<T>>();

    public void RegisterCreator<U>(Func<U> creator) where U : class, T, new() {
        _creators[typeof(U)] = () => creator();
    }

    public T Create(Type type) {
        if (_creators.TryGetValue(type, out var creator)) {
            return creator();
        }
        return new T();
    }
}

// Generic Event Handler
public class GenericEventArgs<T> : EventArgs {
    public T Data { get; }

    public GenericEventArgs(T data) {
        Data = data;
    }
}

public class GenericEventPublisher<T> {
    public event EventHandler<GenericEventArgs<T>> DataChanged;

    public void PublishData(T data) {
        DataChanged?.Invoke(this, new GenericEventArgs<T>(data));
    }
}

// Generic Extension Methods
public static class GenericExtensions {
    public static bool IsNullOrEmpty<T>(this IEnumerable<T> source) {
        return source == null || !source.Any();
    }

    public static IEnumerable<T> WhereNotNull<T>(this IEnumerable<T> source) {
        return source.Where(item => item != null);
    }

    public static T FirstOrDefault<T>(this IEnumerable<T> source, T defaultValue) {
        return source.FirstOrDefault() ?? defaultValue;
    }

    // Generic memoization
    private static readonly Dictionary<string, object> _cache = new Dictionary<string, object>();

    public static T Memoize<T>(this Func<T> func, string key) {
        if (_cache.TryGetValue(key, out var cached)) {
            return (T)cached;
        }

        var result = func();
        _cache[key] = result;
        return result;
    }
}

// Generic Validation Framework
public interface IValidator<T> {
    ValidationResult Validate(T instance);
}

public class ValidationResult {
    public bool IsValid { get; set; }
    public List<string> Errors { get; } = new List<string>();

    public void AddError(string error) {
        IsValid = false;
        Errors.Add(error);
    }
}

public class CustomerValidator : IValidator<Customer> {
    public ValidationResult Validate(Customer customer) {
        var result = new ValidationResult { IsValid = true };

        if (string.IsNullOrWhiteSpace(customer.Name)) {
            result.AddError("Name is required");
        }

        if (string.IsNullOrWhiteSpace(customer.Email)) {
            result.AddError("Email is required");
        } else if (!customer.Email.Contains("@")) {
            result.AddError("Email must be valid");
        }

        return result;
    }
}

public class ValidationEngine {
    private readonly Dictionary<Type, object> _validators = new Dictionary<Type, object>();

    public void RegisterValidator<T>(IValidator<T> validator) {
        _validators[typeof(T)] = validator;
    }

    public ValidationResult Validate<T>(T instance) {
        if (_validators.TryGetValue(typeof(T), out var validator)) {
            return ((IValidator<T>)validator).Validate(instance);
        }

        return new ValidationResult { IsValid = true };
    }
}

// Generic Builder Pattern
public interface IBuilder<T> where T : class, new() {
    T Build();
}

public class GenericBuilder<T> : IBuilder<T> where T : class, new() {
    private readonly T _instance = new T();
    private readonly Dictionary<string, object> _propertyValues = new Dictionary<string, object>();

    public GenericBuilder<T> SetProperty(string propertyName, object value) {
        _propertyValues[propertyName] = value;
        return this;
    }

    public T Build() {
        var type = typeof(T);
        foreach (var kvp in _propertyValues) {
            var property = type.GetProperty(kvp.Key);
            if (property != null && property.CanWrite) {
                property.SetValue(_instance, kvp.Value);
            }
        }
        return _instance;
    }
}

// Generic Singleton Pattern
public class Singleton<T> where T : class, new() {
    private static readonly Lazy<T> _instance = new Lazy<T>(() => new T());

    public static T Instance => _instance.Value;

    protected Singleton() { }
}

// Generic Cache with Type Safety
public class GenericCache<TKey, TValue> {
    private readonly Dictionary<TKey, TValue> _cache = new Dictionary<TKey, TValue>();
    private readonly object _lock = new object();

    public TValue GetOrAdd(TKey key, Func<TKey, TValue> factory) {
        lock (_lock) {
            if (_cache.TryGetValue(key, out var value)) {
                return value;
            }

            value = factory(key);
            _cache[key] = value;
            return value;
        }
    }

    public void Clear() {
        lock (_lock) {
            _cache.Clear();
        }
    }

    public bool ContainsKey(TKey key) {
        lock (_lock) {
            return _cache.ContainsKey(key);
        }
    }
}

// Demonstration
public void DemonstrateAdvancedGenerics() {
    Console.WriteLine("=== Basic Generics ===");
    var stringContainer = new GenericContainer<string>("Hello World");
    var intContainer = new GenericContainer<int>(42);

    Console.WriteLine("String: " + stringContainer.GetValue());
    Console.WriteLine("Int: " + intContainer.GetValue());

    // Generic Methods
    Console.WriteLine("\\n=== Generic Methods ===");
    int a = 5, b = 10;
    Console.WriteLine("Before swap: a=" + a + ", b=" + b);
    GenericMethods.Swap(ref a, ref b);
    Console.WriteLine("After swap: a=" + a + ", b=" + b);

    string x = "Hello", y = "World";
    Console.WriteLine("Before swap: x=" + x + ", y=" + y);
    GenericMethods.Swap(ref x, ref y);
    Console.WriteLine("After swap: x=" + x + ", y=" + y);

    // Constraints
    Console.WriteLine("\\n=== Generic Constraints ===");
    Console.WriteLine("Max of 5 and 10: " + GenericMethods.Max(5, 10));
    Console.WriteLine("Max of 'apple' and 'banana': " + GenericMethods.Max("apple", "banana"));

    // Repository Pattern
    Console.WriteLine("\\n=== Generic Repository ===");
    var customerRepo = new GenericRepository<Customer>();
    var customer = new Customer { Name = "John Doe", Email = "john@example.com" };
    customerRepo.Save(customer);
    Console.WriteLine("Saved customer: " + customer.Name);

    var retrievedCustomer = customerRepo.GetById(customer.Id);
    Console.WriteLine("Retrieved customer: " + retrievedCustomer?.Name);

    // Covariance and Contravariance
    Console.WriteLine("\\n=== Covariance and Contravariance ===");
    ICovariant<string> covariantList = new CovariantList<string>(new[] { "a", "b", "c" });
    ICovariant<object> covariantObject = covariantList; // Covariance allows this
    Console.WriteLine("Covariant result: " + covariantObject.GetItem());

    IContravariant<object> contravariantProcessor = new ContravariantProcessor<object>();
    IContravariant<string> contravariantString = contravariantProcessor; // Contravariance allows this
    contravariantString.ProcessItem("Hello");

    // Validation Framework
    Console.WriteLine("\\n=== Generic Validation ===");
    var validationEngine = new ValidationEngine();
    validationEngine.RegisterValidator(new CustomerValidator());

    var validCustomer = new Customer { Name = "Jane Doe", Email = "jane@example.com" };
    var invalidCustomer = new Customer { Name = "", Email = "invalid-email" };

    var validResult = validationEngine.Validate(validCustomer);
    var invalidResult = validationEngine.Validate(invalidCustomer);

    Console.WriteLine("Valid customer: " + validResult.IsValid);
    Console.WriteLine("Invalid customer: " + invalidResult.IsValid + " - " + string.Join(", ", invalidResult.Errors));

    // Generic Cache
    Console.WriteLine("\\n=== Generic Cache ===");
    var cache = new GenericCache<string, int>();
    var result1 = cache.GetOrAdd("key1", k => {
        Console.WriteLine("Computing value for " + k);
        return 42;
    });
    var result2 = cache.GetOrAdd("key1", k => {
        Console.WriteLine("This should not print - cached!");
        return 0;
    });

    Console.WriteLine("Result1: " + result1 + ", Result2: " + result2);

    // Generic Builder
    Console.WriteLine("\\n=== Generic Builder ===");
    var customerBuilder = new GenericBuilder<Customer>()
        .SetProperty("Name", "Bob Smith")
        .SetProperty("Email", "bob@example.com");

    var builtCustomer = customerBuilder.Build();
    Console.WriteLine("Built customer: " + builtCustomer.Name + " - " + builtCustomer.Email);
}`,
  keyPoints: [
    'Generics provide type safety and performance benefits',
    'Use constraints to limit generic types appropriately',
    'Covariance allows more derived output types, contravariance allows less derived input types',
    'Generic methods can infer type parameters automatically',
    'Repository pattern benefits greatly from generics',
    'Use generics for type-safe caching, validation, and builder patterns',
    'Generic constraints help enforce compile-time type safety',
    'Extension methods can be generic for maximum reusability',
  ],
  exercise:
    'Create a generic data processing pipeline that can handle different types of data (CSV, JSON, XML) using generics with constraints. Implement a generic Result<T> type that can represent success/failure states, and create a generic retry mechanism with exponential backoff. Use covariance and contravariance appropriately in your design.',
};
