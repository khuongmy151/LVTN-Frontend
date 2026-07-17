// src/features/checkup/CheckupTable.tsx
import React from 'react';
import type { Checkup } from './types';
import { Thermometer } from 'lucide-react';

interface CheckupTableProps {
  checkups: Checkup[];
  onView: (checkup: Checkup) => void;
  onUpdate: (maPhieuKham: string, updates: Partial<Checkup>) => void;
}

const CheckupTable: React.FC<CheckupTableProps> = ({
  checkups,
  onView,
  onUpdate,
}) => {
  const getFeverStatus = (temp: number) => {
    if (temp >= 40) return { label: 'Sốt cao', color: 'bg-red-100 text-red-700' };
    if (temp >= 39) return { label: 'Sốt', color: 'bg-orange-100 text-orange-700' };
    if (temp >= 38) return { label: 'Sốt nhẹ', color: 'bg-yellow-100 text-yellow-700' };
    return { label: 'Bình thường', color: 'bg-emerald-100 text-emerald-700' };
  };

  return (
    <div className="bg-white rounded-3xl shadow overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">STT</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Mã PK</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Ngày khám</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Mã LH</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Bệnh nhân</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Thú cưng</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Bác sĩ</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Nhiệt độ</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Chẩn đoán</th>
            <th className="px-6 py-5 text-left text-xs font-medium text-gray-500 uppercase">Hành động</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {checkups.length === 0 ? (
            <tr>
              <td colSpan={10} className="px-6 py-10 text-center text-gray-500">
                Không có phiếu khám nào
              </td>
            </tr>
          ) : (
            checkups.map((checkup, index) => {
              const feverStatus = getFeverStatus(checkup.nhietDo);
              return (
                <tr key={checkup.maPhieuKham} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-5 text-sm font-medium text-gray-500">{index + 1}</td>
                  <td className="px-6 py-5 font-semibold text-rose-600">{checkup.maPhieuKham}</td>
                  <td className="px-6 py-5 text-sm text-gray-600">{checkup.ngayTao}</td>
                  <td className="px-6 py-5 text-sm text-gray-600">{checkup.maLichHen}</td>
                  <td className="px-6 py-5">
                    <div className="font-medium text-gray-900">{checkup.tenBenhNhan}</div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="font-medium text-gray-900">{checkup.tenThuCung}</div>
                    <div className="text-xs text-gray-500">{checkup.loaiThuCung}</div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-600">{checkup.tenBacSi}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Thermometer size={16} className="text-rose-500" />
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${feverStatus.color}`}>
                        {checkup.nhietDo}°C
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-700 max-w-xs truncate" title={checkup.chanDoan}>
                    {checkup.chanDoan}
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-wrap gap-1">
                      <button
                        onClick={() => onView(checkup)}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-blue-50"
                      >
                        Xem
                      </button>
                      {!checkup.ketQua && (
                        <button
                          onClick={() => onUpdate(checkup.maPhieuKham, { ketQua: 'Đang điều trị' })}
                          className="text-emerald-600 hover:text-emerald-700 font-medium text-sm px-2 py-1 rounded-lg hover:bg-emerald-50"
                        >
                          Bắt đầu ĐTrị
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
  );
};

export default CheckupTable;