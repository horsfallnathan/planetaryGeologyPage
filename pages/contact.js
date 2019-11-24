import { useContext } from "react";
import { PayloadContext } from "../comps/payloadContext";
import Layout from "../comps/layout";

export default function Contact() {
  const payload = useContext(PayloadContext);
  const contact = payload.contactDetails.contact;
  const { name, website, emailAdd, image, contactText } = contact;
  return (
    <Layout>
      <section className="bx--grid">
        <article>
          <h3>Contact Information</h3>
          <p>{contactText}</p>
        </article>
        <a
          className="bx--btn bx--btn--primary"
          href={"mailto:thomas.kenkmann@geologie.uni-freiburg.de"}
          type="button"
        >
          Send Email
        </a>
      </section>
    </Layout>
  );
}
