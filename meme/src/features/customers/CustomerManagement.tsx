// src/features/customers/CustomerManagement.tsx
import React, { useState, useMemo } from 'react';
import CustomerTable from './CustomerTable';
import CustomerForm from './CustomerForm';
import CustomerDetail from './CustomerDetail';
import type { Customer, CustomerFormData } from './types';

// Mock data mẫu
const mockCustomers: Customer[] = [
  {
    maKhachHang: 'KH001',
    ten: 'Nguyễn Văn A',
    dienThoai: '0901234567',
    email: 'nguyenvana@email.com',
    diaChi: '123 Nguyễn Văn A, Quận 1, TP.HCM',
    maKhach: 'CUST001',
    daXoa: false,
    ngayTao: '2024-01-15',
    ngayCapNhat: '2024-06-20',
  },
  {
    maKhachHang: 'KH002',
    ten: 'Trần Thị B',
    dienThoai: '0912345678',
    email: 'tranthib@email.com',
    diaChi: '456 Lê Lợi, Quận 2, TP.HCM',
    daXoa: false,
    ngayTao: '2024-02-10',
  },
];

const CustomerManagement: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredCustomers = useMemo(() => {
    return customers.filter(customer => {
      const matchesSearch =
        customer.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.dienThoai.includes(searchTerm) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.maKhachHang.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.maKhach?.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Chỉ hiển thị khách chưa xóa
      return matchesSearch && !customer.daXoa;
    });
  }, [customers, searchTerm]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredCustomers.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedCustomers = filteredCustomers.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  const generateMaKhachHang = () => {
    const prefix = 'KH';
    const maxId = customers.reduce((max, c) => {
      const num = parseInt(c.maKhachHang.replace(prefix, ''));
      return num > max ? num : max;
    }, 0);
    return `${prefix}${String(maxId + 1).padStart(3, '0')}`;
  };

  const handleAdd = (data: CustomerFormData) => {
    const newCustomer: Customer = {
      ...data,
      maKhachHang: generateMaKhachHang(),
      daXoa: false,
      ngayTao: new Date().toISOString().split('T')[0],
    };
    setCustomers([...customers, newCustomer]);
    setShowForm(false);
    setCurrentPage(1);
  };

  const handleEdit = (data: CustomerFormData) => {
    if (!selectedCustomer) return;
    const updated = customers.map(customer =>
      customer.maKhachHang === selectedCustomer.maKhachHang
        ? { 
            ...customer, 
            ...data, 
            ngayCapNhat: new Date().toISOString().split('T')[0] 
          }
        : customer
    );
    setCustomers(updated);
    setShowForm(false);
    setSelectedCustomer(null);
    setIsEditMode(false);
  };

  const handleView = (customer: Customer) => {
    setSelectedCustomer(customer);
    setShowDetail(true);
  };

  const handleEditClick = (customer: Customer) => {
    setSelectedCustomer(customer);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (customer: Customer) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa khách hàng "${customer.ten}"?`)) {
      const updated = customers.map(c =>
        c.maKhachHang === customer.maKhachHang
          ? { ...c, daXoa: true, ngayCapNhat: new Date().toISOString().split('T')[0] }
          : c
      );
      setCustomers(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QUẢN LÝ KHÁCH HÀNG</h1>
          <p className="text-gray-600 mt-1">Danh sách khách hàng của phòng khám</p>
        </div>
        <button
          onClick={() => { setIsEditMode(false); setShowForm(true); }}
          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl flex items-center gap-2 font-medium"
        >
          + Thêm khách hàng
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Tìm theo tên, sđt, email, mã khách..."
          className="flex-1 min-w-[250px] border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-emerald-500"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Số lượng:</label>
          <select
            className="border border-gray-300 rounded-2xl px-4 py-3"
            value={pageSize}
            onChange={(e) => { setPageSize(Number(e.target.value)); setCurrentPage(1); }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <CustomerTable
        customers={paginatedCustomers}
        onView={handleView}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />

      {/* Pagination */}
      <div className="flex justify-center items-center gap-3 text-sm">
        <button
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={safeCurrentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &lt;&lt; Trước
        </button>
        <span className="text-gray-700 font-medium">
          Trang {safeCurrentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={safeCurrentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Sau &gt;&gt;
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-auto">
            <CustomerForm
              onSubmit={isEditMode ? handleEdit : handleAdd}
              onCancel={() => { setShowForm(false); setIsEditMode(false); }}
              initialData={selectedCustomer || undefined}
              isEdit={isEditMode}
            />
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedCustomer && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-auto">
            <CustomerDetail
              customer={selectedCustomer}
              onClose={() => setShowDetail(false)}
              onEdit={handleEditClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerManagement;