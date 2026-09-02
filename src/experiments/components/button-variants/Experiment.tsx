import type { ExperimentMeta } from "@/experiments/registry";
import { Button, type ButtonSize, type ButtonVariant } from "./Button";

export const meta = {
  title: "Button variants",
  description: "A button with variants, sizes, and a disabled state.",
  complexity: "simple",
  tags: ["design-system"],
} satisfies ExperimentMeta;

const variants: ButtonVariant[] = ["primary", "secondary", "ghost"];
const sizes: ButtonSize[] = ["sm", "md", "lg"];

export default function Experiment() {
  return (
    <div className="space-y-10">
      {variants.map((variant) => (
        <section key={variant}>
          <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">
            {variant}
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            {sizes.map((size) => (
              <div key={size} className="flex flex-col items-center gap-2">
                <Button variant={variant} size={size}>
                  {`${size} button`}
                </Button>
                <span className="text-xs text-muted">{size}</span>
              </div>
            ))}
          </div>
        </section>
      ))}

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">Disabled</h2>
        <div className="flex flex-wrap items-center gap-4">
          {variants.map((variant) => (
            <Button key={variant} variant={variant} disabled>
              {`${variant} disabled`}
            </Button>
          ))}
        </div>
      </section>
    </div>
  );
}
