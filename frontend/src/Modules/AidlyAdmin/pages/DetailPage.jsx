import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { getEntityDetail, deleteEntity } from "../services/adminApi";

const DetailPage = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchDetail();
  }, [id, type]);

  const fetchDetail = async () => {
    setLoading(true);
    try {
      const response = await getEntityDetail(type, id);
      setData(response.data);
    } catch (err) {
      console.error("Failed to fetch detail", err);
      setMessage({ type: "error", text: "Failed to load record details" });
    } finally {
      setLoading(false);
    }
  };

 const handleDelete = async () => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this record?"
  );

  if (!confirmDelete) return;

  setDeleting(true);

  try {
    await deleteEntity(type, id);

    navigate("/admin/success", {
  state: {
    entityType: type,
  },
});

  } catch (err) {
    console.error("Delete failed:", err);

    setMessage({
      type: "error",
      text: "Failed to delete record",
    });

    setDeleting(false);
  }
};

  if (loading) {
    return (
      <Layout>
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      </Layout>
    );
  }

  if (!data)
    return (
      <Layout>
        <div className="text-center text-gray-500">No data found</div>
      </Layout>
    );

  const isImageField = (fieldName) => {
    const imageFields = [
      "photo",
      "clinicLogo",
      "profilePhoto",
      "image",
      "avatar",
    ];
    return imageFields.some((f) => fieldName.toLowerCase().includes(f));
  };

  const isDocumentField = (fieldName) => {
    const documentFields = [
      "aadhaarDocument",
      "panDocument",
      "licenseDocument",
      "experienceCertificate",
      "qualificationCertificate",
      "document",
      "certificate",
      "license",
      "aadhaar",
      "pan",
      "registration",
    ];
    return documentFields.some((f) => fieldName.toLowerCase().includes(f));
  };

  const isUrl = (str) => {
    if (!str || typeof str !== "string") return false;
    return (
      str.startsWith("http") ||
      str.includes("://") ||
      str.startsWith("/uploads")
    );
  };

  const renderValue = (value) => {
    if (value === null || value === undefined || value === "") return "N/A";
    if (typeof value === "boolean") return value ? "Yes" : "No";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const textFields = {};
  const imageFields = {};
  const documentFields = {};

  Object.entries(data).forEach(([key, value]) => {
    if (isImageField(key) && isUrl(value)) {
      imageFields[key] = value;
    } else if (isDocumentField(key) && isUrl(value)) {
      documentFields[key] = value;
    } else if (key !== "_id") {
      textFields[key] = value;
    }
  });

  return (
    <Layout>
      <div className="bg-white rounded-[10px] p-12 max-w-4xl mx-auto shadow-2xl relative min-h-[600px]">
        <button
          onClick={handleDelete}
          disabled={deleting}
          className="absolute top-8 right-8 bg-[#1D7AFC] text-white px-6 py-2 rounded-full font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md flex items-center gap-2"
        >
          {deleting ? "Deleting..." : "Delete Data"}
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </button>

        {message && (
          <div
            className={`absolute top-8 left-8 px-4 py-2 rounded-md text-sm font-bold ${
              message.type === "success"
                ? "bg-green-100 text-green-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-8 mt-10">
          <h2 className="text-3xl font-bold text-[#1A5F48] mb-8">
            Record Details
          </h2>

          {Object.entries(textFields).map(([key, value]) => (
            <DataRow
              key={key}
              label={formatLabel(key)}
              value={renderValue(value)}
              isLink={key === "email"}
            />
          ))}

          {Object.keys(imageFields).length > 0 && (
            <div className="pt-8 border-t border-gray-100 space-y-6">
              <h3 className="text-xl font-bold text-[#1A5F48]">Images</h3>
              {Object.entries(imageFields).map(([key, value]) => (
                <ImagePreviewRow
                  key={key}
                  label={formatLabel(key)}
                  url={value}
                />
              ))}
            </div>
          )}

          {Object.keys(documentFields).length > 0 && (
            <div className="pt-8 border-t border-gray-100 space-y-6">
              <h3 className="text-xl font-bold text-[#1A5F48]">Documents</h3>
              {Object.entries(documentFields).map(([key, value]) => (
                <DocumentPreviewRow
                  key={key}
                  label={formatLabel(key)}
                  url={value}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

const formatLabel = (key) => {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .replace(/\b_/g, " ")
    .trim();
};

const DataRow = ({ label, value, isLink }) => (
  <div className="flex gap-4 items-baseline">
    <span className="text-2xl font-bold text-black min-w-[250px]">
      {label}:
    </span>
    <span
      className={`text-2xl font-medium ${isLink ? "text-[#1D7AFC] cursor-pointer hover:underline" : "text-black"}`}
    >
      {value}
    </span>
  </div>
);

const ImagePreviewRow = ({ label, url }) => (
  <div className="flex flex-col gap-3">
    <span className="text-xl font-bold text-black">{label}:</span>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block"
    >
      <img
        src={url}
        alt={label}
        className="max-w-xs h-auto rounded-md border border-gray-200 hover:shadow-md transition-shadow"
        onError={(e) => {
          e.target.src =
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23ddd" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="14" fill="%23999"%3EImage not found%3C/text%3E%3C/svg%3E';
        }}
      />
    </a>
  </div>
);

const DocumentPreviewRow = ({ label, url }) => (
  <div className="flex gap-4 items-center">
    <span className="text-xl font-bold text-black min-w-[250px]">{label}:</span>
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 py-2 bg-[#1D7AFC] text-white rounded-md font-bold hover:bg-blue-600 transition-all text-sm"
    >
      View Document
    </a>
  </div>
);

export default DetailPage;
