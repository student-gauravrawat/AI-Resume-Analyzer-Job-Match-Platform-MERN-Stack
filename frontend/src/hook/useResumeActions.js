// src/hooks/useResumeActions.js
import { useCallback } from 'react';

const useResumeActions = () => {
  
  // View Resume logic
  const handleView = useCallback((url) => {
    if (!url) return;

    if (url.endsWith('.docx') || url.endsWith('.doc')) {
      const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
      window.open(googleViewerUrl, "_blank");
    } else {
      window.open(url, "_blank");
    }
  }, []);

  // Download Resume logic
  const handleDownload = useCallback((url) => {
    if (!url) return;
    window.open(url, "_blank");
  }, []);

  return { handleView, handleDownload };
};

export default useResumeActions;