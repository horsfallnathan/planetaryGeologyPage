import MenuBar from "./menuBar";
import "../public/styles/customTheme.scss";

export default function Layout({ children }) {
  return (
    <div className="layout">
      <MenuBar />
      <main className="container">{children}</main>
    </div>
  );
}
