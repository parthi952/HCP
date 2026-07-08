import { Outlet, useOutlet } from "react-router-dom";

export default function RootLayout() {
  const outlet = useOutlet();
  
  return (
    <div>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
