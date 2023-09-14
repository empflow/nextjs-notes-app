import Main from "../../components/Main";
import Footer from "../../components/Footer";
import Header from "../../components/Header/Header";
import NetworkStatusListener from "@/app/components/NetworkStatusListener";

interface MainLayoutContext {
  children: React.ReactNode;
  params: {
    locale: string;
  };
}

export default async function MainLayout({ children }: MainLayoutContext) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
      <NetworkStatusListener />
    </>
  );
}
