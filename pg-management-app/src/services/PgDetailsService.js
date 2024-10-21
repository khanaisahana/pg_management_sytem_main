import axios from 'axios';

const PGDETAILS_API_BASE_URL="http://localhost:8080/api/v1/pgDetails";

class PgDetailsService {
    getPgDetails() {
        return axios.get(PGDETAILS_API_BASE_URL);
    }
}

export default new PgDetailsService()