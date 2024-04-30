import Document, { Head, Html, Main, NextScript } from "next/document";
import Header from "../components/Header";
import Footer from "../components/Footer";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="es">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Alojamientos en Villa Carlos Paz con Pileta. Perla Serrana"
          />
          <meta property="og:site_name" content="www.perlaserrana.com" />
          <meta
            property="og:description"
            content="Alojamientos en Villa Carlos Paz con Pileta. Perla Serrana"
          />
          <meta
            property="og:title"
            content="Alojamientos en Villa Carlos Paz con Pileta. Perla Serrana"
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta
            name="twitter:title"
            content="Alojamientos en Villa Carlos Paz con Pileta. Perla Serrana"
          />
          <meta
            name="twitter:description"
            content="Alojamientos en Villa Carlos Paz con Pileta. Perla Serrana"
          />
          <meta
            property="og:image"
            content="https://www.perlaserrana.com.ar/og-image.png"
          />
          <meta
            name="twitter:image"
            content="https://www.perlaserrana.com.ar/og-image.png"
          />
        </Head>
        <body className="antialiased">
          <Header />
          <Main />
          {/*<Footer />*/}
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
