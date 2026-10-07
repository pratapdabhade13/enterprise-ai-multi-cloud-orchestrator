import { useEffect, useState } from "react";

function Monitoring() {

  const API_URL =
    "https://enterprise-ai-multi-cloud-orchestrator.onrender.com";

  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadResources = async () => {

      try {

        const response = await fetch(
          `${API_URL}/api/resources`
        );

        const data = await response.json();

        setResources(
          data.resources || []
        );

      } catch (error) {

        console.error(
          "Monitoring data loading failed:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    loadResources();

  }, []);

  const running =
    resources.filter(
      resource =>
        resource.status === "Running"
    ).length;

  const active =
    resources.filter(
      resource =>
        resource.status === "Active"
    ).length;

  return (

    <div className="monitoring-page">

      <div className="monitoring-header">

        <div>

          <h1>Monitoring</h1>

          <p>
            Monitor the health and status of
            your multi-cloud resources.
          </p>

        </div>

        <div className="live-status">

          <span></span>

          Live Monitoring

        </div>

      </div>


      <div className="monitor-cards">

        <div className="monitor-card">

          <div className="monitor-icon">
            ✓
          </div>

          <div>

            <span>
              System Status
            </span>

            <h2>
              Healthy
            </h2>

          </div>

        </div>


        <div className="monitor-card">

          <div className="monitor-icon">
            ⚙
          </div>

          <div>

            <span>
              Total Resources
            </span>

            <h2>
              {resources.length}
            </h2>

          </div>

        </div>


        <div className="monitor-card">

          <div className="monitor-icon">
            ▶
          </div>

          <div>

            <span>
              Running
            </span>

            <h2>
              {running}
            </h2>

          </div>

        </div>


        <div className="monitor-card">

          <div className="monitor-icon">
            ●
          </div>

          <div>

            <span>
              Active Storage
            </span>

            <h2>
              {active}
            </h2>

          </div>

        </div>

      </div>


      <div className="monitor-grid">


        <div className="monitor-section">

          <div className="section-header">

            <div>

              <h2>
                Resource Health
              </h2>

              <p>
                Current status of cloud resources.
              </p>

            </div>

          </div>


          {loading ? (

            <div className="monitor-loading">
              Loading monitoring data...
            </div>

          ) : (

            <div className="resource-health-list">

              {resources.map(
                (resource, index) => (

                  <div
                    className="health-row"
                    key={index}
                  >

                    <div className="resource-info">

                      <div className="resource-status">
                        <span></span>
                      </div>

                      <div>

                        <strong>
                          {resource.name}
                        </strong>

                        <small>
                          {resource.provider}
                          {" • "}
                          {resource.type}
                        </small>

                      </div>

                    </div>


                    <div className="health-details">

                      <span>
                        {resource.region}
                      </span>

                      <strong>
                        {resource.status}
                      </strong>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        <div className="monitor-section">

          <h2>
            Infrastructure Health
          </h2>

          <p className="section-description">
            Overall health indicators for the
            multi-cloud environment.
          </p>


          <div className="health-meter">

            <div className="meter-header">

              <span>
                Overall Health
              </span>

              <strong>
                92%
              </strong>

            </div>

            <div className="meter">

              <div
                className="meter-value"
                style={{
                  width: "92%"
                }}
              />

            </div>

            <small>
              Infrastructure operating normally
            </small>

          </div>


          <div className="health-stat">

            <span>
              Availability
            </span>

            <strong>
              99.9%
            </strong>

          </div>

          <div className="health-stat">

            <span>
              Active Resources
            </span>

            <strong>
              {resources.length}
            </strong>

          </div>

          <div className="health-stat">

            <span>
              Alerts
            </span>

            <strong className="alert-text">
              0
            </strong>

          </div>

          <div className="health-stat">

            <span>
              Monitoring Status
            </span>

            <strong className="healthy-text">
              Active
            </strong>

          </div>

        </div>

      </div>


      <div className="monitor-section events-section">

        <div className="section-header">

          <div>

            <h2>
              Recent Monitoring Events
            </h2>

            <p>
              Latest infrastructure monitoring
              activity.
            </p>

          </div>

        </div>


        <div className="event-list">

          <div className="event">

            <div className="event-icon success">
              ✓
            </div>

            <div>

              <strong>
                All cloud resources are healthy
              </strong>

              <p>
                Resource health check completed
                successfully.
              </p>

            </div>

            <span>
              Just now
            </span>

          </div>


          <div className="event">

            <div className="event-icon success">
              ✓
            </div>

            <div>

              <strong>
                AWS connection active
              </strong>

              <p>
                AWS infrastructure is reachable
                through the orchestrator.
              </p>

            </div>

            <span>
              Recently
            </span>

          </div>


          <div className="event">

            <div className="event-icon info">
              i
            </div>

            <div>

              <strong>
                Monitoring service running
              </strong>

              <p>
                Multi-cloud monitoring is active.
              </p>

            </div>

            <span>
              Active
            </span>

          </div>

        </div>

      </div>


      <style>{`

        .monitoring-page {
          min-height: 100vh;
          padding: 30px;
          background: #f6f8fc;
        }

        .monitoring-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .monitoring-header h1 {
          margin: 0;
          font-size: 32px;
          color: #172033;
        }

        .monitoring-header p {
          margin-top: 8px;
          color: #6b7280;
        }

        .live-status {
          padding: 10px 15px;
          border-radius: 20px;
          background: #ecfdf5;
          color: #047857;
          font-size: 13px;
          font-weight: 600;
        }

        .live-status span {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          margin-right: 7px;
        }

        .monitor-cards {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 25px;
        }

        .monitor-card {
          background: white;
          padding: 22px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow:
            0 4px 15px rgba(0,0,0,0.05);
        }

        .monitor-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #eef2ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .monitor-card span {
          color: #6b7280;
          font-size: 13px;
        }

        .monitor-card h2 {
          margin: 5px 0 0;
          color: #172033;
        }

        .monitor-grid {
          display: grid;
          grid-template-columns:
            1.5fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .monitor-section {
          background: white;
          padding: 25px;
          border-radius: 14px;
          box-shadow:
            0 4px 15px rgba(0,0,0,0.05);
        }

        .section-header h2,
        .monitor-section h2 {
          margin-top: 0;
          color: #172033;
        }

        .section-header p,
        .section-description {
          color: #6b7280;
        }

        .resource-health-list {
          margin-top: 20px;
        }

        .health-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #edf0f5;
        }

        .resource-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .resource-status {
          width: 34px;
          height: 34px;
          background: #ecfdf5;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .resource-status span {
          width: 9px;
          height: 9px;
          background: #10b981;
          border-radius: 50%;
        }

        .resource-info strong {
          display: block;
          color: #374151;
        }

        .resource-info small {
          display: block;
          margin-top: 4px;
          color: #94a3b8;
        }

        .health-details {
          display: flex;
          gap: 20px;
          align-items: center;
          font-size: 13px;
        }

        .health-details span {
          color: #64748b;
        }

        .health-details strong {
          color: #059669;
        }

        .health-meter {
          margin: 25px 0;
          padding: 18px;
          background: #f8fafc;
          border-radius: 10px;
        }

        .meter-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .meter-header strong {
          color: #059669;
        }

        .meter {
          height: 10px;
          background: #e5e7eb;
          border-radius: 20px;
          overflow: hidden;
        }

        .meter-value {
          height: 100%;
          background: #10b981;
          border-radius: 20px;
        }

        .health-meter small {
          display: block;
          margin-top: 9px;
          color: #64748b;
        }

        .health-stat {
          display: flex;
          justify-content: space-between;
          padding: 14px 0;
          border-bottom: 1px solid #edf0f5;
        }

        .health-stat span {
          color: #64748b;
        }

        .alert-text {
          color: #64748b;
        }

        .healthy-text {
          color: #059669;
        }

        .events-section {
          margin-bottom: 30px;
        }

        .event-list {
          margin-top: 20px;
        }

        .event {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px 0;
          border-bottom: 1px solid #edf0f5;
        }

        .event-icon {
          width: 38px;
          height: 38px;
          border-radius: 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }

        .event-icon.success {
          background: #dcfce7;
          color: #15803d;
        }

        .event-icon.info {
          background: #dbeafe;
          color: #1d4ed8;
        }

        .event div:nth-child(2) {
          flex: 1;
        }

        .event strong {
          color: #374151;
        }

        .event p {
          margin: 4px 0 0;
          color: #64748b;
          font-size: 13px;
        }

        .event > span {
          color: #94a3b8;
          font-size: 12px;
        }

        .monitor-loading {
          padding: 50px;
          text-align: center;
          color: #64748b;
        }

        @media (max-width: 1000px) {

          .monitor-cards {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .monitor-grid {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .monitoring-page {
            padding: 20px;
          }

          .monitor-cards {
            grid-template-columns: 1fr;
          }

          .monitoring-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .health-row {
            align-items: flex-start;
            gap: 15px;
          }

          .health-details {
            flex-direction: column;
            align-items: flex-end;
            gap: 5px;
          }

        }

      `}</style>

    </div>
  );
}

export default Monitoring;