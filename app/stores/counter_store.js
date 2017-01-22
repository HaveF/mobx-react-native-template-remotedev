import { observable, action, runInAction } from 'mobx'
import remotedev from 'mobx-remotedev'
import api from './api'

@remotedev({remote: true, global: true })
class CounterStore {
  @observable counter = 0;
  @observable remoteCounter = 0;

  constructor() {
  }

  @action increment() {
    this.counter++;
  }

  @action decrement() {
    this.counter--;
  }

  @action incrementAsync() {
    setTimeout(() => {
      runInAction('Timeout increment', () => { this.count++; }, this);
      }, 500);
  }

  @action getFromRemote() {
    api.get('/hello')
      .then( (r)=> {
        if(r.ok)
          this.remoteCounter = r.data; //TODO: should use runInAction?
        else
          this.remoteCounter = 'error';
      });
  }
}

const counterStore = new CounterStore;

export default counterStore;
