import { numberToWords, getNumberFacts, getCurrencySpellings, getUnitConversions } from '@/lib/number-converter';
import NumberPageClient from './components/NumberPageClient';

export async function generateStaticParams() {
  // Generate static params for common numbers
  const commonNumbers = [
    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10',
    '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '25', '30', '40', '50', '60', '70', '80', '90', '100',
    '200', '300', '400', '500', '600', '700', '800', '900', '1000',
    '2000', '3000', '4000', '5000', '10000', '100000', '1000000'
  ];

  return commonNumbers.map((num) => ({
    slug: `${num}-in-words`
  }));
}

export default async function NumberPage({ params }: { params: { slug: string } }) {
  const numberMatch = params.slug.match(/^(\d+)/);
  
  if (!numberMatch) {
    return <div>Invalid number format</div>;
  }

  const num = numberMatch[1];
  const numValue = Number(num);
  
  if (isNaN(numValue)) {
    return <div>Invalid number</div>;
  }

  // Server-side data fetching
  const words = numberToWords(numValue);
  const facts = getNumberFacts(numValue);
  const currencies = getCurrencySpellings(numValue);
  const conversions = getUnitConversions(numValue);
  
  const result = {
    number: numValue,
    words,
    facts,
    currencies,
    conversions
  };

  return <NumberPageClient initialResult={result} initialNumber={num} />;
}