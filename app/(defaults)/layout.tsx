import ContentAnimation from '@/components/layouts/content-animation';
import Footer from '@/components/layouts/footer';
import Header from '@/components/layouts/header';
import MainContainer from '@/components/layouts/main-container';
import Overlay from '@/components/layouts/overlay';
import ScrollToTop from '@/components/layouts/scroll-to-top';
import Setting from '@/components/layouts/setting';
import Sidebar from '@/components/layouts/sidebar';
import Portals from '@/components/portals';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        template: '%s | GemText Ai',
        default: 'GemText Ai',
    },
};

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {/* BEGIN MAIN CONTAINER */}
            <div className="relative min-h-screen flex flex-col">
                <Overlay />
                <ScrollToTop />

                {/* BEGIN APP SETTING LAUNCHER */}
                <Setting />
                {/* END APP SETTING LAUNCHER */}

                <MainContainer>
                    {/* BEGIN SIDEBAR */}
                    <Sidebar />
                    {/* END SIDEBAR */}
                    <div className="main-content flex flex-col min-h-screen" style={{ minHeight: '100vh' }}>
                        {/* BEGIN TOP NAVBAR */}
                        <Header />
                        {/* END TOP NAVBAR */}

                        {/* BEGIN CONTENT AREA */}
                        <div className="flex-1 flex flex-col overflow-auto" style={{ paddingBottom: '56px' }}>
                            <ContentAnimation>{children}</ContentAnimation>
                        </div>
                        {/* END CONTENT AREA */}

                        {/* BEGIN FOOTER */}
                        <div className="fixed bottom-0 left-0 w-full z-40" style={{ height: '44px' }}>
                            <Footer />
                        </div>
                        {/* END FOOTER */}
                        <Portals />
                    </div>
                </MainContainer>
            </div>
        </>
    );
}
