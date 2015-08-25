import Oauth2 from 'torii/providers/oauth2-bearer';

import { configurable } from 'torii/configuration';

export default Oauth2.extend({
  name: 'dropbox-oauth2',
  baseUrl: 'https://www.dropbox.com/1/oauth2/authorize',
  response_type: 'token',
  responseParams: ['access_token', 'uid'],

  redirectUri: configurable('redirectUri', function(){
    // A hack that allows redirectUri to be configurable
    // but default to the superclass
    return this._super();
  })
});
