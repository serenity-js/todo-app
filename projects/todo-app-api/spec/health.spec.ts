import 'mocha';

import { actorCalled } from '@serenity-js/core';
import { ChangeApiConfig, GetRequest, LastResponse, Send } from '@serenity-js/rest';
import { Ensure, equals } from '@serenity-js/assertions';
import { LocalServer, StartLocalServer, StopLocalServer } from '@serenity-js/local-server';

describe('TodoApp API', () => {

  before(() =>
    actorCalled('Apisitt').attemptsTo(
      StartLocalServer.onRandomPort(),
      ChangeApiConfig.setUrlTo(LocalServer.url()),
    ));

  after(() =>
    actorCalled('Apisitt').attemptsTo(
      StopLocalServer.ifRunning(),
    ));

  describe('GET /health', () => {

    it('provides information about server uptime', () =>
      actorCalled('Apisitt').attemptsTo(
        Send.a(GetRequest.to('/health')),
        Ensure.that(LastResponse.status(), equals(200)),
      ));

  });
});
