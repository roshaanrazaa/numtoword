'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Share2, Twitter, Facebook, Linkedin, Mail, Search, Clock, Calculator, Hash, Ruler } from 'lucide-react';
import { numberToWords, getNumberFacts, getCurrencySpellings, getUnitConversions } from '@/lib/number-converter';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState<any>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem('recentlyViewed');
    if (stored) {
      setRecentlyViewed(JSON.parse(stored));
    }
  }, []);

  const handleConvert = async () => {
    if (!number || isNaN(Number(number))) return;
    
    setLoading(true);
    try {
      const numValue = Number(number);
      const words = numberToWords(numValue);
      const facts = getNumberFacts(numValue);
      const currencies = getCurrencySpellings(numValue);
      const conversions = getUnitConversions(numValue);
      
      const newResult = {
        number: numValue,
        words,
        facts,
        currencies,
        conversions
      };
      
      setResult(newResult);
      
      // Update recently viewed
      const updated = [number, ...recentlyViewed.filter(n => n !== number)].slice(0, 10);
      setRecentlyViewed(updated);
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      
      // Navigate to dynamic page
      router.push(`/${number}-in-words`);
    } catch (error) {
      console.error('Conversion error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = result ? `${result.number} in words: ${result.words}` : 'Convert numbers to words';
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      email: `mailto:?subject=Number to Words&body=${encodeURIComponent(text + ' - ' + url)}`
    };
    
    window.open(shareUrls[platform as keyof typeof shareUrls], '_blank');
  };

  const otherNumbers = [
    '100', '1000', '10000', '100000', '1000000',
    '123', '456', '789', '2024', '12345'
  ];

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
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Home</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Tools</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">Blog</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Free Number to Word Converter
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Instantly convert any number to English words with our free online tool. 
            Perfect for writing checks, legal documents, or educational purposes.
          </p>
        </div>

        {/* Main Conversion Tool */}
        <Card className="mb-12 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Enter a Number</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <Input
                type="number"
                placeholder="Enter a number (e.g., 12345)"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                className="flex-1 text-lg p-6"
                onKeyPress={(e) => e.key === 'Enter' && handleConvert()}
              />
              <Button 
                onClick={handleConvert}
                disabled={loading || !number}
                className="px-8 py-6 text-lg bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Converting...' : (
                  <>
                    <Search className="w-5 h-5 mr-2" />
                    Convert
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Result Display */}
        {result && (
          <Card className="mb-12 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {result.number} in English Words
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-6 p-6 bg-blue-50 rounded-lg">
                  "{result.words}"
                </div>
                
                {/* Share Buttons */}
                <div className="flex justify-center space-x-4 mb-8">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('twitter')}
                    className="flex items-center space-x-2"
                  >
                    <Twitter className="w-4 h-4" />
                    <span>Tweet</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('facebook')}
                    className="flex items-center space-x-2"
                  >
                    <Facebook className="w-4 h-4" />
                    <span>Share</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('linkedin')}
                    className="flex items-center space-x-2"
                  >
                    <Linkedin className="w-4 h-4" />
                    <span>Share</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleShare('email')}
                    className="flex items-center space-x-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email</span>
                  </Button>
                </div>

                {/* Number Facts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Currency Spellings */}
                  <Card className="border-emerald-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Calculator className="w-5 h-5 mr-2 text-emerald-600" />
                        Currency Spellings
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {Object.entries(result.currencies).map(([currency, spelling]) => (
                          <div key={currency} className="p-2 bg-emerald-50 rounded">
                            <span className="font-medium">{currency}:</span>
                            <div className="text-sm text-emerald-700">{spelling}</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Mathematical Properties */}
                  <Card className="border-blue-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Hash className="w-5 h-5 mr-2 text-blue-600" />
                        Mathematical Properties
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Prime:</span>
                          <Badge variant={result.facts.isPrime ? "default" : "secondary"}>
                            {result.facts.isPrime ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Even:</span>
                          <Badge variant={result.facts.isEven ? "default" : "secondary"}>
                            {result.facts.isEven ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Composite:</span>
                          <Badge variant={result.facts.isComposite ? "default" : "secondary"}>
                            {result.facts.isComposite ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Factors:</span> {result.facts.factors.join(', ')}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Scientific:</span> {result.facts.scientific}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Unit Conversions */}
                  <Card className="border-purple-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg flex items-center">
                        <Ruler className="w-5 h-5 mr-2 text-purple-600" />
                        Unit Conversions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Binary:</span> {result.conversions.binary}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Hexadecimal:</span> {result.conversions.hex}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Octal:</span> {result.conversions.octal}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Square:</span> {result.conversions.square}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Cube:</span> {result.conversions.cube}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                Recently Viewed Numbers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {recentlyViewed.map((num) => (
                  <Button
                    key={num}
                    variant="outline"
                    onClick={() => {
                      setNumber(num);
                      handleConvert();
                    }}
                    className="hover:bg-blue-50 hover:border-blue-300"
                  >
                    {num}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Other Numbers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Other Popular Numbers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {otherNumbers.map((num) => (
                <Button
                  key={num}
                  variant="outline"
                  onClick={() => {
                    setNumber(num);
                    handleConvert();
                  }}
                  className="hover:bg-emerald-50 hover:border-emerald-300"
                >
                  {num}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
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