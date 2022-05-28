---
layout: Post
title: Java SE8 Features
author: Desmond
date: 2021-01-02 19:00:58
useHeaderImage: true
headerImage: https://i.loli.net/2021/01/02/C7nzoRgKAZQjOxD.jpg
headerMask: rgba(45, 55, 71, .5)
permalinkPattern: /post/:year/:month/:day/:slug/
tags: [Java]
---

## Lambdas and Streams

### Functional Programming

you specify what you want to accomplish in a task, but not how to accomplish it

**immutability**: not modifying the data source being processed or any other program state

**functional interface** - **single abstract method** (SAM):
![https://i.loli.net/2021/01/02/7g5zNjh6YcEwJVR.png](https://i.loli.net/2021/01/02/7g5zNjh6YcEwJVR.png)

**lambda expression**: represents an anonymous method—a shorthand notation for implementing a functional interface, similar to an anonymous inner class, can be used anywhere functional interfaces are expected

> the type of a lambda expression is the type of the functional interface that the lambda expression implements

A lambda consists of a parameter list followed by the **arrow token** (->) and a body:

```
(parameterList) -> {statements}
```

The following lambda receives two ints and returns their sum:

```java
(int x, int y) -> {return x + y;}
```

**the compiler determines the parameter and return types by the lambda’s
context**

When the body contains only one expression, the return keyword and curly braces
may be omitted:

```java
(x, y) -> x + y
```

When the parameter list contains only one parameter, the parentheses may be omitted:

```java
value -> System.out.printf("%d ", value)
```

To define a lambda with an empty parameter list, specify the parameter list as empty
parentheses to the left of the arrow token (->):

```java
() -> System.out.println("Welcome to lambdas!")
```

**streams**: objects of classes that implement interface Stream (from the package java.util.stream). Together with lambdas, streams enable you to perform tasks on <u>collections of elements</u>—often from an array or collection object

**stream pipelines**: streams move elements through a sequence of processing steps , begins with a <u>data source</u> (such as an array or collection), performs various <u>intermediate operations</u> on the data source’s elements and ends with a <u>terminal operation</u> (chaining method calls)

> streams do not have their own storage—once a stream is processed, it cannot be reused

**intermediate operation**: specifies tasks to perform on the stream’s elements and always results in a new stream, <u>lazy</u> (they are not performed until a terminal operation is invoked)

**terminal operation**: initiates processing of a stream pipeline’s intermediate operations and produces a result, <u>eager</u> (they perform the requested operation when they are called)

![s](https://i.loli.net/2021/01/03/UZiq8j3zsaIbVtQ.png)

### IntStream Operations

**IntStream** (java.util.stream): specialized stream for manipulating int values

IntStream static method **of**: receives an int array as an argument and returns an IntStream for processing the array’s values

**IntConsumer** (java.util.function): an int-specific version of the generic Consumer functional interface. This interface’s <u>accept</u> method receives one int value and performs a task with it

lambda's **target type**: the functional interface type that is expected where the lambda
appears in the code (e.g IntConsumer -> int)

**capturing lambda**: A lambda that refers to a local variable in the enclosing lexical scope

Common **reduction operations** for IntStreams:

- count: returns the number of elements in the stream

- min: returns the smallest int in the stream

- max: returns the largest int in the stream

- sum: returns the sum of all the ints in the stream

- average: returns an <u>OptionalDouble</u> containing the average of the ints in the stream as a value of type double (enable method average to return the average if the stream contains at least one element)

- OptionalDouble's <u>getAsDouble</u> method: if there were no elements, the OptionalDouble would not contain the average and getAsDouble would throw a NoSuchElementException (to prevent this, you can instead call method <u>orElse</u>, which returns the OptionalDouble's value if there is one, or the value you pass to orElse, otherwise)

- summaryStatistics: performs the count, min, max, sum and average operations in one pass of an IntStream’s elements and returns the results as an IntSummaryStatistics object:

  ```java
  System.out.println(IntStream.of(values).summaryStatistics());
  ```

terminal operation **reduce**: define your own reductions for an IntStream, The first argument (0) is a value (identity value) that helps you begin the reduction operation, the second argument is an object that implements the IntBinaryOperator functional interface (java.util.function)

```java
(x, y) -> x + y // implements the interface's applyAsInt method
```

evaluation of the reduction proceeds as follows:

- On the first call to reduce, lambda parameter x’s value is the identity value (0) and lambda parameter y’s value is the first int in the stream (3), producing the sum 3 (0 + 3)

- On the next call to reduce, lambda parameter x’s value is the result of the first calculation (3) and lambda parameter y’s value is the second int in the stream (10), producing the sum 13 (3 + 10)

- On the next call to reduce, lambda parameter x’s value is the result of the previous calculation (13) and lambda parameter y’s value is the third int in the stream (6), producing the sum 19 (13 + 6)

Intermediate Operation **filter** (stateless): filter elements to produce a stream of intermediate results that match a condition—known as a predicate, receives an object that implements the <u>IntPredicate </u>functional interface (package java.util.function)

```java
value -> value % 2 == 0
/*
implements the interface’s test method,
which receives an int and returns a boolean
indicating whether the int satisfies the predicate
*/
```

Intermediate Operation **sorted** (stateful):

all prior intermediate operations in the stream pipeline must be complete so that method sorted knows which elements to sort

**stateless intermediate operation**: it does not require any information about other elements in the stream in order to test whether the current element satisfies the predicate

**stateful intermediate operation**: requires information about all of the other elements in the stream in order to sort them

Other Methods of the **IntPredicate** Functional Interface:

- and: performs a logical AND with short-circuit evaluation (Section 5.9) between the IntPredicate on which it’s called and the IntPredicate it receives as an argument

- negate: reverses the boolean value of the IntPredicate on which it’s called

- or: performs a logical OR with short-circuit evaluation between the IntPredicate on which it’s called and the IntPredicate it receives as an argument

Intermediate Operation **map** (lazy, stateless): transforms a stream’s elements to new values and produces a stream containing the resulting elements, receives an object that implements the IntUnaryOperator

```java
import java.util.Arrays;
import java.util.stream.IntStream;

public class IntStreamOperations
{
   public static void main(String[] args)
   {
      int[] values = {3, 10, 6, 1, 4, 8, 2, 5, 9, 7};

      // display original values
      System.out.print("Original values: ");
      IntStream.of(values)
               .forEach(value -> System.out.printf("%d ", value));
      System.out.println();

      // count, min, max, sum and average of the values
      System.out.printf("%nCount: %d%n", IntStream.of(values).count());
      System.out.printf("Min: %d%n",
         IntStream.of(values).min().getAsInt());
      System.out.printf("Max: %d%n",
         IntStream.of(values).max().getAsInt());
      System.out.printf("Sum: %d%n", IntStream.of(values).sum());
      System.out.printf("Average: %.2f%n",
         IntStream.of(values).average().getAsDouble());

      // sum of values with reduce method
      System.out.printf("%nSum via reduce method: %d%n",
         IntStream.of(values)
                  .reduce(0, (x, y) -> x + y));

      // sum of squares of values with reduce method
      System.out.printf("Sum of squares via reduce method: %d%n",
         IntStream.of(values)
                  .reduce(0, (x, y) -> x + y * y));

      // product of values with reduce method
      System.out.printf("Product via reduce method: %d%n",
         IntStream.of(values)
                  .reduce(1, (x, y) -> x * y));

      // even values displayed in sorted order
      System.out.printf("%nEven values displayed in sorted order: ");
      IntStream.of(values)
               .filter(value -> value % 2 == 0)
               .sorted()
               .forEach(value -> System.out.printf("%d ", value));
      System.out.println();

      // odd values multiplied by 10 and displayed in sorted order
      System.out.printf(
         "Odd values multiplied by 10 displayed in sorted order: ");
      IntStream.of(values)
               .filter(value -> value % 2 != 0)
               .map(value -> value * 10)
               .sorted()
               .forEach(value -> System.out.printf("%d ", value));
      System.out.println();

      // sum range of integers from 1 to 10, exlusive
      System.out.printf("%nSum of integers from 1 to 9: %d%n",
         IntStream.range(1, 10).sum());

      // sum range of integers from 1 to 10, inclusive
      System.out.printf("Sum of integers from 1 to 10: %d%n",
         IntStream.rangeClosed(1, 10).sum());
   }
} // end class IntStreamOperations
```

**Tips:**

- Once you create a stream, you can chain together multiple method calls to create a **stream pipeline**

- In Java SE8, anonymous inner classes and lambdas can also use effectively final local variables

- In a lambda, you refer to the object of the outer class, simply as this

- The parameter names and variable names that you use in lambdas cannot be the same as as any other local variables in the lambda’s lexical scope

- A lambda with two or more parameters must enclose them in parentheses

### Stream\<Integer> Manipulations

Array’s **stream** method can be used to create a Stream from an array of objects

Interface **Stream** (java.util.stream) is a generic interface for performing stream operations on any non-primitive type

Stream method **collect** (terminal operation): create a collection, performs a <u>mutable reduction</u> operation that places the results into an object which subsequently can be modified—often a collection, such as a List, Map or Set

class **Collectors** (java.util.stream): provides static methods that return predefined Collector implementations (e.g. **toList**: transforms the Stream\<Integer> into a List\<Integer> collection)

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

public class ArraysAndStreams
{
   public static void main(String[] args)
   {
      Integer[] values = {2, 9, 5, 0, 3, 7, 1, 4, 8, 6};

      // display original values
      System.out.printf("Original values: %s%n", Arrays.asList(values));

      // sort values in ascending order with streams
      System.out.printf("Sorted values: %s%n",
         Arrays.stream(values)
               .sorted()
               .collect(Collectors.toList()));

      // values greater than 4
      List<Integer> greaterThan4 =
         Arrays.stream(values)
               .filter(value -> value > 4)
               .collect(Collectors.toList());
      System.out.printf("Values greater than 4: %s%n", greaterThan4);

      // filter values greater than 4 then sort the results
      System.out.printf("Sorted values greater than 4: %s%n",
         Arrays.stream(values)
               .filter(value -> value > 4)
               .sorted()
               .collect(Collectors.toList()));

      // greaterThan4 List sorted with streams
      System.out.printf(
         "Values greater than 4 (ascending with streams): %s%n",
         greaterThan4.stream()
               .sorted()
               .collect(Collectors.toList()));
   }
} // end class ArraysAndStreams
```

### Stream\<String> Manipulations

![ ](https://i.loli.net/2021/01/03/BtsEkf823NZ7X9i.png)

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.stream.Collectors;

public class ArraysAndStreams2
{
   public static void main(String[] args)
   {
      String[] strings =
         {"Red", "orange", "Yellow", "green", "Blue", "indigo", "Violet"};

      // display original strings
      System.out.printf("Original strings: %s%n", Arrays.asList(strings));

      // strings in uppercase
      System.out.printf("strings in uppercase: %s%n",
         Arrays.stream(strings)
               .map(String::toUpperCase)
               .collect(Collectors.toList()));

      // strings greater than "m" (case insensitive) sorted ascending
      System.out.printf("strings greater than m sorted ascending: %s%n",
         Arrays.stream(strings)
               .filter(s -> s.compareToIgnoreCase("m") > 0)
               .sorted(String.CASE_INSENSITIVE_ORDER)
               .collect(Collectors.toList()));

      // strings greater than "m" (case insensitive) sorted descending
      System.out.printf("strings greater than m sorted descending: %s%n",
         Arrays.stream(strings)
               .filter(s -> s.compareToIgnoreCase("m") > 0)
               .sorted(String.CASE_INSENSITIVE_ORDER.reversed())
               .collect(Collectors.toList()));
   }
} // end class ArraysAndStreams2
```

**Tips:**

- String::toUpperCase is known as a **method reference** and is a shorthand notation for a lambda expression—in this case, for a lambda expression like:

  ```java
  (String s) -> {return s.toUpperCase();}
  ```

  or

  ```java
  s -> s.toUpperCase()
  ```

- the instance method reference String::toUpperCase is treated as a
  lambda that implements interface Function

### Stream\<Employee> Manipulations

```java
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Collectors;

public class ProcessingEmployees
{
   public static void main(String[] args)
   {
      // initialize array of Employees
      Employee[] employees = {
         new Employee("Jason", "Red", 5000, "IT"),
         new Employee("Ashley", "Green", 7600, "IT"),
         new Employee("Matthew", "Indigo", 3587.5, "Sales"),
         new Employee("James", "Indigo", 4700.77, "Marketing"),
         new Employee("Luke", "Indigo", 6200, "IT"),
         new Employee("Jason", "Blue", 3200, "Sales"),
         new Employee("Wendy", "Brown", 4236.4, "Marketing")};

      // get List view of the Employees
      List<Employee> list = Arrays.asList(employees);

      // display all Employees
      System.out.println("Complete Employee list:");
      list.stream().forEach(System.out::println);

      // Predicate that returns true for salaries in the range $4000-$6000
      Predicate<Employee> fourToSixThousand =
         e -> (e.getSalary() >= 4000 && e.getSalary() <= 6000);

      // Display Employees with salaries in the range $4000-$6000
      // sorted into ascending order by salary
      System.out.printf(
         "%nEmployees earning $4000-$6000 per month sorted by salary:%n");
      list.stream()
          .filter(fourToSixThousand)
          .sorted(Comparator.comparing(Employee::getSalary))
          .forEach(System.out::println);

      // Display first Employee with salary in the range $4000-$6000
      System.out.printf("%nFirst employee who earns $4000-$6000:%n%s%n",
         list.stream()
             .filter(fourToSixThousand)
             .findFirst()
             .get());

      // Functions for getting first and last names from an Employee
      Function<Employee, String> byFirstName = Employee::getFirstName;
      Function<Employee, String> byLastName = Employee::getLastName;

      // Comparator for comparing Employees by first name then last name
      Comparator<Employee> lastThenFirst =
         Comparator.comparing(byLastName).thenComparing(byFirstName);

      // sort employees by last name, then first name
      System.out.printf(
         "%nEmployees in ascending order by last name then first:%n");
      list.stream()
          .sorted(lastThenFirst)
          .forEach(System.out::println);

      // sort employees in descending order by last name, then first name
      System.out.printf(
         "%nEmployees in descending order by last name then first:%n");
      list.stream()
          .sorted(lastThenFirst.reversed())
          .forEach(System.out::println);

      // display unique employee last names sorted
      System.out.printf("%nUnique employee last names:%n");
      list.stream()
          .map(Employee::getLastName)
          .distinct()
          .sorted()
          .forEach(System.out::println);

      // display only first and last names
      System.out.printf(
         "%nEmployee names in order by last name then first name:%n");
      list.stream()
          .sorted(lastThenFirst)
          .map(Employee::getName)
          .forEach(System.out::println);

      // group Employees by department
      System.out.printf("%nEmployees by department:%n");
      Map<String, List<Employee>> groupedByDepartment =
         list.stream()
             .collect(Collectors.groupingBy(Employee::getDepartment));
      groupedByDepartment.forEach(
         (department, employeesInDepartment) ->
         {
            System.out.println(department);
            employeesInDepartment.forEach(
               employee -> System.out.printf("   %s%n", employee));
         }
      );

      // count number of Employees in each department
      System.out.printf("%nCount of Employees by department:%n");
      Map<String, Long> employeeCountByDepartment =
         list.stream()
             .collect(Collectors.groupingBy(Employee::getDepartment,
                TreeMap::new, Collectors.counting()));
      employeeCountByDepartment.forEach(
         (department, count) -> System.out.printf(
            "%s has %d employee(s)%n", department, count));

      // sum of Employee salaries with DoubleStream sum method
      System.out.printf(
         "%nSum of Employees' salaries (via sum method): %.2f%n",
         list.stream()
             .mapToDouble(Employee::getSalary)
             .sum());

      // calculate sum of Employee salaries with Stream reduce method
      System.out.printf(
         "Sum of Employees' salaries (via reduce method): %.2f%n",
         list.stream()
             .mapToDouble(Employee::getSalary)
             .reduce(0, (value1, value2) -> value1 + value2));

      // average of Employee salaries with DoubleStream average method
      System.out.printf("Average of Employees' salaries: %.2f%n",
         list.stream()
             .mapToDouble(Employee::getSalary)
             .average()
             .getAsDouble());
   } // end main
} // end class ProcessingEmployees
```

**Tips:**

- ```java
  list.stream().forEach(System.out::println);
  ```

  The instance method reference System.out::println is converted by the compiler into an object that implements the Consumer functional interface

- Collectors static method **groupingBy**: receives a Function that classifies the objects in the stream—the values returned by this function are used as the keys in a Map

### Creating a Stream\<String> from a File

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

public class StreamOfLines
{
   public static void main(String[] args) throws IOException
   {
      // Regex that matches one or more consecutive whitespace characters
      Pattern pattern = Pattern.compile("\\s+");

      // count occurrences of each word in a Stream<String> sorted by word
      Map<String, Long> wordCounts =
         Files.lines(Paths.get("Chapter2Paragraph.txt"))
              .map(line -> line.replaceAll("(?!')\\p{P}", ""))
              .flatMap(line -> pattern.splitAsStream(line))
              .collect(Collectors.groupingBy(String::toLowerCase,
                 TreeMap::new, Collectors.counting()));

      // display the words grouped by starting letter
      wordCounts.entrySet()
         .stream()
         .collect(
            Collectors.groupingBy(entry -> entry.getKey().charAt(0),
               TreeMap::new, Collectors.toList()))
         .forEach((letter, wordList) ->
            {
               System.out.printf("%n%C%n", letter);
               wordList.stream().forEach(word -> System.out.printf(
                  "%13s: %d%n", word.getKey(), word.getValue()));
            });
   }
} // end class StreamOfLines
```

**Tips:**

- Line 20 uses Files method **lines** to create a Stream for reading the lines of text from a file. Class **Files** (java.nio.file) is one of many classes throughout the Java APIs that have been enhanced to support Streams

- Line 22 uses Stream method **flatMap** to break each line of text into its separate words. Method flatMap receives a Function that maps an object into a stream of
  elements. The lambda in line 22 passes the String representing a line of text to Pattern method **splitAsStream** (new in Java SE 8), which uses the regular expression specified in the Pattern (line 16) to tokenize the String into its individual words.

- The **Map** factory is an object that implements interface **Supplier** and returns a new Map collection—the <u>constructor reference</u> TreeMap::new returns a TreeMap that maintains its keys in sorted order. **Collectors.counting()** is the <u>downstream Collector</u> that determines the number of occurrences of each key in the stream.

- line 27 calls Map method entrySet on wordCounts to get a Set of Map.Entry objects that each contain one key–value pair from wordCounts. This produces an object of type Set\<Map.Entry\<String, Long>>

- Line 28 calls Set method stream to get a Stream<Map.Entry\<String, Long>>

### Generating Streams of Random Values

In Java SE 8, class SecureRandom has overloaded methods **ints**, **longs** and **doubles**, which return IntStream, LongStream and DoubleStream, respectively

- **ints()**: creates an IntStream for an **infinite stream of random ints**. An infinite
  stream has an unknown number of elements—you use a short-circuiting terminal
  operation to complete processing on an infinite stream. We’ll use an infinite stream in Chapter 23 to find prime numbers with the Sieve of Eratosthenes.

- **ints(long)**: creates an IntStream with the <u>specified number </u>of random ints.

- **ints(int, int)**: creates an IntStream for an infinite stream of random int values in the range starting with the first argument and up to, but not including, the second argument.

- **ints(long, int, int)**: creates an IntStream with the specified number of random int values in the range starting with the first argument and up to, but not including, the second argument.

interface Function static method **identity**: creates a Function that simply returns its argument

```java
import java.security.SecureRandom;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.IntStream;
import java.util.stream.Collectors;

public class RandomIntStream
{
   public static void main(String[] args)
   {
      SecureRandom random = new SecureRandom();

      // roll a die 6,000,000 times and summarize the results
      System.out.printf("%-6s%s%n", "Face", "Frequency");
      random.ints(6_000_000, 1, 7)
            .boxed()
            .collect(Collectors.groupingBy(Function.identity(),
               Collectors.counting()))
            .forEach((face, frequency) ->
               System.out.printf("%-6d%d%n", face, frequency));
   }
} // end class RandomIntStream
```

### Additional Notes on Java SE 8 Interfaces

**Java SE 8 Interfaces Allow Inheritance of Method Implementations**:

Functional interfaces must contain only one abstract method, but may also contain <u>default methods</u> and <u>static methods</u> that are fully implemented in the interface declarations
