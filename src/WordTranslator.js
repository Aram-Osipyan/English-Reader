class WordTranslator{
    _host = 'https://developers.lingvolive.com';
    _apiKey = '<api key>';
    _countryCodes = {
        en:1033,
        ru:1049
    }
    /**
     *
     * @param word {string}
     * @param srcLang {string}
     * @param dstLang {string}
     */
    async translate(word,srcLang = 'en', dstLang = 'ru'){

        const tokenResponse = await fetch(`${this._host}/api/v1.1/authenticate`, {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin':'http://localhost:1234',
                'Access-Control-Allow-Methods':'POST, GET, OPTIONS, DELETE, PUT',
                'Access-Control-Allow-Headers': 'append,delete,entries,foreach,get,has,keys,set,values,Authorization',
                'Access-Control-Allow-Credentials': true,
                'Access-Control-Max-Age': 86400,
                'Authorization': `Basic ${this._apiKey}`
            }
        });

        const token = await tokenResponse.json();
        const translationUrl = `${this._host}/api/v1/Translation?text=${word}&srcLang=${this._countryCodes[srcLang]}&dstLang=${this._countryCodes[dstLang]}`
        const dictResponse = await fetch(translationUrl,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        return await dictResponse.json();
    }
}

export {WordTranslator}