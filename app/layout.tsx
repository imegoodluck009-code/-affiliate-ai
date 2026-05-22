export const metadata = {
  title: 'Affiliate AI',
  description: 'AI-powered affiliate marketing platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
