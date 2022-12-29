import React from "react";
import Html5QrcodePlugin from "./Html5QrcodePlugin";

class App extends React.Component {
    constructor(props) {
        super(props);

        // This binding is necessary to make `this` work in the callback.
        this.onNewScanResult = this.onNewScanResult.bind(this);
    }

    render() {
        return (
            <div className="Scanner">
                <Html5QrcodePlugin
                    fps={10}
                    qrbox={250}
                    disableFlip={false}
                    qrCodeSuccessCallback={this.onNewScanResult}
                    
                />
            </div>
        );
    }

    onNewScanResult(decodedText, decodedResult) {
        console.log(decodedText);
        console.log(decodedResult);
    }
}

export default App;