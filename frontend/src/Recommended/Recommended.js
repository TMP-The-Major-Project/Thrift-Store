import Button from "../components/Button";
import "./Recommended.css";

const Recommended = ({ handleClick }) => {
  return (
    <>
      <div>
        <h2 className="recommended-title">Recommended</h2>
        <div className="recommended-flex">
          <Button onClickHandler={handleClick} value="" title="All Products" />
          <Button onClickHandler={handleClick} value="Poshax" title="Poshax" />
          <Button onClickHandler={handleClick} value="littlebox" title="littlebox" />
          <Button onClickHandler={handleClick} value="Botnia" title="Botnia" />
          <Button onClickHandler={handleClick} value="H&M" title="H&M" />
        </div>
      </div>
    </>
  );
};

export default Recommended;
