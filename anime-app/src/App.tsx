import React, { useState } from "react";
import "./App.css";
import SearchBar from "./Components/SearchBar_comp/SearchBar";
import MediaGrid from "./Components/MediaGrid_comp/MedaGrid";
import { IUserInput } from "./Common/Interfaces";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 700,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

function App() {
  const [UserInput, setUserInput] = useState<IUserInput>({
    SearchQuery: "adventure",
  });
  function SetUserInput(a: IUserInput) {
    setUserInput(a);
  }

  return (
    <div className="App">
      <SearchBar SetUserInput={(a: IUserInput) => SetUserInput(a)} />
      <MediaGrid SearchQuery={UserInput.SearchQuery} />
    </div>
  );
}

export default App;
