import Document, { Head, Html, Main, NextScript } from 'next/document'

export default class MyDocument extends Document { 
  render(){
    return(
      <Html>
        <Head title="Carpe Diem">
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" key="viewport" />
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet"/>
        </Head>

        <body>
          <Main/>
          <NextScript/>
        </body>
      </Html>
    )
  }
}