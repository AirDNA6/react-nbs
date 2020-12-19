import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import '../Footer.css'

const FooterPage = () => {
    return (
        <div className="footer">
        <MDBFooter className="font-small pt-4 mt-4 ">
            <div className="footer-copyright text-center py-3">
                <MDBContainer fluid style={{ color: 'black' }}>
                    &copy; {new Date().getFullYear()} Copyright: SSTeam
                </MDBContainer>
            </div>
        </MDBFooter>
        </div>
    );
}

export default FooterPage;