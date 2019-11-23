import { useContext } from "react";
import { PayloadContext } from "../comps/payloadContext";
import Layout from "../comps/layout";

export default function Contact() {
  const payload = useContext(PayloadContext);
  const { contactText } = payload.contactDetails.contactText;
  const contact = payload.contactDetails.contact;
  const { name, title, website, emailAdd, image } = contact;
  return (
    <Layout>
      <section className="bx--grid">
        <article className="left-content-gang">
          <h3>{name}</h3>
        </article>
      </section>
    </Layout>
  );
}
