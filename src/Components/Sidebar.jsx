import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleWidget } from "../store";
import "../css/dash.css";

export default function Sidebar({
  isOpenSidebar,
  activeTab,
  setActiveTab,
  handleClose,
}) {
  const dispatch = useDispatch();
  const categoryData = useSelector((state) => state.categoryData);

  const [tempVisibility, setTempVisibility] = useState({});

  const [previousTab, setPreviousTab] = useState(null);

  const tabsToCategoryId = {
    CSPM: "1",
    CWPP: "2",
    Image: "3",
  };

  const activeCategoryId = tabsToCategoryId[activeTab];
  const activeCategory = categoryData.find(
    (category) => category.id === activeCategoryId
  );

  useEffect(() => {
    if (previousTab && previousTab !== activeTab) {
      setTempVisibility({});
    }

    setPreviousTab(activeTab);
  }, [activeTab, previousTab]);

  const handleCheckboxChange = (widgetId) => {
    setTempVisibility((prevVisibility) => {
      const newVisibility = {
        ...prevVisibility,
        [widgetId]: !(prevVisibility[widgetId] !== undefined
          ? prevVisibility[widgetId]
          : activeCategory.widgets.find((widget) => widget.id === widgetId)
              .isVisible),
      };
      return newVisibility;
    });
  };

  const handleConfirm = () => {
    Object.keys(tempVisibility).forEach((widgetId) => {
      if (tempVisibility[widgetId] !== undefined) {
        dispatch(toggleWidget(activeCategoryId, widgetId));
      }
    });
    handleClose();
  };

  return (
    <>
      {isOpenSidebar && <div className="overlay"></div>}
      <div className={`sidebar ${isOpenSidebar ? "open" : "closed"}`}>
        <div className="heading d-flex">
          <div className="col">
            <h6>Add Widget</h6>
          </div>
          <div className="close-icon col d-flex justify-content-end mx-4">
            <button onClick={handleClose}>
              <i className="bx bx-x"></i>
            </button>
          </div>
        </div>
        <div className="p-1">
          <p>Personalize your dashboard</p>
        </div>
        <div className="sidebar-cat">
          {Object.keys(tabsToCategoryId).map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeCategory && (
          <div className="widget-category p-4">
            {activeCategory.widgets.map((widget) => (
              <div key={widget.id} className="widget-list px-3 my-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    checked={
                      tempVisibility[widget.id] !== undefined
                        ? tempVisibility[widget.id]
                        : widget.isVisible
                    }
                    id={`checkbox-${widget.id}`}
                    onChange={() => handleCheckboxChange(widget.id)}
                  />
                </div>
                <div className="ps-3">{widget.name}</div>
              </div>
            ))}
          </div>
        )}
        <div className="d-flex position-relative">
          <div className="cancel-sidebar">
            <button
              className="px-3 py-2"
             
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
          <div className=" confirm-sidebar">
            <button className="ms-4 px-3 py-2" onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
