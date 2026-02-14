import { FAQ } from "./FAQ";
import { RelatedCalculators } from "./RelatedCalculators";
import { getCalculadora, getRelatedCalculators, categoryColorClass } from "@/lib/calculators";

interface CalculatorFooterProps {
  href: string;
  showRelated?: boolean;
}

export function CalculatorFooter({ href, showRelated = true }: CalculatorFooterProps) {
  const calc = getCalculadora(href);
  if (!calc) return null;

  const colorClass = categoryColorClass[calc.categoria] || "indigo";
  const related = showRelated ? getRelatedCalculators(href) : [];

  return (
    <>
      {calc.faqs.length > 0 && (
        <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
          <FAQ items={calc.faqs} colorClass={colorClass} />
        </div>
      )}
      {related.length > 0 && (
        <div className="max-w-2xl mx-auto p-8 card-glass rounded-xl">
          <RelatedCalculators calculators={related} />
        </div>
      )}
    </>
  );
}
