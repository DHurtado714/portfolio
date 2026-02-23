"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  diagramNodes,
  diagramConnections,
  mainTransactionPath,
  type DiagramNode,
} from "@/lib/architecture-data";
import { DiagramTooltip } from "./diagram-tooltip";

const NODE_WIDTH = 160;
const NODE_HEIGHT = 52;

function getNodeCenter(node: DiagramNode) {
  return { x: node.x + NODE_WIDTH / 2, y: node.y + NODE_HEIGHT / 2 };
}

function getConnectionPath(fromNode: DiagramNode, toNode: DiagramNode) {
  const from = getNodeCenter(fromNode);
  const to = getNodeCenter(toNode);

  // Simple straight line for connections
  return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

export function ArchitectureDiagram() {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [pinnedNode, setPinnedNode] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const activeNodeId = pinnedNode || hoveredNode;
  const activeNode = activeNodeId
    ? diagramNodes.find((n) => n.id === activeNodeId) || null
    : null;

  // Get connected node IDs for the active node
  const connectedIds = activeNodeId
    ? new Set(
        diagramConnections
          .filter((c) => c.from === activeNodeId || c.to === activeNodeId)
          .flatMap((c) => [c.from, c.to])
      )
    : null;

  const handleNodeHover = useCallback(
    (nodeId: string, e: React.MouseEvent) => {
      if (pinnedNode) return;
      setHoveredNode(nodeId);
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        const node = diagramNodes.find((n) => n.id === nodeId)!;
        setTooltipPosition({
          x: node.x + NODE_WIDTH + 12,
          y: node.y - 10,
        });
      }
    },
    [pinnedNode]
  );

  const handleNodeClick = useCallback(
    (nodeId: string) => {
      if (pinnedNode === nodeId) {
        setPinnedNode(null);
      } else {
        setPinnedNode(nodeId);
        const node = diagramNodes.find((n) => n.id === nodeId)!;
        setTooltipPosition({
          x: node.x + NODE_WIDTH + 12,
          y: node.y - 10,
        });
      }
    },
    [pinnedNode]
  );

  const handleBackgroundClick = useCallback(() => {
    setPinnedNode(null);
  }, []);

  // Pulse dot animation along main path
  const [pulseProgress, setPulseProgress] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion || !isInView) return;

    let raf: number;
    let start: number;
    const duration = 4000;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = (timestamp - start) % duration;
      setPulseProgress(elapsed / duration);
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [shouldReduceMotion, isInView]);

  // Calculate pulse dot position
  const pathNodes = mainTransactionPath.map(
    (id) => diagramNodes.find((n) => n.id === id)!
  );
  const totalSegments = pathNodes.length - 1;
  const segmentProgress = pulseProgress * totalSegments;
  const currentSegment = Math.min(
    Math.floor(segmentProgress),
    totalSegments - 1
  );
  const segmentT = segmentProgress - currentSegment;
  const fromCenter = getNodeCenter(pathNodes[currentSegment]);
  const toCenter = getNodeCenter(
    pathNodes[Math.min(currentSegment + 1, totalSegments)]
  );
  const pulseX = fromCenter.x + (toCenter.x - fromCenter.x) * segmentT;
  const pulseY = fromCenter.y + (toCenter.y - fromCenter.y) * segmentT;

  return (
    <div ref={containerRef} className="relative" onClick={handleBackgroundClick}>
      <svg
        viewBox="0 0 1200 480"
        className="w-full"
        style={{ maxHeight: "500px" }}
      >
        {/* Connections */}
        {diagramConnections.map((conn) => {
          const fromNode = diagramNodes.find((n) => n.id === conn.from)!;
          const toNode = diagramNodes.find((n) => n.id === conn.to)!;
          const path = getConnectionPath(fromNode, toNode);
          const isHighlighted =
            connectedIds &&
            connectedIds.has(conn.from) &&
            connectedIds.has(conn.to) &&
            (conn.from === activeNodeId || conn.to === activeNodeId);
          const isDimmed = connectedIds && !isHighlighted;

          return (
            <motion.path
              key={`${conn.from}-${conn.to}`}
              d={path}
              stroke={isHighlighted ? "#00C878" : "#2A2A2A"}
              strokeWidth={isHighlighted ? 2 : 1}
              fill="none"
              strokeDasharray={shouldReduceMotion ? "none" : "6 4"}
              opacity={isDimmed ? 0.15 : 1}
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 1.5, delay: 0.3 }}
            />
          );
        })}

        {/* Nodes */}
        {diagramNodes.map((node, i) => {
          const isActive = activeNodeId === node.id;
          const isConnected = connectedIds?.has(node.id);
          const isDimmed = connectedIds && !isConnected;

          return (
            <motion.g
              key={node.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView
                  ? { opacity: isDimmed ? 0.3 : 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{
                duration: shouldReduceMotion ? 0 : 0.4,
                delay: shouldReduceMotion ? 0 : i * 0.08,
              }}
              onMouseEnter={(e) => handleNodeHover(node.id, e as unknown as React.MouseEvent)}
              onMouseLeave={() => !pinnedNode && setHoveredNode(null)}
              onClick={(e) => {
                e.stopPropagation();
                handleNodeClick(node.id);
              }}
              className="cursor-pointer"
            >
              <rect
                x={node.x}
                y={node.y}
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx={12}
                fill="#161616"
                stroke={isActive ? "#00C878" : "#2A2A2A"}
                strokeWidth={isActive ? 2 : 1}
              />
              {/* Glow on active */}
              {isActive && (
                <rect
                  x={node.x - 2}
                  y={node.y - 2}
                  width={NODE_WIDTH + 4}
                  height={NODE_HEIGHT + 4}
                  rx={14}
                  fill="none"
                  stroke="#00C878"
                  strokeWidth={1}
                  opacity={0.3}
                />
              )}
              {/* Pulsing ring on pinned */}
              {pinnedNode === node.id && !shouldReduceMotion && (
                <motion.rect
                  x={node.x - 4}
                  y={node.y - 4}
                  width={NODE_WIDTH + 8}
                  height={NODE_HEIGHT + 8}
                  rx={16}
                  fill="none"
                  stroke="#00C878"
                  strokeWidth={1}
                  animate={{ opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
              <text
                x={node.x + NODE_WIDTH / 2}
                y={node.y + NODE_HEIGHT / 2 + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-foreground font-mono text-[11px]"
              >
                {node.label}
              </text>
            </motion.g>
          );
        })}

        {/* Pulse dot */}
        {!shouldReduceMotion && isInView && (
          <circle
            cx={pulseX}
            cy={pulseY}
            r={4}
            fill="#00C878"
            opacity={0.8}
          >
            <animate
              attributeName="r"
              values="3;5;3"
              dur="1s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>

      {/* HTML Tooltip overlay */}
      <DiagramTooltip node={activeNode} position={tooltipPosition} />
    </div>
  );
}
