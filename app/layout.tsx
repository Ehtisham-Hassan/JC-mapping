import ProviderComponent from '@/components/layouts/provider-component';
import 'react-perfect-scrollbar/dist/css/styles.css';
import '../styles/tailwind.css';
import { Metadata } from 'next';
import { Providers } from './providers';
import QueryProvider from '@/providers/QueryProvider';

export const metadata: Metadata = {
    title: {
        template: '%s',
        default: 'Gemtext Ai',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body 
            // className={nunito.variable}
            >
                <QueryProvider>
                    <Providers>
                        <ProviderComponent>{children}</ProviderComponent>
                    </Providers>
                </QueryProvider>
            </body>
        </html>
    );
}
