// Advanced number to words conversion with comprehensive features
export function numberToWords(num: number): string {
  if (num === 0) return "zero";
  
  const ones = [
    "", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine",
    "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
    "seventeen", "eighteen", "nineteen"
  ];
  
  const tens = [
    "", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"
  ];
  
  const scales = [
    "", "thousand", "million", "billion", "trillion", "quadrillion"
  ];
  
  function convertChunk(n: number): string {
    let result = "";
    
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + " hundred";
      n %= 100;
      if (n > 0) result += " ";
    }
    
    if (n >= 20) {
      result += tens[Math.floor(n / 10)];
      n %= 10;
      if (n > 0) result += " " + ones[n];
    } else if (n > 0) {
      result += ones[n];
    }
    
    return result;
  }
  
  if (num < 0) {
    return "negative " + numberToWords(-num);
  }
  
  const chunks = [];
  let scaleIndex = 0;
  
  while (num > 0) {
    const chunk = num % 1000;
    if (chunk > 0) {
      const chunkText = convertChunk(chunk);
      if (scaleIndex > 0) {
        chunks.unshift(chunkText + " " + scales[scaleIndex]);
      } else {
        chunks.unshift(chunkText);
      }
    }
    num = Math.floor(num / 1000);
    scaleIndex++;
  }
  
  return chunks.join(" ");
}

export function getNumberFacts(num: number) {
  const isPrime = (n: number): boolean => {
    if (n < 2) return false;
    if (n === 2) return true;
    if (n % 2 === 0) return false;
    
    for (let i = 3; i <= Math.sqrt(n); i += 2) {
      if (n % i === 0) return false;
    }
    return true;
  };
  
  const getFactors = (n: number): number[] => {
    const factors = [];
    for (let i = 1; i <= n; i++) {
      if (n % i === 0) {
        factors.push(i);
      }
    }
    return factors;
  };
  
  const factors = getFactors(num);
  const isEven = num % 2 === 0;
  const isOdd = !isEven;
  const prime = isPrime(num);
  const isComposite = factors.length > 2;
  
  return {
    isPrime: prime,
    isEven,
    isOdd,
    isComposite,
    factors,
    scientific: num.toExponential(2),
  };
}

export function getCurrencySpellings(num: number) {
  const words = numberToWords(num);
  
  return {
    USD: `${words} U.S. dollars`,
    EUR: `${words} euros`,
    GBP: `${words} British pounds`,
    CAD: `${words} Canadian dollars`,
    AUD: `${words} Australian dollars`,
    JPY: `${words} Japanese yen`,
  };
}

export function getUnitConversions(num: number) {
  const formatTime = (seconds: number): string => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    
    const parts = [];
    if (days > 0) parts.push(`${days} day${days !== 1 ? 's' : ''}`);
    if (hours > 0) parts.push(`${hours} hour${hours !== 1 ? 's' : ''}`);
    if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
    if (remainingSeconds > 0) parts.push(`${remainingSeconds} second${remainingSeconds !== 1 ? 's' : ''}`);
    
    return parts.join(', ') || '0 seconds';
  };
  
  return {
    binary: num.toString(2),
    hex: num.toString(16).toUpperCase(),
    octal: num.toString(8),
    square: num * num,
    cube: num * num * num,
    time: formatTime(num),
  };
}