import React from "react";

import { useDispatch} from "react-redux";
import { actionCreators as imageActions } from "../redux/modules/image";

const Upload = (props) => {
  const dispatch = useDispatch();
  const fileInput = React.useRef();

  const selectFile = (e) => {
    
    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsDataURL(file);

    reader.onloadend = () => {
      
      dispatch(imageActions.setPreview(reader.result,file));
    };
  };

  return (
    <React.Fragment>
      <input type="file" onChange={selectFile} ref={fileInput}
      />
    </React.Fragment>
  );
};

export default Upload;
