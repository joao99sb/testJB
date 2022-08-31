// eslint-disable-next-line import/no-extraneous-dependencies
const { jest: jestFun } = require('@jest/globals');
const { Readable, Writable } = require('stream');

class TestUtil {
  static defaultHandleParams() {
    const requestStream = TestUtil.generateReadableStream([
      'body da requisicao',
    ]);
    const responseStream = TestUtil.generateWritableStream(() => {});

    const data = {
      request: Object.assign(requestStream, {
        headers: {},
        method: '',
        url: '',
      }),
      response: Object.assign(responseStream, {
        json: jestFun.fn(),
        status: jestFun.fn(),
      }),
    };

    return {
      values: () => Object.values(data),
      ...data,
    };
  }

  // como o node faz as coisas por de baixo dos panos
  static generateReadableStream(data) {
    return new Readable({
      read() {
        // eslint-disable-next-line no-restricted-syntax
        for (const item of data) {
          this.push(item);
        }

        this.push(null);
      },
    });
  }

  static generateWritableStream(onData) {
    return new Writable({
      write(chunk, enc, cb) {
        onData(chunk);

        cb(null, chunk);
      },
    });
  }
}

module.exports = { TestUtil };
