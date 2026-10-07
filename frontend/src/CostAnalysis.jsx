import { useEffect, useState } from "react";

function CostAnalysis() {

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

        setResources(data.resources || []);

      } catch (error) {

        console.error(
          "Cost data loading failed:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    loadResources();

  }, []);

  const getCost = (cost) => {

    if (!cost) {
      return 0;
    }

    const number =
      parseFloat(
        String(cost).replace("$", "")
      );

    return isNaN(number) ? 0 : number;
  };

  const totalCost =
    resources.reduce(
      (sum, resource) =>
        sum + getCost(resource.cost),
      0
    );

  const awsCost =
    resources
      .filter(
        (resource) =>
          resource.provider === "AWS"
      )
      .reduce(
        (sum, resource) =>
          sum + getCost(resource.cost),
        0
      );

  const azureCost =
    resources
      .filter(
        (resource) =>
          resource.provider === "Azure"
      )
      .reduce(
        (sum, resource) =>
          sum + getCost(resource.cost),
        0
      );

  const gcpCost =
    resources
      .filter(
        (resource) =>
          resource.provider === "Google Cloud"
      )
      .reduce(
        (sum, resource) =>
          sum + getCost(resource.cost),
        0
      );

  return (

    <div className="cost-page">

      <div className="cost-header">

        <div>

          <h1>Cost Analysis</h1>

          <p>
            Monitor and analyze estimated
            multi-cloud infrastructure costs.
          </p>

        </div>

        <div className="cost-period">
          Monthly Estimate
        </div>

      </div>


      <div className="cost-cards">

        <div className="cost-card">

          <div className="cost-icon">
            $
          </div>

          <div>

            <span>
              Total Monthly Cost
            </span>

            <h2>
              ${totalCost.toFixed(2)}
            </h2>

          </div>

        </div>


        <div className="cost-card">

          <div className="cost-icon">
            ☁
          </div>

          <div>

            <span>
              AWS
            </span>

            <h2>
              ${awsCost.toFixed(2)}
            </h2>

          </div>

        </div>


        <div className="cost-card">

          <div className="cost-icon">
            A
          </div>

          <div>

            <span>
              Azure
            </span>

            <h2>
              ${azureCost.toFixed(2)}
            </h2>

          </div>

        </div>


        <div className="cost-card">

          <div className="cost-icon">
            G
          </div>

          <div>

            <span>
              Google Cloud
            </span>

            <h2>
              ${gcpCost.toFixed(2)}
            </h2>

          </div>

        </div>

      </div>


      <div className="cost-layout">


        <div className="cost-section">

          <div className="section-title">

            <div>

              <h2>
                Cloud Cost Distribution
              </h2>

              <p>
                Estimated monthly cost by provider.
              </p>

            </div>

          </div>


          <div className="provider-cost">

            <div className="provider-row">

              <div className="provider-name">
                <span className="provider-dot aws">
                  AWS
                </span>

                <strong>
                  ${awsCost.toFixed(2)}
                </strong>
              </div>

              <div className="cost-bar">

                <div
                  className="bar-fill aws-fill"
                  style={{
                    width:
                      totalCost > 0
                        ? `${(awsCost / totalCost) * 100}%`
                        : "0%"
                  }}
                />

              </div>

            </div>


            <div className="provider-row">

              <div className="provider-name">

                <span className="provider-dot azure">
                  Azure
                </span>

                <strong>
                  ${azureCost.toFixed(2)}
                </strong>

              </div>

              <div className="cost-bar">

                <div
                  className="bar-fill azure-fill"
                  style={{
                    width:
                      totalCost > 0
                        ? `${(azureCost / totalCost) * 100}%`
                        : "0%"
                  }}
                />

              </div>

            </div>


            <div className="provider-row">

              <div className="provider-name">

                <span className="provider-dot gcp">
                  Google Cloud
                </span>

                <strong>
                  ${gcpCost.toFixed(2)}
                </strong>

              </div>

              <div className="cost-bar">

                <div
                  className="bar-fill gcp-fill"
                  style={{
                    width:
                      totalCost > 0
                        ? `${(gcpCost / totalCost) * 100}%`
                        : "0%"
                  }}
                />

              </div>

            </div>

          </div>

        </div>


        <div className="cost-section">

          <h2>
            AI Cost Insight
          </h2>

          <div className="ai-insight">

            <div className="ai-symbol">
              ✨
            </div>

            <div>

              <h3>
                Cost Optimization
              </h3>

              <p>
                The orchestrator can analyze
                resource usage and recommend
                cost-efficient cloud placement
                for workloads.
              </p>

            </div>

          </div>


          <div className="recommendation">

            <strong>
              Recommendation
            </strong>

            <p>
              Compare compute, storage and
              network costs across AWS,
              Azure and Google Cloud before
              deploying new workloads.
            </p>

          </div>

        </div>

      </div>


      <div className="cost-section resource-cost">

        <div className="section-title">

          <div>

            <h2>
              Resource Cost Details
            </h2>

            <p>
              Estimated cost of individual
              cloud resources.
            </p>

          </div>

        </div>


        {loading ? (

          <div className="loading">
            Loading cost information...
          </div>

        ) : (

          <div className="cost-table-wrapper">

            <table>

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
                    Region
                  </th>

                  <th>
                    Monthly Cost
                  </th>

                </tr>

              </thead>

              <tbody>

                {resources.map(
                  (resource, index) => (

                    <tr key={index}>

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
                        {resource.region}
                      </td>

                      <td>
                        <strong>
                          {resource.cost}
                        </strong>
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

        .cost-page {
          min-height: 100vh;
          padding: 30px;
          background: #f6f8fc;
        }

        .cost-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .cost-header h1 {
          margin: 0;
          font-size: 32px;
          color: #172033;
        }

        .cost-header p {
          color: #6b7280;
          margin-top: 8px;
        }

        .cost-period {
          background: white;
          padding: 11px 17px;
          border-radius: 8px;
          color: #475569;
          font-size: 14px;
          box-shadow:
            0 3px 12px rgba(0,0,0,0.05);
        }

        .cost-cards {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 25px;
        }

        .cost-card {
          background: white;
          padding: 22px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow:
            0 4px 15px rgba(0,0,0,0.05);
        }

        .cost-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #eef2ff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          font-weight: bold;
        }

        .cost-card span {
          color: #6b7280;
          font-size: 13px;
        }

        .cost-card h2 {
          margin: 6px 0 0;
          color: #172033;
        }

        .cost-layout {
          display: grid;
          grid-template-columns:
            1.4fr 1fr;
          gap: 20px;
          margin-bottom: 25px;
        }

        .cost-section {
          background: white;
          padding: 25px;
          border-radius: 14px;
          box-shadow:
            0 4px 15px rgba(0,0,0,0.05);
        }

        .cost-section h2 {
          margin-top: 0;
          color: #172033;
        }

        .section-title p {
          color: #6b7280;
          margin-top: 6px;
        }

        .provider-row {
          margin-top: 24px;
        }

        .provider-name {
          display: flex;
          justify-content: space-between;
          margin-bottom: 9px;
        }

        .provider-dot {
          font-weight: 600;
        }

        .cost-bar {
          height: 10px;
          background: #edf1f7;
          border-radius: 20px;
          overflow: hidden;
        }

        .bar-fill {
          height: 100%;
          border-radius: 20px;
        }

        .aws-fill {
          background: #ff9900;
        }

        .azure-fill {
          background: #0078d4;
        }

        .gcp-fill {
          background: #4285f4;
        }

        .ai-insight {
          display: flex;
          gap: 15px;
          padding: 18px;
          background: #f5f3ff;
          border-radius: 12px;
        }

        .ai-symbol {
          font-size: 28px;
        }

        .ai-insight h3 {
          margin: 0;
          color: #312e81;
        }

        .ai-insight p {
          color: #5b5b70;
          line-height: 1.5;
        }

        .recommendation {
          margin-top: 18px;
          padding: 17px;
          border-left: 4px solid #6366f1;
          background: #f8fafc;
        }

        .recommendation p {
          color: #64748b;
          line-height: 1.5;
        }

        .cost-table-wrapper {
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

        .loading {
          padding: 40px;
          text-align: center;
          color: #64748b;
        }

        @media (max-width: 1000px) {

          .cost-cards {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .cost-layout {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .cost-page {
            padding: 20px;
          }

          .cost-cards {
            grid-template-columns: 1fr;
          }

          .cost-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

        }

      `}</style>

    </div>
  );
}

export default CostAnalysis;