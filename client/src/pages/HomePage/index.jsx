import React from "react";
import ImageContainer from "../../components/ImageContainer";
import Layout from "../../components/Layout";

const HomePage = () => {
  return (
    <Layout>
      <h1>Welcome to MedKit Web App</h1>
      <ImageContainer />
    </Layout>
  );
}

export default HomePage;