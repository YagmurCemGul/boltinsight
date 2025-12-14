'use client';

import { useState } from 'react';
import { ClipboardCheck, Loader2, AlertCircle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button, Input, Select, Textarea, Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/ui';

const METHODOLOGY_OPTIONS = [
  { value: 'online_survey', label: 'Online Survey (CAWI)' },
  { value: 'cati', label: 'Telephone (CATI)' },
  { value: 'f2f', label: 'Face-to-Face (CAPI)' },
  { value: 'mobile', label: 'Mobile Survey' },
  { value: 'qual_idi', label: 'Qualitative - IDIs' },
  { value: 'qual_focus', label: 'Qualitative - Focus Groups' },
];

const MARKET_OPTIONS = [
  { value: 'USA', label: 'United States' },
  { value: 'UK', label: 'United Kingdom' },
  { value: 'Germany', label: 'Germany' },
  { value: 'France', label: 'France' },
  { value: 'Japan', label: 'Japan' },
  { value: 'Brazil', label: 'Brazil' },
  { value: 'India', label: 'India' },
  { value: 'China', label: 'China' },
];

interface FeasibilityResult {
  feasible: boolean;
  incidenceRate: number;
  estimatedTimeline: string;
  estimatedCost: number;
  confidence: 'high' | 'medium' | 'low';
  risks: string[];
  recommendations: string[];
}

export function FeasibilityCheck() {
  const [market, setMarket] = useState('');
  const [methodology, setMethodology] = useState('');
  const [sampleSize, setSampleSize] = useState('');
  const [targetAudience, setTargetAudience] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<FeasibilityResult | null>(null);

  const checkFeasibility = () => {
    if (!market || !methodology || !sampleSize || !targetAudience) return;

    setIsChecking(true);

    // Simulate API call
    setTimeout(() => {
      // Generate mock result based on inputs
      const sample = parseInt(sampleSize);
      const isB2B = targetAudience.toLowerCase().includes('b2b') || targetAudience.toLowerCase().includes('business');
      const isNiche = targetAudience.toLowerCase().includes('specific') || targetAudience.toLowerCase().includes('rare');

      let incidenceRate = 50;
      if (isB2B) incidenceRate = 15;
      if (isNiche) incidenceRate = 5;

      const daysPerHundred = methodology.includes('qual') ? 14 :
                            methodology === 'f2f' ? 7 :
                            methodology === 'cati' ? 5 : 2;
      const estimatedDays = Math.ceil((sample / 100) * daysPerHundred * (50 / incidenceRate));

      const baseCostPerComplete = methodology.includes('qual') ? 150 :
                                   methodology === 'f2f' ? 25 :
                                   methodology === 'cati' ? 15 : 5;
      const estimatedCost = Math.round(sample * baseCostPerComplete * (50 / incidenceRate));

      const feasible = incidenceRate > 3 && estimatedDays < 60;
      const confidence = incidenceRate > 30 ? 'high' : incidenceRate > 10 ? 'medium' : 'low';

      const risks: string[] = [];
      const recommendations: string[] = [];

      if (incidenceRate < 10) {
        risks.push('Low incidence rate may extend fieldwork timeline');
        recommendations.push('Consider broadening target definition');
      }
      if (sample > 1000 && methodology === 'f2f') {
        risks.push('Large F2F sample may require multiple field agencies');
        recommendations.push('Consider phased fieldwork approach');
      }
      if (isB2B) {
        risks.push('B2B audiences typically harder to reach');
        recommendations.push('Allow extra time for recruitment');
        recommendations.push('Consider incentive optimization');
      }

      if (feasible) {
        recommendations.push('Include 10-15% oversample for quality control');
      }

      setResult({
        feasible,
        incidenceRate,
        estimatedTimeline: `${estimatedDays} days`,
        estimatedCost,
        confidence,
        risks,
        recommendations,
      });

      setIsChecking(false);
    }, 2000);
  };

  const reset = () => {
    setMarket('');
    setMethodology('');
    setSampleSize('');
    setTargetAudience('');
    setResult(null);
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto max-w-2xl p-6">
        <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Feasibility Check
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-6 text-sm text-gray-600">
            Get a quick assessment of your research feasibility including estimated incidence rate,
            timeline, and cost projections.
          </p>

          <div className="space-y-4">
            {/* Market */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Market <span className="text-red-500">*</span>
              </label>
              <Select
                options={MARKET_OPTIONS}
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                placeholder="Select market"
              />
            </div>

            {/* Methodology */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Methodology <span className="text-red-500">*</span>
              </label>
              <Select
                options={METHODOLOGY_OPTIONS}
                value={methodology}
                onChange={(e) => setMethodology(e.target.value)}
                placeholder="Select methodology"
              />
            </div>

            {/* Sample Size */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Sample Size <span className="text-red-500">*</span>
              </label>
              <Input
                type="number"
                value={sampleSize}
                onChange={(e) => setSampleSize(e.target.value)}
                placeholder="e.g., 500"
                min="1"
              />
            </div>

            {/* Target Audience */}
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Target Audience Description <span className="text-red-500">*</span>
              </label>
              <Textarea
                value={targetAudience}
                onChange={(e) => setTargetAudience(e.target.value)}
                placeholder="e.g., Adults 25-54, primary grocery shoppers, purchased soft drinks in past month..."
                className="min-h-[100px]"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 pt-2">
              <Button
                onClick={checkFeasibility}
                disabled={isChecking || !market || !methodology || !sampleSize || !targetAudience}
                className="flex-1"
              >
                {isChecking ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Checking...
                  </>
                ) : (
                  <>
                    <ClipboardCheck className="mr-2 h-4 w-4" />
                    Check Feasibility
                  </>
                )}
              </Button>
              <Button variant="outline" onClick={reset}>
                Reset
              </Button>
            </div>
          </div>

          {/* Results */}
          {result && (
            <div className="mt-6 space-y-4">
              {/* Feasibility Status */}
              <div
                className={cn(
                  'flex items-center gap-3 rounded-lg p-4',
                  result.feasible ? 'bg-green-50' : 'bg-red-50'
                )}
              >
                {result.feasible ? (
                  <CheckCircle className="h-6 w-6 text-green-600" />
                ) : (
                  <AlertCircle className="h-6 w-6 text-red-600" />
                )}
                <div>
                  <p className={cn('font-medium', result.feasible ? 'text-green-900' : 'text-red-900')}>
                    {result.feasible ? 'Feasible' : 'Potential Challenges'}
                  </p>
                  <p className={cn('text-sm', result.feasible ? 'text-green-700' : 'text-red-700')}>
                    Confidence: {result.confidence.charAt(0).toUpperCase() + result.confidence.slice(1)}
                  </p>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4 text-center">
                  <p className="text-sm text-gray-500">Incidence Rate</p>
                  <p className="text-2xl font-bold text-gray-900">{result.incidenceRate}%</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <Clock className="mx-auto mb-1 h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-500">Est. Timeline</p>
                  <p className="text-lg font-semibold text-gray-900">{result.estimatedTimeline}</p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <DollarSign className="mx-auto mb-1 h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-500">Est. Cost</p>
                  <p className="text-lg font-semibold text-gray-900">
                    ${result.estimatedCost.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Risks */}
              {result.risks.length > 0 && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                  <h4 className="mb-2 font-medium text-amber-900">Potential Risks</h4>
                  <ul className="space-y-1">
                    {result.risks.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-amber-800">
                        <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        {risk}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <h4 className="mb-2 font-medium text-blue-900">Recommendations</h4>
                  <ul className="space-y-1">
                    {result.recommendations.map((rec, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-blue-800">
                        <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
