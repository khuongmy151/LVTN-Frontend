// src/features/employees/EmployeeManagement.tsx
import React, { useState, useMemo } from 'react';
import EmployeeTable from './EmployeeTable';
import EmployeeForm from './EmployeeForm';
import EmployeeDetail from './EmployeeDetail';
import type { Employee, EmployeeFormData } from './types';

const mockEmployees: Employee[] = [
  {
    id: 1,
    name: 'Lê Tấn',
    role: 'Bác sĩ',
    username: 'letan',
    email: 'letan@clinic.vn',
    phone: '0987654321',
    status: 'active',
    gender: 'Nam',
    birthDate: '1990-01-01',
    specialization: 'Thú y nội khoa',
    degree: 'Thạc sĩ Thú y',
    experience: '8',
    description: 'Chuyên khám và điều trị chó mèo',
  },
  {
    id: 2,
    name: 'Nguyễn Văn Hùng',
    role: 'Bác sĩ',
    username: 'hunghn',
    email: 'hunghn@clinic.vn',
    phone: '0911222333',
    status: 'active',
    gender: 'Nam',
    birthDate: '1988-05-20',
    specialization: 'Thú y ngoại khoa',
    degree: 'Bác sĩ Thú y',
    experience: '10',
    description: 'Chuyên phẫu thuật',
  },
  {
    id: 3,
    name: 'Nguyễn Thị Lan',
    role: 'Lễ tân',
    username: 'lannt',
    email: 'lannt@clinic.vn',
    phone: '0912345678',
    status: 'inactive',
    gender: 'Nữ',
    birthDate: '1995-05-15',
  },
];

const EmployeeManagement: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'Bác sĩ' | 'Lễ tân'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pageSize = 10;

  // Lọc nhân viên
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => {
      const matchesSearch =
        emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.phone.includes(searchTerm);

      const matchesRole = roleFilter === 'all' || emp.role === roleFilter;

      const matchesStatus =
        statusFilter === 'all' ||
        (statusFilter === 'active' && emp.status === 'active') ||
        (statusFilter === 'inactive' && emp.status === 'inactive');

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [employees, searchTerm, roleFilter, statusFilter]);

  // Số lượng = số kết quả lọc (thay đổi theo vai trò + trạng thái)
  const filteredCount = filteredEmployees.length;

  // Phân trang
  const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedEmployees = filteredEmployees.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$';
    let pwd = '';
    for (let i = 0; i < 10; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  };

  const handleAdd = (data: EmployeeFormData) => {
    const newEmployee: Employee = {
      ...data,
      id: Date.now(),
      status: 'active',
      password: data.password || generatePassword(),
    };
    setEmployees([...employees, newEmployee]);
    setShowForm(false);
    setCurrentPage(1);
  };

  const handleEdit = (data: EmployeeFormData) => {
    if (!selectedEmployee) return;
    const updated = employees.map(emp =>
      emp.id === selectedEmployee.id ? { ...emp, ...data } : emp
    );
    setEmployees(updated);
    setShowForm(false);
    setSelectedEmployee(null);
    setIsEditMode(false);
  };

  const handleView = (employee: Employee) => {
    setSelectedEmployee(employee);
    setShowDetail(true);
  };

  const handleEditClick = (employee: Employee) => {
    setSelectedEmployee(employee);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleToggleStatus = (employee: Employee) => {
    const updated = employees.map(emp =>
      emp.id === employee.id
        ? { ...emp, status: emp.status === 'active' ? 'inactive' : 'active' }
        : emp
    );
    setEmployees(updated);
  };

  const handleResetPassword = (employee: Employee) => {
    const newPwd = generatePassword();
    const updated = employees.map(emp =>
      emp.id === employee.id ? { ...emp, password: newPwd } : emp
    );
    setEmployees(updated);
    alert(`Đã tạo mật khẩu mới cho ${employee.username}: ${newPwd}`);
  };

  const closeForm = () => {
    setShowForm(false);
    setIsEditMode(false);
    setSelectedEmployee(null);
  };

  const closeDetail = () => {
    setShowDetail(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QUẢN LÝ NHÂN VIÊN</h1>
          <p className="text-gray-600 mt-1">Danh sách nhân viên phòng khám thú y</p>
        </div>
        <button
          onClick={() => {
            setIsEditMode(false);
            setSelectedEmployee(null);
            setShowForm(true);
          }}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl flex items-center gap-2 font-medium"
        >
          + Thêm nhân viên
        </button>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Tìm theo tên, username, email, sđt..."
          className="flex-1 min-w-[250px] border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={e => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        {/* Số lượng: hiển thị số kết quả lọc + dropdown Vai trò */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Số lượng:</label>
          <span className="font-bold text-blue-600 text-lg min-w-[30px] text-center">
            {filteredCount}
          </span>
          <select
            className="border border-gray-300 rounded-2xl px-4 py-3 bg-white"
            value={roleFilter}
            onChange={e => {
              setRoleFilter(e.target.value as any);
              setCurrentPage(1);
            }}
          >
            <option value="all">Tất cả</option>
            <option value="Bác sĩ">Bác sĩ</option>
            <option value="Lễ tân">Lễ tân</option>
          </select>
        </div>

        <select
          className="border border-gray-300 rounded-2xl px-5 py-3 bg-white"
          value={statusFilter}
          onChange={e => {
            setStatusFilter(e.target.value as any);
            setCurrentPage(1);
          }}
        >
          <option value="all">Trạng thái: Tất cả</option>
          <option value="active">Còn làm</option>
          <option value="inactive">Nghỉ việc</option>
        </select>
      </div>

      {/* Bảng */}
      <EmployeeTable
        employees={paginatedEmployees}
        onView={handleView}
        onEdit={handleEditClick}
        onToggleStatus={handleToggleStatus}
        onResetPassword={handleResetPassword}
      />

      {/* Phân trang */}
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

      {/* Form Modal (Thêm / Cập nhật) - bấm ngoài để đóng */}
      {showForm && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={closeForm}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <EmployeeForm
              onSubmit={isEditMode ? handleEdit : handleAdd}
              onCancel={closeForm}
              initialData={selectedEmployee || undefined}
              isEdit={isEditMode}
            />
          </div>
        </div>
      )}

      {/* Detail Modal - bấm ngoài để đóng */}
      {showDetail && selectedEmployee && (
        <div
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
          onClick={closeDetail}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-2xl max-h-[95vh] overflow-auto"
            onClick={e => e.stopPropagation()}
          >
            <EmployeeDetail employee={selectedEmployee} onClose={closeDetail} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeManagement;