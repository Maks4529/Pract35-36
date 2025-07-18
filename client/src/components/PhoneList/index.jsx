import { connect } from "react-redux";
import { getProcessorsThunk, getPhonesThunk } from "./../../store/slices/phonesSlice";
import { useEffect } from "react";

function PhoneList({phones, processors, isFetching, error, getProcessors, getPhones}) {
  useEffect(() => {
    getProcessors();
    getPhones();
  }, [])

  return (
    <>
      <ul>
        {phones.map(ph => 
          <li key={ph.id}>
            <h3>{ph.brand}</h3>
            <h4>{ph.model}</h4>
            <p>{ph.yearOfManufacture}</p>
          </li>
        )}
      </ul>
    </>
  )
}

const mapStateToProps = ({phonesData}) => phonesData;

const mapDispatchToProps = (dispatch) => ({
  getProcessors: () => dispatch(getProcessorsThunk()),
  getPhones: () => dispatch(getPhonesThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps) (PhoneList);