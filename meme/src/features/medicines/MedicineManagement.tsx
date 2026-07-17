// src/features/medicines/MedicineManagement.tsx
import React, { useState, useMemo } from 'react';
import MedicineTable from './MedicineTable';
import MedicineForm from './MedicineForm';
import MedicineDescriptionModal from './MedicineDescriptionModal';
import MedicineBatchModal from './MedicineBatchModal';
import type {
  Medicine,
  MedicineFormData,
  MedicineUpdateData,
  MedicineBatch,
  MedicineCategory,
  SortOption,
} from './types';

// ============ MOCK DATA ============
const mockMedicines: Medicine[] = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Giảm đau',
    description:
      'Hạ sốt, giảm đau nhẹ đến vừa. Dùng trong các trường hợp đau đầu, đau răng, đau cơ, hạ sốt ở trẻ em và người lớn. Chống chỉ định với người suy gan nặng.',
    unit: 'Viên',
    price: 15000,
    stock: 1500,
    minStock: 200,
    batches: [
      { id: 1, medicineId: 1, batchCode: 'Lô 001', stock: 500, expiryDate: '2026-08-20' },
      { id: 2, medicineId: 1, batchCode: 'Lô 002', stock: 1000, expiryDate: '2030-12-28' },
    ],
  },
  {
    id: 2,
    name: 'Amoxicillin 250mg',
    category: 'Kháng sinh',
    description:
      'Điều trị nhiễm khuẩn đường hô hấp, tiết niệu, da và mô mềm. Kháng sinh nhóm beta-lactam, phổ rộng.',
    unit: 'Gói',
    price: 17000,
    stock: 50,
    minStock: 100,
    batches: [
      { id: 3, medicineId: 2, batchCode: 'Lô 001', stock: 50, expiryDate: '2026-11-15' },
    ],
  },
  {
    id: 3,
    name: 'Ivermectin 1%',
    category: 'Tẩy giun',
    description: 'Thuốc tẩy giun sán, ve rận cho chó mèo. Dạng tiêm dưới da.',
    unit: 'Ống',
    price: 45000,
    stock: 120,
    minStock: 30,
    batches: [
      { id: 4, medicineId: 3, batchCode: 'Lô 001', stock: 120, expiryDate: '2027-03-10' },
    ],
  },
  {
    id: 4,
    name: 'Vitamin B Complex',
    category: 'Vitamin',
    description: 'Bổ sung vitamin nhóm B, hỗ trợ phục hồi sức khỏe, kích thích ăn ngon.',
    unit: 'Lọ',
    price: 85000,
    stock: 30,
    minStock: 20,
    batches: [
      { id: 5, medicineId: 4, batchCode: 'Lô 001', stock: 30, expiryDate: '2027-06-01' },
    ],
  },
];

const CATEGORIES: MedicineCategory[] = [
  'Giảm đau',
  'Kháng sinh',
  'Kháng viêm',
  'Vitamin',
  'Tẩy giun',
  'Sát trùng',
  'Khác',
];

const MedicineManagement: React.FC = () => {
  const [medicines, setMedicines] = useState<Medicine[]>(mockMedicines);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);

  // Modal states
  const [showDescription, setShowDescription] = useState(false);
  const [showBatchModal, setShowBatchModal] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | MedicineCategory>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const filteredMedicines = useMemo(() => {
    let result = medicines.filter((med) => {
      const matchesSearch =
        med.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        med.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        categoryFilter === 'all' || med.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    // Sắp xếp
    switch (sortOption) {
      case 'stock-asc':
        result = [...result].sort((a, b) => a.stock - b.stock);
        break;
      case 'stock-desc':
        result = [...result].sort((a, b) => b.stock - a.stock);
        break;
      case 'min-stock-asc':
        result = [...result].sort((a, b) => a.minStock - b.minStock);
        break;
      case 'min-stock-desc':
        result = [...result].sort((a, b) => b.minStock - a.minStock);
        break;
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [medicines, searchTerm, categoryFilter, sortOption]);

  // Phân trang
  const totalPages = Math.max(1, Math.ceil(filteredMedicines.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedMedicines = filteredMedicines.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  const handleAdd = (data: MedicineFormData) => {
    const newMedicine: Medicine = {
      id: Date.now(),
      ...data,
      batches: [
        {
          id: Date.now() + 1,
          medicineId: Date.now(),
          batchCode: 'Lô 001',
          stock: data.stock,
          expiryDate: '',
        },
      ],
    };
    setMedicines([...medicines, newMedicine]);
    setShowForm(false);
    setCurrentPage(1);
  };

  const handleEdit = (data: MedicineUpdateData) => {
    if (!selectedMedicine) return;
    const updated = medicines.map((med) =>
      med.id === selectedMedicine.id ? { ...med, ...data } : med
    );
    setMedicines(updated);
    setShowForm(false);
    setSelectedMedicine(null);
    setIsEditMode(false);
  };

  const handleEditClick = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDelete = (medicine: Medicine) => {
    if (!confirm(`Bạn có chắc muốn xóa thuốc "${medicine.name}"?`)) return;
    setMedicines(medicines.filter((m) => m.id !== medicine.id));
  };

  const handleViewDescription = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setShowDescription(true);
  };

  const handleViewBatches = (medicine: Medicine) => {
    setSelectedMedicine(medicine);
    setShowBatchModal(true);
  };

  const handleAddBatch = (medicineId: number, batch: MedicineBatch) => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id !== medicineId) return med;
        const newBatches = [...(med.batches || []), batch];
        const newStock = newBatches.reduce((sum, b) => sum + b.stock, 0);
        return { ...med, batches: newBatches, stock: newStock };
      })
    );
  };

  const handleDeleteBatch = (medicineId: number, batchId: number) => {
    setMedicines((prev) =>
      prev.map((med) => {
        if (med.id !== medicineId) return med;
        const newBatches = (med.batches || []).filter((b) => b.id !== batchId);
        const newStock = newBatches.reduce((sum, b) => sum + b.stock, 0);
        return { ...med, batches: newBatches, stock: newStock };
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Quản lý thuốc
        </h1>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 items-center">
        <label className="text-sm font-medium text-gray-700">Tìm kiếm</label>
        <input
          type="text"
          placeholder="Tìm theo tên thuốc, mô tả"
          className="flex-1 min-w-[250px] border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:border-blue-500"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          className="border border-gray-300 rounded-xl px-4 py-2.5"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value as any);
            setCurrentPage(1);
          }}
        >
          <option value="all">Danh mục: Tất cả</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="border border-gray-300 rounded-xl px-4 py-2.5"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
        >
          <option value="default">Sắp xếp: Mặc định</option>
          <option value="stock-asc">Tồn kho từ bé đến lớn</option>
          <option value="stock-desc">Tồn kho từ lớn đến bé</option>
          <option value="min-stock-asc">Tồn tối thiểu từ bé đến lớn</option>
          <option value="min-stock-desc">Tồn tối thiểu từ lớn đến bé</option>
          <option value="price-asc">Giá từ bé đến lớn</option>
          <option value="price-desc">Giá từ lớn đến bé</option>
        </select>

        <button
          onClick={() => {
            setIsEditMode(false);
            setSelectedMedicine(null);
            setShowForm(true);
          }}
          className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium"
        >
          Thêm thuốc
        </button>
      </div>

      {/* Số lượng thuốc */}
      <div className="text-sm text-gray-600">
        Số lượng thuốc:{' '}
        <span className="font-semibold text-gray-900">
          {filteredMedicines.length}
        </span>
      </div>

      {/* Bảng */}
      <MedicineTable
        medicines={paginatedMedicines}
        onEdit={handleEditClick}
        onDelete={handleDelete}
        onViewDescription={handleViewDescription}
        onViewBatches={handleViewBatches}
      />

      {/* Phân trang */}
      <div className="flex justify-center items-center gap-3 text-sm">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={safeCurrentPage === 1}
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          &lt;&lt; Trước
        </button>
        <span className="text-gray-700 font-medium">
          Trang {safeCurrentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={safeCurrentPage === totalPages}
          className="px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Sau &gt;&gt;
        </button>
      </div>

      {/* Form Modal (Thêm / Cập nhật) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-xl max-h-[95vh] overflow-auto">
            <MedicineForm
              onSubmit={isEditMode ? handleEdit : handleAdd}
              onCancel={() => {
                setShowForm(false);
                setIsEditMode(false);
                setSelectedMedicine(null);
              }}
              initialData={selectedMedicine || undefined}
              isEdit={isEditMode}
            />
          </div>
        </div>
      )}

      {/* Modal Mô tả */}
      {showDescription && selectedMedicine && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <MedicineDescriptionModal
              medicine={selectedMedicine}
              onClose={() => setShowDescription(false)}
            />
          </div>
        </div>
      )}

      {/* Modal Lô thuốc */}
      {showBatchModal && selectedMedicine && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] overflow-auto">
            <MedicineBatchModal
              medicine={selectedMedicine}
              onClose={() => setShowBatchModal(false)}
              onAddBatch={handleAddBatch}
              onDeleteBatch={handleDeleteBatch}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MedicineManagement;