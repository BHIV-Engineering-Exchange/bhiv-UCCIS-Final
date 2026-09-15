import React, { useEffect, useState } from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  LineChart,
  Line,
} from "recharts";


/* =========================================================
   TASK 20 DATA
========================================================= */

const phases = [
  "Overview",
  "Phase 1",
  "Phase 2",
  "Phase 3",
  "Phase 4",
  "Phase 5",
  "Phase 6",
  "Phase 7",
];


const trendData = [
  { name: "Mon", value: 62 },
  { name: "Tue", value: 71 },
  { name: "Wed", value: 69 },
  { name: "Thu", value: 80 },
  { name: "Fri", value: 76 },
  { name: "Sat", value: 88 },
  { name: "Sun", value: 91 },
];


const escalationData = [
  {
    name: "Critical",
    value: 4,
  },
  {
    name: "Medium",
    value: 9,
  },
  {
    name: "Low",
    value: 16,
  },
];


const departmentData = [
  {
    name: "Police",
    value: 84,
  },
  {
    name: "Health",
    value: 72,
  },
  {
    name: "Transport",
    value: 65,
  },
  {
    name: "Disaster",
    value: 91,
  },
  {
    name: "Power",
    value: 58,
  },
];


const pieColors = [
  "#ef4444",
  "#f59e0b",
  "#22c55e",
];


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function Task20() {

  const [selectedPhase, setSelectedPhase] =
    useState("Overview");


  const [runtime, setRuntime] = useState({
    health: 84,
    operators: 31,
    escalations: 1,
    heartbeat: 94,
  });


  /* =======================================================
     LIVE DATA
  ======================================================= */

  useEffect(() => {

    const timer = setInterval(() => {

      setRuntime({
        health:
          Math.floor(Math.random() * 10) + 80,

        operators:
          Math.floor(Math.random() * 8) + 27,

        escalations:
          Math.floor(Math.random() * 4) + 1,

        heartbeat:
          Math.floor(Math.random() * 7) + 91,
      });

    }, 4000);


    return () => clearInterval(timer);

  }, []);


  /* =======================================================
     OVERVIEW
  ======================================================= */

  const renderOverview = () => {

    return (
      <>

        {/* =================================================
            STATUS CARDS
        ================================================= */}

        <div className="task20-status-grid">

          <div className="task20-status-card">

            <span className="task20-card-label">
              OPERATIONAL HEALTH
            </span>

            <h2>
              {runtime.health}%
            </h2>

            <p>
              Stable Runtime
            </p>

          </div>


          <div className="task20-status-card">

            <span className="task20-card-label">
              ACTIVE OPERATORS
            </span>

            <h2>
              {runtime.operators}
            </h2>

            <p>
              Connected Units
            </p>

          </div>


          <div className="task20-status-card">

            <span className="task20-card-label">
              ESCALATIONS
            </span>

            <h2>
              {runtime.escalations}
            </h2>

            <p>
              Live Runtime Events
            </p>

          </div>


          <div className="task20-status-card">

            <span className="task20-card-label">
              HEARTBEAT
            </span>

            <h2>
              {runtime.heartbeat}%
            </h2>

            <p>
              System Connectivity
            </p>

          </div>

        </div>


        {/* =================================================
            CHARTS
        ================================================= */}

        <div className="task20-chart-grid">


          {/* OPERATIONAL TREND */}

          <div className="task20-panel">

            <div className="task20-panel-header">

              <div>

                {/* <span>
                  LIVE TELEMETRY
                </span> */}

                <h2>
                  Operational Trend
                </h2>

              </div>

              {/* <b>
                ACTIVE
              </b> */}

            </div>


            <div className="task20-chart">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <AreaChart
                  data={trendData}
                  margin={{
                    top: 10,
                    right: 10,
                    left: 0,
                    bottom: 20,
                  }}
                >

                  <defs>

                    <linearGradient
                      id="task20TrendGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >

                      <stop
                        offset="5%"
                        stopColor="#38bdf8"
                        stopOpacity={0.75}
                      />

                      <stop
                        offset="95%"
                        stopColor="#38bdf8"
                        stopOpacity={0}
                      />

                    </linearGradient>

                  </defs>


                  <CartesianGrid
                    stroke="#1e293b"
                    strokeDasharray="3 3"
                  />


                  <XAxis
                    dataKey="name"
                    stroke="#94a3b8"
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 11,
                    }}
                    label={{
                      value: "Time",
                      position: "insideBottom",
                      offset: -12,
                      fill: "#cbd5e1",
                      fontSize: 11,
                    }}
                  />


                  <YAxis
                    domain={[0, 100]}
                    stroke="#94a3b8"
                    tick={{
                      fill: "#94a3b8",
                      fontSize: 11,
                    }}
                    label={{
                      value: "Performance (%)",
                      angle: -90,
                      position: "insideLeft",
                      fill: "#cbd5e1",
                      fontSize: 11,
                    }}
                  />


                  <Tooltip
                    contentStyle={{
                      background: "#081426",
                      border:
                        "1px solid #1e293b",
                      borderRadius: "8px",
                      color: "#ffffff",
                    }}
                  />


                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#38bdf8"
                    strokeWidth={3}
                    fill="url(#task20TrendGradient)"
                  />

                </AreaChart>

              </ResponsiveContainer>

            </div>

          </div>


          {/* ESCALATION */}

          <div className="task20-panel">

            <div className="task20-panel-header">

              <div>

                {/* <span>
                  REALTIME ANALYSIS
                </span> */}

                <h2>
                  Escalation Matrix
                </h2>

              </div>

              {/* <b>
                LIVE
              </b> */}

            </div>


            <div className="task20-chart">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={escalationData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius="65%"
                    label
                  >

                    {escalationData.map(
                      (entry, index) => (

                        <Cell
                          key={entry.name}
                          fill={
                            pieColors[
                              index %
                              pieColors.length
                            ]
                          }
                        />

                      )
                    )}

                  </Pie>


                  <Tooltip
                    contentStyle={{
                      background: "#081426",
                      border:
                        "1px solid #1e293b",
                      borderRadius: "8px",
                    }}
                  />

                </PieChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>


        {/* =================================================
            MAP + INTELLIGENCE
        ================================================= */}

        <div className="task20-two-column">


          {/* MAP */}

          <div className="task20-panel task20-map-panel">

            <div className="task20-panel-header">

              <div>

                {/* <span>
                  GEOSPATIAL MONITORING
                </span> */}

                <h2>
                  GIS Operational Surface
                </h2>

              </div>

              {/* <b>
                TRACKING
              </b> */}

            </div>


            <div className="task20-map">

              <div className="task20-grid-background"></div>


              <div className="task20-connection task20-c1"></div>
              <div className="task20-connection task20-c2"></div>
              <div className="task20-connection task20-c3"></div>
              <div className="task20-connection task20-c4"></div>


              <div className="task20-map-hub">
                UCCIS
              </div>


              <div className="task20-city task20-city1">
                Mumbai
              </div>

              <div className="task20-city task20-city2">
                Pune
              </div>

              <div className="task20-city task20-city3">
                Nashik
              </div>

              <div className="task20-city task20-city4">
                Nagpur
              </div>

            </div>

          </div>


          {/* INTELLIGENCE */}

          <div className="task20-panel">

            <div className="task20-panel-header">

              <div>

                {/* <span>
                  AI ANALYSIS
                </span> */}

                <h2>
                  Department Intelligence
                </h2>

              </div>

            </div>


            <div className="task20-intelligence-grid">

              <div className="task20-intel-card">

                <span>
                  District Stability
                </span>

                <strong>
                  89%
                </strong>

              </div>


              <div className="task20-intel-card">

                <span>
                  Telemetry Integrity
                </span>

                <strong>
                  94%
                </strong>

              </div>


              <div className="task20-intel-card">

                <span>
                  Signal Accuracy
                </span>

                <strong>
                  91%
                </strong>

              </div>


              <div className="task20-intel-card">

                <span>
                  Replay Continuity
                </span>

                <strong>
                  96%
                </strong>

              </div>


              <div className="task20-intel-card">

                <span>
                  Runtime Stability
                </span>

                <strong>
                  92%
                </strong>

              </div>


              <div className="task20-intel-card">

                <span>
                  Governance Health
                </span>

                <strong>
                  95%
                </strong>

              </div>

            </div>


            <div className="task20-system-status">

              <div>

                <span>
                  System Status
                </span>

                <strong>
                  OPERATIONAL
                </strong>

              </div>


              <div>

                <span>
                  Telemetry
                </span>

                <strong>
                  CONNECTED
                </strong>

              </div>


              <div>

                <span>
                  Replay
                </span>

                <strong>
                  VALIDATED
                </strong>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            DEPARTMENT PERFORMANCE
        ================================================= */}

        <div className="task20-panel">

          <div className="task20-panel-header">
            <div>
              <h2>Department Performance Matrix</h2>
            </div>
          </div>

          <div className="task20-department-chart">
            <ResponsiveContainer width="100%" height={420}>
              <BarChart
                data={departmentData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 40,
                }}
              >
                <CartesianGrid
                  stroke="#1e293b"
                  strokeDasharray="3 3"
                  vertical={false}
                />

                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                  tickLine={{
                    stroke: "#334155",
                  }}
                  axisLine={{
                    stroke: "#334155",
                  }}
                  label={{
                    value: "Departments",
                    position: "insideBottom",
                    offset: -25,
                    fill: "#cbd5e1",
                    fontSize: 12,
                  }}
                />

                <YAxis
                  domain={[0, 100]}
                  stroke="#94a3b8"
                  tick={{
                    fill: "#94a3b8",
                    fontSize: 12,
                  }}
                  tickLine={{
                    stroke: "#334155",
                  }}
                  axisLine={{
                    stroke: "#334155",
                  }}
                  label={{
                    value: "Performance (%)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#cbd5e1",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  cursor={{
                    fill: "rgba(56,189,248,0.05)",
                  }}
                  contentStyle={{
                    background: "#081426",
                    border: "1px solid #1e293b",
                    borderRadius: "8px",
                    color: "#ffffff",
                  }}
                  labelStyle={{
                    color: "#38bdf8",
                  }}
                  formatter={(value) => [`${value}%`, "Performance"]}
                />

                <Bar
                  dataKey="value"
                  name="Performance"
                  fill="#3b82f6"
                  radius={[8, 8, 0, 0]}
                  barSize={55}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

        {/* =================================================
            PHASES
        ================================================= */}

        <div className="task20-panel">

          <div className="task20-panel-header">

            <div>

              {/* <span>
                GOVERNANCE CAPABILITY
              </span> */}

              <h2>
                Capability Layers
              </h2>

            </div>

          </div>


          <div className="task20-phase-grid">

            <PhaseCard
              phase="Phase 1"
              text="Canonical repository consolidation complete."
            />

            <PhaseCard
              phase="Phase 2"
              text="Operational chain execution validated."
            />

            <PhaseCard
              phase="Phase 3"
              text="Feature growth and intelligence layers active."
            />

            <PhaseCard
              phase="Phase 4"
              text="Hardening and degraded runtime handling enabled."
            />

            <PhaseCard
              phase="Phase 5"
              text="Live operational heartbeat and ticker streaming."
            />

            <PhaseCard
              phase="Phase 6"
              text="Command-center dashboard maturity expanded."
            />

            <PhaseCard
              phase="Phase 7"
              text="Testing, evidence and runtime validation active."
            />

            <PhaseCard
              phase="System"
              text="Unified governance intelligence runtime operational."
            />

          </div>

        </div>

      </>
    );

  };


  /* =======================================================
     PHASE VIEW
  ======================================================= */

  const renderPhase = () => {

    return (
      <>

        <div className="task20-section-heading">

          <span>
            OPERATIONAL PHASE
          </span>

          <h1>
            {selectedPhase}
          </h1>

          <p>
            Live monitoring and intelligence for {selectedPhase}.
          </p>

        </div>


        {/* STATUS */}

        <div className="task20-status-grid">

          <div className="task20-status-card">

            <span className="task20-card-label">
              PHASE STATUS
            </span>

            <h2 className="task20-green">
              ACTIVE
            </h2>

            <p>
              Operational Layer Running
            </p>

          </div>


          <div className="task20-status-card">

            <span className="task20-card-label">
              API RESPONSE
            </span>

            <h2>
              42ms
            </h2>

            <p>
              Healthy Runtime
            </p>

          </div>


          <div className="task20-status-card">

            <span className="task20-card-label">
              DATA INTEGRITY
            </span>

            <h2>
              96%
            </h2>

            <p>
              Validated Replay Layer
            </p>

          </div>


          <div className="task20-status-card">

            <span className="task20-card-label">
              HEARTBEAT
            </span>

            <h2>
              {runtime.heartbeat}%
            </h2>

            <p>
              Live System Connection
            </p>

          </div>

        </div>


        {/* TELEMETRY + JSON */}

        <div className="task20-two-column">

          <div className="task20-panel">

            <div className="task20-panel-header">

              <div>

                {/* <span>
                  LIVE TELEMETRY
                </span> */}

                <h2>
                  {selectedPhase} Telemetry
                </h2>

              </div>

            </div>


            <div className="task20-wide-chart task20-full-chart">

  <ResponsiveContainer
    width="100%"
    height="100%"
    minWidth={0}
    minHeight={0}
  >

    <LineChart
      data={trendData}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 35,
      }}
    >

      <CartesianGrid
        stroke="#1e293b"
        strokeDasharray="3 3"
        vertical={true}
      />

      <XAxis
        dataKey="name"
        stroke="#94a3b8"
        tick={{
          fill: "#94a3b8",
          fontSize: 12,
        }}
        tickLine={{
          stroke: "#334155",
        }}
        axisLine={{
          stroke: "#334155",
        }}
        label={{
          value: "Time",
          position: "insideBottom",
          offset: -20,
          fill: "#cbd5e1",
          fontSize: 12,
        }}
      />

      <YAxis
        domain={[0, 100]}
        stroke="#94a3b8"
        tick={{
          fill: "#94a3b8",
          fontSize: 12,
        }}
        tickLine={{
          stroke: "#334155",
        }}
        axisLine={{
          stroke: "#334155",
        }}
        label={{
          value: "Performance (%)",
          angle: -90,
          position: "insideLeft",
          fill: "#cbd5e1",
          fontSize: 12,
        }}
      />

      <Tooltip
        contentStyle={{
          background: "#081426",
          border: "1px solid #1e293b",
          borderRadius: "8px",
          color: "#ffffff",
        }}
        labelStyle={{
          color: "#38bdf8",
        }}
      />

      <Line
        type="monotone"
        dataKey="value"
        stroke="#38bdf8"
        strokeWidth={4}
        dot={{
          r: 5,
          fill: "#38bdf8",
          stroke: "#071426",
          strokeWidth: 2,
        }}
        activeDot={{
          r: 8,
        }}
      />

    </LineChart>

  </ResponsiveContainer>

</div>

          </div>


          {/* <div className="task20-panel">

            <div className="task20-panel-header">

              <div>

                <span>
                  RUNTIME DATA
                </span>

                <h2>
                  System State
                </h2>

              </div>

            </div>


            <pre className="task20-json">
{JSON.stringify(
  {
    phase: selectedPhase,
    runtime: "ACTIVE",
    telemetry: "CONNECTED",
    replay: "VALIDATED",
    escalation: "HEALTHY",
    heartbeat: runtime.heartbeat,
  },
  null,
  2
)}
            </pre>

          </div> */}

        </div>


        {/* EVENTS */}

        <div className="task20-panel">

          <div className="task20-panel-header">

            <div>

              {/* <span>
                EVENT STREAM
              </span> */}

              <h2>
                {selectedPhase} Runtime Events
              </h2>

            </div>

          </div>


          <RuntimeEvent
            title="Telemetry Updated"
            description="Operational synchronization successful."
          />

          <RuntimeEvent
            title="Replay Validation"
            description="Replay continuity verified."
          />

          <RuntimeEvent
            title="Escalation Intelligence"
            description="Runtime escalation processed successfully."
          />

        </div>

      </>
    );

  };


  /* =======================================================
     MAIN RETURN
  ======================================================= */

  return (

    <div className="task20-root">


      {/* =================================================
          SIDEBAR
      ================================================= */}

      <aside className="task20-sidebar">

        <div className="task20-logo">
          UCCIS
        </div>


        <div className="task20-sidebar-title">
          CONTROL CENTER
        </div>


        <div className="task20-sidebar-menu">

          {phases.map((phase) => (

            <button
              key={phase}
              type="button"
              className={
                selectedPhase === phase
                  ? "task20-sidebar-btn active"
                  : "task20-sidebar-btn"
              }
              onClick={() =>
                setSelectedPhase(phase)
              }
            >
              <span>
                {phase}
              </span>

              {selectedPhase === phase && (
                <b>●</b>
              )}

            </button>

          ))}

        </div>


        <div className="task20-sidebar-footer">

          <div className="task20-status-dot"></div>

          SYSTEM ONLINE

        </div>

      </aside>


      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="task20-main">


        {/* =================================================
            HEADER
        ================================================= */}

        <header className="task20-header">

          <div>

            <span className="task20-header-small">
              TASK 20 • COMMAND INTELLIGENCE
            </span>

            <h1>
              UCCIS
            </h1>

            <p>
              Unified Command & Control Intelligence System
            </p>

          </div>


          {/* <div className="task20-runtime"> */}

            {/* <div className="task20-live-dot"></div> */}

            <div>

              {/* <span>
                RUNTIME
              </span>

              <strong>
                ACTIVE
              </strong> */}

            {/* </div> */}

          </div>

        </header>


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        {selectedPhase === "Overview"
          ? renderOverview()
          : renderPhase()}


      </main>


      {/* =================================================
          INTERNAL CSS
      ================================================= */}

      <style>{`

        * {
          box-sizing: border-box;
        }


        .task20-root {

          width: 100%;

          min-height: 100vh;

          display: flex;

          background:
            radial-gradient(
              circle at 70% 0%,
              #0a1d36 0%,
              #030817 45%,
              #01040d 100%
            );

          color: #ffffff;

          font-family:
            Inter,
            Arial,
            Helvetica,
            sans-serif;

        }


        /* =================================================
           SIDEBAR
        ================================================= */

        .task20-sidebar {

          width: 230px;

          min-width: 230px;

          min-height: 100vh;

          padding: 24px 15px;

          display: flex;

          flex-direction: column;

          background:
            linear-gradient(
              180deg,
              #071426,
              #030b17
            );

          border-right:
            1px solid
            rgba(255,255,255,0.08);

          position: sticky;

          top: 0;

          height: 100vh;

        }


        .task20-logo {

          font-size: 28px;

          font-weight: 900;

          letter-spacing: 2px;

          color: #e0f2fe;

          padding:
            5px 10px 22px;

        }


        .task20-sidebar-title {

          color: #38bdf8;

          font-size: 9px;

          font-weight: 800;

          letter-spacing: 1.4px;

          padding: 0 10px 12px;

        }


        .task20-sidebar-menu {

          display: flex;

          flex-direction: column;

          gap: 7px;

        }


        .task20-sidebar-btn {

          width: 100%;

          padding: 12px 13px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          border: 1px solid transparent;

          border-radius: 8px;

          background: transparent;

          color: #7f93a7;

          text-align: left;

          font-size: 12px;

          cursor: pointer;

          transition: 0.2s;

        }


        .task20-sidebar-btn:hover {

          color: #ffffff;

          background:
            rgba(56,189,248,0.06);

        }


        .task20-sidebar-btn.active {

          color: #ffffff;

          background:
            linear-gradient(
              90deg,
              rgba(37,99,235,0.35),
              rgba(56,189,248,0.08)
            );

          border-color:
            rgba(56,189,248,0.2);

        }


        .task20-sidebar-btn b {

          color: #38bdf8;

          font-size: 7px;

        }


        .task20-sidebar-footer {

          margin-top: auto;

          padding: 12px;

          display: flex;

          align-items: center;

          gap: 8px;

          border-radius: 8px;

          background:
            rgba(34,197,94,0.06);

          color: #22c55e;

          font-size: 8px;

          font-weight: 800;

        }


        .task20-status-dot {

          width: 7px;

          height: 7px;

          border-radius: 50%;

          background: #22c55e;

          box-shadow:
            0 0 9px #22c55e;

        }


        /* =================================================
           MAIN
        ================================================= */

        .task20-main {

          flex: 1;

          min-width: 0;

          padding: 24px;

          overflow: hidden;

        }


        /* =================================================
           HEADER
        ================================================= */

        .task20-header {

          width: 100%;

          min-height: 130px;

          margin-bottom: 22px;

          padding: 22px 25px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 20px;

          border:
            1px solid
            rgba(56,189,248,0.12);

          border-radius: 16px;

          background:
            linear-gradient(
              135deg,
              rgba(13,32,52,0.98),
              rgba(5,16,29,0.98)
            );

        }


        .task20-header-small {

          color: #38bdf8;

          font-size: 9px;

          font-weight: 800;

          letter-spacing: 1.4px;

        }


        .task20-header h1 {

          margin: 7px 0 2px;

          font-size: 38px;

          line-height: 1;

          font-weight: 900;

        }


        .task20-header p {

          margin: 8px 0 0;

          color: #8da1b4;

          font-size: 12px;

        }


        .task20-runtime {

          min-width: 145px;

          padding: 14px 18px;

          display: flex;

          align-items: center;

          justify-content: center;

          gap: 11px;

          border:
            1px solid
            rgba(34,197,94,0.65);

          border-radius: 12px;

          background:
            rgba(34,197,94,0.08);

          box-shadow:
            0 0 30px
            rgba(34,197,94,0.08);

        }


        .task20-runtime span {

          display: block;

          color: #6b8499;

          font-size: 8px;

          font-weight: 800;

        }


        .task20-runtime strong {

          display: block;

          margin-top: 2px;

          color: #22c55e;

          font-size: 17px;

        }


        .task20-live-dot {

          width: 9px;

          height: 9px;

          border-radius: 50%;

          background: #22c55e;

          box-shadow:
            0 0 13px
            rgba(34,197,94,0.9);

        }


        /* =================================================
           STATUS
        ================================================= */

        .task20-status-grid {

          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 15px;

          margin-bottom: 18px;

        }


        .task20-status-card {

          position: relative;

          min-height: 155px;

          padding: 20px;

          overflow: hidden;

          border:
            1px solid
            rgba(56,189,248,0.13);

          border-radius: 14px;

          background:
            linear-gradient(
              180deg,
              #0d1b2d,
              #07111e
            );

          transition: 0.2s;

        }


        .task20-status-card::before {

          content: "";

          position: absolute;

          top: 0;

          left: 0;

          width: 100%;

          height: 3px;

          background:
            linear-gradient(
              90deg,
              #38bdf8,
              #2563eb
            );

        }


        .task20-status-card:hover {

          transform:
            translateY(-3px);

          border-color:
            rgba(56,189,248,0.35);

        }


        .task20-card-label {

          color: #7890a4;

          font-size: 9px;

          font-weight: 800;

          letter-spacing: 0.8px;

        }


        .task20-status-card h2 {

          margin: 18px 0 5px;

          font-size: 36px;

          line-height: 1;

          color: #38bdf8;

        }


        .task20-status-card p {

          margin: 0;

          color: #64788b;

          font-size: 10px;

        }


        .task20-green {

          color: #22c55e !important;

        }


        /* =================================================
           CHART GRID
        ================================================= */

        .task20-chart-grid {

          display: grid;

          grid-template-columns:
            minmax(0, 1.6fr)
            minmax(0, 1fr);

          gap: 16px;

          margin-bottom: 16px;

        }


        /* =================================================
           PANELS
        ================================================= */

        .task20-panel {

          width: 100%;

          margin-bottom: 16px;

          padding: 20px;

          border:
            1px solid
            rgba(255,255,255,0.07);

          border-radius: 14px;

          background:
            linear-gradient(
              180deg,
              rgba(13,29,47,0.97),
              rgba(4,12,23,0.97)
            );

          overflow: hidden;

        }


        .task20-panel-header {

          min-height: 35px;

          display: flex;

          align-items: flex-start;

          justify-content: space-between;

          gap: 15px;

          margin-bottom: 15px;

        }


        .task20-panel-header span {

          display: block;

          color: #38bdf8;

          font-size: 8px;

          font-weight: 800;

          letter-spacing: 1px;

          margin-bottom: 5px;

        }


        .task20-panel-header h2 {

          margin: 0;

          font-size: 17px;

          font-weight: 800;

        }


        .task20-panel-header b {

          padding: 6px 9px;

          border-radius: 5px;

          color: #38bdf8;

          background:
            rgba(56,189,248,0.07);

          font-size: 7px;

          letter-spacing: 0.5px;

        }


        /* =================================================
           CHART
        ================================================= */

        .task20-chart {

          width: 100%;

          height: 300px;

        }


        .task20-wide-chart {
          width: 100%;
          min-height: 430px;
          flex: 1;
          position: relative;
        }

        .task20-department-chart {
          width: 100%;
          height: 420px;
          min-width: 0;
          position: relative;
        }


/* FULL WIDTH CHART */

.task20-full-chart {
  width: 100%;
  min-width: 0;
  height: 480px;
  min-height: 480px;
  display: flex;
  align-items: stretch;
}


/* RECHARTS */

.task20-full-chart .recharts-responsive-container {
  width: 100% !important;
  height: 100% !important;
}


/* MAKE THE CHART PANEL USE MORE WIDTH */

.task20-panel:has(.task20-full-chart) {
  width: 100%;
  min-width: 0;
  min-height: 560px;
}


/* IMPORTANT:
   If the chart is inside task20-two-column,
   make the chart side larger.
*/

.task20-two-column:has(.task20-full-chart) {
  grid-template-columns: 1.8fr 1fr;
}


/* If you want the chart to occupy almost the entire row */

.task20-two-column.task20-chart-section {
  grid-template-columns: 2fr 1fr;
}


        /* =================================================
           TWO COLUMN
        ================================================= */

        .task20-two-column {

          display: grid;

          grid-template-columns:
            minmax(0, 1.5fr)
            minmax(0, 1fr);

          gap: 16px;

          margin-bottom: 0;

        }


        /* =================================================
           MAP
        ================================================= */

        .task20-map-panel {

          min-height: 510px;

        }


        .task20-map {

          position: relative;

          width: 100%;

          height: 415px;

          overflow: hidden;

          border-radius: 11px;

          background:
            radial-gradient(
              circle at center,
              #0c2940,
              #061324 65%,
              #030a14
            );

        }


        .task20-grid-background {

          position: absolute;

          inset: 0;

          background-image:
            linear-gradient(
              rgba(56,189,248,0.06) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(56,189,248,0.06) 1px,
              transparent 1px
            );

          background-size:
            38px 38px;

        }


        .task20-map-hub {

          position: absolute;

          left: 50%;

          top: 50%;

          transform:
            translate(-50%, -50%);

          width: 90px;

          height: 90px;

          display: flex;

          align-items: center;

          justify-content: center;

          border:
            2px solid
            #38bdf8;

          border-radius: 50%;

          background:
            #071b2c;

          color: #38bdf8;

          font-size: 15px;

          font-weight: 900;

          box-shadow:
            0 0 35px
            rgba(56,189,248,0.25);

          z-index: 3;

        }


        .task20-city {

          position: absolute;

          padding: 7px 11px;

          border:
            1px solid
            rgba(56,189,248,0.3);

          border-radius: 6px;

          background:
            rgba(5,20,34,0.9);

          color: #dbeafe;

          font-size: 10px;

          z-index: 3;

        }


        .task20-city1 {

          top: 15%;

          left: 18%;

        }


        .task20-city2 {

          top: 25%;

          right: 15%;

        }


        .task20-city3 {

          bottom: 20%;

          left: 15%;

        }


        .task20-city4 {

          bottom: 15%;

          right: 18%;

        }


        .task20-connection {

          position: absolute;

          height: 1px;

          background:
            linear-gradient(
              90deg,
              transparent,
              #38bdf8,
              transparent
            );

          transform-origin: left center;

          opacity: 0.45;

        }


        .task20-c1 {

          width: 260px;

          left: 24%;

          top: 31%;

          transform:
            rotate(20deg);

        }


        .task20-c2 {

          width: 230px;

          left: 50%;

          top: 50%;

          transform:
            rotate(-25deg);

        }


        .task20-c3 {

          width: 250px;

          left: 25%;

          top: 62%;

          transform:
            rotate(-20deg);

        }


        .task20-c4 {

          width: 220px;

          left: 50%;

          top: 50%;

          transform:
            rotate(30deg);

        }


        /* =================================================
           INTELLIGENCE
        ================================================= */

        .task20-intelligence-grid {

          display: grid;

          grid-template-columns:
            repeat(2, minmax(0, 1fr));

          gap: 10px;

        }


        .task20-intel-card {

          min-height: 100px;

          padding: 15px;

          border:
            1px solid
            rgba(255,255,255,0.06);

          border-radius: 9px;

          background:
            rgba(255,255,255,0.025);

        }


        .task20-intel-card span {

          color: #6e8497;

          font-size: 9px;

        }


        .task20-intel-card strong {

          display: block;

          margin-top: 10px;

          color: #38bdf8;

          font-size: 25px;

        }


        .task20-system-status {

          margin-top: 14px;

          display: flex;

          flex-direction: column;

          gap: 7px;

        }


        .task20-system-status div {

          display: flex;

          justify-content: space-between;

          padding: 9px 11px;

          border-radius: 6px;

          background:
            rgba(34,197,94,0.04);

        }


        .task20-system-status span {

          color: #71869a;

          font-size: 9px;

        }


        .task20-system-status strong {

          color: #22c55e;

          font-size: 8px;

        }


        /* =================================================
           PHASES
        ================================================= */

        .task20-phase-grid {

          display: grid;

          grid-template-columns:
            repeat(4, minmax(0, 1fr));

          gap: 11px;

        }


        .task20-phase-card {

          padding: 15px;

          min-height: 110px;

          border:
            1px solid
            rgba(56,189,248,0.1);

          border-radius: 9px;

          background:
            rgba(255,255,255,0.025);

          transition: 0.2s;

        }


        .task20-phase-card:hover {

          transform:
            translateY(-3px);

          border-color:
            rgba(56,189,248,0.35);

        }


        .task20-phase-card h3 {

          margin: 0 0 8px;

          color: #38bdf8;

          font-size: 13px;

        }


        .task20-phase-card p {

          margin: 0;

          color: #71869a;

          font-size: 9px;

          line-height: 1.5;

        }


        /* =================================================
           PHASE HEADER
        ================================================= */

        .task20-section-heading {

          margin-bottom: 18px;

          padding: 20px;

          border-radius: 12px;

          background:
            rgba(56,189,248,0.04);

          border:
            1px solid
            rgba(56,189,248,0.1);

        }


        .task20-section-heading span {

          color: #38bdf8;

          font-size: 8px;

          font-weight: 800;

          letter-spacing: 1.2px;

        }


        .task20-section-heading h1 {

          margin: 7px 0 4px;

          font-size: 25px;

        }


        .task20-section-heading p {

          margin: 0;

          color: #71869a;

          font-size: 10px;

        }


        /* =================================================
           JSON
        ================================================= */

        .task20-json {

          min-height: 270px;

          margin: 0;

          padding: 16px;

          overflow: auto;

          border-radius: 9px;

          background: #020617;

          border:
            1px solid
            rgba(255,255,255,0.05);

          color: #38bdf8;

          font-size: 10px;

          line-height: 1.7;

        }


        /* =================================================
           EVENTS
        ================================================= */

        .task20-event {

          display: flex;

          align-items: center;

          gap: 12px;

          padding: 13px;

          margin-bottom: 7px;

          border-radius: 7px;

          background:
            rgba(255,255,255,0.025);

          border:
            1px solid
            rgba(255,255,255,0.04);

        }


        .task20-event-dot {

          width: 7px;

          height: 7px;

          flex-shrink: 0;

          border-radius: 50%;

          background: #22c55e;

          box-shadow:
            0 0 8px
            rgba(34,197,94,0.6);

        }


        .task20-event strong {

          display: block;

          color: #dbeafe;

          font-size: 10px;

        }


        .task20-event span {

          display: block;

          margin-top: 3px;

          color: #667c8f;

          font-size: 8px;

        }


        /* =================================================
           RESPONSIVE
        ================================================= */

        @media (max-width: 1200px) {

          .task20-sidebar {

            width: 190px;

            min-width: 190px;

          }


          .task20-main {

            padding: 18px;

          }


          .task20-status-grid {

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

          }


          .task20-phase-grid {

            grid-template-columns:
              repeat(2, minmax(0, 1fr));

          }

        }


        @media (max-width: 900px) {

          .task20-root {

            display: block;

          }


          .task20-sidebar {

            position: relative;

            width: 100%;

            min-width: 100%;

            min-height: auto;

            height: auto;

          }


          .task20-sidebar-menu {

            display: grid;

            grid-template-columns:
              repeat(4, 1fr);

          }


          .task20-sidebar-footer {

            margin-top: 15px;

          }


          .task20-chart-grid,

          .task20-two-column {

            grid-template-columns: 1fr;

          }

        }


        @media (max-width: 650px) {

          .task20-main {

            padding: 12px;

          }


          .task20-header {

            flex-direction: column;

            align-items: flex-start;

          }


          .task20-runtime {

            width: 100%;

          }


          .task20-status-grid {

            grid-template-columns: 1fr;

          }


          .task20-phase-grid {

            grid-template-columns: 1fr;

          }


          .task20-sidebar-menu {

            grid-template-columns:
              repeat(2, 1fr);

          }


          .task20-map {

            height: 320px;

          }


          .task20-intelligence-grid {

            grid-template-columns: 1fr;

          }

        }

      `}</style>

    </div>

  );
}


/* =========================================================
   PHASE CARD
========================================================= */

function PhaseCard({
  phase,
  text
}) {

  return (

    <div className="task20-phase-card">

      <h3>
        {phase}
      </h3>

      <p>
        {text}
      </p>

    </div>

  );

}


/* =========================================================
   RUNTIME EVENT
========================================================= */

function RuntimeEvent({
  title,
  description
}) {

  return (

    <div className="task20-event">

      <div className="task20-event-dot"></div>

      <div>

        <strong>
          {title}
        </strong>

        <span>
          {description}
        </span>

      </div>

    </div>

  );

}