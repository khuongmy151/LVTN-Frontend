// src/features/pets/PetManagement.tsx
import React, { useState, useMemo } from 'react';
import PetTable from './PetTable';
import PetForm from './PetForm';
import PetDetail from './PetDetail';
import type { Pet, PetFormData, PetSpecies } from './types';

// Mock data mẫu (thay thế bằng data từ API)
const mockPets: Pet[] = [
  {
    ma_vat_nuoi: 1,
    ten: 'Mimi',
    loai: 'Chó',
    giong: 'Golden Retriever',
    gioi_tinh: 'Cái',
    ngay_sinh: '2020-03-15',
    can_nang: 28.5,
    mau_long: 'Vàng kem',
    ghi_chu: 'Hiền lành, thích chơi bóng',
    ma_khach_hang: 1,
    da_xoa: false,
    ngay_tao: '2024-01-15',
    ngay_cap_nhat: '2024-06-20',
    ten_khach_hang: 'Nguyễn Văn A',
    sdt_khach_hang: '0901234567',
  },
  {
    ma_vat_nuoi: 2,
    ten: 'Tom',
    loai: 'Mèo',
    giong: 'Mèo Anh lông ngắn',
    gioi_tinh: 'Đực',
    ngay_sinh: '2021-07-22',
    can_nang: 4.2,
    mau_long: 'Xám xanh',
    ghi_chu: 'Cần theo dõi sức khỏe định kỳ',
    ma_khach_hang: 2,
    da_xoa: false,
    ngay_tao: '2024-02-10',
    ngay_cap_nhat: '2024-06-25',
    ten_khach_hang: 'Trần Thị B',
    sdt_khach_hang: '0912345678',
  },
];

const PetManagement: React.FC = () => {
  const [pets, setPets] = useState<Pet[]>(mockPets);
  const [showForm, setShowForm] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedPet, setSelectedPet] = useState<Pet | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [loaiFilter, setLoaiFilter] = useState<'all' | PetSpecies>('all');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredPets = useMemo(() => {
    return pets.filter(pet => {
      const matchesSearch =
        pet.ten.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.giong.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pet.ma_khach_hang.toString().includes(searchTerm);

      const matchesLoai = loaiFilter === 'all' || pet.loai === loaiFilter;

      return matchesSearch && matchesLoai && !pet.da_xoa;
    });
  }, [pets, searchTerm, loaiFilter]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPets.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedPets = filteredPets.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  const handleAdd = (data: PetFormData) => {
    const newPet: Pet = {
      ...data,
      ma_vat_nuoi: Date.now(),
      da_xoa: false,
      ngay_tao: new Date().toISOString().split('T')[0],
    };
    setPets([...pets, newPet]);
    setShowForm(false);
    setCurrentPage(1);
  };

  const handleEdit = (data: PetFormData) => {
    if (!selectedPet) return;
    const updated = pets.map(pet =>
      pet.ma_vat_nuoi === selectedPet.ma_vat_nuoi
        ? { ...pet, ...data, ngay_cap_nhat: new Date().toISOString().split('T')[0] }
        : pet
    );
    setPets(updated);
    setShowForm(false);
    setSelectedPet(null);
    setIsEditMode(false);
  };

  const handleView = (pet: Pet) => {
    setSelectedPet(pet);
    setShowDetail(true);
  };

  const handleEditClick = (pet: Pet) => {
    setSelectedPet(pet);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (pet: Pet) => {
    if (window.confirm(`Bạn có chắc muốn xóa vật nuôi "${pet.ten}"?`)) {
      // Soft delete: set da_xoa = true
      const updated = pets.map(p =>
        p.ma_vat_nuoi === pet.ma_vat_nuoi ? { ...p, da_xoa: true } : p
      );
      setPets(updated);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">QUẢN LÝ VẬT NUÔI</h1>
          <p className="text-gray-600 mt-1">Danh sách vật nuôi của khách hàng</p>
        </div>
        <button
          onClick={() => { setIsEditMode(false); setShowForm(true); }}
          className="px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-2xl flex items-center gap-2 font-medium shadow-lg shadow-amber-200"
        >
          + Thêm vật nuôi
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Tổng vật nuôi</div>
          <div className="text-3xl font-bold text-gray-900">{pets.filter(p => !p.da_xoa).length}</div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Chó</div>
          <div className="text-3xl font-bold text-amber-600">
            {pets.filter(p => p.loai === 'Chó' && !p.da_xoa).length}
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="text-sm text-gray-500 mb-1">Mèo</div>
          <div className="text-3xl font-bold text-blue-600">
            {pets.filter(p => p.loai === 'Mèo' && !p.da_xoa).length}
          </div>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Tìm theo tên, giống, mã khách hàng..."
          className="flex-1 min-w-[250px] border border-gray-300 rounded-2xl px-5 py-3 focus:outline-none focus:border-amber-500"
          value={searchTerm}
          onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
        />
        <select
          className="border border-gray-300 rounded-2xl px-5 py-3"
          value={loaiFilter}
          onChange={(e) => { setLoaiFilter(e.target.value as any); setCurrentPage(1); }}
        >
          <option value="all">Tất cả loài</option>
          <option value="Chó">🐕 Chó</option>
          <option value="Mèo">🐈 Mèo</option>
          <option value="Chim">🦜 Chim</option>
          <option value="Thỏ">🐇 Thỏ</option>
          <option value="Khác">🐾 Khác</option>
        </select>
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
      <PetTable
        pets={paginatedPets}
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
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[95vh] overflow-auto">
            <PetForm
              onSubmit={isEditMode ? handleEdit : handleAdd}
              onCancel={() => { setShowForm(false); setIsEditMode(false); }}
              initialData={selectedPet || undefined}
              isEdit={isEditMode}
            />
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {showDetail && selectedPet && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[95vh] overflow-auto">
            <PetDetail
              pet={selectedPet}
              onClose={() => setShowDetail(false)}
              onEdit={handleEditClick}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PetManagement;