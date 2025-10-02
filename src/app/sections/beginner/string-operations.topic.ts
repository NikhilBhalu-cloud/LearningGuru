import { Topic } from '../../models/section';

export const stringOperationsTopic: Topic = {
  id: 'arrays-strings',
  name: 'String Operations and Methods',
  sectionId: 'beginner',
  slug: 'string-operations',
  explanation: `
    <h3>Strings in C#</h3>
    <p>Strings are sequences of characters. In C#, strings are immutable objects of type <code>System.String</code>. Once created, their contents cannot be changed.</p>

    <h4>String Declaration and Initialization</h4>
    <pre><code>// String literals
string name = "John Doe";
string empty = "";
string nullString = null;

// Verbatim strings (ignore escape sequences)
string path = @"C:\Users\Documents\file.txt";

// String interpolation (C# 6.0+)
string greeting = $"Hello {name}!";

// String concatenation
string fullName = firstName + " " + lastName;</code></pre>

    <h4>Common String Methods</h4>
    <ul>
      <li><code>Length</code> - Gets string length</li>
      <li><code>ToUpper()/ToLower()</code> - Case conversion</li>
      <li><code>Substring(start, length)</code> - Extract substring</li>
      <li><code>IndexOf(char/string)</code> - Find character/string position</li>
      <li><code>Replace(old, new)</code> - Replace occurrences</li>
      <li><code>Split(delimiter)</code> - Split into array</li>
      <li><code>Trim()</code> - Remove whitespace</li>
      <li><code>StartsWith()/EndsWith()</code> - Check prefixes/suffixes</li>
      <li><code>Contains()</code> - Check if contains substring</li>
    </ul>

    <h4>String Immutability</h4>
    <p>Since strings are immutable, methods that appear to modify strings actually return new string instances.</p>

    <h4>StringBuilder Class</h4>
    <p>For efficient string concatenation in loops, use <code>StringBuilder</code> which is mutable.</p>
  `,
  codeExample: `// String declaration and initialization
string firstName = "John";
string lastName = "Doe";
string fullName = firstName + " " + lastName;  // "John Doe"

// String interpolation (C# 6.0+)
int age = 30;
string greeting = $"Hello {firstName}, you are {age} years old!";

// Verbatim strings
string filePath = @"C:\Users\John\Documents\file.txt";
string multiLine = @"This is a
multi-line
string";

// String properties and basic methods
Console.WriteLine($"Length of '{fullName}': {fullName.Length}");  // 8

// Case conversion
string upper = fullName.ToUpper();  // "JOHN DOE"
string lower = fullName.ToLower();  // "john doe"

// Substring extraction
string first = fullName.Substring(0, 4);     // "John"
string last = fullName.Substring(5);         // "Doe"

// Finding characters/strings
int spaceIndex = fullName.IndexOf(' ');      // 4
int johnIndex = fullName.IndexOf("John");    // 0
int notFound = fullName.IndexOf("xyz");      // -1

// Checking contents
bool startsWithJohn = fullName.StartsWith("John");    // true
bool endsWithDoe = fullName.EndsWith("Doe");          // true
bool containsSpace = fullName.Contains(" ");          // true

// String replacement
string replaced = fullName.Replace("John", "Jane");   // "Jane Doe"

// String trimming
string padded = "  Hello World  ";
string trimmed = padded.Trim();                        // "Hello World"
string leftTrimmed = padded.TrimStart();               // "Hello World  "
string rightTrimmed = padded.TrimEnd();                // "  Hello World"

// String splitting
string csvData = "John,Doe,30,Engineer";
string[] parts = csvData.Split(',');
// parts = ["John", "Doe", "30", "Engineer"]

string sentence = "The quick brown fox jumps over the lazy dog";
string[] words = sentence.Split(' ');
// words = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"]

// Joining strings
string[] colors = { "Red", "Green", "Blue" };
string colorString = string.Join(", ", colors);        // "Red, Green, Blue"
string path = string.Join("\\\\", "C:", "Users", "John", "Documents"); // "C:\\Users\\John\\Documents"

// String comparison
string str1 = "hello";
string str2 = "HELLO";
bool equalIgnoreCase = str1.Equals(str2, StringComparison.OrdinalIgnoreCase); // true
int comparison = string.Compare(str1, str2);  // > 0 (str1 > str2 lexicographically)

// String formatting
double price = 19.99;
int quantity = 3;
string receipt = string.Format("Total: {0:F2} for {1} items", price * quantity, quantity);
// "Total: $59.97 for 3 items"

// StringBuilder for efficient concatenation
StringBuilder sb = new StringBuilder();
sb.Append("This ");
sb.Append("is ");
sb.Append("a ");
sb.Append("long ");
sb.Append("string ");
sb.Append("built ");
sb.Append("efficiently.");
string result = sb.ToString();

// Comparing string concatenation methods
public void CompareConcatenationMethods() {
    string[] words = { "The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog" };

    // Method 1: String concatenation (inefficient for loops)
    string concatenated = "";
    foreach (string word in words) {
        concatenated += word + " ";
    }
    concatenated = concatenated.TrimEnd();

    // Method 2: StringBuilder (efficient)
    StringBuilder sb = new StringBuilder();
    foreach (string word in words) {
        sb.Append(word);
        sb.Append(" ");
    }
    string built = sb.ToString().TrimEnd();

    // Method 3: string.Join (most efficient for this case)
    string joined = string.Join(" ", words);

    Console.WriteLine($"Concatenated: {concatenated}");
    Console.WriteLine($"StringBuilder: {built}");
    Console.WriteLine($"Joined: {joined}");
}

// Advanced string operations
public void AdvancedStringOperations() {
    string text = "Hello, World! Welcome to C# programming.";

    // Insert and Remove
    string inserted = text.Insert(13, "beautiful ");     // "Hello, World! Welcome to beautiful C# programming."
    string removed = text.Remove(7, 8);                  // "Hello, Welcome to C# programming."

    // PadLeft and PadRight
    string number = "42";
    string paddedLeft = number.PadLeft(5, '0');          // "00042"
    string paddedRight = number.PadRight(5, '*');        // "42***"

    // LastIndexOf
    string path = "C:\\\\Users\\\\John\\\\Documents\\\\file.txt";
    int lastBackslash = path.LastIndexOf('\\\\');           // Position of last backslash

    // Split with options
    string data = "Name:John,Age:30,City:New York";
    string[] pairs = data.Split(new char[] { ',', ':' }, StringSplitOptions.RemoveEmptyEntries);
    // pairs = ["Name", "John", "Age", "30", "City", "New York"]

    // String comparison with culture
    string german1 = "Müller";
    string german2 = "Muller";
    bool equalOrdinal = german1.Equals(german2, StringComparison.Ordinal);                    // false
    bool equalInvariant = german1.Equals(german2, StringComparison.InvariantCultureIgnoreCase); // true
}

// Parsing strings to other types
public void StringParsing() {
    string numberStr = "123";
    string doubleStr = "45.67";
    string boolStr = "true";
    string dateStr = "2023-12-25";

    // Parse to numeric types
    int parsedInt = int.Parse(numberStr);
    double parsedDouble = double.Parse(doubleStr);

    // TryParse (safer than Parse)
    if (int.TryParse(numberStr, out int safeInt)) {
        Console.WriteLine($"Parsed int: {safeInt}");
    }

    if (double.TryParse(doubleStr, out double safeDouble)) {
        Console.WriteLine($"Parsed double: {safeDouble}");
    }

    // Parse boolean
    bool parsedBool = bool.Parse(boolStr);

    // Parse date
    DateTime parsedDate = DateTime.Parse(dateStr);

    Console.WriteLine($"Int: {parsedInt}, Double: {parsedDouble}, Bool: {parsedBool}, Date: {parsedDate:d}");
}

// String validation and manipulation
public void StringValidation() {
    string email = "user@example.com";
    string phone = "(555) 123-4567";

    // Check if string is null or empty
    bool isNullOrEmpty = string.IsNullOrEmpty(email);     // false
    bool isNullOrWhiteSpace = string.IsNullOrWhiteSpace("   "); // true

    // Email validation (basic)
    bool isValidEmail = email.Contains("@") && email.Contains(".");

    // Phone number cleaning
    string cleanPhone = new string(phone.Where(char.IsDigit).ToArray()); // "5551234567"

    // Password strength check
    string password = "MySecure123!";
    bool hasUpper = password.Any(char.IsUpper);
    bool hasLower = password.Any(char.IsLower);
    bool hasDigit = password.Any(char.IsDigit);
    bool hasSpecial = password.Any(c => !char.IsLetterOrDigit(c));
    bool isStrong = hasUpper && hasLower && hasDigit && hasSpecial && password.Length >= 8;
}`,
  keyPoints: [
    'Strings are immutable - methods return new strings',
    'Use StringBuilder for efficient concatenation in loops',
    'string.Join() is efficient for combining arrays of strings',
    'IndexOf() returns -1 if substring not found',
    'TryParse() methods are safer than Parse() methods',
    'String comparison can be case-sensitive or case-insensitive',
    'Trim() removes whitespace from both ends',
    'Split() returns string array, Join() combines string arrays',
  ],
  exercise:
    "Create a text processing program that reads a paragraph of text and performs various operations: count words, find the longest word, replace all vowels with asterisks, check if it's a palindrome (ignoring case and punctuation), and format it with proper capitalization for each sentence.",
};
