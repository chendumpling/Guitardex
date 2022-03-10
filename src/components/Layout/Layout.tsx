import Sidebar from "../Sidebar/Sidebar"
import { SLayout, SMain } from "./styles"
import React, { useState } from "react"
import { Helmet } from "react-helmet"
import FontLoad from "../../assets/fonts"
import { globalStyle } from "../../styles/globalStyles"
import Cookies from "universal-cookie"
import {
  COLORS,
  COLOR_MODE_KEY,
  INITIAL_COLOR_MODE_CSS_PROP,
} from '../../styles/theme';
import { Global } from '@emotion/react'


const cookies = new Cookies() 


// createContext should not have any params
// but that only works in js
export const ThemeContext = React.createContext(null)

const Layout = (props) => {
  const [colorMode, rawSetColorMode] = React.useState(undefined);

  React.useEffect(() => {
    const root = window.document.documentElement;

    // Because colors matter so much for the initial page view, we're
    // doing a lot of the work in gatsby-ssr. That way it can happen before
    // the React component tree mounts.
    const initialColorValue = root.style.getPropertyValue(
      INITIAL_COLOR_MODE_CSS_PROP
    );
    // this isnt updating correctly, and its really weird, depends on localstorage i guess
    //getInitialColorMode() in gatsby-ssr.js is returning wrong values sometimes

    rawSetColorMode(initialColorValue);
  }, []);

  const contextValue = React.useMemo(() => {
    function setColorMode(newValue) {
      const root = window.document.documentElement;
      localStorage.setItem(COLOR_MODE_KEY, newValue);
      Object.entries(COLORS).forEach(([name, colorByTheme]) => {
        const cssVarName = `--color-${name}`;
        root.style.setProperty(cssVarName, colorByTheme[newValue]);
      })
      rawSetColorMode(newValue);
    }
    return {
      colorMode, ////////////// CAN RETURN SIDEBAR HERE OR NO???
      setColorMode,
    };
  }, [colorMode, rawSetColorMode]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {/* <ThemeProvider theme={themeStyle}> */}
        <Global styles={globalStyle} />
        <Helmet>
          <title>{props.title}</title>
        </Helmet>
        <SLayout>
          <Sidebar />
          <SMain>{props.children}</SMain>
        </SLayout>
      {/* </ThemeProvider> */}
    </ThemeContext.Provider>
  )
}

export default Layout