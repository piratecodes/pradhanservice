import { Geist, Geist_Mono, Montserrat, Montserrat_Alternates } from "next/font/google";
import Script from 'next/script';
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from 'react-hot-toast';
import "@/style/globals.css";

//Header & footer Files to add in layout.jsx
import Nav from "@/componant/nav";
import Footer from "@/componant/footer";

const montserrat = Montserrat({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata = {
  title: {
    template: "%s | Pradhan Service",
    default: "Pradhan Service",
  },
  description: "A modern twist on a beloved classic. Our Chocolate Hazelnut Baklava features layers of crispy phyllo, a fragrant blend of cinnamon and walnuts, all enveloped",
  canonical: "https://staging.pradhanservice.com/",
  sitename: "Yia Yia's Baklava",
  openGraph: {
    url: 'https://staging.pradhanservice.com',
    title: "Yia Yia's Baklava",
    type: 'website',
    siteName: "Yia Yia's Baklava",
    description: 'A modern twist on a beloved classic. Our Chocolate Hazelnut Baklava features layers of crispy phyllo, a fragrant blend of cinnamon and walnuts, all enveloped',
    images: [
      {url: "https://staging.pradhanservice.com/32x32.webp", alt: "pradhanservice | Logo", type: 'image/webp', sizes:"32x32", fetchPriority: "auto"},
      {url: "https://staging.pradhanservice.com/192x192.webp", alt: "pradhanservice | Logo", type: 'image/webp', sizes:"192x192", fetchPriority: "auto"}
    ],
  },
  twitter:{
    card: "Yia Yia's Baklava",
    title: "Home - Yia Yia's Baklava",
    creator: "Yia Yia's Baklava",
    description: 'A modern twist on a beloved classic. Our Chocolate Hazelnut Baklava features layers of crispy phyllo, a fragrant blend of cinnamon and walnuts, all enveloped',
    images: [
      {url: "https://staging.pradhanservice.com/32x32.webp", alt: "pradhanservice | Logo", type: 'image/webp', sizes:"32x32", fetchPriority: "auto"},
      {url: "https://staging.pradhanservice.com/192x192.webp", alt: "pradhanservice | Logo", type: 'image/webp', sizes:"192x192", fetchPriority: "auto"}
    ],
  },
  icons:{
    icon:[
      {url: '/32x32.webp', type: "image/webp", sizes:"32x32", rel:"icon", fetchPriority: "auto"},
      {url: '/192x192.webp', type: "image/webp", sizes:"192x192", rel:"icon", fetchPriority: "auto"},
    ],
    shortcut: {url: '/192x192.webp', type: "image/webp", fetchPriority: "auto"},
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
  // Also supported but less commonly used
  // 
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>   
        {/* <!-- Google Tag Manager (noscript) --> */}
        <Script id="tag_manager_index" async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MeasurementId_ga}`} />
        <Script id="tag_manager" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0], j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src= 'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f); })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTMId}');`}} />

        {/* Google Optimize */}
        <Script strategy="afterInteractive" src={`https://www.googleoptimize.com/optimize.js?id=${process.env.NEXT_PUBLIC_optimizeId}`} />
        {/* Browser Update */}
        <Script id="browser-update" dangerouslySetInnerHTML={{ __html: `var $buoop = {required:{e:-4,f:-3,o:-3,s:-1,c:-3},insecure:true,api:2025.06 }; function $buo_f(){ var e = document.createElement("script"); e.src = "https://browser-update.org/update.min.js"; document.body.appendChild(e); }; try {document.addEventListener("DOMContentLoaded", $buo_f,false)} catch(e){window.attachEvent("onload", $buo_f)}` }} />
      </head>
      <body className={`${montserrat.variable} antialiased overflow-x-hidden scrollbar-thin scrollbar-thumb-rounded-full scrollbar-thumb-yellow-700 scrollbar-corner-yellow-800 scrollbar-track-blue-900`}>
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe loading="lazy" src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTMId}`} className='hidden invisible' height="0" width="0"></iframe></noscript>

        {/* Google Analitics */}
        <Script strategy='afterInteractive' src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MeasurementId_ga}`} />

        <NextTopLoader   color="#c5a059"   initialPosition={0.08}   crawlSpeed={200}   height={3}   crawl={true}   showSpinner={false}   easing="ease"   speed={200}   shadow="0 0 10px #f1a4c7,0 0 5px #f1a4c7" />
        <Nav />
        {children}
        <Toaster position="top-right" />
        <Footer />
      </body>
    </html>
  );
}
