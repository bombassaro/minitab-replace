import React from 'react'
import App from 'next/app'
import Head from 'next/head'
import '../components/Styles/styles.css'

export default class MyApp extends App {
  render() {
    const {Component, pageProps} = this.props
    return (
      <React.Fragment>
        <Head>
          <meta charSet='utf-8'/>
          <meta httpEquiv='x-ua-compatible' content='ie=edge'/>
          <meta name='description' content='XPROG'/>
          <meta name='theme-color' content='#317EFB'/>
          {/* <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no'/> */}
          <link rel='apple-touch-icon' href='/static/images/icons-192.png'/>
          <link rel='icon' sizes='192x192' href='/static/images/icons-192.png'/>
          <link rel='manifest' href='/static/manifest.json'/>
          <link rel='shortcut icon' href='/static/images/favicon.ico'/>
          <title>XPROG</title>
        </Head>
        <Component {...this.props} />
      </React.Fragment>
    )
  }
}
