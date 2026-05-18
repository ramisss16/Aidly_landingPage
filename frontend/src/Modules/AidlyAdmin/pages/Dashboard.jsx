import React, { useEffect, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import TopTabs from "../components/TopTabs";
import DataTable from "../components/DataTable";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { getEntities } from "../services/adminApi";


const Dashboard = () => {
  const { type } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const isMainDashboard = location.pathname === "/admin/dashboard";
  const effectiveType = isMainDashboard ? "clinics-hospitals" : type;

  const [activeTab, setActiveTab] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [search, setSearch] = useState("");


  const tabConfigs = {
    "clinics-hospitals": [
      { id: "admins", label: "Admin Data" },
      { id: "managers", label: "Manager Data" },
      { id: "doctors", label: "Doctor Data" },
      { id: "receptionists", label: "Receptionist Data" },
    ],
    ambulances: [
      { id: "hospital-ambulances", label: "Hospital Ambulance Data" },
      { id: "private-ambulances", label: "Private Ambulance Data" },
    ],
    "online-doctors": [{ id: "online-doctors", label: "Online Doctor Data" }],
    "medical-stores": [{ id: "medical-stores", label: "Medical Store Data" }],
    dashboard: [
      { id: "admins", label: "Admin Data" },
      { id: "managers", label: "Manager Data" },
      { id: "doctors", label: "Doctor Data" },
      { id: "receptionists", label: "Receptionist Data" },
    ],
  };

  const currentTabs = tabConfigs[effectiveType] || [];

  useEffect(() => {
    if (currentTabs.length > 0) {
      setActiveTab(currentTabs[0].id);
    } else {
      setActiveTab(effectiveType);
    }
    setPage(1);
    setSearch("");
  }, [effectiveType]);

  useEffect(() => {
    if (activeTab) {
      fetchData();
    }
  }, [activeTab, page, search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getEntities(activeTab, {
        page,
        limit: 10,
        search,
      });
      setData(response.data.data);
      setTotalPages(response.data.totalPages);
      setTotalRecords(response.data.totalRecords);
    } catch (err) {
      console.error("Failed to fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  const getColumns = () => {
    return [
      {
        header: "#",
        key: "id",
        render: (_, rowIndex) => (page - 1) * 10 + rowIndex + 1,
      },
      {
        header: "Name",
        key: "name",
        render: (row) =>
          row.name ||
          row.clinicName ||
          row.hospitalname ||
          row.storeName ||
          row.driverName ||
          "N/A",
      },
      {
        header: "Contact Number",
        key: "phone",
        render: (row) => row.phone || row.mobile1 || "N/A",
      },
      {
        header: "Email Address",
        key: "email",
        render: (row) => row.email || "N/A",
      },
    ];
  };

  const handleView = (row) => {
    navigate(`/admin/entities/${activeTab}/${row._id}`);
  };

  return (
    <Layout>
      <div className="flex flex-col h-full max-w-[1100px]">
        {currentTabs.length > 1 && (
          <TopTabs
            tabs={currentTabs}
            activeTab={activeTab}
            onTabChange={(id) => {
              setActiveTab(id);
              setPage(1);
            }}
          />
        )}

        <div className="flex flex-col flex-1">
          <div className="flex justify-between items-center mb-2">
            <SearchBar value={search} onChange={setSearch} />
          </div>

          <DataTable
            columns={getColumns()}
            data={data}
            loading={loading}
            onView={handleView}
          />

          <div className="flex justify-between items-center pt-4">
            <div className="text-gray-400 font-bold text-[11px] uppercase tracking-tighter">
              Showing {Math.min((page - 1) * 10 + 1, totalRecords)} to{" "}
              {Math.min(page * 10, totalRecords)} of {totalRecords} entries
            </div>
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
