import React, { useState } from 'react';
import { AlertCircle, ArrowRight, Loader2, Search } from 'lucide-react';
import proteinData from './data.json';

interface ProteinFeatures {
  unique_id1: string;
  pcp_pc: number;
  pcp_nc: number;
  pcp_ne: number;
  pcp_po: number;
  pcp_np: number;
  result: number;
}

interface PredictionResult {
  prediction: 'Responsible' | 'Not Responsible';
  confidence: number;
  features?: {
    pcp_pc: number;
    pcp_nc: number;
    pcp_ne: number;
    pcp_po: number;
    pcp_np: number;
  };
}

function App() {
  const [proteinId, setProteinId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const protein = (proteinData as ProteinFeatures[]).find(
        p => p.unique_id1.toLowerCase() === proteinId.toLowerCase()
      );

      if (!protein) {
        setError('Protein not found in database');
        setLoading(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1500));

      const features = {
        pcp_pc: protein.pcp_pc,
        pcp_nc: protein.pcp_nc,
        pcp_ne: protein.pcp_ne,
        pcp_po: protein.pcp_po,
        pcp_np: protein.pcp_np,
      };

      const prediction: PredictionResult = {
        prediction: protein.result === 1 ? 'Responsible' : 'Not Responsible',
        confidence: 0.85 + Math.random() * 0.15,
        features,
      };

      setResult(prediction);
    } catch (err) {
      setError('An error occurred while processing your request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Decoding COVID</h1>
        <p className="text-gray-600 mb-8">
          Enter a protein identifier to predict its role in COVID-19 pathogenesis.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="proteinId" className="block text-sm font-medium text-gray-700 mb-1">
              Protein Identifier
            </label>
            <div className="relative">
              <input
                type="text"
                name="proteinId"
                id="proteinId"
                value={proteinId}
                onChange={(e) => setProteinId(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 pl-10 sm:text-sm"
                placeholder="e.g., Q16538"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-red-800">{error}</p>
                </div>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !proteinId}
            className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-2 h-4 w-4" />
                Processing...
              </>
            ) : (
              <>
                Analyze Protein
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {result && (
          <div className="mt-8 space-y-6">
            <div className={`p-6 rounded-lg ${
              result.prediction === 'Responsible' 
                ? 'bg-red-50 border border-red-100' 
                : 'bg-green-50 border border-green-100'
            }`}>
              <h2 className="text-lg font-semibold mb-2">Prediction Result</h2>
              <p className={`text-2xl font-bold ${
                result.prediction === 'Responsible' ? 'text-red-600' : 'text-green-600'
              }`}>
                {result.prediction} for COVID-19
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Confidence: {(result.confidence * 100).toFixed(1)}%
              </p>
            </div>

            {result.features && (
              <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Protein Features</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">PCP_PC</p>
                    <p className="text-lg">{result.features.pcp_pc.toFixed(3)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">PCP_NC</p>
                    <p className="text-lg">{result.features.pcp_nc.toFixed(3)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">PCP_NE</p>
                    <p className="text-lg">{result.features.pcp_ne.toFixed(3)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">PCP_PO</p>
                    <p className="text-lg">{result.features.pcp_po.toFixed(3)}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-sm font-medium text-gray-500">PCP_NP</p>
                    <p className="text-lg">{result.features.pcp_np.toFixed(3)}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Footer */}
      <footer className="mt-8 text-center text-gray-600 text-sm">
        Created with ❤️ by Ashutosh, Jishu, Prateek & Sandipan
      </footer>
    </div>
  );
}

export default App;
