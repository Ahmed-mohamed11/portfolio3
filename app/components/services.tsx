import styleText from "./services.module.css";
import Slider from "./servicesSlider";

const Service = () => {
  return (
    <div className={styleText.content} id="services">
      <Slider />
    </div>
  );
};

export default Service;
