import { useEffect, useState } from "react";

function Alerts() {

  const API_URL =
    "https://enterprise-ai-multi-cloud-orchestrator.onrender.com";

  const [resources, setResources] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {

    const loadData = async () => {

      try {

        const response = await fetch(
          `${API_URL}/api/resources`
        );

        const data = await response.json();

        const resourceList =
          data.resources || [];

        setResources(resourceList);

        const generatedAlerts =
          resourceList.map(
            (resource, index) => ({
              id: index + 1,
              title:
                `${resource.name} monitoring`,
              provider:
                resource.provider,
              type:
                resource.type,
              status:
                resource.status === "Running" ||
                resource.status === "Active"
                  ? "Healthy"
                  : "Warning",
              message:
                resource.status === "Running" ||
                resource.status === "Active"
                  ? "Resource is operating normally."
                  : "Resource requires attention.",
              time:
                "Recently"
            })
          );

        setAlerts(generatedAlerts);

      } catch (error) {

        console.error(
          "Alert data loading failed:",
          error
        );

      }

    };

    loadData();

  }, []);

  const healthyCount =
    alerts.filter(
      alert =>
        alert.status === "Healthy"
    ).length;

  const warningCount =
    alerts.filter(
      alert =>
        alert.status === "Warning"
    ).length;

  return (

    <div className="alerts-page">

      <div className="alerts-header">

        <div>

          <h1>Alerts</h1>

          <p>
            Monitor important events and
            infrastructure notifications.
          </p>

        </div>

        <div className="alert-status">

          <span></span>

          Alert System Active

        </div>

      </div>


      <div className="alert-summary">

        <div className="alert-card">

          <div className="alert-card-icon">
            🔔
          </div>

          <div>

            <span>
              Total Alerts
            </span>

            <h2>
              {alerts.length}
            </h2>

          </div>

        </div>


        <div className="alert-card">

          <div className="alert-card-icon success">
            ✓
          </div>

          <div>

            <span>
              Healthy
            </span>

            <h2>
              {healthyCount}
            </h2>

          </div>

        </div>


        <div className="alert-card">

          <div className="alert-card-icon warning">
            !
          </div>

          <div>

            <span>
              Warnings
            </span>

            <h2>
              {warningCount}
            </h2>

          </div>

        </div>


        <div className="alert-card">

          <div className="alert-card-icon info">
            ☁
          </div>

          <div>

            <span>
              Monitored Resources
            </span>

            <h2>
              {resources.length}
            </h2>

          </div>

        </div>

      </div>


      <div className="alerts-layout">


        <div className="alerts-section">

          <div className="section-heading">

            <div>

              <h2>
                Recent Alerts
              </h2>

              <p>
                Latest cloud infrastructure
                notifications.
              </p>

            </div>

          </div>


          <div className="alert-list">

            {alerts.length === 0 ? (

              <div className="no-alerts">

                <div>
                  ✓
                </div>

                <h3>
                  No alerts available
                </h3>

                <p>
                  Your infrastructure is currently
                  being monitored.
                </p>

              </div>

            ) : (

              alerts.map(
                alert => (

                  <div
                    className="alert-item"
                    key={alert.id}
                  >

                    <div
                      className={
                        alert.status === "Healthy"
                          ? "alert-symbol healthy"
                          : "alert-symbol warning"
                      }
                    >
                      {alert.status === "Healthy"
                        ? "✓"
                        : "!"
                      }
                    </div>


                    <div className="alert-content">

                      <div className="alert-title">

                        <h3>
                          {alert.title}
                        </h3>

                        <span
                          className={
                            alert.status === "Healthy"
                              ? "healthy-badge"
                              : "warning-badge"
                          }
                        >
                          {alert.status}
                        </span>

                      </div>

                      <p>
                        {alert.message}
                      </p>

                      <div className="alert-meta">

                        <span>
                          {alert.provider}
                        </span>

                        <span>
                          {alert.type}
                        </span>

                        <span>
                          {alert.time}
                        </span>

                      </div>

                    </div>

                  </div>

                )
              )

            )}

          </div>

        </div>


        <div className="alerts-side">

          <div className="notification-settings">

            <h2>
              Alert Configuration
            </h2>

            <p>
              Configure how the orchestrator
              monitors your infrastructure.
            </p>


            <div className="setting-row">

              <div>

                <strong>
                  Resource Health
                </strong>

                <small>
                  Monitor resource availability
                </small>

              </div>

              <div className="toggle active">
                <span></span>
              </div>

            </div>


            <div className="setting-row">

              <div>

                <strong>
                  Cost Monitoring
                </strong>

                <small>
                  Monitor cloud spending
                </small>

              </div>

              <div className="toggle active">
                <span></span>
              </div>

            </div>


            <div className="setting-row">

              <div>

                <strong>
                  Security Alerts
                </strong>

                <small>
                  Monitor security events
                </small>

              </div>

              <div className="toggle active">
                <span></span>
              </div>

            </div>


            <div className="setting-row">

              <div>

                <strong>
                  AI Recommendations
                </strong>

                <small>
                  Receive AI insights
                </small>

              </div>

              <div className="toggle active">
                <span></span>
              </div>

            </div>

          </div>


          <div className="alert-info">

            <div className="info-icon">
              i
            </div>

            <div>

              <h3>
                Smart Alerting
              </h3>

              <p>
                The Enterprise AI Multi-Cloud
                Orchestrator can analyze
                infrastructure events and
                provide intelligent alerts.
              </p>

            </div>

          </div>

        </div>

      </div>


      <style>{`

        .alerts-page {
          min-height: 100vh;
          padding: 30px;
          background: #f6f8fc;
        }

        .alerts-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .alerts-header h1 {
          margin: 0;
          font-size: 32px;
          color: #172033;
        }

        .alerts-header p {
          color: #6b7280;
          margin-top: 8px;
        }

        .alert-status {
          background: #ecfdf5;
          color: #047857;
          padding: 10px 15px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .alert-status span {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          margin-right: 7px;
        }

        .alert-summary {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 25px;
        }

        .alert-card {
          background: white;
          padding: 22px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow:
            0 4px 15px rgba(0,0,0,0.05);
        }

        .alert-card-icon {
          width: 48px;
          height: 48px;
          background: #eef2ff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .alert-card-icon.success {
          background: #dcfce7;
        }

        .alert-card-icon.warning {
          background: #fef3c7;
        }

        .alert-card-icon.info {
          background: #dbeafe;
        }

        .alert-card span {
          color: #6b7280;
          font-size: 13px;
        }

        .alert-card h2 {
          margin: 5px 0 0;
          color: #172033;
        }

        .alerts-layout {
          display: grid;
          grid-template-columns:
            1.5fr 0.8fr;
          gap: 20px;
        }

        .alerts-section,
        .notification-settings {
          background: white;
          padding: 25px;
          border-radius: 14px;
          box-shadow:
            0 4px 15px rgba(0,0,0,0.05);
        }

        .section-heading h2 {
          margin: 0;
          color: #172033;
        }

        .section-heading p {
          color: #6b7280;
          margin-top: 6px;
        }

        .alert-list {
          margin-top: 20px;
        }

        .alert-item {
          display: flex;
          gap: 15px;
          padding: 17px 0;
          border-bottom: 1px solid #edf0f5;
        }

        .alert-symbol {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }

        .alert-symbol.healthy {
          background: #dcfce7;
          color: #15803d;
        }

        .alert-symbol.warning {
          background: #fef3c7;
          color: #b45309;
        }

        .alert-content {
          flex: 1;
        }

        .alert-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .alert-title h3 {
          margin: 0;
          color: #374151;
        }

        .healthy-badge,
        .warning-badge {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 15px;
        }

        .healthy-badge {
          background: #dcfce7;
          color: #15803d;
        }

        .warning-badge {
          background: #fef3c7;
          color: #b45309;
        }

        .alert-content p {
          color: #64748b;
          margin: 7px 0;
        }

        .alert-meta {
          display: flex;
          gap: 15px;
          color: #94a3b8;
          font-size: 12px;
        }

        .notification-settings h2 {
          margin-top: 0;
          color: #172033;
        }

        .notification-settings > p {
          color: #6b7280;
          line-height: 1.5;
        }

        .setting-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 17px 0;
          border-bottom: 1px solid #edf0f5;
        }

        .setting-row strong {
          display: block;
          color: #374151;
        }

        .setting-row small {
          display: block;
          color: #94a3b8;
          margin-top: 4px;
        }

        .toggle {
          width: 38px;
          height: 21px;
          border-radius: 20px;
          background: #cbd5e1;
          padding: 2px;
        }

        .toggle.active {
          background: #10b981;
        }

        .toggle span {
          display: block;
          width: 17px;
          height: 17px;
          background: white;
          border-radius: 50%;
          margin-left: 0;
        }

        .toggle.active span {
          margin-left: 17px;
        }

        .alert-info {
          margin-top: 20px;
          background: #eff6ff;
          padding: 20px;
          border-radius: 14px;
          display: flex;
          gap: 12px;
        }

        .info-icon {
          width: 30px;
          height: 30px;
          background: #dbeafe;
          color: #1d4ed8;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          flex-shrink: 0;
        }

        .alert-info h3 {
          margin: 0;
          color: #1e3a8a;
        }

        .alert-info p {
          color: #475569;
          line-height: 1.5;
          font-size: 13px;
        }

        .no-alerts {
          text-align: center;
          padding: 50px 20px;
          color: #64748b;
        }

        .no-alerts > div {
          font-size: 35px;
          color: #10b981;
        }

        .no-alerts h3 {
          color: #374151;
        }

        @media (max-width: 1000px) {

          .alert-summary {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .alerts-layout {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .alerts-page {
            padding: 20px;
          }

          .alert-summary {
            grid-template-columns: 1fr;
          }

          .alerts-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

        }

      `}</style>

    </div>
  );
}

export default Alerts;