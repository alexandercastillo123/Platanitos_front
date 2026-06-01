import Header from './_components/header'

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <Header/>
      <main className='flex min-h-auto w-full justify-center p-2 mb-8'>
        {children}
      </main>
    </>
  );
}
