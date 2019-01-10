/**
 * Created by Umesh Vishwakarma.
 * User: u.kumar.vishwakarma
 * Contact: umesh.vishwa@gmail.com
 * Date: 05-Jan-2019
 * Time: 20:11
 */

import axios from 'axios';
import config from '../config';

const instance = axios.create({
    baseURL: config.api.get(),
    timeout: 55000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

export default instance;
