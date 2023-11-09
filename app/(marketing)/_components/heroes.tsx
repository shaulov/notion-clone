import Image from "next/image";

export function Heroes() {
  return (
    <section className="grid item-center justify-center max-w-5xl">
      <h2 className="sr-only">Heroes images</h2>
      <ul className="flex items-center">
        <li className="relative w-[300px] h-[300px] sm:w-[350px]">
          <Image
            className="dark:hidden object-contain"
            src="/promo/documents.png"
            sizes="(min-width: 640px) 350px, 400px"
            fill
            alt="A man catches papers"
            priority
          />
          <Image
            className="hidden dark:block object-contain"
            src="/promo/documents-dark.png"
            sizes="(min-width: 640px) 350px, 400px"
            fill
            alt="A man catches papers"
            priority
          />
        </li>
        <li className="relative hidden md:block w-[400px] h-[400px]">
          <Image
            className="dark:hidden object-contain"
            src="/promo/reading.png"
            sizes="400px"
            fill
            alt="A woman sits on a chair and reads books"
            priority
          />
          <Image
            className="hidden dark:block object-contain"
            src="/promo/reading-dark.png"
            sizes="400px"
            fill
            alt="A woman sits on a chair and reads books"
            priority
          />
        </li>
      </ul>
    </section>
  );
}