import type { Trailer } from "@/types/movies.type";

interface TrailerModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  trailer: Trailer | null;
}

function TrailerModal({
  isOpen,
  onClose,
  title,
  trailer,
}: TrailerModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="trailer-modal-overlay"
      onClick={onClose}
    >
      <div
        className="trailer-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="trailer-modal-close"
          onClick={onClose}
          aria-label="Close trailer"
        >
          ×
        </button>

        <h2>{title} Trailer</h2>

        {trailer ? (
          <div className="trailer-video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={`${title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        ) : (
          <div className="no-trailer">
            <p>No trailer is available.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default TrailerModal;