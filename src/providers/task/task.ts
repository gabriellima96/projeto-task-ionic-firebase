import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';

@Injectable()
export class TaskProvider {

  private PATH = 'tasks/';

  constructor(private db: AngularFireDatabase) { }

  index() {
    return this.db.list(this.PATH).snapshotChanges();
  }

  store(task: any) {
    return this.db.list(this.PATH).push(task);
  }

  destroy(key: string) {
    return this.db.object(this.PATH+ key).remove();
  }

  update({ key, title, description }) {
    return this.db.object(this.PATH+ key).update({ title, description });
  }

  /* //Trabalhar sync
  async index() {
    const tasksObj = await this.db.object(this.PATH).valueChanges().take(1).toPromise();

    const tasks = Object.keys(tasksObj).map(key => {
      return { key: key, ...tasksObj[key] };
    });

    return tasks;
  }*/
}
