import crypto from "node:crypto"
const {generateKeyPairSync, publicEncrypt, privateDecrypt, KeyLike, KeyPairSyncResult} = crypto

const algorithm = String(process.env.crypto_algorithm)
const PassPhrase = process.env.RSA_PassPhrase
const Bits = Number(process.env.RSA_Bits)

const genSecret = (size) => {
    return crypto.randomBytes(size).toString("hex")
}

const genHash = (text, alg = 'sha256') => {
	return crypto.createHash(alg, text)
}

const saltHash = (text, salt, alg = "sha256") => {
  return createHash(alg)
    .update(text)
    .update(createHash(alg).update(salt, "utf8").digest("hex"))
    .digest("hex")
}

const encrypt = (text,  secretKey) => {
    const iv = crypto.randomBytes(16)

    const cipher = crypto.createCipheriv(algorithm, secretKey, iv)

    const encrypted = Buffer.concat([cipher.update(text), cipher.final()])

    return {
        iv: iv.toString('hex'),
        content: encrypted.toString('hex')
    }
}

const decrypt = (hash, secretKey) => {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.iv, 'hex'))

    const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])

    return decrpyted.toString()
}

// RSA

const encryptWithRSA = (input, publicKey) => {
    const buffer = Buffer.from(input, 'utf-8')
    const encrypted = publicEncrypt(publicKey, buffer)
    return encrypted.toString("base64")
}

const decryptWithRSA = (input, privatekey) => {
    const buffer = Buffer.from(input, 'base64')
    const decrypted = privateDecrypt(
        {
            key: privatekey,
            passphrase: PassPhrase,
        },
        buffer,
    )
    return decrypted.toString("utf8")
}

const generateKey = () =>  {
    return generateKeyPairSync('rsa', {
        modulusLength: Bits,
        publicKeyEncoding: {
            type: 'spki',
            format: 'pem'
        },
        privateKeyEncoding: {
            type: 'pkcs8',
            format: 'pem',
            cipher: 'aes-256-cbc',
            passphrase: PassPhrase
        }
    });
}

const privateKeyToString = (privateKey) =>  {
    return privateKey.split("\n").slice(1,17).join()
}

const publicKeyToString = (publicKey) => {
    return publicKey.split("\n").slice(1,5).join()
}

export {
  encrypt,
  decrypt,
  genHash,
  saltHash,
  genSecret,
  encryptWithRSA,
  decryptWithRSA,
  generateKey,
  privateKeyToString,
  publicKeyToString
}