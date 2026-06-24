import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Desactivado: la landing /premium usa enlaces con ancla (#nosotros, etc.)
  // que typedRoutes rechaza en compilación.
  typedRoutes: false,
};

export default nextConfig;
