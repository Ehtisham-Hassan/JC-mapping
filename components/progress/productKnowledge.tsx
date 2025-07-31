'use client';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store';
import ReactApexChart from 'react-apexcharts';
import Link from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';

const ProductKnowledge = () => {
    const isDark = useSelector((state: IRootState) => state.themeConfig.theme === 'dark' || state.themeConfig.isDarkMode);
    const isRtl = useSelector((state: IRootState) => state.themeConfig.rtlClass) === 'rtl';
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Mock data
    const products = [
        { id: 1, name: 'Product A', progress: 75, lastSession: '2023-06-15' },
        { id: 2, name: 'Product B', progress: 45, lastSession: '2023-06-10' },
        { id: 3, name: 'Product C', progress: 90, lastSession: '2023-06-18' },
        { id: 4, name: 'Product D', progress: 30, lastSession: '2023-06-05' },
        { id: 5, name: 'Product E', progress: 60, lastSession: '2023-06-12' },
    ];

    const recentActivities = [
        { id: 1, activity: 'Completed Product A Basics', date: '2023-06-18' },
        { id: 2, activity: 'Started Product B Advanced Module', date: '2023-06-15' },
        { id: 3, activity: 'Completed Product C Certification', date: '2023-06-12' },
        { id: 4, activity: 'Reviewed Product D Documentation', date: '2023-06-10' },
    ];

    const suggestedLearning = [
        { id: 1, suggestion: 'Start Product C Advanced Training', type: 'advanced' },
        { id: 2, suggestion: 'New Product D Learning Path Available', type: 'new' },
        { id: 3, suggestion: 'Complete Product A Certification', type: 'certification' },
    ];

    // Progress chart
    const progressChart: any = {
        series: [
            {
                name: 'Product A',
                data: [30, 40, 45, 50, 55, 70, 75],
            },
            {
                name: 'Product B',
                data: [20, 25, 30, 35, 40, 45, 45],
            },
            {
                name: 'Product C',
                data: [40, 50, 65, 70, 75, 80, 90],
            },
        ],
        options: {
            chart: {
                height: 325,
                type: 'line',
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
            colors: isDark ? ['#2196F3', '#E7515A', '#00ab55'] : ['#1B55E2', '#E7515A', '#00ab55'],
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
                        dataPointIndex: 6,
                        fillColor: '#E7515A',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                    {
                        seriesIndex: 2,
                        dataPointIndex: 6,
                        fillColor: '#00ab55',
                        strokeColor: 'transparent',
                        size: 7,
                    },
                ],
            },
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
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
                        return value + '%';
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
        },
    };

    // Stats calculation
    const productsCovered = products.length;
    const certificationsAchieved = 3; // Mock data
    const averageCompletion = Math.round(products.reduce((sum, product) => sum + product.progress, 0) / products.length);

    return (
        <div>
            {/* Header Section */}
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Product Knowledge Overview</h2>
                <p className="text-gray-600 dark:text-gray-400">Track your expertise and training progress on each product</p>
            </div>

            {/* Progress Summary Cards */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                <div className="rounded-md border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center">
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-blue-100 text-xl text-blue-500 dark:bg-blue-900">
                            📦
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Products Covered</h3>
                            <p className="text-2xl font-bold text-blue-500">{productsCovered}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-md border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center">
                        <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-md bg-indigo-100 text-xl text-indigo-500 dark:bg-indigo-900">
                            🏆
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Certifications Achieved</h3>
                            <p className="text-2xl font-bold text-indigo-500">{certificationsAchieved}</p>
                        </div>
                    </div>
                </div>

                <div className="rounded-md border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center">
                        <div className="relative mr-4 h-12 w-12">
                            <svg className="h-12 w-12" viewBox="0 0 36 36">
                                <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200 dark:stroke-gray-700" strokeWidth="2"></circle>
                                <circle
                                    cx="18"
                                    cy="18"
                                    r="16"
                                    fill="none"
                                    className="stroke-green-500"
                                    strokeWidth="2"
                                    strokeDasharray={100}
                                    strokeDashoffset={100 - averageCompletion}
                                    strokeLinecap="round"
                                    transform="rotate(-90 18 18)"
                                ></circle>
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{averageCompletion}%</div>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Training Completion</h3>
                            <p className="text-2xl font-bold text-green-500">{averageCompletion}%</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product List / Grid */}
            <div className="mb-6">
                <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Product Training Status</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <div key={product.id} className="rounded-md border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                            <h4 className="mb-2 text-lg font-semibold text-gray-800 dark:text-gray-100">{product.name}</h4>
                            <div className="mb-2">
                                <div className="mb-1 flex justify-between">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">Progress</span>
                                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{product.progress}%</span>
                                </div>
                                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                                    <div
                                        className="h-full rounded-full bg-blue-500"
                                        style={{ width: `${product.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                            <div className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                                Last Session: {new Date(product.lastSession).toLocaleDateString()}
                            </div>
                            <Link
                                href={`/product-training/${product.id}`}
                                className="inline-block rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-600"
                            >
                                {product.progress === 100 ? 'View Details' : 'Continue Learning'}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* Graph Section */}
            <div className="mb-6 rounded-md border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Training Progress Chart</h3>
                <div className="w-full">
                    {isMounted && <ReactApexChart series={progressChart.series} options={progressChart.options} type="line" height={325} width={'100%'} />}
                </div>
            </div>

            {/* Recent Activity and Suggested Learning (2-column layout) */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Recent Activity Section */}
                <div className="rounded-md border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Recent Activities</h3>
                    <div className="h-[300px]">
                        <PerfectScrollbar className="relative h-full pr-3">
                            <div className="space-y-4">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="border-b border-gray-200 pb-3 last:border-0 dark:border-gray-700">
                                        <div className="flex justify-between">
                                            <p className="font-medium text-gray-800 dark:text-gray-200">{activity.activity}</p>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {new Date(activity.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>

                {/* Suggested Learning Paths Section */}
                <div className="rounded-md border border-gray-200 bg-white p-4 shadow-md dark:border-gray-700 dark:bg-gray-800">
                    <h3 className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-100">Suggested Learning Paths</h3>
                    <div className="h-[300px]">
                        <PerfectScrollbar className="relative h-full pr-3">
                            <div className="space-y-4">
                                {suggestedLearning.map((suggestion) => (
                                    <div key={suggestion.id} className="rounded-md border border-gray-200 p-3 dark:border-gray-700">
                                        <div className="flex items-start space-x-3">
                                            <div className={`mt-1 flex h-8 w-8 items-center justify-center rounded-full ${
                                                suggestion.type === 'advanced' ? 'bg-blue-100 text-blue-500 dark:bg-blue-900' :
                                                suggestion.type === 'new' ? 'bg-green-100 text-green-500 dark:bg-green-900' :
                                                'bg-indigo-100 text-indigo-500 dark:bg-indigo-900'
                                            }`}>
                                                {suggestion.type === 'advanced' ? '🚀' : suggestion.type === 'new' ? '🆕' : '🎓'}
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-800 dark:text-gray-200">{suggestion.suggestion}</p>
                                                <p className="text-sm capitalize text-gray-500 dark:text-gray-400">{suggestion.type} training</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </PerfectScrollbar>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductKnowledge;
