import { Topic } from '../../models/section';

export const abstractClassesInterfacesDeepDiveTopic: Topic = {
  id: 'advanced-oop-abstract-classes-interfaces-deep-dive',
  name: 'Abstract Classes & Interfaces Deep Dive',
  sectionId: 'advanced',
  slug: 'abstract-classes-interfaces-deep-dive',
  explanation: `
    <h3>Advanced Abstract Classes and Interfaces</h3>
    <p>This topic explores the advanced concepts and best practices for using abstract classes and interfaces in C#.</p>

    <h4>Abstract Class Design Patterns</h4>
    <ul>
      <li><strong>Template Method Pattern:</strong> Define skeleton of algorithm in abstract class</li>
      <li><strong>Factory Method Pattern:</strong> Abstract factory methods for object creation</li>
      <li><strong>Strategy Pattern:</strong> Abstract base for interchangeable algorithms</li>
    </ul>

    <h4>Interface Design Principles</h4>
    <ul>
      <li><strong>Interface Segregation:</strong> Keep interfaces focused and minimal</li>
      <li><strong>Dependency Inversion:</strong> Depend on abstractions, not concretions</li>
      <li><strong>Explicit Implementation:</strong> Avoid interface pollution</li>
    </ul>

    <h4>Advanced Interface Features</h4>
    <ul>
      <li><strong>Default Implementations:</strong> C# 8.0+ interface methods</li>
      <li><strong>Static Members:</strong> Static methods and properties in interfaces</li>
      <li><strong>Private Methods:</strong> Internal implementation details</li>
      <li><strong>Covariant Returns:</strong> More specific return types in implementations</li>
    </ul>

    <h4>Abstract vs Interface: When to Use What</h4>
    <ul>
      <li><strong>Use Abstract Classes for:</strong>
        <ul>
          <li>Shared implementation and state</li>
          <li>Common base functionality</li>
          <li>Evolving contracts (adding methods with default implementation)</li>
          <li>Template method patterns</li>
        </ul>
      </li>
      <li><strong>Use Interfaces for:</strong>
        <ul>
          <li>Pure contracts without implementation</li>
          <li>Multiple inheritance scenarios</li>
          <li>Testing with mocks and stubs</li>
          <li>Decoupling dependencies</li>
        </ul>
      </li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;

// Advanced Abstract Class Patterns
public abstract class DocumentProcessor {
    protected string DocumentPath { get; set; }
    protected DocumentMetadata Metadata { get; set; }

    protected DocumentProcessor(string documentPath) {
        DocumentPath = documentPath;
        Metadata = new DocumentMetadata();
    }

    // Template Method Pattern
    public void ProcessDocument() {
        try {
            ValidateDocument();
            LoadDocument();
            ProcessContent();
            SaveResults();
            UpdateMetadata();
        }
        catch (Exception ex) {
            HandleError(ex);
            throw;
        }
        finally {
            Cleanup();
        }
    }

    // Abstract methods that must be implemented
    protected abstract void ValidateDocument();
    protected abstract void LoadDocument();
    protected abstract void ProcessContent();

    // Virtual methods with default implementation
    protected virtual void SaveResults() {
        Console.WriteLine("Saving processing results...");
    }

    protected virtual void UpdateMetadata() {
        Metadata.LastProcessed = DateTime.Now;
        Metadata.ProcessorVersion = GetVersion();
    }

    protected virtual void HandleError(Exception ex) {
        Console.WriteLine($"Error processing document: {ex.Message}");
        LogError(ex);
    }

    protected virtual void Cleanup() {
        // Default cleanup implementation
    }

    // Hook method for subclasses
    protected virtual string GetVersion() {
        return "1.0.0";
    }

    private void LogError(Exception ex) {
        // Log to file, database, etc.
        Console.WriteLine($"[ERROR] {DateTime.Now}: {ex.Message}");
    }
}

public class DocumentMetadata {
    public DateTime Created { get; set; } = DateTime.Now;
    public DateTime LastProcessed { get; set; }
    public string ProcessorVersion { get; set; }
    public int WordCount { get; set; }
    public Dictionary<string, object> CustomProperties { get; } = new Dictionary<string, object>();
}

// Concrete implementation
public class WordDocumentProcessor : DocumentProcessor {
    private string _content;

    public WordDocumentProcessor(string documentPath) : base(documentPath) { }

    protected override void ValidateDocument() {
        if (!DocumentPath.EndsWith(".docx", StringComparison.OrdinalIgnoreCase)) {
            throw new ArgumentException("Invalid file format. Expected .docx");
        }

        if (!File.Exists(DocumentPath)) {
            throw new FileNotFoundException("Document file not found", DocumentPath);
        }
    }

    protected override void LoadDocument() {
        // Simulate loading Word document
        _content = File.ReadAllText(DocumentPath);
        Console.WriteLine("Word document loaded successfully");
    }

    protected override void ProcessContent() {
        // Word-specific processing
        var words = _content.Split(new[] { ' ', '\\n', '\\r' }, StringSplitOptions.RemoveEmptyEntries);
        Metadata.WordCount = words.Length;

        // Remove formatting, extract text, etc.
        _content = _content.ToUpper();
        Console.WriteLine($"Processed {words.Length} words");
    }

    protected override void SaveResults() {
        string outputPath = Path.ChangeExtension(DocumentPath, ".processed.txt");
        File.WriteAllText(outputPath, _content);
        Console.WriteLine($"Results saved to: {outputPath}");
    }

    protected override string GetVersion() {
        return "WordProcessor-2.1.0";
    }
}

// Advanced Interface Features (C# 8.0+)
public interface IDocumentService {
    // Traditional interface members
    bool CanProcess(string filePath);
    Task<DocumentResult> ProcessAsync(string filePath);

    // Default implementation
    string GetSupportedExtensions() {
        return GetType().Name switch {
            "WordDocumentService" => ".docx,.doc",
            "PdfDocumentService" => ".pdf",
            "TextDocumentService" => ".txt,.md",
            _ => string.Empty
        };
    }

    // Static members
    static bool IsValidExtension(string extension) {
        return extension switch {
            ".docx" or ".doc" or ".pdf" or ".txt" or ".md" => true,
            _ => false
        };
    }

    static IDocumentService CreateService(string filePath) {
        string extension = Path.GetExtension(filePath).ToLower();

        return extension switch {
            ".docx" or ".doc" => new WordDocumentService(),
            ".pdf" => new PdfDocumentService(),
            ".txt" or ".md" => new TextDocumentService(),
            _ => throw new NotSupportedException($"Extension {extension} is not supported")
        };
    }

    // Private method (implementation detail)
    private bool ValidateFile(string filePath) {
        return File.Exists(filePath) && IsValidExtension(Path.GetExtension(filePath));
    }
}

public interface IAsyncDocumentService : IDocumentService {
    // Covariant return type (more specific than base interface)
    new Task<DetailedDocumentResult> ProcessAsync(string filePath);
}

public class DocumentResult {
    public bool Success { get; set; }
    public string Message { get; set; }
    public TimeSpan ProcessingTime { get; set; }
}

public class DetailedDocumentResult : DocumentResult {
    public int PageCount { get; set; }
    public int WordCount { get; set; }
    public Dictionary<string, int> WordFrequency { get; set; }
}

// Interface segregation example
public interface IReadable {
    string ReadAll();
    IEnumerable<string> ReadLines();
}

public interface IWritable {
    void Write(string content);
    void WriteLines(IEnumerable<string> lines);
}

public interface ISeekable {
    void Seek(long position);
    long GetPosition();
}

public interface IRandomAccessFile : IReadable, IWritable, ISeekable {
    void Flush();
}

// Multiple inheritance with interfaces
public interface ILoggable {
    void Log(string message);
}

public interface IMeasurable {
    double GetSize();
}

public interface IVersionable {
    Version GetVersion();
    void SetVersion(Version version);
}

public abstract class FileSystemItem : ILoggable, IMeasurable, IVersionable {
    public string Name { get; set; }
    public string Path { get; set; }
    protected Version _version = new Version(1, 0, 0);

    public abstract double GetSize();

    public Version GetVersion() => _version;

    public void SetVersion(Version version) {
        _version = version;
        Log($"Version updated to {version}");
    }

    public void Log(string message) {
        Console.WriteLine($"[{Name}] {message}");
    }
}

public class DocumentFile : FileSystemItem, IRandomAccessFile {
    private string _content = string.Empty;

    public DocumentFile(string name, string path) {
        Name = name;
        Path = path;
    }

    public string ReadAll() => _content;

    public IEnumerable<string> ReadLines() => _content.Split('\\n');

    public void Write(string content) => _content = content;

    public void WriteLines(IEnumerable<string> lines) {
        _content = string.Join(Environment.NewLine, lines);
    }

    public void Seek(long position) {
        // Implementation for seeking
        Log($"Seeking to position {position}");
    }

    public long GetPosition() {
        // Return current position
        return 0;
    }

    public void Flush() {
        // Save to disk
        File.WriteAllText(Path, _content);
        Log("Content flushed to disk");
    }

    public override double GetSize() => _content.Length * sizeof(char);
}

// Explicit interface implementation for conflict resolution
public interface IShape {
    double CalculateArea();
}

public interface IShape2D : IShape {
    double CalculatePerimeter();
}

public interface IShape3D : IShape {
    double CalculateVolume();
}

public class Cube : IShape2D, IShape3D {
    public double Side { get; set; }

    public Cube(double side) {
        Side = side;
    }

    // Explicit implementation to resolve ambiguity
    double IShape.CalculateArea() {
        return CalculateSurfaceArea();
    }

    double IShape2D.CalculateArea() {
        return Side * Side;
    }

    public double CalculatePerimeter() {
        return 4 * Side;
    }

    public double CalculateVolume() {
        return Side * Side * Side;
    }

    public double CalculateSurfaceArea() {
        return 6 * Side * Side;
    }
}

// Abstract factory pattern with interfaces
public interface IDocumentFactory {
    IDocumentService CreateService();
    IDocumentValidator CreateValidator();
    IDocumentFormatter CreateFormatter();
}

public interface IDocumentValidator {
    bool Validate(string content);
}

public interface IDocumentFormatter {
    string Format(string content);
}

public class WordDocumentFactory : IDocumentFactory {
    public IDocumentService CreateService() => new WordDocumentService();
    public IDocumentValidator CreateValidator() => new WordDocumentValidator();
    public IDocumentFormatter CreateFormatter() => new WordDocumentFormatter();
}

public class WordDocumentValidator : IDocumentValidator {
    public bool Validate(string content) {
        // Word-specific validation
        return !string.IsNullOrEmpty(content) && content.Length > 10;
    }
}

public class WordDocumentFormatter : IDocumentFormatter {
    public string Format(string content) {
        // Word-specific formatting
        return content.ToUpper();
    }
}

// Strategy pattern with abstract classes
public abstract class CompressionStrategy {
    public abstract string Name { get; }
    public abstract byte[] Compress(byte[] data);
    public abstract byte[] Decompress(byte[] compressedData);
}

public class GZipCompressionStrategy : CompressionStrategy {
    public override string Name => "GZIP";

    public override byte[] Compress(byte[] data) {
        using (var output = new MemoryStream())
        using (var gzip = new GZipStream(output, CompressionMode.Compress)) {
            gzip.Write(data, 0, data.Length);
            return output.ToArray();
        }
    }

    public override byte[] Decompress(byte[] compressedData) {
        using (var input = new MemoryStream(compressedData))
        using (var gzip = new GZipStream(input, CompressionMode.Decompress))
        using (var output = new MemoryStream()) {
            gzip.CopyTo(output);
            return output.ToArray();
        }
    }
}

public class DocumentCompressor {
    private readonly CompressionStrategy _strategy;

    public DocumentCompressor(CompressionStrategy strategy) {
        _strategy = strategy;
    }

    public byte[] CompressDocument(string content) {
        byte[] data = Encoding.UTF8.GetBytes(content);
        return _strategy.Compress(data);
    }

    public string DecompressDocument(byte[] compressedData) {
        byte[] data = _strategy.Decompress(compressedData);
        return Encoding.UTF8.GetString(data);
    }
}

// Demonstration
public void DemonstrateAdvancedAbstractClassesAndInterfaces() {
    // Template method pattern
    Console.WriteLine("=== Template Method Pattern ===");
    var wordProcessor = new WordDocumentProcessor("sample.docx");
    wordProcessor.ProcessDocument();

    // Interface factory pattern
    Console.WriteLine("\\n=== Interface Factory Pattern ===");
    var factory = new WordDocumentFactory();
    var service = factory.CreateService();
    var validator = factory.CreateValidator();
    var formatter = factory.CreateFormatter();

    string testContent = "Hello World";
    bool isValid = validator.Validate(testContent);
    string formatted = formatter.Format(testContent);

    Console.WriteLine($"Content valid: {isValid}");
    Console.WriteLine($"Formatted content: {formatted}");

    // Multiple interface implementation
    Console.WriteLine("\\n=== Multiple Interface Implementation ===");
    var docFile = new DocumentFile("test.txt", "C:\\\\temp\\\\test.txt");
    docFile.Write("Hello from interface implementation");
    docFile.Log("File created");

    // Explicit interface implementation
    Console.WriteLine("\\n=== Explicit Interface Implementation ===");
    Cube cube = new Cube(5);
    IShape shape = cube;
    IShape2D shape2D = cube;
    IShape3D shape3D = cube;

    Console.WriteLine($"IShape area: {shape.CalculateArea()}");
    Console.WriteLine($"IShape2D area: {shape2D.CalculateArea()}");
    Console.WriteLine($"IShape3D volume: {shape3D.CalculateVolume()}");

    // Strategy pattern
    Console.WriteLine("\\n=== Strategy Pattern ===");
    var compressor = new DocumentCompressor(new GZipCompressionStrategy());
    string originalText = "This is a test document that will be compressed and decompressed.";
    byte[] compressed = compressor.CompressDocument(originalText);
    string decompressed = compressor.DecompressDocument(compressed);

    Console.WriteLine($"Original length: {originalText.Length}");
    Console.WriteLine($"Compressed length: {compressed.Length}");
    Console.WriteLine($"Compression ratio: {(double)compressed.Length / originalText.Length:P2}");
    Console.WriteLine($"Decompressed matches: {originalText == decompressed}");
}`,
  keyPoints: [
    'Abstract classes provide shared implementation, interfaces define contracts',
    'Use template method pattern for algorithm skeletons',
    'Interface default implementations (C# 8.0+) reduce implementation burden',
    'Explicit interface implementation resolves method conflicts',
    'Interface segregation principle keeps interfaces focused',
    'Abstract classes for evolving APIs, interfaces for multiple inheritance',
    'Factory patterns work well with both abstract classes and interfaces',
  ],
  exercise:
    'Design a plugin system for document processing. Create interfaces for IPlugin, IPluginMetadata, and IPluginLoader. Implement an abstract base class PluginBase that implements common functionality. Create concrete plugins for different document types (PDF, Word, Excel) that demonstrate interface segregation and the template method pattern.',
};
