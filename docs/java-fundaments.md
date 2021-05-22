---
title: Java Fundaments
author: Desmond
catalog: true
tags: Java
abbrlink: b9635e54
date: 2020-10-12 15:28:00
header-img: b9635e54/head.jpg
categories:
top:
---

# Java Fundaments

## Online Tutorials & References

- [Baeldung](https://www.baeldung.com/)
- [HowToDoInJava](https://howtodoinjava.com/)
- [Jenkov](http://tutorials.jenkov.com/)
- [Geeks for Geeks](https://www.geeksforgeeks.org/java/)

## Basics

### Object Technology

**object**: reusable software component = **attributes** (instance variable) + **behaviors**

**method**: houses the program statements that actually perform its tasks.

**class**: houses the set of methods that perform the class's tasks

**instantiation**: build an object of a class before a program can perform the tasks

**method call**: tells a method of the object to perform its task (send messages to an object)

**encapsulation** (information hiding): classes and objects encapsulate their attributes and methods (implementation details are hidden)

**inheritance**: the new class (subclass) starts with the characteristics of an existing class (superclass)

**interface**: collections of related methods that typically enable you to tell objects what to do, but not how to do it (a class implement zero or more interfaces and may implement their methods differently)

### Philosophy of Java

**write once, run anywhere**

### Primitive Types

**boolean, byte, char, short,int, long, float and double**

### Class Declaration

```java
public class Welcome 
```

- Every java program consists of at least one class that you define
- A *public* class must be placed in a file that has a filename of the form *ClassName.java*, otherwise a compilation error occurs
- class name begin with a capital letter and capitalize the first letter of each word they include (e.g. *SampleClassName*)

### Method Declaration

```java
public static void main(String[] args)
```

- For a runnable java application, one of the methods must be called *main* 
- Keyword *void* indicates that this method will not return any information

### Import Declaration

**package** (java class library / java API): named groups of related classes

```java
import java.util Scanner;
```

- All *import* declarations must appear before the first class declaration
- If you compile the code with javac using the command-line argument **-deprecation**, the compiler will tell you which deprecated features you're using

### Basic Output

**Tip**: Strings cannot span multiple lines of code

```java
public class Welcome2 
{
   // main method begins execution of Java application
   public static void main(String[] args)
   {
      System.out.print("Welcome to ");
      System.out.println("Java Programming!");
      System.out.printf("%s%n%s%n",          
        "Welcome to", "Java Programming!");
   } // end method main
}
```

**System.out**: standard output object

**System.out.println**: displays a line of text in the command window (positions the output cursor at the beginning of the next line)

**System.out.print**: does not position the output cursor at the beginning of the next line in the command window

**Tip**: %n 换行只能用在 **System.out.printf**, 其余用 \n

### Basic Input

```java
import java.util.Scanner; // program uses class Scanner

public class Addition 
{
   // main method begins execution of Java application
   public static void main(String[] args)
   {
      // create a Scanner to obtain input from the command window
      Scanner input = new Scanner(System.in);

      int number1; // first number to add
      int number2; // second number to add
      int sum; // sum of number1 and number2

      System.out.print("Enter first integer: "); // prompt 
      number1 = input.nextInt(); // read first number from user

      System.out.print("Enter second integer: "); // prompt 
      number2 = input.nextInt(); // read second number from user

      sum = number1 + number2; // add numbers, then store total in sum

      System.out.printf("Sum is %d%n", sum); // display sum
   } // end method main
} // end class Addition
```

Before using a *Scanner*, you must create it and specify the source of the data

**System.in**: standard input object

```java
import java.util.Scanner; 

public class LetterGrades 
{
   public static void main(String[] args)
   {
      int total = 0; // sum of grades                  
      int gradeCounter = 0; // number of grades entered
      int aCount = 0; // count of A grades             
      int bCount = 0; // count of B grades             
      int cCount = 0; // count of C grades             
      int dCount = 0; // count of D grades             
      int fCount = 0; // count of F grades             

      Scanner input = new Scanner(System.in);

      System.out.printf("%s%n%s%n   %s%n   %s%n", 
         "Enter the integer grades in the range 0-100.", 
         "Type the end-of-file indicator to terminate input:", 
         "On UNIX/Linux/Mac OS X type <Ctrl> d then press Enter",
         "On Windows type <Ctrl> z then press Enter");

      // loop until user enters the end-of-file indicator
      while (input.hasNext()) 
      {
         int grade = input.nextInt(); // read grade
         total += grade; // add grade to total
         ++gradeCounter; // increment number of grades

         //  increment appropriate letter-grade counter   
         switch (grade / 10)                            
         {                                                
            case 9:  // grade was between 90              
            case 10: // and 100, inclusive                
               ++aCount;         
               break; // exits switch         

            case 8: // grade was between 80 and 89        
               ++bCount;            
               break; // exits switch                      

            case 7: // grade was between 70 and 79        
               ++cCount;            
               break; // exits switch                      

            case 6: // grade was between 60 and 69        
               ++dCount;             
               break; // exits switch                      

            default: // grade was less than 60            
               ++fCount;              
               break; // optional; exits switch anyway
         } // end switch                                  
      } // end while 

      // display grade report
      System.out.printf("%nGrade Report:%n");

      // if user entered at least one grade...
      if (gradeCounter != 0) 
      {
         // calculate average of all grades entered
         double average = (double) total / gradeCounter;  

         // output summary of results
         System.out.printf("Total of the %d grades entered is %d%n", 
            gradeCounter, total);
         System.out.printf("Class average is %.2f%n", average);
         System.out.printf("%n%s%n%s%d%n%s%d%n%s%d%n%s%d%n%s%d%n", 
            "Number of students who received each grade:", 
            "A: ", aCount,   // display number of A grades
            "B: ", bCount,   // display number of B grades
            "C: ", cCount,   // display number of C grades 
            "D: ", dCount,   // display number of D grades
            "F: ", fCount); // display number of F grades
      } // end if
      else // no grades were entered, so output appropriate message
         System.out.println("No grades were entered");
   } // end main
} // end class LetterGrades
```

**hasNext**: determine whether there's more data to input (returns a boolean value)

### Instance Variables & Basic Methods

- maintain data for each object
- each object (instance) of the class has its **own copy** of the class's instance variables
- instance variables are declared inside a class declaration but outside the bodies of the class's methods

```java
public class Account
{
   private String name; // instance variable

   // method to set the name in the object              
   public void setName(String name)      
   {                                             
      this.name = name; // store the name ("this" refers to the shadowed instance variable)
   }         

   // method to retrieve the name from the object
   public String getName()        
   {                                    
      return name; // return value of name to caller        
   }         
} // end class Account
```

**Tips:**

- class names begin with an initial uppercase letter, and method names and variable names begin with an initial lowercase letter
- variables or methods declared with access modifier **private** are accessible only to methods of the class in which they're declared
- **parameter** (inside the bracket of method header) vs. **argument** (inside the bracket of method call), argument is **copied** into parameter
- **local variables**: variables declared in a particular method's body, can only be used in that method
- local variable **shadow** the instance variable: if a method contains a local variable with the same name as an instance variable, that method's body will refer to the local variable rather than the instance variable
- **data hiding** / **information hiding** / **encapsulation**: tightly controlling the access to and presentation of **private** data can greatly reduce errors, while increasing the robustness and security of programs

```java
import java.util.Scanner;

// driver class
public class AccountTest
{
   // main begins the execution of a Java app
   public static void main(String[] args)
   { 
      // create a Scanner object to obtain input from the command window
      Scanner input = new Scanner(System.in);

      // create an Account object and assign it to myAccount
      Account myAccount = new Account(); // class instance creation expression

      // display initial value of name (null)
      System.out.printf("Initial name is: %s%n%n", myAccount.getName());

      // prompt for and read name
      System.out.println("Please enter the name:");
      String theName = input.nextLine(); // read a line of text
      myAccount.setName(theName); // put theName in myAccount
      System.out.println(); // outputs a blank line

      // display the name stored in object myAccount
      System.out.printf("Name in object myAccount is:%n%s%n",
         myAccount.getName());
   } 
} // end class AccountTest
```

**Tips:**

- **nextLine**: reads characters (includes white-space characters) until it encounters the newline, then returns a String containing the characters up to, but **not** including, the newline, which is discarded

- **next**: reads the next word, reads characters until it encounters a white-space character (all information after the first white-space character is **not** lost - it can be read by subsequent statements that call the Scanner's methods later in the program)

- **static** method: you can call it without first creating an object of the class in which the method is declared
  
  > When main needs to call another method in the same class without first creating an object of that class, the other method also must be declared static
  
  > you can call a static method by: *ClassName.methodName(arguments)*

- **default package** (classes compiled in the same directory): classes in the same package are implicitly imported into the source-code files of other classes in that package. 
  
  > an imported declaration is not required when one class in a package uses another in the same package

- **fully qualified class name** (no need of import):
  
  ```java
  java.util.Scanner input = new java.util.Scanner(System.in);
  ```

### Primitive Types vs. Reference Types

> Java is a strongly typed language

**primitive-type** instance variables are initialized by default:

- byte, char, short, int, long, float, double are initialized to **0**
- boolean is initialized to **false**

**reference-type** instance variables store the address of objects (refer to an object)

- if not explicitly initialized, they are initialized by default to the value **null**

```java
public class Account
{
   private String name; // instance variable

   // constructor initializes name with parameter name
   public Account(String name) // constructor name is class name 
   {                                                               
      this.name = name;
   }                                            

   // method to set the name
   public void setName(String name)
   {
      this.name = name; 
   } 

   // method to retrieve the name
   public String getName()
   {
      return name; 
   } 
} // end class Account
```

**Tip**: **constructor** specify custom initialization for objects in class (**no return type**)

```java
public class AccountTest
{
   public static void main(String[] args)
   { 
      // create two Account objects
      Account account1 = new Account("Jane Green");
      Account account2 = new Account("John Blue"); 

      // display initial value of name for each Account
      System.out.printf("account1 name is: %s%n", account1.getName());
      System.out.printf("account2 name is: %s%n", account2.getName());
   } 
} // end class AccountTest
```

**Tips:**

- keyword **new** requests memory from the system to store the Account object, then implicitly calls the class's constructor to initialize the object

- **default constructor**:
  
  ```java
  Account myAccount = new Account();
  ```
  
  when a class has only the default constructor, the class's instance variables are initialized to their default values
  
  > Unless  default  initialization  of  your  class’s  instance  variables  is  acceptable,  provide  a custom  constructor  to  ensure  that  your  instance  variables  are  properly  initialized  with meaningful values when each new object of your class is created

### Floating-Point Numbers

**float**: 7 significant digits

**double**: 15 significant digits

**floating-point literals**: Java treats all floating-point numbers you type in a program's source code as double values by default

> replacing duplicated code with calls to a method that contains one copy of that code canreduce the size of your program and improve its maintainability.

### Logical Operator

**exclusive OR** (^)

**dependent condition**: in expressions using operator &&, a condition may require another condition to be true for the evaluation of the dependent condition to be meaningful. In this case, the dependent condition should be placed after the && operator to prevent errors

> e.g (i != 0) && (10 / i == 2), the dependent condition (10 / i == 2) must appear after the && operator to prevent the possibility of division by zero

## Methods

- **divide and conquer:** The best way to develop and maintain a large program is to construct it from small, simple pieces, or **modules** 
- **software reusability:** To promote software reusability, every method should be limited to performing a single, well-defined task, and the name of the method should express that task effectively

### static Methods, static Fields and Class Math

**static method** (**class method**): *ClassName.methodName(arguments)*

> static methods in the same class can call each other directly
> 
> to access the class's instance variables and instance methods, a static method must use a **reference** to an object of the class
> 
> Instance methods can access all fields and methods of the class

**static variables** (**class variables**): all the objects of that class share **one** copy of those variables

**final**: any field declared with keyword final is constant

![](b9635e54/math.jpg)

### Declaring Methods with Multiple Parameters

```java
import java.util.Scanner;

public class MaximumFinder 
{
   // obtain three floating-point values and determine maximum value
   public static void main(String[] args)
   {
      // create Scanner for input from command window
      Scanner input = new Scanner(System.in);

      // prompt for and input three floating-point values
      System.out.print(
         "Enter three floating-point values separated by spaces: ");
      double number1 = input.nextDouble(); // read first double
      double number2 = input.nextDouble(); // read second double
      double number3 = input.nextDouble(); // read third double

      // determine the maximum value
      double result = maximum(number1, number2, number3); 

      // display maximum value 
      System.out.println("Maximum is: " + result); // concatenation
   } 

   // returns the maximum of its three double parameters
   public static double maximum(double x, double y, double z)
   {
      double maximumValue = x; // assume x is the largest to start

      // determine whether y is greater than maximumValue
      if (y > maximumValue)
         maximumValue = y; 

      // determine whether z is greater than maximumValue
      if (z > maximumValue)
         maximumValue = z;

      return maximumValue;
   } 
} // end class MaximumFinder
```

**Tips:**

- Every primitive value and object in Java can be represented as a String. When one of the **+** operator's operands is a String, the other is converted to a String
- All objects have a **toString** method that returns a String representation of the object
- It's a syntax error to break a String literal across lines. If necessary, you can split a String into several smaller Strings and use concatenation to form the desired String

### Notes on Declaring and Using Methods

3 ways to **call** a method:

- using a method name by itself to call another method of the same class
- using a variable that contains a reference to an object, followed by a dot (**.**) and the method name to call a non-static method (**instance methods**) of the referenced object
- using the class name and dot (**.**) to call a static method of a class

> declaring a method outside the body of a class declaration or inside the body of another method is a syntax error
> 
> redeclaring a parameter as a local variable in the method's body is a compilation error

**stack frame** (**activation record**): the memory for the local variables (including the method parameters) used in each invocation of a method during a program's execution

### Argument Promotion and Casting

**argument promotion**: converting an argument's value, if possible, to the type that the method expects to receive in its corresponding parameter. Each value is promoted to the **highest** type in the expression (without losing data). The expression uses a **temporary copy** of each value - the types of the original values remain unchanged

> casting a primitive-type value to another primitive type may change the value if the new type is not a valid promotion. For example, casting a floating-point value to an integer value may introduce truncation errors (loss of the fractional part) into the result

![](b9635e54/promotion.jpg)

### Case Study: Secure Random-Number Generation

**Secure Random** (package java.security): nondeterministic random numbers that cannot be predicted

```java
int number = shiftingValue + differenceBetweenValues * randomNumbers.nextInt(scalingFactor);
```

```java
// Shifted and scaled random integers.
import java.security.SecureRandom; // program uses class SecureRandom

public class RandomIntegers 
{
   public static void main(String[] args)
   {      
      // randomNumbers object will produce secure random numbers
      SecureRandom randomNumbers = new SecureRandom(); 

      // loop 20 times
      for (int counter = 1; counter <= 20; counter++) 
      {
         // pick random integer from 1 to 6
         int face = 1 + randomNumbers.nextInt(6);

         System.out.printf("%d  ", face); // display generated value

         // if counter is divisible by 5, start a new line of output
         if (counter % 5 == 0)
            System.out.println();
      } 
   } 
} // end class RandomIntegers
```

```java
// Roll a six-sided die 6000 times.
import java.security.SecureRandom;

public class RollDie 
{
   public static void main(String[] args)
   {
      // randomNumbers object will produce secure random numbers
      SecureRandom randomNumbers = new SecureRandom();

      int frequency1 = 0; // count of 1s rolled
      int frequency2 = 0; // count of 2s rolled
      int frequency3 = 0; // count of 3s rolled
      int frequency4 = 0; // count of 4s rolled
      int frequency5 = 0; // count of 5s rolled
      int frequency6 = 0; // count of 6s rolled

      // tally counts for 6,000,000 rolls of a die
      for (int roll = 1; roll <= 6000000; roll++) 
      {
         int face = 1 + randomNumbers.nextInt(6); // number from 1 to 6

         // use face value 1-6 to determine which counter to increment
         switch (face) 
         {   
            case 1:
               ++frequency1; // increment the 1s counter
               break; 
            case 2:
               ++frequency2; // increment the 2s counter
               break;
            case 3:
               ++frequency3; // increment the 3s counter
               break;
            case 4:
               ++frequency4; // increment the 4s counter
               break;
            case 5:
               ++frequency5; // increment the 5s counter
               break;
            case 6:
               ++frequency6; // increment the 6s counter
               break;
         } 
      } 

      System.out.println("Face\tFrequency"); // output headers
      System.out.printf("1\t%d%n2\t%d%n3\t%d%n4\t%d%n5\t%d%n6\t%d%n",
         frequency1, frequency2, frequency3, frequency4,
         frequency5, frequency6);
   }
} // end class RollDie
```

### Case Study: A Game of Chance; Introducing enumTypes

```java
// Craps class simulates the dice game craps.
import java.security.SecureRandom;

public class Craps 
{
   // create secure random number generator for use in method rollDice
   private static final SecureRandom randomNumbers = new SecureRandom();

   // enum type with constants that represent the game status
   private enum Status {CONTINUE, WON, LOST};

   // constants that represent common rolls of the dice
   private static final int SNAKE_EYES = 2;
   private static final int TREY = 3;
   private static final int SEVEN = 7;
   private static final int YO_LEVEN = 11;
   private static final int BOX_CARS = 12;

   // plays one game of craps
   public static void main(String[] args)
   {
      int myPoint = 0; // point if no win or loss on first roll
      Status gameStatus; // can contain CONTINUE, WON or LOST

      int sumOfDice = rollDice(); // first roll of the dice

      // determine game status and point based on first roll 
      switch (sumOfDice) 
      {
         case SEVEN: // win with 7 on first roll
         case YO_LEVEN: // win with 11 on first roll           
            gameStatus = Status.WON;
            break;
         case SNAKE_EYES: // lose with 2 on first roll
         case TREY: // lose with 3 on first roll
         case BOX_CARS: // lose with 12 on first roll
            gameStatus = Status.LOST;
            break;
         default: // did not win or lose, so remember point         
            gameStatus = Status.CONTINUE; // game is not over
            myPoint = sumOfDice; // remember the point
            System.out.printf("Point is %d%n", myPoint);
            break;
      } 

      // while game is not complete
      while (gameStatus == Status.CONTINUE) // not WON or LOST
      { 
         sumOfDice = rollDice(); // roll dice again

         // determine game status
         if (sumOfDice == myPoint) // win by making point
            gameStatus = Status.WON;
         else 
            if (sumOfDice == SEVEN) // lose by rolling 7 before point
               gameStatus = Status.LOST;
      } 

      // display won or lost message
      if (gameStatus == Status.WON)
         System.out.println("Player wins");
      else
         System.out.println("Player loses");
   }

   // roll dice, calculate sum and display results
   public static int rollDice()
   {
      // pick random die values
      int die1 = 1 + randomNumbers.nextInt(6); // first die roll
      int die2 = 1 + randomNumbers.nextInt(6); // second die roll

      int sum = die1 + die2; // sum of die values

      // display results of this roll
      System.out.printf("Player rolled %d + %d = %d%n", 
         die1, die2, sum);

      return sum; 
   }
} // end class Craps
```

**Tips:**

- variables of type Status can be assigned only the three constants declared in the **enum** or a compilation error will occur
- using **enum** constants rather than literal values makes programs easier to read and maintain

### Scope of Declarations

basic scope rules:

- the scope of a **parameter** declaration is the body of the method in which the declaration appears
- the scope of **local-variable** declaration is from the point at which the declaration appears to the end of that block
- the scope of a local-variable declaration that appears in the initialization section of a **for** statement's header is the body of the for statement and the other expressions in the header
- a method or field's scope is the entire body of the class. This enables a class's instance methods to use the fields and other methods of the class

To access a **shadowed** field in a block:

- if the field is an **instance** variable, precede its name with the **this** keyword and a dot, as in *this.x*
- if the field is a **static** class variable, precede its name with the class's name and a dot as in *ClassName.x*

### Method Overloading

methods of the same name can be declared in the same class, as long as they have **different sets of parameters** (determined by the number, types and order, i.e. **signature**,  of the parameters, *but not by return type*)

```java
public class MethodOverload 
{
   // test overloaded square methods
   public static void main(String[] args) 
   {
      System.out.printf("Square of integer 7 is %d%n", square(7));
      System.out.printf("Square of double 7.5 is %f%n", square(7.5));
   }

   // square method with int argument
   public static int square(int intValue)
   {
      System.out.printf("%nCalled square with int argument: %d%n", 
         intValue);
      return intValue * intValue;
   }

   // square method with double argument
   public static double square(double doubleValue)
   {
      System.out.printf("%nCalled square with double argument: %f%n",
         doubleValue);
      return doubleValue * doubleValue;
   }
} // end class MethodOverload
```

## Arrays and Generic Collections

### Arrays

**Arrays**: objects (reference types), consist of related data items of the same type, remain the same length once they're created

> every array stores its length in instance variable **length** (e.g. *a.length*)

#### Declaring and Creating Arrays

```java
int[] c = new int[12];
```

**default value**: 0 for the numeric primitive-type elements, false for boolean elements and null for references

> in an array declaration, specifying the number of elements in the square brackets of the declaration (e.g. int[12] c;) is a syntax error.

#### Examples Using Arrays

```java
public class StudentPoll 
{
   public static void main(String[] args)
   {
      // student response array (more typically, input at run time)
      int[] responses = {1, 2, 5, 4, 3, 5, 2, 1, 3, 3, 1, 4, 3, 3, 3, 
         2, 3, 3, 2, 14};
      int[] frequency = new int[6]; // array of frequency counters

      // for each answer, select responses element and use that value 
      // as frequency index to determine element to increment
      for (int answer = 0; answer < responses.length; answer++)
      {
         try
         {
            ++frequency[responses[answer]];
         } 
         catch (ArrayIndexOutOfBoundsException e)
         {
            System.out.println(e); // invokes toString method
            System.out.printf("   responses[%d] = %d%n%n", 
               answer, responses[answer]);
         } 
      } 

      System.out.printf("%s%10s%n", "Rating", "Frequency");

      // output each array element's value
      for (int rating = 1; rating < frequency.length; rating++)
         System.out.printf("%6d%10d%n", rating, frequency[rating]);
   } 
} // end class StudentPoll
```

#### Enhanced for Statement

```java
for (parameter : arrayName)
    statement
```

- iterates through the elements of an array without using a counter, thus avoiding the possibility of stepping outside the array

- the type of the parameter must be consistent with the type of the elements in the array

- cannot be used to modify elements

- does not require access to the counter indicating the index of the current array element

#### Passing Arrays to Methods

```java
void modifyArray(double[] b)
```

- when an argument to a method is an entire array or an individual array element of a reference type, the called method receives a copy of the **reference**
- when an argument to a method is an individual array element of a primitive type, the called method receives a copy of the element's **value**

```java
public class PassArray 
{
   // main creates array and calls modifyArray and modifyElement
   public static void main(String[] args)
   {
      int[] array = {1, 2, 3, 4, 5};

      System.out.printf(
         "Effects of passing reference to entire array:%n" +
         "The values of the original array are:%n");

      // output original array elements 
      for (int value : array)
         System.out.printf("   %d", value);

      modifyArray(array); // pass array reference
      System.out.printf("%n%nThe values of the modified array are:%n");

      // output modified array elements 
      for (int value : array)
         System.out.printf("   %d", value);

      System.out.printf(
         "%n%nEffects of passing array element value:%n" +
         "array[3] before modifyElement: %d%n", array[3]);

      modifyElement(array[3]); // attempt to modify array[3]
      System.out.printf(
         "array[3] after modifyElement: %d%n", array[3]);
   } 

   // multiply each element of an array by 2 
   public static void modifyArray(int array2[])
   {
      for (int counter = 0; counter < array2.length; counter++)
         array2[counter] *= 2;
   } 

   // multiply argument by 2
   public static void modifyElement(int element)
   {
      element *= 2;
      System.out.printf(
         "Value of element in modifyElement: %d%n", element);
   } 
} // end class PassArray
```

### Multidimensional Arrays

```java
int[][] b = {{1, 2}, {3, 4}};
int[][] b = {{1, 2}, {3, 4, 5}};
```

```java
// a multidimensional array with the same number of columns in every row can be created with an array-creation expression
int[][] b = new int[3][4];
int[][] b = new int[2][];
b[0] = new int[5]; // create 5 columns for row 0
b[1] = new int[3]; // create 3 columns for rows
```

- rows can have different lengths
- arrays of one-dimensional arrays

### Variable-Length Argument Lists

- a type followed by an **ellipsis** (...) in a method's parameter list
- can occur only once in a parameter list
- must be placed at the end of the parameter list
- treated as an array whose elements are all of the same type

```java
public class VarargsTest 
{
   // calculate average
   public static double average(double... numbers)
   {
      double total = 0.0; 

      // calculate total using the enhanced for statement
      for (double d : numbers)
         total += d;

      return total / numbers.length;
   } 

   public static void main(String[] args) 
   {
      double d1 = 10.0;
      double d2 = 20.0;
      double d3 = 30.0;
      double d4 = 40.0;

      System.out.printf("d1 = %.1f%nd2 = %.1f%nd3 = %.1f%nd4 = %.1f%n%n",
         d1, d2, d3, d4);

      System.out.printf("Average of d1 and d2 is %.1f%n", 
         average(d1, d2)); 
      System.out.printf("Average of d1, d2 and d3 is %.1f%n", 
         average(d1, d2, d3));
      System.out.printf("Average of d1, d2, d3 and d4 is %.1f%n", 
         average(d1, d2, d3, d4));
   } 
} // end class VarargsTest
```

### Using Command-Line Arguments

passing options and filenames to applications

```
java InitArray 5 0 4 // separated by white space, not commas
```

```java
public class InitArray 
{
   public static void main(String[] args)
   {
      // check number of command-line arguments
      if (args.length != 3)
         System.out.printf(
            "Error: Please re-enter the entire command, including%n" + 
            "an array size, initial value and increment.%n");
      else
      {
         // get array size from first command-line argument
         int arrayLength = Integer.parseInt(args[0]); 
         int[] array = new int[arrayLength];

         // get initial value and increment from command-line arguments
         int initialValue = Integer.parseInt(args[1]);
         int increment = Integer.parseInt(args[2]);

         // calculate value for each array element
         for (int counter = 0; counter < array.length; counter++)
            array[counter] = initialValue + increment * counter;

         System.out.printf("%s%8s%n", "Index", "Value");

         // display array index and value
         for (int counter = 0; counter < array.length; counter++)
            System.out.printf("%5d%8d%n", counter, array[counter]);
      } 
   } 
} // end class InitArray
```

### Class Arrays

```java
import java.util.Arrays;

public class ArrayManipulations 
{
   public static void main(String[] args)
   {
      // sort doubleArray into ascending order
      double[] doubleArray = {8.4, 9.3, 0.2, 7.9, 3.4};
      Arrays.sort(doubleArray); 
      System.out.printf("%ndoubleArray: ");

      for (double value : doubleArray)
         System.out.printf("%.1f ", value);

      // fill 10-element array with 7s
      int[] filledIntArray = new int[10]; 
      Arrays.fill(filledIntArray, 7); 
      displayArray(filledIntArray, "filledIntArray");

      // copy array intArray into array intArrayCopy
      int[] intArray = {1, 2, 3, 4, 5, 6};
      int[] intArrayCopy = new int[intArray.length];
      System.arraycopy(intArray, 0, intArrayCopy, 0, intArray.length);
      displayArray(intArray, "intArray");
      displayArray(intArrayCopy, "intArrayCopy");

      // compare intArray and intArrayCopy for equality
      boolean b = Arrays.equals(intArray, intArrayCopy);
      System.out.printf("%n%nintArray %s intArrayCopy%n",
         (b ? "==" : "!="));

      // compare intArray and filledIntArray for equality
      b = Arrays.equals(intArray, filledIntArray);
      System.out.printf("intArray %s filledIntArray%n", 
         (b ? "==" : "!="));

      // search intArray for the value 5
      int location = Arrays.binarySearch(intArray, 5); 

      if (location >= 0)
         System.out.printf(
            "Found 5 at element %d in intArray%n", location); 
      else
         System.out.println("5 not found in intArray"); 

      // search intArray for the value 8763
      location = Arrays.binarySearch(intArray, 8763);

      if (location >= 0)
         System.out.printf(
            "Found 8763 at element %d in intArray%n", location); 
      else
         System.out.println("8763 not found in intArray"); 
   } 

   // output values in each array
   public static void displayArray(int[] array, String description)
   {     
      System.out.printf("%n%s: ", description);

      for (int value : array)
         System.out.printf("%d ", value);
   } 
} // end class ArrayManipulations
```

**Tips:**

- when comparing array contents, always use *Arrays.equals(array1, array2)*, which compares the two arrays' contents, rather than array1.equals(array2), which compares whether array1 and array2 refer to the same array object
- **binarySearch**: the negative value returned is based on the search key's insertion point - the index where the key would be inserted in the array if we were performing an insert operation. After insertion point is determined, it changes its sign to negative and subtracts 1 to obtain the return value. It expects its List argument's elements to be sorted in ascending order. If the List argument's elements are not sorted, the result of using binarySearch is undefined

### Introduction to Collections and Class ArrayList

**collections**: predefined data structures, store groups of related objects in memory (any type that has the is-a relationship with the type stored in the collections)

**ArrayList**: can dynamically change its size to accommodate elements 

**generic class**: enable you to specify the exact type that will be stored in a collection and give you the benefits of compile-time type checking, only nonprimitive types can be used to declare variables and create objects of generic classes (boxing allows primitive values to be wrapped as objects)

![](b9635e54/arraylist.jpg)

```java
import java.util.ArrayList;

public class ArrayListCollection
{
   public static void main(String[] args)
   {
      // create a new ArrayList of Strings with an initial capacity of 10
      ArrayList<String> items = new ArrayList<String>(); 

      items.add("red"); // append an item to the list          
      items.add(0, "yellow"); // insert "yellow" at index 0

      // header
      System.out.print(
         "Display list contents with counter-controlled loop:"); 

      // display the colors in the list
      for (int i = 0; i < items.size(); i++)
         System.out.printf(" %s", items.get(i));

      // display colors using enhanced for in the display method
      display(items,
         "%nDisplay list contents with enhanced for statement:");

      items.add("green"); // add "green" to the end of the list
      items.add("yellow"); // add "yellow" to the end of the list      
      display(items, "List with two new elements:"); 

      items.remove("yellow"); // remove the first "yellow"
      display(items, "Remove first instance of yellow:"); 

      items.remove(1); // remove item at index 1
      display(items, "Remove second list element (green):"); 

      // check if a value is in the List
      System.out.printf("\"red\" is %sin the list%n",
         items.contains("red") ? "": "not ");

      // display number of elements in the List
      System.out.printf("Size: %s%n", items.size());
   } 

   // display the ArrayList's elements on the console
   public static void display(ArrayList<String> items, String header)
   {
      System.out.print(header); // display header

      // display each element in items
      for (String item : items)
         System.out.printf(" %s", item);

      System.out.println();
   } 
} // end class ArrayListCollection
```

### Generic Collections

![](b9635e54/collections.jpg)

#### Type-Wrapper Classes

**Boolean, Byte, Character, Double, Float, Integer, Long, Short**

they are final classes, cannot be extended

#### Autoboxing and Auto-Unboxing

**boxing conversion**: converts a value of a primitive type to an object of the corresponding type-wrapper class.

**unboxing conversion**: converts an object of a type-wrapper class to a value of the corresponding primitive type

```java
Integer[] integerArray = new Integer[5];
integerArray[0] = 10;
int value = integerArray[0];
```

#### Interface Collection and Class Collections

Interface **Collection** contains **bulk operations** (i.e. operations performed on an entire collection) for operations such as adding, clearing and comparing.

class **Collections** provides static methods that search, sort and perform other operations on collections

**Iterator**: allows a program to walk through the collection and remove elements from it during iteration

### Lists

interface **List**: implemented by several classes (ArrayList, LinkedList, Vector ...), store only references to objects

**ArrayList, Vector**: resizable-array implementations of List

**LinkedList**: enables efficient insertion/removal of elements in the middle of a collection, but is much less efficient than an ArrayList for jumping to a specific element in the collection

```java
import java.util.List;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;

public class CollectionTest 
{
   public static void main(String[] args)
   {
      // add elements in colors array to list
      String[] colors = {"MAGENTA", "RED", "WHITE", "BLUE", "CYAN"};
      List<String> list = new ArrayList<String>();      

      for (String color : colors)
         list.add(color); // adds color to end of list      

      // add elements in removeColors array to removeList
      String[] removeColors = {"RED", "WHITE", "BLUE"};
      List<String> removeList = new ArrayList<String>();

      for (String color : removeColors)
         removeList.add(color); 

      // output list contents
      System.out.println("ArrayList: ");

      for (int count = 0; count < list.size(); count++)
         System.out.printf("%s ", list.get(count));

      // remove from list the colors contained in removeList
      removeColors(list, removeList);

      // output list contents
      System.out.printf("%n%nArrayList after calling removeColors:%n");

      for (String color : list)
         System.out.printf("%s ", color);
   } 

   // remove colors specified in collection2 from collection1
   private static void removeColors(Collection<String> collection1, 
      Collection<String> collection2)
   {
      // get iterator
      Iterator<String> iterator = collection1.iterator(); 

      // loop while collection has items
      while (iterator.hasNext())         
      {
         if (collection2.contains(iterator.next()))
            iterator.remove(); // remove current element
      } 
   } 
} // end class CollectionTest
```

**Tips:**

- if a collection is modified by one of its methods after an iterator is created for that collection, the iterator immediately becomes invalid (ConcurrentModificationException)

- **type inferencing**: diamond notation
  
  ```java
  List<String> list = new ArrayList<>();
  ```

#### LinkedList

```java
import java.util.List;
import java.util.LinkedList;
import java.util.ListIterator;

public class ListTest 
{
   public static void main(String[] args)
   {
      // add colors elements to list1
      String[] colors = 
         {"black", "yellow", "green", "blue", "violet", "silver"};
      List<String> list1 = new LinkedList<>(); 

      for (String color : colors)
         list1.add(color);

      // add colors2 elements to list2
      String[] colors2 = 
         {"gold", "white", "brown", "blue", "gray", "silver"};
      List<String> list2 = new LinkedList<>();

      for (String color : colors2)
         list2.add(color);

      list1.addAll(list2); // concatenate lists
      list2 = null; // release resources
      printList(list1); // print list1 elements

      convertToUppercaseStrings(list1); // convert to uppercase string
      printList(list1); // print list1 elements

      System.out.printf("%nDeleting elements 4 to 6...");
      removeItems(list1, 4, 7); // remove items 4-6 from list
      printList(list1); // print list1 elements
      printReversedList(list1); // print list in reverse order
   }                                     

   // output List contents
   private static void printList(List<String> list)
   {
      System.out.printf("%nlist:%n");

      for (String color : list)
         System.out.printf("%s ", color);

      System.out.println();
   } 

   // locate String objects and convert to uppercase
   private static void convertToUppercaseStrings(List<String> list)
   {
      ListIterator<String> iterator = list.listIterator();

      while (iterator.hasNext()) 
      {
         String color = iterator.next(); // get item
         iterator.set(color.toUpperCase()); // convert to upper case
      } 
   } 

   // obtain sublist and use clear method to delete sublist items
   private static void removeItems(List<String> list, 
      int start, int end)
   {
      list.subList(start, end).clear(); // remove items
   } 

   // print reversed list
   private static void printReversedList(List<String> list)
   {
      ListIterator<String> iterator = list.listIterator(list.size());

      System.out.printf("%nReversed List:%n");

      // print list in reverse order
      while (iterator.hasPrevious()) 
         System.out.printf("%s ", iterator.previous()); 
   } 
} // end class ListTest
```

**Tips:**

- **set**: replace the current String to which iterator refers with the String returned by method toUpperCase
- **removeItems**: the ending index is not part of the range of the sublist, any changes made to a sublist are also made to the original List

------

class Arrays provides static method **asList** to view an array (backing array) as a List collection

any modifications made through the List view change the array, and any modifications made to the array change the List view.

the only operation permitted on the view returned by asList is **set**, which changes the value of the view and the backing array

```java
import java.util.LinkedList;
import java.util.Arrays;

public class UsingToArray 
{
   // creates a LinkedList, adds elements and converts to array
   public static void main(String[] args)
   {
      String[] colors = {"black", "blue", "yellow"};
      LinkedList<String> links = new LinkedList<>(Arrays.asList(colors));

      links.addLast("red"); // add as last item
      links.add("pink"); // add to the end
      links.add(3, "green"); // add at 3rd index
      links.addFirst("cyan"); // add as first item      

      // get LinkedList elements as an array     
      colors = links.toArray(new String[links.size()]);

      System.out.println("colors: ");

      for (String color : colors)
         System.out.println(color);
   }  
} // end class UsingToArray
```

**Tips:**

- **add** operations are permitted because they operate on the LinkedList object, not the view returned by asList
- the array is a copy of the list's elements - modifying the array's contents does not modify the list
- Passing an array that contains data to **toArray** can cause logic errors. If the number of elements in the array is smaller than the number of elements in the list on which toArrayis called, a new array is allocated to store the list’s elements—without preserving the array argument’s elements. If the number of elements in the array is greater than the number of elements in the list, the elements of the array (starting at index zero) are overwritten with the list’s elements. Array elements that are not overwritten retain their values.

### Collection Methods

![](b9635e54/collectionmethods.jpg)

#### Method sort

must implement the **Comparable** interface, the order is determined by the natural order of the elements' type as implemented by a **compareTo** method (natural comparison method)

sort may specify as a second argument a **Comparator** object that determines an alternative ordering of the elements

```java
import java.util.List;
import java.util.Arrays;
import java.util.Collections;

public class Sort1 
{
   public static void main(String[] args)
   {
      String[] suits = {"Hearts", "Diamonds", "Clubs", "Spades"};

      // Create and display a list containing the suits array elements
      List<String> list = Arrays.asList(suits); 
      System.out.printf("Unsorted array elements: %s%n", list);

      Collections.sort(list); // sort ArrayList
      System.out.printf("Sorted array elements: %s%n", list);
   } 
} // end class Sort1
```

the static Collections method **reverseOrder** returns a Comparator object that orders the collection's elements in reverse order

```java
import java.util.List;
import java.util.Arrays;
import java.util.Collections;

public class Sort2 
{
   public static void main(String[] args)
   {
      String[] suits = {"Hearts", "Diamonds", "Clubs", "Spades"};

      // Create and display a list containing the suits array elements
      List<String> list = Arrays.asList(suits); // create List
      System.out.printf("Unsorted array elements: %s%n", list);

      // sort in descending order using a comparator
      Collections.sort(list, Collections.reverseOrder()); 
      System.out.printf("Sorted list elements: %s%n", list);
   } 
} // end class Sort2
```

a class that implements Comparator must declare a compare method that receives 2 arguments and returns a negative integer if the first argument is less than the second, 0 if the arguments are equal or a positive integer if the first argument is greater than the second

```java
// Custom Comparator class that compares two Time2 objects.
import java.util.Comparator;

public class TimeComparator implements Comparator<Time2> 
{
   @Override
   public int compare(Time2 time1, Time2 time2)
   {
      int hourDifference = time1.getHour() - time2.getHour();

      if (hourDifference != 0) // test the hour first
         return hourDifference; 

      int minuteDifference = time1.getMinute() - time2.getMinute(); 

      if (minuteDifference != 0) // then test the minute
         return minuteDifference;

      int secondDifference = time1.getSecond() - time2.getSecond(); 
      return secondDifference; 
   } 
} // end class TimeComparator
```

```java
// Collections method sort with a custom Comparator object.
import java.util.List;
import java.util.ArrayList;
import java.util.Collections;

public class Sort3 
{
   public static void main(String[] args)
   {
      List<Time2> list = new ArrayList<>(); // create List

      list.add(new Time2(6, 24, 34));
      list.add(new Time2(18, 14, 58));
      list.add(new Time2(6, 05, 34));
      list.add(new Time2(12, 14, 58));
      list.add(new Time2(6, 24, 22));

      // output List elements
      System.out.printf("Unsorted array elements:%n%s%n", list);

      // sort in order using a comparator
      Collections.sort(list, new TimeComparator()); 

      // output List elements
      System.out.printf("Sorted list elements:%n%s%n", list);
   } 
} // end class Sort3
```

#### Methods reverse, fill, copy, max and min

**fill**: useful for reinitializing a List

**copy**: the destination List must be at least as long as the source List, the elements not overwritten are unchanged

**min, max**: can be called with a Comparator object as a second argument to perform custom comparisons of objects

```java
import java.util.List;
import java.util.Arrays;
import java.util.Collections;

public class Algorithms1 
{
   public static void main(String[] args)
   {
      // create and display a List< Character >
      Character[] letters = {'P', 'C', 'M'};
      List<Character> list = Arrays.asList(letters); // get List
      System.out.println("list contains: ");
      output(list);

      // reverse and display the List<Character>
      Collections.reverse(list); // reverse order the elements
      System.out.printf("%nAfter calling reverse, list contains:%n");
      output(list);

      // create copyList from an array of 3 Characters
      Character[] lettersCopy = new Character[3]; 
      List<Character> copyList = Arrays.asList(lettersCopy); 

      // copy the contents of list into copyList
      Collections.copy(copyList, list);
      System.out.printf("%nAfter copying, copyList contains:%n");
      output(copyList);

      // fill list with Rs 
      Collections.fill(list, 'R'); 
      System.out.printf("%nAfter calling fill, list contains:%n");
      output(list);
   } 

   // output List information
   private static void output(List<Character> listRef)
   {
      System.out.print("The list is: ");

      for (Character element : listRef)
         System.out.printf("%s ", element);

      System.out.printf("%nMax: %s", Collections.max(listRef));
      System.out.printf("  Min: %s%n", Collections.min(listRef));
   } 
} // end class Algorithms1
```

**Tip:** changes to copyList do not change letters, because copyList is a separate List that's not a List view of the array letters

#### Methods addAll, frequency and disjoint

```java
import java.util.ArrayList;
import java.util.List;
import java.util.Arrays;
import java.util.Collections;

public class Algorithms2 
{
   public static void main(String[] args) 
   {
      // initialize list1 and list2
      String[] colors = {"red", "white", "yellow", "blue"};
      List<String> list1 = Arrays.asList(colors);
      ArrayList<String> list2 = new ArrayList<>();

      list2.add("black"); // add "black" to the end of list2
      list2.add("red"); // add "red" to the end of list2
      list2.add("green"); // add "green" to the end of list2

      System.out.print("Before addAll, list2 contains: ");

      // display elements in vector
      for (String s : list2)
         System.out.printf("%s ", s);

      Collections.addAll(list2, colors); // add colors Strings to list2

      System.out.printf("%nAfter addAll, list2 contains: ");

      // display elements in list2
      for (String s : list2)
         System.out.printf("%s ", s);

      // get frequency of "red"                              
      int frequency = Collections.frequency(list2, "red");
      System.out.printf(                                   
         "%nFrequency of red in list2: %d%n", frequency);  

      // check whether list1 and list2 have elements in common
      boolean disjoint = Collections.disjoint(list1, list2);

      System.out.printf("list1 and list2 %s elements in common%n", 
         (disjoint ? "do not have" : "have"));
   } 
} // end class Algorithms2
```

### Stack Class of Package java.util

```java
import java.util.Stack;
import java.util.EmptyStackException;

public class StackTest 
{
   public static void main(String[] args)
   {
      Stack<Number> stack = new Stack<>(); // create a Stack

      // use push method
      stack.push(12L); // push long value 12L
      System.out.println("Pushed 12L");
      printStack(stack);
      stack.push(34567); // push int value 34567
      System.out.println("Pushed 34567");
      printStack(stack);
      stack.push(1.0F); // push float value 1.0F
      System.out.println("Pushed 1.0F");
      printStack(stack);
      stack.push(1234.5678); // push double value 1234.5678
      System.out.println("Pushed 1234.5678 ");
      printStack(stack);

      // remove items from stack
      try 
      {
         Number removedObject = null;

         // pop elements from stack
         while (true) 
         {
            removedObject = stack.pop(); // use pop method
            System.out.printf("Popped %s%n", removedObject);
            printStack(stack);
         } 
      } 
      catch (EmptyStackException emptyStackException) 
      {
         emptyStackException.printStackTrace();
      } 
   } 

   // display Stack contents
   private static void printStack(Stack<Number> stack)
   {
      if (stack.isEmpty())
         System.out.printf("stack is empty%n%n"); // the stack is empty
      else // stack is not empty
         System.out.printf("stack contains: %s (top)%n", stack);      
   } 
} // end class StackTest
```

**Tips:**

- when manipulating a stack, only methods **push** and **pop** should be used to add elements to and remove elements from the stack
- any integer literal that has the **suffix L** is a long value, an integer literal without a suffix is an int value, any floating-point literal that has the suffix F is a float value, A floating-point literal without a suffix is a double value
- method **peek**: returns the top element of the stack without popping the element off the stack

### Class PriorityQueue and Interface Queue

interface **Queue**: extends interface Collection and provides additional operations for inserting, removing and inspecting elements in a queue

**PriorityQueue**: implements Queue interface, orders elements by their natural ordering as specified by Comparable elements' compareTo method or by a Comparator object that's supplied to the constructor

```java
import java.util.PriorityQueue;

public class PriorityQueueTest 
{
   public static void main(String[] args) 
   {
      // queue of capacity 11
      PriorityQueue<Double> queue = new PriorityQueue<>();

      // insert elements to queue
      queue.offer(3.2);
      queue.offer(9.8);
      queue.offer(5.4);

      System.out.print("Polling from queue: ");

      // display elements in queue
      while (queue.size() > 0)
      {
         System.out.printf("%.1f ", queue.peek()); // view top element
         queue.poll(); // remove top element
      } 
   } 
} // end class PriorityQueueTest
```

### Sets (HashSet, TreeSet)

unordered Collection of unique elements (**no duplicates**)

```java
import java.util.List;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.Collection;

public class SetTest 
{
   public static void main(String[] args)
   {
      // create and display a List<String>
      String[] colors = {"red", "white", "blue", "green", "gray", 
         "orange", "tan", "white", "cyan", "peach", "gray", "orange"};
      List<String> list = Arrays.asList(colors);
      System.out.printf("List: %s%n", list);

      // eliminate duplicates then print the unique values
      printNonDuplicates(list);
   }  

   // create a Set from a Collection to eliminate duplicates
   private static void printNonDuplicates(Collection<String> values)
   {
      // create a HashSet 
      Set<String> set = new HashSet<>(values);   

      System.out.printf("%nNonduplicates are: ");

      for (String value : set)
         System.out.printf("%s ", value);

      System.out.println();
   } 
} // end class SetTest
```

#### Sorted Sets

interface **SortedSet**: sets that maintain their elements in sorted order - either natural order or specified by a Comparator. 

TreeSet implements SortedSet:

- **headSet**: get a subset of the TreeSet in which every element is less than "orange"
- **tailSet**: get a subset in which each element is greater than or equal to "orange"

if any changes are made to the subset, they'll also be made to the original TreeSet, because the subset returned by headSet is a view of the TreeSet

```java
import java.util.Arrays;
import java.util.SortedSet;
import java.util.TreeSet;

public class SortedSetTest 
{
   public static void main(String[] args)
   {
      // create TreeSet from array colors
      String[] colors = {"yellow", "green", "black", "tan", "grey",
         "white", "orange", "red", "green"};
      SortedSet<String> tree = new TreeSet<>(Arrays.asList(colors));

      System.out.print("sorted set: ");
      printSet(tree);

      // get headSet based on "orange"
      System.out.print("headSet (\"orange\"):  ");
      printSet(tree.headSet("orange"));

      // get tailSet based upon "orange"
      System.out.print("tailSet (\"orange\"):  ");
      printSet(tree.tailSet("orange"));

      // get first and last elements
      System.out.printf("first: %s%n", tree.first());
      System.out.printf("last : %s%n", tree.last());
   } 

   // output SortedSet using enhanced for statement
   private static void printSet(SortedSet<String> set)
   {
      for (String s : set)
         System.out.printf("%s ", s);

      System.out.println();
   } 
} // end class SortedSetTest
```

### Maps

keys in a Map must be unique, but the associated values need not be (**one-to-one** mapping, **many-to-one** mapping)

**Hashtable**, **HashMap**, **TreeMap** implements Map, interface **SortedMap** extends Map and maintains its keys in sorted order

**hashing**: convert the application's key rapidly into an index

**collision**: this occurs when two different keys hash into the same cell in the array

possible solutions for collision:

- apply another hashing transformation to the key to provide a next candidate cell in the array
- use one hash to locate the first candidate cell. if that cell is occupied, successive cells are searched in order until an available cell is found
- have each cell of the table be a hash bucket, typically a linked list of all the key-value pairs that hash to that cell

**load factor**: ratio of the number of occupied cells in the hash table to the total number of cells. The closer it gets to 1, the greater the chance of collisions

```java
import java.util.Map;
import java.util.HashMap;
import java.util.Set;
import java.util.TreeSet;
import java.util.Scanner;

public class WordTypeCount
{
   public static void main(String[] args)
   {
      // create HashMap to store String keys and Integer values
      Map<String, Integer> myMap = new HashMap<>(); 

      createMap(myMap); // create map based on user input
      displayMap(myMap); // display map content
   } // end main

   // create map from user input
   private static void createMap(Map<String, Integer> map) 
   {
      Scanner scanner = new Scanner(System.in); // create scanner
      System.out.println("Enter a string:"); // prompt for user input
      String input = scanner.nextLine();

      // tokenize the input
      String[] tokens = input.split(" ");

      // processing input text 
      for (String token : tokens) 
      {
         String word = token.toLowerCase(); // get lowercase word

         // if the map contains the word
         if (map.containsKey(word)) // is word in map
         {
            int count = map.get(word); // get current count
            map.put(word, count + 1); // increment count
         } 
         else 
            map.put(word, 1); // add new word with a count of 1 to map
      } 
   } 

   // display map content
   private static void displayMap(Map<String, Integer> map) 
   {     
      Set<String> keys = map.keySet(); // get keys

      // sort keys
      TreeSet<String> sortedKeys = new TreeSet<>(keys);

      System.out.printf("%nMap contains:%nKey\t\tValue%n");

      // generate output for each key in map
      for (String key : sortedKeys)
         System.out.printf("%-10s%10s%n", key, map.get(key));

      System.out.printf(
         "%nsize: %d%nisEmpty: %b%n", map.size(), map.isEmpty());
   } 
} // end class WordTypeCount
```

**Tips:**

- when the number of occupied slots in the HashMap becomes greater than the capacity times the load factor, the capacity is doubled automatically
- always use **immutable keys** with a Map. The key determines where the corresponding value is  placed. If the key has changed since the insert operation, when you subsequently attempt to retrieve that value, it might not be found. 

### Properties Class

a **Properties** (extends Hashtable<Object, Object>) object is a persistent Hashtable that stores key-value pairs of Strings. it can be written to an output stream and read back in through an input stream

it also provides an overloaded constructor that receives a reference to a Properties object containing default property values

```java
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.Set;

public class PropertiesTest  
{
   public static void main(String[] args)
   {
      Properties table = new Properties(); 

      // set properties
      table.setProperty("color", "blue");
      table.setProperty("width", "200");

      System.out.println("After setting properties");
      listProperties(table); 

      // replace property value
      table.setProperty("color", "red");

      System.out.println("After replacing properties");
      listProperties(table); 

      saveProperties(table);

      table.clear(); // empty table

      System.out.println("After clearing properties");
      listProperties(table); 

      loadProperties(table);

      // get value of property color
      Object value = table.getProperty("color");

      // check if value is in table
      if (value != null)
         System.out.printf("Property color's value is %s%n", value);
      else
         System.out.println("Property color is not in table");
   } 

   // save properties to a file
   private static void saveProperties(Properties props)
   {
      // save contents of table
      try
      {
         FileOutputStream output = new FileOutputStream("props.dat");
         props.store(output, "Sample Properties"); // save properties
         output.close();
         System.out.println("After saving properties");
         listProperties(props); 
      } 
      catch (IOException ioException)
      {
         ioException.printStackTrace();
      } 
   } 

   // load properties from a file
   private static void loadProperties(Properties props)
   {
      // load contents of table
      try
      {
         FileInputStream input = new FileInputStream("props.dat");
         props.load(input); // load properties
         input.close();
         System.out.println("After loading properties");
         listProperties(props); 
      } 
      catch (IOException ioException)
      {
         ioException.printStackTrace();
      } 
   } 

   // output property values
   private static void listProperties(Properties props)
   {
      Set<Object> keys = props.keySet(); // get property names

      // output name/value pairs
      for (Object key : keys)
         System.out.printf(
            "%s\t%s%n", key, props.getProperty((String) key));

      System.out.println();
   } 
} // end class PropertiesTest
```

**Tip:** if the key is not found in this Properties object, getProperty returns null. An overloaded version of this method receives a second argument that specifies the default value to return if getProperty cannot locate the key

## Strings, Characters and Regular Expressions

**character literals**: an integer value represented as a character in single quotes

**String literals**: a sequence of characters in double quotation marks (stored in memory as String objects)

### Class String

```java
public class StringConstructors 
{
   public static void main(String[] args)
   {
      char[] charArray = {'b', 'i', 'r', 't', 'h', ' ', 'd', 'a', 'y'};
      String s = new String("hello");

      // use String constructors
      String s1 = new String();
      String s2 = new String(s);
      String s3 = new String(charArray);
      String s4 = new String(charArray, 6, 3); // 6 as offset, 3 as count

      System.out.printf(
         "s1 = %s\ns2 = %s\ns3 = %s\ns4 = %s\n", s1, s2, s3, s4); 
   } 
} // end class StringConstructors
```

**Tip:** String objects are **immutable**, because class String does not provide methods that allow the contents of a String object to be modified after it is created

```java
public class StringMiscellaneous 
{
   public static void main(String[] args)
   {
      String s1 = "hello there";
      char[] charArray = new char[5];

      System.out.printf("s1: %s", s1);

      // test length method
      System.out.printf("\nLength of s1: %d", s1.length());

      // loop through characters in s1 with charAt and display reversed
      System.out.printf("%nThe string reversed is: ");

      // reverse string
      for (int count = s1.length() - 1; count >= 0; count--)
         System.out.printf("%c ", s1.charAt(count));

      // copy characters from string into charArray
      s1.getChars(0, 5, charArray, 0);
      System.out.printf("%nThe character array is: ");

      for (char character : charArray)
         System.out.print(character);

      System.out.println();
   } 
} // end class StringMiscellaneous
```

#### Comparing Strings

**lexicographical comparison:** when the computer compares Strings, it actually compares the numeric codes of the characters in the Strings

method **equals**: tests any two objects for equality - the strings contained in the two objects are identical

method **compareTo**: returns 0 if the Strings are equal, a negative number if the String that invokes compareTo is less than the String that's passed as an argument and a positive number if the String that invokes compareTo is greater than the String that's passed as an argument

method **regionMatches**: returns true only if the specified number of characters are lexicographically equal

```java
public class StringCompare 
{
   public static void main(String[] args)
   {
      String s1 = new String("hello"); // s1 is a copy of "hello"
      String s2 = "goodbye";
      String s3 = "Happy Birthday";
      String s4 = "happy birthday";

      System.out.printf(
         "s1 = %s\ns2 = %s\ns3 = %s\ns4 = %s\n\n", s1, s2, s3, s4);

      // test for equality
      if (s1.equals("hello"))  // true
         System.out.println("s1 equals \"hello\"");
      else
         System.out.println("s1 does not equal \"hello\""); 

      // test for equality with ==
      if (s1 == "hello")  // false; they are not the same object
         System.out.println("s1 is the same object as \"hello\"");
      else
         System.out.println("s1 is not the same object as \"hello\"");

      // test for equality (ignore case)
      if (s3.equalsIgnoreCase(s4))  // true
         System.out.printf("%s equals %s with case ignored\n", s3, s4);
      else
         System.out.println("s3 does not equal s4");

      // test compareTo
      System.out.printf(
         "\ns1.compareTo(s2) is %d", s1.compareTo(s2));
      System.out.printf(
         "\ns2.compareTo(s1) is %d", s2.compareTo(s1));
      System.out.printf(
         "\ns1.compareTo(s1) is %d", s1.compareTo(s1));
      System.out.printf(
         "\ns3.compareTo(s4) is %d", s3.compareTo(s4));
      System.out.printf(
         "\ns4.compareTo(s3) is %d\n\n", s4.compareTo(s3));

      // test regionMatches (case sensitive)
      if (s3.regionMatches(0, s4, 0, 5))
         System.out.println("First 5 characters of s3 and s4 match");
      else
         System.out.println(
            "First 5 characters of s3 and s4 do not match");

      // test regionMatches (ignore case)
      if (s3.regionMatches(true, 0, s4, 0, 5))
         System.out.println(
            "First 5 characters of s3 and s4 match with case ignored");
      else
         System.out.println(
            "First 5 characters of s3 and s4 do not match");
   } 
} // end class StringCompare
```

**Tips:**

- when primitive-type values are compared with ==, the result is true if both values are identical
- when references are compared with ==, the result is true if both references refer to the same object in memory
- Java treats all string literal objects with the same contents as one String object to which there can be many references

#### Locating Characters and Substrings in Strings

method **indexOf**: if the method finds the character, it returns the character's index in the String - otherwise, it returns -1

method **lastIndexOf**: locate the last occurrence of a character. If the substring is found, these methods return the index in the String of the first character in the substring

```java
public class StringIndexMethods 
{
   public static void main(String[] args)
   {
      String letters = "abcdefghijklmabcdefghijklm";

      // test indexOf to locate a character in a string
      System.out.printf(
         "'c' is located at index %d\n", letters.indexOf('c'));
      System.out.printf(
         "'a' is located at index %d\n", letters.indexOf('a', 1));
      System.out.printf(
         "'$' is located at index %d\n\n", letters.indexOf('$'));

      // test lastIndexOf to find a character in a string
      System.out.printf("Last 'c' is located at index %d\n",
         letters.lastIndexOf('c'));
      System.out.printf("Last 'a' is located at index %d\n",
         letters.lastIndexOf('a', 25));
      System.out.printf("Last '$' is located at index %d\n\n",
         letters.lastIndexOf('$'));

      // test indexOf to locate a substring in a string
      System.out.printf("\"def\" is located at index %d\n", 
         letters.indexOf("def"));
      System.out.printf("\"def\" is located at index %d\n",
         letters.indexOf("def", 7));
      System.out.printf("\"hello\" is located at index %d\n\n",
         letters.indexOf("hello"));

      // test lastIndexOf to find a substring in a string
      System.out.printf("Last \"def\" is located at index %d\n",
         letters.lastIndexOf("def"));
      System.out.printf("Last \"def\" is located at index %d\n",
         letters.lastIndexOf("def", 25));
      System.out.printf("Last \"hello\" is located at index %d\n",
         letters.lastIndexOf("hello"));
   } 
} // end class StringIndexMethods
```

```java
public class StringStartEnd 
{
   public static void main(String[] args)
   {
      String[] strings = {"started", "starting", "ended", "ending"};

      // test method startsWith
      for (String string : strings)
      {
         if (string.startsWith("st"))
            System.out.printf("\"%s\" starts with \"st\"\n", string);
      } 

      System.out.println();

      // test method startsWith starting from position 2 of string
      for (String string : strings)
      {
         if (string.startsWith("art", 2)) 
            System.out.printf(
               "\"%s\" starts with \"art\" at position 2\n", string);
      } 

      System.out.println();

      // test method endsWith
      for (String string : strings)
      {
         if (string.endsWith("ed"))
            System.out.printf("\"%s\" ends with \"ed\"\n", string);
      } 
   } 
} // end class StringStartEnd
```

#### Extracting Substrings from Strings

enable a new String object to be created by copying part of an existing String object

```java
public class SubString 
{
   public static void main(String[] args)
   {
      String letters = "abcdefghijklmabcdefghijklm";

      // test substring methods
      System.out.printf("Substring from index 20 to end is \"%s\"\n",
         letters.substring(20)); // 20 as the starting index
      System.out.printf("%s \"%s\"\n", 
         "Substring from index 3 up to, but not including 6 is",
         letters.substring(3, 6)); // 6 excluded
   } 
} // end class SubString
```

#### Concatenating Strings

```java
public class StringConcatenation 
{
   public static void main(String[] args)
   {
      String s1 = "Happy ";
      String s2 = "Birthday";

      System.out.printf("s1 = %s\ns2 = %s\n\n",s1, s2);
      System.out.printf(
         "Result of s1.concat(s2) = %s\n", s1.concat(s2));
      System.out.printf("s1 after concatenation = %s\n", s1);
   } 
} // end class StringConcatenation
```

**Tip:** method concat returns a new String object, which means that the original Strings to which s1 and s2 refer are not modified

#### Miscellaneous String Methods

none of the methods below modify the String on which they're called

method **trim**: removes all white-space characters that appear at the beginning  and/or end of the String on which trim operates

method **String.valueOf**: take an argument of any type and convert it to a String object

```java
public class StringMiscellaneous2 
{
   public static void main(String[] args)
   {
      String s1 = "hello";
      String s2 = "GOODBYE";
      String s3 = "   spaces   ";

      System.out.printf("s1 = %s\ns2 = %s\ns3 = %s\n\n", s1, s2, s3);

      // test method replace      
      System.out.printf(
         "Replace 'l' with 'L' in s1: %s\n\n", s1.replace('l', 'L'));

      // test toLowerCase and toUpperCase
      System.out.printf("s1.toUpperCase() = %s\n", s1.toUpperCase());
      System.out.printf("s2.toLowerCase() = %s\n\n", s2.toLowerCase());

      // test trim method
      System.out.printf("s3 after trim = \"%s\"\n\n", s3.trim());

      // test toCharArray method
      char[] charArray = s1.toCharArray();
      System.out.print("s1 as a character array = ");

      for (char character : charArray)
         System.out.print(character);

      System.out.println();
   } 
} // end class StringMiscellaneous2
```

```java
public class StringValueOf 
{
   public static void main(String[] args)
   {
      char[] charArray = {'a', 'b', 'c', 'd', 'e', 'f'};
      boolean booleanValue = true;
      char characterValue = 'Z';
      int integerValue = 7;
      long longValue = 10000000000L; // L suffix indicates long
      float floatValue = 2.5f; // f indicates that 2.5 is a float
      double doubleValue = 33.333; // no suffix, double is default
      Object objectRef = "hello"; // assign string to an Object reference

      System.out.printf(
         "char array = %s\n", String.valueOf(charArray));
      System.out.printf("part of char array = %s\n", 
         String.valueOf(charArray, 3, 3));
      System.out.printf(
         "boolean = %s\n", String.valueOf(booleanValue));
      System.out.printf(
         "char = %s\n", String.valueOf(characterValue));
      System.out.printf("int = %s\n", String.valueOf(integerValue));
      System.out.printf("long = %s\n", String.valueOf(longValue)); 
      System.out.printf("float = %s\n", String.valueOf(floatValue)); 
      System.out.printf(
         "double = %s\n", String.valueOf(doubleValue)); 
      System.out.printf("Object = %s\n", String.valueOf(objectRef));
   } 
} // end class StringValueOf
```

**Tip:** by default, java treats integer literals as type int and floating-point literals as type double

### Class StringBuilder

StringBuilder could create and manipulate dynamic string information - **modifiable** strings. If a StringBuilder's capacity is exceeded, the capacity expands to accommodate the additional characters (default capacity of 16)

```java
public class StringBuilderConstructors 
{
   public static void main(String[] args)
   {
      StringBuilder buffer1 = new StringBuilder();
      StringBuilder buffer2 = new StringBuilder(10);
      StringBuilder buffer3 = new StringBuilder("hello");

      System.out.printf("buffer1 = \"%s\"\n", buffer1);
      System.out.printf("buffer2 = \"%s\"\n", buffer2);
      System.out.printf("buffer3 = \"%s\"\n", buffer3);
   } 
} // end class StringBuilderConstructors
```

```java
public class StringBuilderCapLen 
{
   public static void main(String[] args)
   {
      StringBuilder buffer = new StringBuilder("Hello, how are you?");

      System.out.printf("buffer = %s\nlength = %d\ncapacity = %d\n\n",
         buffer.toString(), buffer.length(), buffer.capacity());

      buffer.ensureCapacity(75); // specify least capacity
      System.out.printf("New capacity = %d\n\n", buffer.capacity());

      buffer.setLength(10);
      System.out.printf("New length = %d\nbuffer = %s\n", 
         buffer.length(), buffer.toString());
   } 
} // end class StringBuilderCapLen
```

**Tips:**

- if the specified length is less than the current number of characters in the StringBuilder, its contents are truncated to the specified length.
- if the specified length is greater than the number of characters currently in the StringBuilder, null characters (with numeric representation 0) are appended 
- Dynamically increasing the capacity of a StringBuilder can take a relatively long time. Executing a large number of these operations can degrade the performance of an application. If a StringBuilder is going to increase greatly in size, possibly multiple times, setting its capacity high at the beginning will increase performance.

```java
public class StringBuilderChars 
{
   public static void main(String[] args)
   {
      StringBuilder buffer = new StringBuilder("hello there");

      System.out.printf("buffer = %s\n", buffer.toString());
       System.out.printf("Character at 0: %s\nCharacter at 4: %s\n\n", 
         buffer.charAt(0), buffer.charAt(4));

      char[] charArray = new char[buffer.length()];
      buffer.getChars(0, buffer.length(), charArray, 0);
      System.out.print("The characters are: ");

      for (char character : charArray)
         System.out.print(character);

      buffer.setCharAt(0, 'H');
      buffer.setCharAt(6, 'T');
      System.out.printf("\n\nbuffer = %s", buffer.toString());

      buffer.reverse();
      System.out.printf("\n\nbuffer = %s\n", buffer.toString());
   } 
} // end class StringBuilderChars
```

```java
public class StringBuilderAppend 
{
   public static void main(String[] args)
   {
      Object objectRef = "hello"; 
      String string = "goodbye";  
      char[] charArray = {'a', 'b', 'c', 'd', 'e', 'f'};
      boolean booleanValue = true;
      char characterValue = 'Z';
      int integerValue = 7;
      long longValue = 10000000000L;
      float floatValue = 2.5f; 
      double doubleValue = 33.333;

      StringBuilder lastBuffer = new StringBuilder("last buffer");
      StringBuilder buffer = new StringBuilder();

      buffer.append(objectRef)
            .append("%n")
            .append(string)
            .append("%n")
            .append(charArray)
            .append("%n")
            .append(charArray, 0, 3)
            .append("%n")
            .append(booleanValue)
            .append("%n")
            .append(characterValue)
            .append("%n")
            .append(integerValue)
            .append("%n")
            .append(longValue)
            .append("%n")
            .append(floatValue)
            .append("%n")
            .append(doubleValue)
            .append("%n")
            .append(lastBuffer);

      System.out.printf("buffer contains%n%s%n", buffer.toString());
   } 
} // end StringBuilderAppend
```

```java
public class StringBuilderInsertDelete 
{
   public static void main(String[] args)
   {
      Object objectRef = "hello";  
      String string = "goodbye";  
      char[] charArray = {'a', 'b', 'c', 'd', 'e', 'f'};
      boolean booleanValue = true;
      char characterValue = 'K';
      int integerValue = 7;
      long longValue = 10000000;
      float floatValue = 2.5f; // f suffix indicates that 2.5 is a float
      double doubleValue = 33.333;

      StringBuilder buffer = new StringBuilder();

      buffer.insert(0, objectRef)
            .insert(0, "  ") // each of these contains new line
            .insert(0, string)
            .insert(0, "  ")
            .insert(0, charArray)
            .insert(0, "  ")
            .insert(0, charArray, 3, 3)
            .insert(0, "  ")
            .insert(0, booleanValue)
            .insert(0, "  ")
            .insert(0, characterValue)
            .insert(0, "  ")
            .insert(0, integerValue)
            .insert(0, "  ")
            .insert(0, longValue)
            .insert(0, "  ")
            .insert(0, floatValue)
            .insert(0, "  ")
            .insert(0, doubleValue);

      System.out.printf(
         "buffer after inserts:\n%s\n\n", buffer.toString());

      buffer.deleteCharAt(10); // delete 5 in 2.5
      buffer.delete(2, 6); // delete .333 in 33.333

      System.out.printf(
         "buffer after deletes:\n%s\n", buffer.toString());
   } 
} // end class StringBuilderInsertDelete
```

### Class Character

```java
import java.util.Scanner;

public class StaticCharMethods 
{
   public static void main(String[] args)
   {
      Scanner scanner = new Scanner(System.in); // create scanner
      System.out.println("Enter a character and press Enter");
      String input = scanner.next(); 
      char c = input.charAt(0); // get input character

      // display character info
      System.out.printf("is defined: %b\n", Character.isDefined(c));
      System.out.printf("is digit: %b\n", Character.isDigit(c));
      System.out.printf("is first character in a Java identifier: %b\n",
         Character.isJavaIdentifierStart(c));
      System.out.printf("is part of a Java identifier: %b\n",
         Character.isJavaIdentifierPart(c));
      System.out.printf("is letter: %b\n", Character.isLetter(c));
      System.out.printf(
         "is letter or digit: %b\n", Character.isLetterOrDigit(c));
      System.out.printf(
         "is lower case: %b\n", Character.isLowerCase(c));
      System.out.printf(
         "is upper case: %b\n", Character.isUpperCase(c));
      System.out.printf(
         "to upper case: %s\n", Character.toUpperCase(c));
      System.out.printf(
         "to lower case: %s\n", Character.toLowerCase(c));
   } 
} // end class StaticCharMethods
```

```java
import java.util.Scanner;

public class StaticCharMethods2 
{
   // executes application
   public static void main(String[] args)
   {
      Scanner scanner = new Scanner(System.in);

      // get radix
      System.out.println("Please enter a radix:");
      int radix = scanner.nextInt();

      // get user choice
      System.out.printf("Please choose one:\n1 -- %s\n2 -- %s\n",
         "Convert digit to character", "Convert character to digit");
      int choice = scanner.nextInt(); 

      // process request
      switch (choice)
      {
         case 1: // convert digit to character
            System.out.println("Enter a digit:");
            int digit = scanner.nextInt();
            System.out.printf("Convert digit to character: %s\n",
               Character.forDigit(digit, radix));
            break;

         case 2: // convert character to digit
            System.out.println("Enter a character:");
            char character = scanner.next().charAt(0);
            System.out.printf("Convert character to digit: %s\n",
               Character.digit(character, radix));
            break;
      } 
   } 
} // end class StaticCharMethods2
```

```java
public class OtherCharMethods 
{
   public static void main(String[] args)
   {
      Character c1 = 'A';
      Character c2 = 'a';

      System.out.printf(
         "c1 = %s\nc2 = %s\n\n", c1.charValue(), c2.toString());

      if (c1.equals(c2))
         System.out.println("c1 and c2 are equal\n");
      else
         System.out.println("c1 and c2 are not equal\n");
   } 
} // end class OtherCharMethods
```

### Tokenizing Strings

```java
import java.util.Scanner;
import java.util.StringTokenizer;

public class TokenTest 
{
   // execute application
   public static void main(String[] args)
   {
      // get sentence
      Scanner scanner = new Scanner(System.in);
      System.out.println("Enter a sentence and press Enter");
      String sentence = scanner.nextLine();

      // process user sentence
      String[] tokens = sentence.split(" ");
      System.out.printf("Number of elements: %d\nThe tokens are:\n",
         tokens.length);

      for (String token : tokens)
         System.out.println(token);
   } 
} // end class TokenTest
```

## Classes and Objects

```java
public class Time1  
{
   // private class members are not accessible outside the class
   private int hour; // 0 - 23
   private int minute; // 0 - 59
   private int second; // 0 - 59

    // public services / interface
   // set a new time value using universal time; throw an 
   // exception if the hour, minute or second is invalid
   public void setTime(int hour, int minute, int second)
   {
      // validate hour, minute and second
      if (hour < 0 || hour >= 24 || minute < 0 || minute >= 60 || 
         second < 0 || second >= 60) 
      {
         throw new IllegalArgumentException(
            "hour, minute and/or second was out of range");
      }

      this.hour = hour;
      this.minute = minute;
      this.second = second;
   } 

   // convert to String in universal-time format (HH:MM:SS)
   public String toUniversalString()
   {
      return String.format("%02d:%02d:%02d", hour, minute, second);
   } 

   // convert to String in standard-time format (H:MM:SS AM or PM)
   public String toString()
   {
      return String.format("%d:%02d:%02d %s", 
         ((hour == 0 || hour == 12) ? 12 : hour % 12),
         minute, second, (hour < 12 ? "AM" : "PM"));
   } 
} // end class Time1
```

**Tip:** In this example, class Time1 does not declare a constructor, so the compiler supplies a **default constructor**. Each instance variable implicitly receives the default int value. Instance variables also can be initialized when they’re declared in the class body, using the same initialization syntax as with a local variable.

### Referring to the Current Object's Members with the this Reference

**this** reference: refer to object itself

source-code file can contain only one public class. Non-public classes can be used only by other classes in the **same package**

```java
public class ThisTest 
{
   public static void main(String[] args)
   {
      SimpleTime time = new SimpleTime(15, 30, 19);
      System.out.println(time.buildString());
   } 
} // end class ThisTest

// class SimpleTime demonstrates the "this" reference
class SimpleTime 
{
   private int hour; // 0-23
   private int minute; // 0-59
   private int second; // 0-59 

   // if the constructor uses parameter names identical to 
   // instance variable names, the "this" reference is 
   // required to distinguish between the names
   public SimpleTime(int hour, int minute, int second)
   {
      this.hour = hour; // set "this" object's hour
      this.minute = minute; // set "this" object's minute
      this.second = second; // set "this" object's second
   } 

   // use explicit and implicit "this" to call toUniversalString
   public String buildString()
   {
      return String.format("%24s: %s%n%24s: %s", 
         "this.toUniversalString()", this.toUniversalString(),
         "toUniversalString()", toUniversalString());
   } 

   // convert to String in universal-time format (HH:MM:SS)
   public String toUniversalString()
   {
      // "this" is not required here to access instance variables, 
      // because method does not have local variables with same 
      // names as instance variables
      return String.format("%02d:%02d:%02d", 
         this.hour, this.minute, this.second);
   } 
} // end class SimpleTime
```

**Tip:** java conserves storage by maintaining only one copy of each method per class. Each object, on the other hand, has its own copy of the class's instance variable

### Time Class Case Study: Overloaded Constructors

The compiler invokes the appropriate constructor by matching the number, types and order of the types of the arguments specified in the constructor call

```java
public class Time2
{
   private int hour; // 0 - 23
   private int minute; // 0 - 59
   private int second; // 0 - 59

   // Time2 no-argument constructor: 
   // initializes each instance variable to zero
   public Time2()
   {
      this(0, 0, 0); // invoke constructor with three arguments
   } 

   // Time2 constructor: hour supplied, minute and second defaulted to 0
   public Time2(int hour) 
   { 
      this(hour, 0, 0); // invoke constructor with three arguments
   } 

   // Time2 constructor: hour and minute supplied, second defaulted to 0
   public Time2(int hour, int minute) 
   { 
      this(hour, minute, 0); // invoke constructor with three arguments
   } 

   // Time2 constructor: hour, minute and second supplied
   public Time2(int hour, int minute, int second) 
   { 
      if (hour < 0 || hour >= 24)
         throw new IllegalArgumentException("hour must be 0-23");

      if (minute < 0 || minute >= 60)
         throw new IllegalArgumentException("minute must be 0-59");

      if (second < 0 || second >= 60)
         throw new IllegalArgumentException("second must be 0-59");

      this.hour = hour;
      this.minute = minute; 
      this.second = second; 
   } 

   // Time2 constructor: another Time2 object supplied
   public Time2(Time2 time)
   {
      // invoke constructor with three arguments
      this(time.getHour(), time.getMinute(), time.getSecond());
   } 

   // Set Methods
   // set a new time value using universal time; 
   // validate the data
   public void setTime(int hour, int minute, int second)
   {
      if (hour < 0 || hour >= 24)
         throw new IllegalArgumentException("hour must be 0-23");

      if (minute < 0 || minute >= 60)
         throw new IllegalArgumentException("minute must be 0-59");

      if (second < 0 || second >= 60)
         throw new IllegalArgumentException("second must be 0-59");

      this.hour = hour;
      this.minute = minute; 
      this.second = second; 
   } 

   // validate and set hour 
   public void setHour(int hour) 
   { 
      if (hour < 0 || hour >= 24)
         throw new IllegalArgumentException("hour must be 0-23");

      this.hour = hour;
   } 

   // validate and set minute 
   public void setMinute(int minute) 
   { 
      if (minute < 0 || minute >= 60)
         throw new IllegalArgumentException("minute must be 0-59");

      this.minute = minute; 
   } 

   // validate and set second 
   public void setSecond(int second) 
   { 
      if (second < 0 || second >= 60)
         throw new IllegalArgumentException("second must be 0-59");

       this.second = second; 
   } 

   // Get Methods
   // get hour value
   public int getHour() 
   { 
      return hour; 
   } 

   // get minute value
   public int getMinute() 
   { 
      return minute; 
   } 

   // get second value
   public int getSecond() 
   { 
      return second; 
   } 

   // convert to String in universal-time format (HH:MM:SS)
   public String toUniversalString()
   {
      return String.format(
         "%02d:%02d:%02d", getHour(), getMinute(), getSecond());
   } 

   // convert to String in standard-time format (H:MM:SS AM or PM)
   public String toString()
   {
      return String.format("%d:%02d:%02d %s", 
         ((getHour() == 0 || getHour() == 12) ? 12 : getHour() % 12),
         getMinute(), getSecond(), (getHour() < 12 ? "AM" : "PM"));
   } 
} // end class Time2
```

**Tips:**

- it's a compilation error when this is used in a constructor's body to call another of the class's constructors if that call is not the **first** statement in the constructor. It's also a compilation error when a method attempts to invoke a constructor directly via this
- when one object of a class has a reference to another object of the same class, the first object can access all the second object's data and methods (including those that are private)
- having the Time2 constructors call the constructor with 3 arguments requires that any changes to the implementation of the 3-argument constructor be made only once
- if your class declares constructors, the compiler will not create a default constructor. In this case, you must declare a no-argument constructor if default initialization is required

### Set and Get Methods

**accessor/query methods**: public get method allows other methods to access private instance variables and control how the client can access them

**mutator methods:** public set method can scrutinize attempts to modify the variable's value and throw an exception if necessary (validity checking)

**Tip:** classes should never have public nonconstant data, but declaring data **public static final** enables you to make constants available to clients for your class

### enum Types

- reference types
- enum constants are implicitly final
- enum constants are implicitly static
- any attempt to create an object of an enum type with operator new results in a compilation error. 

```java
public enum Book
{    
   // declare constants of enum type                                
   JHTP("Java How to Program", "2015"),                        
   CHTP("C How to Program", "2013"),                           
   IW3HTP("Internet & World Wide Web How to Program", "2012"),
   CPPHTP("C++ How to Program", "2014"),                       
   VBHTP("Visual Basic How to Program", "2014"),
   CSHARPHTP("Visual C# How to Program", "2014");

   // instance fields 
   private final String title; 
   private final String copyrightYear;

   // enum constructor
   Book(String title, String copyrightYear) 
   { 
      this.title = title;
      this.copyrightYear = copyrightYear;
   } 

   // accessor for field title
   public String getTitle()
   {
      return title;
   } 

   // accessor for field copyrightYear
   public String getCopyrightYear()
   {
      return copyrightYear;
   } 
} // end enum Book
```

for every enum, the compiler generates the static method values that returns an array of the enum's constants in the order they were declared

```java
import java.util.EnumSet;

public class EnumTest 
{
   public static void main(String[] args) 
   {
      System.out.println("All books:");

      // print all books in enum Book                          
      for (Book book : Book.values())                        
         System.out.printf("%-10s%-45s%s%n", book,
             book.getTitle(), book.getCopyrightYear());

      System.out.printf("%nDisplay a range of enum constants:%n");

      // print first four books                                 
      for (Book book : EnumSet.range(Book.JHTP, Book.CPPHTP))
         System.out.printf("%-10s%-45s%s%n", book,
             book.getTitle(), book.getCopyrightYear());
   } 
} // end class EnumTest
```

### static Class Members

**static field** (class variable): represents classwide information - all objects of the class share the same piece of data

**Tip:** static methods cannot directly access instance variables and instance methods

```java
public class Employee 
{
   private static int count = 0; // number of Employees created
   private String firstName;
   private String lastName;

   // initialize Employee, add 1 to static count and 
   // output String indicating that constructor was called
   public Employee(String firstName, String lastName)
   {
      this.firstName = firstName;
      this.lastName = lastName;

      ++count;  // increment static count of employees
      System.out.printf("Employee constructor: %s %s; count = %d%n",
         firstName, lastName, count);
   } 

   // get first name
   public String getFirstName() 
   { 
      return firstName; 
   } 

   // get last name
   public String getLastName() 
   { 
      return lastName; 
   } 

   // static method to get static count value
   public static int getCount() 
   { 
      return count; 
   } 
} // end class Employee
```

### static Import

import the static members of a class or interface so you can access them via their unqualified names in your class (the class name and a dot)

**single static import**

```java
import static packageName.ClassName.staticMemberName;
```

**static import on demand**

```java
import static packageName.ClassName.*;
```

**Tip:** a compilation error occurs if a program attempts to import 2 or more classes' static methods that have the same signature or static fields that have the same name

### Package Access

if no access modifier is specified for a method or variable when it's declared in a class, the method or variable is considered to have **package access**.

if a program uses multiple classes from the **same package**, these classes can access each other's package-access members directly through references to objects of the appropriate classes, or in the case of static members through the class name. 

### Using BigDecimal for Precise Monetary Calculations

precise floating-point calculations

```java
import java.math.BigDecimal;
import java.text.NumberFormat;

public class Interest 
{
   public static void main(String args[])
   {
      // initial principal amount before interest
      BigDecimal principal = BigDecimal.valueOf(1000.0); 
      BigDecimal rate = BigDecimal.valueOf(0.05); // interest rate

      // display headers
      System.out.printf("%s%20s%n", "Year", "Amount on deposit");

      // calculate amount on deposit for each of ten years
      for (int year = 1; year <= 10; year++) 
      {
         // calculate new amount for specified year
         BigDecimal amount = 
            principal.multiply(rate.add(BigDecimal.ONE).pow(year));

         // display the year and the amount
         System.out.printf("%4d%20s%n", year, 
            NumberFormat.getCurrencyInstance().format(amount));
      } 
   }
} // end class Interest
```

## OOP Principles

### Inheritance

**specialization**: a subclass is more specific than its superclass and represents a more specialized group of objects. each class is derived from exactly **one** direct superclass

**is-a** relationship: an object of a subclass can also be treated as an object of its superclass

**has-a** relationship (composition): an object contains as members references to other objects 

#### Superclass and Subclass

objects of all classes that extend a common superclass can be treated as objects of that superclass

A Subclass Object Contains the Instance Variables of All of Its Superclasses

![](b9635e54/uml.jpg)

#### protected Members

a superclass's **protected** members can be accessed by:

- members of that superclass
- members of its subclasses
- members of other classes in the same package

**cons** of protected:

- a subclass object can assign an invalid value to the variable, possibly leaving the object in an inconsistent state
- fragile/brittle class: with protected instance variables in the superclass, we may need to modify all the subclasses of the superclass if the superclass implementation changes
- class's protected members are visible to all classes in the same package as the class containing the protected members

**Tips:**

- when a subclass method overrides an inherited superclass method, the superclass version of the method can be accessed from the subclass by preceding the superclass method name with keyword **super** and a dot
- the superclass cannot access the superclass's private instance variables

#### Relationship Between Superclasses and Subclasses

the first task of any subclass constructor is to call its direct superclass's constructor, either explicitly or implicitly, to ensure that the instance variables inherited from the superclass are initialized properly

The last constructor called in the chain is always **Object**'s constructor

**override** (unintentional overload): a subclass must declare a method with the **same signature** (method name, number of parameters, parameter types and order of parameter types)

```java
// Fig. 9.4: CommissionEmployee.java
// CommissionEmployee class represents an employee paid a 
// percentage of gross sales.

public class CommissionEmployee extends Employee 
{
   private double grossSales; // gross weekly sales
   private double commissionRate; // commission percentage

   // constructor
   public CommissionEmployee(String firstName, String lastName, 
      String socialSecurityNumber, double grossSales, 
      double commissionRate)
   {
      super(firstName, lastName, socialSecurityNumber);

      if (commissionRate <= 0.0 || commissionRate >= 1.0) // validate 
         throw new IllegalArgumentException(
            "Commission rate must be > 0.0 and < 1.0");

      if (grossSales < 0.0) // validate
         throw new IllegalArgumentException("Gross sales must be >= 0.0");

      this.grossSales = grossSales;
      this.commissionRate = commissionRate;
   } 

   // set gross sales amount
   public void setGrossSales(double grossSales)
   {
      if (grossSales < 0.0) // validate
         throw new IllegalArgumentException("Gross sales must be >= 0.0");

      this.grossSales = grossSales;
   } 

   // return gross sales amount
   public double getGrossSales()
   {
      return grossSales;
   } 

   // set commission rate
   public void setCommissionRate(double commissionRate)
   {
      if (commissionRate <= 0.0 || commissionRate >= 1.0) // validate
         throw new IllegalArgumentException(
            "Commission rate must be > 0.0 and < 1.0");

      this.commissionRate = commissionRate;
   } 

   // return commission rate
   public double getCommissionRate()
   {
      return commissionRate;
   } 

   // calculate earnings; override abstract method earnings in Employee
   @Override                                                           
   public double earnings()                                            
   {                                                                   
      return getCommissionRate() * getGrossSales();                    
   }                                             

   // return String representation of CommissionEmployee object
   @Override                                                   
   public String toString()                                    
   {                                                           
      return String.format("%s: %s%n%s: $%,.2f; %s: %.2f",    
         "commission employee", super.toString(),              
         "gross sales", getGrossSales(),                       
         "commission rate", getCommissionRate());             
   } 
} // end class CommissionEmployee
```

```java
// Fig. 9.6: BasePlusCommissionEmployee.java
// BasePlusCommissionEmployee class represents an employee that receives
// a base salary in addition to commission.

public class BasePlusCommissionEmployee extends CommissionEmployee 
{
   private double baseSalary; // base salary per week

   // constructor
   public BasePlusCommissionEmployee(String firstName, String lastName, 
      String socialSecurityNumber, double grossSales,
      double commissionRate, double baseSalary)
   {
      super(firstName, lastName, socialSecurityNumber, 
         grossSales, commissionRate);

      if (baseSalary < 0.0) // validate baseSalary                  
         throw new IllegalArgumentException("Base salary must be >= 0.0");

      this.baseSalary = baseSalary;                
   }

   // set base salary
   public void setBaseSalary(double baseSalary)
   {
      if (baseSalary < 0.0) // validate baseSalary                  
         throw new IllegalArgumentException("Base salary must be >= 0.0");

      this.baseSalary = baseSalary;                
   } 

   // return base salary
   public double getBaseSalary()
   {
      return baseSalary;
   }

   // calculate earnings; override method earnings in CommissionEmployee
   @Override                                                            
   public double earnings()                                             
   {                                                                    
      return getBaseSalary() + super.earnings();                        
   } 

   // return String representation of BasePlusCommissionEmployee object
   @Override                                                           
   public String toString()                                            
   {                                                                   
      return String.format("%s %s; %s: $%,.2f",                       
         "base-salaried", super.toString(),                            
         "base salary", getBaseSalary());                             
   } 
} // end class BasePlusCommissionEmployee
```

**Tips:**

- It’s  a  compilation  error  to  override  a  method  with  a  more  restricted  access  modifier—a public superclass method cannot become a protected or private subclass method; a protected superclass method cannot become a private subclass method. Doing so would break  the is-a relationship, which requires that all subclass objects be able to respond to method calls made to public methods declared in the superclass. If a public method, could be overridden as a protected or private method, the subclass objects would not be able to respond to the same method calls as superclass objects. Once a method is declared public in a superclass, the method remains public for all that class’s direct and indirect subclasses
- With inheritance, the instance variables and methods that are the same for all the classes in the hierarchy are declared in a superclass. Changes made to these common features in the superclass are inherited by the subclass. Without inheritance, changes would need to be made to all the source-code files that contain a copy of the code in question.
- At the design stage in an object-oriented system, you’ll often find that certain classes are closely related. You should “factor out” common instance variables and methods and place them in a superclass. Then use inheritance to develop subclasses, specializing them with capabilities beyond those inherited from the superclass
- when possible, do not include protected instance variables in a superclass. Instead, include non-private methods that access private instance variables. This will help ensure that objects of the class maintain consistent states
- chain of constructor calls: 
  1. constructor of BasePlusCommissionEmployee 
  2. constructor of CommissionEmployee
  3. Object's constructor (return)

#### Class Object

![](b9635e54/object1.jpg)

![](b9635e54/object2.jpg)

### Polymorphism and Interfaces

**Polymorphism**: relying on each object to know how to do the right thing in response to the same method call. the same message sent to a variety of objects has many forms of results

polymorphism promotes  **extensibility**:  Software  that  invokes  polymorphic  behavior  is independent of the object types to which messages are sent. New object types that can respond to existing method calls can be incorporated into a system without modifying the base system. Only client code that instantiates new objects must be modified to accommodate new types.

polymorphism enables you to deal in **generalities** and let the execution-time environment handle the specifics. You can tell objects to behave in manners appropriate to those objects,without knowing their specific types, as long as they belong to the same inheritance hierarchy. 

**Tips:**

- when a superclass variable contains a reference to a subclass object, and that reference is used to call a method, the subclass version of the method is called. (**downcasting**)

- **dynamic binding**: at execution time, the type of the object to which the variable refers determines the actual method to use

#### Abstract Classes and Methods

**abstract class**: for which you never intend to create objects, incomplete, provide an appropriate superclass from which other classes can inherit and thus share a common design

**concrete class**: classes that can be used to instantiate objects, provide implementations of every method they declare

**abstract methods**: 

- do not provide implementations
- a class that contains any abstract methods must be explicitly declared abstract even if that class contains some concrete methods
- each concrete subclass of an abstract superclass also must provide concrete implementations of **each** of the superclass's abstract methods
- constructors and static methods cannot be declared abstract, constructors are not inherited
- non-private static methods cannot be overridden

#### Case Study: Payroll System Using Polymorphism

![](b9635e54/uml2.jpg)

![](b9635e54/payroll.jpg)

```java
// Fig. 10.4: Employee.java
// Employee abstract superclass.

public abstract class Employee 
{
   private final String firstName;
   private final String lastName;
   private final String socialSecurityNumber;

   // constructor
   public Employee(String firstName, String lastName, 
      String socialSecurityNumber)
   {
      this.firstName = firstName;                                    
      this.lastName = lastName;                                    
      this.socialSecurityNumber = socialSecurityNumber;         
   } 

   // return first name
   public String getFirstName()
   {
      return firstName;
   } 

   // return last name
   public String getLastName()
   {
      return lastName;
   } 

   // return social security number
   public String getSocialSecurityNumber()
   {
      return socialSecurityNumber;
   } 

   // return String representation of Employee object
   @Override
   public String toString()
   {
      return String.format("%s %s%nsocial security number: %s", 
         getFirstName(), getLastName(), getSocialSecurityNumber());
   } 

   // abstract method must be overridden by concrete subclasses
   public abstract double earnings(); // no implementation here
} // end abstract class Employee
```

```java
// Fig. 10.6: HourlyEmployee.java
// HourlyEmployee class extends Employee.

public class HourlyEmployee extends Employee 
{
   private double wage; // wage per hour
   private double hours; // hours worked for week

   // constructor
   public HourlyEmployee(String firstName, String lastName,
      String socialSecurityNumber, double wage, double hours)
   {
      super(firstName, lastName, socialSecurityNumber);

      if (wage < 0.0) // validate wage
         throw new IllegalArgumentException(
            "Hourly wage must be >= 0.0");

      if ((hours < 0.0) || (hours > 168.0)) // validate hours
         throw new IllegalArgumentException(
            "Hours worked must be >= 0.0 and <= 168.0");

      this.wage = wage;
      this.hours = hours;
   } 

   // set wage
   public void setWage(double wage)
   {
      if (wage < 0.0) // validate wage
         throw new IllegalArgumentException(
            "Hourly wage must be >= 0.0");

      this.wage = wage;
   } 

   // return wage
   public double getWage()
   {
      return wage;
   } 

   // set hours worked
   public void setHours(double hours)
   {
      if ((hours < 0.0) || (hours > 168.0)) // validate hours
         throw new IllegalArgumentException(
            "Hours worked must be >= 0.0 and <= 168.0");

      this.hours = hours;
   } 

   // return hours worked
   public double getHours()
   {
      return hours;
   } 

   // calculate earnings; override abstract method earnings in Employee
   @Override                                                           
   public double earnings()                                            
   {                                                                   
      if (getHours() <= 40) // no overtime                           
         return getWage() * getHours();                                
      else                                                             
         return 40 * getWage() + (getHours() - 40) * getWage() * 1.5;
   }                                          

   // return String representation of HourlyEmployee object              
   @Override                                                             
   public String toString()                                              
   {                                                                     
      return String.format("hourly employee: %s%n%s: $%,.2f; %s: %,.2f",
         super.toString(), "hourly wage", getWage(),                     
         "hours worked", getHours());                                   
   }                                    
} // end class HourlyEmployee
```

```java
// Fig. 10.9: PayrollSystemTest.java
// Employee hierarchy test program.

public class PayrollSystemTest 
{
   public static void main(String[] args) 
   {
      // create subclass objects
      SalariedEmployee salariedEmployee = 
         new SalariedEmployee("John", "Smith", "111-11-1111", 800.00);
      HourlyEmployee hourlyEmployee = 
         new HourlyEmployee("Karen", "Price", "222-22-2222", 16.75, 40);
      CommissionEmployee commissionEmployee = 
         new CommissionEmployee(
         "Sue", "Jones", "333-33-3333", 10000, .06);
      BasePlusCommissionEmployee basePlusCommissionEmployee = 
         new BasePlusCommissionEmployee(
         "Bob", "Lewis", "444-44-4444", 5000, .04, 300);

      System.out.println("Employees processed individually:");

      System.out.printf("%n%s%n%s: $%,.2f%n%n", 
         salariedEmployee, "earned", salariedEmployee.earnings());
      System.out.printf("%s%n%s: $%,.2f%n%n",
         hourlyEmployee, "earned", hourlyEmployee.earnings());
      System.out.printf("%s%n%s: $%,.2f%n%n",
         commissionEmployee, "earned", commissionEmployee.earnings());
      System.out.printf("%s%n%s: $%,.2f%n%n", 
         basePlusCommissionEmployee, 
         "earned", basePlusCommissionEmployee.earnings());

      // create four-element Employee array
      Employee[] employees = new Employee[4]; 

      // initialize array with Employees
      employees[0] = salariedEmployee;
      employees[1] = hourlyEmployee;
      employees[2] = commissionEmployee; 
      employees[3] = basePlusCommissionEmployee;

      System.out.printf("Employees processed polymorphically:%n%n");

      // generically process each element in array employees
      for (Employee currentEmployee : employees) 
      {
         System.out.println(currentEmployee); // invokes toString

         // determine whether element is a BasePlusCommissionEmployee
         if (currentEmployee instanceof BasePlusCommissionEmployee) 
         {
            // downcast Employee reference to 
            // BasePlusCommissionEmployee reference
            BasePlusCommissionEmployee employee = 
               (BasePlusCommissionEmployee) currentEmployee;

            employee.setBaseSalary(1.10 * employee.getBaseSalary());

            System.out.printf(
               "new base salary with 10%% increase is: $%,.2f%n",
               employee.getBaseSalary());
         } 

         System.out.printf(
            "earned $%,.2f%n%n", currentEmployee.earnings());
      } 

      // get type name of each object in employees array
      for (int j = 0; j < employees.length; j++)
         System.out.printf("Employee %d is a %s%n", j, 
            employees[j].getClass().getName()); 
   } // end main
} // end class PayrollSystemTest
```

```java
// Fig. 10.5: SalariedEmployee.java
// SalariedEmployee concrete class extends abstract class Employee.

public class SalariedEmployee extends Employee 
{
   private double weeklySalary;

   // constructor
   public SalariedEmployee(String firstName, String lastName, 
      String socialSecurityNumber, double weeklySalary)
   {
      super(firstName, lastName, socialSecurityNumber); 

      if (weeklySalary < 0.0)
         throw new IllegalArgumentException(
            "Weekly salary must be >= 0.0");

      this.weeklySalary = weeklySalary;
   } 

   // set salary
   public void setWeeklySalary(double weeklySalary)
   {
      if (weeklySalary < 0.0)
         throw new IllegalArgumentException(
            "Weekly salary must be >= 0.0");

      this.weeklySalary = weeklySalary;
   } 

   // return salary
   public double getWeeklySalary()
   {
      return weeklySalary;
   } 

   // calculate earnings; override abstract method earnings in Employee
   @Override                                                           
   public double earnings()                                            
   {                                                                   
      return getWeeklySalary();                                        
   }                                             

   // return String representation of SalariedEmployee object   
   @Override                                                    
   public String toString()                                     
   {                                                            
      return String.format("salaried employee: %s%n%s: $%,.2f",
         super.toString(), "weekly salary", getWeeklySalary());
   } 
} // end class SalariedEmployee
```

**Tips:**

- you should not call a class’s instance methods from its constructors—you can call static class methods and make the required call to one of the superclass’s constructors. If you follow this advice, you’ll avoid the problem of calling the class’s overridable methods either directly or indirectly, which can lead to runtime errors. 
- attempting to invoke a subclass-only method directly on a superclass reference is a compilation error
- assigning a superclass variable to a subclass variable is a compilation error
- assigning a subclass reference to a superclass variable is safe, because the subclass object is an object of its superclass. However, the superclass variable can be used to refer only to superclass members. If this code refers to subclass-only members through the superclass variable, the compiler reports errors

#### final Methods and Classes

**Final methods cannot be overridden:**

methods that are declared private are implicitly final, because it's not possible to overridden them in a subclass. Methods that are declared static are also implicitly final

**static binding:** calls to final method5s are resolved at compile time

**Final classes cannot be superclass:**

all methods in a final class are implicitly final

**Tip:** unless you carefully design a class for extension, you should declare the class as final to avoid errors

#### Creating and Using Interfaces

**interface**: 

- unrelated classes implement a set of common methods

- define and standardize the ways in which things such as people and systems can interact with one another (what not how)

- contains only constants and abstract methods

- must be public and may not specify any implementation

- a concrete class must specify that it **implements** the interface and must declare each method in the interface with the signature specified in the interface declaration

- a class that does not implement all the methods of the interface is an abstract class and must be declared abstract

- objects of classes that implement the same interface can respond to the same method calls

- an interface is often used in place of an abstract class when there's no default implementation to inherit

- it's proper style to declare an interface's abstract methods without keywords public and abstract, because they're redundant in interface-method declarations. Similarly, an interface's constants should be declared without keywords public, static and final, because they, too, are redundant

- interface methods can have parameters and final static constants

- **a class can extend only one other class but can implement many interfaces**

- objects of any subclasses of the class that implements the interface can also be thought of as objects of the interface type

- when a method parameter is declared with a superclass or interface type, the method processes the object passed as an argument **polymorphically**

![](b9635e54/uml3.jpg)

```java
// Fig. 10.11: Payable.java
// Payable interface declaration.

public interface Payable 
{    
   double getPaymentAmount(); // calculate payment; no implementation
}
```

```java
// Fig. 10.12: Invoice.java
// Invoice class that implements Payable.

public class Invoice implements Payable
{
   private final String partNumber; 
   private final String partDescription;
   private int quantity;
   private double pricePerItem;

   // constructor
   public Invoice(String partNumber, String partDescription, int quantity,
      double pricePerItem)
   {
      if (quantity < 0) // validate quantity
         throw new IllegalArgumentException("Quantity must be >= 0");

      if (pricePerItem < 0.0) // validate pricePerItem
         throw new IllegalArgumentException(
            "Price per item must be >= 0");

      this.quantity = quantity;
      this.partNumber = partNumber;
      this.partDescription = partDescription;
      this.pricePerItem = pricePerItem;
   } // end constructor

   // get part number
   public String getPartNumber()
   {
      return partNumber; // should validate
   } 

   // get description
   public String getPartDescription()
   {
      return partDescription;
   } 

   // set quantity
   public void setQuantity(int quantity)
   {
      if (quantity < 0) // validate quantity
         throw new IllegalArgumentException("Quantity must be >= 0");

      this.quantity = quantity;
   } 

   // get quantity
   public int getQuantity()
   {
      return quantity;
   }

   // set price per item
   public void setPricePerItem(double pricePerItem)
   {
      if (pricePerItem < 0.0) // validate pricePerItem
         throw new IllegalArgumentException(
            "Price per item must be >= 0");

      this.pricePerItem = pricePerItem;
   } 

   // get price per item
   public double getPricePerItem()
   {
      return pricePerItem;
   } 

   // return String representation of Invoice object
   @Override
   public String toString()
   {
      return String.format("%s: %n%s: %s (%s) %n%s: %d %n%s: $%,.2f", 
         "invoice", "part number", getPartNumber(), getPartDescription(), 
         "quantity", getQuantity(), "price per item", getPricePerItem());
   } 

   // method required to carry out contract with interface Payable     
   @Override                                                           
   public double getPaymentAmount()                                    
   {                                                                   
      return getQuantity() * getPricePerItem(); // calculate total cost
   } 
} // end class Invoice
```

```java
// Fig. 10.13: Employee.java
// Employee abstract superclass that implements Payable.

public abstract class Employee implements Payable
{
   private final String firstName;
   private final String lastName;
   private final String socialSecurityNumber;

   // constructor
   public Employee(String firstName, String lastName, 
      String socialSecurityNumber)
   {
      this.firstName = firstName;
      this.lastName = lastName;
      this.socialSecurityNumber = socialSecurityNumber;
   } 

   // return first name
   public String getFirstName()
   {
      return firstName;
   } 

   // return last name
   public String getLastName()
   {
      return lastName;
   } 

   // return social security number
   public String getSocialSecurityNumber()
   {
      return socialSecurityNumber;
   } 

   // return String representation of Employee object
   @Override
   public String toString()
   {
      return String.format("%s %s%nsocial security number: %s", 
         getFirstName(), getLastName(), getSocialSecurityNumber());
   }

   // Note: We do not implement Payable method getPaymentAmount here so 
   // this class must be declared abstract to avoid a compilation error.
} // end abstract class Employee
```

```java
// Fig. 10.14: SalariedEmployee.java
// SalariedEmployee class that implements interface Payable.
// method getPaymentAmount.
public class SalariedEmployee extends Employee 
{
   private double weeklySalary;

   // constructor
   public SalariedEmployee(String firstName, String lastName, 
      String socialSecurityNumber, double weeklySalary)
   {
      super(firstName, lastName, socialSecurityNumber); 

      if (weeklySalary < 0.0)
         throw new IllegalArgumentException(
            "Weekly salary must be >= 0.0");

      this.weeklySalary = weeklySalary;
   } 

   // set salary
   public void setWeeklySalary(double weeklySalary)
   {
      if (weeklySalary < 0.0)
         throw new IllegalArgumentException(
            "Weekly salary must be >= 0.0");

      this.weeklySalary = weeklySalary;
   } 

   // return salary
   public double getWeeklySalary()
   {
      return weeklySalary;
   } 

   // calculate earnings; implement interface Payable method that was
   // abstract in superclass Employee                                
   @Override                                                         
   public double getPaymentAmount()                                  
   {                                                                 
      return getWeeklySalary();                                      
   } 

   // return String representation of SalariedEmployee object   
   @Override                                                    
   public String toString()                                     
   {                                                            
      return String.format("salaried employee: %s%n%s: $%,.2f",
         super.toString(), "weekly salary", getWeeklySalary());
   } 
} // end class SalariedEmployee
```

#### Common Interface of Java API

![](b9635e54/interface1.jpg)

![](b9635e54/interface2.jpg)

#### Java SE 8 Interface Enhancements

**default** methods with concrete default implementations that specify how operations are performed when an implementing class does not override the methods

any class that implements the original interface will not break when a default method is added

the implementing class is not required to override the interface's default methods, but it can if necessary

## Files, Streams and Object Serialization

Data maintained in files is **persistent data** - it exists beyond the duration of program execution

Java views each file as a sequential **stream of bytes**

the program does not need to know how the underlying platform represents files or streams

**File streams:**

- **Byte-based streams** (binary files): output and input data in its binary format
- **Character-based streams** (text files): output and input data as a sequence of characters in which every character is two bytes

java program **opens** a file by creating an object and associating a stream of bytes or characters with it

**stream objects**: System.in, System.out, System.err

### Using NIO Classes and Interfaces to Get File and Directory Information

useful **API**s:

- **Path** interface: the location of a file or directory
- **Paths** class: provides static methods to get a Path object
- **Files** class: provides static methods for common file and directory manipulation
- **DirectoryStream** interface: iterate through the contents of a directory

```java
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Scanner;

public class FileAndDirectoryInfo
{
   public static void main(String[] args) throws IOException
   {
      Scanner input = new Scanner(System.in);

      System.out.println("Enter file or directory name:");

      // create Path object based on user input
      Path path = Paths.get(input.nextLine());

      if (Files.exists(path)) // if path exists, output info about it
      {
         // display file (or directory) information
          System.out.printf("%n%s exists%n", path.getFileName());
          System.out.printf("%s a directory%n", 
              Files.isDirectory(path) ? "Is" : "Is not");
          System.out.printf("%s an absolute path%n", 
              path.isAbsolute() ? "Is" : "Is not");
          System.out.printf("Last modified: %s%n", 
              Files.getLastModifiedTime(path));
          System.out.printf("Size: %s%n", Files.size(path));
          System.out.printf("Path: %s%n", path);
          System.out.printf("Absolute path: %s%n", path.toAbsolutePath());

         if (Files.isDirectory(path)) // output directory listing
         {
            System.out.printf("%nDirectory contents:%n");

            // object for iterating through a directory's contents
            DirectoryStream<Path> directoryStream = 
               Files.newDirectoryStream(path);

            for (Path p : directoryStream)
               System.out.println(p);
         } 
      } 
      else // not file or directory, output error message
      {
         System.out.printf("%s does not exist%n", path);
      }   
   }
} // end class FileAndDirectoryInfo
```

**Tips:**

- on a Windows computer, the separator character is a backslash (\\)
- on a Linux or Mac OS X system, it's a forward slash (/)
- when building Strings that represent path information, use **File.separator** to obtain the local computer's proper separator character

### Sequential-Access Text Files

Java imposes no structure on a file - notions such as records do not exist as part of the java language

If a path is not specified, as is the case here, the JVM assumes that the file is in the directory from which the program was executed

If the file does not exist, it will be created. 

If an existing file is opened, its contents are truncated

If it's necessary to read the file again, the program must close the file and reopen it

```java
import java.io.FileNotFoundException;     
import java.lang.SecurityException;       
import java.util.Formatter;               
import java.util.FormatterClosedException;
import java.util.NoSuchElementException;  
import java.util.Scanner;                 

public class CreateTextFile
{
   private static Formatter output; // outputs text to a file       

   public static void main(String[] args)
   {
      openFile();
      addRecords();
      closeFile();
   } 

   // open file clients.txt
   public static void openFile()
   {
      try
      {
         output = new Formatter("clients.txt"); // open the file
      }
      catch (SecurityException securityException)
      {
         System.err.println("Write permission denied. Terminating.");
         System.exit(1); // terminate the program
      } 
      catch (FileNotFoundException fileNotFoundException)
      {
         System.err.println("Error opening file. Terminating.");
         System.exit(1); // terminate the program
      } 
   } 

   // add records to file
   public static void addRecords()
   {
      Scanner input = new Scanner(System.in);
      System.out.printf("%s%n%s%n? ", 
         "Enter account number, first name, last name and balance.",
         "Enter end-of-file indicator to end input.");

      while (input.hasNext()) // loop until end-of-file indicator
      {
         try
         {
            // output new record to file; assumes valid input
            output.format("%d %s %s %.2f%n", input.nextInt(),
               input.next(), input.next(), input.nextDouble());                             
         } 
         catch (FormatterClosedException formatterClosedException)
         {
            System.err.println("Error writing to file. Terminating.");
            break;
         } 
         catch (NoSuchElementException elementException)
         {
            System.err.println("Invalid input. Please try again.");
            input.nextLine(); // discard input so user can try again
         } 

         System.out.print("? ");
      }
   }

   // close file
   public static void closeFile()
   {
      if (output != null)
         output.close();
   } 
} // end class CreateTextFile
```

**Tips:**

- SecurityException: occurs if the user does not have permission to write data to the file
- FileNotFoundException: occurs if the file does not exist and a new file cannot be created or there's an error opening the file
- NoSuchElementException: Scanner input method throws if the data is in the wrong format or there's no more data to input
- method **format**: outputs a formatted String to the output destination of the Formatter object

```java
import java.io.IOException;
import java.lang.IllegalStateException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.NoSuchElementException;
import java.util.Scanner;

public class ReadTextFile
{
   private static Scanner input;

   public static void main(String[] args)
   {
      openFile();
      readRecords();
      closeFile();
   } 

   // open file clients.txt
   public static void openFile()
   {
      try
      {
         input = new Scanner(Paths.get("clients.txt")); 
      } 
      catch (IOException ioException)
      {
         System.err.println("Error opening file. Terminating.");
         System.exit(1);
      } 
   }

   // read record from file
   public static void readRecords()
   {
      System.out.printf("%-10s%-12s%-12s%10s%n", "Account",
         "First Name", "Last Name", "Balance");

      try 
      {
         while (input.hasNext()) // while there is more to read
         {
            // display record contents                     
            System.out.printf("%-10d%-12s%-12s%10.2f%n", input.nextInt(), 
               input.next(), input.next(), input.nextDouble());
         }
      } 
      catch (NoSuchElementException elementException)
      {
         System.err.println("File improperly formed. Terminating.");
      } 
      catch (IllegalStateException stateException)
      {
         System.err.println("Error reading from file. Terminating.");
      } 
   } // end method readRecords

   // close file and terminate application
   public static void closeFile()
   {
      if (input != null)
         input.close();
   } 
} // end class ReadTextFile
```

### Object Serialization

**serialized object**: an object represented as a sequence of bytes that includes the object's data as well as information about the object's type and the types of data stored in the object

**ObjectInputStream, ObjectOutputStream**: enable entire objects (byte-based representation) to be read from or written to a stream

**wrapping**: initialize stream objects with other stream objects in this manner. When using wrapped streams, closing the outermost stream also closes the wrapped stream as well

**writeObject** in **ObjectOutput**: takes an Object as an argument and writes its information to an OutputStream

**readObject** in **ObjectInput**: read and returns a reference to an Object from an InputStream

interface **Serializable**: allows objects of this class to be serialized and deserialized with ObjectOutputStreams and ObjectInputStreams. In a Serializable class, every instance variable must be Serializable. Non-serializable instance variables must be declared **transient** to indicate that they should be ignored. By default, all primitive-type variables are serializable

**newOutputStream**: receives a Path specifying  the file to open and, if the file exists, returns an OutputStream that can be used to write to the file

**newInputStream**: receives a Path specifying  the file to open and, if the file exists, returns an InputStream that can be used to read from the file

```java
import java.io.Serializable;

public class Account implements Serializable
{
   private int account;
   private String firstName;
   private String lastName;
   private double balance;

   // initializes an Account with default values
   public Account() 
   {
      this(0, "", "", 0.0); // call other constructor
   } 

   // initializes an Account with provided values
   public Account(int account, String firstName, 
      String lastName, double balance)
   {
      this.account = account;
      this.firstName = firstName;
      this.lastName = lastName;
      this.balance = balance;
   }

   // set account number   
   public void setAccount(int acct)
   {
      this.account = account;
   } 

   // get account number   
   public int getAccount() 
   { 
      return account; 
   } 

   // set first name   
   public void setFirstName(String firstName)
   {
      this.firstName = firstName;
   } 

   // get first name   
   public String getFirstName() 
   { 
      return firstName; 
   } 

   // set last name   
   public void setLastName(String lastName)
   {
      this.lastName = lastName;
   } 

   // get last name   
   public String getLastName() 
   {
      return lastName; 
   } 

   // set balance  
   public void setBalance(double balance)
   {
      this.balance = balance;
   } 

   // get balance   
   public double getBalance() 
   { 
      return balance; 
   } 
} // end class AccountRecordSerializable
```

```java
import java.io.Serializable;

public class Account implements Serializable
{
   private int account;
   private String firstName;
   private String lastName;
   private double balance;

   // initializes an Account with default values
   public Account() 
   {
      this(0, "", "", 0.0); // call other constructor
   } 

   // initializes an Account with provided values
   public Account(int account, String firstName, 
      String lastName, double balance)
   {
      this.account = account;
      this.firstName = firstName;
      this.lastName = lastName;
      this.balance = balance;
   }

   // set account number   
   public void setAccount(int acct)
   {
      this.account = account;
   } 

   // get account number   
   public int getAccount() 
   { 
      return account; 
   } 

   // set first name   
   public void setFirstName(String firstName)
   {
      this.firstName = firstName;
   } 

   // get first name   
   public String getFirstName() 
   { 
      return firstName; 
   } 

   // set last name   
   public void setLastName(String lastName)
   {
      this.lastName = lastName;
   } 

   // get last name   
   public String getLastName() 
   {
      return lastName; 
   } 

   // set balance  
   public void setBalance(double balance)
   {
      this.balance = balance;
   } 

   // get balance   
   public double getBalance() 
   { 
      return balance; 
   } 
} // end class AccountRecordSerializable
```

```java
import java.io.EOFException;     
import java.io.IOException;      
import java.io.ObjectInputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

public class ReadSequentialFile
{
   private static ObjectInputStream input;

   public static void main(String[] args)
   {
      openFile();
      readRecords();
      closeFile();
   } 

   // enable user to select file to open
   public static void openFile()
   {
      try // open file
      {
         input = new ObjectInputStream(          
            Files.newInputStream(Paths.get("clients.ser")));
      } 
      catch (IOException ioException)
      {
         System.err.println("Error opening file.");
         System.exit(1);
      } 
   }

   // read record from file
   public static void readRecords()
   {
      System.out.printf("%-10s%-12s%-12s%10s%n", "Account",
         "First Name", "Last Name", "Balance");

      try 
      {
         while (true) // loop until there is an EOFException
         {
            Account record = (Account) input.readObject();

            // display record contents
            System.out.printf("%-10d%-12s%-12s%10.2f%n",  
               record.getAccount(), record.getFirstName(), 
               record.getLastName(), record.getBalance());
         } 
      }
      catch (EOFException endOfFileException)
      {
         System.out.printf("%nNo more records%n");
      } 
      catch (ClassNotFoundException classNotFoundException)
      {
         System.err.println("Invalid object type. Terminating.");
      } 
      catch (IOException ioException)
      {
         System.err.println("Error reading from file. Terminating.");
      } 
   } // end method readRecords

   // close file and terminate application
   public static void closeFile()
   {
      try
      {
         if (input != null)
            input.close();
      } 
      catch (IOException ioException)
      {
         System.err.println("Error closing file. Terminating.");
         System.exit(1);
      } 
   } 
} // end class ReadSequentialFile
```

**Tips:**

- EOFException: if an attempt is made to read beyond the end of the file
- ClassNotFoundException: if the class for the object being read cannot be located

## Exception Handling

handling an exception allows a program to continue executing as if no problem had been encountered (robust, fault-tolerant, graceful termination)

### Handling ArithmeticExceptions and InputMismatchExceptions

InputMismatchException occurs when Scanner method nextInt receives a string that does not represent a valid integer

if an exception occurs, the remaining code in the **try** block will be skipped 

**catch** block (catch clause / exception handler): catches and handles an exception

the type in the catch block matches the thrown exception type exactly or is a direct or indirect superclass of it

at least one catch block or a **finally** block must immediately follow the try block

**termination model**: when the try block terminates, program control transfers to the first of the following catch blocks in which the exception parameter's type matches the thrown exception's type. After the exception is handled, program control does not return to the throw point, because the try block has **expired** (its local variables have been lost). When a catch block terminates, local variables declared within the catch block (including exception parameter) go out of scope and are destroyed

**throws** clause: must appear after the method's parameter list and before the body, contains a comma-separated list of the exception types

```java
import java.util.InputMismatchException;
import java.util.Scanner;

public class DivideByZeroWithExceptionHandling
{
   // demonstrates throwing an exception when a divide-by-zero occurs
   public static int quotient(int numerator, int denominator)
      throws ArithmeticException
   {
      return numerator / denominator; // possible division by zero
   } 

   public static void main(String[] args)
   {
      Scanner scanner = new Scanner(System.in); 
      boolean continueLoop = true; // determines if more input is needed

      do
      {
         try // read two numbers and calculate quotient
         {
            System.out.print("Please enter an integer numerator: ");
            int numerator = scanner.nextInt();
            System.out.print("Please enter an integer denominator: ");
            int denominator = scanner.nextInt();

            int result = quotient(numerator, denominator);
            System.out.printf("%nResult: %d / %d = %d%n", numerator,
               denominator, result);
            continueLoop = false; // input successful; end looping
         }
         catch (InputMismatchException inputMismatchException)
         {
            System.err.printf("%nException: %s%n",
               inputMismatchException);
            scanner.nextLine(); // discard input so user can try again
            System.out.printf(
               "You must enter integers. Please try again.%n%n");
         }
         catch (ArithmeticException arithmeticException)
         {
            System.err.printf("%nException: %s%n", arithmeticException);
            System.out.printf(
               "Zero is an invalid denominator. Please try again.%n%n");
         } 
      } while (continueLoop); 
   } 
} // end class DivideByZeroWithExceptionHandling
```

**Tips:**

- java does allow division by zero with floating-point values but displays as the string **Infinity** or **-Infinity**
- if 0.0 is divided by 0.0, the result is **NaN**, which is also represented in java as a floating-point value. If you need to compare a floating-point value to NaN, use the method isNaN of class Float/Double
- it's a syntax error to place code between a try block and its corresponding catch blocks

### Java Exception Hierarchy

![](b9635e54/exception.jpg)

only **Throwable** objects can be used with exception-handling mechanism

**Error** and its subclasses represent abnormal situations. Most Errors happen infrequently and should not be caught by applications - it's usually not possible for applications to recover from Errors

**unchecked exceptions**: caused by defects in your program's code. Java compiler does not examine the code to determine whether an unchecked exception is caught or declared. Unchecked exceptions are not required to be listed in a method's throws clause

**checked exceptions**: caused by conditions that are not under the control of the program

**catch-or-declare requirement**: the compiler checks each method call and method declaration to determine whether the method throws a checked exception. If so, the compiler verifies that the checked exception is caught or is declared in a throws clause

**Tips:**

- you must deal with checked exceptions. This results in more robust code than would be created if you were able to simply ignore them
- If a subclass method overrides a superclass method, it's an error for the subclass method to list more exceptions in its throws clause than the superclass method does. However, a subclass's throws clause can contain a subset of a superclass's throws clause
- If your method calls other methods that throw checked exception, those exceptions **must** be caught or declared. If an exception can be handled meaningfully in a method, the method should catch the exception rather than declare it
- If a catch handler is written to catch superclass exception objects, it can also catch all objects of that class's subclass (polymorphically)
- If multiple catch blocks match a particular exception type, only the **first** matching catch block executes
- placing a catch block for a superclass exception type before other catch blocks that catch subclass exception types would prevent those catch blocks from executing, so a compilation error occurs
- positioning a catch block for the superclass type **after** all other subclass catch blocks ensures that all subclass exceptions are eventually caught

### finally Block

**resource leaks**: files, database connections and network connections that are not closed properly after they're no longer needed (java will not garbage collect an object until there are no remaining references to it)

the finally block is an ideal place to **release resources** acquired in a try block

always release a resource explicitly and at the earliest possible moment at which it's no longer needed. This makes resources available for reuse as early as possible, thus improving resource utilization and program performance

the one case in which the finally block will **not** execute is if the application exits early from a try block by calling method System.exit

```java
public class UsingExceptions 
{
   public static void main(String[] args)
   {
      try 
      { 
         throwException(); 
      }
      catch (Exception exception) // exception thrown by throwException
      {
         System.err.println("Exception handled in main");
      } 

      doesNotThrowException();
   } 

   // demonstrate try...catch...finally
   public static void throwException() throws Exception
   {
      try // throw an exception and immediately catch it
      { 
         System.out.println("Method throwException");
         throw new Exception(); // generate exception
      }
      catch (Exception exception) // catch exception thrown in try
      {
         System.err.println(
            "Exception handled in method throwException");
         throw exception; // rethrow for further processing

         // code here would not be reached; would cause compilation errors

      } 
      finally // executes regardless of what occurs in try...catch
      {
         System.err.println("Finally executed in throwException");
      }

      // code here would not be reached; would cause compilation errors

   }

   // demonstrate finally when no exception occurs
   public static void doesNotThrowException()
   {
      try // try block does not throw an exception
      { 
         System.out.println("Method doesNotThrowException");
      }
      catch (Exception exception) // does not execute
      {
         System.err.println(exception);
      }
      finally // executes regardless of what occurs in try...catch
      {
         System.err.println(
            "Finally executed in doesNotThrowException");
      } 

      System.out.println("End of method doesNotThrowException");
   } 
} // end class UsingExceptions
```

**Tips:**

- throw exceptions from constructors to indicate that the constructor parameters are not valid - this prevents an object from being created in an invalid state
- **rethrowing** an exception defers the exception handling to another catch block associated with an outer try statement
- when a rethrow occurs, the next enclosing try block detects the rethrown exception, and that try block's catch blocks attempt to handle it
- if an exception has not been caught when control enters a finally block and the finally block throws an exception that's not caught in the finally block, the first exception will be lost and the exception from the finally block will be returned to the calling method (avoid placing in a finally block code that can throw an exception)

> exception handling removes error-processing code from the main line of a program's code to improve program clarity. Do not place try...catch...finally around every statement that may throw an exception. This decreases readability. Rather, place one try block around a significant portion of your code, follow the try with catch blocks that handle each possible exception and follow the catch blocks with a single finally block

### Stack Unwinding and Obtaining Information from an Exception Object

**stack unwinding**: when an exception is thrown but not caught in particular scope, the method-call stack is **unwound**, and an attempt is made to catch the exception in the next outer try block

unwinding the method-call stack means that the method in which the exception was not caught terminates. All local variables in that method go out of scope and control returns to the statement that originally invoked that method

```java
public class UsingExceptions 
{
   public static void main(String[] args)
   {
      try 
      { 
         method1(); 
      }
      catch (Exception exception) // catch exception thrown in method1
      { 
         System.err.printf("%s%n%n", exception.getMessage());
         exception.printStackTrace(); 

         // obtain the stack-trace information
         StackTraceElement[] traceElements = exception.getStackTrace();

         System.out.printf("%nStack trace from getStackTrace:%n");
         System.out.println("Class\t\tFile\t\t\tLine\tMethod");

         // loop through traceElements to get exception description
         for (StackTraceElement element : traceElements) 
         {
            System.out.printf("%s\t", element.getClassName());
            System.out.printf("%s\t", element.getFileName());
            System.out.printf("%s\t", element.getLineNumber());
            System.out.printf("%s%n", element.getMethodName());
         } 
      } 
   } // end main

   // call method2; throw exceptions back to main
   public static void method1() throws Exception
   {
      method2();
   } 

   // call method3; throw exceptions back to method1
   public static void method2() throws Exception
   {
      method3();
   }

   // throw Exception back to method2
   public static void method3() throws Exception
   {
      throw new Exception("Exception thrown in method3");
   } 
} // end class UsingExceptions
```

### Chained Exceptions

Sometimes a method responds to an exception by throwing a different exception type that's specific to the current application. If a catch block throws a new exception, the original exception's information and stack trace are lost

**chained exceptions**: enable an exception object to maintain the complete stack-trace information from the original exception

```java
public class UsingChainedExceptions
{
   public static void main(String[] args)
   {
      try 
      { 
         method1(); 
      } 
      catch (Exception exception) // exceptions thrown from method1
      { 
         exception.printStackTrace();
      } 
   } 

   // call method2; throw exceptions back to main
   public static void method1() throws Exception
   {
      try 
      { 
         method2(); 
      }
      catch (Exception exception) // exception thrown from method2
      {
         throw new Exception("Exception thrown in method1", exception);
      }
   } // end method method1

   // call method3; throw exceptions back to method1
   public static void method2() throws Exception
   {
      try 
      { 
         method3(); 
      } 
      catch (Exception exception) // exception thrown from method3
      {
         throw new Exception("Exception thrown in method2", exception);
      } 
   } // end method method2

   // throw Exception back to method2
   public static void method3() throws Exception
   {
      throw new Exception("Exception thrown in method3");
   } 
} // end class UsingChainedExceptions
```

### Declaring New Exception Types

a new exception class must extend an existing exception class

a typical new exception class contains only 4 constructors:

- one that takes no arguments and passes a default error message String to the superclass constructor
- one that receives a customized error message as a String and passes it to the superclass constructor
- one that receives a customized error message as a String and a Throwable (for chaining exception) and passes both to the superclass constructor
- one that receives a Throwable and passes it to the superclass constructor

### Precondition and Postconditions

**preconditions**: describe constraints on method parameters and any other expectations the method has about the current state of a program just **before** it begins executing

**postconditions**: describe constraints on the return value and any other side effects the method may have

### Assertions

state conditions that should be true at a particular point in a method

form of assert statement:

```java
assert expresssion;
```

```java
assert expression1 : expression2; // expression2 -> error message
```

you can use assertions to implement preconditions and postconditions programmatically or to verify any other intermediate states

```java
import java.util.Scanner;

public class AssertTest
{
   public static void main(String[] args)
   {
      Scanner input = new Scanner(System.in);

      System.out.print("Enter a number between 0 and 10: ");
      int number = input.nextInt();

      // assert that the value is >= 0 and <= 10
      assert (number >= 0 && number <= 10) : "bad number: " + number;

      System.out.printf("You entered %d%n", number);
   } 
} // end class AssertTest
```

> Users  shouldn’t  encounter AssertionErrors—these  should  be  used  only  during  program development.  For  this  reason,  you  shouldn’t  catch AssertionErrors.  Instead,  allow  the program to terminate, so you can see the error message, then locate and fix the source of the problem. You should not use assert to indicate runtime problems in production code — use the exception mechanism for this purpose.

### try-with-Resources: Automatic Resource Deallocation

each resource must be an object of a class that implements the AutoCloseable interface

the try-with-resources statement implicitly calls the Object's close method at the end of try block. You can allocate multiple resources in the parentheses following try by separating them with a semicolon

```java
try (ClassName theObject = new ClassName())
{
    // use theObject here
}
catch (Exception e)
{
    // catch exceptions that occur while using the resource
}
```