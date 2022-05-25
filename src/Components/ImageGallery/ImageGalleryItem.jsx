import { Component } from "react";

class ImageGalleryItem extends Component {
  render() {
    return this.props.datas.map(
      ({ webformatURL, tags, largeImageURL }, index) => {
        return (
          <li className="ImageGalleryItem" key={index}>
            <img
              src={webformatURL}
              alt={tags}
              className="ImageGalleryItem-image"
              onClick={() => this.props.handleModal(largeImageURL)}
            />
          </li>
        );
      }
    );
  }
}

export { ImageGalleryItem };
