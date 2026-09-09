
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { Trash2, Clock } from "lucide-react";

import { getImageURL } from "@/lib/functions";

import {
  getWatchHistory,
  removeFromWatchHistory,
  clearWatchHistory,
} from "@/lib/History";

import type { WatchHistoryItem } from "@/types/movies.type";

const History = () => {
  const [history, setHistory] = useState<WatchHistoryItem[]>([]);

  useEffect(() => {
    setHistory(getWatchHistory());
  }, []);

  const handleRemove = (
    id: number,
    mediaType: "movie" | "tv"
  ) => {
    removeFromWatchHistory(id, mediaType);

    setHistory((prev) =>
      prev.filter(
        (item) =>
          !(item.id === id && item.mediaType === mediaType)
      )
    );
  };

  const handleClearHistory = () => {
    clearWatchHistory();
    setHistory([]);
  };

  return (
    <div className="history-page">

      <div className="history-header">

        <div>
          <h1>Watch History</h1>

          <p>
            Movies and TV shows you have watched
          </p>
        </div>

        {history.length > 0 && (
          <button
            className="clear-history"
            onClick={handleClearHistory}
          >
            <Trash2 size={17} />
            Clear History
          </button>
        )}

      </div>

      {history.length === 0 ? (

        <div className="empty-history">

          <Clock size={50} />

          <h2>No watch history</h2>

          <p>
            Movies and TV shows you watch will appear here.
          </p>

        </div>

      ) : (

        <div className="history-table-container">

          <table className="history-table">

            <thead>
              <tr>
                <th>Movie</th>
                <th>Title</th>
                <th>Date Watched</th>
                <th>Time Watched</th>
                <th>Times Watched</th>
                <th></th>
              </tr>
            </thead>

            <tbody>

              {history.map((item) => {

                const watchedDate = new Date(item.watchedAt);

                const year = item.release_date
                  ? new Date(item.release_date).getFullYear()
                  : "N/A";

                const dateWatched =
                  watchedDate.toLocaleDateString();

                const timeWatched =
                  watchedDate.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                const image = item.poster_path
                  ? getImageURL(item.poster_path, "sm")
                  : "/placeholder.jpg";

                return (
                  <tr
                    key={`${item.mediaType}-${item.id}`}
                  >

                   
                    <td>
                      <img
                        className="history-poster"
                        src={image}
                        alt={item.title}
                      />
                    </td>

                  
           <td>
  <Link
    to={
      item.mediaType === "movie"
        ? `/movie/${item.id}`
        : `/tv/${item.id}`
    }
    className="history-title"
  >
    <span>{item.title}</span>

    <small className="history-year">
      {year}
    </small>
  </Link>
</td>

                   
                   

                   
                    <td>
                      {dateWatched}
                    </td>

                    
                    <td>
                      {timeWatched}
                    </td>

                    
                    <td>
                      <span className="watch-count">
                        {item.watchCount}
                      </span>
                    </td>

                    <td>
                      <button
                        className="remove-history"
                        onClick={() =>
                          handleRemove(
                            item.id,
                            item.mediaType
                          )
                        }
                        title="Remove from history"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
};

export default History;
