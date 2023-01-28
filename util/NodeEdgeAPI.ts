import { RESTDataSource } from "apollo-datasource-rest";

class NodeEdgeAPI extends RESTDataSource {
    constructor() {
        super();
        this.baseURL = process.env.NEXT_PUBLIC_API_URL;
    }

    getDestinations() {
        return this.get('destination')
    }

    getDestination(id: string) {
        return this.get(`destination/${id}`)
    }

    getEdge(id) {
        return this.get(`edge/${id}`)
    }
}

export default NodeEdgeAPI;
