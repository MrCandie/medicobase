import { Fragment } from "react";
import Header from "../components/homepage/header/header";
import Hero from "../components/homepage/hero/hero";
import Footer from "../components/homepage/footer/footer";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Hero />
      <Footer />
    </Fragment>
  );
}
