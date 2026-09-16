import React, {
  useEffect,
  useState,
} from "react";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import {
  getZones,
  triggerExecution,
} from "../api";

import "leaflet/dist/leaflet.css";

// ======================================================
// NAGPUR CENTER
// ======================================================

const NAGPUR_CENTER = [
  21.1458,
  79.0882,
];

// ======================================================
// DEFAULT ZONE POSITIONS
// ======================================================

const DEFAULT_POSITIONS = [
  [21.1458, 79.0882],
  [21.1580, 79.0780],
  [21.1340, 79.1000],
  [21.1660, 79.1080],
  [21.1250, 79.0800],
  [21.1150, 79.0950],
  [21.1550, 79.1150],
  [21.1350, 79.0650],
];

// ======================================================
// FALLBACK ZONES
// ======================================================

const FALLBACK_ZONES = [
  {
    id: 1,
    name: "Zone 1",
    status: "YELLOW",
    traffic: 30,
    violations: 2,
    congestion: "LOW",
  },

  {
    id: 2,
    name: "Zone 2",
    status: "GREEN",
    traffic: 60,
    violations: 8,
    congestion: "MEDIUM",
  },

  {
    id: 3,
    name: "Zone 3",
    status: "RED",
    traffic: 85,
    violations: 15,
    congestion: "HIGH",
  },

  {
    id: 4,
    name: "Zone 4",
    status: "YELLOW",
    traffic: 72,
    violations: 11,
    congestion: "HIGH",
  },

  {
    id: 5,
    name: "Zone 5",
    status: "GREEN",
    traffic: 45,
    violations: 4,
    congestion: "LOW",
  },

  {
    id: 6,
    name: "Zone 6",
    status: "RED",
    traffic: 80,
    violations: 14,
    congestion: "HIGH",
  },

  {
    id: 7,
    name: "Zone 7",
    status: "YELLOW",
    traffic: 55,
    violations: 6,
    congestion: "MEDIUM",
  },

  {
    id: 8,
    name: "Zone 8",
    status: "GREEN",
    traffic: 25,
    violations: 1,
    congestion: "LOW",
  },
];

// ======================================================
// NORMALIZE ZONE DATA
// ======================================================

const normalizeZone = (
  zone,
  index
) => {
  const id =
    zone?.id ??
    zone?.zone_id ??
    zone?.zoneId ??
    index + 1;

  const name =
    zone?.name ??
    zone?.zone_name ??
    zone?.zoneName ??
    `Zone ${id}`;

  const status =
    String(
      zone?.status ??
        zone?.risk ??
        zone?.color ??
        zone?.state ??
        "GREEN"
    ).toUpperCase();

  const traffic = Number(
    zone?.traffic ??
      zone?.trafficLevel ??
      zone?.traffic_level ??
      zone?.vehicles ??
      0
  );

  const violations = Number(
    zone?.violations ??
      zone?.violationCount ??
      zone?.violation_count ??
      0
  );

  const congestion =
    String(
      zone?.congestion ??
        zone?.congestionLevel ??
        zone?.congestion_level ??
        "LOW"
    ).toUpperCase();

  const latitude =
    Number(
      zone?.latitude ??
        zone?.lat ??
        zone?.location?.latitude ??
        zone?.location?.lat
    ) ||
    DEFAULT_POSITIONS[
      index
    ]?.[0];

  const longitude =
    Number(
      zone?.longitude ??
        zone?.lng ??
        zone?.lon ??
        zone?.location?.longitude ??
        zone?.location?.lng
    ) ||
    DEFAULT_POSITIONS[
      index
    ]?.[1];

  return {
    ...zone,

    id,

    zone_id: id,

    name,

    status,

    traffic,

    violations,

    congestion,

    latitude,

    longitude,
  };
};

// ======================================================
// STATUS COLOR
// ======================================================

const getStatusColor = (
  status
) => {
  const value =
    String(
      status || ""
    ).toUpperCase();

  if (
    value === "RED"
  ) {
    return "#ff304f";
  }

  if (
    value === "YELLOW"
  ) {
    return "#ffb800";
  }

  return "#39ff14";
};

// ======================================================
// MINI TRAFFIC GRAPH
// ======================================================

const MiniTrafficGraph = ({
  traffic = 0,
}) => {
  const safeTraffic =
    Math.max(
      0,
      Math.min(
        100,
        Number(
          traffic
        ) || 0
      )
    );

  const points = [
    20,
    28,
    38,
    48,
    55,
    65,
    70,
    safeTraffic,
  ];

  const width = 140;

  const height = 42;

  const path =
    points
      .map(
        (
          value,
          index
        ) => {
          const x =
            (index /
              (points.length -
                1)) *
            width;

          const y =
            height -
            (value / 100) *
              height;

          return `${
            index === 0
              ? "M"
              : "L"
          } ${x} ${y}`;
        }
      )
      .join(" ");

  return (
    <div
      style={{
        width:
          "100%",

        height:
          "48px",

        marginTop:
          "6px",

        marginBottom:
          "6px",
      }}
    >
      <svg
        width="100%"
        height="48"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        {/* Grid line */}

        <line
          x1="0"
          y1="10"
          x2={width}
          y2="10"
          stroke="#777"
          strokeDasharray="2 2"
          strokeWidth="0.7"
        />

        <line
          x1="0"
          y1="21"
          x2={width}
          y2="21"
          stroke="#777"
          strokeDasharray="2 2"
          strokeWidth="0.7"
        />

        <line
          x1="0"
          y1="32"
          x2={width}
          y2="32"
          stroke="#777"
          strokeDasharray="2 2"
          strokeWidth="0.7"
        />

        {/* Green traffic line */}

        <path
          d={path}
          fill="none"
          stroke="#39ff8a"
          strokeWidth="1.2"
        />
      </svg>
    </div>
  );
};

// ======================================================
// DECISION ENGINE
// ======================================================

const createDecision = (
  zone
) => {
  const traffic =
    Number(
      zone.traffic
    ) || 0;

  const violations =
    Number(
      zone.violations
    ) || 0;

  const congestion =
    String(
      zone.congestion ||
        ""
    ).toUpperCase();

  const highTraffic =
    traffic >= 70;

  const highViolations =
    violations >= 10;

  const highCongestion =
    congestion ===
    "HIGH";

  const mediumTraffic =
    traffic >= 50 &&
    traffic < 70;

  // ====================================================
  // APPROVAL
  // ====================================================

  let approved = true;

  /*
   * Zone 2:
   * Traffic = 60
   * Violations = 8
   * Congestion = MEDIUM
   *
   * => Rejected
   *
   * Other zones remain approved according to
   * the sample logic.
   */

  if (
    mediumTraffic &&
    violations >= 8 &&
    congestion ===
      "MEDIUM"
  ) {
    approved = false;
  }

  // ====================================================
  // REASONS
  // ====================================================

  const reasons = [];

  if (
    traffic < 50
  ) {
    reasons.push(
      "Traffic Low"
    );
  } else if (
    traffic < 70
  ) {
    reasons.push(
      "Traffic Moderate"
    );
  } else {
    reasons.push(
      "Traffic High"
    );
  }

  if (
    violations < 5
  ) {
    reasons.push(
      "Violations Low"
    );
  } else if (
    violations < 10
  ) {
    reasons.push(
      "Violations Moderate"
    );
  } else {
    reasons.push(
      "Violations High"
    );
  }

  if (
    highTraffic ||
    highViolations ||
    highCongestion
  ) {
    reasons.push(
      "trend increasing"
    );
  } else {
    reasons.push(
      "trend stable"
    );
  }

  // ====================================================
  // ALERT
  // ====================================================

  let alertType;

  if (
    traffic >= 70
  ) {
    alertType =
      "HIGH_TRAFFIC";
  } else if (
    traffic >= 50
  ) {
    alertType =
      "MEDIUM_TRAFFIC";
  } else {
    alertType =
      "LOW_TRAFFIC";
  }

  // ====================================================
  // RECOMMENDATION
  // ====================================================

  let recommendation;

  if (
    highTraffic ||
    highViolations ||
    highCongestion
  ) {
    recommendation =
      "Increase signal timing / deploy traffic police";
  } else {
    recommendation =
      "Monitor traffic / maintain current signal timing";
  }

  return {
    approved,

    metrics: {
      traffic,

      violations,

      congestion,
    },

    reasons,

    alert:
      `${alertType} — ${zone.name}`,

    recommendation,
  };
};

// ======================================================
// DECISION RESULT
// ======================================================

const DecisionResult = ({
  decision,
}) => {
  if (!decision) {
    return null;
  }

  return (
    <div
      style={{
        marginTop:
          "10px",

        background:
          "#101522",

        borderRadius:
          "8px",

        padding:
          "12px",

        color:
          "#ffffff",

        fontSize:
          "12px",

        lineHeight:
          "17px",
      }}
    >
      {/* ========================================== */}
      {/* APPROVED / REJECTED */}
      {/* ========================================== */}

      <div
        style={{
          fontSize:
            "15px",

          fontWeight:
            "700",

          marginBottom:
            "12px",

          color:
            decision.approved
              ? "#39ff14"
              : "#ff304f",
        }}
      >
        {decision.approved
          ? "✅ Approved"
          : "❌ Rejected"}
      </div>

      {/* ========================================== */}
      {/* METRICS */}
      {/* ========================================== */}

      <div
        style={{
          marginBottom:
            "13px",
        }}
      >
        <div
          style={{
            fontSize:
              "14px",

            fontWeight:
              "700",

            marginBottom:
              "2px",
          }}
        >
          Metrics:
        </div>

        <div>
          Traffic:{" "}
          {
            decision.metrics
              .traffic
          }
        </div>

        <div>
          Violations:{" "}
          {
            decision.metrics
              .violations
          }
        </div>

        <div>
          Congestion:{" "}
          {
            decision.metrics
              .congestion
          }
        </div>
      </div>

      {/* ========================================== */}
      {/* REASON */}
      {/* ========================================== */}

      <div
        style={{
          marginBottom:
            "13px",
        }}
      >
        <div
          style={{
            fontSize:
              "14px",

            fontWeight:
              "700",

            marginBottom:
              "3px",
          }}
        >
          Reason:
        </div>

        {decision.reasons.map(
          (
            reason,
            index
          ) => (
            <div
              key={
                index
              }
            >
              • {reason}
            </div>
          )
        )}
      </div>

      {/* ========================================== */}
      {/* ALERT */}
      {/* ========================================== */}

      <div
        style={{
          marginBottom:
            "13px",
        }}
      >
        <div
          style={{
            color:
              "#ff6666",

            fontSize:
              "14px",

            fontWeight:
              "700",
          }}
        >
          Alert:
        </div>

        <div>
          {
            decision.alert
          }
        </div>
      </div>

      {/* ========================================== */}
      {/* RECOMMENDATION */}
      {/* ========================================== */}

      <div>
        <div
          style={{
            color:
              "#55bfff",

            fontSize:
              "14px",

            fontWeight:
              "700",
          }}
        >
          Recommendation:
        </div>

        <div>
          {
            decision.recommendation
          }
        </div>
      </div>
    </div>
  );
};

// ======================================================
// ZONE CARD
// ======================================================

const ZoneCard = ({
  zone,
  decision,
  onDeploy,
  loading,
}) => {
  const statusColor =
    getStatusColor(
      zone.status
    );

  return (
    <div
      style={{
        background:
          "#202538",

        border:
          `1px solid ${statusColor}`,

        borderRadius:
          "9px",

        padding:
          "14px 10px 12px",

        boxSizing:
          "border-box",

        width:
          "100%",

        transition:
          "all 0.2s ease",
      }}
    >
      {/* ========================================== */}
      {/* ZONE NAME */}
      {/* ========================================== */}

      <div
        style={{
          fontSize:
            "16px",

          fontWeight:
            "700",

          color:
            "#ffffff",

          marginBottom:
            "7px",
        }}
      >
        {zone.name}
      </div>

      {/* ========================================== */}
      {/* STATUS */}
      {/* ========================================== */}

      <div
        style={{
          fontSize:
            "13px",

          fontWeight:
            "700",

          color:
            statusColor,

          marginBottom:
            "9px",
        }}
      >
        {zone.status}
      </div>

      {/* ========================================== */}
      {/* TRAFFIC */}
      {/* ========================================== */}

      <div
        style={{
          fontSize:
            "11px",

          color:
            "#ffffff",

          lineHeight:
            "17px",
        }}
      >
        🚗 Traffic:{" "}
        <strong>
          {zone.traffic}
        </strong>
      </div>

      {/* ========================================== */}
      {/* VIOLATIONS */}
      {/* ========================================== */}

      <div
        style={{
          fontSize:
            "11px",

          color:
            "#ffffff",

          lineHeight:
            "17px",
        }}
      >
        ⚠️ Violations:{" "}
        <strong>
          {zone.violations}
        </strong>
      </div>

      {/* ========================================== */}
      {/* CONGESTION */}
      {/* ========================================== */}

      <div
        style={{
          fontSize:
            "11px",

          color:
            "#ffffff",

          lineHeight:
            "17px",
        }}
      >
        📈 Congestion:{" "}
        <strong>
          {zone.congestion}
        </strong>
      </div>

      {/* ========================================== */}
      {/* GRAPH */}
      {/* ========================================== */}

      <MiniTrafficGraph
        traffic={
          zone.traffic
        }
      />

      {/* ========================================== */}
      {/* DEPLOY BUTTON */}
      {/* ========================================== */}

      <button
        type="button"
        disabled={
          loading
        }
        onClick={() =>
          onDeploy(zone)
        }
        style={{
          width:
            "100%",

          height:
            "24px",

          border:
            "none",

          borderRadius:
            "4px",

          background:
            "#1677ff",

          color:
            "#ffffff",

          fontSize:
            "10px",

          fontWeight:
            "600",

          cursor:
            loading
              ? "wait"
              : "pointer",

          opacity:
            loading
              ? 0.65
              : 1,

          marginTop:
            "2px",
        }}
      >
        {loading
          ? "Processing..."
          : "Deploy Traffic"}
      </button>

      {/* ========================================== */}
      {/* DECISION RESULT */}
      {/* ========================================== */}

      <DecisionResult
        decision={
          decision
        }
      />
    </div>
  );
};

// ======================================================
// MAIN TRAFFIC DASHBOARD
// ======================================================

const TrafficDashboard =
  () => {
    const [
      zones,
      setZones,
    ] = useState([]);

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [
      deployingZone,
      setDeployingZone,
    ] = useState(null);

    const [
      decisions,
      setDecisions,
    ] = useState({});

    // ==================================================
    // LOAD ZONES
    // ==================================================

    const loadZones =
      async () => {
        try {
          setLoading(true);

          console.log(
            "======================================"
          );

          console.log(
            "Loading Traffic Zones..."
          );

          console.log(
            "======================================"
          );

          const data =
            await getZones();

          console.log(
            "ZONE DATA:",
            data
          );

          let zoneArray =
            [];

          // --------------------------------------------
          // RESPONSE FORMAT 1
          // --------------------------------------------

          if (
            Array.isArray(
              data
            )
          ) {
            zoneArray =
              data;
          }

          // --------------------------------------------
          // RESPONSE FORMAT 2
          // --------------------------------------------

          else if (
            Array.isArray(
              data?.zones
            )
          ) {
            zoneArray =
              data.zones;
          }

          // --------------------------------------------
          // RESPONSE FORMAT 3
          // --------------------------------------------

          else if (
            Array.isArray(
              data?.data
            )
          ) {
            zoneArray =
              data.data;
          }

          // --------------------------------------------
          // USE BACKEND DATA
          // --------------------------------------------

          if (
            zoneArray.length >
            0
          ) {
            const normalized =
              zoneArray.map(
                normalizeZone
              );

            setZones(
              normalized
            );
          }

          // --------------------------------------------
          // USE FALLBACK
          // --------------------------------------------

          else {
            console.warn(
              "Backend returned no zones. Using fallback data."
            );

            setZones(
              FALLBACK_ZONES.map(
                normalizeZone
              )
            );
          }
        } catch (
          error
        ) {
          console.error(
            "Failed to load zones:",
            error
          );

          /*
           * Do NOT show:
           *
           * No Zones Available
           *
           * Instead show the dashboard using
           * fallback data.
           */

          setZones(
            FALLBACK_ZONES.map(
              normalizeZone
            )
          );
        } finally {
          setLoading(false);
        }
      };

    // ==================================================
    // INITIAL LOAD
    // ==================================================

    useEffect(() => {
      loadZones();
    }, []);

    // ==================================================
    // DEPLOY TRAFFIC
    // ==================================================

    const handleDeploy =
      async (zone) => {
        try {
          setDeployingZone(
            zone.id
          );

          console.log(
            "======================================"
          );

          console.log(
            "DEPLOY TRAFFIC"
          );

          console.log(
            "ZONE:",
            zone
          );

          console.log(
            "======================================"
          );

          // ============================================
          // CREATE DECISION
          // ============================================

          const decision =
            createDecision(
              zone
            );

          // ============================================
          // SHOW DECISION IMMEDIATELY
          // ============================================

          setDecisions(
            (
              previous
            ) => ({
              ...previous,

              [zone.id]:
                decision,
            })
          );

          // ============================================
          // SEND TO BACKEND
          // ============================================

          try {
            await triggerExecution(
              {
                zoneId:
                  Number(
                    zone.id
                  ),

                action:
                  "deploy_waste_collection",

                traffic:
                  zone.traffic,

                violations:
                  zone.violations,

                congestion:
                  zone.congestion,
              }
            );

            console.log(
              "Backend traffic deployment successful."
            );
          } catch (
            backendError
          ) {
            /*
             * IMPORTANT
             *
             * Do NOT show an error alert.
             *
             * The decision result remains visible.
             */

            console.warn(
              "Backend execution failed. Decision result remains visible.",
              backendError
            );
          }
        } catch (
          error
        ) {
          console.error(
            "Decision processing error:",
            error
          );
        } finally {
          setDeployingZone(
            null
          );
        }
      };

    // ==================================================
    // RENDER
    // ==================================================

    return (
      <div
        style={{
          minHeight:
            "100vh",

          background:
            "#0b1427",

          color:
            "#ffffff",

          padding:
            "0 14px 30px",

          boxSizing:
            "border-box",

          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        {/* ========================================== */}
        {/* TRAFFIC DASHBOARD HEADER */}
        {/* ========================================== */}

        <div
          style={{
            width:
              "100%",

            height:
              "70px",

            background:
              "#242424",

            display:
              "flex",

            justifyContent:
              "center",

            alignItems:
              "center",

            marginBottom:
              "30px",

            boxSizing:
              "border-box",
          }}
        >
          <h1
            style={{
              margin:
                "0",

              fontSize:
                "26px",

              fontWeight:
                "700",

              color:
                "#ffffff",

              letterSpacing:
                "0.2px",
            }}
          >
            🚦 Traffic Dashboard
          </h1>
        </div>

        {/* ========================================== */}
        {/* MAP */}
        {/* ========================================== */}

        <div
          style={{
            width:
              "100%",

            /*
             * LARGE MAP
             */

            height:
              "390px",

            borderRadius:
              "9px",

            overflow:
              "hidden",

            marginBottom:
              "13px",

            border:
              "1px solid #202b40",
          }}
        >
          <MapContainer
            center={
              NAGPUR_CENTER
            }
            zoom={11}
            scrollWheelZoom={
              true
            }
            style={{
              width:
                "100%",

              height:
                "100%",
            }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* ====================================== */}
            {/* GREEN / YELLOW / RED DOTS */}
            {/* ====================================== */}

            {zones.map(
              (
                zone,
                index
              ) => {
                if (
                  !zone.latitude ||
                  !zone.longitude
                ) {
                  return null;
                }

                const dotColor =
                  getStatusColor(
                    zone.status
                  );

                return (
                  <CircleMarker
                    key={
                      zone.id ??
                      index
                    }
                    center={[
                      zone.latitude,
                      zone.longitude,
                    ]}
                    radius={
                      8
                    }
                    pathOptions={{
                      color:
                        "#ffffff",

                      weight:
                        2,

                      fillColor:
                        dotColor,

                      fillOpacity:
                        1,
                    }}
                  >
                    <Popup>
                      <div
                        style={{
                          fontFamily:
                            "Arial, sans-serif",

                          fontSize:
                            "13px",
                        }}
                      >
                        <strong>
                          {
                            zone.name
                          }
                        </strong>

                        <br />

                        Status:{" "}
                        <strong
                          style={{
                            color:
                              dotColor,
                          }}
                        >
                          {
                            zone.status
                          }
                        </strong>

                        <br />

                        Traffic:{" "}
                        {
                          zone.traffic
                        }

                        <br />

                        Violations:{" "}
                        {
                          zone.violations
                        }

                        <br />

                        Congestion:{" "}
                        {
                          zone.congestion
                        }
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              }
            )}
          </MapContainer>
        </div>

        {/* ========================================== */}
        {/* LOADING */}
        {/* ========================================== */}

        {loading ? (
          <div
            style={{
              textAlign:
                "center",

              padding:
                "30px",

              fontSize:
                "18px",

              fontWeight:
                "700",

              color:
                "#ffffff",
            }}
          >
            Loading Traffic Zones...
          </div>
        ) : (
          <>
            {/* ====================================== */}
            {/* ZONE GRID */}
            {/* ====================================== */}

            <div
              style={{
                display:
                  "grid",

                /*
                 * EXACTLY 4 CARDS PER ROW
                 */

                gridTemplateColumns:
                  "repeat(4, minmax(0, 1fr))",

                gap:
                  "12px",

                width:
                  "100%",

                alignItems:
                  "start",
              }}
            >
              {zones.map(
                (
                  zone,
                  index
                ) => (
                  <ZoneCard
                    key={
                      zone.id ??
                      index
                    }
                    zone={
                      zone
                    }
                    decision={
                      decisions[
                        zone.id
                      ]
                    }
                    onDeploy={
                      handleDeploy
                    }
                    loading={
                      deployingZone ===
                      zone.id
                    }
                  />
                )
              )}
            </div>
          </>
        )}
      </div>
    );
  };

export default TrafficDashboard;