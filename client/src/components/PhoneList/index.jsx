import { connect } from "react-redux";
import { getProcessorsThunk, getPhonesThunk, changePage, deletePhoneThunk } from "./../../store/slices/phonesSlice";
import { useEffect } from "react";

function PhoneList({phones, processors, page, totalPhonesCount, isFetching, error, getProcessors, getPhones, deletePhone, changePage}) {
  useEffect(() => {
    getProcessors();
  }, []);

  useEffect(() => {
    getPhones(page);
  }, [page, phones]);

  const nextPage = () => {
    if (page * 4 < totalPhonesCount){
      changePage(page + 1);
    } 
  };

  const backPage = () => {
    if (page > 1) changePage(page - 1);
  };

  return (
    <>
      <ul>
        {phones.map(ph => 
          <li key={ph.id}>
            <h3>{ph.brand}</h3>
            <h4>{ph.model}</h4>
            <p>{ph.yearOfManufacture}</p>
            <p>{processors.find(pr => pr.id === ph.processorId)?.model}</p>
            <button onClick={() => deletePhone(ph.id)}>Delete</button>
          </li>
        )}
      </ul>
      <button onClick={backPage}>{'<'}</button>
      <button onClick={nextPage}>{'>'}</button>
    </>
  )
}

const mapStateToProps = ({phonesData}) => phonesData;

const mapDispatchToProps = (dispatch) => ({
  getProcessors: () => dispatch(getProcessorsThunk()),
  getPhones: (page) => dispatch(getPhonesThunk({page})),
  deletePhone: (id) => dispatch(deletePhoneThunk(id)),
  changePage: (newPage) => dispatch(changePage(newPage)),
});

export default connect(mapStateToProps, mapDispatchToProps) (PhoneList);