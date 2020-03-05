import React from "react";

const context = React.createContext({
  lessClicked: () => {},
  moreClicked: () => {}
});

export default context;
