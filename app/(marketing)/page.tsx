import { Promo } from "./_components/promo";
import { Heroes } from "./_components/heroes";
import { Footer } from "./_components/footer";

export default function MarketingPage() {
  return (
    <>
      <main className="flex flex-col min-h-full pt-40 dark:bg-[#1F1F1F]">
        <div className="flex flex-col items-center justify-center md:justify-start gap-y-8 flex-1 px-6 pb-10 text-center">
          <Promo />
          <Heroes />
        </div>
      </main>
      <Footer />
    </>
  );
}
