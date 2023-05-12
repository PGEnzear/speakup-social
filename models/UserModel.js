import { userModel } from '../database/models/models.js'
import {client} from "../modules/s3storage.js"
import {Duplex} from 'stream'
import {v4} from "uuid"

function bufferToStream(myBuffer) {
    let tmp = new Duplex();
    tmp.push(myBuffer);
    tmp.push(null);
    return tmp;
}

class UserModel {

  async getUser(username) {
    try {
      const user = await user.findOne({
        where: {
          username
        }
      })

      if(!user) { return {"data": {"result": "user not found"}} }

      const { firstname, lastname, bio, photo } = user
      return {
        "data": {"result": {
          firstname, lastname, bio, photo
        }}
      }
    } catch(e) {
      console.warn(e.toString())
    }
  }

  async changeDOB(user, dob) {
		try {
			const result = await user.set({
				dob
			})
      await user.save()
			if(result) return {"data":{"result": "dob successfuly changed"}}
		} catch(e) {
      console.log(e)
    }
  }
  
  async changeUsername(user, username) {
		try {
			const result = await user.set({
				username
			}).save()
			if(result) return {"data":{"result": "username successfuly changed"}}
		} catch(e) {
      console.log(e)
    }
  }
  
  async changeFirstname(user, firstname) {
		try {
			const result = await user.set({
				firstName: firstname
			}).save()
			if(result) return {"data":{"result": "firstname successfuly changed"}}
		} catch(e) {
      console.log(e)
    }
  }
  
  async changeLastname(user, lastname) {
    try {
			const result = await user.set({
				lastName: lastname
			}).save()
			if(result) return {"data":{"result": "lastname successfuly changed"}}
		} catch(e) {
      console.log(e)
    }
  }
  
  async changeBio(user, bio) {
    try {
      await user.set({
        bio
      })
      await user.save()
      return {"data": {"result": "bio successfuly changed"}}
    } catch(e) {
      console.log(e)
    }
  }
  
  async changePhoto(user, photo) {
    try {
      if (photo.mimetype.substr(0,6) != 'image/') return {"data": "Invalid filetype", "status": 400}
      const fileSizeInMegabytes = photo.size / (1024*1024);
      if(fileSizeInMegabytes > 5) return {"data": "Invalid Size of file, > 5 mb"}
      const db_userFilename = user.photo
      let userFileName;
      if(!db_userFilename) {
        const filename = v4() + "." + photo.name.split(".")[photo.name.split(".").length - 1]
        userFileName = String(user.id) + filename;
        await user.set({
  				photo: userFileName
  			})
        await user.save()
      } else {
        userFileName = db_userFilename
      }
      const readableStream = bufferToStream(photo.data);
      client.uploadFile("speakup/pfp/" + userFileName, readableStream).then(r => {
        return {"data": {"result": "sucessfully"}}
      })
      return {"data": {"result":  "sucessfully"}}
    } catch(e) {
      console.log(e)
    }
  }
  
}

let arg = new UserModel()
export default arg