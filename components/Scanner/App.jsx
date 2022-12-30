import Image from "next/image";
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

    updateTheStateHandler(event) {
        this.setState({ text: event.target.value });
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

                <div className='ResultCode'>
                    <div className='InputContainer'>
                        <label htmlFor='CodeInput_label'>
                            <Image
                                src={"/Icons/code.svg"}
                                width={20}
                                height={20}
                                alt={"Code Icon"}
                            />
                            <p>Code</p>
                        </label>
                        <div className='Input__Button'>
                            <input
                                id='CodeInput'
                                type='text'
                                placeholder='Scan for a code or type one'
                                value={this.state.text}
                                onInput={(e) => this.updateTheStateHandler(e)}
                            />
                            <button>
                                <Image
                                    src={"/Icons/SubmitLogin_Icon.svg"}
                                    width={18}
                                    height={18}
                                    alt={"Submit Icon"}
                                />
                            </button>
                        </div>
                    </div>
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
