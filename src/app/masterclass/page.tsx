"use client";

import React from "react";
import { WebinarLanding } from "./_components/WebinarLanding";
import { useZoomMeetings } from '@/hooks/use-zoom-meetings';

export default function MasterclassPage() {
  // Fetch upcoming Zoom meetings
  const { meetings, loading: meetingsLoading, error: meetingsError } = useZoomMeetings();

  return (
    <WebinarLanding 
      meetings={meetings}
      meetingsLoading={meetingsLoading}
      meetingsError={meetingsError}
    />
  );
}
