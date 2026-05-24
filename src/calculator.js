#!/usr/bin/env node

function addition(a, b) {
  return a + b;
}

function subtraction(a, b) {
  return a - b;
}

function multiplication(a, b) {
  return a * b;
}

function division(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero.');
  }

  return a / b;
}

function modulo(a, b) {
  if (b === 0) {
    throw new Error('Cannot take modulo by zero.');
  }

  return a % b;
}

function power(base, exponent) {
  return base ** exponent;
}

function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot take square root of a negative number.');
  }

  return Math.sqrt(n);
}

const operations = {
  addition,
  add: addition,
  '+': addition,
  subtraction,
  subtract: subtraction,
  '-': subtraction,
  multiplication,
  multiply: multiplication,
  '*': multiplication,
  division,
  divide: division,
  '/': division,
  modulo,
  mod: modulo,
  '%': modulo,
  power,
  '^': power,
  squareRoot,
  sqrt: squareRoot,
};

function parseNumber(value, name) {
  const parsed = Number(value);

  if (Number.isNaN(parsed)) {
    throw new Error(`${name} must be a valid number.`);
  }

  return parsed;
}

function printUsage() {
  console.log('Usage: node src/calculator.js <operation> <left> [right]');
  console.log('Operations:');
  console.log('  addition/add/+ <left> <right>');
  console.log('  subtraction/subtract/- <left> <right>');
  console.log('  multiplication/multiply/* <left> <right>');
  console.log('  division/divide or / <left> <right>');
  console.log('  modulo/mod/% <left> <right>');
  console.log('  power/^ <left> <right>');
  console.log('  squareRoot/sqrt <value>');
}

function main(args) {
  if (args.length < 2 || args.length > 3) {
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
    if (operation === 'squareRoot' || operation === 'sqrt') {
      const n = parseNumber(leftRaw, 'Value');
      const result = calculate(n);
      console.log(result);
      return;
    }

    if (typeof rightRaw === 'undefined') {
      throw new Error('This operation requires two numeric operands.');
    }

    const left = parseNumber(leftRaw, 'Left operand');
    const right = parseNumber(rightRaw, 'Right operand');
    const result = calculate(left, right);

    console.log(result);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main(process.argv.slice(2));
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  modulo,
  power,
  squareRoot,
  parseNumber,
  operations,
  main,
};
