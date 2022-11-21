import { Fragment } from "react";
import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import Features from "../components/features/features";
import Footer from "../components/footer/footer";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Hero />
      <Footer />
    </Fragment>
  );
}
