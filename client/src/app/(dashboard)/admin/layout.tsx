import AdminSidebar from "@/components/admin/AdminSideBar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="mx-auto mt-[70px] relative min-h-screen max-w-[1280px] flex justify-center align-middle">
    <AdminSidebar
    />
    {children}
  </div>;
}
