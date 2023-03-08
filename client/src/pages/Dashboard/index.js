import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import {
  Container,
 
} from "reactstrap";
import { Link,Redirect } from "react-router-dom";
import Chat from "../Chat/Chat"




//i18n
import { withTranslation } from "react-i18next";

//redux
import { useSelector, useDispatch } from "react-redux";

const Dashboard = props => {


  const { isAuthenticated } = useSelector(state => ({
    
    isAuthenticated: state.Login.isAuthenticated,
  }));


if(!isAuthenticated)
{
  return <Redirect to={`/logout`}/>
}








  //meta title
  document.title = "Dashboard";

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
   <Chat/>
        </Container>
      </div>

     

 
    </React.Fragment>
  );
};

Dashboard.propTypes = {
  t: PropTypes.any,
  chartsData: PropTypes.any,
  onGetChartsData: PropTypes.func,
};

export default withTranslation()(Dashboard);
