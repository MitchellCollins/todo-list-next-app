export const metadata = {
  title: "Todo List",
  description: "A app that operates as a todo list.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
