import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './page/Dashboard';
import KhachHang from './page/HoSoDienTu/KhachHang';
import VatNuoi from './page/HoSoDienTu/VatNuoi';
import HomNay from './page/DatLichHen/HomNay';
import QuanLyLichHen from './page/DatLichHen/QuanLyLichHen';
import BlockLichHen from './page/DatLichHen/BlockLichHen';
import PhieuChiDinh from './page/KhamBenh/PhieuChiDinh';
import DonThuocPage from './page/KhamBenh/DonThuocPage';
import HoaDonPage from './page/ThuChi/HoaDonPage';
import PhieuThuChi from './page/ThuChi/PhieuThuChi';
import ThuocVatTu from './page/ThuocVatTu/ThuocVatTu';
import NhapKho from './page/ThuocVatTu/NhapKho';
import ThongKeTongHop from './page/BaoCaoThongKe/ThongKeTongHop';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/khach-hang" element={<KhachHang />} />
            <Route path="/vat-nuoi" element={<VatNuoi />} />
            <Route path="/lich-hen/hom-nay" element={<HomNay />} />
            <Route path="/lich-hen/quan-ly" element={<QuanLyLichHen />} />
            <Route path="/lich-hen/block" element={<BlockLichHen />} />
            <Route path="/kham-benh/phieu-chi-dinh" element={<PhieuChiDinh />} />
            <Route path="/kham-benh/don-thuoc" element={<DonThuocPage />} />
            <Route path="/thu-chi/hoa-don" element={<HoaDonPage />} />
            <Route path="/thu-chi/phieu-thu-chi" element={<PhieuThuChi />} />
            <Route path="/thuoc-vat-tu" element={<ThuocVatTu />} />
            <Route path="/thuoc-vat-tu/nhap-kho" element={<NhapKho />} />
            <Route path="/bao-cao/thong-ke" element={<ThongKeTongHop />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;