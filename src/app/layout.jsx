import './globals.css'
import Navbar from '../components/NavBar'

export const metadata = {
  title: 'Destiny',
  description: 'What we have all been waiting for.',
  icon: '/favicon.ico'
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1
}

export default async function RootLayout ({ children }) {
  return (
    <html lang='en'>
      <head />
      <body className='bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 h-screen w-screen'>
        <Navbar />
        <div className='md:container md:mx-auto overflow-x-scroll pt-20'>
          {children}
        </div>
      </body>
    </html>
  )
}
