// src/features/services/ServiceTable.tsx
import React from 'react';
import type { Service } from './types';

interface ServiceTableProps {
  services: Service[];
  onEdit: (service: Service) => void;
  onToggleStatus: (service: Service) => void;
  onViewDescription: (service: Service) => void;
}

const formatMoney = (n: number) => n.toLocaleString('vi-VN') + ' đ';

const ServiceTable: React.FC<ServiceTableProps> = ({
  services,
  onEdit,
  onToggleStatus,
  onViewDescription,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                STT
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                Tên dịch vụ
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                Danh mục
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                Mô tả
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                Giá
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {services.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-gray-500">
                  Không có dữ liệu
                </td>
              </tr>
            ) : (
              services.map((svc, index) => {
                const isDescriptionLong = (svc.description || '').length > 30;

                return (
                  <tr
                    key={svc.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      svc.status === 'inactive' ? 'opacity-60' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-500">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {svc.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                        {svc.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 max-w-[200px]">
                      <span className="block truncate">
                        {svc.description || '-'}
                      </span>
                      {isDescriptionLong && (
                        <button
                          onClick={() => onViewDescription(svc)}
                          className="text-blue-600 hover:text-blue-700 text-xs font-medium mt-1"
                        >
                          (Xem thêm)
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                      {formatMoney(svc.price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <button
                          onClick={() => onEdit(svc)}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
                        >
                          Cập nhật
                        </button>
                        {svc.status === 'active' ? (
                          <button
                            onClick={() => onToggleStatus(svc)}
                            className="text-red-600 hover:text-red-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-red-50 transition-colors"
                          >
                            Ngừng
                          </button>
                        ) : (
                          <button
                            onClick={() => onToggleStatus(svc)}
                            className="text-emerald-600 hover:text-emerald-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-emerald-50 transition-colors"
                          >
                            Áp dụng lại
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ServiceTable;