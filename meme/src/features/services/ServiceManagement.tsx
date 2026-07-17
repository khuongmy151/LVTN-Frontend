// src/features/services/ServiceManagement.tsx
import React, { useState, useMemo } from 'react';
import ServiceTable from './ServiceTable';
import ServiceForm from './ServiceForm';
import ServiceDescriptionModal from './ServiceDescriptionModal';
import type {
  Service,
  ServiceFormData,
  ServiceCategory,
  SortOption,
} from './types';

// ============ MOCK DATA ============
const mockServices: Service[] = [
  {
    id: 1,
    name: 'Khám bệnh',
    category: 'Khám',
    description:
      'Khám bệnh cơ bản cho thú cưng. Bao gồm kiểm tra tổng quát, nghe tim phổi, đo thân nhiệt, kiểm tra da lông và tư vấn sức khỏe.',
    price: 300000,
    status: 'active',
  },
  {
    id: 2,
    name: 'Siêu âm ổ bụng',
    category: 'Siêu âm',
    description:
      'Siêu âm kiểm tra các cơ quan nội tạng: gan, thận, bàng quang, tử cung. Phát hiện khối u, sỏi, dịch bất thường.',
    price: 500000,
    status: 'active',
  },
  {
    id: 3,
    name: 'Xét nghiệm máu tổng quát',
    category: 'Xét nghiệm',
    description:
      'Xét nghiệm CBC, sinh hóa máu 12 chỉ số. Đánh giá chức năng gan, thận, đường huyết, tình trạng viêm nhiễm.',
    price: 800000,
    status: 'active',
  },
  {
    id: 4,
    name: 'Tiêm phòng 5 bệnh chó',
    category: 'Tiêm phòng',
    description:
      'Vắc xin phòng 5 bệnh nguy hiểm: Care, Parvo, Viêm gan, Lepto, Dại. Lịch tiêm 3 mũi cho chó con.',
    price: 450000,
    status: 'active',
  },
  {
    id: 5,
    name: 'Triệt sản chó',
    category: 'Phẫu thuật',
    description:
      'Phẫu thuật triệt sản an toàn, gây mê hô hấp. Bao gồm tiền mê, phẫu thuật, thuốc hậu phẫu và tái khám.',
    price: 2500000,
    status: 'inactive',
  },
  {
    id: 6,
    name: 'Cạo vôi răng',
    category: 'Nha khoa',
    description: 'Lấy cao răng, đánh bóng răng bằng máy siêu âm. Gây mê nhẹ, an toàn cho thú cưng.',
    price: 700000,
    status: 'active',
  },
  {
    id: 7,
    name: 'Tắm & Cắt tỉa',
    category: 'Chăm sóc',
    description:
      'Tắm bằng sữa tắm chuyên dụng, sấy khô, cắt tỉa lông theo yêu cầu. Vệ sinh tai, cắt móng.',
    price: 350000,
    status: 'active',
  },
];

const CATEGORIES: ServiceCategory[] = [
  'Khám',
  'Siêu âm',
  'Xét nghiệm',
  'Tiêm phòng',
  'Phẫu thuật',
  'Chăm sóc',
  'Nha khoa',
  'Khác',
];

const ServiceManagement: React.FC = () => {
  const [services, setServices] = useState<Service[]>(mockServices);
  const [showForm, setShowForm] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Search & Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'all' | ServiceCategory>('all');
  const [sortOption, setSortOption] = useState<SortOption>('default');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);

  const filteredServices = useMemo(() => {
    let result = services.filter((svc) => {
      const matchesSearch =
        svc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        svc.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || svc.category === categoryFilter;
      return matchesSearch && matchesCategory;
    });

    // Sắp xếp theo giá
    switch (sortOption) {
      case 'price-asc':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
    }

    return result;
  }, [services, searchTerm, categoryFilter, sortOption]);

  // Phân trang
  const totalPages = Math.max(1, Math.ceil(filteredServices.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const paginatedServices = filteredServices.slice(
    (safeCurrentPage - 1) * pageSize,
    safeCurrentPage * pageSize
  );

  const handleAdd = (data: ServiceFormData) => {
    const newService: Service = {
      id: Date.now(),
      ...data,
      status: 'active',
    };
    setServices([...services, newService]);
    setShowForm(false);
    setCurrentPage(1);
  };

  const handleEdit = (data: ServiceFormData) => {
    if (!selectedService) return;
    const updated = services.map((svc) =>
      svc.id === selectedService.id ? { ...svc, ...data } : svc
    );
    setServices(updated);
    setShowForm(false);
    setSelectedService(null);
    setIsEditMode(false);
  };

  const handleEditClick = (service: Service) => {
    setSelectedService(service);
    setIsEditMode(true);
    setShowForm(true);
  };

  // Toggle Ngừng / Đang áp dụng
  const handleToggleStatus = (service: Service) => {
    const updated = services.map((svc) =>
      svc.id === service.id
        ? { ...svc, status: svc.status === 'active' ? 'inactive' : 'active' }
        : svc
    );
    setServices(updated);
  };

  const handleViewDescription = (service: Service) => {
    setSelectedService(service);
    setShowDescription(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Quản lý dịch vụ
        </h1>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 items-center">
        <label className="text-sm font-medium text-gray-700">Tìm kiếm:</label>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên dịch vụ, mô tả"
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
          <option value="default">Sắp xếp: Tất cả</option>
          <option value="price-asc">Sắp xếp giá từ bé đến lớn</option>
          <option value="price-desc">Sắp xếp giá từ lớn đến bé</option>
        </select>

        <button
          onClick={() => {
            setIsEditMode(false);
            setSelectedService(null);
            setShowForm(true);
          }}
          className="px-5 py-2.5 border-2 border-red-600 text-red-600 hover:bg-red-50 rounded-xl font-medium"
        >
          [ Thêm dịch vụ ]
        </button>
      </div>

      {/* Bảng */}
      <ServiceTable
        services={paginatedServices}
        onEdit={handleEditClick}
        onToggleStatus={handleToggleStatus}
        onViewDescription={handleViewDescription}
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
            <ServiceForm
              onSubmit={isEditMode ? handleEdit : handleAdd}
              onCancel={() => {
                setShowForm(false);
                setIsEditMode(false);
                setSelectedService(null);
              }}
              initialData={selectedService || undefined}
              isEdit={isEditMode}
            />
          </div>
        </div>
      )}

      {/* Modal Mô tả */}
      {showDescription && selectedService && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg">
            <ServiceDescriptionModal
              service={selectedService}
              onClose={() => setShowDescription(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceManagement;