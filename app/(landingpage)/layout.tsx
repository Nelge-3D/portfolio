import Footer from "@/components/Footer";
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
