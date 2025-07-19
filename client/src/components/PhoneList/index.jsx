import { useEffect} from "react";
import { connect } from "react-redux";
import { getProcessorsThunk, getPhonesThunk, changePage, deletePhoneThunk } from "./../../store/slices/phonesSlice";
import styles from './PhoneList.module.sass';

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
    if (page > 1){
      changePage(page - 1);
    } 
  };

  return (
    <>
      {phones.length === 0 ? <span className={styles.noPhone}>There are no phones</span>: <>
      <ul className={styles.phoneList}>
        {phones.map(ph => 
          <li key={ph.id} className={styles.phoneCard}>
            <div className={styles.titleContainer}>
              <h3>{ph.brand}</h3>
              <h4>{ph.model}</h4>
            </div>
            <div className={styles.phoneInfo}>
              <p>{`year: ${ph.yearOfManufacture}`}</p>
              <p>{`screen: ${ph.screenDiagonal}`}</p>
              <p>{`ram size: ${ph.ramSize}`}</p>
              <p>{`NFC: ${ph.isNfc ? "+": "-"}`}</p>
              <p>{`processor: ${processors.find(pr => pr.id === ph.processorId)?.model}`}</p>
            </div>
            <button className={styles.deleteBtn} onClick={() => deletePhone(ph.id)}>Delete</button>
          </li>
        )}
      </ul>
      <div className={styles.btnContainer}>
        <button className={styles.pageBtn} onClick={backPage} disabled={page === 1}>{'<'}</button>
        <button className={styles.pageBtn} onClick={nextPage} disabled={page * 4 > totalPhonesCount}>{'>'}</button>
      </div>
      </>}
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