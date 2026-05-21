import dynamic from "next/dynamic";

// Switch to Distributor3D when GLB is ready:
// NEXT_PUBLIC_USE_3D=true
const use3D = process.env.NEXT_PUBLIC_USE_3D === "true";

const DistributorCSS = dynamic(() => import("./DistributorCSS"), { ssr: false });

export default use3D
  ? dynamic(() => import("./Distributor3D"), { ssr: false })
  : DistributorCSS;
