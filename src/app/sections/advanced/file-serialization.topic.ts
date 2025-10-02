import { Topic } from '../../models/section';

export const fileSerializationTopic: Topic = {
  id: 'advanced-file-serialization',
  name: 'File and Serialization',
  sectionId: 'advanced',
  slug: 'file-serialization',
  explanation: `
    <h3>File I/O and Serialization in C#</h3>
    <p>File operations and serialization are essential for data persistence and communication. C# provides comprehensive APIs for working with files, streams, and various serialization formats.</p>

    <h4>File I/O Fundamentals</h4>
    <ul>
      <li><strong>Stream:</strong> Abstract base class for byte sequences</li>
      <li><strong>FileStream:</strong> Reads/writes bytes to files</li>
      <li><strong>StreamReader/StreamWriter:</strong> Text-based I/O</li>
      <li><strong>BinaryReader/BinaryWriter:</strong> Binary data I/O</li>
      <li><strong>MemoryStream:</strong> In-memory byte buffer</li>
    </ul>

    <h4>Serialization Types</h4>
    <ul>
      <li><strong>Binary Serialization:</strong> Compact, fast, .NET-specific</li>
      <li><strong>XML Serialization:</strong> Human-readable, interoperable</li>
      <li><strong>JSON Serialization:</strong> Lightweight, web-friendly</li>
      <li><strong>SOAP Serialization:</strong> Web services standard</li>
      <li><strong>Custom Serialization:</strong> Full control over process</li>
    </ul>

    <h4>Advanced File Operations</h4>
    <ul>
      <li><strong>Async File I/O:</strong> Non-blocking file operations</li>
      <li><strong>Memory-Mapped Files:</strong> Efficient large file handling</li>
      <li><strong>File Watching:</strong> Monitor file system changes</li>
      <li><strong>Compression:</strong> Reduce file sizes</li>
      <li><strong>Encryption:</strong> Secure file storage</li>
    </ul>

    <h4>Best Practices</h4>
    <ul>
      <li>Use using statements for proper resource disposal</li>
      <li>Prefer async methods for I/O operations</li>
      <li>Handle exceptions appropriately</li>
      <li>Consider file locking and concurrency</li>
      <li>Validate file paths and permissions</li>
      <li>Use appropriate buffer sizes</li>
      <li>Consider memory usage for large files</li>
    </ul>
  `,
  codeExample: `using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Runtime.Serialization;
using System.Runtime.Serialization.Formatters.Binary;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Xml.Serialization;

// File I/O Basics
public class FileIOBasics {
    public void DemonstrateFileOperations() {
        string filePath = "sample.txt";
        string content = "Hello, World!\nThis is a sample file.";

        try {
            // Write to file
            File.WriteAllText(filePath, content);
            Console.WriteLine("File written successfully");

            // Read from file
            string readContent = File.ReadAllText(filePath);
            Console.WriteLine("File content: " + readContent);

            // Append to file
            File.AppendAllText(filePath, "\nAppended content");
            Console.WriteLine("Content appended");

            // Check file properties
            var fileInfo = new FileInfo(filePath);
            Console.WriteLine($"File size: {fileInfo.Length} bytes");
            Console.WriteLine($"Created: {fileInfo.CreationTime}");
            Console.WriteLine($"Modified: {fileInfo.LastWriteTime}");

        } catch (Exception ex) {
            Console.WriteLine("File operation error: " + ex.Message);
        } finally {
            // Clean up
            if (File.Exists(filePath)) {
                File.Delete(filePath);
                Console.WriteLine("File cleaned up");
            }
        }
    }

    public void DemonstrateStreamOperations() {
        string filePath = "stream_sample.txt";

        try {
            // Using FileStream with StreamWriter
            using (var fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write)) {
                using (var writer = new StreamWriter(fileStream)) {
                    writer.WriteLine("Line 1");
                    writer.WriteLine("Line 2");
                    writer.WriteLine("Line 3");
                }
            }

            // Using FileStream with StreamReader
            using (var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read)) {
                using (var reader = new StreamReader(fileStream)) {
                    string line;
                    while ((line = reader.ReadLine()) != null) {
                        Console.WriteLine("Read: " + line);
                    }
                }
            }

        } catch (Exception ex) {
            Console.WriteLine("Stream operation error: " + ex.Message);
        } finally {
            if (File.Exists(filePath)) {
                File.Delete(filePath);
            }
        }
    }

    public async Task DemonstrateAsyncFileOperations() {
        string filePath = "async_sample.txt";
        string content = string.Join("\n", Enumerable.Range(1, 1000).Select(i => $"Line {i}"));

        try {
            // Async write
            await File.WriteAllTextAsync(filePath, content);
            Console.WriteLine("Async write completed");

            // Async read
            string readContent = await File.ReadAllTextAsync(filePath);
            Console.WriteLine($"Read {readContent.Split('\n').Length} lines asynchronously");

            // Async read lines
            var lines = await File.ReadAllLinesAsync(filePath);
            Console.WriteLine($"First line: {lines.FirstOrDefault()}");
            Console.WriteLine($"Last line: {lines.LastOrDefault()}");

        } catch (Exception ex) {
            Console.WriteLine("Async file operation error: " + ex.Message);
        } finally {
            if (File.Exists(filePath)) {
                File.Delete(filePath);
            }
        }
    }
}

// Binary Serialization
[Serializable]
public class Person {
    public string Name { get; set; }
    public int Age { get; set; }
    public List<string> Hobbies { get; set; }

    public Person() {
        Hobbies = new List<string>();
    }

    public override string ToString() {
        return $"{Name} ({Age} years old) - Hobbies: {string.Join(", ", Hobbies)}";
    }
}

public class BinarySerializationDemo {
    public void DemonstrateBinarySerialization() {
        string filePath = "person.bin";
        var person = new Person {
            Name = "John Doe",
            Age = 30,
            Hobbies = new List<string> { "Reading", "Gaming", "Cooking" }
        };

        try {
            // Serialize
            using (var stream = new FileStream(filePath, FileMode.Create)) {
                var formatter = new BinaryFormatter();
                formatter.Serialize(stream, person);
            }
            Console.WriteLine("Person serialized to binary");

            // Deserialize
            using (var stream = new FileStream(filePath, FileMode.Open)) {
                var formatter = new BinaryFormatter();
                var deserializedPerson = (Person)formatter.Deserialize(stream);
                Console.WriteLine("Deserialized person: " + deserializedPerson);
            }

        } catch (Exception ex) {
            Console.WriteLine("Binary serialization error: " + ex.Message);
        } finally {
            if (File.Exists(filePath)) {
                File.Delete(filePath);
            }
        }
    }
}

// XML Serialization
[XmlRoot("Person")]
public class XmlPerson {
    [XmlElement("FullName")]
    public string Name { get; set; }

    [XmlElement("YearsOld")]
    public int Age { get; set; }

    [XmlArray("Hobbies")]
    [XmlArrayItem("Hobby")]
    public List<string> Hobbies { get; set; }

    public XmlPerson() {
        Hobbies = new List<string>();
    }
}

public class XmlSerializationDemo {
    public void DemonstrateXmlSerialization() {
        string filePath = "person.xml";
        var person = new XmlPerson {
            Name = "Jane Smith",
            Age = 25,
            Hobbies = new List<string> { "Painting", "Music", "Travel" }
        };

        try {
            // Serialize
            var serializer = new XmlSerializer(typeof(XmlPerson));
            using (var writer = new StreamWriter(filePath)) {
                serializer.Serialize(writer, person);
            }
            Console.WriteLine("Person serialized to XML");

            // Display XML content
            string xmlContent = File.ReadAllText(filePath);
            Console.WriteLine("XML Content:");
            Console.WriteLine(xmlContent);

            // Deserialize
            using (var reader = new StreamReader(filePath)) {
                var deserializedPerson = (XmlPerson)serializer.Deserialize(reader);
                Console.WriteLine("Deserialized person: " + deserializedPerson.Name);
            }

        } catch (Exception ex) {
            Console.WriteLine("XML serialization error: " + ex.Message);
        } finally {
            if (File.Exists(filePath)) {
                File.Delete(filePath);
            }
        }
    }
}

// JSON Serialization
public class JsonPerson {
    public string Name { get; set; }
    public int Age { get; set; }
    public List<string> Hobbies { get; set; }
    public Address Address { get; set; }

    public JsonPerson() {
        Hobbies = new List<string>();
    }
}

public class Address {
    public string Street { get; set; }
    public string City { get; set; }
    public string ZipCode { get; set; }
}

public class JsonSerializationDemo {
    public void DemonstrateJsonSerialization() {
        string filePath = "person.json";
        var person = new JsonPerson {
            Name = "Bob Johnson",
            Age = 35,
            Hobbies = new List<string> { "Photography", "Hiking", "Programming" },
            Address = new Address {
                Street = "123 Main St",
                City = "Anytown",
                ZipCode = "12345"
            }
        };

        try {
            // Serialize with indentation
            var options = new JsonSerializerOptions {
                WriteIndented = true
            };

            string jsonString = JsonSerializer.Serialize(person, options);
            File.WriteAllText(filePath, jsonString);
            Console.WriteLine("Person serialized to JSON");

            // Display JSON content
            Console.WriteLine("JSON Content:");
            Console.WriteLine(jsonString);

            // Deserialize
            string readJson = File.ReadAllText(filePath);
            var deserializedPerson = JsonSerializer.Deserialize<JsonPerson>(readJson);
            Console.WriteLine($"Deserialized person: {deserializedPerson?.Name} from {deserializedPerson?.Address?.City}");

        } catch (Exception ex) {
            Console.WriteLine("JSON serialization error: " + ex.Message);
        } finally {
            if (File.Exists(filePath)) {
                File.Delete(filePath);
            }
        }
    }
}

// Custom Serialization
public class CustomSerializableObject {
    public string Name { get; set; }
    public int Value { get; set; }

    public void Serialize(Stream stream) {
        using (var writer = new BinaryWriter(stream)) {
            writer.Write(Name ?? string.Empty);
            writer.Write(Value);
        }
    }

    public static CustomSerializableObject Deserialize(Stream stream) {
        using (var reader = new BinaryReader(stream)) {
            return new CustomSerializableObject {
                Name = reader.ReadString(),
                Value = reader.ReadInt32()
            };
        }
    }
}

public class CustomSerializationDemo {
    public void DemonstrateCustomSerialization() {
        string filePath = "custom.bin";
        var obj = new CustomSerializableObject {
            Name = "Custom Object",
            Value = 42
        };

        try {
            // Serialize
            using (var stream = new FileStream(filePath, FileMode.Create)) {
                obj.Serialize(stream);
            }
            Console.WriteLine("Custom object serialized");

            // Deserialize
            using (var stream = new FileStream(filePath, FileMode.Open)) {
                var deserializedObj = CustomSerializableObject.Deserialize(stream);
                Console.WriteLine($"Deserialized: {deserializedObj.Name} = {deserializedObj.Value}");
            }

        } catch (Exception ex) {
            Console.WriteLine("Custom serialization error: " + ex.Message);
        } finally {
            if (File.Exists(filePath)) {
                File.Delete(filePath);
            }
        }
    }
}

// Compression
public class CompressionDemo {
    public void DemonstrateCompression() {
        string sourceFile = "large_text.txt";
        string compressedFile = "compressed.gz";
        string decompressedFile = "decompressed.txt";

        try {
            // Create a large text file
            var largeContent = string.Join("\n", Enumerable.Range(1, 10000)
                .Select(i => $"This is line number {i} with some repeated text to make it larger"));
            File.WriteAllText(sourceFile, largeContent);

            var originalSize = new FileInfo(sourceFile).Length;
            Console.WriteLine($"Original file size: {originalSize} bytes");

            // Compress
            using (var sourceStream = File.OpenRead(sourceFile))
            using (var compressedStream = File.Create(compressedFile))
            using (var compressor = new GZipStream(compressedStream, CompressionMode.Compress)) {
                sourceStream.CopyTo(compressor);
            }

            var compressedSize = new FileInfo(compressedFile).Length;
            Console.WriteLine($"Compressed file size: {compressedSize} bytes");
            Console.WriteLine($"Compression ratio: {(double)compressedSize / originalSize:P}");

            // Decompress
            using (var compressedStream = File.OpenRead(compressedFile))
            using (var decompressor = new GZipStream(compressedStream, CompressionMode.Decompress))
            using (var decompressedStream = File.Create(decompressedFile)) {
                decompressor.CopyTo(decompressedStream);
            }

            var decompressedSize = new FileInfo(decompressedFile).Length;
            Console.WriteLine($"Decompressed file size: {decompressedSize} bytes");

            // Verify content
            var originalContent = File.ReadAllText(sourceFile);
            var decompressedContent = File.ReadAllText(decompressedFile);
            Console.WriteLine($"Content matches: {originalContent == decompressedContent}");

        } catch (Exception ex) {
            Console.WriteLine("Compression error: " + ex.Message);
        } finally {
            // Clean up
            foreach (var file in new[] { sourceFile, compressedFile, decompressedFile }) {
                if (File.Exists(file)) File.Delete(file);
            }
        }
    }
}

// Encryption
public class EncryptionDemo {
    private const string Key = "0123456789ABCDEF"; // 16 bytes for AES
    private const string IV = "0123456789ABCDEF";  // 16 bytes for AES

    public void DemonstrateEncryption() {
        string originalFile = "secret.txt";
        string encryptedFile = "secret.enc";
        string decryptedFile = "secret_decrypted.txt";

        string secretMessage = "This is a secret message that needs to be encrypted.";

        try {
            // Write original message
            File.WriteAllText(originalFile, secretMessage);

            // Encrypt
            EncryptFile(originalFile, encryptedFile);
            Console.WriteLine("File encrypted");

            // Decrypt
            DecryptFile(encryptedFile, decryptedFile);
            Console.WriteLine("File decrypted");

            // Verify
            string decryptedMessage = File.ReadAllText(decryptedFile);
            Console.WriteLine($"Decryption successful: {secretMessage == decryptedMessage}");

        } catch (Exception ex) {
            Console.WriteLine("Encryption error: " + ex.Message);
        } finally {
            // Clean up
            foreach (var file in new[] { originalFile, encryptedFile, decryptedFile }) {
                if (File.Exists(file)) File.Delete(file);
            }
        }
    }

    private void EncryptFile(string inputFile, string outputFile) {
        using (var aes = Aes.Create()) {
            aes.Key = Encoding.UTF8.GetBytes(Key);
            aes.IV = Encoding.UTF8.GetBytes(IV);

            using (var inputStream = File.OpenRead(inputFile))
            using (var outputStream = File.Create(outputFile))
            using (var cryptoStream = new CryptoStream(outputStream, aes.CreateEncryptor(), CryptoStreamMode.Write)) {
                inputStream.CopyTo(cryptoStream);
            }
        }
    }

    private void DecryptFile(string inputFile, string outputFile) {
        using (var aes = Aes.Create()) {
            aes.Key = Encoding.UTF8.GetBytes(Key);
            aes.IV = Encoding.UTF8.GetBytes(IV);

            using (var inputStream = File.OpenRead(inputFile))
            using (var outputStream = File.Create(outputFile))
            using (var cryptoStream = new CryptoStream(inputStream, aes.CreateDecryptor(), CryptoStreamMode.Read)) {
                cryptoStream.CopyTo(outputStream);
            }
        }
    }
}

// Memory-Mapped Files
public class MemoryMappedFilesDemo {
    public void DemonstrateMemoryMappedFiles() {
        string filePath = "large_data.dat";
        const long fileSize = 1024 * 1024 * 100; // 100MB

        try {
            // Create a large file
            using (var fileStream = new FileStream(filePath, FileMode.Create, FileAccess.Write)) {
                fileStream.SetLength(fileSize);
                Console.WriteLine($"Created {fileSize} byte file");
            }

            // Memory-map the file
            using (var mmf = System.IO.MemoryMappedFiles.MemoryMappedFile.CreateFromFile(filePath)) {
                using (var accessor = mmf.CreateViewAccessor(0, fileSize)) {
                    // Write some data at different positions
                    accessor.Write(0, (long)12345);
                    accessor.Write(1000000, (long)67890);
                    accessor.Write(fileSize - sizeof(long), (long)99999);

                    // Read the data back
                    long value1 = accessor.ReadInt64(0);
                    long value2 = accessor.ReadInt64(1000000);
                    long value3 = accessor.ReadInt64(fileSize - sizeof(long));

                    Console.WriteLine($"Read values: {value1}, {value2}, {value3}");
                }
            }

        } catch (Exception ex) {
            Console.WriteLine("Memory-mapped file error: " + ex.Message);
        } finally {
            if (File.Exists(filePath)) {
                File.Delete(filePath);
            }
        }
    }
}

// File System Watching
public class FileSystemWatcherDemo {
    public void DemonstrateFileWatching() {
        string watchPath = Path.GetTempPath();
        string testFile = Path.Combine(watchPath, "watched_file.txt");

        using (var watcher = new FileSystemWatcher()) {
            watcher.Path = watchPath;
            watcher.Filter = "watched_file.txt";
            watcher.NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.FileName;

            watcher.Changed += (sender, e) => Console.WriteLine($"File changed: {e.FullPath}");
            watcher.Created += (sender, e) => Console.WriteLine($"File created: {e.FullPath}");
            watcher.Deleted += (sender, e) => Console.WriteLine($"File deleted: {e.FullPath}");

            watcher.EnableRaisingEvents = true;

            Console.WriteLine("Watching for file changes...");

            // Create and modify the file
            File.WriteAllText(testFile, "Initial content");
            Thread.Sleep(100);

            File.AppendAllText(testFile, "\nAdditional content");
            Thread.Sleep(100);

            File.Delete(testFile);
            Thread.Sleep(100);

            Console.WriteLine("File watching demonstration completed");
        }
    }
}

// Advanced Stream Operations
public class AdvancedStreamsDemo {
    public void DemonstrateBufferedStreams() {
        string filePath = "buffered_test.txt";

        try {
            // Write with buffering
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            using (var bufferedStream = new BufferedStream(fileStream, 8192)) // 8KB buffer
            using (var writer = new StreamWriter(bufferedStream)) {
                for (int i = 0; i < 1000; i++) {
                    writer.WriteLine($"Line {i}: {new string('x', 100)}"); // Long lines
                }
            }

            Console.WriteLine("Buffered write completed");

            // Read with buffering
            using (var fileStream = new FileStream(filePath, FileMode.Open))
            using (var bufferedStream = new BufferedStream(fileStream, 8192))
            using (var reader = new StreamReader(bufferedStream)) {
                int lineCount = 0;
                while (reader.ReadLine() != null) {
                    lineCount++;
                }
                Console.WriteLine($"Read {lineCount} lines with buffering");
            }

        } catch (Exception ex) {
            Console.WriteLine("Buffered stream error: " + ex.Message);
        } finally {
            if (File.Exists(filePath)) {
                File.Delete(filePath);
            }
        }
    }

    public void DemonstrateMemoryStreams() {
        try {
            // Write to memory stream
            using (var memoryStream = new MemoryStream()) {
                using (var writer = new StreamWriter(memoryStream)) {
                    writer.Write("Hello, ");
                    writer.Write("Memory Stream!");
                    writer.Flush();

                    // Get the bytes
                    byte[] data = memoryStream.ToArray();
                    Console.WriteLine($"Memory stream contains {data.Length} bytes");

                    // Convert back to string
                    memoryStream.Position = 0;
                    using (var reader = new StreamReader(memoryStream)) {
                        string content = reader.ReadToEnd();
                        Console.WriteLine($"Content: {content}");
                    }
                }
            }

        } catch (Exception ex) {
            Console.WriteLine("Memory stream error: " + ex.Message);
        }
    }
}

// Demonstration
public void DemonstrateFileAndSerialization() {
    var fileIO = new FileIOBasics();
    fileIO.DemonstrateFileOperations();
    fileIO.DemonstrateStreamOperations();
    fileIO.DemonstrateAsyncFileOperations().Wait();

    var binaryDemo = new BinarySerializationDemo();
    binaryDemo.DemonstrateBinarySerialization();

    var xmlDemo = new XmlSerializationDemo();
    xmlDemo.DemonstrateXmlSerialization();

    var jsonDemo = new JsonSerializationDemo();
    jsonDemo.DemonstrateJsonSerialization();

    var customDemo = new CustomSerializationDemo();
    customDemo.DemonstrateCustomSerialization();

    var compressionDemo = new CompressionDemo();
    compressionDemo.DemonstrateCompression();

    var encryptionDemo = new EncryptionDemo();
    encryptionDemo.DemonstrateEncryption();

    var memoryMappedDemo = new MemoryMappedFilesDemo();
    memoryMappedDemo.DemonstrateMemoryMappedFiles();

    var fileWatcherDemo = new FileSystemWatcherDemo();
    fileWatcherDemo.DemonstrateFileWatching();

    var advancedStreams = new AdvancedStreamsDemo();
    advancedStreams.DemonstrateBufferedStreams();
    advancedStreams.DemonstrateMemoryStreams();
}`,
  keyPoints: [
    'Always use using statements for proper resource disposal',
    'Prefer async file operations for better responsiveness',
    'Choose serialization format based on requirements (binary for speed, JSON/XML for interoperability)',
    'Use compression to reduce file sizes and transfer times',
    'Implement proper error handling for all I/O operations',
    'Consider memory usage when working with large files',
    'Use appropriate buffer sizes for optimal performance',
    'Validate file paths and handle permissions properly',
    'Memory-mapped files provide efficient access to large files',
    'File system watching enables reactive file processing',
  ],
  exercise:
    'Create a file-based caching system with compression and encryption. Implement a custom binary serializer that handles complex object graphs with circular references. Build a log file processor that can handle large files asynchronously with progress reporting. Develop a configuration system that supports multiple formats (JSON, XML, YAML) with automatic discovery. Design a backup utility that uses memory-mapped files for efficient large file copying.',
};
