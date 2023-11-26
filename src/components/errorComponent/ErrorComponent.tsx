import React, { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { hideErrorMesaage } from "../../redux/features/errorSlice";
import Store from "../../redux/Store";
import "./ErrorComponent.css";

// const ErrorComponent = () => {
//   const errorMessage = useSelector((state: any) => state.errorMessage);
//   console.log(errorMessage);
//   const [isLoading, setisLoading] = useState(errorMessage);
//   return <div className="error">{errorMessage}</div>;
// };

//

const ErrorComponent = () => {
  const errorMessage = useSelector(
    (state: any) => state.errorMessage.errorMessage
  );
  //console.log(errorMessage);
  useEffect(() => {
    if (errorMessage) {
      const timeoutId = setTimeout(() => {
        Store.dispatch(hideErrorMesaage());
      }, 20000);

      // Clean up the timer when the component unmounts or when a new error occurs
      return () => {
        clearTimeout(timeoutId);
        //  Store.dispatch(hideErrorMesaage());
      };
      // return () => {
      //   second
      // }
    }
  }, [Store.dispatch, errorMessage]);
  return (
    <div className="error">
      {errorMessage?.message ? errorMessage?.message : errorMessage}
    </div>
  );
};
export default ErrorComponent;
