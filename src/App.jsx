import QRCode from 'qrcode'
import { useState } from 'react'

function App() {
	const [url, setUrl] = useState('')
	const [qr, setQr] = useState('')
	const [name ,setname]=useState('')
	const [errorMessage, setErrorMessage] = useState('');

	const GenerateQRCode = () => {
		if (!url || !name) {
            setErrorMessage('Please enter a URL and your name.');
            setTimeout(() => {
                setErrorMessage('');
            }, 5000);
            return;
        }
		QRCode.toDataURL(url, {
			width: 800,
			margin: 2,
			color: {
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, url) => {
			if (err) return console.error(err)

			console.log(url)
			setQr(url)
		})
	}

	return (
		<div className="app">
			<h1>QR Generator</h1>
			<input 
				type="url"
				placeholder="e.g. https://Amazon.com"
				value={url}
				onChange={e => setUrl(e.target.value)} />
			<br></br>
			<input 
			type="text"
			placeholder="your name is "
			value={name}
			onChange={e=>setname(e.target.value)}/>
			<br></br>
			<button onClick={GenerateQRCode} class="button1">Generate</button>
			{errorMessage && (
                <div className="error-message">{errorMessage}</div>
            )}
			{qr && <>
				<img src={qr} alt="qr-code" />
				<p class="text1">hey {name}, here is your {url} QRCODE</p>
				<a href={qr} download="qrcode.png">Download</a>
			</>}
		</div>
	)
}

export default App
