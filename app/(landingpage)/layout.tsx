import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Header from "@/components/Hero";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <main>
      <Header/>
      {children}
      <Footer/>
    </main>
  );
}
