import { useEffect, useState } from "react";

const API_URL =
  "https://enterprise-ai-multi-cloud-orchestrator.onrender.com";

function CloudProviders() {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProviders();
  }, []);

  async function loadProviders() {
    try {
      const response = await fetch(
        `${API_URL}/api/cloud/providers`
      );

      const data = await response.json();

      setProviders(data.providers || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const providerInfo = {
    AWS: {
      short: "AWS",
      name: "Amazon Web Services",
      description:
        "Scalable cloud computing, storage and infrastructure services.",
      icon: "AWS",
      className: "aws"
    },

    Azure: {
      short: "AZ",
      name: "Microsoft Azure",
      description:
        "Enterprise cloud platform for computing, storage and AI services.",
      icon: "AZ",
      className: "azure"
    },

    "Google Cloud": {
      short: "GCP",
      name: "Google Cloud Platform",
      description:
        "Cloud infrastructure and data services for modern applications.",
      icon: "G",
      className: "gcp"
    }
  };

  return (
    <div className="providers-page">

      {/* HEADER */}

      <header className="page-header">

        <div>
          <span className="page-label">
            CLOUD INFRASTRUCTURE
          </span>

          <h1>
            Cloud Providers
          </h1>

          <p>
            Manage and monitor your connected
            cloud platforms from one place.
          </p>
        </div>

        <div className="connection-status">
          <span></span>
          Multi-Cloud System Online
        </div>

      </header>

      {/* SUMMARY */}

      <section className="summary-grid">

        <div className="summary-card">
          <div className="summary-icon">
            ☁
          </div>

          <div>
            <small>
              TOTAL PROVIDERS
            </small>

            <strong>
              {providers.length}
            </strong>

            <p>
              Configured platforms
            </p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon green">
            ✓
          </div>

          <div>
            <small>
              CONNECTED
            </small>

            <strong>
              {providers.length}
            </strong>

            <p>
              Providers available
            </p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon purple">
            ✦
          </div>

          <div>
            <small>
              AI MANAGEMENT
            </small>

            <strong>
              ON
            </strong>

            <p>
              Intelligent orchestration
            </p>
          </div>
        </div>

      </section>

      {/* PROVIDERS */}

      <section className="providers-section">

        <div className="section-heading">

          <div>
            <span>
              AVAILABLE PLATFORMS
            </span>

            <h2>
              Connected Cloud Providers
            </h2>
          </div>

          <div className="provider-count">
            {providers.length} Providers
          </div>

        </div>

        {loading ? (

          <div className="loading">
            Loading cloud providers...
          </div>

        ) : (

          <div className="provider-grid">

            {providers.map((provider) => {

              const info =
                providerInfo[provider] ||
                {
                  short: "C",
                  name: provider,
                  description:
                    "Cloud provider",
                  icon: "☁",
                  className: "default"
                };

              return (

                <div
                  className={`provider-card ${info.className}`}
                  key={provider}
                >

                  <div className="card-top">

                    <div className="provider-logo">
                      {info.icon}
                    </div>

                    <span className="status-badge">
                      <i></i>
                      Connected
                    </span>

                  </div>

                  <div className="provider-content">

                    <span className="provider-code">
                      {info.short}
                    </span>

                    <h3>
                      {provider}
                    </h3>

                    <p>
                      {info.name}
                    </p>

                    <div className="description">
                      {info.description}
                    </div>

                  </div>

                  <div className="card-footer">

                    <div>
                      <small>
                        STATUS
                      </small>

                      <strong>
                        Ready
                      </strong>
                    </div>

                    <button>
                      Manage →
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        )}

      </section>

      {/* AI SECTION */}

      <section className="ai-provider-section">

        <div className="ai-circle">
          ✦
        </div>

        <div className="ai-text">

          <span>
            AI-POWERED ORCHESTRATION
          </span>

          <h2>
            One control layer for every cloud
          </h2>

          <p>
            CloudMind provides a unified interface
            to monitor, analyze and manage
            multi-cloud infrastructure.
          </p>

        </div>

        <div className="ai-flow">

          <div>AWS</div>
          <span>→</span>
          <div>AI</div>
          <span>→</span>
          <div>Azure</div>
          <span>→</span>
          <div>GCP</div>

        </div>

      </section>

      {/* CSS */}

      <style>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family:
            Inter,
            Arial,
            sans-serif;
          background: #f6f8fc;
          color: #172033;
        }

        .providers-page {
          min-height: 100vh;
          padding: 38px;
          background: #f6f8fc;
        }

        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid #e5e9f1;
          padding-bottom: 25px;
        }

        .page-label {
          color: #5968df;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .page-header h1 {
          margin: 7px 0 5px;
          font-size: 30px;
          letter-spacing: -0.7px;
        }

        .page-header p {
          margin: 0;
          color: #8791a5;
          font-size: 13px;
        }

        .connection-status {
          background: white;
          border: 1px solid #e2e7ef;
          padding: 10px 15px;
          border-radius: 22px;
          color: #536078;
          font-size: 11px;
        }

        .connection-status span {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          margin-right: 7px;
          box-shadow:
            0 0 8px #22c55e;
        }

        .summary-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 18px;
          margin-top: 25px;
        }

        .summary-card {
          background: white;
          border: 1px solid #e7ebf2;
          border-radius: 15px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow:
            0 5px 18px
            rgba(30,40,70,0.04);
        }

        .summary-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          background: #eef3ff;
          color: #4f65df;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          font-weight: 800;
        }

        .summary-icon.green {
          background: #eafaf2;
          color: #159b68;
        }

        .summary-icon.purple {
          background: #f2edff;
          color: #7857d8;
        }

        .summary-card small {
          display: block;
          color: #8c96a9;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 0.8px;
        }

        .summary-card strong {
          display: block;
          margin: 3px 0;
          font-size: 22px;
        }

        .summary-card p {
          margin: 0;
          color: #a0a8b8;
          font-size: 9px;
        }

        .providers-section {
          margin-top: 38px;
        }

        .section-heading {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 17px;
        }

        .section-heading > div:first-child span {
          color: #7c88a0;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.3px;
        }

        .section-heading h2 {
          margin: 5px 0 0;
          font-size: 20px;
        }

        .provider-count {
          color: #8b95a8;
          font-size: 11px;
        }

        .provider-grid {
          display: grid;
          grid-template-columns:
            repeat(3, 1fr);
          gap: 20px;
        }

        .provider-card {
          background: white;
          border: 1px solid #e4e8f0;
          border-radius: 18px;
          padding: 23px;
          position: relative;
          overflow: hidden;
          transition: 0.2s;
        }

        .provider-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 15px 35px
            rgba(35,45,80,0.10);
        }

        .provider-card::after {
          content: "";
          position: absolute;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          right: -55px;
          top: -55px;
          opacity: 0.5;
        }

        .provider-card.aws::after {
          background: #ffe6bd;
        }

        .provider-card.azure::after {
          background: #dcecff;
        }

        .provider-card.gcp::after {
          background: #e9ddff;
        }

        .card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        .provider-logo {
          width: 58px;
          height: 58px;
          border-radius: 15px;
          background: #f2f4f8;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          font-size: 14px;
          color: #26324b;
        }

        .status-badge {
          padding: 6px 9px;
          border-radius: 20px;
          background: #ecfaf3;
          color: #149665;
          font-size: 9px;
          font-weight: 700;
        }

        .status-badge i {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #20b477;
          margin-right: 5px;
        }

        .provider-content {
          margin-top: 25px;
        }

        .provider-code {
          color: #8590a5;
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .provider-content h3 {
          margin: 5px 0 3px;
          font-size: 21px;
        }

        .provider-content p {
          margin: 0;
          color: #59657b;
          font-size: 11px;
        }

        .description {
          margin-top: 17px;
          color: #8b95a8;
          line-height: 1.6;
          font-size: 10px;
          min-height: 34px;
        }

        .card-footer {
          border-top: 1px solid #edf0f4;
          margin-top: 22px;
          padding-top: 15px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .card-footer small {
          display: block;
          color: #9aa3b3;
          font-size: 8px;
        }

        .card-footer strong {
          display: block;
          margin-top: 3px;
          color: #159968;
          font-size: 11px;
        }

        .card-footer button {
          border: 1px solid #cfd8f5;
          background: #eef3ff;
          color: #3157c8;
          padding: 8px 13px;
          border-radius: 7px;
          font-size: 10px;
          font-weight: 700;
          cursor: pointer;
        }

        .card-footer button:hover {
          background: #dce6ff;
          color: #1f45ae;
        }

        .ai-provider-section {
          margin-top: 35px;
          padding: 25px 28px;
          border-radius: 18px;
          background:
            linear-gradient(
              110deg,
              #111932,
              #1d2854,
              #151e3b
            );
          color: white;
          display: flex;
          align-items: center;
          gap: 18px;
          overflow: hidden;
          position: relative;
        }

        .ai-circle {
          width: 55px;
          height: 55px;
          flex-shrink: 0;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            linear-gradient(
              135deg,
              #665df5,
              #32a9ff
            );
          font-size: 22px;
          font-weight: 800;
          box-shadow:
            0 0 30px
            rgba(80,100,255,0.45);
        }

        .ai-text {
          flex: 1;
        }

        .ai-text span {
          color: #8999ff;
          font-size: 8px;
          font-weight: 800;
          letter-spacing: 1.4px;
        }

        .ai-text h2 {
          margin: 5px 0;
          font-size: 17px;
        }

        .ai-text p {
          margin: 0;
          color: #abb5cf;
          font-size: 10px;
        }

        .ai-flow {
          display: flex;
          align-items: center;
          gap: 9px;
          font-size: 10px;
          font-weight: 700;
        }

        .ai-flow div {
          padding: 9px 12px;
          border: 1px solid
            rgba(255,255,255,0.12);
          border-radius: 7px;
          background:
            rgba(255,255,255,0.06);
        }

        .ai-flow span {
          color: #7786ff;
          font-size: 15px;
        }

        .loading {
          background: white;
          padding: 50px;
          text-align: center;
          border-radius: 15px;
          color: #7d879b;
        }

        @media (max-width: 900px) {

          .providers-page {
            padding: 22px;
          }

          .provider-grid {
            grid-template-columns: 1fr;
          }

          .summary-grid {
            grid-template-columns: 1fr;
          }

          .ai-provider-section {
            flex-wrap: wrap;
          }

        }

        @media (max-width: 600px) {

          .page-header {
            flex-direction: column;
            gap: 15px;
          }

          .page-header h1 {
            font-size: 25px;
          }

          .ai-flow {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }

        }

      `}</style>

    </div>
  );
}

export default CloudProviders;