'use client';
import { DataTable, DataTableSortStatus } from 'mantine-datatable';
import { useEffect, useState, useMemo } from 'react';
import sortBy from 'lodash/sortBy';
import IconStar from '@/components/icon/icon-star';
import ReactApexChart from 'react-apexcharts';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface TeamMember {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    dob: string;
    address: {
        street: string;
        city: string;
        zipcode: number;
        geo: {
            lat: number;
            lng: number;
        };
    };
    phone: string;
    isActive: boolean;
    age: number;
    company: string;
    progress?: number;
    rating?: number;
    status?: string;
    statusColor?: string;
}

interface Country {
    code: string;
    name: string;
}

type SortStatus = DataTableSortStatus<TeamMember>;

const ComponentsDatatablesAdvanced = () => {
    const rowData: TeamMember[] = [
      
    ];

    const [page, setPage] = useState<number>(1);
    const PAGE_SIZES = [10, 20, 30, 50, 100];
    const [pageSize, setPageSize] = useState<number>(PAGE_SIZES[0]);
    const [initialRecords, setInitialRecords] = useState<TeamMember[]>(sortBy(rowData, 'id'));
    const [recordsData, setRecordsData] = useState<TeamMember[]>(initialRecords);

    const [sortStatus, setSortStatus] = useState<SortStatus>({
        columnAccessor: 'id',
        direction: 'asc',
    });

    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => {
        setIsMounted(true);
    }, []);

    useEffect(() => {
        setPage(1);
    }, [pageSize]);

    useEffect(() => {
        const from = (page - 1) * pageSize;
        const to = from + pageSize;
        setRecordsData([...initialRecords.slice(from, to)]);
    }, [page, pageSize, initialRecords]);

    useEffect(() => {
        const data = sortBy(initialRecords, sortStatus.columnAccessor);
        setInitialRecords(sortStatus.direction === 'desc' ? data.reverse() : data);
        setPage(1);
    }, [sortStatus]);

    const randomColor = () => {
        const color = ['#4361ee', '#805dca', '#00ab55', '#e7515a', '#e2a03f', '#2196f3'];
        const random = Math.floor(Math.random() * color.length);
        return color[random];
    };

    const randomStatusColor = () => {
        const color = ['primary', 'secondary', 'success', 'danger', 'warning', 'info'];
        const random = Math.floor(Math.random() * color.length);
        return color[random];
    };

    const randomStatus = () => {
        const status = ['PAID', 'APPROVED', 'FAILED', 'CANCEL', 'SUCCESS', 'PENDING', 'COMPLETE'];
        const random = Math.floor(Math.random() * status.length);
        return status[random];
    };

    const getRandomNumber = (min: number, max: number): number => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    const chart_options = () => {
        let option = {
            chart: { sparkline: { enabled: true } },
            stroke: { curve: 'smooth', width: 2 },
            markers: { size: [4, 7], strokeWidth: 0 },
            colors: [randomColor()],
            grid: { padding: { top: 5, bottom: 5 } },
            tooltip: {
                x: { show: false },
                y: {
                    title: {
                        formatter: () => {
                            return '';
                        },
                    },
                },
            },
        };
        return option;
    };

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [newMember, setNewMember] = useState<Partial<TeamMember>>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        age: 0,
        isActive: true,
    });

    // Initialize static data for team members
    const processedRecords = useMemo(() => {
        return rowData.map(member => ({
            ...member,
            progress: member.progress || getRandomNumber(15, 100),
            rating: member.rating || getRandomNumber(1, 5),
            status: member.status || randomStatus(),
            statusColor: randomStatusColor()
        }));
    }, [rowData]);

    const handleAddMember = () => {
        const newId = Math.max(...initialRecords.map(member => member.id), 0) + 1;
        const progress = getRandomNumber(15, 100);
        const rating = getRandomNumber(1, 5);
        const status = randomStatus();
        const statusColor = randomStatusColor();
        
        const memberToAdd: TeamMember = {
            id: newId,
            firstName: newMember.firstName || '',
            lastName: newMember.lastName || '',
            email: newMember.email || '',
            phone: newMember.phone || '',
            company: newMember.company || '',
            age: newMember.age || 0,
            isActive: newMember.isActive || true,
            dob: new Date().toISOString().split('T')[0],
            address: {
                street: '',
                city: '',
                zipcode: 0,
                geo: {
                    lat: 0,
                    lng: 0,
                },
            },
            progress,
            rating,
            status,
            statusColor
        };

        setInitialRecords([...initialRecords, memberToAdd]);
        setIsAddModalOpen(false);
        setNewMember({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            company: '',
            age: 0,
            isActive: true,
        });
    };

    return (
        <div className="panel mt-6">
            <div className="flex justify-between items-center mb-5">
                <h5 className="text-lg font-semibold dark:text-white-light">Team Members</h5>
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    Add Team Member
                </button>
            </div>
            <div className="datatables">
                {isMounted && (
                    <DataTable<TeamMember>
                        highlightOnHover
                        className="table-hover whitespace-nowrap"
                        records={recordsData}
                        noRecordsText=""
                        emptyState={<></>}
                        columns={[
                            {
                                accessor: 'id',
                                title: 'ID',
                                sortable: true,
                                render: (record) => <strong className="text-info">#{record.id}</strong>,
                            },
                            {
                                accessor: 'fullName',
                                title: 'Full Name',
                                sortable: true,
                                render: (record) => (
                                    <div className="font-medium">{`${record.firstName} ${record.lastName}`}</div>
                                ),
                            },
                            {
                                accessor: 'email',
                                title: 'Email',
                                sortable: true,
                                render: (record) => (
                                    <a href={`mailto:${record.email}`} className="text-primary hover:underline">
                                        {record.email}
                                    </a>
                                ),
                            },
                            {
                                accessor: 'progress',
                                title: 'Progress',
                                render: (record) => (
                                    <div className="flex h-2.5 w-4/5 min-w-[100px] rounded-full bg-[#ebedf2] dark:bg-dark/40">
                                        <div
                                            className={`h-2.5 rounded-full rounded-bl-full text-center text-xs text-white bg-${record.statusColor || 'primary'}`}
                                            style={{ width: `${record.progress}%` }}
                                        ></div>
                                    </div>
                                ),
                            },
                            { accessor: 'phone', title: 'Phone', sortable: true },
                            {
                                accessor: 'rating',
                                title: 'Rate',
                                titleClassName: '!text-center',
                                render: (record) => (
                                    <div className="flex items-center justify-center text-warning">
                                        {Array.from(Array(record.rating || 0).keys()).map((i) => {
                                            return <IconStar key={i + record.id} className=" fill-warning" />;
                                        })}
                                    </div>
                                ),
                            },
                            {
                                accessor: 'status',
                                title: 'Status',
                                render: (record) => <span className={`badge badge-outline-${record.statusColor || 'primary'}`}>{record.status}</span>,
                            },
                        ]}
                    />
                )}
            </div>

            {/* Add Team Member Modal */}
            <Transition appear show={isAddModalOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50" onClose={() => setIsAddModalOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-dark/60" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-black">
                                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-5">
                                        Add New Team Member
                                    </Dialog.Title>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                                            <input
                                                type="text"
                                                className="form-input mt-1"
                                                value={newMember.firstName}
                                                onChange={(e) => setNewMember({ ...newMember, firstName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                                            <input
                                                type="text"
                                                className="form-input mt-1"
                                                value={newMember.lastName}
                                                onChange={(e) => setNewMember({ ...newMember, lastName: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                                            <input
                                                type="email"
                                                className="form-input mt-1"
                                                value={newMember.email}
                                                onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Phone</label>
                                            <input
                                                type="tel"
                                                className="form-input mt-1"
                                                value={newMember.phone}
                                                onChange={(e) => setNewMember({ ...newMember, phone: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Company</label>
                                            <input
                                                type="text"
                                                className="form-input mt-1"
                                                value={newMember.company}
                                                onChange={(e) => setNewMember({ ...newMember, company: e.target.value })}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                                            <input
                                                type="number"
                                                className="form-input mt-1"
                                                value={newMember.age}
                                                onChange={(e) => setNewMember({ ...newMember, age: parseInt(e.target.value) })}
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <input
                                                type="checkbox"
                                                className="form-checkbox"
                                                checked={newMember.isActive}
                                                onChange={(e) => setNewMember({ ...newMember, isActive: e.target.checked })}
                                            />
                                            <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">Active</label>
                                        </div>
                                    </div>

                                    <div className="mt-6 flex justify-end space-x-3">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger"
                                            onClick={() => setIsAddModalOpen(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            onClick={handleAddMember}
                                        >
                                            Add Member
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default ComponentsDatatablesAdvanced;
