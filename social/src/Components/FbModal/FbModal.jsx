import React from "react";
import "./FbModal.css";
import cross from "../../assets/icons/cross.png";
const FbModal = ({ children, title, closeBtn, back = null }) => {
  return (
    <>
      <div className="blur-box">
        <div className="fb-modal-wrapper">
          <div className="fb-modal-popup">
            <div className="fb-modal-header">
              <h4 className="title">{title}</h4>
              {back && (
                <button className="back" onClick={() => back()}>
                  <i class="bx bx-arrow-back"></i>
                </button>
              )}

              {closeBtn && (
                <button onClick={() => closeBtn(false)}>
                  <img src={cross} alt="" />
                </button>
              )}
            </div>
            <div className="fb-modal-body">{children}</div>

            <div className="fb-modal-footer"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FbModal;
