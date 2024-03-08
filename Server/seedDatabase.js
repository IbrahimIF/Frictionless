const mongoose = require('mongoose')
const AnalysisRegex = require('./models/schemas');
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
    pattern: '\\belse\\s+if\\b|\\bif\\b|\\belse\\b|\\bfor\\b|\\bwhile\\b|\\bcase\\b|\\bcatch\\b|\\b&&\\b|\\b\\|\\|\\b',
    description: 'Matches decision points for calculating cyclomatic complexity',
  },
];

// The regexPatterns array defined in step 1
const DetectregexPatterns = [
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
    pattern: '\\belse\\s+if\\b|\\bif\\b|\\belse\\b|\\bfor\\b|\\bwhile\\b|\\bcase\\b|\\bcatch\\b|\\b&&\\b|\\b\\|\\|\\b',
    description: 'Matches decision points for calculating cyclomatic complexity',
  },
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

    console.log('Existing patterns cleared.');

    console.log('Inserting new patterns...');
    // Insert new patterns
    const newPatterns = regexPatterns.map((pattern) => pattern); // Assuming your patterns are in the correct format
    await AnalysisRegex.insertMany(newPatterns);
    console.log('New patterns inserted successfully.');

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();