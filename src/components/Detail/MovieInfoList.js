import React from "react";

const MovieInfoList = ({ movie }) => {
  const { Title, Year, Ratings, Website, ...restDetails } = movie;

  const formatValue = (value) => (value === "N/A" ? "Not Available" : value);

  const imdbRatingValue =
    Ratings && Ratings.length
      ? Ratings.find((rating) => rating.Source === "Internet Movie Database")
          ?.Value
      : "Not Available";

  const details = [
    { label: "Released", value: restDetails.Released },
    { label: "Duration", value: restDetails.Runtime },
    { label: "Genre", value: restDetails.Genre },
    { label: "Director", value: restDetails.Director },
    { label: "Writer", value: restDetails.Writer },
    { label: "Cast", value: restDetails.Actors },
    { label: "Plot", value: restDetails.Plot },
    { label: "Language", value: restDetails.Language },
    { label: "Country", value: restDetails.Country },
    { label: "Awards", value: restDetails.Awards },
    { label: "IMDb Rating", value: imdbRatingValue },
    { label: "IMDb Votes", value: restDetails.imdbVotes },
    { label: "Type", value: restDetails.Type },
    { label: "Rated", value: restDetails.Rated },
    { label: "DVD Release", value: restDetails.DVD },
    { label: "Box Office", value: restDetails.BoxOffice },
    { label: "Production", value: restDetails.Production },
    {
      label: "Website",
      value:
        Website && Website !== "N/A" ? (
          <a href={Website} target="_blank" rel="noopener noreferrer">
            {Website}
          </a>
        ) : (
          "Not Available"
        ),
    },
  ];

  return (
    <div>
      <h2 className="mb-3">
        {Title} <span>({Year})</span>
      </h2>
      <ul className="list-group">
        {details.map((detail, index) => (
          <li className="list-group-item" key={index}>
            <strong>{detail.label}:</strong> {formatValue(detail.value)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieInfoList;
