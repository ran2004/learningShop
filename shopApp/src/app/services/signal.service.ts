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
  private callbacks: Array<(users: string[]) => void> = []; // Store all callbacks here
  public recivedUsersIdsList: string[] = [];

  constructor() {
    const headers = {
      Authorization: `Bearer ${this.getToken()}`,
    };

    // Create the initial connection
    this.connection = new HubConnectionBuilder()
      .withUrl('http://localhost:5212/usersHub', { headers })
      .configureLogging(LogLevel.Information)
      .build();

    // Ensure the connection's 'onReceiveUserList' method works
    this.connection.on('receiveuserlist', (usersIds: string[]) => {
      this.recivedUsersIdsList = usersIds;
      // Execute all stored callbacks with the received data
      this.callbacks.forEach((callback) => callback(usersIds));
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

  // Store the callback and trigger it when the user list is received
  public onReceiveUserList(callback: (users: string[]) => void): void {
    this.callbacks.push(callback);
  }

  public async updateToken(): Promise<void> {
    try {
      const headers = {
        Authorization: `Bearer ${this.getToken()}`,
      };

      // First stop the current connection, waiting for it to finish
      await this.stopConnection();

      // Now create a new connection with the updated token
      this.connection = new HubConnectionBuilder()
        .withUrl('http://localhost:5212/usersHub', { headers })
        .configureLogging(LogLevel.Information)
        .build();

      // Reattach the callback to the new connection
      this.connection.on('receiveuserlist', (usersIds: string[]) => {
        this.recivedUsersIdsList = usersIds;
        // Execute all stored callbacks with the received data
        this.callbacks.forEach((callback) => callback(usersIds));
      });

      // Start the new connection
      await this.startConnection();
    } catch (err) {
      console.error('Error while updating the SignalR connection:', err);
    }
  }
}
