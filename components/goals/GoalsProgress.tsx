'use client';
import React, { useEffect, useState } from 'react';
import IconMultipleForwardRight from '../icon/icon-multiple-forward-right';
import Link from 'next/link';
import IconShoppingCart from '../icon/icon-shopping-cart';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ReactApexChart from 'react-apexcharts';
import IconCreditCard from '../icon/icon-credit-card';
import Dropdown from '../dropdown';
import IconHorizontalDots from '../icon/icon-horizontal-dots';
import IconArrowLeft from '../icon/icon-arrow-left';
import PerfectScrollbar from 'react-perfect-scrollbar';
const GoalsProgress = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const [isMounted, setIsMounted] = useState(false);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    useEffect(() => {
        setIsMounted(true);
    }, []);
    const revenueChart: any = {
        series: [
            {
                name: 'Weekly Progress',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: 'Monthly Progress',
                data: [16500, 17500, 16200, 17300, 16000, 19500, 16000, 17000, 16000, 19000, 18000, 19000],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                zoom: {
                    enabled: false,
                },
                toolbar: {
                    show: false,
                },
            },

            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                curve: 'smooth',
                width: 2,
                lineCap: 'square',
            },
            dropShadow: {
                enabled: true,
                opacity: 0.2,
                blur: 10,
                left: -7,
                top: 22,
            },
            colors: isDark ? ['#2196F3', '#E7515A'] : ['#1B55E2', '#E7515A'],
            markers: {
                discrete: [
                    {
                        seriesIndex: 0,
                        dataPointIndex: 6,
                        fillColor: '#1B55E2',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 1,
                        dataPointIndex: 5,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            xaxis: {
                axisBorder: {
                    show: false,
                },
                axisTicks: {
                    show: false,
                },
                crosshairs: {
                    show: true,
                },
                labels: {
                    offsetX: isRtl ? 2 : 0,
                    offsetY: 5,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-xaxis-title',
                    },
                },
            },
            yaxis: {
                tickAmount: 7,
                labels: {
                    formatter: (value: number) => {
                        return value / 1000 + 'K';
                    },
                    offsetX: isRtl ? -30 : -10,
                    offsetY: 0,
                    style: {
                        fontSize: '12px',
                        cssClass: 'apexcharts-yaxis-title',
                    },
                },
                opposite: isRtl ? true : false,
            },
            grid: {
                borderColor: isDark ? '#191E3A' : '#E0E6ED',
                strokeDashArray: 5,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                yaxis: {
                    lines: {
                        show: true,
                    },
                },
                padding: {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                fontSize: '16px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 5,
                },
            },
            tooltip: {
                marker: {
                    show: true,
                },
                x: {
                    show: false,
                },
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: isDark ? 0.19 : 0.28,
                    opacityTo: 0.05,
                    stops: isDark ? [100, 100] : [45, 100],
                },
            },
        },
    };
    const totalOrders: any = {
        series: [
            {
                name: 'Sales',
                data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40],
            },
        ],
        options: {
            chart: {
                height: 290,
                type: 'area',
                fontFamily: 'Nunito, sans-serif',
                sparkline: {
                    enabled: true,
                },
            },
            stroke: {
                curve: 'smooth',
                width: 2,
            },
            colors: isDark ? ['#00ab55'] : ['#00ab55'],
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
            yaxis: {
                min: 0,
                show: false,
            },
            grid: {
                padding: {
                    top: 125,
                    right: 0,
                    bottom: 0,
                    left: 0,
                },
            },
            fill: {
                opacity: 1,
                type: 'gradient',
                gradient: {
                    type: 'vertical',
                    shadeIntensity: 1,
                    inverseColors: !1,
                    opacityFrom: 0.3,
                    opacityTo: 0.05,
                    stops: [100, 100],
                },
            },
            tooltip: {
                x: {
                    show: false,
                },
            },
        },
    };
    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className=" h-full ">
                    <div className="mb-5 flex items-center justify-between dark:text-white-light">
                        <h5 className="text-lg font-semibold">Goal Progress Overview</h5>
                       
                    </div>
                   
                    <div className="relative">
                        <div className="rounded-lg bg-white dark:bg-black">
                            {isMounted ? (
                                <ReactApexChart series={revenueChart.series} options={revenueChart.options} type="area" height={325} width={'100%'} />
                            ) : (
                                <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08] ">
                                    <span className="inline-flex h-5 w-5 animate-spin rounded-full  border-2 border-black !border-l-transparent dark:border-white"></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <div className="">
                    <div className="mb-5 flex items-center justify-between">
                        <h5 className="text-lg font-semibold dark:text-white-light">Goals by Type</h5>
                    </div>
                    <div className="relative">
                        <div className="absolute flex w-full items-center justify-between p-5">
                            <h5 className="text-2xl font-semibold dark:text-white-light ltr:text-right rtl:text-left">
                                3,192
                                <span className="block text-sm font-normal">Total Distribution</span>
                            </h5>
                        </div>
                        <div className="rounded-lg bg-transparent">
                            {isMounted ? (
                                <ReactApexChart series={totalOrders.series} options={totalOrders.options} type="area" height={290} width={'100%'} />
                            ) : (
                                <div className="grid min-h-[325px] place-content-center bg-white-light/30 dark:bg-dark dark:bg-opacity-[0.08]">
                                    <span className="inline-flex h-5 w-5 animate-spin rounded-full border-2 border-black !border-l-transparent dark:border-white"></span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="">
                    <div className="mb-5 flex items-center justify-between dark:text-white-light">
                        <h5 className="text-lg font-semibold">Active Goals</h5>
                        <div className="dropdown">
                            <Dropdown placement={`${isRtl ? 'bottom-start' : 'bottom-end'}`} button={<button type="button">View All</button>}></Dropdown>
                        </div>
                    </div>
                    <div className="space-y-9">
                        <div className="flex items-center">
                            <div className="h-9 w-9 ltr:mr-3 rtl:ml-3">
                                <div className="grid h-9 w-9 place-content-center  rounded-full bg-secondary-light text-secondary dark:bg-secondary dark:text-secondary-light"></div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 flex font-semibold text-white-dark">
                                    <h6>Product Knowledge</h6>
                                    <p className="ltr:ml-auto rtl:mr-auto">50%</p>
                                </div>
                                <div className="h-2 rounded-full bg-dark-light shadow dark:bg-[#1b2e4b]">
                                    <div className="h-full w-11/12 rounded-full bg-gradient-to-r from-[#7579ff] to-[#b224ef]"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="h-9 w-9 ltr:mr-3 rtl:ml-3">
                                <div className="grid h-9 w-9 place-content-center rounded-full bg-success-light text-success dark:bg-success dark:text-success-light"></div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 flex font-semibold text-white-dark">
                                    <h6>Objection Handling</h6>
                                    <p className="ltr:ml-auto rtl:mr-auto">78%</p>
                                </div>
                                <div className="h-2 w-full rounded-full bg-dark-light shadow dark:bg-[#1b2e4b]">
                                    <div className="h-full w-full rounded-full bg-gradient-to-r from-[#3cba92] to-[#0ba360]" style={{ width: '65%' }}></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="h-9 w-9 ltr:mr-3 rtl:ml-3">
                                <div className="grid h-9 w-9 place-content-center rounded-full bg-warning-light text-warning dark:bg-warning dark:text-warning-light">
                                    <IconCreditCard />
                                </div>
                            </div>
                            <div className="flex-1">
                                <div className="mb-2 flex font-semibold text-white-dark">
                                    <h6>Demo Delivery</h6>
                                    <p className="ltr:ml-auto rtl:mr-auto">90%</p>
                                </div>
                                <div className="h-2 w-full rounded-full bg-dark-light shadow dark:bg-[#1b2e4b]">
                                    <div className="h-full w-full rounded-full bg-gradient-to-r from-[#f09819] to-[#ff5858]" style={{ width: '80%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="">
                    <h5 className="mb-5 text-lg font-semibold dark:text-white-light">Upcoming Deadlines</h5>
                    <PerfectScrollbar className="relative mb-4 h-[290px] ltr:-mr-3 ltr:pr-3 rtl:-ml-3 rtl:pl-3">
                        <div className="space-y-4">
                            <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center rounded-md bg-white-light/30 px-4 py-2 dark:bg-dark">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Feb</span>
                                    <span className="text-xl font-bold ">16</span>
                                </div>
                                <div>
                                    <h6 className="font-semibold dark:text-white-light">Complete Advanced Training</h6>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">1 weeks remaining</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center rounded-md bg-white-light/30 px-4 py-2 dark:bg-dark">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Feb</span>
                                    <span className="text-xl font-bold ">17</span>
                                </div>
                                <div>
                                    <h6 className="font-semibold dark:text-white-light">Complete Advanced Training</h6>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">2 weeks remaining</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center rounded-md bg-white-light/30 px-4 py-2 dark:bg-dark">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Feb</span>
                                    <span className="text-xl font-bold ">18</span>
                                </div>
                                <div>
                                    <h6 className="font-semibold dark:text-white-light">Complete Advanced Training</h6>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">3 weeks remaining</p>
                                </div>
                            </div>
                        </div>
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
};

export default GoalsProgress;
