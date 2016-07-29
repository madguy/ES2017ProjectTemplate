'use strict';

export function wait (n){
  return new Promise(done => setTimeout(() => done(n), n));
}
