import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import DataTable from '../components/DataTable';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import ConfirmDeleteModal from '../components/ConfirmDeleteModal';
import { getEntities, deleteEntity } from '../services/adminApi';
import { Plus, Filter } from 'lucide-react';

const EntityListPage = () => {
  const { type } = useParams();
  const navigate = useNavigate();
  
  // State for data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState('');
  
  // State for tabs (if grouping)
  const [activeTab, setActiveTab] = useState('');
  
  // State for modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] = useState(null);

  // Define tabs based on route type
  const groupTabs = {
    'clinics-hospitals': [
      { id: 'clinics', label: 'Clinics' },
      { id: 'hospitals', label: 'Hospitals' }
    ],
    'ambulances': [
      { id: 'private-ambulances', label: 'Private Ambulances' },
      { id: 'hospital-ambulances', label: 'Hospital Ambulances' }
    ]
  };

  const isGrouped = groupTabs[type] !== undefined;

  useEffect(() => {
    if (isGrouped) {
      setActiveTab(groupTabs[type][0].id);
    } else {
      setActiveTab(type);
    }
    setPage(1);
    setSearch('');
  }, [type]);

  useEffect(() => {
    if (activeTab) {
      fetchData();
    }
  }, [activeTab, page, search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getEntities(activeTab, { page, limit: 10, search });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalRecords(response.data.totalRecords);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  const getColumns = () => {
    const common = [
      { header: 'ID', key: '_id', render: (row) => <span className="font-mono text-xs text-slate-400">{row._id.slice(-6).toUpperCase()}</span> },
      { header: 'Status', key: 'isActive', render: (row) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
          row.isActive !== false ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
        }`}>
          {row.isActive !== false ? 'Active' : 'Inactive'}
        </span>
      )}
    ];

    switch (activeTab) {
      case 'doctors':
      case 'online-doctors':
      case 'managers':
      case 'receptionists':
      case 'admins':
        return [
          ...common,
          { header: 'Name', key: 'name' },
          { header: 'Email', key: 'email' },
          { header: 'Phone', key: 'phone' },
        ];
      case 'clinics':
        return [
          ...common,
          { header: 'Clinic Name', key: 'clinicName' },
          { header: 'Admin Name', key: 'adminName' },
          { header: 'City', key: 'city' },
        ];
      case 'hospitals':
        return [
          ...common,
          { header: 'Hospital Name', key: 'hospitalname' },
          { header: 'Email', key: 'email' },
          { header: 'GST Number', key: 'gstnumber' },
        ];
      case 'medical-stores':
        return [
          ...common,
          { header: 'Store Name', key: 'storeName' },
          { header: 'Owner', key: 'ownerName' },
          { header: 'License', key: 'licenseNumber' },
        ];
      case 'private-ambulances':
      case 'hospital-ambulances':
        return [
          ...common,
          { header: 'Driver', key: 'driverName' },
          { header: 'Vehicle No', key: 'vehicleNumber' },
          { header: 'Phone', key: 'phone' },
        ];
      default:
        return common;
    }
  };

  const handleView = (row) => {
    navigate(`/admin/entities/${activeTab}/${row._id}`);
  };

  const handleDeleteClick = (row) => {
    setSelectedEntity(row);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await deleteEntity(activeTab, selectedEntity._id);
      setIsDeleteModalOpen(false);
      fetchData(); // Refresh list
    } catch (err) {
  console.error(err.response?.data || err);
  alert(err.response?.data?.error || 'Failed to deactivate');
}
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header title={type.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')} />
        
        <main className="p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-slate-800">
                {isGrouped ? 'Grouped Management' : 'List Management'}
              </h3>
              <p className="text-sm text-slate-500">Total {totalRecords} records found</p>
            </div>
            
            <div className="flex items-center gap-3">
              <SearchBar value={search} onChange={setSearch} />
              <button className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-sm transition-colors">
                <Filter size={20} />
              </button>
            </div>
          </div>

          {isGrouped && (
            <div className="flex gap-2 mb-6 bg-slate-200/50 p-1 rounded-2xl w-fit">
              {groupTabs[type].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-2 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id 
                      ? 'bg-white text-emerald-600 shadow-sm' 
                      : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          )}

          <DataTable 
            columns={getColumns()} 
            data={data} 
            loading={loading}
            onView={handleView}
            onDelete={handleDeleteClick}
          />

          <Pagination 
            currentPage={page} 
            totalPages={totalPages} 
            onPageChange={setPage} 
          />
        </main>
      </div>

      <ConfirmDeleteModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        entityName={activeTab.slice(0, -1)}
      />
    </div>
  );
};

export default EntityListPage;
