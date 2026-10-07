import { useState } from "react";

function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const saveSettings = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div className="settings-page">

      <div className="settings-header">
        <div>
          <h1>Settings</h1>
          <p>
            Manage your orchestrator preferences and system configuration.
          </p>
        </div>

        <button
          className="save-settings-btn"
          onClick={saveSettings}
        >
          Save Settings
        </button>
      </div>

      {/* General Settings */}
      <div className="settings-section">

        <div className="settings-section-title">
          <h2>General Settings</h2>
          <p>Configure basic platform behavior.</p>
        </div>

        <div className="setting-row">

          <div className="setting-info">
            <h3>Automatic Refresh</h3>
            <p>
              Automatically refresh cloud resource information.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={() =>
                setAutoRefresh(!autoRefresh)
              }
            />
            <span className="slider"></span>
          </label>

        </div>

        <div className="setting-row">

          <div className="setting-info">
            <h3>Dark Mode</h3>
            <p>
              Enable dark appearance for the dashboard.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={() =>
                setDarkMode(!darkMode)
              }
            />
            <span className="slider"></span>
          </label>

        </div>

      </div>

      {/* Notifications */}
      <div className="settings-section">

        <div className="settings-section-title">
          <h2>Notifications</h2>
          <p>Control system alerts and notifications.</p>
        </div>

        <div className="setting-row">

          <div className="setting-info">
            <h3>System Notifications</h3>
            <p>
              Receive notifications about infrastructure events.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={notifications}
              onChange={() =>
                setNotifications(!notifications)
              }
            />
            <span className="slider"></span>
          </label>

        </div>

      </div>

      {/* AI Settings */}
      <div className="settings-section">

        <div className="settings-section-title">
          <h2>AI & Automation</h2>
          <p>Configure AI-powered features.</p>
        </div>

        <div className="setting-row">

          <div className="setting-info">
            <h3>AI Recommendations</h3>
            <p>
              Allow the system to generate cloud optimization
              recommendations.
            </p>
          </div>

          <label className="switch">
            <input
              type="checkbox"
              checked={aiRecommendations}
              onChange={() =>
                setAiRecommendations(!aiRecommendations)
              }
            />
            <span className="slider"></span>
          </label>

        </div>

      </div>

      {/* Cloud Configuration */}
      <div className="settings-section">

        <div className="settings-section-title">
          <h2>Cloud Configuration</h2>
          <p>
            Current cloud integration status.
          </p>
        </div>

        <div className="cloud-settings">

          <div className="cloud-setting-card">
            <div className="cloud-setting-icon">
              AWS
            </div>

            <div>
              <h3>Amazon Web Services</h3>
              <span className="connected-status">
                ● Connected
              </span>
            </div>
          </div>

          <div className="cloud-setting-card">
            <div className="cloud-setting-icon">
              AZ
            </div>

            <div>
              <h3>Microsoft Azure</h3>
              <span className="available-status">
                ● Configuration Available
              </span>
            </div>
          </div>

          <div className="cloud-setting-card">
            <div className="cloud-setting-icon">
              GC
            </div>

            <div>
              <h3>Google Cloud</h3>
              <span className="available-status">
                ● Configuration Available
              </span>
            </div>
          </div>

        </div>

      </div>

      {/* Security */}
      <div className="settings-section">

        <div className="settings-section-title">
          <h2>Security</h2>
          <p>
            Security and access information.
          </p>
        </div>

        <div className="security-box">

          <div className="security-icon">
            🔒
          </div>

          <div>
            <h3>Cloud Credentials</h3>
            <p>
              Cloud credentials are managed securely through
              environment configuration and are not displayed
              in the dashboard.
            </p>
          </div>

        </div>

      </div>

      <div className="settings-footer">
        Enterprise AI Multi-Cloud Orchestrator
        <span> • Version 1.0</span>
      </div>

      <style>{`

        .settings-page {
          padding: 30px;
          color: #172033;
          max-width: 1100px;
        }

        .settings-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .settings-header h1 {
          margin: 0 0 8px;
          font-size: 30px;
        }

        .settings-header p {
          margin: 0;
          color: #6b7280;
        }

        .save-settings-btn {
          border: none;
          background: #111827;
          color: white;
          padding: 12px 20px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
        }

        .save-settings-btn:hover {
          opacity: 0.9;
        }

        .settings-section {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          margin-bottom: 20px;
          overflow: hidden;
        }

        .settings-section-title {
          padding: 22px 24px;
          border-bottom: 1px solid #e5e7eb;
        }

        .settings-section-title h2 {
          margin: 0 0 5px;
          font-size: 19px;
        }

        .settings-section-title p {
          margin: 0;
          color: #6b7280;
          font-size: 13px;
        }

        .setting-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          padding: 20px 24px;
          border-bottom: 1px solid #f1f1f1;
        }

        .setting-row:last-child {
          border-bottom: none;
        }

        .setting-info h3 {
          margin: 0 0 5px;
          font-size: 15px;
        }

        .setting-info p {
          margin: 0;
          color: #6b7280;
          font-size: 13px;
        }

        /* Toggle */

        .switch {
          position: relative;
          display: inline-block;
          width: 48px;
          height: 26px;
          flex-shrink: 0;
        }

        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }

        .slider {
          position: absolute;
          cursor: pointer;
          inset: 0;
          background: #d1d5db;
          border-radius: 30px;
          transition: 0.25s;
        }

        .slider:before {
          content: "";
          position: absolute;
          height: 20px;
          width: 20px;
          left: 3px;
          top: 3px;
          background: white;
          border-radius: 50%;
          transition: 0.25s;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        .switch input:checked + .slider {
          background: #111827;
        }

        .switch input:checked + .slider:before {
          transform: translateX(22px);
        }

        /* Cloud */

        .cloud-settings {
          display: grid;
          grid-template-columns:
            repeat(3, minmax(0, 1fr));
          gap: 15px;
          padding: 20px 24px;
        }

        .cloud-setting-card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          padding: 18px;
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .cloud-setting-icon {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 12px;
        }

        .cloud-setting-card h3 {
          margin: 0 0 6px;
          font-size: 14px;
        }

        .connected-status {
          color: #047857;
          font-size: 12px;
          font-weight: 600;
        }

        .available-status {
          color: #6b7280;
          font-size: 12px;
        }

        /* Security */

        .security-box {
          display: flex;
          align-items: flex-start;
          gap: 15px;
          margin: 20px 24px;
          padding: 18px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }

        .security-icon {
          font-size: 22px;
        }

        .security-box h3 {
          margin: 0 0 6px;
          font-size: 15px;
        }

        .security-box p {
          margin: 0;
          color: #6b7280;
          font-size: 13px;
          line-height: 1.6;
        }

        .settings-footer {
          text-align: center;
          padding: 20px;
          color: #6b7280;
          font-size: 12px;
        }

        .settings-footer span {
          color: #9ca3af;
        }

        @media (max-width: 850px) {

          .cloud-settings {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 650px) {

          .settings-page {
            padding: 18px;
          }

          .settings-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .setting-row {
            padding: 18px;
          }

          .settings-section-title {
            padding: 18px;
          }

        }

      `}</style>

    </div>
  );
}

export default Settings;