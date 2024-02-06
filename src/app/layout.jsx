import Nav from "@/components/Nav";
import "../styles/globals.css";
import Provider from "@/components/Provider";

export const metadata = {
  title: "Prompt Masters",
  description: "Share ChatGPT prompts across the community",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <div className="app">
            <Nav />
            {children}
          </div>
        </Provider>
      </body>
    </html>
  );
}
