import { Topic } from '../../models/section';

export const advancedFeaturesTopic: Topic = {
  id: 'advanced-features',
  name: 'Advanced Features',
  sectionId: 'advanced',
  slug: 'advanced-features',
  explanation: `
    <h3>Advanced C# Features and Techniques</h3>
    <p>This topic covers advanced C# features that enable sophisticated programming techniques, performance optimization, and low-level system interaction.</p>

    <h4>Dynamic Programming</h4>
    <ul>
      <li><strong>dynamic keyword:</strong> Runtime type binding</li>
      <li><strong>DynamicObject:</strong> Custom dynamic behavior</li>
      <li><strong>ExpandoObject:</strong> Runtime property creation</li>
      <li><strong>IDynamicMetaObjectProvider:</strong> Advanced dynamic objects</li>
    </ul>

    <h4>Expression Trees</h4>
    <ul>
      <li><strong>Expression&lt;T&gt;:</strong> Code as data</li>
      <li><strong>Expression building:</strong> Runtime code construction</li>
      <li><strong>LINQ provider implementation:</strong> Custom query providers</li>
      <li><strong>Code generation:</strong> Dynamic method creation</li>
    </ul>

    <h4>Unsafe Code and Pointers</h4>
    <ul>
      <li><strong>unsafe keyword:</strong> Direct memory manipulation</li>
      <li><strong>Pointer types:</strong> * and & operators</li>
      <li><strong>fixed statement:</strong> Pinning objects in memory</li>
      <li><strong>stackalloc:</strong> Stack-based memory allocation</li>
    </ul>

    <h4>P/Invoke and Native Interop</h4>
    <ul>
      <li><strong>DllImport:</strong> Calling native functions</li>
      <li><strong>StructLayout:</strong> Memory layout control</li>
      <li><strong>Marshal:</strong> Data marshaling utilities</li>
      <li><strong>COM Interop:</strong> Component Object Model integration</li>
    </ul>

    <h4>Code Generation and Reflection.Emit</h4>
    <ul>
      <li><strong>Reflection.Emit:</strong> Runtime assembly generation</li>
      <li><strong>DynamicMethod:</strong> Lightweight dynamic methods</li>
      <li><strong>ILGenerator:</strong> MSIL code emission</li>
      <li><strong>TypeBuilder:</strong> Runtime type construction</li>
    </ul>

    <h4>Advanced Language Features</h4>
    <ul>
      <li><strong>Caller Info attributes:</strong> Contextual information</li>
      <li><strong>Conditional compilation:</strong> Platform-specific code</li>
      <li><strong>Obsolete attribute:</strong> Deprecation warnings</li>
      <li><strong>InternalsVisibleTo:</strong> Assembly friendship</li>
      <li><strong>Module initializers:</strong> Assembly initialization</li>
    </ul>

    <h4>Performance and Optimization</h4>
    <ul>
      <li><strong>Span&lt;T&gt; and Memory&lt;T&gt;:</strong> Memory-efficient APIs</li>
      <li><strong>Stack-based allocation:</strong> Reduced GC pressure</li>
      <li><strong>Inline arrays:</strong> Fixed-size buffers</li>
      <li><strong>Function pointers:</strong> Efficient delegates</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Dynamic;
using System.Linq;
using System.Linq.Expressions;
using System.Reflection;
using System.Reflection.Emit;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Runtime.Intrinsics;
using System.Text;

// Dynamic Programming
public class DynamicProgrammingDemo {
    public void DemonstrateDynamicKeyword() {
        dynamic obj = 42;
        Console.WriteLine($"Type: {obj.GetType()}, Value: {obj}");

        obj = "Hello, Dynamic!";
        Console.WriteLine($"Type: {obj.GetType()}, Value: {obj}");

        obj = new { Name = "Dynamic Object", Value = 100 };
        Console.WriteLine($"Type: {obj.GetType()}, Name: {obj.Name}, Value: {obj.Value}");

        // Dynamic method calls
        dynamic calculator = new Calculator();
        Console.WriteLine($"Add: {calculator.Add(10, 20)}");
        Console.WriteLine($"Multiply: {calculator.Multiply(10, 20)}");
    }

    public void DemonstrateExpandoObject() {
        dynamic person = new ExpandoObject();
        person.Name = "John Doe";
        person.Age = 30;
        person.Skills = new List<string> { "C#", "JavaScript", "Python" };

        // Add methods dynamically
        person.Introduce = new Action(() =>
            Console.WriteLine($"Hi, I'm {person.Name}, {person.Age} years old"));

        person.AddSkill = new Action<string>((skill) =>
            ((List<string>)person.Skills).Add(skill));

        Console.WriteLine($"Person: {person.Name}");
        person.Introduce();
        person.AddSkill("SQL");
        Console.WriteLine($"Skills: {string.Join(", ", person.Skills)}");
    }

    public void DemonstrateDynamicObject() {
        dynamic bag = new PropertyBag();

        bag.Name = "My Bag";
        bag.Count = 5;
        bag.Items = new[] { "Apple", "Banana", "Orange" };

        Console.WriteLine($"Bag: {bag.Name}");
        Console.WriteLine($"Count: {bag.Count}");
        Console.WriteLine($"Items: {string.Join(", ", bag.Items)}");

        // Try to access non-existent property
        try {
            var missing = bag.MissingProperty;
        } catch (Exception ex) {
            Console.WriteLine($"Dynamic error: {ex.Message}");
        }
    }
}

public class Calculator {
    public int Add(int a, int b) => a + b;
    public int Multiply(int a, int b) => a * b;
}

public class PropertyBag : DynamicObject {
    private readonly Dictionary<string, object> _properties = new();

    public override bool TryGetMember(GetMemberBinder binder, out object result) {
        return _properties.TryGetValue(binder.Name, out result);
    }

    public override bool TrySetMember(SetMemberBinder binder, object value) {
        _properties[binder.Name] = value;
        return true;
    }

    public override IEnumerable<string> GetDynamicMemberNames() {
        return _properties.Keys;
    }
}

// Expression Trees
public class ExpressionTreesDemo {
    public void DemonstrateExpressionTrees() {
        // Simple expression: x => x * 2
        Expression<Func<int, int>> expr = x => x * 2;

        Console.WriteLine($"Expression: {expr}");
        Console.WriteLine($"Body: {expr.Body}");
        Console.WriteLine($"Parameters: {string.Join(", ", expr.Parameters.Select(p => p.Name))}");

        // Compile and execute
        var func = expr.Compile();
        Console.WriteLine($"Result of 5 * 2: {func(5)}");

        // Build expression manually
        var param = Expression.Parameter(typeof(int), "x");
        var constant = Expression.Constant(2);
        var multiply = Expression.Multiply(param, constant);
        var lambda = Expression.Lambda<Func<int, int>>(multiply, param);

        Console.WriteLine($"Manual expression: {lambda}");
        var manualFunc = lambda.Compile();
        Console.WriteLine($"Manual result: {manualFunc(7)}");
    }

    public void DemonstrateExpressionVisitor() {
        Expression<Func<int, int, int>> expr = (x, y) => x * y + 10;

        var visitor = new ExpressionTreeAnalyzer();
        visitor.Visit(expr);

        Console.WriteLine("Expression analysis complete");
    }

    public void DemonstrateLinqProvider() {
        var data = new[] { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 };

        // Custom LINQ provider simulation
        var query = new CustomQueryable<int>(data.AsQueryable())
            .Where(x => x % 2 == 0)
            .Select(x => x * x);

        Console.WriteLine($"Even squares: {string.Join(", ", query)}");
    }
}

public class ExpressionTreeAnalyzer : ExpressionVisitor {
    protected override Expression VisitBinary(BinaryExpression node) {
        Console.WriteLine($"Binary operation: {node.NodeType} ({node.Left} {node.NodeType} {node.Right})");
        return base.VisitBinary(node);
    }

    protected override Expression VisitConstant(ConstantExpression node) {
        Console.WriteLine($"Constant: {node.Value} ({node.Type})");
        return base.VisitConstant(node);
    }

    protected override Expression VisitParameter(ParameterExpression node) {
        Console.WriteLine($"Parameter: {node.Name} ({node.Type})");
        return base.VisitParameter(node);
    }
}

public class CustomQueryable<T> : IQueryable<T> {
    private readonly IQueryable<T> _source;

    public CustomQueryable(IQueryable<T> source) {
        _source = source;
        Provider = new CustomQueryProvider(source.Provider);
        Expression = Expression.Constant(this);
    }

    public Type ElementType => typeof(T);
    public Expression Expression { get; }
    public IQueryProvider Provider { get; }

    public IEnumerator<T> GetEnumerator() => Provider.Execute<IEnumerable<T>>(Expression).GetEnumerator();
    System.Collections.IEnumerator System.Collections.IEnumerable.GetEnumerator() => GetEnumerator();
}

public class CustomQueryProvider : IQueryProvider {
    private readonly IQueryProvider _innerProvider;

    public CustomQueryProvider(IQueryProvider innerProvider) {
        _innerProvider = innerProvider;
    }

    public IQueryable CreateQuery(Expression expression) {
        throw new NotImplementedException();
    }

    public IQueryable<TElement> CreateQuery<TElement>(Expression expression) {
        return new CustomQueryable<TElement>(_innerProvider.CreateQuery<TElement>(expression));
    }

    public object Execute(Expression expression) {
        Console.WriteLine("Executing custom query...");
        return _innerProvider.Execute(expression);
    }

    public TResult Execute<TResult>(Expression expression) {
        Console.WriteLine($"Executing custom query with result type {typeof(TResult)}");
        return _innerProvider.Execute<TResult>(expression);
    }
}

// Unsafe Code and Pointers
public unsafe class UnsafeCodeDemo {
    public void DemonstratePointers() {
        int value = 42;
        int* ptr = &value;

        Console.WriteLine($"Value: {value}");
        Console.WriteLine($"Pointer address: {(long)ptr:X}");
        Console.WriteLine($"Dereferenced: {*ptr}");

        // Modify through pointer
        *ptr = 100;
        Console.WriteLine($"Modified value: {value}");

        // Array manipulation
        int[] array = { 1, 2, 3, 4, 5 };
        fixed (int* arrPtr = array) {
            for (int i = 0; i < array.Length; i++) {
                Console.WriteLine($"array[{i}] = {arrPtr[i]}");
                arrPtr[i] *= 2;
            }
        }

        Console.WriteLine($"Modified array: {string.Join(", ", array)}");
    }

    public void DemonstrateStackAlloc() {
        const int size = 100;

        // Stack allocation
        int* stackArray = stackalloc int[size];

        for (int i = 0; i < size; i++) {
            stackArray[i] = i * i;
        }

        Console.WriteLine($"Stack array[0]: {stackArray[0]}");
        Console.WriteLine($"Stack array[10]: {stackArray[10]}");
        Console.WriteLine($"Stack array[99]: {stackArray[99]}");

        // Use in method
        ProcessStackArray(stackArray, size);
    }

    private unsafe void ProcessStackArray(int* array, int size) {
        int sum = 0;
        for (int i = 0; i < size; i++) {
            sum += array[i];
        }
        Console.WriteLine($"Sum of squares: {sum}");
    }

    public void DemonstrateStructWithPointers() {
        var buffer = new UnsafeBuffer(1024);
        buffer.FillWithPattern();
        Console.WriteLine($"Buffer checksum: {buffer.CalculateChecksum()}");
    }
}

public unsafe struct UnsafeBuffer {
    private fixed byte _data[1024];

    public void FillWithPattern() {
        fixed (byte* ptr = _data) {
            for (int i = 0; i < 1024; i++) {
                ptr[i] = (byte)(i % 256);
            }
        }
    }

    public int CalculateChecksum() {
        int checksum = 0;
        fixed (byte* ptr = _data) {
            for (int i = 0; i < 1024; i++) {
                checksum += ptr[i];
            }
        }
        return checksum;
    }
}

// P/Invoke and Native Interop
public class PInvokeDemo {
    [DllImport("kernel32.dll", SetLastError = true)]
    private static extern bool Beep(uint frequency, uint duration);

    [DllImport("user32.dll")]
    private static extern int MessageBox(IntPtr hWnd, string text, string caption, uint type);

    [DllImport("kernel32.dll", CharSet = CharSet.Auto)]
    private static extern int GetWindowsDirectory(StringBuilder lpBuffer, int nSize);

    public void DemonstratePInvoke() {
        // Play system beep
        Console.WriteLine("Playing beep...");
        Beep(800, 200);

        // Get Windows directory
        var buffer = new StringBuilder(260);
        int length = GetWindowsDirectory(buffer, buffer.Capacity);
        Console.WriteLine($"Windows directory: {buffer.ToString()}");

        // Show message box (commented out to avoid blocking)
        // MessageBox(IntPtr.Zero, "Hello from P/Invoke!", "Demo", 0);
    }

    [StructLayout(LayoutKind.Sequential, CharSet = CharSet.Auto)]
    public struct SYSTEM_INFO {
        public ushort wProcessorArchitecture;
        public ushort wReserved;
        public uint dwPageSize;
        public IntPtr lpMinimumApplicationAddress;
        public IntPtr lpMaximumApplicationAddress;
        public IntPtr dwActiveProcessorMask;
        public uint dwNumberOfProcessors;
        public uint dwProcessorType;
        public uint dwAllocationGranularity;
        public ushort wProcessorLevel;
        public ushort wProcessorRevision;
    }

    [DllImport("kernel32.dll")]
    private static extern void GetSystemInfo(ref SYSTEM_INFO lpSystemInfo);

    public void DemonstrateStructMarshalling() {
        var sysInfo = new SYSTEM_INFO();
        GetSystemInfo(ref sysInfo);

        Console.WriteLine($"Processor count: {sysInfo.dwNumberOfProcessors}");
        Console.WriteLine($"Page size: {sysInfo.dwPageSize}");
        Console.WriteLine($"Processor architecture: {sysInfo.wProcessorArchitecture}");
    }
}

// Code Generation with Reflection.Emit
public class CodeGenerationDemo {
    public void DemonstrateDynamicMethod() {
        // Create a dynamic method: (int x, int y) => x + y * 2
        var method = new DynamicMethod("AddAndDouble", typeof(int),
            new[] { typeof(int), typeof(int) }, typeof(CodeGenerationDemo).Module);

        var il = method.GetILGenerator();

        // Load first argument
        il.Emit(OpCodes.Ldarg_0);
        // Load second argument
        il.Emit(OpCodes.Ldarg_1);
        // Load constant 2
        il.Emit(OpCodes.Ldc_I4_2);
        // Multiply y * 2
        il.Emit(OpCodes.Mul);
        // Add x + (y * 2)
        il.Emit(OpCodes.Add);
        // Return
        il.Emit(OpCodes.Ret);

        // Create delegate and execute
        var func = (Func<int, int, int>)method.CreateDelegate(typeof(Func<int, int, int>));
        Console.WriteLine($"Dynamic method result: {func(3, 4)}"); // 3 + 4 * 2 = 11
    }

    public void DemonstrateTypeBuilder() {
        var assemblyName = new AssemblyName("DynamicAssembly");
        var assemblyBuilder = AssemblyBuilder.DefineDynamicAssembly(assemblyName, AssemblyBuilderAccess.Run);
        var moduleBuilder = assemblyBuilder.DefineDynamicModule("DynamicModule");
        var typeBuilder = moduleBuilder.DefineType("DynamicType", TypeAttributes.Public);

        // Add a field
        var fieldBuilder = typeBuilder.DefineField("_value", typeof(int), FieldAttributes.Private);

        // Add a property
        var propertyBuilder = typeBuilder.DefineProperty("Value", PropertyAttributes.None, typeof(int), null);

        // Add getter
        var getterBuilder = typeBuilder.DefineMethod("get_Value", MethodAttributes.Public | MethodAttributes.SpecialName | MethodAttributes.HideBySig, typeof(int), Type.EmptyTypes);
        var getterIL = getterBuilder.GetILGenerator();
        getterIL.Emit(OpCodes.Ldarg_0);
        getterIL.Emit(OpCodes.Ldfld, fieldBuilder);
        getterIL.Emit(OpCodes.Ret);
        propertyBuilder.SetGetMethod(getterBuilder);

        // Add setter
        var setterBuilder = typeBuilder.DefineMethod("set_Value", MethodAttributes.Public | MethodAttributes.SpecialName | MethodAttributes.HideBySig, null, new[] { typeof(int) });
        var setterIL = setterBuilder.GetILGenerator();
        setterIL.Emit(OpCodes.Ldarg_0);
        setterIL.Emit(OpCodes.Ldarg_1);
        setterIL.Emit(OpCodes.Stfld, fieldBuilder);
        setterIL.Emit(OpCodes.Ret);
        propertyBuilder.SetSetMethod(setterBuilder);

        // Create the type
        var dynamicType = typeBuilder.CreateType();

        // Instantiate and use
        var instance = Activator.CreateInstance(dynamicType);
        dynamicType.GetProperty("Value").SetValue(instance, 42);
        var value = (int)dynamicType.GetProperty("Value").GetValue(instance);
        Console.WriteLine($"Dynamic type value: {value}");
    }
}

// Advanced Language Features
public class AdvancedFeaturesDemo {
    public void DemonstrateCallerInfo() {
        LogMessage("This is a test message");
        AnotherMethod();
    }

    private void AnotherMethod() {
        LogMessage("Message from another method");
    }

    private void LogMessage(string message,
        [CallerMemberName] string memberName = "",
        [CallerFilePath] string filePath = "",
        [CallerLineNumber] int lineNumber = 0) {
        Console.WriteLine($"[{Path.GetFileName(filePath)}:{memberName}:{lineNumber}] {message}");
    }

    public void DemonstrateConditionalCompilation() {
        Console.WriteLine("Base functionality");

#if DEBUG
        Console.WriteLine("Debug build - additional logging enabled");
#endif

#if RELEASE
        Console.WriteLine("Release build - optimized");
#endif

        // Platform-specific code
#if NETCOREAPP
        Console.WriteLine(".NET Core specific code");
#endif

#if WINDOWS
        Console.WriteLine("Windows specific code");
#endif
    }

    [Obsolete("This method is deprecated. Use NewMethod instead.", true)]
    public void OldMethod() {
        Console.WriteLine("This should not be called");
    }

    public void NewMethod() {
        Console.WriteLine("This is the new method");
    }
}

// Span<T> and Memory<T>
public class SpanMemoryDemo {
    public void DemonstrateSpan() {
        // Span from array
        int[] array = { 1, 2, 3, 4, 5 };
        Span<int> span = array;

        Console.WriteLine($"Original array: {string.Join(", ", array)}");

        // Modify through span
        span[0] = 10;
        span[4] = 50;

        Console.WriteLine($"Modified array: {string.Join(", ", array)}");

        // Span slicing
        Span<int> slice = span.Slice(1, 3);
        Console.WriteLine($"Slice: {string.Join(", ", slice.ToArray())}");

        // String manipulation with spans
        string text = "Hello, World!";
        ReadOnlySpan<char> textSpan = text.AsSpan();

        var helloSpan = textSpan.Slice(0, 5);
        var worldSpan = textSpan.Slice(7, 5);

        Console.WriteLine($"Hello: '{helloSpan}'");
        Console.WriteLine($"World: '{worldSpan}'");
    }

    public void DemonstrateMemory() {
        // Memory from array
        int[] array = Enumerable.Range(1, 10).ToArray();
        Memory<int> memory = array;

        // Create span from memory
        Span<int> span = memory.Span;
        Console.WriteLine($"Memory span: {string.Join(", ", span.ToArray())}");

        // Memory slicing
        Memory<int> slice = memory.Slice(2, 5);
        Console.WriteLine($"Memory slice: {string.Join(", ", slice.Span.ToArray())}");
    }

    public void DemonstrateStackallocSpan() {
        // Stack-allocated span
        Span<int> stackSpan = stackalloc int[5] { 1, 2, 3, 4, 5 };

        for (int i = 0; i < stackSpan.Length; i++) {
            stackSpan[i] *= 2;
        }

        Console.WriteLine($"Stack span: {string.Join(", ", stackSpan.ToArray())}");
    }

    public void DemonstrateReadOnlySpan() {
        ReadOnlySpan<char> readonlySpan = "This is readonly".AsSpan();

        // Find substring
        int index = readonlySpan.IndexOf("readonly".AsSpan());
        Console.WriteLine($"Found 'readonly' at index: {index}");

        // Case-insensitive search
        bool contains = readonlySpan.Contains("READONLY".AsSpan(), StringComparison.OrdinalIgnoreCase);
        Console.WriteLine($"Contains 'READONLY' (case-insensitive): {contains}");
    }
}

// Function Pointers (C# 9.0+)
public unsafe class FunctionPointersDemo {
    public void DemonstrateFunctionPointers() {
        // Define function pointer type
        delegate*<int, int, int> addPointer = &Add;
        delegate*<int, int, int> multiplyPointer = &Multiply;

        // Call through function pointers
        int result1 = addPointer(5, 3);
        int result2 = multiplyPointer(5, 3);

        Console.WriteLine($"5 + 3 = {result1}");
        Console.WriteLine($"5 * 3 = {result2}");

        // Function pointer to lambda (C# 9.0+)
        var lambda = (int x, int y) => x - y;
        delegate*<int, int, int> subtractPointer = (delegate*<int, int, int>)lambda.Method.MethodHandle.GetFunctionPointer();

        // Note: This is advanced and may not work in all scenarios
        Console.WriteLine("Function pointers demonstrated");
    }

    private static int Add(int a, int b) => a + b;
    private static int Multiply(int a, int b) => a * b;
}

// Module Initializers
// [ModuleInitializer] - Uncomment when using .NET 6+
// public static void InitializeModule() {
//     Console.WriteLine("Module initialized");
// }

// Demonstration
public void DemonstrateAdvancedFeatures() {
    var dynamicDemo = new DynamicProgrammingDemo();
    dynamicDemo.DemonstrateDynamicKeyword();
    dynamicDemo.DemonstrateExpandoObject();
    dynamicDemo.DemonstrateDynamicObject();

    var expressionDemo = new ExpressionTreesDemo();
    expressionDemo.DemonstrateExpressionTrees();
    expressionDemo.DemonstrateExpressionVisitor();
    expressionDemo.DemonstrateLinqProvider();

    var unsafeDemo = new UnsafeCodeDemo();
    unsafeDemo.DemonstratePointers();
    unsafeDemo.DemonstrateStackAlloc();
    unsafeDemo.DemonstrateStructWithPointers();

    var pinvokeDemo = new PInvokeDemo();
    pinvokeDemo.DemonstratePInvoke();
    pinvokeDemo.DemonstrateStructMarshalling();

    var codeGenDemo = new CodeGenerationDemo();
    codeGenDemo.DemonstrateDynamicMethod();
    codeGenDemo.DemonstrateTypeBuilder();

    var advancedDemo = new AdvancedFeaturesDemo();
    advancedDemo.DemonstrateCallerInfo();
    advancedDemo.DemonstrateConditionalCompilation();

    var spanDemo = new SpanMemoryDemo();
    spanDemo.DemonstrateSpan();
    spanDemo.DemonstrateMemory();
    spanDemo.DemonstrateStackallocSpan();
    spanDemo.DemonstrateReadOnlySpan();

    var funcPtrDemo = new FunctionPointersDemo();
    funcPtrDemo.DemonstrateFunctionPointers();
}`,
  keyPoints: [
    'Use dynamic programming when static typing is insufficient',
    'Expression trees enable code analysis and generation',
    'Unsafe code provides direct memory access but requires careful handling',
    'P/Invoke enables calling native code with proper marshaling',
    'Reflection.Emit allows runtime code generation for advanced scenarios',
    'Span<T> and Memory<T> provide memory-efficient APIs',
    'Function pointers offer performance benefits for hot paths',
    'Caller info attributes provide contextual debugging information',
    'Conditional compilation enables platform-specific optimizations',
    'Module initializers handle assembly-level initialization',
  ],
  exercise:
    'Implement a dynamic object that supports method interception and property validation. Create a custom LINQ provider that translates queries to SQL. Build a high-performance parser using Span<T> and unsafe code. Develop a plugin system using Reflection.Emit for runtime assembly loading. Implement a memory-efficient string processing library using ReadOnlySpan<char>. Create a native interop layer for a C library with proper error handling.',
};
