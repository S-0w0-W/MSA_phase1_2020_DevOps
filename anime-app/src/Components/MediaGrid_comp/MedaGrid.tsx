import React, { useState, useEffect } from "react";
import MediaCard from "../MediaCard_comp/MediaCard";
import { Grid } from "@material-ui/core";
import "./MediaGrid.css";
import { IUserInput } from "../../Common/Interfaces";

function MediaGrid(props: IUserInput) {
  const [ItemArray, setItemArray] = useState<any[]>([]);

  // useEffect(() => {
  //   fetch(
  //     "https://kitsu.io/api/edge/anime?filter%5Bcategories%5D=" +
  //       props.SearchQuery
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log(response);
  //       setItemArray(response.data);
  //     })
  //     .catch(() => console.log("it didn't work"));
  // }, [props.SearchQuery]);

  useEffect(() => {
    fetch("https://kitsu.io/api/edge/anime?filter[text]=" + props.SearchQuery)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setItemArray(response.data);
      })
      .catch(() => console.log("it didn't work"));

    // if (setItemArray.length == 0) {
    //   fetch("https://kitsu.io/api/edge/anime?filter[text]=" + props.SearchQuery)
    //     .then((response) => response.json())
    //     .then((response) => {
    //       setItemArray(response.data);
    //     })
    //     .catch(() => console.log("it didn't work"));
    // }
  }, [props.SearchQuery]);

  var Cards: JSX.Element[] = [];
  ItemArray.forEach((el: any, i: Number) => {
    console.log(el);
    if (el === undefined) {
      return;
    } else {
      Cards.push(
        <Grid
          key={"card_" + i}
          item
          sm={6}
          md={4}
          lg={3}
          className="MediaGridCard"
        >
          <MediaCard
            ImageUrl={el["attributes"]["posterImage"]["medium"]}
            Title={el["attributes"]["canonicalTitle"]}
            Description={el["attributes"]["synopsis"]}
          />
        </Grid>
      );
    }
  });

  return (
    <div>
      <Grid container spacing={3} className="MediaGridContainer">
        {Cards}
      </Grid>
    </div>
  );
}

export default MediaGrid;
