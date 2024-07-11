export interface Question {
  questionId: number;
  questionType: string;
  questionText: string;
  choices: string[];
  answer: number;
  explanation: string;
  hint: string;
  mascot: string;
}

export interface Level {
  levelId: number;
  questions: Question[];
}

export interface Unit {
  unitId: number;
  unitText: string;
  levels: Level[];
}

export interface Course {
  courseCode: string;
  courseTitle: string;
  units: Unit[];
}

const courseData: { [key: string]: Course } = {
  "CPCS 211": {
    courseCode: "CPCS 211",
    courseTitle: "LOGIC DESIGN",
    units: [
      {
        unitId: 1,
        unitText: "FUNDAMENTALS OF ARRAYS",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What are logic gates?",
                choices: [
                  "Devices that amplify signals",
                  "Basic building blocks of digital circuits",
                  "Components that store data",
                  "Units that measure electrical resistance",
                ],
                answer: 1,
                explanation:
                  "Logic gates are fundamental building blocks of digital circuits.",
                hint: "They are used in digital circuits.",
                mascot: "Logical Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "Explain Boolean algebra.",
                choices: [
                  "A type of advanced calculus",
                  "A mathematical system for analyzing circuits",
                  "A programming language",
                  "A method to design mechanical systems",
                ],
                answer: 1,
                explanation:
                  "Boolean algebra is a mathematical system used to analyze and simplify digital circuits.",
                hint: "It's related to logic and circuits.",
                mascot: "Logical Bot",
              },
              {
                questionId: 3,
                questionType: "Multiple Choice",
                questionText: "Explain Life",
                choices: [
                  "A programming language",
                  "A mathematical system",
                  "A digital circuit component",
                  "A complex set of rules and experiences",
                ],
                answer: 3,
                explanation:
                  "Life is a complex set of rules and experiences, often requiring logical thinking.",
                hint: "Think beyond circuits and mathematics.",
                mascot: "Logical Bot",
              },
            ],
          },
          {
            levelId: 2,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a truth table?",
                choices: [
                  "A table showing logical relationships",
                  "A data storage method",
                  "A type of array",
                  "A method to measure voltage",
                ],
                answer: 0,
                explanation:
                  "A truth table is a mathematical table used in logic to determine the truth value of a complex expression.",
                hint: "It helps in logic determination.",
                mascot: "Logical Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "Define combinatorial logic.",
                choices: [
                  "Logic based on combinations of input values",
                  "A method to design software",
                  "A system to measure circuits",
                  "A storage method for data",
                ],
                answer: 0,
                explanation:
                  "Combinatorial logic refers to digital circuits where the output is solely dependent on the input values.",
                hint: "It's about input combinations.",
                mascot: "Logical Bot",
              },
            ],
          },
          {
            levelId: 3,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a Karnaugh map?",
                choices: [
                  "A tool for circuit simulation",
                  "A method for simplifying Boolean expressions",
                  "A programming language",
                  "A data structure",
                ],
                answer: 1,
                explanation:
                  "A Karnaugh map is used for simplifying Boolean expressions.",
                hint: "It's a visual tool.",
                mascot: "Logical Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "Explain the AND gate.",
                choices: [
                  "Outputs true if at least one input is true",
                  "Outputs true only if all inputs are true",
                  "Inverts the input signal",
                  "Outputs true if inputs are different",
                ],
                answer: 1,
                explanation:
                  "The AND gate outputs true only if all inputs are true.",
                hint: "It requires all conditions to be true.",
                mascot: "Logical Bot",
              },
            ],
          },
          {
            levelId: 4,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a NOR gate?",
                choices: [
                  "Outputs true if at least one input is true",
                  "Outputs true only if all inputs are true",
                  "Inverts the input signal",
                  "Outputs true if all inputs are false",
                ],
                answer: 3,
                explanation:
                  "The NOR gate outputs true if all inputs are false.",
                hint: "It combines OR and NOT functions.",
                mascot: "Logical Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "Define the NOT gate.",
                choices: [
                  "Outputs true if at least one input is true",
                  "Inverts the input signal",
                  "Outputs true if all inputs are false",
                  "Outputs true only if all inputs are true",
                ],
                answer: 1,
                explanation: "The NOT gate inverts the input signal.",
                hint: "It provides the opposite value.",
                mascot: "Logical Bot",
              },
            ],
          },
          {
            levelId: 5,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a flip-flop?",
                choices: [
                  "A type of shoe",
                  "A type of logical gate",
                  "A memory storage element",
                  "A sorting algorithm",
                ],
                answer: 2,
                explanation:
                  "A flip-flop is a memory storage element used in sequential logic circuits.",
                hint: "It stores a bit of data.",
                mascot: "Logical Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "Describe sequential logic.",
                choices: [
                  "Logic that depends only on current inputs",
                  "Logic that depends on current and past inputs",
                  "Logic for sorting data",
                  "Logic for arithmetic operations",
                ],
                answer: 1,
                explanation:
                  "Sequential logic depends on both current and past inputs.",
                hint: "It has memory of past states.",
                mascot: "Logical Bot",
              },
            ],
          },
        ],
      },
      {
        unitId: 2,
        unitText: "BINARY SYSTEMS",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is the binary number system?",
                choices: [
                  "A number system with base 10",
                  "A number system with base 2",
                  "A number system with base 8",
                  "A number system with base 16",
                ],
                answer: 1,
                explanation:
                  "The binary number system is a base-2 number system that uses two binary digits, 0 and 1.",
                hint: "Think about the simplest form of numbers.",
                mascot: "Logical Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "What are the two digits used in binary?",
                choices: ["0 and 2", "1 and 2", "0 and 1", "1 and 3"],
                answer: 2,
                explanation: "The binary system uses two digits: 0 and 1.",
                hint: "The simplest digits.",
                mascot: "Logical Bot",
              },
            ],
          },
          {
            levelId: 2,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "Convert binary 1010 to decimal.",
                choices: ["8", "10", "12", "14"],
                answer: 1,
                explanation: "Binary 1010 converts to decimal 10.",
                hint: "Each digit represents a power of 2.",
                mascot: "Logical Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "What is the decimal equivalent of binary 1111?",
                choices: ["14", "15", "16", "17"],
                answer: 1,
                explanation: "Binary 1111 converts to decimal 15.",
                hint: "It's the maximum 4-bit value.",
                mascot: "Logical Bot",
              },
            ],
          },
        ],
      },
      {
        unitId: 3,
        unitText: "LOGIC GATES AND CIRCUITS",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is an OR gate?",
                choices: [
                  "Outputs true if at least one input is true",
                  "Outputs true only if all inputs are true",
                  "Inverts the input signal",
                  "Outputs true if all inputs are false",
                ],
                answer: 0,
                explanation:
                  "The OR gate outputs true if at least one input is true.",
                hint: "It requires any condition to be true.",
                mascot: "Logical Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "What is an XOR gate?",
                choices: [
                  "Outputs true if inputs are the same",
                  "Outputs true if inputs are different",
                  "Inverts the input signal",
                  "Outputs true if all inputs are true",
                ],
                answer: 1,
                explanation:
                  "The XOR gate outputs true if inputs are different.",
                hint: "It's called the exclusive OR gate.",
                mascot: "Logical Bot",
              },
            ],
          },
        ],
      },
      {
        unitId: 4,
        unitText: "BOOLEAN ALGEBRA",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a Boolean variable?",
                choices: [
                  "A variable that stores text",
                  "A variable that stores numbers",
                  "A variable that can be true or false",
                  "A variable that stores arrays",
                ],
                answer: 2,
                explanation:
                  "A Boolean variable can have two possible values: true or false.",
                hint: "It deals with binary logic.",
                mascot: "Logical Bot",
              },
            ],
          },
        ],
      },
      {
        unitId: 5,
        unitText: "SEQUENTIAL CIRCUITS",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a clock in sequential circuits?",
                choices: [
                  "A timing device",
                  "A storage device",
                  "A type of logic gate",
                  "A power source",
                ],
                answer: 0,
                explanation:
                  "A clock is a timing device that provides regular pulses for synchronizing sequential circuits.",
                hint: "It helps with timing.",
                mascot: "Logical Bot",
              },
            ],
          },
        ],
      },
    ],
  },
  "CPCS 203": {
    courseCode: "CPCS 203",
    courseTitle: "COMPUTER SCIENCE",
    units: [
      {
        unitId: 1,
        unitText: "INTRODUCTION TO ALGORITHMS",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is an algorithm?",
                choices: [
                  "A step-by-step procedure",
                  "A random process",
                  "A data storage method",
                  "A type of circuit",
                ],
                answer: 0,
                explanation:
                  "An algorithm is a step-by-step procedure or formula for solving a problem.",
                hint: "It's a methodical process.",
                mascot: "Algorithm Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "Why are algorithms important?",
                choices: [
                  "They store data",
                  "They are fundamental to computer science",
                  "They power everything from search engines to operating systems",
                  "Both 1 and 2",
                ],
                answer: 3,
                explanation:
                  "Algorithms are fundamental to computer science and are used to power everything from search engines to operating systems.",
                hint: "They are central to many systems.",
                mascot: "Algorithm Bot",
              },
            ],
          },
          {
            levelId: 2,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "Explain sorting algorithms.",
                choices: [
                  "Algorithms that arrange data",
                  "Algorithms that search for data",
                  "Algorithms that store data",
                  "Algorithms that compress data",
                ],
                answer: 0,
                explanation:
                  "Sorting algorithms are algorithms that put elements of a list in a certain order.",
                hint: "They arrange data in order.",
                mascot: "Algorithm Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "Describe searching algorithms.",
                choices: [
                  "Algorithms that arrange data",
                  "Algorithms that find specific items",
                  "Algorithms that store data",
                  "Algorithms that compress data",
                ],
                answer: 1,
                explanation:
                  "Searching algorithms are algorithms designed to retrieve information stored within some data structure.",
                hint: "They help find specific items.",
                mascot: "Algorithm Bot",
              },
            ],
          },
          {
            levelId: 3,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a binary search algorithm?",
                choices: [
                  "An algorithm that searches sorted data",
                  "An algorithm that searches unsorted data",
                  "An algorithm that sorts data",
                  "An algorithm that compresses data",
                ],
                answer: 0,
                explanation:
                  "Binary search algorithm efficiently finds the position of a target value within a sorted array.",
                hint: "It works on sorted data.",
                mascot: "Algorithm Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "Explain the concept of recursion.",
                choices: [
                  "A technique for compressing data",
                  "A function that calls itself",
                  "A method for storing data",
                  "A type of sorting algorithm",
                ],
                answer: 1,
                explanation:
                  "Recursion is a method where the solution to a problem depends on solutions to smaller instances of the same problem.",
                hint: "It's a self-referential process.",
                mascot: "Algorithm Bot",
              },
            ],
          },
          {
            levelId: 4,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is dynamic programming?",
                choices: [
                  "A method for algorithm optimization",
                  "A programming paradigm",
                  "A method to store data",
                  "A type of search algorithm",
                ],
                answer: 0,
                explanation:
                  "Dynamic programming is an optimization technique that solves problems by breaking them down into simpler subproblems.",
                hint: "It's about breaking down problems.",
                mascot: "Algorithm Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "Describe the greedy algorithm.",
                choices: [
                  "An algorithm that looks at the whole solution",
                  "An algorithm that makes the locally optimal choice at each step",
                  "An algorithm that sorts data",
                  "An algorithm that compresses data",
                ],
                answer: 1,
                explanation:
                  "A greedy algorithm is an approach for solving problems by making the locally optimal choice at each stage with the hope of finding a global optimum.",
                hint: "It's about local optimization.",
                mascot: "Algorithm Bot",
              },
            ],
          },
          {
            levelId: 5,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a graph algorithm?",
                choices: [
                  "An algorithm that deals with graphs",
                  "An algorithm that sorts data",
                  "An algorithm that compresses data",
                  "An algorithm for searching data",
                ],
                answer: 0,
                explanation:
                  "Graph algorithms are a set of instructions that traverse (visit nodes of) a graph.",
                hint: "It's related to nodes and edges.",
                mascot: "Algorithm Bot",
              },
              {
                questionId: 2,
                questionType: "Multiple Choice",
                questionText: "Explain the concept of backtracking.",
                choices: [
                  "A sorting algorithm",
                  "A method for storing data",
                  "An algorithm for solving problems incrementally",
                  "A method for data compression",
                ],
                answer: 2,
                explanation:
                  "Backtracking is an algorithmic technique for solving problems incrementally by trying partial solutions and then abandoning them if they are not suitable.",
                hint: "It involves trying and abandoning solutions.",
                mascot: "Algorithm Bot",
              },
            ],
          },
        ],
      },
      {
        unitId: 2,
        unitText: "DATA STRUCTURES",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a data structure?",
                choices: [
                  "A method to store data",
                  "A step-by-step process",
                  "A type of algorithm",
                  "A programming paradigm",
                ],
                answer: 0,
                explanation:
                  "A data structure is a particular way of organizing and storing data in a computer so that it can be accessed and modified efficiently.",
                hint: "It's about organization and storage.",
                mascot: "Data Bot",
              },
            ],
          },
        ],
      },
      {
        unitId: 3,
        unitText: "ADVANCED ALGORITHMS",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a divide and conquer algorithm?",
                choices: [
                  "An algorithm that compresses data",
                  "An algorithm that sorts data",
                  "An algorithm that breaks a problem into smaller subproblems",
                  "An algorithm that stores data",
                ],
                answer: 2,
                explanation:
                  "Divide and conquer is an algorithm design paradigm based on multi-branched recursion.",
                hint: "It breaks down problems into subproblems.",
                mascot: "Algorithm Bot",
              },
            ],
          },
        ],
      },
      {
        unitId: 4,
        unitText: "COMPLEXITY ANALYSIS",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is Big O notation?",
                choices: [
                  "A method to measure algorithm efficiency",
                  "A data structure",
                  "A sorting algorithm",
                  "A type of graph algorithm",
                ],
                answer: 0,
                explanation:
                  "Big O notation is used to classify algorithms according to how their run time or space requirements grow as the input size grows.",
                hint: "It's about efficiency measurement.",
                mascot: "Algorithm Bot",
              },
            ],
          },
        ],
      },
      {
        unitId: 5,
        unitText: "GRAPH THEORY",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a graph?",
                choices: [
                  "A data structure consisting of nodes and edges",
                  "A method to store data",
                  "A sorting algorithm",
                  "A method for compression",
                ],
                answer: 0,
                explanation:
                  "A graph is a data structure that consists of a finite set of nodes (or vertices) and a set of edges connecting them.",
                hint: "It consists of nodes and edges.",
                mascot: "Graph Bot",
              },
            ],
          },
        ],
      },
      {
        unitId: 6,
        unitText: "ALGORITHMIC STRATEGIES",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is memoization?",
                choices: [
                  "A technique to optimize algorithms",
                  "A data structure",
                  "A type of search algorithm",
                  "A method to sort data",
                ],
                answer: 0,
                explanation:
                  "Memoization is an optimization technique used to speed up computer programs by storing the results of expensive function calls.",
                hint: "It involves storing results for reuse.",
                mascot: "Algorithm Bot",
              },
            ],
          },
        ],
      },
    ],
  },
  "MATH 202": {
    courseCode: "MATH 202",
    courseTitle: "MATHEMATICS",
    units: [
      {
        unitId: 1,
        unitText: "CALCULUS",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a derivative?",
                choices: [
                  "A measure of how a function changes",
                  "A constant value",
                  "A type of integral",
                  "A type of polynomial",
                ],
                answer: 0,
                explanation:
                  "A derivative represents the rate at which a function is changing at any given point.",
                hint: "It's related to the rate of change.",
                mascot: "Calc Bot",
              },
            ],
          },
        ],
      },
      {
        unitId: 2,
        unitText: "LINEAR ALGEBRA",
        levels: [
          {
            levelId: 1,
            questions: [
              {
                questionId: 1,
                questionType: "Multiple Choice",
                questionText: "What is a matrix?",
                choices: [
                  "A rectangular array of numbers",
                  "A type of polynomial",
                  "A constant value",
                  "A type of equation",
                ],
                answer: 0,
                explanation:
                  "A matrix is a rectangular array of numbers or other mathematical objects, for which operations such as addition and multiplication are defined.",
                hint: "It's a rectangular array.",
                mascot: "Lin Bot",
              },
            ],
          },
        ],
      },
    ],
  },
};

export default courseData;
