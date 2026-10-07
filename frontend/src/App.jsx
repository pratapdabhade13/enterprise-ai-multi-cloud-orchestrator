import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [backendStatus, setBackendStatus] = useState("Checking...");
  const [providers, setProviders] = useState([]);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);

  const [storageFiles, setStorageFiles] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState("AWS");
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    loadDashboard();
    loadStorageFiles();
  }, []);

  async function loadDashboard() {
    try {
      const healthResponse = await fetch(`${API_URL}/health`);

      if (healthResponse.ok) {
        setBackendStatus("Healthy");
      } else {
        setBackendStatus("Offline");
      }

      const providerResponse = await fetch(
        `${API_URL}/api/cloud/providers`
      );

      const providerData = await providerResponse.json();
      setProviders(providerData.providers);

      const resourceResponse = await fetch(
        `${API_URL}/api/resources`
      );

      const resourceData = await resourceResponse.json();
      setResources(resourceData.resources);

    } catch (error) {
      setBackendStatus("Offline");
    }
  }

  async function loadStorageFiles() {
    try {
      const response = await fetch(
        `${API_URL}/api/storage/files`
      );

      if (!response.ok) {
        throw new Error("Storage files not found");
      }

      const data = await response.json();

      setStorageFiles(data.files);
    } catch (error) {
      console.log("Unable to load storage files");
    }
  }

  async function viewResource(resourceId) {
    try {
      const response = await fetch(
        `${API_URL}/api/resource/${resourceId}`
      );

      if (!response.ok) {
        throw new Error("Resource details not found");
      }

      const data = await response.json();

      setSelectedResource(data.resource);

    } catch (error) {
      alert("Unable to load resource details");
    }
  }

  function handleFileChange(event) {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(file);
      setUploadStatus("");
    }
  }

  async function uploadFile() {
    if (!selectedFile) {
      alert("Please select a file first.");
      return;
    }

    try {
      setUploadStatus("Uploading...");

      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("provider", selectedProvider);

      const response = await fetch(
        `${API_URL}/api/storage/upload`,
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Upload failed"
        );
      }

      setUploadStatus(
        `Uploaded successfully to ${selectedProvider}`
      );

      setSelectedFile(null);

      document.getElementById("fileInput").value = "";

      loadStorageFiles();

    } catch (error) {
      setUploadStatus(
        error.message || "Upload failed"
      );
    }
  }

  const awsResources = resources.filter(
    (resource) => resource.provider === "AWS"
  );

  const azureResources = resources.filter(
    (resource) => resource.provider === "Azure"
  );

  const gcpResources = resources.filter(
    (resource) => resource.provider === "Google Cloud"
  );

  return (
    <div className="app">

      {/* HEADER */}

      <header className="header">

        <div>
          <h1>
            Enterprise AI Multi-Cloud Orchestrator
          </h1>

          <p>
            AI-Powered Cloud Management Platform
          </p>
        </div>

        <div className="backend-status">
          <span
            className={
              backendStatus === "Healthy"
                ? "status-dot online"
                : "status-dot offline"
            }
          ></span>

          Backend: {backendStatus}
        </div>

      </header>


      {/* DASHBOARD */}

      <section className="dashboard-section">

        <h2>Cloud Dashboard</h2>

        <div className="cloud-cards">

          <div className="cloud-card">
            <h3>AWS</h3>

            <p className="cloud-count">
              {awsResources.length}
            </p>

            <p>Resources</p>

            <span>Amazon Web Services</span>
          </div>


          <div className="cloud-card">
            <h3>Azure</h3>

            <p className="cloud-count">
              {azureResources.length}
            </p>

            <p>Resources</p>

            <span>Microsoft Azure</span>
          </div>


          <div className="cloud-card">
            <h3>Google Cloud</h3>

            <p className="cloud-count">
              {gcpResources.length}
            </p>

            <p>Resources</p>

            <span>Google Cloud Platform</span>
          </div>

        </div>

      </section>


      {/* CLOUD PROVIDERS */}

      <section className="section">

        <h2>Connected Cloud Providers</h2>

        <div className="provider-list">

          {providers.map((provider) => (

            <div
              className="provider-item"
              key={provider}
            >
              <strong>{provider}</strong>

              <span>
                Connected
              </span>
            </div>

          ))}

        </div>

      </section>


      {/* RESOURCES */}

      <section className="section">

        <h2>Cloud Resources</h2>

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Provider</th>
                <th>Type</th>
                <th>Status</th>
                <th>Region</th>
                <th>Cost</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {resources.map((resource) => (

                <tr key={resource.id}>

                  <td>
                    {resource.id}
                  </td>

                  <td>
                    {resource.name}
                  </td>

                  <td>
                    {resource.provider}
                  </td>

                  <td>
                    {resource.type}
                  </td>

                  <td>
                    <span className="resource-status">
                      {resource.status}
                    </span>
                  </td>

                  <td>
                    {resource.region}
                  </td>

                  <td>
                    {resource.cost}
                  </td>

                  <td>

                    <button
                      className="view-button"
                      onClick={() =>
                        viewResource(resource.id)
                      }
                    >
                      View Details
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </section>


      {/* RESOURCE DETAILS */}

      {selectedResource && (

        <section className="section">

          <h2>Resource Details</h2>

          <div className="resource-details">

            <p>
              <strong>Resource ID:</strong>{" "}
              {selectedResource.id}
            </p>

            <p>
              <strong>Name:</strong>{" "}
              {selectedResource.name}
            </p>

            <p>
              <strong>Provider:</strong>{" "}
              {selectedResource.provider}
            </p>

            <p>
              <strong>Type:</strong>{" "}
              {selectedResource.type}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {selectedResource.status}
            </p>

            <p>
              <strong>Region:</strong>{" "}
              {selectedResource.region}
            </p>

            {selectedResource.cpu && (
              <p>
                <strong>CPU:</strong>{" "}
                {selectedResource.cpu}
              </p>
            )}

            {selectedResource.memory && (
              <p>
                <strong>Memory:</strong>{" "}
                {selectedResource.memory}
              </p>
            )}

            {selectedResource.storage && (
              <p>
                <strong>Storage:</strong>{" "}
                {selectedResource.storage}
              </p>
            )}

            <p>
              <strong>Estimated Cost:</strong>{" "}
              {selectedResource.cost}
            </p>

          </div>

        </section>

      )}


      {/* STORAGE */}

      <section className="section">

        <h2>Cloud Storage</h2>

        <div className="storage-panel">

          <h3>Upload File</h3>

          <p>
            Select a cloud provider and upload
            your file to the orchestrator.
          </p>


          <div className="storage-controls">

            <select
              value={selectedProvider}
              onChange={(event) =>
                setSelectedProvider(
                  event.target.value
                )
              }
            >

              <option value="AWS">
                AWS
              </option>

              <option value="Azure">
                Azure
              </option>

              <option value="Google Cloud">
                Google Cloud
              </option>

            </select>


            <input
              id="fileInput"
              type="file"
              onChange={handleFileChange}
            />


            <button
              className="upload-button"
              onClick={uploadFile}
            >
              Upload File
            </button>

          </div>


          {selectedFile && (

            <p className="selected-file">
              Selected File:{" "}
              <strong>
                {selectedFile.name}
              </strong>
            </p>

          )}


          {uploadStatus && (

            <p className="upload-status">
              {uploadStatus}
            </p>

          )}

        </div>


        {/* STORAGE FILE LIST */}

        <div className="storage-list">

          <h3>
            Stored Files
          </h3>

          {storageFiles.length === 0 ? (

            <p>
              No files uploaded yet.
            </p>

          ) : (

            <div className="table-container">

              <table>

                <thead>

                  <tr>
                    <th>File Name</th>
                    <th>Size</th>
                    <th>Status</th>
                  </tr>

                </thead>

                <tbody>

                  {storageFiles.map(
                    (file, index) => (

                      <tr key={index}>

                        <td>
                          {file.file_name}
                        </td>

                        <td>
                          {file.size} bytes
                        </td>

                        <td>
                          {file.status}
                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          )}

        </div>

      </section>


      {/* AI ADVISOR */}

      <section className="section">

        <h2>AI Advisor</h2>

        <div className="ai-advisor">

          <h3>
            Intelligent Cloud Recommendation
          </h3>

          <p>
            The AI Orchestrator can analyze
            cloud resources, storage usage,
            performance and estimated cost
            to recommend the most suitable
            cloud provider.
          </p>

          <div className="recommendation">

            <strong>
              Current Recommendation:
            </strong>

            <p>
              Google Cloud shows the lowest
              estimated monthly cost among
              the sample compute resources.
            </p>

          </div>

        </div>

      </section>


      {/* PERFORMANCE */}

      <section className="section">

        <h2>Cloud Performance</h2>

        <div className="performance-card">

          <div>
            <h3>System Availability</h3>
            <p>99.9%</p>
          </div>

          <div>
            <h3>Active Resources</h3>
            <p>{resources.length}</p>
          </div>

          <div>
            <h3>Cloud Providers</h3>
            <p>{providers.length}</p>
          </div>

          <div>
            <h3>Stored Files</h3>
            <p>{storageFiles.length}</p>
          </div>

        </div>

      </section>


      {/* FOOTER */}

      <footer>

        <p>
          Enterprise AI Multi-Cloud Orchestrator
        </p>

        <p>
          AI • AWS • Azure • Google Cloud
        </p>

      </footer>

    </div>
  );
}

export default App;