import { Component } from "react";
import { ImageGalleryItem } from "./ImageGalleryItem";
import PicturesApiService from "../FetchApi/FetchAPI";
import { Loader } from "../Loader/Loader";
import { Button } from "../Button/Button";
const picturesApiService = new PicturesApiService();

export default class ImageGallery extends Component {
  state = {
    searchResult: null,
    errorText: null,
    status: "idle",
    totalHits: 0,
  };
  componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevProps.searchResult;
    const currentSearch = this.props.searchResult;

    if (prevSearch !== currentSearch) {
      this.setState({ status: "pending" });

      picturesApiService.query = currentSearch;
      picturesApiService.fetchPictures().then((fetchResponse) => {
        if (fetchResponse.data.hits.length > 0) {
          this.setState({
            searchResult: fetchResponse.data.hits,
            errorText: null,
            status: "resolved",
            totalHits: fetchResponse.data.totalHits,
          });
        } else {
          this.setState({ errorText: "Nothing found", status: "rejected" });
        }
      });
    }
  }
  onLoadMore = (data) => {
    this.setState({ searchResult: data });
  };
  render() {
    const { searchResult, status, totalHits } = this.state;
    if (status === "pending") {
      return <Loader />;
    }
    if (status === "rejected") {
      return <h1>Enter a coorect request</h1>;
    }
    if (status === "resolved") {
      return (
        <div>
          <ul className="ImageGallery">
            <ImageGalleryItem datas={searchResult} />
          </ul>

          {totalHits > 12 && (
            <Button
              searchValue={this.props.searchResult}
              totalHits={totalHits}
              onLoadMore={this.onLoadMore}
            />
          )}
        </div>
      );
    }
  }
}
