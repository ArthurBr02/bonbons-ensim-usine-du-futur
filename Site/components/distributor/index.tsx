import dynamic from "next/dynamic";

// Distributor3D is now active by default using the GLB model from GitHub
const use3D = process.env.NEXT_PUBLIC_USE_3D !== "false";

const DistributorCSS = dynamic(() => import("./DistributorCSS"), { ssr: false });
const Distributor3D = dynamic(() => import("./Distributor3D"), { ssr: false });

export default function Distributor(props: { height?: number }) {
  return use3D ? <Distributor3D {...props} /> : <DistributorCSS {...props} />;
}
