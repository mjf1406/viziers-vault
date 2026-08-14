export function Logo({ className }: { className?: string } = {}) {
  return (
    <img
      src="/brand/logo/icon-and-text-horizontal.webp"
      alt="Vizier's Vault Logo"
      width={169}
      height={92}
      className={className ?? "h-[92px] w-[169px] max-w-full object-contain"}
    />
  );
}

export function LogoAboveText({ className }: { className?: string } = {}) {
  return (
    <img
      src="/brand/logo/icon-above-text.webp"
      alt="Vizier's Vault Logo"
      width={140}
      height={140}
      className={className ?? "size-[140px] object-contain"}
    />
  );
}
