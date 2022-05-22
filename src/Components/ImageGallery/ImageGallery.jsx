import { Component } from "react";
import { ImageGalleryItem } from "./ImageGalleryItem";
import PicturesApiService from "../FetchApi/FetchAPI";
import { Loader } from "../Loader/Loader";

const picturesApiService = new PicturesApiService();

export default class ImageGallery extends Component {
  state = {
    searchResult: null,
    errorText: null,
    status: "idle",
  };
  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchResult;
    const currentSearch = this.props.searchResult;

    if (prevSearch !== currentSearch) {
      this.setState({ status: "pending" });
      console.log(`request changed: ${this.searchResult}`);
      picturesApiService.query = currentSearch;
      picturesApiService.fetchPictures().then((fetchResponse) => {
        if (fetchResponse.data.hits.length > 0) {
          this.setState({
            searchResult: fetchResponse.data.hits,
            status: "resolved",
          });
        } else {
          this.setState({ errorText: "Nothing found", status: "rejected" });
        }
      });
    }
  }

  render() {
    const { searchResult, status } = this.state;
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "rejected") {
      return <h1>Enter a coorect request</h1>;
    }
    if (status === "resolved") {
      return (
        <div>
          {searchResult && (
            <ul className="ImageGallery">
              <ImageGalleryItem datas={searchResult} />
            </ul>
          )}
        </div>
      );
    }
  }
}
