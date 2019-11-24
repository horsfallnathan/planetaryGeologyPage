import { useContext } from "react";
import { PayloadContext } from "../comps/payloadContext";
import { getUniqueID, findVal } from "../utils/helperFunctions";
import NewsBox from "../comps/newsBox.js";
import { Tile } from "carbon-components-react";
import Layout from "../comps/layout.js";

export default function StartPage() {
  const payload = useContext(PayloadContext);
  return (
    <Layout>
      <div className="haupt-banner bx--grid">
        <style jsx>{`
          .haupt-banner {
            background: url(${payload.hauptBanner.hauptImg});
            background-size: cover;
            background-position: center;
          }
        `}</style>
        <section className="banner-content">
          <div className="bx--row">
            <h1 className="bx--col-lg-4">{findVal(payload, "bannerTitle")}</h1>
            <h4 className="bx--col-lg-8">{findVal(payload, "bannerText")}</h4>
          </div>
        </section>
      </div>

      <section>
        {payload.homepageArticles.map(article => {
          return (
            <div className="bx--grid" key={getUniqueID()}>
              <div className="bx--row">
                <article className="left-content-gang">
                  <img
                    className="bx-img"
                    src={findVal(article, "articleImageUrl")}
                    alt=""
                  />
                  <Tile>
                    <h4>{findVal(article, "articleImageTitle")}</h4>
                    <p>{findVal(article, "articleImageSubText")}</p>
                  </Tile>
                </article>
                <article className="main-content-gang">
                  <div className="bx--col-lg-12">
                    <h2>{findVal(article, "articleTitle")}</h2>
                    {article.articleContent.map(content => {
                      return (
                        <p key={getUniqueID()}>
                          {findVal(content, "textBlock")}
                        </p>
                      );
                    })}
                  </div>
                </article>
              </div>
            </div>
          );
        })}
      </section>
      <section>
        <div className="bx--grid">
          <div className="main-content-gang">
            <h3>News:</h3>
            <article className="bx--row">
              {payload.homepageArticles.map(newsObject => {
                return (
                  <div className="bx--col-lg-4 news-box" key={getUniqueID()}>
                    <NewsBox
                      newsObject={newsObject}
                      imageUrl="articleImageUrl"
                      title="articleImageTitle"
                      summary="articleSummary"
                      newsLink="articlePath"
                    />
                  </div>
                );
              })}
            </article>
          </div>
        </div>
      </section>
    </Layout>
  );
}
