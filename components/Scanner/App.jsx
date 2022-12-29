import React from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

class App extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
        this.state = {
            text: "",
        };
    }

    render() {
        return (
            <div className='Scanner'>
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={this.onNewScanResult}
                />

                <div className="ResultCode">
                    {this.state.text}
                </div>
            </div>
        );
    }

    onNewScanResult(decodedText, decodedResult) {
        this.setState({
            text: decodedText,
        });
    }
}

export default App;
