import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCategoryData,  toggleWidget  } from "../store";
import Records from "../Components/data/data.json";
import Sidebar from "./Sidebar";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import "../css/dash.css";

const size = {
  width: 400,
  height: 150,
};
const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 16,
  fontWeight: 600,
  whiteSpace: "pre-line",
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 4} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

export default function Dash() {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.categoryData);

  const [isOpenSidebar, setOpenSidebar] = useState(false);
  const [activeTab, setActiveTab] = useState("CSPM");
  const [searchInput, setSearchInput] = useState("");
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleRemoveWidget = (categoryId, widgetId) => {
    dispatch(toggleWidget(categoryId, widgetId));
  };


  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const allWidgets = categoryData.reduce((acc, category) => {
    return [...acc, ...category.widgets];
  }, []);

  const filteredWidgets = allWidgets.filter((widget) =>
    widget.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  const handleWidgetClick = (widgetName) => {
    setSearchInput(widgetName);
    setIsDropdownVisible(false);
  };

  const saveVisibilityToLocalStorage = (data) => {
    localStorage.setItem("categoryData", JSON.stringify(data));
  };

  const loadVisibilityFromLocalStorage = () => {
    const savedData = localStorage.getItem("categoryData");
    return savedData ? JSON.parse(savedData) : null;
  };

  useEffect(() => {
    const savedData = loadVisibilityFromLocalStorage();
    if (Records && Records.categories) {
      const mergedData = Records.categories.map((category) => {
        const savedCategory = savedData
          ? savedData.find((savedCat) => savedCat.id === category.id)
          : null;

        if (savedCategory) {
          return {
            ...category,
            widgets: category.widgets.map((widget) => {
              const savedWidget = savedCategory.widgets.find(
                (savedW) => savedW.id === widget.id
              );
              return savedWidget
                ? { ...widget, isVisible: savedWidget.isVisible }
                : widget;
            }),
          };
        } else {
          return category;
        }
      });
      dispatch(setCategoryData(mergedData));
    } else {
      console.error("Data or data.categories is undefined");
    }
  }, [dispatch]);

  useEffect(() => {
    saveVisibilityToLocalStorage(categoryData);
  }, [categoryData]);

  const handleOpen = () => {
    setOpenSidebar(true);
  };

  const handleClose = () => {
    setOpenSidebar(false);
  };

  return (
    <div className="container-fluid mb-3">
      {/* Header and other content */}
      <div className="row">
        <div className="col-12 dash-head">
          <div className="row py-2">
            <div className="col-3">
              <h5 className="d-flex">Dashboard</h5>
            </div>

           {/* Search Bar */}
            <div className="col search-bar text-center">
              <input 
                type="text"
                placeholder="Search widgets..."
                value={searchInput}
                onChange={handleSearchChange}
                onFocus={() => setIsDropdownVisible(true)}
              />
              {isDropdownVisible && searchInput && (
                <div className="dropdown text-start">
                  {filteredWidgets.map((widget) => (
                    <div key={widget.id} className="list-items">
                      <p onClick={() => handleWidgetClick(widget.name)}>
                        {widget.name}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="row mt-4 px-3">
        <div className="col-4">
          <h5>CMAPP Dashboard</h5>
        </div>
        <div className="col-8 text-end">
          <button className="add-widget" onClick={handleOpen}>
            Widget <i className="bx bx-plus bx-rotate-90"></i>
          </button>
          <button className="refresh-btn ms-4">
            <i className="bx bx-refresh"></i>
          </button>
          <button className="dot-btn ms-4">
            <i className="bx bx-dots-vertical-rounded"></i>
          </button>
        </div>
      </div>

      <div className="row">
        {categoryData.map((category) => (
          <div key={category.id} className="col-12 mt-3">
            <h6>{category.name}</h6>
            <div className="CSPM-row d-flex align-items-center flex-wrap">
              {category.widgets.map(
                (widget) =>
                  widget.isVisible && (
                    <div key={widget.id} className="cspm-data m-3">
                      <div className="col-12 d-flex mx-2 mt-2">
                        <div className="col-7">
                          <h6>{widget.name}</h6>
                        </div>
                        <div className="col-5 widgetin-delete" style={{ fontSize: "20px" }}
                        onClick={() => handleRemoveWidget(category.id, widget.id)}>
                          <p>
                            <i class="bx bx-trash" style={{ cursor: "pointer" }}></i>
                          </p>
                        </div>
                      </div>
                      {widget.type === "pie" ? (
                        <div className="piechart-container">
                          <PieChart
                            series={[
                              {
                                data: widget.data,
                                innerRadius: 50,
                                outerRadius: 70,
                                color: widget.data.map((item) => item.color),
                                startAngle: 0,
                                endAngle: -360,
                                cx: 75,
                              },
                            ]}
                            {...size}
                          >
                            <PieCenterLabel>
                              {widget.data.length} Total
                            </PieCenterLabel>
                          </PieChart>{" "}
                        </div>
                      ) : (
                        <div className="text-widget m-3">
                          <p>{widget.text}</p>
                        </div>
                      )}
                    </div>
                  )
              )}
              <div className="Add-widget-inline m-3 d-flex align-items-center justify-content-center">
                <button onClick={handleOpen} id="widget-btn">
                  <i className="bx bx-plus bx-rotate-90"></i> Add Widget
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

        {/* Sidebar */}

      {isOpenSidebar && (
        <Sidebar
          isOpenSidebar={isOpenSidebar}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          handleClose={handleClose}
        />
      )}
    </div>
  );
}
