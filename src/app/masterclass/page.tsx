"use client";

import React from "react";
import { WebinarLanding } from "./_components/WebinarLanding";
import { useZoomWebinars } from '@/hooks/use-zoom-webinars';

export default function MasterclassPage() {
  // Fetch upcoming Zoom meetings
  const { webinars, loading: webinarsLoading, error: webinarsError } = useZoomWebinars();

  return (
    <WebinarLanding 
      meetings={webinars}
      meetingsLoading={webinarsLoading}
      meetingsError={webinarsError}
    />
  );
}
