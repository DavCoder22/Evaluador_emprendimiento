import flowConfig from './flow-config1.json';

class LangflowClient {
    constructor(baseURL, apiKey) {
        this.baseURL = baseURL;
        this.apiKey = apiKey;
    }

    async post(endpoint, body, headers = {"Content-Type": "application/json"}) {
        if (this.apiKey) {
            headers["Authorization"] = `Bearer ${this.apiKey}`;
        }
        const url = `${this.baseURL}${endpoint}`;
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(body)
            });

            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                const jsonResponse = await response.json();
                return jsonResponse;
            } else if (contentType && contentType.indexOf("text/html") !== -1) {
                const textResponse = await response.text();
                return { isHtml: true, html: textResponse };
            } else {
                throw new Error(`Error desconocido. Content-Type: ${contentType}`);
            }
        } catch (error) {
            console.error('Request Error:', error);
            throw error;
        }
    }

    async initiateSession(inputValue, stream = false) {
        const flowId = flowConfig.flow_id;  // Asegúrate de que flow-config1.json contiene un campo flow_id
        const endpoint = `/api/v1/run/${flowId}?stream=${stream}`;
        const tweaks = flowConfig.tweaks || {};
        return this.post(endpoint, { input_value: inputValue, tweaks: tweaks });
    }
}

export default LangflowClient;
