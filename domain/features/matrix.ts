export interface FeatureNode {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  /** Bento span on desktop grid, expressed in 12-col terms. */
  readonly span: "small" | "wide" | "tall";
  readonly metric: { readonly value: string; readonly label: string };
}

/**
 * Open/Closed: add a feature node here and it appears in both the desktop
 * bento grid and the mobile accordion — neither rendering path needs to
 * change shape-handling logic.
 */
export const FEATURE_NODES: readonly FeatureNode[] = [
  {
    id: "ingest",
    title: "Universal ingestion",
    description:
      "Connect any source — warehouses, SaaS APIs, flat files, event streams — through one typed schema layer. No brittle point-to-point glue code.",
    span: "wide",
    metric: { value: "120+", label: "native connectors" },
  },
  {
    id: "transform",
    title: "AI-assisted transforms",
    description:
      "Describe the shape you want in plain language. The model proposes a transform pipeline you can inspect, edit, and version like code.",
    span: "small",
    metric: { value: "4.8x", label: "faster pipeline authoring" },
  },
  {
    id: "observability",
    title: "Pipeline observability",
    description:
      "Every run emits structured lineage and anomaly signals, so a broken upstream schema surfaces before it reaches a dashboard.",
    span: "small",
    metric: { value: "99.95%", label: "platform uptime" },
  },
  {
    id: "governance",
    title: "Governance by default",
    description:
      "Row-level access policies, field-level redaction, and full audit trails travel with the data, not bolted on after the fact.",
    span: "tall",
    metric: { value: "SOC 2", label: "Type II report available" },
  },
  {
    id: "orchestration",
    title: "Adaptive orchestration",
    description:
      "Workloads scale inference capacity to data volume automatically, so a 10x traffic spike doesn't mean a 10x bill or a stalled queue.",
    span: "small",
    metric: { value: "<50ms", label: "p99 scheduling latency" },
  },
] as const;
