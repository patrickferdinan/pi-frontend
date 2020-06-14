import ApiService from '../app/apiservice';

export default class EventService extends ApiService {

    constructor() {
        super('/events')
    }

    findAll(eventFilter) {
        let params = `?name=${eventFilter.name}`

        return this.get(params)
    }
}