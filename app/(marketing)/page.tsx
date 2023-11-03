import { Promo } from "./_components/promo";

export default function MarketingPage() {
  return (
    <main className="flex flex-col min-h-full">
      <div className="flex flex-col items-center justify-center md:justify-start gap-y-8 flex-1 px-6 pb-10 text-center">
        <Promo />
      </div>
    </main>
  );
}
