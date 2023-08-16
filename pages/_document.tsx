import Document, { Head, Html, Main, NextScript } from 'next/document'
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="description"
            content="Casa completa en Villa Carlos Paz · 20 personas · 4 dormitorios · 3 baños."
          />
          <meta property="og:site_name" content="www.perlaserrana.com" />
          <meta
            property="og:description"
            content="Casa en Centro de Carlos Paz con Pileta. Perla Serrana"
          />
          <meta property="og:title" content="Casa en Centro de Carlos Paz con Pileta. Perla Serrana" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="Casa en Centro de Carlos Paz con Pileta. Perla Serrana" />
          <meta
            name="twitter:description"
            content="Casa en Centro de Carlos Paz con Pileta. Perla Serrana"
          />
        </Head>
        
        <body className="antialiased">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
