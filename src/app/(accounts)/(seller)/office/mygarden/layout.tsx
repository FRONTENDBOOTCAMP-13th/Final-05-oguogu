export default function MyGardenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="bg-gradient-to-b from-[#DBFCE7] to-[#BBF7D0]">{children}</div>;
}
