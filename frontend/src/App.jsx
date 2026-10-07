import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation
} from "react-router-dom";

import CloudProviders from "./CloudProviders";
import Resources from "./Resources";
import Storage from "./Storage";
import CostAnalysis from "./CostAnalysis";
import AIAdvisor from "./AIAdvisor";
import Monitoring from "./Monitoring";
import Alerts from "./Alerts";
import Reports from "./Reports";
import Settings from "./Settings";
import GenAIChatbot from "./GenAIChatbot";


const API_URL =
  "https://enterprise-ai-multi-cloud-orchestrator.onrender.com";


function Dashboard() {

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    fetch(`${API_URL}/api/resources`)
      .then((response) => response.json())
      .then((data) => {
        setResources(data.resources || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Dashboard error:", error);
        setLoading(false);
      });

  }, []);


  const totalResources = resources.length;

  const runningResources = resources.filter(
    (resource) =>
      resource.status === "Running" ||
      resource.status === "Active"
  ).length;


  const totalCost = resources.reduce(
    (sum, resource) => {

      const cost = parseFloat(
        String(resource.cost || "0").replace("$", "")
      );

      return sum + cost;

    },
    0
  );


  const providers = [
    {
      name: "AWS",
      status: "Connected",
      type: "Amazon Web Services"
    },
    {
      name: "Azure",
      status: "Available",
      type: "Microsoft Azure"
    },
    {
      name: "GCP",
      status: "Available",
      type: "Google Cloud"
    }
  ];


  return (

    <div className="dashboard-page">

      <div className="dashboard-header">

        <div>

          <h1>Dashboard</h1>

          <p>
            Enterprise AI Multi-Cloud Orchestrator
          </p>

        </div>

        <div className="system-status">

          <span></span>

          System Operational

        </div>

      </div>


      {/* Summary Cards */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <div className="card-icon">
            ☁
          </div>

          <div>

            <span>Total Resources</span>

            <h2>
              {loading ? "..." : totalResources}
            </h2>

          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            ✓
          </div>

          <div>

            <span>Active Resources</span>

            <h2>
              {loading ? "..." : runningResources}
            </h2>

          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            $
          </div>

          <div>

            <span>Monthly Cost</span>

            <h2>
              {loading
                ? "..."
                : `$${totalCost.toFixed(2)}`}
            </h2>

          </div>

        </div>


        <div className="dashboard-card">

          <div className="card-icon">
            AI
          </div>

          <div>

            <span>AI Advisor</span>

            <h2>Ready</h2>

          </div>

        </div>

      </div>


      {/* Main Grid */}

      <div className="dashboard-grid">


        {/* Cloud Providers */}

        <div className="dashboard-section">

          <div className="section-header">

            <div>

              <h2>Cloud Providers</h2>

              <p>
                Multi-cloud connection overview
              </p>

            </div>

            <Link
              to="/cloud-providers"
              className="view-link"
            >
              View All
            </Link>

          </div>


          <div className="provider-list">

            {providers.map((provider) => (

              <div
                className="provider-item"
                key={provider.name}
              >

                <div className="provider-logo">
                  {provider.name}
                </div>

                <div className="provider-info">

                  <strong>
                    {provider.type}
                  </strong>

                  <span>
                    {provider.status}
                  </span>

                </div>

                <div
                  className={
                    provider.status === "Connected"
                      ? "provider-status connected"
                      : "provider-status"
                  }
                >
                  ●
                </div>

              </div>

            ))}

          </div>

        </div>


        {/* AI Insight */}

        <div className="dashboard-section ai-section">

          <div className="section-header">

            <div>

              <h2>AI Infrastructure Insight</h2>

              <p>
                Intelligent cloud analysis
              </p>

            </div>

            <span className="ai-badge">
              AI
            </span>

          </div>


          <div className="ai-insight">

            <div className="ai-symbol">
              ✦
            </div>

            <div>

              <h3>
                Infrastructure Analysis
              </h3>

              <p>

                Your multi-cloud infrastructure currently
                contains{" "}
                <strong>
                  {totalResources}
                </strong>{" "}
                resources with an estimated monthly cost
                of{" "}
                <strong>
                  ${totalCost.toFixed(2)}
                </strong>.

              </p>

              <Link
                to="/ai-advisor"
                className="ai-button"
              >
                Open AI Advisor
              </Link>

            </div>

          </div>

        </div>

      </div>


      {/* Resources */}

      <div className="dashboard-section resources-section">

        <div className="section-header">

          <div>

            <h2>Recent Cloud Resources</h2>

            <p>
              Centralized infrastructure overview
            </p>

          </div>

          <Link
            to="/resources"
            className="view-link"
          >
            View Resources
          </Link>

        </div>


        <div className="dashboard-table-container">

          <table className="dashboard-table">

            <thead>

              <tr>

                <th>
                  Resource
                </th>

                <th>
                  Provider
                </th>

                <th>
                  Type
                </th>

                <th>
                  Status
                </th>

                <th>
                  Region
                </th>

                <th>
                  Cost
                </th>

              </tr>

            </thead>


            <tbody>

              {resources.slice(0, 6).map(
                (resource) => (

                  <tr key={resource.id}>

                    <td>
                      <strong>
                        {resource.name}
                      </strong>
                    </td>

                    <td>
                      {resource.provider}
                    </td>

                    <td>
                      {resource.type}
                    </td>

                    <td>

                      <span
                        className={
                          resource.status === "Running" ||
                          resource.status === "Active"
                            ? "status-active"
                            : "status-warning"
                        }
                      >
                        {resource.status}
                      </span>

                    </td>

                    <td>
                      {resource.region}
                    </td>

                    <td>
                      {resource.cost || "N/A"}
                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

      </div>


      {/* Quick Actions */}

      <div className="dashboard-section">

        <div className="section-header">

          <div>

            <h2>Quick Actions</h2>

            <p>
              Manage your multi-cloud environment
            </p>

          </div>

        </div>


        <div className="quick-actions">

          <Link
            to="/storage"
            className="quick-action"
          >
            <span>📦</span>
            <strong>Manage Storage</strong>
            <small>
              Upload and manage cloud files
            </small>
          </Link>


          <Link
            to="/cost-analysis"
            className="quick-action"
          >
            <span>💰</span>
            <strong>Cost Analysis</strong>
            <small>
              Analyze infrastructure costs
            </small>
          </Link>


          <Link
            to="/monitoring"
            className="quick-action"
          >
            <span>📊</span>
            <strong>Monitoring</strong>
            <small>
              Check infrastructure health
            </small>
          </Link>


          <Link
            to="/genai"
            className="quick-action"
          >
            <span>✦</span>
            <strong>AI Assistant</strong>
            <small>
              Ask the Generative AI assistant
            </small>
          </Link>

        </div>

      </div>


      <style>{`

        .dashboard-page {
          padding: 30px;
          color: #172033;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 28px;
        }

        .dashboard-header h1 {
          margin: 0 0 7px;
          font-size: 30px;
        }

        .dashboard-header p {
          margin: 0;
          color: #6b7280;
        }

        .system-status {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #ecfdf5;
          color: #047857;
          padding: 9px 14px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
        }

        .system-status span {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
        }

        .dashboard-cards {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 18px;
          margin-bottom: 22px;
        }

        .dashboard-card {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .card-icon {
          width: 45px;
          height: 45px;
          border-radius: 10px;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 16px;
        }

        .dashboard-card span {
          color: #6b7280;
          font-size: 12px;
        }

        .dashboard-card h2 {
          margin: 5px 0 0;
          font-size: 22px;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns:
            repeat(2, minmax(0, 1fr));
          gap: 22px;
          margin-bottom: 22px;
        }

        .dashboard-section {
          background: white;
          border: 1px solid #e5e7eb;
          border-radius: 14px;
          padding: 22px;
          margin-bottom: 22px;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 20px;
        }

        .section-header h2 {
          margin: 0 0 5px;
          font-size: 18px;
        }

        .section-header p {
          margin: 0;
          color: #6b7280;
          font-size: 12px;
        }

        .view-link {
          color: #374151;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
        }

        .provider-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .provider-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          border: 1px solid #f0f0f0;
          border-radius: 10px;
        }

        .provider-logo {
          width: 40px;
          height: 40px;
          border-radius: 9px;
          background: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
        }

        .provider-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .provider-info strong {
          font-size: 13px;
        }

        .provider-info span {
          color: #6b7280;
          font-size: 11px;
        }

        .provider-status {
          color: #9ca3af;
          font-size: 12px;
        }

        .provider-status.connected {
          color: #10b981;
        }

        .ai-badge {
          padding: 5px 9px;
          background: #111827;
          color: white;
          border-radius: 7px;
          font-size: 10px;
          font-weight: 700;
        }

        .ai-insight {
          display: flex;
          gap: 15px;
          padding: 18px;
          background: #f8fafc;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
        }

        .ai-symbol {
          width: 40px;
          height: 40px;
          min-width: 40px;
          border-radius: 9px;
          background: #111827;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ai-insight h3 {
          margin: 0 0 8px;
          font-size: 14px;
        }

        .ai-insight p {
          margin: 0 0 15px;
          color: #6b7280;
          font-size: 12px;
          line-height: 1.6;
        }

        .ai-button {
          display: inline-block;
          background: #111827;
          color: white;
          text-decoration: none;
          padding: 9px 13px;
          border-radius: 8px;
          font-size: 11px;
          font-weight: 600;
        }

        .dashboard-table-container {
          overflow-x: auto;
        }

        .dashboard-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 700px;
        }

        .dashboard-table th {
          padding: 12px;
          text-align: left;
          background: #f9fafb;
          color: #6b7280;
          font-size: 11px;
        }

        .dashboard-table td {
          padding: 14px 12px;
          border-top: 1px solid #f0f0f0;
          font-size: 12px;
        }

        .status-active {
          padding: 5px 9px;
          border-radius: 20px;
          background: #ecfdf5;
          color: #047857;
          font-size: 10px;
          font-weight: 600;
        }

        .status-warning {
          padding: 5px 9px;
          border-radius: 20px;
          background: #fff7ed;
          color: #c2410c;
          font-size: 10px;
          font-weight: 600;
        }

        .quick-actions {
          display: grid;
          grid-template-columns:
            repeat(4, minmax(0, 1fr));
          gap: 12px;
        }

        .quick-action {
          text-decoration: none;
          color: #172033;
          border: 1px solid #e5e7eb;
          border-radius: 11px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .quick-action:hover {
          background: #f9fafb;
        }

        .quick-action span {
          font-size: 20px;
        }

        .quick-action strong {
          font-size: 13px;
        }

        .quick-action small {
          color: #6b7280;
          font-size: 10px;
          line-height: 1.4;
        }

        @media (max-width: 1000px) {

          .dashboard-cards {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

          .quick-actions {
            grid-template-columns:
              repeat(2, minmax(0, 1fr));
          }

        }

        @media (max-width: 750px) {

          .dashboard-page {
            padding: 18px;
          }

          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
          }

        }

        @media (max-width: 550px) {

          .dashboard-cards {
            grid-template-columns: 1fr;
          }

          .quick-actions {
            grid-template-columns: 1fr;
          }

        }

      `}</style>

    </div>

  );
}


/* =====================================================
   SIDEBAR
===================================================== */

function Layout() {

  const location = useLocation();

  const navItems = [

    {
      path: "/",
      icon: "⌂",
      label: "Dashboard"
    },

    {
      path: "/cloud-providers",
      icon: "☁",
      label: "Cloud Providers"
    },

    {
      path: "/resources",
      icon: "▣",
      label: "Resources"
    },

    {
      path: "/storage",
      icon: "▤",
      label: "Storage"
    },

    {
      path: "/cost-analysis",
      icon: "$",
      label: "Cost Analysis"
    },

    {
      path: "/ai-advisor",
      icon: "✦",
      label: "AI Advisor"
    },

    {
      path: "/genai",
      icon: "AI",
      label: "Generative AI"
    },

    {
      path: "/monitoring",
      icon: "◉",
      label: "Monitoring"
    },

    {
      path: "/alerts",
      icon: "!",
      label: "Alerts"
    },

    {
      path: "/reports",
      icon: "▤",
      label: "Reports"
    },

    {
      path: "/settings",
      icon: "⚙",
      label: "Settings"
    }

  ];


  return (

    <div className="app-layout">

      <aside className="sidebar">

        <div className="brand">

          <div className="brand-logo">
            AI
          </div>

          <div>

            <h2>
              Enterprise AI
            </h2>

            <span>
              Multi-Cloud Orchestrator
            </span>

          </div>

        </div>


        <div className="sidebar-label">
          PLATFORM
        </div>


        <nav className="sidebar-nav">

          {navItems.map((item) => {

            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(
                    item.path
                  );

            return (

              <Link
                key={item.path}
                to={item.path}
                className={
                  isActive
                    ? "nav-item active"
                    : "nav-item"
                }
              >

                <span className="nav-icon">
                  {item.icon}
                </span>

                {item.label}

              </Link>

            );

          })}

        </nav>


        <div className="sidebar-bottom">

          <div className="orchestrator-status">

            <span></span>

            <div>

              <strong>
                Orchestrator
              </strong>

              <small>
                System Online
              </small>

            </div>

          </div>

        </div>

      </aside>


      <main className="main-content">

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/cloud-providers"
            element={<CloudProviders />}
          />

          <Route
            path="/resources"
            element={<Resources />}
          />

          <Route
            path="/storage"
            element={<Storage />}
          />

          <Route
            path="/cost-analysis"
            element={<CostAnalysis />}
          />

          <Route
            path="/ai-advisor"
            element={<AIAdvisor />}
          />

          <Route
            path="/genai"
            element={<GenAIChatbot />}
          />

          <Route
            path="/monitoring"
            element={<Monitoring />}
          />

          <Route
            path="/alerts"
            element={<Alerts />}
          />

          <Route
            path="/reports"
            element={<Reports />}
          />

          <Route
            path="/settings"
            element={<Settings />}
          />

        </Routes>

      </main>


      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family:
            Inter,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
          background: #f7f8fa;
        }

        .app-layout {
          min-height: 100vh;
          display: flex;
          background: #f7f8fa;
        }

        .sidebar {
          width: 245px;
          min-width: 245px;
          min-height: 100vh;
          background: white;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          position: sticky;
          top: 0;
          height: 100vh;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 22px 18px;
          border-bottom: 1px solid #f1f1f1;
        }

        .brand-logo {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          background: #111827;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 800;
        }

        .brand h2 {
          margin: 0 0 3px;
          font-size: 14px;
          color: #111827;
        }

        .brand span {
          color: #9ca3af;
          font-size: 9px;
        }

        .sidebar-label {
          padding: 20px 18px 8px;
          color: #9ca3af;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .sidebar-nav {
          padding: 0 10px;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 10px 12px;
          border-radius: 8px;
          color: #6b7280;
          text-decoration: none;
          font-size: 12px;
          font-weight: 500;
          transition: 0.2s;
        }

        .nav-item:hover {
          background: #f3f4f6;
          color: #111827;
        }

        .nav-item.active {
          background: #111827;
          color: white;
        }

        .nav-icon {
          width: 20px;
          text-align: center;
          font-size: 14px;
        }

        .sidebar-bottom {
          margin-top: auto;
          padding: 15px;
          border-top: 1px solid #f1f1f1;
        }

        .orchestrator-status {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 10px;
          border-radius: 9px;
          background: #f9fafb;
        }

        .orchestrator-status > span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
        }

        .orchestrator-status div {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .orchestrator-status strong {
          font-size: 11px;
          color: #374151;
        }

        .orchestrator-status small {
          color: #10b981;
          font-size: 9px;
        }

        .main-content {
          flex: 1;
          min-width: 0;
          overflow-x: hidden;
        }

        @media (max-width: 850px) {

          .sidebar {
            width: 70px;
            min-width: 70px;
          }

          .brand {
            justify-content: center;
            padding: 18px 10px;
          }

          .brand > div:last-child {
            display: none;
          }

          .sidebar-label {
            display: none;
          }

          .nav-item {
            justify-content: center;
            padding: 11px 5px;
          }

          .nav-item {
            font-size: 0;
          }

          .nav-icon {
            font-size: 16px;
          }

          .sidebar-bottom {
            padding: 10px 8px;
          }

          .orchestrator-status div {
            display: none;
          }

          .orchestrator-status {
            justify-content: center;
          }

        }

      `}</style>

    </div>

  );
}


/* =====================================================
   APP
===================================================== */

function App() {

  return (

    <BrowserRouter>

      <Layout />

    </BrowserRouter>

  );

}


export default App;