import Loading from "@/app/loading"
import Header from "@/components/Hero";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  
    <main>
      <Loading/>
      <Header/>
      {children}
    </main>
  );
}
