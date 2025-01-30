import React from 'react'
import '@mantine/core/styles.css'
import '@mantine/carousel/styles.css'

import { ColorSchemeScript, MantineProvider, mantineHtmlProps } from '@mantine/core'
import { theme } from '@/theme'
import './Global.css'
import Footer from '@components/Footer/Footer'
import BackToTop from '@components/BackToTop/BackToTop'

export const metadata = {
  description:
    'I am a developer who enjoys creative problem-solving through programming. See a showcase and collection of my professional work and personal projects in Web Development, Game Development, and more!',
  title: 'Timothy Wu | Developer Portfolio',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <ColorSchemeScript />
      </head>
      <body>
        <MantineProvider theme={theme}>
          {children}
          <Footer />
          <BackToTop />
        </MantineProvider>
      </body>
    </html>
  )
}
