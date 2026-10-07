import { useEffect, useState } from "react";

const API_URL =
  "https://enterprise-ai-multi-cloud-orchestrator.onrender.com";

function Resources() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadResources();
  }, []);

  async function loadResources() {
    try {
      const response = await fetch(
        `${API_URL}/api/resources`
      );

      const data = await response.json();

      setResources(data.resources || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const runningCount = resources.filter(
    (resource) => resource.status === "Running"
  ).length;

  const totalCost = resources.reduce(
    (sum, resource) => {
      const cost =
        parseFloat(
          resource.cost?.replace("$", "")
        ) || 0;

      return sum + cost;
    },
    0
  );

  return (
    <div className="resources-page">

      <header className="page-header">

        <div>
          <span className="page-label">
            COMPUTE & STORAGE
          </span>

          <h1>Cloud Resources</h1>

          <p>
            Manage and monitor resources
            across your connected cloud providers.
          </p>
        </div>

        <div className="profile">
          PD
        </div>

      </header>

      <section className="summary-grid">

        <div className="summary-card">
          <span>Total Resources</span>
          <strong>{resources.length}</strong>
        </div>

        <div className="summary-card">
          <span>Running Resources</span>
          <strong>{runningCount}</strong>
        </div>

        <div className="summary-card">
          <span>Cloud Providers</span>
          <strong>3</strong>
        </div>

        <div className="summary-card">
          <span>Estimated Cost</span>
          <strong>${totalCost}</strong>
        </div>

      </section>

      <section className="resource-section">

        <div className="section-title">

          <div>
            <span className="page-label">
              INFRASTRUCTURE
            </span>

            <h2>All Cloud Resources</h2>
          </div>

          <span>
            {resources.length} resources
          </span>

        </div>

        <div className="table-card">

          {loading ? (

            <div className="loading">
              Loading resources...
            </div>

          ) : resources.length === 0 ? (

            <div className="empty">
              No resources found.
            </div>

          ) : (

            <table>

              <thead>
                <tr>
                  <th>RESOURCE</th>
                  <th>PROVIDER</th>
                  <th>TYPE</th>
                  <th>STATUS</th>
                  <th>REGION</th>
                  <th>COST</th>
                </tr>
              </thead>

              <tbody>

                {resources.map((resource) => (

                  <tr key={resource.id}>

                    <td>
                      <div className="resource-name">

                        <div className="resource-icon">
                          ◇
                        </div>

                        <div>
                          <strong>
                            {resource.name}
                          </strong>

                          <small>
                            {resource.id}
                          </small>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="provider">
                        {resource.provider}
                      </span>
                    </td>

                    <td>
                      {resource.type}
                    </td>

                    <td>
                      <span className="status">
                        ● {resource.status}
                      </span>
                    </td>

                    <td>
                      {resource.region}
                    </td>

                    <td>
                      <strong>
                        {resource.cost}
                      </strong>
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

      </section>

      <footer>
        <strong>CloudMind</strong>
        <span>
          Enterprise AI Multi-Cloud Orchestrator
        </span>
      </footer>

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background: #f6f8fc;
          font-family: Inter, Arial, sans-serif;
        }

        .resources-page {
          min-height: 100vh;
          padding: 35px 45px;
          background: #f6f8fc;
          color: #172033;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 25px;
          border-bottom: 1px solid #e5e9f1;
        }

        .page-label {
          color: #6674d9;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }

        .page-header h1 {
          margin: 7px 0 5px;
          font-size: 30px;
        }

        .page-header p {
          margin: 0;
          color: #8993a7;
          font-size: 13px;
        }

        .profile {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #655df6,
            #35b5ff
          );
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .summary-grid {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 18px;
          margin-top: 25px;
        }

        .summary-card {
          background: white;
          border: 1px solid #e7ebf2;
          border-radius: 14px;
          padding: 22px;
          box-shadow:
            0 5px 18px
            rgba(31,41,55,0.04);
        }

        .summary-card span {
          display: block;
          color: #8993a6;
          font-size: 11px;
        }

        .summary-card strong {
          display: block;
          margin-top: 8px;
          font-size: 25px;
        }

        .resource-section {
          margin-top: 35px;
        }

        .section-title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .section-title h2 {
          margin: 5px 0 0;
          font-size: 20px;
        }

        .section-title > span {
          color: #8993a7;
          font-size: 11px;
        }

        .table-card {
          background: white;
          border: 1px solid #e7ebf2;
          border-radius: 15px;
          overflow: hidden;
          box-shadow:
            0 5px 18px
            rgba(31,41,55,0.03);
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        th {
          background: #fafbfc;
          color: #8993a5;
          font-size: 9px;
          text-align: left;
          padding: 15px;
          letter-spacing: .8px;
        }

        td {
          padding: 16px;
          border-top: 1px solid #edf0f4;
          color: #596478;
          font-size: 11px;
        }

        .resource-name {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .resource-icon {
          width: 36px;
          height: 36px;
          border-radius: 9px;
          background: #f1f3ff;
          color: #5b64dd;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .resource-name strong {
          display: block;
          color: #253047;
        }

        .resource-name small {
          display: block;
          color: #a0a8b6;
          font-size: 8px;
          margin-top: 3px;
        }

        .provider {
          background: #f3f5f8;
          padding: 6px 9px;
          border-radius: 6px;
          font-size: 9px;
        }

        .status {
          color: #159c69;
          font-size: 10px;
          font-weight: 600;
        }

        .loading,
        .empty {
          padding: 60px;
          text-align: center;
          color: #8993a7;
        }

        footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e2e6ee;
          display: flex;
          gap: 15px;
          color: #8993a5;
          font-size: 10px;
        }

        footer strong {
          color: #354056;
        }

        @media (max-width: 900px) {

          .summary-grid {
            grid-template-columns:
              repeat(2, 1fr);
          }

        }

        @media (max-width: 600px) {

          .resources-page {
            padding: 20px;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }

          .table-card {
            overflow-x: auto;
          }

          table {
            min-width: 850px;
          }

        }

      `}</style>

    </div>
  );
}

export default Resources;