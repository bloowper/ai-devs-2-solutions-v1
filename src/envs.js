require('dotenv').config();


class EnvironmentVariables {
    static _apiKey = null;
    static aiDevsApiKey = null;
    static _initialized = false;

    static initialize() {
        this._apiKey = process.env.OPEN_AI_API_KEY;
        if (!this._apiKey) {
            throw new Error('OPEN_AI_API_KEY is not defined in the environment.');
        }

        this.aiDevsApiKey = process.env.AI_DEVS_API_KEY;
        if (!this.aiDevsApiKey) {
            throw new Error('AI_DEVS_API_KEY is not defined in the environment.');
        }
        this._initialized = true;
    }

    static getApiKey() {
        this._throwIfNotInitialized();
        return this._apiKey;
    }

    static getAiDevsApiKey() {
        this._throwIfNotInitialized()
        return this.aiDevsApiKey;
    }

    static _throwIfNotInitialized() {
        if (!this._initialized) {
            throw new Error('EnvironmentVariables has not been initialized.');
        }
    }
}

module.exports = EnvironmentVariables;