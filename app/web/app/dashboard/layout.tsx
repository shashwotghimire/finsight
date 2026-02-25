import Navbar from "@/components/navbar/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gray-50 min-h-screen pb-3">
      <Navbar />
      <main className="mt-4">{children}</main>
    </div>
  );
}
