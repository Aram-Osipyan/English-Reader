class WordTranslator{
    _host = 'https://dictionary.yandex.net';
    _apiKey = '<api key>';

    /**
     *
     * @param word {string}
     * @param srcLang {string}
     * @param dstLang {string}
     */
    async translate(word,srcLang = 'en', dstLang = 'ru'){

        const response = await fetch(this.generateTranslateApiURL(word, srcLang, dstLang), {
            method: 'GET',
        });

        return await response.json();
    }

    /**
     * @param word {string}
     * @param srcLang {string}
     * @param dstLang {string}
     * @returns {string}
     * @private
     */
    generateTranslateApiURL(word,srcLang = 'en', dstLang = 'ru'){
        return `${this._host}/api/v1/dicservice.json/lookup?key=${this._apiKey}&lang=${srcLang}-${dstLang}&text=${word}`;
    }
}

export {WordTranslator}