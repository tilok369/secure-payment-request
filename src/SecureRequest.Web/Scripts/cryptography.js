var cryptoGraphy = {
    key: CryptoJS.enc.Utf8.parse("asdfghjklpoiuytr"),
    iv: CryptoJS.enc.Utf8.parse("rtyuioplkjhgfdsa"),
    encrypt: function (plainText) {
        var encryptedlogin = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(plainText), this.key,
            {
                keySize: 128 / 8,
                iv: this.iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });
        return encryptedlogin.toString();
    },
    decrypt: function (ciphertext) {

    }
}