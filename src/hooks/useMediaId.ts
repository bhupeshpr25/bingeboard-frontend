import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function useMediaId(): string | undefined {
  const { mediaId } = useParams<{ mediaId?: string }>();
  const [fetchedMediaId, setFetchedMediaId] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    if (mediaId) {
      setFetchedMediaId(mediaId);
    }
  }, [mediaId]);

  return fetchedMediaId;
}
