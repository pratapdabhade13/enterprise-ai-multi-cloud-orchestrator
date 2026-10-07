import { useEffect, useState } from "react";

function AIAdvisor() {

  const API_URL =
    "https://enterprise-ai-multi-cloud-orchestrator.onrender.com";

  const [resources, setResources] = useState([]);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadData = async () => {

      try {

        const [resourceResponse, providerResponse] =
          await Promise.all([
            fetch(`${API_URL}/api/resources`),
            fetch(`${API_URL}/api/cloud/providers`)
          ]);

        const resourceData =
          await resourceResponse.json();

        const providerData =
          await providerResponse.json();

        setResources(
          resourceData.resources || []
        );

        setProviders(
          providerData.providers || []
        );

      } catch (error) {

        console.error(
          "AI Advisor data loading failed:",
          error
        );

      } finally {

        setLoading(false);
      }
    };

    loadData();

  }, []);

  const runningResources =
    resources.filter(
      resource =>
        resource.status === "Running"
    ).length;

  const storageResources =
    resources.filter(
      resource =>
        resource.type === "S3" ||
        resource.type === "Blob Storage" ||
        resource.type === "Cloud Storage"
    ).length;

  const recommendations = [

    {
      icon: "💰",
      title: "Cost Optimization",
      priority: "High",
      description:
        "Compare monthly resource costs across cloud providers before deploying new workloads.",
      action:
        "Review expensive compute resources and evaluate lower-cost alternatives."
    },

    {
      icon: "⚡",
      title: "Resource Optimization",
      priority: "Medium",
      description:
        "Monitor running compute resources and identify workloads that may be over-provisioned.",
      action:
        "Review CPU and memory utilization before increasing resource capacity."
    },

    {
      icon: "☁",
      title: "Multi-Cloud Strategy",
      priority: "Medium",
      description:
        "Use the orchestrator to compare AWS, Azure and Google Cloud resources from one platform.",
      action:
        "Evaluate workload requirements before selecting a cloud provider."
    },

    {
      icon: "🔐",
      title: "Security Recommendation",
      priority: "High",
      description:
        "Cloud credentials and storage access should be protected using secure IAM policies and environment variables.",
      action:
        "Use least-privilege permissions and rotate credentials regularly."
    }

  ];

  return (

    <div className="advisor-page">

      <div className="advisor-header">

        <div>

          <h1>AI Advisor</h1>

          <p>
            AI-powered recommendations for
            your multi-cloud infrastructure.
          </p>

        </div>

        <div className="ai-status">

          <span className="status-dot"></span>

          AI Engine Active

        </div>

      </div>


      <div className="advisor-overview">

        <div className="overview-card">

          <div className="overview-icon">
            ☁
          </div>

          <div>

            <span>
              Cloud Providers
            </span>

            <h2>
              {providers.length || 3}
            </h2>

          </div>

        </div>


        <div className="overview-card">

          <div className="overview-icon">
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


        <div className="overview-card">

          <div className="overview-icon">
            ▶
          </div>

          <div>

            <span>
              Running Resources
            </span>

            <h2>
              {runningResources}
            </h2>

          </div>

        </div>


        <div className="overview-card">

          <div className="overview-icon">
            📦
          </div>

          <div>

            <span>
              Storage Resources
            </span>

            <h2>
              {storageResources}
            </h2>

          </div>

        </div>

      </div>


      <div className="advisor-main">


        <div className="recommendation-section">

          <div className="section-heading">

            <div>

              <h2>
                AI Recommendations
              </h2>

              <p>
                Intelligent suggestions based on
                your cloud environment.
              </p>

            </div>

          </div>


          {loading ? (

            <div className="advisor-loading">
              Analyzing cloud environment...
            </div>

          ) : (

            <div className="recommendation-list">

              {recommendations.map(
                (item, index) => (

                  <div
                    className="recommendation-card"
                    key={index}
                  >

                    <div className="recommendation-icon">
                      {item.icon}
                    </div>

                    <div className="recommendation-content">

                      <div className="recommendation-title">

                        <h3>
                          {item.title}
                        </h3>

                        <span
                          className={
                            item.priority === "High"
                              ? "priority high"
                              : "priority medium"
                          }
                        >
                          {item.priority}
                        </span>

                      </div>

                      <p>
                        {item.description}
                      </p>

                      <div className="action-box">

                        <strong>
                          Suggested Action:
                        </strong>

                        <span>
                          {item.action}
                        </span>

                      </div>

                    </div>

                  </div>

                )
              )}

            </div>

          )}

        </div>


        <div className="advisor-side">

          <div className="advisor-chat-card">

            <div className="chat-icon">
              ✨
            </div>

            <h2>
              Generative AI Assistant
            </h2>

            <p>
              Ask questions about your cloud
              infrastructure, costs, resources
              and deployment strategy.
            </p>

            <button
              className="chat-button"
              onClick={() =>
                alert(
                  "Generative AI Chatbot will be available in the next module."
                )
              }
            >
              Open AI Assistant
            </button>

          </div>


          <div className="insight-card">

            <h3>
              Infrastructure Insight
            </h3>

            <div className="insight-item">

              <span>
                Cloud Environment
              </span>

              <strong>
                Multi-Cloud
              </strong>

            </div>

            <div className="insight-item">

              <span>
                Providers
              </span>

              <strong>
                {providers.length || 3}
              </strong>

            </div>

            <div className="insight-item">

              <span>
                Resources
              </span>

              <strong>
                {resources.length}
              </strong>

            </div>

            <div className="insight-item">

              <span>
                AI Status
              </span>

              <strong className="active-text">
                Active
              </strong>

            </div>

          </div>

        </div>

      </div>


      <style>{`

        .advisor-page {
          min-height: 100vh;
          padding: 30px;
          background: #f6f8fc;
        }

        .advisor-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .advisor-header h1 {
          margin: 0;
          font-size: 32px;
          color: #172033;
        }

        .advisor-header p {
          margin-top: 8px;
          color: #6b7280;
        }

        .ai-status {
          background: #ecfdf5;
          color: #047857;
          padding: 10px 15px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: 600;
        }

        .status-dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          margin-right: 7px;
        }

        .advisor-overview {
          display: grid;
          grid-template-columns:
            repeat(4, 1fr);
          gap: 20px;
          margin-bottom: 25px;
        }

        .overview-card {
          background: white;
          padding: 22px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow:
            0 4px 15px rgba(0,0,0,0.05);
        }

        .overview-icon {
          width: 48px;
          height: 48px;
          background: #eef2ff;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
        }

        .overview-card span {
          color: #6b7280;
          font-size: 13px;
        }

        .overview-card h2 {
          margin: 5px 0 0;
          color: #172033;
        }

        .advisor-main {
          display: grid;
          grid-template-columns:
            1.6fr 0.8fr;
          gap: 20px;
        }

        .recommendation-section {
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

        .recommendation-list {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-top: 22px;
        }

        .recommendation-card {
          display: flex;
          gap: 15px;
          padding: 18px;
          border: 1px solid #edf0f5;
          border-radius: 12px;
        }

        .recommendation-icon {
          width: 45px;
          height: 45px;
          background: #f5f3ff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 21px;
          flex-shrink: 0;
        }

        .recommendation-content {
          flex: 1;
        }

        .recommendation-title {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .recommendation-title h3 {
          margin: 0;
          color: #172033;
        }

        .priority {
          font-size: 11px;
          padding: 4px 8px;
          border-radius: 15px;
        }

        .priority.high {
          background: #fee2e2;
          color: #b91c1c;
        }

        .priority.medium {
          background: #fef3c7;
          color: #92400e;
        }

        .recommendation-content p {
          color: #64748b;
          line-height: 1.5;
        }

        .action-box {
          background: #f8fafc;
          padding: 10px 12px;
          border-radius: 7px;
          display: flex;
          gap: 7px;
          font-size: 13px;
        }

        .action-box strong {
          color: #374151;
        }

        .action-box span {
          color: #64748b;
        }

        .advisor-side {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .advisor-chat-card {
          background: #172033;
          color: white;
          padding: 28px;
          border-radius: 14px;
        }

        .chat-icon {
          font-size: 30px;
          margin-bottom: 15px;
        }

        .advisor-chat-card h2 {
          margin: 0;
        }

        .advisor-chat-card p {
          color: #cbd5e1;
          line-height: 1.6;
        }

        .chat-button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 8px;
          background: white;
          color: #172033;
          font-weight: 600;
          cursor: pointer;
          margin-top: 10px;
        }

        .insight-card {
          background: white;
          padding: 23px;
          border-radius: 14px;
          box-shadow:
            0 4px 15px rgba(0,0,0,0.05);
        }

        .insight-card h3 {
          margin-top: 0;
          color: #172033;
        }

        .insight-item {
          display: flex;
          justify-content: space-between;
          padding: 13px 0;
          border-bottom: 1px solid #edf0f5;
          font-size: 14px;
        }

        .insight-item span {
          color: #64748b;
        }

        .active-text {
          color: #059669;
        }

        .advisor-loading {
          padding: 50px;
          text-align: center;
          color: #64748b;
        }

        @media (max-width: 1000px) {

          .advisor-overview {
            grid-template-columns:
              repeat(2, 1fr);
          }

          .advisor-main {
            grid-template-columns: 1fr;
          }

        }

        @media (max-width: 600px) {

          .advisor-page {
            padding: 20px;
          }

          .advisor-overview {
            grid-template-columns: 1fr;
          }

          .advisor-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

        }

      `}</style>

    </div>
  );
}

export default AIAdvisor;