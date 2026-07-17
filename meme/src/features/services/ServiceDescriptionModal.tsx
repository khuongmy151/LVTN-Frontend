// src/features/services/ServiceDescriptionModal.tsx
import React from 'react';
import type { Service } from './types';

interface ServiceDescriptionModalProps {
  service: Service;
  onClose: () => void;
}

const formatMoney = (n: number) => n.toLocaleString('vi-VN') + ' đ';

const ServiceDescriptionModal: React.FC<ServiceDescriptionModalProps> = ({
  service,
  onClose,
}) => {
  return (
    <div className="p-8">
      {/* Tiêu đề */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-blue-700">Mô tả</h2>
        <div className="text-lg font-semibold text-gray-800 mt-2">
          &lt; {service.name} &gt;
        </div>
        <div className="mt-2">
          <span
            className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${
              service.status === 'active'
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-red-100 text-red-700'
            }`}
          >
            {service.status === 'active' ? 'Đang áp dụng' : 'Đã ngừng'}
          </span>
        </div>
      </div>

      {/* Thông tin giá & danh mục */}
      <div className="flex justify-center gap-6 mb-6">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Danh mục</div>
          <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 rounded-full font-semibold text-sm">
            {service.category}
          </span>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1">Giá</div>
          <div className="font-bold text-lg text-emerald-700">
            {formatMoney(service.price)}
          </div>
        </div>
      </div>

      {/* Nội dung mô tả */}
      <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100 min-h-[180px]">
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {service.description || 'Không có mô tả.'}
        </p>
      </div>

      {/* Nút đóng */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={onClose}
          className="px-8 py-3 border border-gray-300 rounded-xl font-medium hover:bg-gray-50 transition-colors"
        >
          [ Đóng ]
        </button>
      </div>
    </div>
  );
};

export default ServiceDescriptionModal;