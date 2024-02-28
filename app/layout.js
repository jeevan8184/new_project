import '@styles/globals.css';
import Provider from '@components/Provider';
import Nav from '@components/Nav';

export const metadata={
    title:'Promptopia',
    description:'Discover new things'
}

const RootLayout = ({children}) => {
  return (
    <html lang='eng'>
        <body className='bg-gradient-to-l from-red-50 to-amber-50'>
            <Provider>
            <div className=''>
                <div className='' />
            </div>
            <main className='p-5'>
                <Nav />
                {children}
            </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout;
