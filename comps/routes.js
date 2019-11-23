import Link from "next/link";

const FieldLink = ({ id }) => {
  <Link href="/fieldtrips/[id]" as={`fieldtrips/${id}`}>
    <a href={id}></a>
  </Link>;
};
const StopLink = ({ id }) => {
  <Link href="/stops/[id]" as={`stops/${id}`}>
    <a href={id}></a>
  </Link>;
};

export { StopLink, FieldLink };
