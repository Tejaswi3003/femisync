import Sidebar from "./Sidebar";

function AppLayout({ children }: any) {
  return (
    <div className="flex min-h-screen bg-[#f6f4fb]">

      <Sidebar />

      <main className="flex-1 p-10 overflow-y-auto">
        {children}
      </main>

    </div>
  );
}

export default AppLayout;