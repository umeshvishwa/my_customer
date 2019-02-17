/**
 * Created by .
 * User: u.kumar.vishwakarma
 * Contact: u.kumar.vishwakarma@accenture.com
 * Date: 28-Jun-2018
 * Time: 20:14
 */

const constants = Object.freeze({
  app: {
    title: 'My Customer',
  },
  message: {
    EMAIL_VERIFICATION: 'Your have not verified your email. Please verify your email to access ',
    ERROR_OOPS: 'Oops!',
    ERROR_TITLE_403: '403 Access Denied',
    ERROR_DETAILS_403: 'Sorry, you do not have permission to access this page!',
  },
  version: 'My Customer v.[AIV]{version} - Build time: {date}[/AIV]',
  api: {
    get: () => {

      const interfaces = {
        localhost: 'http://localhost:3000/api',
        'mycustomerapp.herokuapp.com': 'https://mycustomerapp.herokuapp.com/api',
      };
      return interfaces[window.location.hostname] || false;

    },
  },
  routes: {
    pages: {
      home: '*',
    },
    unauthorized: '/unauthorized',
  }
});

export default constants;
