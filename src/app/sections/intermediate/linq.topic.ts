import { Topic } from '../../models/section';

export const linqTopic: Topic = {
  id: 'intermediate-linq',
  name: 'LINQ (Language Integrated Query)',
  sectionId: 'intermediate',
  slug: 'linq',
  explanation: `
    <h3>LINQ in C#</h3>
    <p>LINQ (Language Integrated Query) is a set of technologies that allow you to query data from different data sources using a consistent syntax. It integrates query capabilities directly into C#.</p>

    <h4>LINQ Benefits</h4>
    <ul>
      <li><strong>Unified Query Syntax:</strong> Same syntax for different data sources</li>
      <li><strong>Compile-time Type Checking:</strong> Errors caught at compile time</li>
      <li><strong>IntelliSense Support:</strong> Better IDE experience</li>
      <li><strong>Deferred Execution:</strong> Queries executed only when needed</li>
      <li><strong>Composability:</strong> Chain multiple operations</li>
    </ul>

    <h4>LINQ Flavors</h4>
    <ul>
      <li><strong>LINQ to Objects:</strong> Query in-memory collections</li>
      <li><strong>LINQ to SQL:</strong> Query SQL databases</li>
      <li><strong>LINQ to XML:</strong> Query XML documents</li>
      <li><strong>LINQ to Entities:</strong> Query Entity Framework</li>
      <li><strong>Parallel LINQ (PLINQ):</strong> Parallel execution of queries</li>
    </ul>

    <h4>Query Syntax vs Method Syntax</h4>
    <ul>
      <li><strong>Query Syntax:</strong> SQL-like syntax, more readable for complex queries</li>
      <li><strong>Method Syntax:</strong> Extension methods, more flexible, supports all operators</li>
      <li><strong>Mixed Approach:</strong> Combine both syntaxes in the same query</li>
    </ul>

    <h4>Deferred vs Immediate Execution</h4>
    <ul>
      <li><strong>Deferred Execution:</strong> Query executed when enumerated (Where, Select, etc.)</li>
      <li><strong>Immediate Execution:</strong> Query executed immediately (Count, ToList, etc.)</li>
    </ul>

    <h4>Common LINQ Operators</h4>
    <ul>
      <li><strong>Filtering:</strong> Where, OfType</li>
      <li><strong>Projection:</strong> Select, SelectMany</li>
      <li><strong>Joining:</strong> Join, GroupJoin</li>
      <li><strong>Grouping:</strong> GroupBy</li>
      <li><strong>Ordering:</strong> OrderBy, OrderByDescending, ThenBy</li>
      <li><strong>Aggregation:</strong> Count, Sum, Min, Max, Average</li>
      <li><strong>Quantifiers:</strong> Any, All, Contains</li>
      <li><strong>Element:</strong> First, FirstOrDefault, Last, LastOrDefault, Single</li>
      <li><strong>Set Operations:</strong> Distinct, Union, Intersect, Except</li>
      <li><strong>Partitioning:</strong> Take, Skip, TakeWhile, SkipWhile</li>
    </ul>
  `,
  codeExample: `using System.Linq;

// Sample data classes
public class Student {
    public int Id { get; set; }
    public string Name { get; set; }
    public int Age { get; set; }
    public string Major { get; set; }
    public double GPA { get; set; }
    public List<string> Courses { get; set; }

    public Student(int id, string name, int age, string major, double gpa, List<string> courses) {
        Id = id;
        Name = name;
        Age = age;
        Major = major;
        GPA = gpa;
        Courses = courses;
    }
}

public class Course {
    public int Id { get; set; }
    public string Name { get; set; }
    public string Instructor { get; set; }
    public int Credits { get; set; }

    public Course(int id, string name, string instructor, int credits) {
        Id = id;
        Name = name;
        Instructor = instructor;
        Credits = credits;
    }
}

public class Enrollment {
    public int StudentId { get; set; }
    public int CourseId { get; set; }
    public string Grade { get; set; }

    public Enrollment(int studentId, int courseId, string grade) {
        StudentId = studentId;
        CourseId = courseId;
        Grade = grade;
    }
}

public class LinqDemo {
    private List<Student> _students;
    private List<Course> _courses;
    private List<Enrollment> _enrollments;

    public LinqDemo() {
        InitializeData();
    }

    private void InitializeData() {
        _students = new List<Student> {
            new Student(1, "Alice Johnson", 20, "Computer Science", 3.8, new List<string> {"CS101", "MATH201"}),
            new Student(2, "Bob Smith", 22, "Mathematics", 3.5, new List<string> {"MATH201", "PHYS101"}),
            new Student(3, "Charlie Brown", 19, "Computer Science", 3.9, new List<string> {"CS101", "CS201"}),
            new Student(4, "Diana Prince", 21, "Physics", 4.0, new List<string> {"PHYS101", "MATH301"}),
            new Student(5, "Eve Wilson", 20, "Computer Science", 3.2, new List<string> {"CS101"})
        };

        _courses = new List<Course> {
            new Course(1, "CS101", "Dr. Smith", 3),
            new Course(2, "MATH201", "Dr. Johnson", 4),
            new Course(3, "PHYS101", "Dr. Davis", 3),
            new Course(4, "CS201", "Dr. Smith", 3),
            new Course(5, "MATH301", "Dr. Johnson", 4)
        };

        _enrollments = new List<Enrollment> {
            new Enrollment(1, 1, "A"),
            new Enrollment(1, 2, "B+"),
            new Enrollment(2, 2, "A-"),
            new Enrollment(2, 3, "B"),
            new Enrollment(3, 1, "A"),
            new Enrollment(3, 4, "A-"),
            new Enrollment(4, 3, "A+"),
            new Enrollment(4, 5, "A"),
            new Enrollment(5, 1, "C+")
        };
    }

    // Basic LINQ Operations
    public void DemonstrateBasicOperations() {
        Console.WriteLine("=== Basic LINQ Operations ===");

        // Where - Filtering
        var computerScienceStudents = _students.Where(s => s.Major == "Computer Science");
        Console.WriteLine("Computer Science Students:");
        foreach (var student in computerScienceStudents) {
            Console.WriteLine($"  {student.Name}");
        }

        // Select - Projection
        var studentNames = _students.Select(s => s.Name);
        Console.WriteLine($"\\nStudent Names: {string.Join(", ", studentNames)}");

        // OrderBy - Sorting
        var studentsByGpa = _students.OrderByDescending(s => s.GPA);
        Console.WriteLine("\\nStudents by GPA (descending):");
        foreach (var student in studentsByGpa) {
            Console.WriteLine($"  {student.Name}: {student.GPA}");
        }

        // First/FirstOrDefault - Getting first element
        var topStudent = _students.FirstOrDefault(s => s.GPA == 4.0);
        Console.WriteLine($"\\nTop student: {topStudent?.Name ?? "None"}");

        // Any/All - Quantifiers
        bool hasExcellentStudents = _students.Any(s => s.GPA >= 3.8);
        bool allStudentsPass = _students.All(s => s.GPA >= 2.0);
        Console.WriteLine($"Has excellent students: {hasExcellentStudents}");
        Console.WriteLine($"All students pass: {allStudentsPass}");
    }

    // Aggregation Operations
    public void DemonstrateAggregation() {
        Console.WriteLine("\\n=== Aggregation Operations ===");

        var averageGpa = _students.Average(s => s.GPA);
        var maxGpa = _students.Max(s => s.GPA);
        var minGpa = _students.Min(s => s.GPA);
        var totalStudents = _students.Count();
        var csStudentsCount = _students.Count(s => s.Major == "Computer Science");

        Console.WriteLine($"Average GPA: {averageGpa:F2}");
        Console.WriteLine($"Max GPA: {maxGpa}");
        Console.WriteLine($"Min GPA: {minGpa}");
        Console.WriteLine($"Total students: {totalStudents}");
        Console.WriteLine($"CS students: {csStudentsCount}");
    }

    // Grouping Operations
    public void DemonstrateGrouping() {
        Console.WriteLine("\\n=== Grouping Operations ===");

        var studentsByMajor = _students.GroupBy(s => s.Major);

        foreach (var group in studentsByMajor) {
            Console.WriteLine($"{group.Key}:");
            foreach (var student in group) {
                Console.WriteLine($"  {student.Name} (GPA: {student.GPA})");
            }
            Console.WriteLine($"  Average GPA: {group.Average(s => s.GPA):F2}");
        }
    }

    // Joining Operations
    public void DemonstrateJoining() {
        Console.WriteLine("\\n=== Joining Operations ===");

        // Inner Join
        var studentEnrollments = _students.Join(
            _enrollments,
            student => student.Id,
            enrollment => enrollment.StudentId,
            (student, enrollment) => new { student.Name, enrollment.CourseId, enrollment.Grade }
        );

        Console.WriteLine("Student Enrollments:");
        foreach (var enrollment in studentEnrollments) {
            Console.WriteLine($"  {enrollment.Name} - Course {enrollment.CourseId}: {enrollment.Grade}");
        }

        // Join with course information
        var detailedEnrollments = _students
            .Join(_enrollments,
                s => s.Id,
                e => e.StudentId,
                (s, e) => new { Student = s, Enrollment = e })
            .Join(_courses,
                se => se.Enrollment.CourseId,
                c => c.Id,
                (se, c) => new {
                    StudentName = se.Student.Name,
                    CourseName = c.Name,
                    Grade = se.Enrollment.Grade,
                    Instructor = c.Instructor
                });

        Console.WriteLine("\\nDetailed Enrollments:");
        foreach (var enrollment in detailedEnrollments) {
            Console.WriteLine($"  {enrollment.StudentName} - {enrollment.CourseName} ({enrollment.Instructor}): {enrollment.Grade}");
        }
    }

    // Set Operations
    public void DemonstrateSetOperations() {
        Console.WriteLine("\\n=== Set Operations ===");

        var csStudents = _students.Where(s => s.Major == "Computer Science").Select(s => s.Name);
        var mathStudents = _students.Where(s => s.Major == "Mathematics").Select(s => s.Name);
        var physicsStudents = _students.Where(s => s.Major == "Physics").Select(s => s.Name);

        Console.WriteLine($"CS Students: {string.Join(", ", csStudents)}");
        Console.WriteLine($"Math Students: {string.Join(", ", mathStudents)}");
        Console.WriteLine($"Physics Students: {string.Join(", ", physicsStudents)}");

        // Union - All unique students
        var allMajors = csStudents.Union(mathStudents).Union(physicsStudents);
        Console.WriteLine($"\\nAll Majors: {string.Join(", ", allMajors)}");

        // Distinct - Remove duplicates
        var allCourses = _students.SelectMany(s => s.Courses).Distinct();
        Console.WriteLine($"All unique courses: {string.Join(", ", allCourses)}");
    }

    // Partitioning Operations
    public void DemonstratePartitioning() {
        Console.WriteLine("\\n=== Partitioning Operations ===");

        // Take - First N elements
        var top3Students = _students.OrderByDescending(s => s.GPA).Take(3);
        Console.WriteLine("Top 3 Students by GPA:");
        foreach (var student in top3Students) {
            Console.WriteLine($"  {student.Name}: {student.GPA}");
        }

        // Skip - Skip first N elements
        var remainingStudents = _students.OrderByDescending(s => s.GPA).Skip(3);
        Console.WriteLine("\\nRemaining Students:");
        foreach (var student in remainingStudents) {
            Console.WriteLine($"  {student.Name}: {student.GPA}");
        }

        // TakeWhile - Take while condition is true
        var studentsWhileGpaHigh = _students
            .OrderByDescending(s => s.GPA)
            .TakeWhile(s => s.GPA >= 3.5);
        Console.WriteLine("\\nStudents with GPA >= 3.5:");
        foreach (var student in studentsWhileGpaHigh) {
            Console.WriteLine($"  {student.Name}: {student.GPA}");
        }
    }

    // Query Syntax vs Method Syntax
    public void DemonstrateQuerySyntax() {
        Console.WriteLine("\\n=== Query Syntax vs Method Syntax ===");

        // Method Syntax
        var methodSyntax = _students
            .Where(s => s.Major == "Computer Science")
            .OrderByDescending(s => s.GPA)
            .Select(s => new { s.Name, s.GPA });

        // Query Syntax
        var querySyntax = from s in _students
                         where s.Major == "Computer Science"
                         orderby s.GPA descending
                         select new { s.Name, s.GPA };

        Console.WriteLine("Method Syntax:");
        foreach (var student in methodSyntax) {
            Console.WriteLine($"  {student.Name}: {student.GPA}");
        }

        Console.WriteLine("\\nQuery Syntax:");
        foreach (var student in querySyntax) {
            Console.WriteLine($"  {student.Name}: {student.GPA}");
        }
    }

    // Deferred vs Immediate Execution
    public void DemonstrateExecution() {
        Console.WriteLine("\\n=== Deferred vs Immediate Execution ===");

        // Deferred execution - query executed when enumerated
        var deferredQuery = _students.Where(s => {
            Console.WriteLine($"Evaluating {s.Name}");
            return s.GPA > 3.5;
        });

        Console.WriteLine("Query created but not executed yet...");

        // Now execute the query
        var highGpaStudents = deferredQuery.ToList();
        Console.WriteLine($"Found {highGpaStudents.Count} students with GPA > 3.5");

        // Immediate execution - query executed immediately
        var immediateCount = _students.Count(s => s.GPA > 3.5);
        Console.WriteLine($"Immediate count: {immediateCount}");
    }

    // Advanced LINQ: Complex Queries
    public void DemonstrateAdvancedQueries() {
        Console.WriteLine("\\n=== Advanced LINQ Queries ===");

        // Complex query with multiple joins and aggregations
        var courseStatistics = _courses
            .GroupJoin(_enrollments,
                course => course.Id,
                enrollment => enrollment.CourseId,
                (course, enrollments) => new {
                    Course = course,
                    Enrollments = enrollments.ToList()
                })
            .Select(c => new {
                CourseName = c.Course.Name,
                Instructor = c.Course.Instructor,
                StudentCount = c.Enrollments.Count,
                AverageGrade = c.Enrollments.Any() ?
                    c.Enrollments.Average(e => GradeToGPA(e.Grade)) : 0
            })
            .OrderByDescending(c => c.StudentCount);

        Console.WriteLine("Course Statistics:");
        foreach (var stat in courseStatistics) {
            Console.WriteLine($"  {stat.CourseName} ({stat.Instructor}): {stat.StudentCount} students, Avg Grade: {stat.AverageGrade:F2}");
        }

        // Students with multiple courses
        var studentsWithMultipleCourses = _students
            .Where(s => s.Courses.Count > 1)
            .Select(s => new {
                s.Name,
                CourseCount = s.Courses.Count,
                Courses = string.Join(", ", s.Courses)
            });

        Console.WriteLine("\\nStudents with multiple courses:");
        foreach (var student in studentsWithMultipleCourses) {
            Console.WriteLine($"  {student.Name}: {student.CourseCount} courses ({student.Courses})");
        }
    }

    // Helper method to convert grade to GPA
    private double GradeToGPA(string grade) {
        return grade switch {
            "A+" => 4.0,
            "A" => 4.0,
            "A-" => 3.7,
            "B+" => 3.3,
            "B" => 3.0,
            "B-" => 2.7,
            "C+" => 2.3,
            "C" => 2.0,
            "C-" => 1.7,
            "D" => 1.0,
            "F" => 0.0,
            _ => 0.0
        };
    }

    // LINQ to Objects with custom types
    public void DemonstrateCustomLinq() {
        Console.WriteLine("\\n=== Custom LINQ Operations ===");

        // Custom Where implementation (for demonstration)
        var highPerformers = _students.WhereHighPerformer();

        Console.WriteLine("High Performers (GPA >= 3.8):");
        foreach (var student in highPerformers) {
            Console.WriteLine($"  {student.Name}: {student.GPA}");
        }
    }
}

// Extension methods for custom LINQ operations
public static class StudentExtensions {
    public static IEnumerable<Student> WhereHighPerformer(this IEnumerable<Student> students) {
        return students.Where(s => s.GPA >= 3.8);
    }

    public static IEnumerable<Student> WhereByMajor(this IEnumerable<Student> students, string major) {
        return students.Where(s => s.Major == major);
    }

    public static double AverageGpa(this IEnumerable<Student> students) {
        return students.Average(s => s.GPA);
    }
}

// Parallel LINQ (PLINQ)
public class ParallelLinqDemo {
    public void DemonstratePLINQ() {
        Console.WriteLine("\\n=== Parallel LINQ (PLINQ) ===");

        var numbers = Enumerable.Range(1, 1000000);

        // Sequential LINQ
        var sequentialStart = DateTime.Now;
        var sequentialResult = numbers.Where(n => n % 2 == 0).Sum();
        var sequentialTime = DateTime.Now - sequentialStart;

        // Parallel LINQ
        var parallelStart = DateTime.Now;
        var parallelResult = numbers.AsParallel().Where(n => n % 2 == 0).Sum();
        var parallelTime = DateTime.Now - parallelStart;

        Console.WriteLine($"Sequential result: {sequentialResult}, Time: {sequentialTime.TotalMilliseconds}ms");
        Console.WriteLine($"Parallel result: {parallelResult}, Time: {parallelTime.TotalMilliseconds}ms");
        Console.WriteLine($"Speedup: {sequentialTime.TotalMilliseconds / parallelTime.TotalMilliseconds:F2}x");
    }
}

// Main demonstration
public void RunLinqDemo() {
    LinqDemo demo = new LinqDemo();

    demo.DemonstrateBasicOperations();
    demo.DemonstrateAggregation();
    demo.DemonstrateGrouping();
    demo.DemonstrateJoining();
    demo.DemonstrateSetOperations();
    demo.DemonstratePartitioning();
    demo.DemonstrateQuerySyntax();
    demo.DemonstrateExecution();
    demo.DemonstrateAdvancedQueries();
    demo.DemonstrateCustomLinq();

    ParallelLinqDemo plinqDemo = new ParallelLinqDemo();
    plinqDemo.DemonstratePLINQ();
}`,
  keyPoints: [
    'LINQ provides unified query syntax across different data sources',
    'Use method syntax for complex queries, query syntax for readability',
    'Most LINQ operators use deferred execution',
    'Join operations combine data from multiple sources',
    'GroupBy creates groups of related elements',
    'Aggregation operators (Sum, Average, etc.) use immediate execution',
    'PLINQ can parallelize LINQ queries for better performance',
  ],
  exercise:
    'Using the student/course/enrollment data structure, write LINQ queries to: 1) Find students enrolled in "CS101", 2) Calculate average GPA by major, 3) Find courses with the highest enrollment, 4) Get student grade distributions, 5) Find students taking courses from a specific instructor.',
};
