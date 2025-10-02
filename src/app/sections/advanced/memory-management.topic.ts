import { Topic } from '../../models/section';

export const memoryManagementTopic: Topic = {
  id: 'advanced-memory-management',
  name: 'Memory Management',
  sectionId: 'advanced',
  slug: 'memory-management',
  explanation: `
    <h3>Advanced Memory Management in C#</h3>
    <p>Understanding memory management is crucial for building high-performance applications. C# uses automatic memory management with garbage collection, but developers need to understand how it works and how to optimize memory usage.</p>

    <h4>Garbage Collection Fundamentals</h4>
    <ul>
      <li><strong>Generations:</strong> Gen 0, Gen 1, Gen 2, and Large Object Heap (LOH)</li>
      <li><strong>GC Roots:</strong> References that keep objects alive</li>
      <li><strong>Finalization:</strong> Cleanup before garbage collection</li>
      <li><strong>Dispose Pattern:</strong> Deterministic cleanup</li>
    </ul>

    <h4>Memory Optimization Techniques</h4>
    <ul>
      <li><strong>Object Pooling:</strong> Reuse expensive objects</li>
      <li><strong>Structs vs Classes:</strong> Value types vs reference types</li>
      <li><strong>String Interning:</strong> Share string instances</li>
      <li><strong>Weak References:</strong> Non-owning object references</li>
      <li><strong>Memory-mapped Files:</strong> Efficient large file handling</li>
    </ul>

    <h4>Performance Monitoring</h4>
    <ul>
      <li><strong>GC Notifications:</strong> Monitor garbage collection events</li>
      <li><strong>Memory Profilers:</strong> Analyze memory usage patterns</li>
      <li><strong>Performance Counters:</strong> System-level memory metrics</li>
      <li><strong>Memory Dumps:</strong> Analyze memory state at runtime</li>
    </ul>

    <h4>Common Memory Issues</h4>
    <ul>
      <li><strong>Memory Leaks:</strong> Objects not being garbage collected</li>
      <li><strong>Fragmentation:</strong> Memory becoming inefficiently organized</li>
      <li><strong>GC Pressure:</strong> Excessive garbage collection overhead</li>
      <li><strong>Large Object Heap Issues:</strong> Problems with large objects</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Runtime;
using System.Runtime.CompilerServices;
using System.Threading;

// Garbage Collection Fundamentals
public class GCFundamentals {
    public void DemonstrateGenerations() {
        Console.WriteLine("=== Garbage Collection Generations ===");

        Console.WriteLine("Gen 0 collections: " + GC.CollectionCount(0));
        Console.WriteLine("Gen 1 collections: " + GC.CollectionCount(1));
        Console.WriteLine("Gen 2 collections: " + GC.CollectionCount(2));

        // Create some objects
        for (int i = 0; i < 1000; i++) {
            var obj = new object();
            // obj goes out of scope immediately
        }

        Console.WriteLine("After creating objects:");
        Console.WriteLine("Gen 0 collections: " + GC.CollectionCount(0));

        // Force GC to see the effect
        GC.Collect(0, GCCollectionMode.Forced);
        Console.WriteLine("After Gen 0 GC:");
        Console.WriteLine("Gen 0 collections: " + GC.CollectionCount(0));
    }

    public void DemonstrateGCNotification() {
        Console.WriteLine("\\n=== GC Notifications ===");

        // Register for GC notifications
        GC.RegisterForFullGCNotification(10, 10);

        var notificationTask = Task.Run(() => {
            while (true) {
                var status = GC.WaitForFullGCApproach();
                if (status == GCNotificationStatus.Succeeded) {
                    Console.WriteLine("GC approaching - consider reducing allocations");
                }

                status = GC.WaitForFullGCComplete();
                if (status == GCNotificationStatus.Succeeded) {
                    Console.WriteLine("Full GC completed");
                }

                Thread.Sleep(100);
            }
        });

        // Create some GC pressure
        for (int i = 0; i < 10; i++) {
            var list = new List<byte[]>(1000);
            for (int j = 0; j < 1000; j++) {
                list.Add(new byte[1000]); // Allocate large objects
            }
            // Let them go out of scope
        }

        GC.CancelFullGCNotification();
    }

    public void DemonstrateMemoryPressure() {
        Console.WriteLine("\\n=== Memory Pressure ===");

        var beforeGen0 = GC.CollectionCount(0);
        var beforeGen1 = GC.CollectionCount(1);
        var beforeGen2 = GC.CollectionCount(2);

        // Add memory pressure
        GC.AddMemoryPressure(10 * 1024 * 1024); // 10MB pressure

        // Allocate some objects
        for (int i = 0; i < 10000; i++) {
            var obj = new string('x', 100);
        }

        // Remove memory pressure
        GC.RemoveMemoryPressure(10 * 1024 * 1024);

        var afterGen0 = GC.CollectionCount(0);
        var afterGen1 = GC.CollectionCount(1);
        var afterGen2 = GC.CollectionCount(2);

        Console.WriteLine($"GC Collections - Gen0: {afterGen0 - beforeGen0}, Gen1: {afterGen1 - beforeGen1}, Gen2: {afterGen2 - beforeGen2}");
    }
}

// Dispose Pattern and Finalization
public class ResourceManagement {
    public void DemonstrateDisposePattern() {
        Console.WriteLine("=== Dispose Pattern ===");

        using (var resource = new ManagedResource("Resource1")) {
            resource.UseResource();
        } // Dispose is called automatically

        Console.WriteLine("Resource1 disposed");

        // Manual dispose
        var resource2 = new ManagedResource("Resource2");
        try {
            resource2.UseResource();
        } finally {
            resource2.Dispose();
        }
    }

    public void DemonstrateFinalization() {
        Console.WriteLine("\\n=== Finalization ===");

        // Create object with finalizer
        var finalizedObj = new FinalizedObject("FinalizedObject1");

        // Let it go out of scope
        finalizedObj = null;

        // Force GC to see finalization
        GC.Collect();
        GC.WaitForPendingFinalizers();

        Console.WriteLine("Finalization completed");
    }
}

public class ManagedResource : IDisposable {
    private string _name;
    private bool _disposed = false;

    public ManagedResource(string name) {
        _name = name;
        Console.WriteLine(_name + " created");
    }

    public void UseResource() {
        if (_disposed) throw new ObjectDisposedException(_name);
        Console.WriteLine(_name + " is being used");
    }

    public void Dispose() {
        Dispose(true);
        GC.SuppressFinalize(this);
    }

    protected virtual void Dispose(bool disposing) {
        if (_disposed) return;

        if (disposing) {
            // Free managed resources
            Console.WriteLine(_name + " - disposing managed resources");
        }

        // Free unmanaged resources
        Console.WriteLine(_name + " - disposing unmanaged resources");

        _disposed = true;
    }

    ~ManagedResource() {
        Dispose(false);
    }
}

public class FinalizedObject {
    private string _name;

    public FinalizedObject(string name) {
        _name = name;
        Console.WriteLine(_name + " created");
    }

    ~FinalizedObject() {
        Console.WriteLine(_name + " finalized");
        // Note: Don't access managed objects in finalizer
        // as they may have already been collected
    }
}

// Object Pooling
public class ObjectPool<T> where T : class, new() {
    private readonly Queue<T> _pool = new Queue<T>();
    private readonly object _lock = new object();
    private readonly int _maxSize;

    public ObjectPool(int maxSize = 10) {
        _maxSize = maxSize;
    }

    public T Get() {
        lock (_lock) {
            if (_pool.Count > 0) {
                return _pool.Dequeue();
            }
        }
        return new T();
    }

    public void Return(T obj) {
        lock (_lock) {
            if (_pool.Count < _maxSize) {
                _pool.Enqueue(obj);
            }
        }
    }
}

public class ExpensiveObject {
    public int Id { get; set; }
    public byte[] Data { get; set; }

    public ExpensiveObject() {
        Data = new byte[1024]; // 1KB of data
        // Simulate expensive initialization
        Thread.Sleep(10);
    }

    public void Reset() {
        Id = 0;
        Array.Clear(Data, 0, Data.Length);
    }
}

public class ObjectPoolingDemo {
    public void DemonstrateObjectPooling() {
        Console.WriteLine("=== Object Pooling ===");

        var pool = new ObjectPool<ExpensiveObject>(5);

        var stopwatch = Stopwatch.StartNew();

        // Without pooling
        for (int i = 0; i < 10; i++) {
            var obj = new ExpensiveObject();
            obj.Id = i;
            // Use object
        }

        stopwatch.Stop();
        var withoutPoolingTime = stopwatch.ElapsedMilliseconds;

        stopwatch.Restart();

        // With pooling
        for (int i = 0; i < 10; i++) {
            var obj = pool.Get();
            obj.Id = i;
            // Use object
            pool.Return(obj);
        }

        stopwatch.Stop();
        var withPoolingTime = stopwatch.ElapsedMilliseconds;

        Console.WriteLine($"Without pooling: {withoutPoolingTime}ms");
        Console.WriteLine($"With pooling: {withPoolingTime}ms");
        Console.WriteLine($"Improvement: {withoutPoolingTime - withPoolingTime}ms");
    }
}

// Structs vs Classes for Memory Efficiency
public struct PointStruct {
    public int X { get; set; }
    public int Y { get; set; }

    public PointStruct(int x, int y) {
        X = x;
        Y = y;
    }

    public double DistanceFromOrigin() {
        return Math.Sqrt(X * X + Y * Y);
    }
}

public class PointClass {
    public int X { get; set; }
    public int Y { get; set; }

    public PointClass(int x, int y) {
        X = x;
        Y = y;
    }

    public double DistanceFromOrigin() {
        return Math.Sqrt(X * X + Y * Y);
    }
}

public class StructVsClassDemo {
    public void DemonstrateStructVsClass() {
        Console.WriteLine("=== Structs vs Classes ===");

        const int count = 100000;

        // Using structs
        var structStopwatch = Stopwatch.StartNew();
        var structArray = new PointStruct[count];
        for (int i = 0; i < count; i++) {
            structArray[i] = new PointStruct(i, i);
            var distance = structArray[i].DistanceFromOrigin();
        }
        structStopwatch.Stop();

        // Using classes
        var classStopwatch = Stopwatch.StartNew();
        var classArray = new PointClass[count];
        for (int i = 0; i < count; i++) {
            classArray[i] = new PointClass(i, i);
            var distance = classArray[i].DistanceFromOrigin();
        }
        classStopwatch.Stop();

        Console.WriteLine($"Structs time: {structStopwatch.ElapsedMilliseconds}ms");
        Console.WriteLine($"Classes time: {classStopwatch.ElapsedMilliseconds}ms");

        // Memory usage difference
        var structSize = System.Runtime.InteropServices.Marshal.SizeOf<PointStruct>();
        var classSize = IntPtr.Size + sizeof(int) * 2; // Reference + two ints

        Console.WriteLine($"Struct size: {structSize} bytes");
        Console.WriteLine($"Class size: ~{classSize} bytes per instance");
        Console.WriteLine($"Memory savings with structs: {(classSize - structSize) * count} bytes");
    }
}

// Weak References
public class WeakReferenceDemo {
    public void DemonstrateWeakReferences() {
        Console.WriteLine("=== Weak References ===");

        var cache = new Dictionary<string, WeakReference>();

        // Create objects and store weak references
        for (int i = 0; i < 10; i++) {
            var data = new LargeDataObject { Id = i, Data = new byte[1024] };
            cache["key" + i] = new WeakReference(data);
        }

        Console.WriteLine("Created 10 objects with weak references");

        // Access some objects
        for (int i = 0; i < 5; i++) {
            if (cache["key" + i].IsAlive) {
                var data = cache["key" + i].Target as LargeDataObject;
                Console.WriteLine($"Accessed object {data?.Id}");
            }
        }

        // Force GC
        GC.Collect();

        // Check how many are still alive
        int aliveCount = cache.Count(kvp => kvp.Value.IsAlive);
        Console.WriteLine($"Objects still alive after GC: {aliveCount}");
    }
}

public class LargeDataObject {
    public int Id { get; set; }
    public byte[] Data { get; set; }
}

// String Interning
public class StringInterningDemo {
    public void DemonstrateStringInterning() {
        Console.WriteLine("=== String Interning ===");

        // Create multiple identical strings
        var strings = new List<string>();
        for (int i = 0; i < 1000; i++) {
            strings.Add("CommonString" + (i % 10)); // Only 10 unique strings
        }

        // Without interning
        var uniqueStrings = strings.Distinct().Count();
        Console.WriteLine($"Unique strings without interning: {uniqueStrings}");

        // With interning
        var internedStrings = strings.Select(s => string.Intern(s)).ToList();
        var uniqueInternedStrings = internedStrings.Distinct().Count();
        Console.WriteLine($"Unique strings with interning: {uniqueInternedStrings}");

        // Check if strings are the same reference
        var str1 = string.Intern("TestString");
        var str2 = string.Intern("TestString");
        Console.WriteLine($"Interned strings are same reference: {ReferenceEquals(str1, str2)}");
    }
}

// Memory-mapped Files
public class MemoryMappedFilesDemo {
    public void DemonstrateMemoryMappedFiles() {
        Console.WriteLine("=== Memory-Mapped Files ===");

        string filePath = "large_data.dat";

        // Create a large file
        using (var file = File.Create(filePath)) {
            var data = new byte[1024 * 1024]; // 1MB
            new Random().NextBytes(data);
            file.Write(data, 0, data.Length);
        }

        Console.WriteLine("Created 1MB file");

        // Memory-map the file
        using (var mmf = System.IO.MemoryMappedFiles.MemoryMappedFile.CreateFromFile(filePath)) {
            using (var accessor = mmf.CreateViewAccessor()) {
                // Read data without loading entire file into memory
                var buffer = new byte[100];
                accessor.ReadArray(0, buffer, 0, buffer.Length);

                Console.WriteLine("Read first 100 bytes from memory-mapped file");
                Console.WriteLine("First byte: " + buffer[0]);
            }
        }

        // Clean up
        File.Delete(filePath);
    }
}

// Memory Analysis Tools
public class MemoryAnalysis {
    public void DemonstrateMemoryAnalysis() {
        Console.WriteLine("=== Memory Analysis ===");

        // Get current memory usage
        var beforeMemory = GC.GetTotalMemory(false);
        Console.WriteLine($"Memory before allocations: {beforeMemory} bytes");

        // Allocate some memory
        var list = new List<byte[]>();
        for (int i = 0; i < 100; i++) {
            list.Add(new byte[1024]); // 1KB each
        }

        var afterMemory = GC.GetTotalMemory(false);
        Console.WriteLine($"Memory after allocations: {afterMemory} bytes");
        Console.WriteLine($"Allocated: {afterMemory - beforeMemory} bytes");

        // Force GC
        GC.Collect();
        var afterGCMemory = GC.GetTotalMemory(true);
        Console.WriteLine($"Memory after GC: {afterGCMemory} bytes");

        // Get generation sizes
        Console.WriteLine($"Gen 0 size: {GetGenerationSize(0)} bytes");
        Console.WriteLine($"Gen 1 size: {GetGenerationSize(1)} bytes");
        Console.WriteLine($"Gen 2 size: {GetGenerationSize(2)} bytes");
        Console.WriteLine($"LOH size: {GetGenerationSize(3)} bytes");
    }

    private long GetGenerationSize(int generation) {
        // This is a simplified version. In real scenarios,
        // you'd use performance counters or profiling APIs
        GC.Collect(generation, GCCollectionMode.Forced);
        return GC.GetTotalMemory(true);
    }
}

// Large Object Heap Considerations
public class LOHConsiderations {
    public void DemonstrateLOH() {
        Console.WriteLine("=== Large Object Heap (LOH) ===");

        // Objects >= 85KB go to LOH
        const int largeObjectSize = 100 * 1024; // 100KB

        var largeObjects = new List<byte[]>();

        for (int i = 0; i < 10; i++) {
            largeObjects.Add(new byte[largeObjectSize]);
            Console.WriteLine($"Created large object {i + 1} ({largeObjectSize} bytes)");
        }

        // Clear references
        largeObjects.Clear();

        // LOH is only collected in Gen 2 collections
        Console.WriteLine("Cleared references, forcing Gen 2 GC...");
        GC.Collect(2, GCCollectionMode.Forced);

        Console.WriteLine("LOH objects should be collected");
    }
}

// Demonstration
public void DemonstrateMemoryManagement() {
    var gcFundamentals = new GCFundamentals();
    gcFundamentals.DemonstrateGenerations();
    gcFundamentals.DemonstrateGCNotification();
    gcFundamentals.DemonstrateMemoryPressure();

    var resourceManagement = new ResourceManagement();
    resourceManagement.DemonstrateDisposePattern();
    resourceManagement.DemonstrateFinalization();

    var objectPooling = new ObjectPoolingDemo();
    objectPooling.DemonstrateObjectPooling();

    var structVsClass = new StructVsClassDemo();
    structVsClass.DemonstrateStructVsClass();

    var weakRefs = new WeakReferenceDemo();
    weakRefs.DemonstrateWeakReferences();

    var stringInterning = new StringInterningDemo();
    stringInterning.DemonstrateStringInterning();

    var memoryMapped = new MemoryMappedFilesDemo();
    memoryMapped.DemonstrateMemoryMappedFiles();

    var memoryAnalysis = new MemoryAnalysis();
    memoryAnalysis.DemonstrateMemoryAnalysis();

    var lohDemo = new LOHConsiderations();
    lohDemo.DemonstrateLOH();
}`,
  keyPoints: [
    'Garbage collection has three generations: Gen 0, 1, 2, and LOH',
    'Use Dispose pattern for deterministic cleanup of unmanaged resources',
    'Object pooling reduces GC pressure for expensive objects',
    'Structs are more memory-efficient than classes for small objects',
    'Weak references allow caching without preventing GC',
    'String interning can reduce memory usage for repeated strings',
    'Memory-mapped files enable efficient large file processing',
    'Monitor GC collections and memory usage for performance tuning',
    'Large objects (>=85KB) go to LOH and are collected less frequently',
    'Profile memory usage to identify leaks and optimization opportunities',
  ],
  exercise:
    'Implement a custom memory pool that efficiently manages objects of varying sizes. Create a weak reference cache that automatically cleans up expired entries. Build a memory profiler that tracks object allocations and GC statistics. Develop a large object heap optimizer that compacts and defragments LOH memory. Design a memory-aware data structure that adapts its strategy based on available memory.',
};
