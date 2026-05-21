"use client";
import dynamic from "next/dynamic";
import { Component, ReactNode } from "react";

const DistributorCSS = dynamic(() => import("./DistributorCSS"), { ssr: false });
const Distributor3D = dynamic(() => import("./Distributor3D"), { ssr: false });

class ErrorBoundary extends Component<
  { fallback: ReactNode; children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { fallback: ReactNode; children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

export default function Distributor(props: { height?: number }) {
  return (
    <ErrorBoundary fallback={<DistributorCSS {...props} />}>
      <Distributor3D {...props} />
    </ErrorBoundary>
  );
}
