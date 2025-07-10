'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Share2, Twitter, Facebook, Linkedin, Mail, Search, Calculator, Hash, Ruler, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface NumberPageClientProps {
  initialResult: any;
  initialNumber: string;
}

export default function NumberPageClient({ initialResult, initialNumber }: NumberPageClientProps) {
  const router = useRouter();
  const [number, setNumber] = useState(initialNumber);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }

    // Add current number to recently viewed
    if (initialNumber) {
      const updated = [initialNumber, ...recentlyViewed.filter(n => n !== initialNumber)].slice(0, 10);
      setRecentlyViewed(updated);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
    }
  }, [initialNumber]);

  const handleNewConversion = () => {
    if (!number || isNaN(Number(number))) return;
    router.push(`/${number}-in-words`);
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = initialResult ? `${initialResult.number} in words: ${initialResult.words}` : 'Convert numbers to words';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=Number to Words&body=${encodeURIComponent(text + ' - ' + url)}`
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  const otherNumbers = initialResult ? [
    String(initialResult.number - 2),
    String(initialResult.number - 1),
    String(initialResult.number + 1),
    String(initialResult.number + 2),
    String(initialResult.number + 10),
    String(initialResult.number + 100),
    String(initialResult.number * 2),
    String(initialResult.number * 10),
  ] : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">NumToWord.ai</h1>
            </div>
            <nav className="flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Tools</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link href="/" className="hover:text-blue-600">Home</Link>
          <span>/</span>
          <span className="text-gray-900">
            How to Write, Spell, Say {initialResult?.number} in English Words
          </span>
        </div>

        {/* Back Button */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" className="flex items-center space-x-2">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Converter</span>
            </Button>
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            How to Write {initialResult?.number} in English Words
          </h1>
          <p className="text-xl text-gray-600">
            Complete guide to writing, spelling, and using the number {initialResult?.number}
          </p>
        </div>

        {/* Main Result */}
        {initialResult && (
          <Card className="mb-8 shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 mb-4">
                  {initialResult.number}
                </div>
                <div className="text-2xl font-semibold text-gray-700 mb-6 p-4 bg-blue-50 rounded-lg">
                  "{initialResult.words}"
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Search for Another Number */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Search for Another Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="number"
                placeholder="Enter a number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleNewConversion()}
              />
              <Button onClick={handleNewConversion} className="bg-blue-600 hover:bg-blue-700">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Share Buttons */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Share This Result</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button
                variant="outline"
                onClick={() => handleShare('twitter')}
                className="flex items-center space-x-2"
              >
                <Twitter className="w-4 h-4" />
                <span>Tweet</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleShare('facebook')}
                className="flex items-center space-x-2"
              >
                <Facebook className="w-4 h-4" />
                <span>Share</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleShare('linkedin')}
                className="flex items-center space-x-2"
              >
                <Linkedin className="w-4 h-4" />
                <span>Share</span>
              </Button>
              <Button
                variant="outline"
                onClick={() => handleShare('email')}
                className="flex items-center space-x-2"
              >
                <Mail className="w-4 h-4" />
                <span>Email</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information */}
        {initialResult && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Facts About the Number {initialResult.number}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="currency">
                  <AccordionTrigger>How to Write {initialResult.number} in Currency Spelling?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      {Object.entries(initialResult.currencies).map(([currency, spelling]) => (
                        <div key={currency} className="p-3 bg-emerald-50 rounded-lg">
                          <div className="font-medium text-emerald-800">{currency}</div>
                          <div className="text-emerald-700">{spelling}</div>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="prime">
                  <AccordionTrigger>Is {initialResult.number} a Prime Number?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant={initialResult.facts.isPrime ? "default" : "secondary"}>
                          {initialResult.facts.isPrime ? 'Prime' : 'Not Prime'}
                        </Badge>
                      </div>
                      <p className="text-gray-700">
                        {initialResult.facts.isPrime 
                          ? `${initialResult.number} is a prime number because it has no positive divisors other than 1 and itself.`
                          : `${initialResult.number} is not a prime number because it has divisors other than 1 and itself.`
                        }
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="factors">
                  <AccordionTrigger>Prime Factors of {initialResult.number}</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {initialResult.facts.factors.map((factor: number) => (
                          <Badge key={factor} variant="outline">{factor}</Badge>
                        ))}
                      </div>
                      <p className="text-gray-700">
                        The factors of {initialResult.number} are: {initialResult.facts.factors.join(', ')}
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="composite">
                  <AccordionTrigger>Is {initialResult.number} a Composite Number?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <Badge variant={initialResult.facts.isComposite ? "default" : "secondary"}>
                        {initialResult.facts.isComposite ? 'Composite' : 'Not Composite'}
                      </Badge>
                      <p className="text-gray-700">
                        {initialResult.facts.isComposite 
                          ? `${initialResult.number} is a composite number because it has more than two factors.`
                          : `${initialResult.number} is not a composite number.`
                        }
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="even-odd">
                  <AccordionTrigger>Is {initialResult.number} Even or Odd?</AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3">
                      <Badge variant={initialResult.facts.isEven ? "default" : "secondary"}>
                        {initialResult.facts.isEven ? 'Even' : 'Odd'}
                      </Badge>
                      <p className="text-gray-700">
                        {initialResult.facts.isEven 
                          ? `${initialResult.number} is an even number because it is divisible by 2.`
                          : `${initialResult.number} is an odd number because it is not divisible by 2.`
                        }
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="scientific">
                  <AccordionTrigger>Scientific Notation of {initialResult.number}</AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <div className="text-xl font-mono">{initialResult.facts.scientific}</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="squares">
                  <AccordionTrigger>Squares and Roots of {initialResult.number}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-blue-50 rounded-lg">
                        <div className="font-medium text-blue-800">Square</div>
                        <div className="text-xl font-mono text-blue-700">{initialResult.conversions.square}</div>
                      </div>
                      <div className="p-3 bg-purple-50 rounded-lg">
                        <div className="font-medium text-purple-800">Cube</div>
                        <div className="text-xl font-mono text-purple-700">{initialResult.conversions.cube}</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="time">
                  <AccordionTrigger>{initialResult.number} Seconds Converted to Time</AccordionTrigger>
                  <AccordionContent>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <div className="text-lg font-mono text-yellow-700">{initialResult.conversions.time}</div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="bases">
                  <AccordionTrigger>Number Bases of {initialResult.number}</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-3 bg-green-50 rounded-lg">
                        <div className="font-medium text-green-800">Binary</div>
                        <div className="text-lg font-mono text-green-700">{initialResult.conversions.binary}</div>
                      </div>
                      <div className="p-3 bg-red-50 rounded-lg">
                        <div className="font-medium text-red-800">Hexadecimal</div>
                        <div className="text-lg font-mono text-red-700">{initialResult.conversions.hex}</div>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <div className="font-medium text-indigo-800">Octal</div>
                        <div className="text-lg font-mono text-indigo-700">{initialResult.conversions.octal}</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="length">
                  <AccordionTrigger>Length Conversions</AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 bg-teal-50 rounded-lg">
                        <div className="font-medium text-teal-800">Centimeters</div>
                        <div className="text-lg font-mono text-teal-700">{initialResult.number} cm</div>
                      </div>
                      <div className="p-3 bg-cyan-50 rounded-lg">
                        <div className="font-medium text-cyan-800">Meters</div>
                        <div className="text-lg font-mono text-cyan-700">{initialResult.number / 100} m</div>
                      </div>
                      <div className="p-3 bg-orange-50 rounded-lg">
                        <div className="font-medium text-orange-800">Inches</div>
                        <div className="text-lg font-mono text-orange-700">{(initialResult.number / 2.54).toFixed(2)} in</div>
                      </div>
                      <div className="p-3 bg-pink-50 rounded-lg">
                        <div className="font-medium text-pink-800">Feet</div>
                        <div className="text-lg font-mono text-pink-700">{(initialResult.number / 30.48).toFixed(2)} ft</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recently Viewed Numbers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {recentlyViewed.map((num) => (
                  <Link key={num} href={`/${num}-in-words`}>
                    <Button variant="outline" className="hover:bg-blue-50 hover:border-blue-300">
                      {num}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other Numbers */}
        {otherNumbers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Other Numbers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {otherNumbers.map((num) => (
                  <Link key={num} href={`/${num}-in-words`}>
                    <Button variant="outline" className="w-full hover:bg-emerald-50 hover:border-emerald-300">
                      {num}
                    </Button>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Calculator className="h-6 w-6" />
                <span className="text-xl font-bold">NumToWord.ai</span>
              </div>
              <p className="text-gray-400">
                The ultimate tool for converting numbers to words with comprehensive number analysis.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Tools</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Number Converter</a></li>
                <li><a href="#" className="hover:text-white">Currency Converter</a></li>
                <li><a href="#" className="hover:text-white">Unit Calculator</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">API</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 NumToWord.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}