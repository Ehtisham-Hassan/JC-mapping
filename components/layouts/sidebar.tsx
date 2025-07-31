'use client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/themeConfigSlice';
import { IRootState } from '@/store';
import { useState, useEffect } from 'react';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard';
import IconMinus from '@/components/icon/icon-minus';
import { MessageSquarePlus } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { getTranslation } from '@/i18n';
import IconTrendingUp from '@/components/icon/icon-trending-up';
import { BarChart, BookOpen, Brain, Calendar, ChartBar, Package, PhoneCall, Settings, Target, Users } from 'lucide-react';
import AllFilesManagement from '@/components/products/AllFilesManagement';

const Sidebar = () => {
    const dispatch = useDispatch();
    const { t } = getTranslation();
    const pathname = usePathname();
    const [currentMenu, setCurrentMenu] = useState<string>('');
    const [errorSubMenu, setErrorSubMenu] = useState(false);
    const themeConfig = useSelector((state: IRootState) => state.themeConfig);
    const semidark = useSelector((state: IRootState) => state.themeConfig.semidark);
    const toggleMenu = (value: string) => {
        setCurrentMenu((oldValue) => {
            return oldValue === value ? '' : value;
        });
    };

    useEffect(() => {
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        if (selector) {
            selector.classList.add('active');
            const ul: any = selector.closest('ul.sub-menu');
            if (ul) {
                let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
                if (ele.length) {
                    ele = ele[0];
                    setTimeout(() => {
                        ele.click();
                    });
                }
            }
        }
    }, []);

    useEffect(() => {
        setActiveRoute();
        if (window.innerWidth < 1024 && themeConfig.sidebar) {
            dispatch(toggleSidebar());
        }
    }, [pathname]);

    const setActiveRoute = () => {
        let allLinks = document.querySelectorAll('.sidebar ul a.active');
        for (let i = 0; i < allLinks.length; i++) {
            const element = allLinks[i];
            element?.classList.remove('active');
        }
        const selector = document.querySelector('.sidebar ul a[href="' + window.location.pathname + '"]');
        selector?.classList.add('active');
    };

    return (
        <div className="dark">
            <nav
                className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 text-white-dark`}
            >
                <div className="h-full bg-black">
                    <style>{`.sidebar { background-color: #232F4B !important; }`}</style>
                    <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
                        <Link href="/" className="main-logo flex shrink-0 items-center">
                            <img src="/assets/icons/Main-logo-black.svg" alt="GemText Logo" className="w-8 h-8" />
                            <span className="align-middle text-2xl font-semibold ltr:ml-1.5 rtl:mr-1.5 dark:text-white-light lg:inline">GemText Ai</span>
                        </Link>

                        <button
                            type="button"
                            className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 rtl:rotate-180 dark:text-white-light dark:hover:bg-dark-light/10"
                            onClick={() => dispatch(toggleSidebar())}
                        >
                            <IconCaretsDown className="m-auto rotate-90" />
                        </button>
                    </div>
                    <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
                        <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
                            {/* Overview Section */}
                            <li className="menu nav-item">
                                <h2 className="-mx-4 mb-1 flex items-center text-xs  px-7 py-3  uppercase ">
                                    <IconMinus className="hidden h-5 w-4 flex-none" />
                                    <span>{t('Overview')}</span>
                                </h2>
                                <li className="nav-item">
                                    <Link href="/dashboard" className="group">
                                        <div className="flex items-center">
                                            <span className="text-black ltr:pl-3 rtl:pr-3 text-sm dark:text-[#506690] dark:group-hover:text-white-dark">{t('Dashboard')}</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/chat" className="group">
                                        <div className="flex items-center">
                                            <span className="text-black ltr:pl-3 rtl:pr-3 text-sm dark:text-[#506690] dark:group-hover:text-white-dark">{t('AI Mapping')}</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/All-Files" className="group">
                                        <div className="flex items-center">
                                            <span className="text-black ltr:pl-3 rtl:pr-3 text-sm dark:text-[#506690] dark:group-hover:text-white-dark">{t('All Files')}</span>
                                        </div>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="/settings" className="group">
                                        <div className="flex items-center">
                                            <span className="text-black ltr:pl-3 rtl:pr-3 text-sm dark:text-[#506690] dark:group-hover:text-white-dark">{t('Settings')}</span>
                                        </div>
                                    </Link>
                                </li>
                            </li>
                        </ul>
                        {/* Hide Pro Features component */}
                        <div className="sticky p-4 hidden">
                            <div className="rounded-lg bg-[#1E2436] p-4">
                                <div className="flex items-center">
                                    <div className="ml-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            <IconTrendingUp className="p-1 w-6 h-6 bg-gray-700 rounded text-blue-500 " />
                                            <h3 className="text-white font-semibold">Pro Features</h3>
                                        </div>
                                        <p className="text-[#506690] text-sm">Unlock advanced AI coaching and team analytics</p>
                                    </div>
                                </div>
                                <button className="w-full mt-3 bg-[#282E3F] text-white text-sm py-2 rounded-lg hover:bg-[#323847] transition-colors">
                                    Upgrade Now
                                </button>
                            </div>
                        </div>
                    </PerfectScrollbar>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
