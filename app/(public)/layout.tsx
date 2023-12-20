export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <main className="min-h-full dark:bg-[#1F1F1F]">{children}</main>;
}
