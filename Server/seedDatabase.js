const mongoose = require('mongoose')
const AnalysisRegex = require('./models/schemas');
const DetectRegex = require('./models/schemas');
require('dotenv/config')



// The regexPatterns array defined in step 1
const regexPatterns = [
  {
    name: 'Variable Type',
    pattern: '\\b(var|let|const|int|float|double|string|class|function)\\s+([a-zA-Z_$][\\w$]*)(\\s*:\\s*([a-zA-Z_$][\\w$<>]+))?\\s*=[^;]+',
    description: 'Matches variable declarations with type annotations',
  },
  {
    name: 'Comment',
    pattern: '//.*|/\\*[\\s\\S]*?\\*/|#.*',
    description: 'Matches single-line and multi-line comments',
  },
  {
    name: 'Control Structure',
    pattern: '\\b(?:if|else|for|while|switch)\\b[^]*?(\\n\\s*|$)',
    description: 'Matches control structures (if statements, loops, switch)',
  },
  {
    name: 'Function and Method',
    pattern: '\\bfunction\\b\\s+[\\w$]+\\s*\\(',
    description: 'Matches function and method declarations',
  },
  {
    name: 'Error Handling',
    pattern: '\\btry\\b|\\bcatch\\b',
    description: 'Matches try and catch blocks for error handling',
  },
  {
    name: 'API Call',
    pattern: '\\b(fetch|axios|http)\\(',
    description: 'Matches API call functions',
  },
  {
    name: 'Cyclomatic Complexity Decision Points',
    pattern: '\\belse\\s+if\\b|\\bif\\b|\\belse\\b| \\bfor\\b|\\bwhile\\b|\\bcase\\b|\\bcatch\\b|\\b&&\\b|\\b\\|\\|\\b',
    description: 'Matches decision points for calculating cyclomatic complexity',
  },
];

// The regexPatterns array defined in step 1
const DetectregexPatterns = [
  // Javascript and TypeScript
  {
    name: "MissingSemicolonJSX",
    languageType: "JavaScript,TypeScript",
    pattern: "(?<!;|\\}|\\{|>|\\{|//[^\\n]*$)\\s*$",
    errorMessage: "Possible missing semicolon. Consider adding a semicolon ';' at the end of the statement.",
    description: "Checks for missing semicolons at the end of statements, adjusting the rule to accommodate JSX."
  },
  {
    name: "UnmatchedJSXTag",
    languageType: "JavaScript,TypeScript",
    pattern: "<\\w+[^/>]*$|^[^<]*>",
    errorMessage: "Unmatched JSX tag detected. Ensure JSX tags are properly closed.",
    description: "Basic check for unmatched JSX tags within a single line. This does not accurately handle nested or multi-line JSX."
  },
  // Python
  {
    name: "IndentationCheckPython",
    languageType: "Python",
    pattern: "^(?!\\s{4})*\\S",
    errorMessage: "Line not indented correctly. Use multiples of 4 spaces for indentation.",
    description: "Checks for line indentation to be multiples of 4 spaces in Python."
  },
  {
    name: "BlockStartsWithColonPython",
    languageType: "Python",
    pattern: "\\b(if|else|elif|for|while|def|class|with|try|except|finally)\\b.*[^:]$",
    errorMessage: "Block statement not ending with a colon. Ensure the statement ends with a colon ':'.",
    description: "Detects block statements in Python that do not end with a colon."
  },
  {
    name: "MisuseOfAssignmentInIfConditionPython",
    languageType: "Python",
    pattern: "\\bif\\b.*=.*$",
    errorMessage: "Possible misuse of assignment '=' instead of equality '=='. Use '==' for equality checks in conditions.",
    description: "Identifies potential misuse of assignment in if conditions."
  },
  {
    name: "MethodDefinitionMissingSelfPython",
    languageType: "Python",
    pattern: "\\bdef\\b\\s+\\w+\\((?!self)",
    errorMessage: "Instance method definition missing 'self'. The first parameter of instance methods should be 'self'.",
    description: "Checks for Python instance method definitions that are missing the 'self' parameter."
  },
  // Java Patterns
  {
    name: "ClassDeclarationMissingAccessModifierJava",
    languageType: "Java",
    pattern: "\\bclass\\s+\\w+",
    errorMessage: "Class declaration missing access modifier. Precede the class name with 'public', 'protected', or 'private'.",
    description: "Detects Java class declarations missing an access modifier."
  },
  {
    name: "MissingSemicolonJava",
    languageType: "Java",
    pattern: "^[^;{}\\]\\s]*[^;{}:\\s\\]>]$",
    errorMessage: "Possible missing semicolon. Add a semicolon ';' at the end of the statement.",
    description: "Checks for Java statements that likely miss a semicolon at the end."
  },
  // HTML
  {
    name: "UnmatchedTagHTML",
    languageType: "HTML",
    pattern: "<[^>]*$",
    errorMessage: "Unmatched tag detected. Ensure each opening tag '<tag>' has a corresponding closing tag '</tag>'.",
    description: "Detects opening tags without a corresponding closing tag on the same line."
  },
  {
    name: "TagNotClosedProperlyHTML",
    languageType: "HTML",
    pattern: "<([^/\\s>]+)[^>]*>.*?<\\/\\1>",
    errorMessage: "Tag not properly closed. Ensure the tag is properly closed on the same line.",
    description: "Checks for tags that open and close on the same line but are not properly closed."
  },
  {
    name: "MissingQuotesAroundAttributesHTML",
    languageType: "HTML",
    pattern: "<\\w+[^>]*\\b\\w+=(?!['\"])[^>]*>",
    errorMessage: "Attribute value missing quotes. Ensure attribute values are enclosed in quotes.",
    description: "Identifies attributes within tags that are missing quotes around their values."
  },
  {
    name: "UnfinishedHTMLComment",
    languageType: "HTML",
    pattern: "<!--[^-]*$",
    errorMessage: "Unfinished HTML comment detected. Ensure the comment is properly closed with '-->'.",
    description: "Detects HTML comments that start but do not end on the same line."
  },
  {
    name: "IncorrectSelfClosingTagSyntaxHTML",
    languageType: "HTML",
    pattern: "<\\w+(\\s+\\w+=(['\"]).*?\\2)*\\s*/?>",
    errorMessage: "Incorrect self-closing tag syntax. Check the syntax for self-closing tags, e.g., '<img src=\"image.png\" />'",
    description: "Checks for self-closing tags to ensure they follow proper syntax."
  },
  
  // C# Language
  {
    name: "ClassDeclarationMissingAccessModifierCSharp",
    languageType: "C#",
    pattern: "^\\s*class\\s+\\w+",
    errorMessage: "Class declaration missing access modifier. Classes should declare an access level by preceding with 'public', 'private', etc.",
    description: "Detects class declarations in C# that are missing an access modifier."
  },
  {
    name: "MissingSemicolonCSharp",
    languageType: "C#",
    pattern: "^[^;{}\\]\\s]*[^;{}:\\s\\]>]$",
    errorMessage: "Possible missing semicolon. C# statements should end with a semicolon ';'.",
    description: "Checks for C# statements that likely miss a semicolon at the end."
  },
  {
    name: "MissingNamespaceDeclarationCSharp",
    languageType: "C#",
    pattern: "\\bclass\\s+\\w+\\s*\\{",
    errorMessage: "Missing namespace declaration. Consider wrapping your class definitions within a namespace.",
    description: "Detects class definitions in C# that are not declared within a namespace."
  },
  {
    name: "MethodMissingAccessModifierCSharp",
    languageType: "C#",
    pattern: "\\b(void|int|string|double|bool)\\b\\s+\\w+\\s*\\(",
    errorMessage: "Method missing access modifier. Methods should specify an access modifier, like 'public', 'private', etc.",
    description: "Identifies method declarations in C# missing an access modifier."
  },
  {
    name: "IncorrectAssignmentInConditionCSharp",
    languageType: "C#",
    pattern: "\\bif\\s*\\(.*=.*\\)",
    errorMessage: "Incorrect assignment in conditional. Use '==' for comparison inside conditions, not '='.",
    description: "Detects the use of assignment '=' instead of comparison '==' in conditional expressions in C#."
  },

  // Rust Language
  {
    name: "MissingSemicolonRust",
    languageType: "Rust",
    pattern: "^[^;{}\\]\\s]*[^;{}:\\s\\]>]$",
    errorMessage: "Possible missing semicolon. Rust statements outside of control blocks should end with a semicolon ';'.",
    description: "Checks for Rust statements that likely miss a semicolon at the end, excluding control structures."
  },
  {
    name: "FunctionDeclarationSyntaxErrorRust",
    languageType: "Rust",
    pattern: "\\bfn\\s+\\w+\\s*[^\\(]",
    errorMessage: "Function declaration syntax error. Ensure function declarations include parentheses '()'.",
    description: "Detects Rust function declarations missing parentheses."
  },
  {
    name: "MatchArmMissingCommaRust",
    languageType: "Rust",
    pattern: "\\bmatch\\s+|=>\\s*[^,]$",
    errorMessage: "Match arm possibly missing a comma. Match arms should end with a comma ','.",
    description: "Checks for Rust match arms that might be missing a trailing comma."
  },
  {
    name: "MissingArrowInMatchArmRust",
    languageType: "Rust",
    pattern: "\\bmatch\\s+\\w+\\s*\\{[^}]*\\w+\\s+\\w+",
    errorMessage: "Missing '=>' in match arm. Match arms should use '=>' to separate patterns from expressions.",
    description: "Detects missing '=>' in Rust match arms."
  },
  {
    name: "PossibleUnusedVariableRust",
    languageType: "Rust",
    pattern: "\\blet\\s+(?!_)[a-zA-Z_\\w]*\\s*=",
    errorMessage: "Possible unused variable. If the variable is intentionally unused, prefix it with an underscore '_'.",
    description: "Identifies potentially unused variables in Rust."
  },
  {
    name: "MissingMutModifierRust",
    languageType: "Rust",
    pattern: "\\blet\\s+(?!mut\\b)[a-zA-Z_\\w]+\\s*=.*[\\+\\-\\*\\/]=",
    errorMessage: "Variable might be missing 'mut' modifier. Variables that will be modified should be declared with 'mut'.",
    description: "Detects Rust variables that might be missing the 'mut' modifier for mutability."
  }
];

const seedDatabase = async () => {
  try {
    console.log('Connecting to the database...');
    // Connect to the MongoDB database
    await mongoose.connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'frictionless_db', // Make sure it matches the database name
    });
    console.log('Connected to the database.');

    console.log('Clearing existing patterns...');

    console.log('Clearing existing patterns...');
    // Clear existing patterns
    await AnalysisRegex.deleteMany({});
    await DetectRegex.deleteMany({});

    console.log('Existing patterns cleared.');

    console.log('Inserting new patterns...');
    // Insert new patterns
    const newPatterns = regexPatterns.map((pattern) => pattern); // Assuming your patterns are in the correct format
    await AnalysisRegex.insertMany(newPatterns);

    // Assuming you have a DetectregexPatterns array ready
    await DetectRegex.insertMany(DetectregexPatterns);
    console.log('DetectRegex patterns inserted successfully.');

    console.log('New patterns inserted successfully.');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();