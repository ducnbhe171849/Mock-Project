import React from "react";
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse,
} from"mdb-react-ui-kit"
const Header = () => {
    return (
        <div>
            <MDBNavbar expand='lg' light style={{backgroundColor:"#541b1b"}}>
                <MDBContainer fluid>
                    <MDBNavbarBrand href="/">
                        <img src="/imgage/logo.jpg" alt="logo" style={{height:"30px"}}/>
                    </MDBNavbarBrand>
                </MDBContainer>
                <MDBNavbarToggler
                type="button"
                data-target ="#navbarColor02"
                aria-controls="navbarColor02"
                aria-expanded="false"
                aria-label="Toggle navigation"
                style={{color:"#fff"}}
                onClick={()=>setShow(!show)}
                >
                    <MDBIcon icon ="bars" fas/>
                </MDBNavbarToggler>
                <MDBCollapse show={show} navbar>
                    <MDBNavbarNav className="me-auto md-2 mb-lg-0">
                        <MDBNavbarItem className ="active">
                            <MDBNavbarLink aria-current="page" href="/" style={{color:"#fff"}}>
                                Home
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem >
                            <MDBNavbarLink href="/addBlog" style={{color:"#fff"}}>
                                Add Blog
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                        <MDBNavbarItem >
                            <MDBNavbarLink href="/about" style={{color:"#fff"}}>
                                About
                            </MDBNavbarLink>
                        </MDBNavbarItem>
                    </MDBNavbarNav>
                </MDBCollapse>
            </MDBNavbar>
        </div>
    )
}

export default Header
