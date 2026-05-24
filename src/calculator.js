#!/usr/bin/env node

// Supported operations: addition (+), subtraction (-), multiplication (*), division (/).
const operations = {
  add: (left, right) => left + right,
  '+': (left, right) => left + right,
  subtract: (left, right) => left - right,
  '-': (left, right) => left - right,
  multiply: (left, right) => left * right,
  '*': (left, right) => left * right,
  divide: (left, right) => {
    if (right === 0) {
      throw new Error('Cannot divide by zero.');
    }

    return left / right;
  },
  '/': (left, right) => {
    if (right === 0) {
      throw new Error('Cannot divide by zero.');
    }

    return left / right;
  },
};

function printUsage() {
  console.log('Usage: node src\\calculator.js <operation> <left> <right>');
  console.log('Operations: add (+), subtract (-), multiply (*), divide (/)');
}

function parseNumber(value, name) {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`${name} must be a valid number.`);
  }

  return parsed;
}

function main(args) {
  if (args.length !== 3) {
    printUsage();
    process.exitCode = 1;
    return;
  }

  const [operation, leftRaw, rightRaw] = args;
  const calculate = operations[operation];

  if (!calculate) {
    console.error(`Unsupported operation: ${operation}`);
    printUsage();
    process.exitCode = 1;
    return;
  }

  try {
    const left = parseNumber(leftRaw, 'Left operand');
    const right = parseNumber(rightRaw, 'Right operand');
    const result = calculate(left, right);

    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

main(process.argv.slice(2));
