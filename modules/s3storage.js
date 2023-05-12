import { request } from "https"
import { Writable, Transform } from "stream";
import { parse } from "url"

class TransportStream extends Transform {
  _transform(chunk, encoding, callback) {
    callback(null, chunk)
  }
}

class LogWriter extends Writable {
  _write(chunk, encoding, callback) {
    console.log(chunk.toString())
  }
}

class SelectelStorage {

  #token = ""
  #expire_token = 0
  #storage_url = ""
  #storage_url_host = ""
  #storage_utl_path = ""
  #user = ""
  #password = ""

  async login(user, password) {
    this.#user = user
    this.#password = password

		await this.#auth()
  }

  #isAuth() {
    return this.#token.length !== 0
      && Date.now() < this.#expire_token
      && this.#storage_url.length !== 0
      && this.#storage_url_host.length !== 0
      && this.#storage_utl_path.length !== 0
  }

  async uploadFile(remote_path, stream) {
    if (!this.#isAuth()) await this.#auth()
    return new Promise((resolve, reject) => {
      const req = request({
        method: "PUT",
        host: this.#storage_url_host,
        path: this.#storage_utl_path + "/" + remote_path,
        headers: { "X-Auth-Token": this.#token }
      })
      console.log("sl " + this.#storage_utl_path + "/" + remote_path)
      stream.pipe(req)
      req.on("response", response => {
        response.resume()
        response.on("end", () => resolve())
      })
      req.on("error", err => reject(err))
    })
  }

  async deleteFile(remote_path) {
    if (!this.#isAuth()) await this.#auth()
    return new Promise((resolve, reject) => {
      const req = request({
        method: "DELETE",
        host: this.#storage_url_host,
        path: this.#storage_utl_path + "/" + remote_path,
        headers: { "X-Auth-Token": this.#token }
      })
      console.log(this.#storage_url_host)
      console.log("sl " + this.#storage_utl_path + "/" + remote_path)
      req.on("response", response => {
        console.log(response)
        response.resume()
        response.on("end", () => resolve())
      })
      req.on("error", err => reject(err))
    })
  }

  async downloadFile(remote_path) {
    if (!this.#isAuth()) await this.#auth()
    return new Promise((resolve, reject) => {
      const req = request({
        method: "GET",
        host: this.#storage_url_host,
        path: this.#storage_utl_path + "/" + remote_path,
        headers: {
          "X-Auth-Token": this.#token
        }
      })
      const stream = new TransportStream()
      req.on("response", response => {
        response.pipe(stream)
        resolve(stream)
      })
      req.on("error", err => reject(err))
      req.end()
    })
  }

  async #auth() {
    return new Promise((resolve, reject) => {
      const req = request({
        method: "GET",
        host: 'api.selcdn.ru',
        path: '/auth/v1.0',
        headers: {
          "X-Auth-User": this.#user,
          "X-Auth-Key": this.#password
        }
      })
      req.on("response", response => {
        const token = response.headers["x-auth-token"]
        const expire_token = response.headers["x-expire-auth-token"]
        const storage_url = response.headers["x-storage-url"]
        if (response.statusCode === 204 && token && expire_token && storage_url) {
          const storage_parse = parse(storage_url)
          const storage_url_host = storage_parse.host
          const storage_url_path = storage_parse.path
          if (!storage_url_host || !storage_url_path)
            throw new Error("ERROR AUTH")
          this.#token = token
          this.#expire_token = Date.now() + parseInt(expire_token) * 1000
          this.#storage_url = storage_url
          this.#storage_url_host = storage_url_host
          this.#storage_utl_path = storage_url_path
        } else {
          throw new Error("ERROR AUTH")
        }
        resolve()
      })
      req.on("error", err => reject(err))
      req.on("timeout", () => reject(new Error("timeout")))
      req.on("close", () => reject(new Error("close")))
      req.end()
    })
  }
}

const client = new SelectelStorage()

export {
  TransportStream,
  SelectelStorage,
  LogWriter,
  client
}