import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html style={{ 'backgroundColor': '#053e78', 'scrollbarGutter': 'stable' }}>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}