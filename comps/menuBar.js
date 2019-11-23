import { useContext, useEffect, useState } from "react";
import { PayloadContext } from "./payloadContext";
import Logo from "./svgs/logo";
import Link from "next/link";
import { getUniqueID } from "../utils/helperFunctions";

const svgClose = (
  <svg
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    style={{ willChange: "transform" }}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 32 32"
    aria-hidden="true"
  >
    <path d="M24 9.4L22.6 8 16 14.6 9.4 8 8 9.4l6.6 6.6L8 22.6 9.4 24l6.6-6.6 6.6 6.6 1.4-1.4-6.6-6.6L24 9.4z"></path>
  </svg>
);
const svgOpen = (
  <svg
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    style={{ willChange: "transform" }}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
  >
    <path d="M15.5 15.5H18V18h-2.5zm-6.75 0h2.5V18h-2.5zM2 15.5h2.5V18H2zm13.5-6.75H18v2.5h-2.5zm-6.75 0h2.5v2.5h-2.5zM2 8.75h2.5v2.5H2zM15.5 2H18v2.5h-2.5zM8.75 2h2.5v2.5h-2.5zM2 2h2.5v2.5H2z"></path>
  </svg>
);
export default function MenuBar() {
  const payload = useContext(PayloadContext);
  const { menuList } = payload;
  const [isMenuOpen, setMenuState] = useState(false);
  const handleMenu = (e, tag) => {
    e.preventDefault();
    setMenuState(!isMenuOpen);
  };
  return (
    <div className="bx--grid">
      <header className="bx--header">
        <Link href="/">
          <a className="bx--header__name">
            <Logo color="#ffffff" />
          </a>
        </Link>
        <nav className="bx--header__nav">
          <ul className="bx--header__menu-bar" role="menubar">
            {menuList.map(menuItem => {
              return (
                <li key={getUniqueID()}>
                  <Link href={`/${menuItem.menuPath}`}>
                    <a
                      className="bx--header__menu-item"
                      role="menuitem"
                      tabIndex="0"
                    >
                      <span className="bx--text-truncate--end">
                        {menuItem.menuTitle}
                      </span>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="bx--header__global">
          <button
            className={`menu-button ${
              isMenuOpen ? "bx--header__action--active" : ""
            }`}
            aria-label="menu Button"
            type="button"
            onClick={event => handleMenu(event, "switcher")}
          >
            {isMenuOpen ? svgClose : svgOpen}
          </button>
        </div>
      </header>
      <div
        className={`nav-panel ${
          isMenuOpen ? "bx--header-panel--expanded" : ""
        }`}
      >
        <ul role="menu">
          {menuList.map(menuItem => {
            return (
              <li key={getUniqueID()}>
                <Link href={`/${menuItem.menuPath}`}>
                  <a className="bx--switcher__item-link" tabIndex="0">
                    {menuItem.menuTitle}
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
