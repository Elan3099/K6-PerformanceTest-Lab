import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        // { duration: '10s', target: 10 }, // Ramp-up ke 10 user
        // { duration: '20s', target: 10 }, // Stay di 10 user
        { duration: '1s', target: 1 },  // Ramp-down
    ],
    thresholds: {
        // CI/CD akan FAIL jika 95% request lebih dari 250ms
        http_req_duration: ['p(95)<250'],
        http_req_failed: ['rate<0.01'], // Gagal jika error > 1%
    },
};

export default function () {
    const res = http.get('http://localhost:3000/api/v1/resource');
    
    check(res, {
        'status is 200': (r) => r.status === 200,
        'has correct body': (r) => r.json().status === 'success',
    });

    sleep(1);
}