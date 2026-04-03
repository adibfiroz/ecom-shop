import ClientOnly from "@/components/ClientOnly";
import HomeView from "@/components/home-view";
import Login from "@/components/login";

export default function App() {
  return (
    <ClientOnly>
      <Login />
      {/* <HomeView /> */}
    </ClientOnly>
  );
}
