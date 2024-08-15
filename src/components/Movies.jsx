import Movie from "./Movie";
import "../styles/movies.scss";

const Movies = ({ movies, viewTrailer, closeCard, lastMovieElementRef }) => {
  return (
    <div data-testid="movies" className="movies_container">
      {movies.movies.results?.map((movie, index) => {
        const uniqueKey = `${movie.id}-${index}`;

        if (index === movies.movies.results.length - 1) {
          return (
            <Movie
              movie={movie}
              key={uniqueKey} 
              viewTrailer={viewTrailer}
              closeCard={closeCard}
              lastMovieElementRef={lastMovieElementRef} 
            />
          );
        } else {
          return (
            <Movie
              movie={movie}
              key={uniqueKey} 
              viewTrailer={viewTrailer}
              closeCard={closeCard}
            />
          );
        }
      })}
    </div>
  );
};

export default Movies;
