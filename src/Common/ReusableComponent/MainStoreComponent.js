import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateCurrentSelectStateAction,
  updateCurrentSelectStoreAction,
  updateErrorStateOfStateAndStoreAction,
  updateStoreCodeAction,
  updateStoreListAction,
} from "../../Redux/Action/ReconciliationServiceAction";
import { GET_STORE_DATA_API } from "../../ApiCalls/ApiCall/apiCalls";
import moment from "moment";
import CustomReactCheckboxes from "./CustomMultiSelect/CustomReactCheckboxes";
import StoreFeatureCheckboxesComp from "./CustomMultiSelect/StoreFeatureCheckboxesComp";

const MainStoreComponent = () => {
  const dispatch = useDispatch();

  const {
    stateList = [],
    storeList = [],
    selectStateAndStoreError = {},
    currentSelectState = [],
    currentSelectStore = [],
  } = useSelector(
    (state) => state.ReconciliationService.ReconciliationStore || {}
  );

  let allValueCheckboxSelectedFeatureOn = false;

  const stateClearFun = () => {
    dispatch(updateStoreListAction([])); // when clear state then it should clear all the stores
    dispatch(updateCurrentSelectStoreAction([])); // when clear state then it should clear all the stores
  };

  const [currentState, setCurrentState] = useState([]);
  const [currentStore, setCurrentStore] = useState([]);

  const customStoreList = storeList?.map((i) => ({
    ...i,
    label: `${i.name}(${i?.code || ""})`,
    value: i.name,
  }));

  const customStateList = stateList?.map((i) => ({
    ...i,
    label: i.displayName,
    value: i.technicalName,
  }));

  const onSelectStore = (v, date, isUpdate) => {
    console.log("onSelectStore", v, currentStore.length);
    if (v?.length === currentStore?.length) {
      // for error
      // dispatch(
      //   updateErrorStateOfStateAndStoreAction({
      //     ...selectStateAndStoreError,
      //     storeError: false,
      //   })
      // );
      setCurrentStore(v);
      updateCurrentSelectStoreAction(v);
      console.log('===if-===========',v);
      // stateClearFun()
      // return;
    }
    if (typeof v !== "function") {
      let temp = v
      if (v[0]?.value === '*') {
        temp = v.slice(1)
      }

      dispatch(updateCurrentSelectStoreAction(temp));
      dispatch(
        updateErrorStateOfStateAndStoreAction({
          ...selectStateAndStoreError,
          storeError: false,
        })
      );
      setCurrentStore(temp);
      const getStoreCode = temp?.map((i) => i?.code);
      getStoreCode && dispatch(updateStoreCodeAction(getStoreCode));
    }
  };
  const storeHandler = (v, date, isUpdate) => {
    console.log("store handler select", v, currentStore.length);
    if (v?.length === currentStore?.length) {
      // for error
      // dispatch(
      //   updateErrorStateOfStateAndStoreAction({
      //     ...selectStateAndStoreError,
      //     storeError: false,
      //   })
      // );
      setCurrentStore(v);
      updateCurrentSelectStoreAction(v);
      console.log('===if-===========',v);
      // stateClearFun()
      // return;
    }
    if (typeof v !== "function") {
      console.log('===if function-===========',v);
      let state = currentSelectStore.length === 0 ? v : currentSelectStore
      dispatch(updateCurrentSelectStoreAction(state));
      dispatch(
        updateErrorStateOfStateAndStoreAction({
          ...selectStateAndStoreError,
          storeError: false,
        })
      );
      setCurrentStore(state);
      const getStoreCode = state?.map((i) => i?.code);
      getStoreCode && dispatch(updateStoreCodeAction(getStoreCode));
    }
  };

  const stateHandler = (v, date) => {
    if (v?.length === 0) {
      // for error
      dispatch(
        updateErrorStateOfStateAndStoreAction({
          ...selectStateAndStoreError,
          stateError: false,
        })
      );
      setCurrentState([]);
      updateCurrentSelectStateAction(v);
      stateClearFun();
      // console.log("stte list data funn instial", v);
    }

    let payload = [];
    if (typeof v !== "function") {
      dispatch(updateCurrentSelectStateAction(v));
      payload = v?.map((i) => i?.technicalName);
      dispatch(
        updateErrorStateOfStateAndStoreAction({
          ...selectStateAndStoreError,
          stateError: false,
        })
      );
      setCurrentState(v);
      setCurrentStore([]);
    } else {
      dispatch(
        updateErrorStateOfStateAndStoreAction({
          ...selectStateAndStoreError,
          stateError: false,
        })
      );
    }

    payload.length > 0 &&
      GET_STORE_DATA_API({
        state: payload,
        date: date,
      }).then((res) => {
        // console.log("ajsldjflasjdf", res);
        const { data = [] } = res.data || {};
        if (data) {
          console.log('===currentSelectStore===',currentSelectStore);
          console.log('===storeList===',storeList);
          console.log('===currentStore===',currentStore);

          let custm = data.map((item) => {
            
            // let flt = currentSelectStore.filter((store) => {return store.code === item?.code && store.name === item?.name});
            // if (flt[0]) {
            //   return flt[0];
            // } else {
              return {
                ...item,
                technicalName: item.code,
                displayName: item.name,
                label: item.name,
                value: item.name,
              }
            // }
          });
          console.log('===custm===',custm);
          let store = currentSelectStore.length === 0 ? custm : [{label: "Select All", value: "*"},...currentSelectStore];
          
          storeHandler(custm, 'de', true);
          // setCurrentStore(store)
          // setCurrentStore([{city: "GHAZIABAD",code: "73036-1-0",displayName: "73036-1-0-Opulent Mall Ghaziabad",label: "73036-1-0-Opulent Mall Ghaziabad",name: "73036-1-0-Opulent Mall Ghaziabad",posDataSync: true,state: "GHAZIABAD",technicalName: "73036-1-0",value: "73036-1-0-Opulent Mall Ghaziabad"}]);
          dispatch(updateStoreListAction(custm));
        }
      });
  };

  // console.log('===currentSelectStor---------e===',currentSelectStore);
  //         console.log('===storeLis---------t===',storeList);
  //         console.log('===currentStor--------e===',currentStore);

  const calculateActiveStore = () => {
    let allStoreCount;
    let activeStoreCount;
    if (currentState.length > 0 && currentStore.length > 0) {
      let data = currentStore?.filter((i) => i.value !== "*");
      allStoreCount = storeList?.filter((i) => i.value !== "*")?.length || 0;
      activeStoreCount =
        data?.filter((i) => i.posDataSync === true)?.length || 0;
    }
    // console.log("{allStoreCount, activeStoreCount}", {allStoreCount, activeStoreCount});
    return { allStoreCount, activeStoreCount };
  };

  const store = useSelector((state) => state || {});
  const { userCredentials = {}, dateRangeSelect = [] } =
    store.DashboardStore.DashboardStore || {};

  const currentDate = moment();

  // Format the date as 'YYYY-MM-DD'
  const formattedDate = currentDate.subtract(1, "days").format("YYYY-MM-DD");

  let customDate = {
    startDate:
      dateRangeSelect[0] !== null
        ? moment(dateRangeSelect[0]).format("YYYY-MM-DD")
        : formattedDate,
    endDate:
      dateRangeSelect[1] !== null
        ? moment(dateRangeSelect[1]).format("YYYY-MM-DD")
        : formattedDate,
  };

  useEffect(() => {
    // let tim = setTimeout(() => { // Initially set select all state to dropdown
    //   stateHandler(
    //     stateList.map((item) => ({
    //     ...item,
    //     label: item.displayName,
    //     value: item.technicalName,
    //   })), customDate )
    // }, 500);
    // return () => {
    //   clearTimeout(tim)
    // }
    let state = currentSelectState.length === 0 ? stateList : currentSelectState;
    stateHandler(
      state.map((item) => ({
        ...item,
        label: item.displayName,
        value: item.technicalName,
      })),
      customDate
    );

  }, [stateList, dateRangeSelect[1]]);

  return (
    <div>
      <div className="flex"> 
        <>
          <div className="mr-2">
            <CustomReactCheckboxes
              colourOptions={customStateList}
              isDisabled={!stateList.length > 0}
              placeholder={"Select City"}
              value={currentState || []}
              buttonLabel="City"
              onChange={(v) => stateHandler(v, customDate)}
              checkboxNotDisabled={false}
            />
            {selectStateAndStoreError.stateError && (
              <span
                style={{
                  // position: "absolute",
                  left: "8px",
                  fontSize: "12px",
                  color: "red",
                }}
              >
                Please select city
              </span>
            )}
          </div>
          <div>
            <StoreFeatureCheckboxesComp
                colourOptions={storeList}
                value={
                  // currentSelectStore
                  // [{city: "GHAZIABAD",code: "73036-1-0",displayName: "73036-1-0-Opulent Mall Ghaziabad",label: "73036-1-0-Opulent Mall Ghaziabad",name: "73036-1-0-Opulent Mall Ghaziabad",posDataSync: true,state: "GHAZIABAD",technicalName: "73036-1-0",value: "73036-1-0-Opulent Mall Ghaziabad"}]
                  allValueCheckboxSelectedFeatureOn
                    ? currentStore
                    : currentStore.filter((i) => i.posDataSync)
                }
                isDisabled={!currentState.length > 0}
                placeholder={"Select Store"}
                buttonLabel="Store"
                onChange={onSelectStore}
                checkboxNotDisabled={true}
                allValueCheckboxSelectedFeatureOn={
                  allValueCheckboxSelectedFeatureOn
                }
              />
            {selectStateAndStoreError.storeError && (
              <span
                style={{
                  // position: "absolute",
                  // left: "8px",
                  fontSize: "12px",
                  color: "red",
                }}
              >
                Please select store
              </span>
            )}
          </div>
          <div
            className="flex"
          >
            <div className="selected-stores-box mr-2 flex">
              Selected Cities:
              {/* <strong>{calculateActiveStore()?.activeStoreCount || 0}</strong> */}
              <strong>{currentState.length || 0}</strong>
            </div>
            <div className="selected-stores-box">
              All Stores:
              <strong>{currentStore.length || 0}</strong>
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default MainStoreComponent;
