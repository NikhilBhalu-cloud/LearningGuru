import { Topic } from '../../models/section';

export const fileHandlingTopic: Topic = {
  id: 'intermediate-file-handling',
  name: 'File and Directory Operations',
  sectionId: 'intermediate',
  slug: 'file-handling',
  explanation: `
    <h3>File and Directory Operations in C#</h3>
    <p>C# provides comprehensive support for file and directory operations through the System.IO namespace. These operations include reading, writing, copying, moving, and deleting files and directories.</p>

    <h4>Key Classes for File Operations</h4>
    <ul>
      <li><strong>File:</strong> Static methods for file operations</li>
      <li><strong>FileInfo:</strong> Instance methods for file operations</li>
      <li><strong>Directory:</strong> Static methods for directory operations</li>
      <li><strong>DirectoryInfo:</strong> Instance methods for directory operations</li>
      <li><strong>Path:</strong> Utility methods for path manipulation</li>
      <li><strong>FileStream:</strong> Low-level file reading/writing</li>
      <li><strong>StreamReader/StreamWriter:</strong> Text file reading/writing</li>
      <li><strong>BinaryReader/BinaryWriter:</strong> Binary file reading/writing</li>
    </ul>

    <h4>File Access Modes</h4>
    <ul>
      <li><strong>FileMode:</strong>
        <ul>
          <li>CreateNew - Creates a new file (fails if exists)</li>
          <li>Create - Creates or overwrites existing file</li>
          <li>Open - Opens existing file</li>
          <li>OpenOrCreate - Opens or creates file</li>
          <li>Truncate - Opens and truncates existing file</li>
          <li>Append - Opens or creates file for appending</li>
        </ul>
      </li>
      <li><strong>FileAccess:</strong> Read, Write, ReadWrite</li>
      <li><strong>FileShare:</strong> Controls file sharing permissions</li>
    </ul>

    <h4>Exception Handling</h4>
    <ul>
      <li><strong>FileNotFoundException:</strong> File doesn't exist</li>
      <li><strong>DirectoryNotFoundException:</strong> Directory doesn't exist</li>
      <li><strong>IOException:</strong> General I/O errors</li>
      <li><strong>UnauthorizedAccessException:</strong> Permission denied</li>
      <li><strong>PathTooLongException:</strong> Path exceeds system limits</li>
    </ul>

    <h4>Best Practices</h4>
    <ul>
      <li>Always use using statements for proper resource disposal</li>
      <li>Check file/directory existence before operations</li>
      <li>Use Path.Combine for path construction</li>
      <li>Handle exceptions appropriately</li>
      <li>Use asynchronous methods for large files</li>
      <li>Consider file locking and concurrency issues</li>
    </ul>
  `,
  codeExample: `using System;
using System.IO;
using System.Text;
using System.Linq;
using System.Collections.Generic;

public class FileOperationsDemo {
    private string _baseDirectory;

    public FileOperationsDemo() {
        _baseDirectory = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.Desktop), "FileDemo");
        Directory.CreateDirectory(_baseDirectory);
    }

    // Basic File Operations
    public void DemonstrateBasicFileOperations() {
        Console.WriteLine("=== Basic File Operations ===");

        string filePath = Path.Combine(_baseDirectory, "sample.txt");

        // Check if file exists
        if (File.Exists(filePath)) {
            Console.WriteLine("File already exists");
        } else {
            // Create and write to file
            File.WriteAllText(filePath, "Hello, World!\\nThis is a sample file.");
            Console.WriteLine("File created and written");
        }

        // Read file contents
        string content = File.ReadAllText(filePath);
        Console.WriteLine("File content: " + content);

        // Append to file
        File.AppendAllText(filePath, "\\nAppended text.");
        Console.WriteLine("Text appended to file");

        // Copy file
        string copyPath = Path.Combine(_baseDirectory, "sample_copy.txt");
        File.Copy(filePath, copyPath, true);
        Console.WriteLine("File copied");

        // Move file
        string movedPath = Path.Combine(_baseDirectory, "moved_sample.txt");
        File.Move(copyPath, movedPath);
        Console.WriteLine("File moved");

        // Get file information
        FileInfo fileInfo = new FileInfo(filePath);
        Console.WriteLine($"File size: {fileInfo.Length} bytes");
        Console.WriteLine($"Created: {fileInfo.CreationTime}");
        Console.WriteLine($"Modified: {fileInfo.LastWriteTime}");

        // Delete file
        File.Delete(movedPath);
        Console.WriteLine("File deleted");
    }

    // Directory Operations
    public void DemonstrateDirectoryOperations() {
        Console.WriteLine("\\n=== Directory Operations ===");

        string subDir = Path.Combine(_baseDirectory, "SubDirectory");
        string nestedDir = Path.Combine(subDir, "Nested");

        // Create directories
        Directory.CreateDirectory(subDir);
        Directory.CreateDirectory(nestedDir);
        Console.WriteLine("Directories created");

        // Create files in directories
        File.WriteAllText(Path.Combine(subDir, "file1.txt"), "Content 1");
        File.WriteAllText(Path.Combine(subDir, "file2.txt"), "Content 2");
        File.WriteAllText(Path.Combine(nestedDir, "file3.txt"), "Content 3");

        // List directory contents
        Console.WriteLine("\\nContents of " + subDir + ":");
        foreach (string file in Directory.GetFiles(subDir)) {
            Console.WriteLine("  File: " + Path.GetFileName(file));
        }

        foreach (string dir in Directory.GetDirectories(subDir)) {
            Console.WriteLine("  Directory: " + Path.GetFileName(dir));
        }

        // Recursive directory listing
        Console.WriteLine("\\nRecursive contents:");
        ListDirectoryContents(_baseDirectory, 0);

        // Directory information
        DirectoryInfo dirInfo = new DirectoryInfo(subDir);
        Console.WriteLine($"\\nDirectory info for {subDir}:");
        Console.WriteLine($"Created: {dirInfo.CreationTime}");
        Console.WriteLine($"Files: {dirInfo.GetFiles().Length}");
        Console.WriteLine($"Subdirectories: {dirInfo.GetDirectories().Length}");

        // Move directory
        string movedDir = Path.Combine(_baseDirectory, "MovedSubDirectory");
        Directory.Move(subDir, movedDir);
        Console.WriteLine("Directory moved");

        // Delete directory (recursive)
        Directory.Delete(movedDir, true);
        Console.WriteLine("Directory deleted");
    }

    private void ListDirectoryContents(string path, int indentLevel) {
        string indent = new string(' ', indentLevel * 2);

        foreach (string file in Directory.GetFiles(path)) {
            Console.WriteLine(indent + "File: " + Path.GetFileName(file));
        }

        foreach (string dir in Directory.GetDirectories(path)) {
            Console.WriteLine(indent + "Directory: " + Path.GetFileName(dir));
            ListDirectoryContents(dir, indentLevel + 1);
        }
    }

    // Text File Operations
    public void DemonstrateTextFileOperations() {
        Console.WriteLine("\\n=== Text File Operations ===");

        string textFile = Path.Combine(_baseDirectory, "text_demo.txt");

        // Write lines to file
        string[] lines = {
            "Line 1: Hello World",
            "Line 2: This is a text file",
            "Line 3: Demonstrating text operations",
            "Line 4: End of file"
        };

        File.WriteAllLines(textFile, lines);
        Console.WriteLine("Lines written to file");

        // Read all lines
        string[] readLines = File.ReadAllLines(textFile);
        Console.WriteLine("Read lines:");
        foreach (string line in readLines) {
            Console.WriteLine("  " + line);
        }

        // Using StreamWriter and StreamReader
        string streamFile = Path.Combine(_baseDirectory, "stream_demo.txt");

        using (StreamWriter writer = new StreamWriter(streamFile)) {
            writer.WriteLine("First line");
            writer.WriteLine("Second line");
            writer.Write("Third line (no newline)");
            writer.Write(" - continued on same line");
            writer.WriteLine(); // Add newline
            writer.WriteLine("Fourth line");
        }
        Console.WriteLine("Written using StreamWriter");

        using (StreamReader reader = new StreamReader(streamFile)) {
            string line;
            Console.WriteLine("Read using StreamReader:");
            while ((line = reader.ReadLine()) != null) {
                Console.WriteLine("  " + line);
            }
        }

        // Read specific number of characters
        using (StreamReader reader = new StreamReader(streamFile)) {
            char[] buffer = new char[10];
            int charsRead = reader.Read(buffer, 0, buffer.Length);
            Console.WriteLine($"First {charsRead} characters: " + new string(buffer, 0, charsRead));
        }
    }

    // Binary File Operations
    public void DemonstrateBinaryFileOperations() {
        Console.WriteLine("\\n=== Binary File Operations ===");

        string binaryFile = Path.Combine(_baseDirectory, "binary_demo.dat");

        // Write binary data
        using (BinaryWriter writer = new BinaryWriter(File.Open(binaryFile, FileMode.Create))) {
            writer.Write(12345);           // int
            writer.Write(123.456);         // double
            writer.Write(true);            // bool
            writer.Write("Hello Binary");  // string
            writer.Write(new byte[] { 1, 2, 3, 4, 5 }); // byte array
        }
        Console.WriteLine("Binary data written");

        // Read binary data
        using (BinaryReader reader = new BinaryReader(File.Open(binaryFile, FileMode.Open))) {
            int intValue = reader.ReadInt32();
            double doubleValue = reader.ReadDouble();
            bool boolValue = reader.ReadBoolean();
            string stringValue = reader.ReadString();
            byte[] byteArray = reader.ReadBytes(5);

            Console.WriteLine("Read binary data:");
            Console.WriteLine($"  Int: {intValue}");
            Console.WriteLine($"  Double: {doubleValue}");
            Console.WriteLine($"  Bool: {boolValue}");
            Console.WriteLine($"  String: {stringValue}");
            Console.WriteLine($"  Bytes: {string.Join(", ", byteArray)}");
        }
    }

    // FileStream Operations
    public void DemonstrateFileStreamOperations() {
        Console.WriteLine("\\n=== FileStream Operations ===");

        string streamFile = Path.Combine(_baseDirectory, "filestream_demo.txt");

        // Write using FileStream
        using (FileStream fs = new FileStream(streamFile, FileMode.Create, FileAccess.Write)) {
            byte[] data = Encoding.UTF8.GetBytes("Hello from FileStream!");
            fs.Write(data, 0, data.Length);
        }
        Console.WriteLine("Written using FileStream");

        // Read using FileStream
        using (FileStream fs = new FileStream(streamFile, FileMode.Open, FileAccess.Read)) {
            byte[] buffer = new byte[1024];
            int bytesRead = fs.Read(buffer, 0, buffer.Length);
            string content = Encoding.UTF8.GetString(buffer, 0, bytesRead);
            Console.WriteLine("Read using FileStream: " + content);
        }

        // Seek and partial read/write
        using (FileStream fs = new FileStream(streamFile, FileMode.Open, FileAccess.ReadWrite)) {
            // Seek to position 6
            fs.Seek(6, SeekOrigin.Begin);

            // Read from current position
            byte[] buffer = new byte[10];
            int bytesRead = fs.Read(buffer, 0, buffer.Length);
            string partialContent = Encoding.UTF8.GetString(buffer, 0, bytesRead);
            Console.WriteLine($"Partial read from position 6: '{partialContent}'");

            // Write at current position
            byte[] newData = Encoding.UTF8.GetBytes("MODIFIED");
            fs.Seek(-bytesRead, SeekOrigin.Current); // Go back
            fs.Write(newData, 0, newData.Length);
        }

        // Read the modified content
        string modifiedContent = File.ReadAllText(streamFile);
        Console.WriteLine("Modified content: " + modifiedContent);
    }

    // Path Operations
    public void DemonstratePathOperations() {
        Console.WriteLine("\\n=== Path Operations ===");

        string path1 = @"C:\\Users\\Documents\\file.txt";
        string path2 = "file.txt";
        string path3 = @"..\\..\\config.xml";

        Console.WriteLine($"Full path of '{path1}': {Path.GetFullPath(path1)}");
        Console.WriteLine($"Directory of '{path1}': {Path.GetDirectoryName(path1)}");
        Console.WriteLine($"Filename of '{path1}': {Path.GetFileName(path1)}");
        Console.WriteLine($"Filename without extension: {Path.GetFileNameWithoutExtension(path1)}");
        Console.WriteLine($"Extension of '{path1}': {Path.GetExtension(path1)}");

        // Path.Combine for safe path construction
        string combinedPath = Path.Combine("C:\\", "Users", "Documents", "file.txt");
        Console.WriteLine($"Combined path: {combinedPath}");

        // Change extension
        string newPath = Path.ChangeExtension(path1, ".bak");
        Console.WriteLine($"Changed extension: {newPath}");

        // Get temp path
        string tempPath = Path.GetTempPath();
        Console.WriteLine($"Temp path: {tempPath}");

        // Create temp file
        string tempFile = Path.GetTempFileName();
        Console.WriteLine($"Temp file: {tempFile}");
        File.Delete(tempFile); // Clean up
    }

    // File Watching
    public void DemonstrateFileWatching() {
        Console.WriteLine("\\n=== File Watching ===");

        string watchDir = Path.Combine(_baseDirectory, "WatchDemo");
        Directory.CreateDirectory(watchDir);

        // Create file watcher
        using (FileSystemWatcher watcher = new FileSystemWatcher()) {
            watcher.Path = watchDir;
            watcher.NotifyFilter = NotifyFilters.LastWrite | NotifyFilters.FileName | NotifyFilters.DirectoryName;
            watcher.Filter = "*.*";

            // Subscribe to events
            watcher.Created += OnFileChanged;
            watcher.Changed += OnFileChanged;
            watcher.Deleted += OnFileChanged;
            watcher.Renamed += OnFileRenamed;

            watcher.EnableRaisingEvents = true;

            Console.WriteLine($"Watching directory: {watchDir}");
            Console.WriteLine("Creating, modifying, and deleting files...");

            // Simulate file operations
            string testFile = Path.Combine(watchDir, "test.txt");
            File.WriteAllText(testFile, "Initial content");
            Thread.Sleep(100);

            File.AppendAllText(testFile, "\\nModified content");
            Thread.Sleep(100);

            string renamedFile = Path.Combine(watchDir, "renamed.txt");
            File.Move(testFile, renamedFile);
            Thread.Sleep(100);

            File.Delete(renamedFile);
            Thread.Sleep(100);

            Console.WriteLine("File operations completed");
        }
    }

    private void OnFileChanged(object sender, FileSystemEventArgs e) {
        Console.WriteLine($"File {e.ChangeType}: {e.FullPath}");
    }

    private void OnFileRenamed(object sender, RenamedEventArgs e) {
        Console.WriteLine($"File renamed: {e.OldFullPath} -> {e.FullPath}");
    }

    // Exception Handling
    public void DemonstrateExceptionHandling() {
        Console.WriteLine("\\n=== Exception Handling ===");

        string nonExistentFile = Path.Combine(_baseDirectory, "nonexistent.txt");
        string readOnlyFile = Path.Combine(_baseDirectory, "readonly.txt");

        // Create read-only file
        File.WriteAllText(readOnlyFile, "Read-only content");
        File.SetAttributes(readOnlyFile, FileAttributes.ReadOnly);

        try {
            // Try to read non-existent file
            string content = File.ReadAllText(nonExistentFile);
        } catch (FileNotFoundException ex) {
            Console.WriteLine($"File not found: {ex.Message}");
        }

        try {
            // Try to write to read-only file
            File.WriteAllText(readOnlyFile, "New content");
        } catch (UnauthorizedAccessException ex) {
            Console.WriteLine($"Access denied: {ex.Message}");
        }

        try {
            // Try to create directory in read-only location
            string systemPath = @"C:\\Windows\\System32\\test";
            Directory.CreateDirectory(systemPath);
        } catch (UnauthorizedAccessException ex) {
            Console.WriteLine($"Permission denied: {ex.Message}");
        }

        // Clean up
        File.SetAttributes(readOnlyFile, FileAttributes.Normal);
        File.Delete(readOnlyFile);
    }

    // Asynchronous File Operations
    public async Task DemonstrateAsyncFileOperations() {
        Console.WriteLine("\\n=== Asynchronous File Operations ===");

        string asyncFile = Path.Combine(_baseDirectory, "async_demo.txt");

        // Write asynchronously
        using (StreamWriter writer = new StreamWriter(asyncFile)) {
            await writer.WriteLineAsync("Line 1");
            await writer.WriteLineAsync("Line 2");
            await writer.WriteLineAsync("Line 3");
        }
        Console.WriteLine("Async write completed");

        // Read asynchronously
        using (StreamReader reader = new StreamReader(asyncFile)) {
            string line;
            Console.WriteLine("Async read:");
            while ((line = await reader.ReadLineAsync()) != null) {
                Console.WriteLine($"  {line}");
            }
        }

        // Large file copy simulation
        string largeFile = Path.Combine(_baseDirectory, "large_file.txt");
        string copyFile = Path.Combine(_baseDirectory, "large_file_copy.txt");

        // Create a moderately large file
        using (StreamWriter writer = new StreamWriter(largeFile)) {
            for (int i = 0; i < 10000; i++) {
                await writer.WriteLineAsync($"Line {i}: " + new string('x', 100));
            }
        }

        Console.WriteLine("Copying large file asynchronously...");
        await CopyFileAsync(largeFile, copyFile);
        Console.WriteLine("Large file copy completed");

        // Verify copy
        long originalSize = new FileInfo(largeFile).Length;
        long copySize = new FileInfo(copyFile).Length;
        Console.WriteLine($"Original size: {originalSize}, Copy size: {copySize}");
    }

    private async Task CopyFileAsync(string sourcePath, string destPath) {
        using (FileStream sourceStream = File.OpenRead(sourcePath))
        using (FileStream destStream = File.Create(destPath)) {
            await sourceStream.CopyToAsync(destStream);
        }
    }

    // Utility Methods
    public void DemonstrateUtilityMethods() {
        Console.WriteLine("\\n=== Utility Methods ===");

        string[] files = Directory.GetFiles(_baseDirectory, "*.txt");
        Console.WriteLine($"Found {files.Length} .txt files");

        // Get files by pattern
        string[] allFiles = Directory.GetFiles(_baseDirectory, "*.*", SearchOption.AllDirectories);
        Console.WriteLine($"Total files in directory tree: {allFiles.Length}");

        // Get files modified today
        DateTime today = DateTime.Today;
        var recentFiles = Directory.GetFiles(_baseDirectory)
            .Select(path => new FileInfo(path))
            .Where(fi => fi.LastWriteTime.Date == today);

        Console.WriteLine($"Files modified today: {recentFiles.Count()}");

        // Get largest files
        var largestFiles = Directory.GetFiles(_baseDirectory)
            .Select(path => new FileInfo(path))
            .OrderByDescending(fi => fi.Length)
            .Take(3);

        Console.WriteLine("Largest files:");
        foreach (FileInfo fi in largestFiles) {
            Console.WriteLine($"  {fi.Name}: {fi.Length} bytes");
        }
    }

    // Cleanup
    public void Cleanup() {
        try {
            Directory.Delete(_baseDirectory, true);
            Console.WriteLine("\\nDemo directory cleaned up");
        } catch (Exception ex) {
            Console.WriteLine($"Cleanup failed: {ex.Message}");
        }
    }
}

// Main demonstration
public async Task RunFileOperationsDemo() {
    FileOperationsDemo demo = new FileOperationsDemo();

    try {
        demo.DemonstrateBasicFileOperations();
        demo.DemonstrateDirectoryOperations();
        demo.DemonstrateTextFileOperations();
        demo.DemonstrateBinaryFileOperations();
        demo.DemonstrateFileStreamOperations();
        demo.DemonstratePathOperations();
        demo.DemonstrateFileWatching();
        demo.DemonstrateExceptionHandling();
        await demo.DemonstrateAsyncFileOperations();
        demo.DemonstrateUtilityMethods();
    } finally {
        demo.Cleanup();
    }
}`,
  keyPoints: [
    'Use File and Directory classes for simple operations, *Info classes for complex operations',
    'Always wrap file streams in using statements for proper disposal',
    'Check file/directory existence before operations to avoid exceptions',
    'Use Path.Combine for safe path construction across platforms',
    'Handle IOException, UnauthorizedAccessException, and FileNotFoundException',
    'Use asynchronous methods for large files to avoid blocking UI',
    'FileSystemWatcher enables monitoring file system changes',
  ],
  exercise:
    'Create a file manager utility class that can: 1) Recursively copy directories, 2) Find duplicate files by content, 3) Compress/decompress text files using simple RLE encoding, 4) Monitor a directory and log all changes to a file, 5) Search for files containing specific text patterns.',
};
