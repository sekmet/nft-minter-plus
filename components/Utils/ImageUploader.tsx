import React from "react";
import axios from "axios";

declare var FileReader: any;

export default class ImageUpload extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      
      this.state = {
        file: '',
        filedata: '',
        imagePreviewUrl: ''
      };

      this._handleImageChange = this._handleImageChange.bind(this);
      this._handleSubmit = this._handleSubmit.bind(this);
    }
  
    _handleSubmit(e) {
      e.preventDefault();
      // TODO: do something with -> this.state.file
      const url = 'http://localhost:3000/api/upload'

      axios.post(url, {file: this.state.filedata})
      .then(function (response) {
        //handle response here
        console.log(response)
    }).catch(function (error) {
        //handle error here
        console.error(error)
    });

      //pinFileToIPFS("3242c7cac9e5f54604ad", "b0d766c1212258c6e363d8a1dfc39de9eff81fbb7261f45cfbebbe584be18775", this.state?.file)
    }
  
    _handleImageChange(e: any) {
      e.preventDefault()
  
      let reader = new FileReader()
      let file = e.target.files[0]
      reader.onloadend = () => {
        this.setState({
          file: file,
          filedata: reader.result,
          imagePreviewUrl: reader.result
        });
      }
  
      reader.readAsDataURL(file)
 
    }
  
    render() {
      const { imagePreviewUrl } = this.state
      let $imagePreview = null
      if (imagePreviewUrl) {
        $imagePreview = (<img src={imagePreviewUrl} />)
      }
  
      return (
        <>  
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        <div className="rounded-t bg-white mb-0 px-6 py-6">
          <div className="text-center flex justify-between">
            <h6 className="text-blueGray-700 text-xl font-bold">Upload Image, Video or Audio</h6>
          </div>
        </div>
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
        <form encType="multipart/form-data" onSubmit={this._handleSubmit}>
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Upload your NFT asset to ipfs
            </h6>
            <div className="flex flex-wrap">
        {/* file upload modal */}
        <article aria-label="File Upload Modal" className="relative h-full flex flex-col bg-white shadow-xl rounded-md">
        {/* scroll area */}
        <section className="h-full overflow-auto p-8 w-full h-full flex flex-col p-8">
        {$imagePreview ? '' : <header className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
            {/* overlay */}
            <div id="overlay" className="w-full h-full pointer-events-none z-50 flex flex-col items-center justify-center rounded-md">
                <i>
                <svg className="fill-current w-12 h-12 mb-3 text-blue-700" xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
                    <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
                </svg>
                </i>
                <p className="text-lg text-blue-700">Drop files to upload</p>
            </div>          
            <div className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
                <span>Drag and drop your</span>&nbsp;<span>files anywhere or</span>
                <input type="file" onChange={this._handleImageChange} />
            </div>
            </header> }

            <div className={$imagePreview ? "flex flex-wrap justify-center" : "flex flex-wrap justify-center mt-12"}>
            {$imagePreview ? $imagePreview :
            <ul id="gallery" className="flex flex-1 flex-wrap m-10">
            <li id="empty" className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                <img className="mx-auto w-32" src="https://user-images.githubusercontent.com/507615/54591670-ac0a0180-4a65-11e9-846c-e55ffce0fe7b.png" alt="no data" />
                <span className="text-small text-gray-500">No files selected</span>
            </li>
            </ul>}
            </div>
        </section>
        </article>
        </div>
        <footer className="text-center flex flex-col items-center mt-12">
        {$imagePreview ? <button type="submit" onClick={this._handleSubmit} className="bg-green-500 active:bg-green-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
            UPLOAD ASSET
        </button>: ''}
        </footer>
        </form>
        </div>
      </div>
      </>
      )
    }
  
  }