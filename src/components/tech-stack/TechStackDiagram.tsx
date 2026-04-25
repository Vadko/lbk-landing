"use client";

import {
  Background,
  Controls,
  Handle,
  Position,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { memo } from "react";
import type { Edge, Node, NodeProps } from "@xyflow/react";

// ━━━ Colors ━━━
const C = {
  landing: "#00c2ff",
  admin: "#a8cf96",
  launcher: "#ffa47a",
  supabase: "#3ECF8E",
};

// ━━━ Custom Node Components ━━━

type ProjectNodeType = Node<{
  label: string;
  subtitle: string;
  techs: string[];
  color: string;
}>;

const ProjectNode = memo(function ProjectNode({
  data,
}: NodeProps<ProjectNodeType>) {
  return (
    <div
      className="ts-node ts-node--project"
      style={{ "--accent": data.color } as React.CSSProperties}
    >
      <Handle type="source" position={Position.Bottom} id="s-bottom" />
      <Handle type="source" position={Position.Right} id="s-right" />
      <h3 className="ts-node__title">{data.label}</h3>
      <p className="ts-node__subtitle">{data.subtitle}</p>
      <div className="ts-node__tags">
        {data.techs.map((t) => (
          <span key={t} className="ts-tag">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
});

type ServiceNodeType = Node<{
  label: string;
  subtitle: string;
  features: string[];
  color: string;
}>;

const ServiceNode = memo(function ServiceNode({
  data,
}: NodeProps<ServiceNodeType>) {
  return (
    <div
      className="ts-node ts-node--service"
      style={{ "--accent": data.color } as React.CSSProperties}
    >
      <Handle
        type="target"
        position={Position.Top}
        id="t-l"
        style={{ left: "25%" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="t-c"
        style={{ left: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Top}
        id="t-r"
        style={{ left: "75%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="s-l"
        style={{ left: "25%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="s-c"
        style={{ left: "50%" }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="s-r"
        style={{ left: "75%" }}
      />
      <h3 className="ts-node__title">{data.label}</h3>
      <p className="ts-node__subtitle">{data.subtitle}</p>
      <div className="ts-node__tags">
        {data.features.map((f) => (
          <span key={f} className="ts-tag">
            {f}
          </span>
        ))}
      </div>
    </div>
  );
});

type InfraNodeType = Node<{
  label: string;
  subtitle: string;
  color: string;
}>;

const InfraNode = memo(function InfraNode({
  data,
}: NodeProps<InfraNodeType>) {
  return (
    <div
      className="ts-node ts-node--infra"
      style={{ "--accent": data.color } as React.CSSProperties}
    >
      <Handle
        type="target"
        position={Position.Left}
        id="t-t"
        style={{ top: "25%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="t-c"
        style={{ top: "50%" }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="t-b"
        style={{ top: "75%" }}
      />
      <h3 className="ts-node__title">{data.label}</h3>
      <p className="ts-node__subtitle">{data.subtitle}</p>
    </div>
  );
});

type ExternalNodeType = Node<{ label: string }>;

const ExternalNode = memo(function ExternalNode({
  data,
}: NodeProps<ExternalNodeType>) {
  return (
    <div className="ts-node ts-node--external">
      <Handle type="target" position={Position.Top} />
      <span>{data.label}</span>
    </div>
  );
});

type AnnotationNodeType = Node<{ label: string }>;

const AnnotationNode = memo(function AnnotationNode({
  data,
}: NodeProps<AnnotationNodeType>) {
  return <div className="ts-annotation">{data.label}</div>;
});

// ━━━ Node Types ━━━
const nodeTypes = {
  project: ProjectNode,
  service: ServiceNode,
  infra: InfraNode,
  external: ExternalNode,
  annotation: AnnotationNode,
};

// ━━━ Nodes ━━━
const initialNodes: Node[] = [
  // ── Row 0: Projects ──
  {
    id: "landing",
    type: "project",
    position: { x: 0, y: 0 },
    data: {
      label: "Landing",
      subtitle: "lbk-landing",
      color: C.landing,
      techs: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind 4",
        "TanStack Query",
        "Redis",
      ],
    },
  },
  {
    id: "admin",
    type: "project",
    position: { x: 320, y: 0 },
    data: {
      label: "Admin",
      subtitle: "lbk-admin",
      color: C.admin,
      techs: [
        "Next.js 16",
        "React 19",
        "TypeScript",
        "Tailwind 4",
        "TanStack Query",
        "RHF + Zod",
        "Recharts",
        "Resend",
      ],
    },
  },
  {
    id: "launcher",
    type: "project",
    position: { x: 640, y: 0 },
    data: {
      label: "Launcher",
      subtitle: "lbk-launcher",
      color: C.launcher,
      techs: [
        "Electron 40",
        "React 18",
        "TypeScript",
        "Vite 6",
        "Tailwind 3",
        "Zustand",
        "Framer Motion",
        "SQLite",
      ],
    },
  },

  // ── Row 1: Supabase ──
  {
    id: "supabase",
    type: "service",
    position: { x: 280, y: 240 },
    data: {
      label: "Supabase",
      subtitle: "Self-hosted Supabase",
      color: C.supabase,
      features: [
        "PostgreSQL",
        "Auth",
        "Storage",
        "Edge Functions",
        "Realtime",
      ],
    },
  },

  // ── Right column: Infrastructure ──
  {
    id: "coolify",
    type: "infra",
    position: { x: 980, y: 0 },
    data: {
      label: "Coolify",
      subtitle: "Hosting & Deploy",
      color: "#8B5CF6",
    },
  },
  {
    id: "sentry",
    type: "infra",
    position: { x: 980, y: 110 },
    data: {
      label: "Sentry / GlitchTip",
      subtitle: "Error Monitoring",
      color: "#F43F5E",
    },
  },
  {
    id: "github",
    type: "infra",
    position: { x: 980, y: 220 },
    data: {
      label: "GitHub",
      subtitle: "CI/CD & Releases",
      color: "#E5E7EB",
    },
  },

  // ── Row 3: External Services ──
  {
    id: "redis",
    type: "external",
    position: { x: 0, y: 430 },
    data: { label: "Redis" },
  },
  {
    id: "steam",
    type: "external",
    position: { x: 130, y: 430 },
    data: { label: "Steam API" },
  },
  {
    id: "telegram",
    type: "external",
    position: { x: 270, y: 430 },
    data: { label: "Telegram" },
  },
  {
    id: "resend",
    type: "external",
    position: { x: 400, y: 430 },
    data: { label: "Resend" },
  },
  {
    id: "ga",
    type: "external",
    position: { x: 520, y: 430 },
    data: { label: "Google Analytics" },
  },
  {
    id: "mixpanel",
    type: "external",
    position: { x: 690, y: 430 },
    data: { label: "Mixpanel" },
  },
  {
    id: "kuli",
    type: "external",
    position: { x: 830, y: 430 },
    data: { label: "Kuli API" },
  },
];

// ━━━ Edges ━━━
const initialEdges: Edge[] = [
  // Projects → Supabase
  {
    id: "e-land-supa",
    source: "landing",
    target: "supabase",
    targetHandle: "t-l",
    type: "smoothstep",
    style: { stroke: C.landing, strokeWidth: 2 },
  },
  {
    id: "e-admin-supa",
    source: "admin",
    target: "supabase",
    targetHandle: "t-c",
    type: "smoothstep",
    style: { stroke: C.admin, strokeWidth: 2 },
  },
  {
    id: "e-launch-supa",
    source: "launcher",
    target: "supabase",
    targetHandle: "t-r",
    type: "smoothstep",
    animated: true,
    label: "Realtime sync",
    labelStyle: { fill: C.launcher, fontSize: 11, fontWeight: 500 },
    labelBgStyle: { fill: "rgba(15, 15, 16, 0.85)" },
    labelBgPadding: [4, 8] as [number, number],
    style: { stroke: C.launcher, strokeWidth: 2 },
  },

  // Supabase → External (Edge Functions)
  {
    id: "e-supa-steam",
    source: "supabase",
    sourceHandle: "s-l",
    target: "steam",
    type: "smoothstep",
    style: { stroke: C.supabase, opacity: 0.6 },
  },
  {
    id: "e-supa-tg",
    source: "supabase",
    sourceHandle: "s-c",
    target: "telegram",
    type: "smoothstep",
    style: { stroke: C.supabase, opacity: 0.6 },
  },
  {
    id: "e-supa-kuli",
    source: "supabase",
    sourceHandle: "s-r",
    target: "kuli",
    type: "smoothstep",
    style: { stroke: C.supabase, opacity: 0.6 },
  },

  // Direct integrations
  {
    id: "e-land-redis",
    source: "landing",
    target: "redis",
    type: "smoothstep",
    style: { stroke: C.landing, opacity: 0.7 },
  },
  {
    id: "e-admin-resend",
    source: "admin",
    target: "resend",
    type: "smoothstep",
    style: { stroke: C.admin, opacity: 0.7 },
  },
  {
    id: "e-admin-ga",
    source: "admin",
    target: "ga",
    type: "smoothstep",
    style: { stroke: C.admin, opacity: 0.7 },
  },
  {
    id: "e-launch-mix",
    source: "launcher",
    target: "mixpanel",
    type: "smoothstep",
    style: { stroke: C.launcher, opacity: 0.7 },
  },

  // Deploy → Coolify (dashed, via right side)
  {
    id: "e-land-cool",
    source: "landing",
    sourceHandle: "s-right",
    target: "coolify",
    targetHandle: "t-t",
    type: "smoothstep",
    style: { stroke: C.landing, opacity: 0.4, strokeDasharray: "5 5" },
  },
  {
    id: "e-admin-cool",
    source: "admin",
    sourceHandle: "s-right",
    target: "coolify",
    targetHandle: "t-b",
    type: "smoothstep",
    style: { stroke: C.admin, opacity: 0.4, strokeDasharray: "5 5" },
  },

  // Monitoring → Sentry (dashed, via right side)
  {
    id: "e-land-sentry",
    source: "landing",
    sourceHandle: "s-right",
    target: "sentry",
    targetHandle: "t-t",
    type: "smoothstep",
    style: { stroke: C.landing, opacity: 0.3, strokeDasharray: "5 5" },
  },
  {
    id: "e-admin-sentry",
    source: "admin",
    sourceHandle: "s-right",
    target: "sentry",
    targetHandle: "t-c",
    type: "smoothstep",
    style: { stroke: C.admin, opacity: 0.3, strokeDasharray: "5 5" },
  },
  {
    id: "e-launch-sentry",
    source: "launcher",
    sourceHandle: "s-right",
    target: "sentry",
    targetHandle: "t-b",
    type: "smoothstep",
    style: { stroke: C.launcher, opacity: 0.3, strokeDasharray: "5 5" },
  },

  // CI/CD → GitHub (dashed, via right side)
  {
    id: "e-land-github",
    source: "landing",
    sourceHandle: "s-right",
    target: "github",
    targetHandle: "t-t",
    type: "smoothstep",
    style: { stroke: C.landing, opacity: 0.3, strokeDasharray: "5 5" },
  },
  {
    id: "e-admin-github",
    source: "admin",
    sourceHandle: "s-right",
    target: "github",
    targetHandle: "t-c",
    type: "smoothstep",
    style: { stroke: C.admin, opacity: 0.3, strokeDasharray: "5 5" },
  },
  {
    id: "e-launch-github",
    source: "launcher",
    sourceHandle: "s-right",
    target: "github",
    targetHandle: "t-b",
    type: "smoothstep",
    style: { stroke: C.launcher, opacity: 0.3, strokeDasharray: "5 5" },
  },
];

// ━━━ Component ━━━
export function TechStackDiagram() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, , onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="tech-stack-diagram">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.15 }}
        nodesConnectable={false}
        elementsSelectable={false}
        colorMode="dark"
        minZoom={0.3}
        maxZoom={1.5}
      >
        <Background gap={20} size={1} color="rgba(255,255,255,0.04)" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
