import Image from "next/image";

export function Heroes() {
  return (
    <section className="grid item-center justify-center max-w-5xl">
      <ul className="flex items-center">
        <li className="relative w-[300px] h-[300px] sm:w-[350px]">
          <Image className="object-contain" src="/promo/documents.png" fill alt="A man catches papers" />
        </li>
        <li className="relative hidden md:block w-[400px] h-[400px]">
          <Image className="object-contain" src="/promo/reading.png" fill alt="A woman sits on a chair and reads books" />
        </li>
      </ul>
    </section>
  );
}