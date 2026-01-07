
"use client";

import { useState, useMemo, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { CalculatorCard } from "./calculator-card";
import { IconInput } from "./icon-input";
import { MetricDisplay } from "./metric-display";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Archive,
  Ban,
  Calculator,
  ClipboardList,
  Coins,
  DollarSign,
  FileDown,
  Landmark,
  Megaphone,
  Package,
  PackageSearch,
  ShoppingCart,
  Target,
  Truck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProfitCalculator() {
  const [product, setProduct] = useState({
    price: "", cogs: "", shipping: "", packaging: "", cod: "", other: "",
  });

  const [ads, setAds] = useState({ spend: "", purchases: "", cancels: "" });
  const [targetProfit, setTargetProfit] = useState("");
  const [isExporting, setIsExporting] = useState(false);

  const printRef = useRef<HTMLDivElement>(null);

  const num = (v: string) => Number(v) || 0;

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleAdsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAds({ ...ads, [e.target.name]: e.target.value });
  };

  const handleExportPdf = async () => {
    if (!printRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(printRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: null,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: "a4",
      });
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const canvasWidth = canvas.width;
      const canvasHeight = canvas.height;
      const ratio = canvasWidth / canvasHeight;
      const width = pdfWidth - 40;
      const height = width / ratio;
      
      let y = 20;
      if (height < pdfHeight - 40) {
        y = (pdfHeight - height) / 2;
      }

      pdf.addImage(imgData, "PNG", 20, y, width, height);
      pdf.save("profit-calculation.pdf");
    } catch (error) {
      console.error("Failed to export PDF", error);
    } finally {
      setIsExporting(false);
    }
  };


  const {
    marginBeforeAds, marginPercent, netPurchases, cpa, profitPerSale,
    totalProfit, breakEvenCPA, targetCPA, decision,
  } = useMemo(() => {
    const fixedCosts = num(product.cogs) + num(product.shipping) + num(product.packaging) + num(product.cod) + num(product.other);
    const marginBeforeAds = num(product.price) - fixedCosts;
    const marginPercent = product.price ? (marginBeforeAds / num(product.price)) * 100 : 0;
    const netPurchases = Math.max(0, num(ads.purchases) - num(ads.cancels));
    const cpa = netPurchases > 0 ? num(ads.spend) / netPurchases : 0;
    const profitPerSale = marginBeforeAds - cpa;
    const totalProfit = profitPerSale * netPurchases;
    const breakEvenCPA = marginBeforeAds;
    const targetCPA = targetProfit ? marginBeforeAds - num(targetProfit) : null;

    let decision: string;
    if (num(product.price) === 0) {
      decision = "📈 ابدأ بإدخال سعر البيع";
    } else if (netPurchases > 0) {
      if (cpa < marginBeforeAds) decision = "✅ رابح";
      else if (cpa === marginBeforeAds) decision = "⚖️ Break-even";
      else decision = "❌ خاسر";
    } else {
      if (num(ads.spend) > 0 || num(ads.purchases) > 0) {
        decision = "⚠️ أدخل عدد عمليات صالح";
      } else {
        decision = "📈 أدخل معطيات الإشهار";
      }
    }
    
    if (marginBeforeAds < 0) {
      decision = "📉 الربح قبل الإشهار بالسالب";
    }

    return { marginBeforeAds, marginPercent, netPurchases, cpa, profitPerSale, totalProfit, breakEvenCPA, targetCPA, decision };
  }, [product, ads, targetProfit]);

  const decisionStyles = useMemo(() => {
    if (decision.startsWith("✅")) return "bg-success/10 text-success";
    if (decision.startsWith("⚖️")) return "bg-warning/10 text-warning";
    if (decision.startsWith("❌") || decision.startsWith("📉") || decision.startsWith("⚠️")) return "bg-destructive/10 text-destructive";
    return "bg-muted text-muted-foreground";
  }, [decision]);

  const productFields = [
    { name: "price", label: "سعر البيع", icon: <DollarSign />, type: "number" },
    { name: "cogs", label: "تكلفة المنتج", icon: <Archive />, type: "number" },
    { name: "shipping", label: "التوصيل", icon: <Truck />, type: "number" },
    { name: "packaging", label: "التغليف", icon: <Package />, type: "number" },
    { name: "cod", label: "COD fee", icon: <Landmark />, type: "number" },
    { name: "other", label: "مصاريف أخرى", icon: <ClipboardList />, type: "number" },
  ];

  const adFields = [
    { name: "spend", label: "Ad Spend", icon: <Coins />, type: "number" },
    { name: "purchases", label: "عدد العمليات", icon: <ShoppingCart />, type: "number" },
    { name: "cancels", label: "الـ Cancel (اختياري)", icon: <Ban />, type: "number" },
  ];

  return (
    <>
      <div ref={printRef} className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <CalculatorCard title="1️⃣ معطيات المنتج" icon={<PackageSearch />}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {productFields.map((field) => (
                <IconInput
                  key={field.name}
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  icon={field.icon}
                  type={field.type}
                  placeholder="0.00"
                  value={product[field.name as keyof typeof product]}
                  onChange={handleProductChange}
                />
              ))}
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <MetricDisplay label="Margin قبل Ads" value={marginBeforeAds.toFixed(2)} />
              <MetricDisplay label="هامش الربح %" value={`${marginPercent.toFixed(2)}%`} />
              {marginBeforeAds < 0 && <p className="text-destructive text-xs px-3">⚠️ الربح قبل الإشهار بالسالب</p>}
            </div>
          </div>
        </CalculatorCard>

        <CalculatorCard title="2️⃣ معطيات الإشهار" icon={<Megaphone />}>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {adFields.map((field) => (
                <IconInput
                  key={field.name}
                  id={field.name}
                  name={field.name}
                  label={field.label}
                  icon={field.icon}
                  type={field.type}
                  placeholder="0"
                  value={ads[field.name as keyof typeof ads]}
                  onChange={handleAdsChange}
                  className={field.name === 'spend' ? 'sm:col-span-2' : ''}
                />
              ))}
            </div>
            <Separator />
            <div className="space-y-2 text-sm">
              <MetricDisplay label="Net Purchases" value={netPurchases.toString()} />
              <MetricDisplay label="CPA (Cost Per Action)" value={cpa.toFixed(2)} />
            </div>
          </div>
        </CalculatorCard>

        <CalculatorCard title="3️⃣ القرار والربح" icon={<Calculator />}>
          <div className="space-y-4">
            <IconInput
                id="targetProfit"
                name="targetProfit"
                label="هدف الربح في البيعة"
                icon={<Target />}
                type="number"
                placeholder="0.00"
                value={targetProfit}
                onChange={(e) => setTargetProfit(e.target.value)}
              />
            <Separator />
            <div className="space-y-2">
              <MetricDisplay label="الربح الصافي في البيعة" value={profitPerSale.toFixed(2)} />
              <MetricDisplay label="الربح الصافي الكلّي" value={totalProfit.toFixed(2)} valueClassName="text-2xl" />
              <MetricDisplay label="Break-even CPA" value={breakEvenCPA.toFixed(2)} />
              {targetCPA !== null && <MetricDisplay label="Target CPA" value={targetCPA.toFixed(2)} />}
            </div>
            <div className={cn("mt-4 p-4 rounded-lg font-bold text-center text-lg transition-all duration-300", decisionStyles)}>
              {decision}
            </div>
          </div>
        </CalculatorCard>
      </div>
      <div className="mt-6 text-center">
        <Button onClick={handleExportPdf} disabled={isExporting}>
          <FileDown className="mr-2 h-4 w-4" />
          {isExporting ? "Exporting..." : "Export PDF"}
        </Button>
      </div>
    </>
  );
}
