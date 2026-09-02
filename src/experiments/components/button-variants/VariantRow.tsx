import { Button, type ButtonSize, type ButtonVariant } from "./Button";

const copy = {
  buttonLabel: (size: string) => `${size} button`,
} as const;

interface VariantRowProps {
  variant: ButtonVariant;
  sizes: ButtonSize[];
}

export function VariantRow({ variant, sizes }: VariantRowProps) {
  const swatches = sizes.map((size) => (
    <div key={size} className="flex flex-col items-center gap-2">
      <Button variant={variant} size={size}>
        {copy.buttonLabel(size)}
      </Button>
      <span className="text-xs text-muted">{size}</span>
    </div>
  ));

  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold tracking-wide text-muted uppercase">{variant}</h2>
      <div className="flex flex-wrap items-center gap-4">{swatches}</div>
    </section>
  );
}
