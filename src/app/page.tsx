import ProfitCalculator from '@/components/calculator/profit-calculator';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-body p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <h1 className="inline-flex items-center gap-2 text-3xl md:text-4xl font-bold font-headline text-primary cursor-help">
                  Profit & Ads Calculator
                  <Info className="h-5 w-5 text-muted-foreground" />
                </h1>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">أداة تحسبلك ربحية المنتج والحملات الإعلانية، وتعاونك تاخو قرار واضح: رابح، خاسر، ولا Break-even.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Analyze your product's profitability with ease. Input your costs and ad performance to get instant insights and make smarter business decisions.
          </p>
        </header>
        <ProfitCalculator />
      </div>
    </main>
  );
}
