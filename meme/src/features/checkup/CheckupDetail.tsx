// src/features/checkup/CheckupDetail.tsx
import React from 'react';
import type { Checkup } from './types';
import { Thermometer, Calendar, Activity, Stethoscope } from 'lucide-react';

interface CheckupDetailProps {
  checkup: Checkup;
  onClose: () => void;
  onUpdate: (maPhieuKham: string, updates: Partial<Checkup>) => void;
}

const CheckupDetail: React.FC<CheckupDetailProps> = ({
  checkup,
  onClose,
  onUpdate,
}) => {
  const getFeverStatus = (temp: number) => {
    if (temp >= 40) return { label: 'Sốt cao', color: 'text-red-600', bg: 'bg-red-50' };
    if (temp >= 39) return { label: 'Sốt', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (temp >= 38) return { label: 'Sốt nhẹ', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { label: 'Bình thường', color: 'text-emerald-600', bg: 'bg-emerald-50' };
  };

  const feverStatus = getFeverStatus(checkup.nhietDo);

  return (
    <div className="p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-rose-700 mb-2"> PHIẾU KHÁM BỆNH</h2>
        <div className="text-2xl font-bold text-gray-900">{checkup.maPhieuKham}</div>
        <div className="text-gray-500 mt-1">Ngày khám: {checkup.ngayTao}</div>
      </div>

      {/* Thông tin cơ bản */}
      <div className="grid grid-cols-2 gap-6 mb-6 bg-rose-50 rounded-2xl p-5">
        <div>
          <div className="text-sm text-gray-500 mb-1">📄 Mã lịch hẹn</div>
          <div className="font-semibold text-lg">{checkup.maLichHen}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">👨‍️ Bác sĩ khám</div>
          <div className="font-semibold">{checkup.tenBacSi}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">👤 Bệnh nhân (Chủ nuôi)</div>
          <div className="font-semibold">{checkup.tenChuNuoi}</div>
        </div>
        <div>
          <div className="text-sm text-gray-500 mb-1">🐾 Thú cưng</div>
          <div className="font-semibold">{checkup.tenThuCung} ({checkup.loaiThuCung})</div>
        </div>
      </div>

      {/* Triệu chứng & Chẩn đoán */}
      <div className="mb-6 space-y-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Activity size={20} className="text-rose-600" />
            <h3 className="text-lg font-bold text-gray-900">Triệu chứng</h3>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
            <p className="text-gray-700">{checkup.trieuChung}</p>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope size={20} className="text-rose-600" />
            <h3 className="text-lg font-bold text-gray-900">Chẩn đoán</h3>
          </div>
          <div className="bg-rose-100 p-4 rounded-2xl border border-rose-200">
            <p className="text-rose-900 font-semibold text-lg">{checkup.chanDoan}</p>
          </div>
        </div>
      </div>

      {/* Thông tin khám */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Thermometer size={20} className="text-rose-500" />
            <div className="text-sm text-gray-500">Nhiệt độ</div>
          </div>
          <div className={`text-3xl font-bold ${feverStatus.color}`}>
            {checkup.nhietDo}°C
          </div>
          <div className={`text-sm mt-1 px-2 py-1 rounded-full inline-block ${feverStatus.bg} ${feverStatus.color}`}>
            {feverStatus.label}
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-4">
          <div className="text-sm text-gray-500 mb-1">Căn năng lực khám</div>
          <div className="font-semibold text-lg text-gray-900">{checkup.canNangLucKham}</div>
        </div>

        {checkup.ngayTaiKham && (
          <div className="col-span-2 bg-white border border-gray-200 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Calendar size={20} className="text-blue-500" />
              <div className="text-sm text-gray-500">Ngày tái khám</div>
            </div>
            <div className="text-2xl font-bold text-blue-600">{checkup.ngayTaiKham}</div>
          </div>
        )}
      </div>

      {/* Ghi chú */}
      {checkup.ghiChu && (
        <div className="mb-6 bg-amber-50 rounded-2xl p-4">
          <div className="text-sm font-bold text-amber-700 mb-1">📝 Ghi chú</div>
          <div className="text-gray-700">{checkup.ghiChu}</div>
        </div>
      )}

      {/* Kết quả điều trị */}
      {checkup.ketQua && (
        <div className="mb-6 bg-emerald-50 rounded-2xl p-4">
          <div className="text-sm font-bold text-emerald-700 mb-1">✅ Kết quả điều trị</div>
          <div className="text-gray-700">{checkup.ketQua}</div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mt-8">
        {!checkup.ketQua && (
          <button
            onClick={() => onUpdate(checkup.maPhieuKham, { ketQua: 'Đang điều trị' })}
            className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-medium hover:bg-emerald-700"
          >
            Bắt đầu điều trị
          </button>
        )}
        {checkup.ketQua && (
          <button
            onClick={() => onUpdate(checkup.maPhieuKham, { ketQua: 'Đã khỏi' })}
            className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-medium hover:bg-blue-700"
          >
            Đánh dấu khỏi bệnh
          </button>
        )}
        <button
          onClick={onClose}
          className="px-6 py-3 border border-gray-300 rounded-2xl font-medium hover:bg-gray-50"
        >
          Đóng
        </button>
      </div>
    </div>
  );
};

export default CheckupDetail;