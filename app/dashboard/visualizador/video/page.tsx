"use client";

import { useRouter, useSearchParams } from "next/navigation";
import VideoViewer from "./_components/VideoViewer";
import { Suspense, useEffect, useState } from "react";
import Getvideo from "./_components/getVideo";

interface ArquivoData {
  arquivo: string;
}

export default function VideoViewerPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VideoViewerContent />
    </Suspense>
  );
}

function VideoViewerContent() {
  const searchParams = useSearchParams();
  const searchA = searchParams.get("arquivo");
  const searchM = searchParams.get("modulo");
  const router = useRouter();
  const [video, setVideo] = useState<ArquivoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const handleFetchVideo = async () => {
      if (!searchA || !searchM) {
        console.warn("Missing 'arquivo' or 'modulo' parameter.");
        setError("Missing required parameters.");
        router.push("/dashboard/materiais/");
        return;
      }

      try {
        const arquivoData:any = await Getvideo(searchA, searchM);
        if (!arquivoData) {
          throw new Error("No data returned from Getvideo.");
        }
        setVideo(arquivoData);
      } catch (err) {
        console.error("Failed to fetch Video:", err);
        setError("Failed to load video. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchVideo();
  }, [searchA, searchM, router]);

  if (isLoading) {
    return <div>Loading Video...</div>;
  }

  if (error) {
    console.error(error);
    return <div>Error loading the video. {error}</div>;
  }

  if (!video) {
    return <div>No video available to display.</div>;
  }

  const videoUrl = video.arquivo.split('/')[2];

  return (
    <div>
      {/* Ensure VideoViewer is correctly handling the video URL */}
      <VideoViewer fileUrl={videoUrl === 'www.youtube.com' ? video.arquivo : `/proxy/material/${video.arquivo}`} />
    </div>
  );
}
