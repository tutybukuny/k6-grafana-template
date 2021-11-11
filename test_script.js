import http from "k6/http";
import {check} from "k6";
import {Rate} from "k6/metrics";

export let errorRate = new Rate("errors");

export let options = {
    stages: [
        {
            target: 2000,
            duration: "30s",
        },
        {
            target: 2000,
            duration: "30s",
        },
    ],
};

export default function (data) {
    const res = http.get("http://localhost:8000");
    let success = check(res, {
        'succeeded': (r) => r.status >= 200 && r.status < 300,
    });
    errorRate.add(!success);
}