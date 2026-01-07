import ProfitCalculator from '@/components/calculator/profit-calculator';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground font-body p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary">
            Profit & Ads Calculator
          </h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Analyze your product's profitability with ease. Input your costs and ad performance to get instant insights and make smarter business decisions.
          </p>
        </header>
        <ProfitCalculator />
      </div>
    </main>
  );
}
