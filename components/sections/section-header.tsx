import { SectionHeaderEntrance } from "@/components/motion/section-header-entrance";

export function SectionHeader({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return <SectionHeaderEntrance number={number} label={label} />;
}
