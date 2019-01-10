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
  version: 'My Customer v.[AIV]{version} - Build time: {date}[/AIV]',
  api: {
    get: () => {

      const interfaces = {
        localhost: 'http://localhost:5000/api',
        'ips-test': 'http://demo.ipsservices.com',
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
