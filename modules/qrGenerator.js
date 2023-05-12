import QRCode from 'qrcode'
import fs from "fs"

class QrCodeGenerator {
  
  generateQR = async text => {
    try {
      return QRCode.toDataURL(text)
    } catch (err) {
      console.error(err)
    }
  }
  
  async generate(text, type, filename = null) {
    const imageString = await this.generateQR(text)
    const base64Data = imageString.replace(/^data:image\/png;base64,/, "");
    
    switch(type) {
      case "file": {
				if(!filename) {
					return console.log("Filename is not provided")
				}
        fs.writeFile(data, base64Data, 'base64', function(err) {
          console.log(err);
        });
        break;
      }

      case "string": {
        return imageString
        break;
      }

      default: {
        return imageString
      }
    }
  }
  
}

let arg = new QrCodeGenerator()
export default arg