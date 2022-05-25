import { Component } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.handleEscKey);
  }
  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleEscKey);
  }
  handleOverlayclick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onModalClose();
    }
  };
  handleEscKey = (e) => {
    if (e.code === "Escape") {
      this.props.onModalClose();
    }
  };
  render() {
    return createPortal(
      <div className="Overlay" onClick={this.handleOverlayclick}>
        <div className="Modal">
          <img src={this.props.largeImageURL} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}
export { Modal };
