import React from 'react';

const PreLoader = () => {
    return (  <React.Fragment>
        <div className="preloader flex-column justify-content-center align-items-center">
        <img className="animation__shake" src="dist/img/AdminLTELogo.png" alt="AdminLTELogo" height="60" width="60" />
      </div>
        </React.Fragment>
        );
}
 
export default PreLoader;