import { TaskProvider } from './../../providers/task/task';
import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public tasks: any;

  constructor(
    public navCtrl: NavController,
    private taskProvider: TaskProvider,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) {

    this.taskProvider.index().subscribe(tasks => {
      this.tasks = tasks.map(task => ({ key: task.key, ...task.payload.val() }));
    }, error => {
      console.log(error);
      this.toastCtrl.create({
        message: 'Could not find the tasks',
        duration: 3000,
        position: 'top'
      }).present();
    });
  }

  async newTask() {
    this.alertCtrl.create({
      title: 'Add new task',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title'
        },
        {
          name: 'description',
          placeholder: 'Description'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Add',
          handler: async (data) => {
            const toast = this.toastCtrl.create({
              message: 'Task created',
              duration: 3000,
              position: 'top'
            });

            try {
              await this.taskProvider.store(data);
              this.taskProvider.index();
            } catch (error) {
              console.log(error);
              toast.setMessage('Could not create the task');
            } finally {
              toast.present();
            }
          }
        }]
      }).present();
  }

  async deleteTask(key) {
    const toast = this.toastCtrl.create({
      message: 'Task deleted',
      duration: 3000,
      position: 'top'
    });

    try {
      await this.taskProvider.destroy(key);
    } catch (error) {
      console.log(error);
      toast.setMessage('Could not deleted the task');
    } finally {
      toast.present();
    }
  }

  async updateTask(task) {
    this.alertCtrl.create({
      title: 'Update task',
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: task.title
        },
        {
          name: 'description',
          placeholder: 'Description',
          value: task.description
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Save',
          handler: async (data) => {

            data.key = task.key;

            const toast = this.toastCtrl.create({
              message: 'Task updated',
              duration: 3000,
              position: 'top'
            });

            try {
              await this.taskProvider.update(data);
              this.taskProvider.index();
            } catch (error) {
              console.log(error);
              toast.setMessage('Could not updated the task');
            } finally {
              toast.present();
            }
          }
        }]
      }).present();
  }
}
