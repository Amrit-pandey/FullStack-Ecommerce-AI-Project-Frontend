export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-center px-4 sm:px-6 lg:px-8">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} ShopOnBot.ai. All rights reserved.
        </p>
      </div>
    </footer>
  );
}