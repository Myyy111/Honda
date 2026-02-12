import { AdminSidebar } from "@/components/admin-sidebar";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex bg-slate-50 min-h-screen">
            <AdminSidebar />
            <main className="ml-64 flex-grow p-8">
                {children}
            </main>
        </div>
    );
}
