import type { Cast, Crew } from "@/types/movies.type";
import { getImageURL } from "@/lib/functions";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router";

interface CreditProps {
  cast: Cast[];
  crew: Crew[];
  movieId: number;
}

function Credit({ cast, crew, movieId }: CreditProps) {
  return (
    <section className="cast-section">
      <div className="cast-header">
        <h2>Cast & Crew</h2>

        <Link
          className="view-all-btn"
          to={`/now-playing/${movieId}?tab=credit`}
        >
          View All
          <ChevronRight size={16} />
        </Link>
      </div>

 
      <div className="cast-list">
        {cast?.slice(0, 12).map((actor) => (
          <Link
            to={`/person/${actor.id}`}
            className="cast-card"
            key={actor.id}
          >
            <div className="cast-image">
              {actor.profile_path ? (
                <img
                  src={getImageURL(actor.profile_path, "md")}
                  alt={actor.name}
                />
              ) : (
                <div className="cast-placeholder">
                  {actor.name?.charAt(0)}
                </div>
              )}
            </div>

            <div className="cast-info">
              <div>{actor.name}</div>
              <span>{actor.character}</span>
            </div>
          </Link>
        ))}
      </div>

   
      <div className="cast-list">
        {crew?.slice(0, 12).map((member) => (
          <Link
            to={`/person/${member.id}`}
            className="cast-card"
            key={`${member.id}-${member.job}`}
          >
            <div className="cast-image">
              {member.profile_path ? (
                <img
                  src={getImageURL(member.profile_path, "md")}
                  alt={member.name}
                />
              ) : (
                <div className="cast-placeholder">
                  {member.name?.charAt(0)}
                </div>
              )}
            </div>

            <div className="cast-info">
              <div>{member.name}</div>
              <span>{member.job}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default Credit;