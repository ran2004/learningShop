import { Injectable } from '@angular/core';
import {
  HubConnection,
  HubConnectionBuilder,
  LogLevel,
} from '@microsoft/signalr';

@Injectable({
  providedIn: 'root',
})
export class SignalRService {
  private connection: HubConnection;
  private callbacksMap: Map<string, (users: string[]) => void> = new Map();
  public recivedUsersIdsList: string[] = [];

  constructor() {
    const headers = {
      Authorization: `Bearer ${this.getToken()}`,
    };

    this.connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5212/usersHub', { headers })
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.on('receiveuserlist', (usersIds: string[]) => {
      this.recivedUsersIdsList = usersIds;
      this.callbacksMap.forEach((value, key) => {
        value(usersIds);
      });
    });
  }

  private getToken(): string {
    return localStorage.getItem('authToken') ?? '';
  }

  public startConnection(): void {
    this.connection
      .start()
      .then(() => {
        console.log('SignalR connection established');
      })
      .catch((err) => {
        console.error('Error establishing SignalR connection:', err);
      });
  }

  public stopConnection(): Promise<void> {
    return this.connection
      .stop()
      .then(() => {
        console.log('SignalR connection stopped');
      })
      .catch((err) => {
        console.error('Error stopping SignalR connection:', err);
      });
  }

  public onReceiveUserList(
    componentName: string,
    callback: (users: string[]) => void
  ): void {
    this.callbacksMap.set(componentName, callback);
  }

  public async updateToken(): Promise<void> {
    try {
      const headers = {
        Authorization: `Bearer ${this.getToken()}`,
      };

      await this.stopConnection();

      this.connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5212/usersHub', { headers })
        .configureLogging(LogLevel.Information)
        .build();

      this.connection.on('receiveuserlist', (usersIds: string[]) => {
        this.recivedUsersIdsList = usersIds;

        this.callbacksMap.forEach((value, key) => {
          value(usersIds);
        });
      });

      await this.startConnection();
    } catch (err) {
      console.error('Error while updating the SignalR connection:', err);
    }
  }
}
