import { Topic } from '../../models/section';

export const typeConversionTopic: Topic = {
  id: 'basics-type-conversion',
  name: 'Type Conversion and Casting',
  sectionId: 'beginner',
  slug: 'type-conversion',
  explanation: `
    <h3>Implicit Conversion</h3>
    <p>Automatic conversion from smaller to larger data types (no data loss).</p>

    <h3>Explicit Conversion (Casting)</h3>
    <p>Manual conversion that may result in data loss. Requires explicit cast operator.</p>

    <h3>Helper Methods</h3>
    <p>Convert class provides methods like ToInt32(), ToDouble(), ToString(), etc.</p>

    <h3>Parse and TryParse</h3>
    <p>Methods to convert strings to numeric types.</p>
  `,
  codeExample: `// Implicit Conversion (automatic)
int numInt = 100;
long numLong = numInt;      // int to long
float numFloat = numInt;    // int to float
double numDouble = numFloat; // float to double

// Explicit Conversion (casting)
double doubleNum = 123.456;
int intNum = (int)doubleNum;  // Result: 123 (decimal part lost)

long longNum = 1000000;
int castInt = (int)longNum;   // May lose data if value too large

// Using Convert class
string strNumber = "123";
int converted1 = Convert.ToInt32(strNumber);
double converted2 = Convert.ToDouble("45.67");
bool converted3 = Convert.ToBoolean("true");
string converted4 = Convert.ToString(123);

// Parse methods
string str1 = "100";
int parsed1 = int.Parse(str1);
double parsed2 = double.Parse("3.14");

// TryParse (safer - returns bool indicating success)
string input = "456";
int result;
bool success = int.TryParse(input, out result);
if (success)
{
    Console.WriteLine($"Converted: {result}");
}
else
{
    Console.WriteLine("Conversion failed");
}

// ToString method
int number = 42;
string numberStr = number.ToString();
string formatted = number.ToString("N2"); // Format with 2 decimal places

Console.WriteLine($"Converted: {converted1}, Parsed: {parsed1}, Formatted: {formatted}");`,
  keyPoints: [
    'Implicit conversion happens automatically when no data loss occurs',
    'Explicit casting is required when converting from larger to smaller types',
    'Always use TryParse when converting user input to avoid exceptions',
    'Convert class provides comprehensive conversion methods',
    'Parse methods throw exceptions if conversion fails',
    'ToString() method is available on all types',
  ],
  exercise:
    'Create a program that reads a string input, tries to convert it to different data types using TryParse, and displays the results.',
};
