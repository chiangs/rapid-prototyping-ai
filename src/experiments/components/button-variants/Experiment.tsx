import type { ExperimentMeta } from "@/experiments/registry";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";
import { VariantRow } from "./VariantRow";

// All user-facing text for this experiment, in one place.
const copy = {
  disabledHeading: "Disabled",
  disabledButtonLabel: (variant: string) => `${variant} disabled`,
} as const;

export const meta = {
  title: "Button variants",
  description: "A button with variants, sizes, and a disabled state.",
  complexity: "simple",
  tags: ["design-system"],
} satisfies ExperimentMeta;

const variants: ButtonVariant[] = ["primary", "secondary", "ghost"];
const sizes: ButtonSize[] = ["sm", "md", "lg"];

export default function Experiment() {
  const variantRows = variants.map((variant) => (
    <VariantRow key={variant} variant={variant} sizes={sizes} />
  ));

  const disabledButtons = variants.map((variant) => (
    <Button key={variant} variant={variant} disabled>
      {copy.disabledButtonLabel(variant)}
    </Button>
  ));

  return (
    <div className="space-y-10">
      {variantRows}

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">
          {copy.disabledHeading}
        </h2>
        <div className="flex flex-wrap items-center gap-4">{disabledButtons}</div>
      </section>
    </div>
  );
}
