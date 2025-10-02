import { Topic } from '../../models/section';

export const commentsTopic: Topic = {
  id: 'basics-comments',
  name: 'Comments and Documentation',
  sectionId: 'beginner',
  slug: 'comments',
  explanation: `
    <h3>Comments in C#</h3>
    <p>Comments are used to explain code and make it more readable. They are ignored by the compiler and don't affect program execution.</p>

    <h4>Types of Comments</h4>
    <ul>
      <li><strong>Single-line comments:</strong> <code>// This is a comment</code></li>
      <li><strong>Multi-line comments:</strong> <code>/* This is a multi-line comment */</code></li>
      <li><strong>XML Documentation comments:</strong> <code>/// &lt;summary&gt;Description&lt;/summary&gt;</code></li>
    </ul>

    <h4>XML Documentation</h4>
    <p>XML documentation comments provide structured documentation that can be used to generate help files and IntelliSense:</p>
    <ul>
      <li><code>&lt;summary&gt;</code> - Brief description</li>
      <li><code>&lt;param&gt;</code> - Method parameter description</li>
      <li><code>&lt;returns&gt;</code> - Return value description</li>
      <li><code>&lt;exception&gt;</code> - Exceptions that can be thrown</li>
      <li><code>&lt;example&gt;</code> - Code example</li>
    </ul>

    <h4>Best Practices</h4>
    <ul>
      <li>Write comments for complex logic, not obvious code</li>
      <li>Keep comments up-to-date with code changes</li>
      <li>Use meaningful variable and method names instead of comments when possible</li>
      <li>Use XML documentation for public APIs</li>
    </ul>
  `,
  codeExample: `// Single-line comment
// This method calculates the area of a circle

/*
 * Multi-line comment
 * This is another way to write
 * longer comments
 */

/// <summary>
/// Calculates the area of a circle given its radius
/// </summary>
/// <param name="radius">The radius of the circle</param>
/// <returns>The area of the circle</returns>
/// <exception cref="ArgumentException">Thrown when radius is negative</exception>
public double CalculateCircleArea(double radius)
{
    if (radius < 0)
        throw new ArgumentException("Radius cannot be negative");

    return Math.PI * radius * radius;
}

// Example usage
double area = CalculateCircleArea(5.0);
Console.WriteLine($"Area: {area:F2}"); // Output: Area: 78.54

// TODO: Add input validation
// FIXME: This method needs optimization
// HACK: Temporary workaround for performance issue`,
  keyPoints: [
    'Use // for single-line comments',
    'Use /* */ for multi-line comments',
    'Use /// for XML documentation comments',
    'XML documentation appears in IntelliSense',
    'Keep comments meaningful and up-to-date',
    'Use TODO, FIXME, HACK for temporary notes',
  ],
  exercise:
    'Add XML documentation comments to a method that calculates the factorial of a number, including parameter descriptions and return value documentation.',
};
