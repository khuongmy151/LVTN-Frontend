// src/routes/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import EmployeeManagement from '../features/employees/EmployeeManagement';
import ReportsManagement from '../features/reports/ReportsManagement';
import MedicineManagement from '../features/medicines/MedicineManagement';
import ServiceManagement from '../features/services/ServiceManagement';
import CustomerManagement from '../features/customers/CustomerManagement';
import PetManagement from '../features/pets/PetManagement';
import AppointmentManagement from '../features/appointments/AppointmentManagement';
import BillingManagement from '../features/billing/BillingManagement';
import PrescriptionManagement from '../features/prescriptions/PrescriptionManagement';
import CheckupManagement from '../features/checkup/CheckupManagement';
import InventoryManagement from '../features/inventory/InventoryManagement';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="p-8">
            <h1 className="text-4xl">Chào mừng đến với VetSystem</h1>
          </div>
        }
      />
      <Route path="/employees" element={<EmployeeManagement />} />
      <Route path="/reports" element={<ReportsManagement />} />
      <Route path="/medicines" element={<MedicineManagement />} />
      <Route path="/services" element={<ServiceManagement />} />
      <Route path="/customers" element={<CustomerManagement />} />
      <Route path="/appointments" element={<AppointmentManagement />} />
      <Route path="/prescriptions" element={<PrescriptionManagement />} />
      <Route path="/billing" element={<BillingManagement />} />
      <Route path="/pets" element={<PetManagement />} />
      <Route path="/checkup" element={<CheckupManagement />} />
      <Route path="/inventory" element={<InventoryManagement />} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  );
};

export default AppRoutes;