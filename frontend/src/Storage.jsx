import { useEffect, useState } from "react";

function Storage() {

  const API_URL =
    "https://enterprise-ai-multi-cloud-orchestrator.onrender.com";

  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFiles = async () => {

    try {

      const response = await fetch(
        `${API_URL}/api/storage/files`
      );

      const data = await response.json();

      setFiles(data.files || []);

    } catch (error) {

      console.error(
        "Storage loading failed:",
        error
      );

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {

    loadFiles();

  }, []);

  const downloadFile = (fileName) => {

    const url =
      `${API_URL}/api/storage/download?object_key=${encodeURIComponent(fileName)}`;

    window.open(url, "_blank");
  };

  const deleteFile = async (fileName) => {

    const confirmDelete =
      window.confirm(
        `Delete "${fileName}"?`
      );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await fetch(
        `${API_URL}/api/storage/delete?object_key=${encodeURIComponent(fileName)}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(
          data.detail ||
          "Delete failed"
        );

        return;
      }

      alert("File deleted successfully");

      loadFiles();

    } catch (error) {

      alert(
        "Unable to delete file"
      );

      console.error(error);
    }
  };

  const formatSize = (bytes) => {

    if (!bytes) {
      return "0 B";
    }

    if (bytes < 1024) {
      return `${bytes} B`;
    }

    if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(2)} KB`;
    }

    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (

    <div className="storage-page">

      <div className="storage-header">

        <div>

          <h1>Storage</h1>

          <p>
            Manage files stored in your cloud storage.
          </p>

        </div>

        <button
          className="refresh-btn"
          onClick={loadFiles}
        >
          ↻ Refresh
        </button>

      </div>


      <div className="storage-summary">

        <div className="storage-card">

          <div className="storage-icon">
            ☁
          </div>

          <div>

            <h3>AWS S3</h3>

            <p>Connected Storage</p>

          </div>

        </div>


        <div className="storage-card">

          <div className="storage-icon">
            📁
          </div>

          <div>

            <h3>{files.length}</h3>

            <p>Total Files</p>

          </div>

        </div>


        <div className="storage-card">

          <div className="storage-icon">
            ✓
          </div>

          <div>

            <h3>Active</h3>

            <p>Storage Status</p>

          </div>

        </div>

      </div>


      <div className="storage-section">

        <div className="section-header">

          <div>

            <h2>Stored Files</h2>

            <p>
              Files currently available in AWS S3.
            </p>

          </div>

        </div>


        {loading ? (

          <div className="empty-storage">
            Loading files...
          </div>

        ) : files.length === 0 ? (

          <div className="empty-storage">

            <div className="empty-icon">
              📂
            </div>

            <h3>No files found</h3>

            <p>
              Upload a file from the Dashboard
              to see it here.
            </p>

          </div>

        ) : (

          <div className="table-container">

            <table>

              <thead>

                <tr>

                  <th>File Name</th>
                  <th>Size</th>
                  <th>Status</th>
                  <th>Last Modified</th>
                  <th>Actions</th>

                </tr>

              </thead>

              <tbody>

                {files.map(
                  (file, index) => (

                    <tr key={index}>

                      <td>
                        <div className="file-name">

                          <span className="file-icon">
                            📄
                          </span>

                          {file.file_name}

                        </div>
                      </td>

                      <td>
                        {formatSize(file.size)}
                      </td>

                      <td>

                        <span className="status-badge">
                          Available
                        </span>

                      </td>

                      <td>
                        {file.last_modified}
                      </td>

                      <td>

                        <div className="actions">

                          <button
                            className="download-btn"
                            onClick={() =>
                              downloadFile(
                                file.file_name
                              )
                            }
                          >
                            Download
                          </button>

                          <button
                            className="delete-btn"
                            onClick={() =>
                              deleteFile(
                                file.file_name
                              )
                            }
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      <style>{`

        .storage-page {
          padding: 30px;
          min-height: 100vh;
          background: #f6f8fc;
        }

        .storage-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .storage-header h1 {
          margin: 0;
          font-size: 32px;
          color: #172033;
        }

        .storage-header p {
          margin-top: 8px;
          color: #6b7280;
        }

        .refresh-btn {
          border: none;
          background: #172033;
          color: white;
          padding: 11px 18px;
          border-radius: 8px;
          cursor: pointer;
          font-size: 14px;
        }

        .refresh-btn:hover {
          opacity: 0.9;
        }

        .storage-summary {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 20px;
          margin-bottom: 30px;
        }

        .storage-card {
          background: white;
          border-radius: 14px;
          padding: 22px;
          display: flex;
          align-items: center;
          gap: 16px;
          box-shadow:
            0 4px 15px rgba(0,0,0,0.05);
        }

        .storage-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #eef2ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 23px;
        }

        .storage-card h3 {
          margin: 0;
          font-size: 20px;
          color: #172033;
        }

        .storage-card p {
          margin: 5px 0 0;
          color: #6b7280;
          font-size: 13px;
        }

        .storage-section {
          background: white;
          border-radius: 14px;
          padding: 25px;
          box-shadow:
            0 4px 15px rgba(0,0,0,0.05);
        }

        .section-header {
          margin-bottom: 20px;
        }

        .section-header h2 {
          margin: 0;
          color: #172033;
        }

        .section-header p {
          color: #6b7280;
          margin-top: 6px;
        }

        .table-container {
          width: 100%;
          overflow-x: auto;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          text-align: left;
          padding: 14px;
          background: #f8fafc;
          color: #475569;
          font-size: 13px;
        }

        td {
          padding: 15px 14px;
          border-bottom: 1px solid #edf0f5;
          color: #374151;
          font-size: 14px;
        }

        .file-name {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
        }

        .file-icon {
          font-size: 20px;
        }

        .status-badge {
          background: #dcfce7;
          color: #166534;
          padding: 5px 10px;
          border-radius: 20px;
          font-size: 12px;
        }

        .actions {
          display: flex;
          gap: 8px;
        }

        .download-btn,
        .delete-btn {
          border: none;
          padding: 7px 11px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 12px;
        }

        .download-btn {
          background: #e0e7ff;
          color: #3730a3;
        }

        .delete-btn {
          background: #fee2e2;
          color: #b91c1c;
        }

        .empty-storage {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .empty-icon {
          font-size: 45px;
          margin-bottom: 10px;
        }

        .empty-storage h3 {
          color: #374151;
          margin-bottom: 5px;
        }

        @media (max-width: 800px) {

          .storage-summary {
            grid-template-columns: 1fr;
          }

          .storage-header {
            align-items: flex-start;
            gap: 15px;
            flex-direction: column;
          }

          .storage-page {
            padding: 20px;
          }

        }

      `}</style>

    </div>
  );
}

export default Storage;