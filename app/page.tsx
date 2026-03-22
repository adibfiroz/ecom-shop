import ClientOnly from "@/components/ClientOnly";
import HomeView from "@/components/home-view";

export default function App() {
  return (
    <ClientOnly>
      <HomeView />
    </ClientOnly>
  );
}
