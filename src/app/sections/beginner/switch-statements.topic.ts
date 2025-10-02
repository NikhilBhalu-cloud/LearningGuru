import { Topic } from '../../models/section';

export const switchStatementsTopic: Topic = {
  id: 'control-flow-switch',
  name: 'switch Statements',
  sectionId: 'beginner',
  slug: 'switch-statements',
  explanation: `
    <h3>switch Statement</h3>
    <p>The <code>switch</code> statement provides a clean way to choose between multiple options based on the value of an expression. It's often more readable than long if-else chains.</p>

    <h4>Basic switch Syntax</h4>
    <pre><code>switch (expression) {
    case value1:
        // code for value1
        break;
    case value2:
        // code for value2
        break;
    default:
        // code for default case
        break;
}</code></pre>

    <h4>Important Rules</h4>
    <ul>
      <li>Each case must end with <code>break</code>, <code>return</code>, or <code>throw</code></li>
      <li>The <code>default</code> case is optional but recommended</li>
      <li>Cases can be grouped to execute the same code</li>
      <li>Expression must be integral type, string, or enum</li>
    </ul>

    <h4>Pattern Matching (C# 7.0+)</h4>
    <p>Modern C# supports pattern matching in switch expressions:</p>
    <ul>
      <li>Type patterns: <code>case int x:</code></li>
      <li>Constant patterns: <code>case 1:</code></li>
      <li>Var patterns: <code>case var x:</code></li>
      <li>Property patterns: <code>case { Property: value }:</code></li>
    </ul>

    <h4>switch Expression (C# 8.0+)</h4>
    <p>A more concise syntax that returns a value:</p>
    <pre><code>string result = day switch {
    1 => "Monday",
    2 => "Tuesday",
    _ => "Other day"
};</code></pre>
  `,
  codeExample: `// Basic switch statement
int dayOfWeek = 3;
string dayName;

switch (dayOfWeek) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    case 4:
        dayName = "Thursday";
        break;
    case 5:
        dayName = "Friday";
        break;
    case 6:
        dayName = "Saturday";
        break;
    case 7:
        dayName = "Sunday";
        break;
    default:
        dayName = "Invalid day";
        break;
}

Console.WriteLine($"Day {dayOfWeek} is {dayName}");

// Switch with strings
string fruit = "apple";
string color;

switch (fruit.ToLower()) {
    case "apple":
    case "cherry":  // Multiple cases can share code
        color = "red";
        break;
    case "banana":
        color = "yellow";
        break;
    case "orange":
        color = "orange";
        break;
    default:
        color = "unknown";
        break;
}

Console.WriteLine($"{fruit} is {color}");

// Switch expression (C# 8.0+)
string GetMonthName(int month) => month switch {
    1 => "January",
    2 => "February",
    3 => "March",
    4 => "April",
    5 => "May",
    6 => "June",
    7 => "July",
    8 => "August",
    9 => "September",
    10 => "October",
    11 => "November",
    12 => "December",
    _ => "Invalid month"
};

Console.WriteLine(GetMonthName(5)); // Output: May

// Pattern matching with types (C# 7.0+)
object obj = "Hello World";

switch (obj) {
    case string s when s.Length > 10:
        Console.WriteLine($"Long string: {s}");
        break;
    case string s:
        Console.WriteLine($"String: {s}");
        break;
    case int i:
        Console.WriteLine($"Integer: {i}");
        break;
    default:
        Console.WriteLine("Unknown type");
        break;
}

// Switch expression with patterns
string DescribeShape(object shape) => shape switch {
    Circle c => $"Circle with radius {c.Radius}",
    Rectangle r => $"Rectangle {r.Width} x {r.Height}",
    _ => "Unknown shape"
};

// Calculator using switch
double Calculate(double a, double b, char operation) {
    return operation switch {
        '+' => a + b,
        '-' => a - b,
        '*' => a * b,
        '/' => b != 0 ? a / b : double.NaN,
        _ => double.NaN
    };
}

Console.WriteLine(Calculate(10, 5, '+')); // Output: 15`,
  keyPoints: [
    'switch statements test a single expression against multiple values',
    'Each case must end with break, return, or throw',
    'default case handles values not covered by any case',
    'Multiple cases can share the same code block',
    'C# 8.0+ supports switch expressions for more concise code',
    'Pattern matching allows type checking and property testing',
    'switch expressions can return values directly',
  ],
  exercise:
    'Create a calculator program that uses switch statements to handle different mathematical operations (+, -, *, /) and includes input validation.',
};
