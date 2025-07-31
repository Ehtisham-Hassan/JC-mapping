'use client';
import Dropdown from '@/components/dropdown';
import IconCreditCard from '@/components/icon/icon-credit-card';
import IconDollarSign from '@/components/icon/icon-dollar-sign';
import IconHorizontalDots from '@/components/icon/icon-horizontal-dots';
import IconInbox from '@/components/icon/icon-inbox';
import IconMultipleForwardRight from '@/components/icon/icon-multiple-forward-right';
import IconShoppingCart from '@/components/icon/icon-shopping-cart';
import IconTag from '@/components/icon/icon-tag';
import { IRootState } from '@/store';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import GoalsProgress from '@/components/GoalsProgress';

const ComponentsDashboardSales = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    //Revenue Chart
    const revenueChart: any = {
        series: [
            {
                name: 'Income',
                data: [16800, 16800, 15500, 17800, 15500, 17000, 19000, 16000, 15000, 17000, 14000, 17000],
            },
            {
                name: 'Expenses',
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

    //Sales By Category
    const salesByCategory: any = {
        series: [985, 737, 270],
        options: {
            chart: {
                type: 'donut',
                height: 460,
                fontFamily: 'Nunito, sans-serif',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 25,
                colors: isDark ? '#0e1726' : '#fff',
            },
            colors: isDark ? ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'] : ['#e2a03f', '#5c1ac3', '#e7515a'],
            legend: {
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '14px',
                markers: {
                    width: 10,
                    height: 10,
                    offsetX: -2,
                },
                height: 50,
                offsetY: 20,
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '65%',
                        background: 'transparent',
                        labels: {
                            show: true,
                            name: {
                                show: true,
                                fontSize: '29px',
                                offsetY: -10,
                            },
                            value: {
                                show: true,
                                fontSize: '26px',
                                color: isDark ? '#bfc9d4' : undefined,
                                offsetY: 16,
                                formatter: (val: any) => {
                                    return val;
                                },
                            },
                            total: {
                                show: true,
                                label: 'Total',
                                color: '#888ea8',
                                fontSize: '29px',
                                formatter: (w: any) => {
                                    return w.globals.seriesTotals.reduce(function (a: any, b: any) {
                                        return a + b;
                                    }, 0);
                                },
                            },
                        },
                    },
                },
            },
            labels: ['Apparel', 'Sports', 'Others'],
            states: {
                hover: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
                active: {
                    filter: {
                        type: 'none',
                        value: 0.15,
                    },
                },
            },
        },
    };

    //Daily Sales
    const dailySales: any = {
        series: [
            {
                name: 'Sales',
                data: [44, 55, 41, 67, 22, 43, 21],
            },
            {
                name: 'Last Week',
                data: [13, 23, 20, 8, 13, 27, 33],
            },
        ],
        options: {
            chart: {
                height: 160,
                type: 'bar',
                fontFamily: 'Nunito, sans-serif',
                toolbar: {
                    show: false,
                },
                stacked: true,
                stackType: '100%',
            },
            dataLabels: {
                enabled: false,
            },
            stroke: {
                show: true,
                width: 1,
            },
            colors: ['#e2a03f', '#e0e6ed'],
            responsive: [
                {
                    breakpoint: 480,
                    options: {
                        legend: {
                            position: 'bottom',
                            offsetX: -10,
                            offsetY: 0,
                        },
                    },
                },
            ],
            xaxis: {
                labels: {
                    show: false,
                },
                categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
            },
            yaxis: {
                show: false,
            },
            fill: {
                opacity: 1,
            },
            plotOptions: {
                bar: {
                    horizontal: false,
                    columnWidth: '25%',
                },
            },
            legend: {
                show: false,
            },
            grid: {
                show: false,
                xaxis: {
                    lines: {
                        show: false,
                    },
                },
                padding: {
                    top: 10,
                    right: -20,
                    bottom: -20,
                    left: -20,
                },
            },
        },
    };

    //Total Orders
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

    const summaryStats = [
        { label: 'Total Vendors', value: 5 },
        { label: 'Total Files', value: 13 },
        { label: 'Successful Imports', value: 8 },
        { label: 'Pending Files', value: 12 },
    ];

    // Mock data for table and lower cards
    const vendorTable = [
        { vendor: 'Vendor A', last: 'Today', upload: 'Success', result: 'Success', action: 'Uploaded' },
        { vendor: 'Vendor B', last: '2 days ago', upload: 'Failed', result: 'Pending', action: 'Error' },
        { vendor: 'Vendor C', last: '3 days ago', upload: 'Failed', result: 'Pending', action: 'Error' },
        { vendor: 'Vendor D', last: '4 days ago', upload: 'Success', result: 'Success', action: 'Uploaded' },
        { vendor: 'Vendor F', last: '5 days ago', upload: 'Success', result: 'Success', action: 'Uploaded' },
    ];
    const vendorFiles = [
        { file: 'File 1', status: 'Success', time: 'Just now' },
        { file: 'File 2', status: 'Pending', time: '14:00' },
        { file: 'File 3', status: 'Error', time: '11:00' },
        { file: 'File 4', status: 'Uploaded', time: '10:00' },
    ];
    const recentFiles = [
        { file: 'File 1', time: 'Just Now', color: 'blue' },
        { file: 'File 2', time: '2 min ago', color: 'blue' },
        { file: 'File 3', time: '14:00', color: 'red' },
        { file: 'File 4', time: '14:00', color: 'blue' },
        { file: 'File 5', time: '14:00', color: 'yellow' },
    ];

    return (
        <div className="pt-5">
            {/* Top summary cards */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {summaryStats.map((stat) => (
                    <div key={stat.label} className="flex-1 bg-[#2B3663] text-white rounded-lg p-6 flex flex-col items-center justify-center min-w-[180px]">
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <div className="text-base mt-2">{stat.label}</div>
                    </div>
                ))}
            </div>
            {/* Main content row: Table and Donut Chart */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {/* Table Card */}
                <div className="col-span-2 bg-white rounded-lg shadow p-6">
                    {/* Removed heading and description for Vistro/Tailwind style */}
                    <div className="overflow-x-auto">
                        <table className="min-w-full rounded-2xl overflow-hidden">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Vendor Name</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Last File Received</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Jewel Cloud Upload</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">File Import Result</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">Last Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendorTable.map((row, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-900">{row.vendor}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-900">{row.last}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-900">{row.upload}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-900">{row.result}</td>
                                        <td className="px-4 py-4 whitespace-nowrap text-gray-900">{row.action}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Donut Chart Card */}
                <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center justify-center">
                    <h3 className="text-lg font-semibold mb-2">Categorized Files</h3>
                    {/* Placeholder for donut chart */}
                    <div className="w-40 h-40 flex items-center justify-center">
                        <svg viewBox="0 0 120 120" width="100%" height="100%">
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#2B3663" strokeWidth="16" strokeDasharray="314" strokeDashoffset="0" />
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#F59E42" strokeWidth="16" strokeDasharray="104.7 209.3" strokeDashoffset="0" />
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#3B82F6" strokeWidth="16" strokeDasharray="104.7 209.3" strokeDashoffset="104.7" />
                            <circle cx="60" cy="60" r="50" fill="none" stroke="#F43F5E" strokeWidth="16" strokeDasharray="104.7 209.3" strokeDashoffset="209.4" />
                            <text x="60" y="68" textAnchor="middle" fontSize="20" fill="#2B3663">Total</text>
                            <text x="60" y="90" textAnchor="middle" fontSize="18" fill="#2B3663">200</text>
                        </svg>
                    </div>
                    <div className="flex gap-4 mt-4 text-xs">
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#3B82F6]"></span>Files Uploaded</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#F59E42]"></span>Mapped Files</span>
                        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-[#F43F5E]"></span>Exported Files</span>
                    </div>
                </div>
            </div>
            {/* Lower cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Vendor Files Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-2">Vendor Files</h3>
                    <table className="min-w-full">
                        <tbody>
                            {vendorFiles.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="py-2 font-medium">{row.file}</td>
                                    <td className="py-2">{row.status}</td>
                                    <td className="py-2 text-right text-gray-500">{row.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Recent File Card */}
                <div className="bg-white rounded-lg shadow p-6">
                    <h3 className="text-lg font-semibold mb-2">Recent File</h3>
                    <table className="min-w-full">
                        <tbody>
                            {recentFiles.map((row, idx) => (
                                <tr key={idx}>
                                    <td className="py-2 flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${row.color === 'blue' ? 'bg-blue-500' : row.color === 'red' ? 'bg-red-500' : 'bg-yellow-400'}`}></span>
                                        {row.file}
                                    </td>
                                    <td className="py-2 text-right text-gray-500">{row.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-end mt-4">
                        <button className="text-sm text-blue-600 hover:underline">View All</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentsDashboardSales;
