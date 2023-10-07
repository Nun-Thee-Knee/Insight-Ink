import React, { useEffect, useState } from "react";
import ClickOutside from "react-click-outside";
import "font-awesome/css/font-awesome.min.css";
import styled from "styled-components";
import "./dashboard.css";
import TableTable from "../components/table";
import SideNav, { NavItem, NavIcon, NavText } from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Loader from "components/loader/Loader";
const StyledSideNav = styled(SideNav)`
  background-color: #242424;
`;
StyledSideNav.defaultProps = SideNav.defaultProps;

// Dashboard component
const Dashboard = () => {
  const [expanded, setExpanded] = useState(false);
  const [currentPage, setCurrentPage] = useState("home");
  const location = useLocation();
  const [tableData, setTableData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const { dropdownValue, formattedDate } = location.state;
    setLoading(true);

    setTimeout(() => {
      setLoading(true);
    }, 1500);

    //later replace this with the domain name

    axios
      .get("http://localhost:5000/", { dropdownValue, formattedDate })
      .then((res) => {
        setTableData(res.data);
        console.log(tableData);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [location.state]);

  const handlePageChange = (pageName) => {
    setCurrentPage(pageName);
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return <TableTable />;
      case "charts":
        return <div>charts</div>;
      case "contact":
        return <div>contact</div>;
      case "settings":
        return <div>settings</div>;
      default:
        return null;
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="dashboard-container">

      <ClickOutside
        onClickOutside={() => {
          setExpanded(false); 
        }}
      >
        <StyledSideNav
          expanded={expanded}
          onToggle={(expanded) => {
            setExpanded(expanded);
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected="home">
            <NavItem 
              eventKey="home"
              onClick={() => {
                handlePageChange("home");
              }}
            >
              <NavIcon>
                <i
                  className="fa fa-fw fa-home"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Home</NavText>
            </NavItem>
            <NavItem 
              eventKey="charts"
              onClick={() => {
                handlePageChange("charts");
              }}
            >
              <NavIcon>
                <i
                  className="fa fa-fw fa-line-chart"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Charts</NavText>
            </NavItem>
            <NavItem 
              eventKey="contact"
              onClick={() => {
                handlePageChange("contact");
              }}
            >
              <NavIcon>
                <i
                  className="fa fa-fw fa-envelope"
                  style={{ fontSize: "1.75em" }}
                />
              </NavIcon>
              <NavText>Contact us</NavText>
            </NavItem>
            <NavItem 
              eventKey="settings"
              onClick={() => {
                handlePageChange("settings");
              }}
            >
              <NavIcon>
                <i className="fa fa-fw fa-cog" style={{ fontSize: "1.75em" }} />
              </NavIcon>
              <NavText>Settings</NavText>
            </NavItem>
          </SideNav.Nav>
        </StyledSideNav>
      </ClickOutside>

      {/* Render the main content section */}
      <section className={`section ${expanded ? "pushed" : ""}`}>
        <section className="section-content">
          <h1>Article Dashboard</h1>
          {renderPageContent()}
        </section>
      </section>
    </div>
  );
};

export default Dashboard;
