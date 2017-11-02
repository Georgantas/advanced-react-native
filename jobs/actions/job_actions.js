
import axios from 'axios';
import * as types from './types';
import reverseGeocode from 'latlng-to-zip';
import qs from 'qs';

const JOB_QUERY_PARAMS = {
    publisher: '4201738803816157',
    format: 'json',
    v: '2',
    latlong: 1,
    radius: 10,
    q: 'javascript'
};

const JOB_ROOT_URL = 'http://api.indeed.com/ads/apisearch?';

const buildJobsUrl = (zip) => {
    const query = qs.stringify({ ...JOB_QUERY_PARAMS, l: zip });
    return `${JOB_ROOT_URL}${query}`;
};

export const fetchJobs = (region, callback) => async (dispatch) => {
    try {
        let zip = await reverseGeocode(region);
        const url = buildJobsUrl(zip);
        let { data } = await axios.get(url);
        dispatch({ type: types.FETCH_JOBS, data });
        callback();
    } catch(e) {
        console.error(e);
    }
};

export const likeJob = (job) => {
    return {
        type: types.LIKE_JOB,
        job
    };
}

export const clearLikedJobs = () => {
    return {
        type: types.CLEAR_LIKED_JOBS
    }
}
