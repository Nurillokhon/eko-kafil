/** @format */

import Navbar from "../../components/Navbar";
import StatsCards from "../../components/StatsCards";
import FeedbackForm from "./components/FeedbackForm";
import MainSec from "./components/mainSec";

const Index = () => {
  return (
    <div className="">
      <Navbar />
      <MainSec />
      <StatsCards />
      <FeedbackForm />
    </div>
  );
};

export default Index;
