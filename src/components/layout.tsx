// fonts
import { Sora } from '@next/font/google';

// components

// font settings
const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const Layout = ({ children }) => (
  <div
    className={` text-black ${sora.variable} font-sora`}
  >

    {children}
  </div>
);

export default Layout;
