import { useState } from 'react';

/**
 * Custom hook for FizzBuzz algorithm implementation
 * Returns a function to check FizzBuzz logic and the current result
 */
export default function UseAlgo() {
  // State to store the current FizzBuzz result
  const [result, setResult] = useState<number | string>();

  /**
   * Checks if a number follows FizzBuzz rules:
   * - Divisible by both 3 and 5: returns 'FizzBuzz'
   * - Divisible by 3 only: returns 'Fizz'
   * - Divisible by 5 only: returns 'Buzz'
   * - Otherwise: returns the number itself
   * @param n - The number to check
   */
  const handleCheckFizzbuzz = (n: number) => {
    const isDivisibleBy3 = n % 3 === 0;
    const isDivisibleBy5 = n % 5 === 0;

    // Apply FizzBuzz logic with early returns for better performance
    if (isDivisibleBy3 && isDivisibleBy5) {
      setResult('FizzBuzz');
    } else if (isDivisibleBy3) {
      setResult('Fizz');
    } else if (isDivisibleBy5) {
      setResult('Buzz');
    } else {
      setResult(n);
    }
  };

  return {
    handleCheckFizzbuzz,
    result,
  };
}
