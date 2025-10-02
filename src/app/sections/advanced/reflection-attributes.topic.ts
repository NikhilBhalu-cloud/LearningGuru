import { Topic } from '../../models/section';

export const reflectionAttributesTopic: Topic = {
  id: 'advanced-reflection-attributes',
  name: 'Reflection & Attributes',
  sectionId: 'advanced',
  slug: 'reflection-attributes',
  explanation: `
    <h3>Reflection and Attributes in C#</h3>
    <p>Reflection enables runtime inspection and manipulation of types, methods, and assemblies. Attributes provide metadata that can be attached to code elements and queried at runtime. Together, they enable powerful metaprogramming techniques.</p>

    <h4>Reflection Capabilities</h4>
    <ul>
      <li><strong>Type Inspection:</strong> Examine type information at runtime</li>
      <li><strong>Dynamic Instantiation:</strong> Create objects without compile-time knowledge</li>
      <li><strong>Method Invocation:</strong> Call methods dynamically</li>
      <li><strong>Assembly Loading:</strong> Load and inspect assemblies dynamically</li>
      <li><strong>Code Generation:</strong> Emit IL code at runtime</li>
    </ul>

    <h4>Common Attributes</h4>
    <ul>
      <li><strong>[Serializable]:</strong> Marks types for binary serialization</li>
      <li><strong>[Obsolete]:</strong> Marks deprecated code</li>
      <li><strong>[Conditional]:</strong> Conditional compilation</li>
      <li><strong>[DllImport]:</strong> Platform invoke declarations</li>
      <li><strong>Custom Attributes:</strong> User-defined metadata</li>
    </ul>

    <h4>Reflection Performance</h4>
    <ul>
      <li><strong>Caching:</strong> Cache reflection results for performance</li>
      <li><strong>Expression Trees:</strong> Compile dynamic calls to delegates</li>
      <li><strong>Dynamic:</strong> Runtime binding with caching</li>
      <li><strong>Source Generators:</strong> Compile-time code generation</li>
    </ul>

    <h4>Advanced Patterns</h4>
    <ul>
      <li><strong>Plugin Architecture:</strong> Dynamic loading of components</li>
      <li><strong>ORM Mapping:</strong> Automatic object-relational mapping</li>
      <li><strong>Dependency Injection:</strong> Runtime service resolution</li>
      <li><strong>Serialization:</strong> Dynamic object serialization</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Reflection;
using System.Runtime.CompilerServices;
using System.Text.Json;

// Basic Reflection
public class ReflectionBasics {
    public void DemonstrateTypeInspection() {
        Console.WriteLine("=== Type Inspection ===");

        Type stringType = typeof(string);
        Console.WriteLine("Type: " + stringType.Name);
        Console.WriteLine("Namespace: " + stringType.Namespace);
        Console.WriteLine("Is Class: " + stringType.IsClass);
        Console.WriteLine("Is Value Type: " + stringType.IsValueType);
        Console.WriteLine("Base Type: " + stringType.BaseType?.Name);

        // Get all public methods
        var methods = stringType.GetMethods(BindingFlags.Public | BindingFlags.Instance);
        Console.WriteLine("Public methods: " + methods.Length);

        // Get specific method
        var substringMethod = stringType.GetMethod("Substring", new[] { typeof(int), typeof(int) });
        Console.WriteLine("Substring method: " + substringMethod?.Name);
    }

    public void DemonstrateDynamicInstantiation() {
        Console.WriteLine("\\n=== Dynamic Instantiation ===");

        // Create instance using reflection
        Type listType = typeof(List<>).MakeGenericType(typeof(string));
        var listInstance = Activator.CreateInstance(listType) as System.Collections.IList;

        // Add items dynamically
        listInstance?.Add("Hello");
        listInstance?.Add("World");

        Console.WriteLine("List count: " + listInstance?.Count);

        // Create instance with parameters
        Type dateTimeType = typeof(DateTime);
        var constructor = dateTimeType.GetConstructor(new[] { typeof(int), typeof(int), typeof(int) });
        var dateTimeInstance = constructor?.Invoke(new object[] { 2023, 12, 25 }) as DateTime?;

        Console.WriteLine("Created date: " + dateTimeInstance);
    }

    public void DemonstrateMethodInvocation() {
        Console.WriteLine("\\n=== Dynamic Method Invocation ===");

        var calculator = new Calculator();
        Type calcType = calculator.GetType();

        // Invoke method dynamically
        var addMethod = calcType.GetMethod("Add");
        var result = addMethod?.Invoke(calculator, new object[] { 5, 3 });

        Console.WriteLine("5 + 3 = " + result);

        // Invoke generic method
        var genericMethod = calcType.GetMethod("Max");
        var genericResult = genericMethod?.MakeGenericMethod(typeof(int))
                                          .Invoke(calculator, new object[] { 10, 20 });

        Console.WriteLine("Max(10, 20) = " + genericResult);
    }
}

public class Calculator {
    public int Add(int a, int b) => a + b;
    public T Max<T>(T a, T b) where T : IComparable<T> => a.CompareTo(b) > 0 ? a : b;
}

// Custom Attributes
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method | AttributeTargets.Property, AllowMultiple = true)]
public class AuthorAttribute : Attribute {
    public string Name { get; }
    public string Version { get; set; }

    public AuthorAttribute(string name) {
        Name = name;
    }
}

[AttributeUsage(AttributeTargets.Property)]
public class DisplayNameAttribute : Attribute {
    public string DisplayName { get; }

    public DisplayNameAttribute(string displayName) {
        DisplayName = displayName;
    }
}

[AttributeUsage(AttributeTargets.Method)]
public class ExecutionTimeAttribute : Attribute {
    public long MaxExecutionTimeMs { get; set; }
}

[Author("John Doe", Version = "1.0")]
[Author("Jane Smith", Version = "2.0")]
public class Product {
    [DisplayName("Product Identifier")]
    public int Id { get; set; }

    [DisplayName("Product Name")]
    public string Name { get; set; }

    [DisplayName("Product Price")]
    public decimal Price { get; set; }

    [ExecutionTime(MaxExecutionTimeMs = 1000)]
    public void ProcessOrder() {
        // Simulate processing
        System.Threading.Thread.Sleep(100);
    }
}

// Attribute Processing
public class AttributeProcessor {
    public void DemonstrateAttributeInspection() {
        Console.WriteLine("=== Attribute Inspection ===");

        Type productType = typeof(Product);

        // Get class-level attributes
        var authorAttributes = productType.GetCustomAttributes<AuthorAttribute>();
        Console.WriteLine("Authors:");
        foreach (var author in authorAttributes) {
            Console.WriteLine("  " + author.Name + " (v" + author.Version + ")");
        }

        // Get property attributes
        var properties = productType.GetProperties();
        foreach (var property in properties) {
            var displayNameAttr = property.GetCustomAttribute<DisplayNameAttribute>();
            if (displayNameAttr != null) {
                Console.WriteLine("Property '" + property.Name + "' displays as '" + displayNameAttr.DisplayName + "'");
            }
        }

        // Get method attributes
        var methods = productType.GetMethods();
        foreach (var method in methods) {
            var execTimeAttr = method.GetCustomAttribute<ExecutionTimeAttribute>();
            if (execTimeAttr != null) {
                Console.WriteLine("Method '" + method.Name + "' max execution time: " + execTimeAttr.MaxExecutionTimeMs + "ms");
            }
        }
    }
}

// Reflection Performance Optimization
public class ReflectionOptimization {
    private static readonly Dictionary<string, PropertyInfo> _propertyCache = new Dictionary<string, PropertyInfo>();
    private static readonly Dictionary<string, MethodInfo> _methodCache = new Dictionary<string, MethodInfo>();

    public void DemonstrateCaching() {
        Console.WriteLine("=== Reflection Caching ===");

        var product = new Product { Id = 1, Name = "Laptop", Price = 999.99m };

        // Without caching (slow)
        var stopwatch = Stopwatch.StartNew();
        for (int i = 0; i < 10000; i++) {
            var nameProperty = typeof(Product).GetProperty("Name");
            var value = nameProperty?.GetValue(product);
        }
        stopwatch.Stop();
        Console.WriteLine("Without caching: " + stopwatch.ElapsedMilliseconds + "ms");

        // With caching (fast)
        stopwatch.Restart();
        for (int i = 0; i < 10000; i++) {
            var nameProperty = GetCachedProperty(typeof(Product), "Name");
            var value = nameProperty?.GetValue(product);
        }
        stopwatch.Stop();
        Console.WriteLine("With caching: " + stopwatch.ElapsedMilliseconds + "ms");
    }

    private PropertyInfo GetCachedProperty(Type type, string propertyName) {
        string key = type.FullName + "." + propertyName;
        if (!_propertyCache.TryGetValue(key, out var property)) {
            property = type.GetProperty(propertyName);
            _propertyCache[key] = property;
        }
        return property;
    }

    public void DemonstrateDelegateCreation() {
        Console.WriteLine("\\n=== Delegate Creation for Performance ===");

        var calculator = new Calculator();
        var method = typeof(Calculator).GetMethod("Add");

        // Create delegate from MethodInfo
        var addDelegate = (Func<int, int, int>)Delegate.CreateDelegate(
            typeof(Func<int, int, int>), calculator, method);

        var result = addDelegate(10, 20);
        Console.WriteLine("Delegate result: " + result);

        // Expression tree compilation
        var paramA = System.Linq.Expressions.Expression.Parameter(typeof(int), "a");
        var paramB = System.Linq.Expressions.Expression.Parameter(typeof(int), "b");
        var body = System.Linq.Expressions.Expression.Add(paramA, paramB);
        var lambda = System.Linq.Expressions.Expression.Lambda<Func<int, int, int>>(body, paramA, paramB);
        var compiledAdd = lambda.Compile();

        var compiledResult = compiledAdd(15, 25);
        Console.WriteLine("Compiled expression result: " + compiledResult);
    }
}

// Dynamic Object Creation and Manipulation
public class DynamicObjectDemo {
    public void DemonstrateExpandoObject() {
        Console.WriteLine("=== ExpandoObject ===");

        dynamic expando = new System.Dynamic.ExpandoObject();
        expando.Name = "Dynamic Product";
        expando.Price = 99.99;
        expando.Category = "Electronics";

        // Add method dynamically
        expando.GetDescription = (Func<string>)(() =>
            expando.Name + " in " + expando.Category + " - $" + expando.Price);

        Console.WriteLine("Dynamic object: " + expando.GetDescription());

        // Convert to dictionary
        var dict = expando as IDictionary<string, object>;
        Console.WriteLine("Properties:");
        foreach (var kvp in dict) {
            Console.WriteLine("  " + kvp.Key + ": " + kvp.Value);
        }
    }

    public void DemonstrateDynamic() {
        Console.WriteLine("\\n=== Dynamic Keyword ===");

        dynamic calc = new Calculator();

        // Dynamic method invocation
        var result1 = calc.Add(5, 3);
        var result2 = calc.Max(10, 20);

        Console.WriteLine("Dynamic Add: " + result1);
        Console.WriteLine("Dynamic Max: " + result2);

        // Dynamic with COM objects (concept)
        // dynamic excel = Activator.CreateInstance(Type.GetTypeFromProgID("Excel.Application"));
        // excel.Visible = true;
    }
}

// Plugin Architecture with Reflection
public interface IPlugin {
    string Name { get; }
    void Execute();
}

[Author("Plugin Developer")]
public class LoggingPlugin : IPlugin {
    public string Name => "Logging Plugin";

    public void Execute() {
        Console.WriteLine("Logging: Operation executed at " + DateTime.Now);
    }
}

public class EmailPlugin : IPlugin {
    public string Name => "Email Plugin";

    public void Execute() {
        Console.WriteLine("Email: Notification sent");
    }
}

public class PluginManager {
    private readonly List<IPlugin> _plugins = new List<IPlugin>();

    public void LoadPlugins() {
        // In a real scenario, this would scan assemblies in a plugins directory
        var pluginTypes = new[] { typeof(LoggingPlugin), typeof(EmailPlugin) };

        foreach (var pluginType in pluginTypes) {
            if (typeof(IPlugin).IsAssignableFrom(pluginType) && !pluginType.IsAbstract) {
                var plugin = (IPlugin)Activator.CreateInstance(pluginType);
                _plugins.Add(plugin);
                Console.WriteLine("Loaded plugin: " + plugin.Name);
            }
        }
    }

    public void ExecuteAllPlugins() {
        foreach (var plugin in _plugins) {
            plugin.Execute();
        }
    }

    public IEnumerable<IPlugin> GetPluginsByAuthor(string authorName) {
        return _plugins.Where(p => {
            var authorAttr = p.GetType().GetCustomAttribute<AuthorAttribute>();
            return authorAttr?.Name == authorName;
        });
    }
}

// Serialization with Reflection
public class ReflectionSerializer {
    public string Serialize(object obj) {
        if (obj == null) return "null";

        var type = obj.GetType();
        var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);

        var result = new System.Text.StringBuilder();
        result.Append("{");
        result.Append("\\"type\\": \\"" + type.Name + "\\",");

        var propertyValues = new List<string>();
        foreach (var prop in properties) {
            var value = prop.GetValue(obj);
            var serializedValue = value != null ? "\\"" + value.ToString() + "\\"" : "null";
            propertyValues.Add("\\"" + prop.Name + "\\": " + serializedValue);
        }

        result.Append(string.Join(",", propertyValues));
        result.Append("}");

        return result.ToString();
    }

    public T Deserialize<T>(string json) where T : new() {
        // Simplified deserialization (real implementation would parse JSON properly)
        var obj = new T();
        var type = typeof(T);

        // This is a very basic implementation for demonstration
        // In reality, you'd use a proper JSON parser
        if (json.Contains("\\"Name\\": \\"Laptop\\"")) {
            var nameProp = type.GetProperty("Name");
            nameProp?.SetValue(obj, "Laptop");
        }

        return obj;
    }
}

// Assembly Inspection
public class AssemblyInspector {
    public void DemonstrateAssemblyInspection() {
        Console.WriteLine("=== Assembly Inspection ===");

        var assembly = Assembly.GetExecutingAssembly();

        Console.WriteLine("Assembly: " + assembly.FullName);
        Console.WriteLine("Location: " + assembly.Location);

        // Get all types in the assembly
        var types = assembly.GetTypes();
        Console.WriteLine("Types in assembly: " + types.Length);

        // Find types with specific attributes
        var attributedTypes = types.Where(t => t.GetCustomAttributes<AuthorAttribute>().Any());
        Console.WriteLine("Types with Author attribute: " + attributedTypes.Count());

        foreach (var type in attributedTypes) {
            var authors = type.GetCustomAttributes<AuthorAttribute>();
            Console.WriteLine("  " + type.Name + " by " + string.Join(", ", authors.Select(a => a.Name)));
        }
    }
}

// Advanced Reflection: Code Generation
public class CodeGenerator {
    public void DemonstrateCodeGeneration() {
        Console.WriteLine("=== Runtime Code Generation ===");

        // Create a dynamic method
        var dynamicMethod = new System.Reflection.Emit.DynamicMethod(
            "AddNumbers",
            typeof(int),
            new[] { typeof(int), typeof(int) });

        var il = dynamicMethod.GetILGenerator();
        il.Emit(System.Reflection.Emit.OpCodes.Ldarg_0);
        il.Emit(System.Reflection.Emit.OpCodes.Ldarg_1);
        il.Emit(System.Reflection.Emit.OpCodes.Add);
        il.Emit(System.Reflection.Emit.OpCodes.Ret);

        // Create delegate from dynamic method
        var addFunc = (Func<int, int, int>)dynamicMethod.CreateDelegate(typeof(Func<int, int, int]));

        var result = addFunc(7, 8);
        Console.WriteLine("Dynamic method result: " + result);
    }
}

// Demonstration
public void DemonstrateReflectionAndAttributes() {
    var basics = new ReflectionBasics();
    basics.DemonstrateTypeInspection();
    basics.DemonstrateDynamicInstantiation();
    basics.DemonstrateMethodInvocation();

    var attrProcessor = new AttributeProcessor();
    attrProcessor.DemonstrateAttributeInspection();

    var optimization = new ReflectionOptimization();
    optimization.DemonstrateCaching();
    optimization.DemonstrateDelegateCreation();

    var dynamicDemo = new DynamicObjectDemo();
    dynamicDemo.DemonstrateExpandoObject();
    dynamicDemo.DemonstrateDynamic();

    var pluginManager = new PluginManager();
    pluginManager.LoadPlugins();
    pluginManager.ExecuteAllPlugins();

    var authorPlugins = pluginManager.GetPluginsByAuthor("Plugin Developer");
    Console.WriteLine("\\nPlugins by Plugin Developer:");
    foreach (var plugin in authorPlugins) {
        Console.WriteLine("  " + plugin.Name);
    }

    var serializer = new ReflectionSerializer();
    var product = new Product { Id = 1, Name = "Laptop", Price = 999.99m };
    var json = serializer.Serialize(product);
    Console.WriteLine("\\nSerialized product: " + json);

    var assemblyInspector = new AssemblyInspector();
    assemblyInspector.DemonstrateAssemblyInspection();

    var codeGen = new CodeGenerator();
    codeGen.DemonstrateCodeGeneration();
}`,
  keyPoints: [
    'Reflection enables runtime type inspection and manipulation',
    'Attributes provide metadata that can be queried at runtime',
    'Cache reflection results to improve performance',
    'Use delegates and expression trees for better performance',
    'Dynamic keyword provides runtime binding capabilities',
    'Plugin architectures benefit greatly from reflection',
    'Custom attributes enable declarative programming',
    'Assembly inspection allows dynamic loading of components',
    'Code generation enables metaprogramming scenarios',
    'Balance flexibility with performance considerations',
  ],
  exercise:
    'Create a dependency injection container using reflection that supports constructor injection, property injection, and lifecycle management. Build a custom ORM mapper that uses attributes to define database mappings and generates SQL queries dynamically. Implement a plugin system for a text editor that discovers and loads extensions using reflection. Develop a serialization framework that uses custom attributes to control serialization behavior and supports complex object graphs with circular references.',
};
