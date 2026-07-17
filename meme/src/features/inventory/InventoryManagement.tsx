// src/features/inventory/InventoryManagement.tsx
import React, { useState, useMemo } from 'react';
import InventoryTable from './InventoryTable';
import InventoryForm from './InventoryForm';
import InventoryDetail from './InventoryDetail';
import type {
  InventoryRecord,
  InventoryFormData,
  InventoryStatus,
  SortOption,
} from './types';

// ============ MOCK DATA ============
const mockRecords: InventoryRecord[] = [
  {
    id: 1,
    code: 'HEHE0001',
    staffName: 'ADMIN',
    totalAmount: 14000000,
    status: 'Đang xử lý',
    createdDate: '2026-06-29',
    note: 'Mang nhanh đến đây nào, đang cần...',
    items: [
      {
        id: 1,
        medicineName: 'Phanadol',
        batchCode: 'Lô 001',
        quantity: 200,
        unit: 'Vi',
        price: 10000,
        totalPrice: 2000000,
      },
      {
        id: 2,
        medicineName: 'ACETYL C',
        batchCode: 'Lô 002',
        quantity: 100,
        unit: 'Hộp',
        price: 27000,
        totalPrice: 2700000,
      },
    ],
  },
  {
    id: 2,
    code: 'NK0002',
    staffName: 'BS. Lê Tấn',
    totalAmount: 8500000,
    status: 'Hoàn thành',
    createdDate: '2026-06-25',
    note: 'Nhập thêm kháng sinh',
    items: [
      {
        id: 1,
        medicineName: 'Amoxicillin',
        batchCode: 'Lô 005',
        quantity: 500,
        unit: 'Gói',
        price: 17000,
        totalPrice: 8500000,
      },
    ],
  },
];

const InventoryManagement: React.FC = () => {
  const [records, setRecords] = useState<InventoryRecord[]>(mockRecords);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<InventoryRecord | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | InventoryStatus>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const filteredRecords = useMemo(() => {
    let result = records.filter((rec) => {
      const matchSearch =
        rec.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.note.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = statusFilter === 'all' || rec.status === statusFilter;
      const matchDate =
        (!dateFrom || rec.createdDate >= dateFrom) &&
        (!dateTo || rec.createdDate <= dateTo);
      return matchSearch && matchStatus && matchDate;
    });

    // Sắp xếp
    switch (sortOption) {
      case 'total-asc':
        result.sort((a, b) => a.totalAmount - b.totalAmount);
        break;
      case 'total-desc':
        result.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
      case 'date-asc':
        result.sort((a, b) => new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime());
        break;
      case 'date-desc':
        result.sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime());
        break;
    }

    return result;
  }, [records, searchTerm, statusFilter, sortOption, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedRecords = filteredRecords.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  const handleAdd = (formData: InventoryFormData) => {
    const newTotal = formData.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const newRecord: InventoryRecord = {
      id: Date.now(),
      code: `NK${String(records.length + 1).padStart(6, '0')}`,
      staffName: 'ADMIN',
      totalAmount: newTotal,
      status: 'Đang xử lý',
      createdDate: new Date().toISOString().split('T')[0],
      note: formData.note,
      items: formData.items,
    };
    setRecords([...records, newRecord]);
    setShowForm(false);
  };

  const handleEdit = (formData: InventoryFormData) => {
    if (!selectedRecord) return;
    const newTotal = formData.items.reduce((sum, item) => sum + item.totalPrice, 0);
    const updated = records.map((rec) =>
      rec.id === selectedRecord.id
        ? { ...rec, note: formData.note, totalAmount: newTotal, items: formData.items }
        : rec
    );
    setRecords(updated);
    setShowForm(false);
    setSelectedRecord(null);
    setIsEditMode(false);
  };

  const handleView = (record: InventoryRecord) => {
    setSelectedRecord(record);
    setShowDetail(true);
  };

  const handleEditClick = (record: InventoryRecord) => {
    if (record.status !== 'Đang xử lý') return;
    setSelectedRecord(record);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleCancel = (record: InventoryRecord) => {
    if (record.status !== 'Đang xử lý') return;
    const updated = records.map((rec) =>
      rec.id === record.id ? { ...rec, status: 'Đã hủy' as InventoryStatus } : rec
    );
    setRecords(updated);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Quản lý nhập kho
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">Thời gian:</label>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
            <span className="text-gray-400">→</span>
            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="border border-gray-300 rounded-xl px-3 py-2"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">Tìm kiếm:</label>
          <input
            type="text"
            placeholder="Tìm kiếm theo mã phiếu, ghi chú"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:border-blue-500 w-64"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">Trạng thái:</label>
          <select
            className="border border-gray-300 rounded-xl px-4 py-2 bg-white"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="all">Tất cả</option>
            <option value="Đang xử lý">Đang xử lý</option>
            <option value="Hoàn thành">Hoàn thành</option>
            <option value="Đã hủy">Đã hủy</option>
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-xs font-semibold text-gray-600">Sắp xếp:</label>
          <select
            className="border border-gray-300 rounded-xl px-4 py-2 bg-white"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
          >
            <option value="default">Mặc định</option>
            <option value="total-asc">Tổng tiền từ bé đến lớn</option>
            <option value="total-desc">Tổng tiền từ lớn đến bé</option>
            <option value="date-asc">Ngày lập gần nhất</option>
            <option value="date-desc">Ngày lập trễ nhất</option>
          </select>
        </div>

        <button
          onClick={() => {
            setIsEditMode(false);
            setSelectedRecord(null);
            setShowForm(true);
          }}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium self-end"
        >
          Tạo phiếu nhập
        </button>
      </div>

      {/* Table */}
      <InventoryTable
        records={paginatedRecords}
        onView={handleView}
        onEdit={handleEditClick}
        onCancel={handleCancel}
      />

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={safeCurrentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40"
        >
          &lt;&lt; Trước
        </button>
        <span className="text-gray-700 font-medium">
          Trang {safeCurrentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={safeCurrentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40"
        >
          Sau &gt;&gt;
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-5xl max-h-[95vh] overflow-auto">
            <InventoryForm
              onSubmit={isEditMode ? handleEdit : handleAdd}
              onCancel={() => {
                setShowForm(false);
                setIsEditMode(false);
                setSelectedRecord(null);
              }}
              initialData={selectedRecord}
              isEdit={isEditMode}
            />
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedRecord && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-auto">
            <InventoryDetail
              record={selectedRecord}
              onClose={() => setShowDetail(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryManagement;