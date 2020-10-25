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

