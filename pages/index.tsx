import Layout from "@/components/Layout";
import Hero from "@/components/home/Hero";
import Belt from "@/components/home/Belt";
import Services from "@/components/home/Services";
import Diagnosis from "@/components/home/Diagnosis";
import Works from "@/components/home/Works";
import Greeting from "@/components/home/Greeting";
import ContactCta from "@/components/home/ContactCta";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Belt />
      <Services />
      <Diagnosis />
      <Works />
      <Greeting />
      <ContactCta />
    </Layout>
  );
}
