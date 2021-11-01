import React from "react"

function Category2 (props){
    return(
        <React.Fragment>
    <div>
                <h3>{props.couponId}</h3>
                <p>{props.couponimage}</p>
                <p>{props.type}</p>
                <p>{props.title}</p>
                <p>{props.couponcreate}</p>
                <p>{props.coupondespire}</p>
              </div>
              </React.Fragment>
              )
}
export default Category2;