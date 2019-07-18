import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';

declare let io;
const APIEndpoint = environment.APIEndpoint;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Planes';
  planes = []
  constructor(private http: HttpClient) {
    this.getPlanes().subscribe(res => {
      console.log(res)
      this.planes = res as []
    })
  }

  getPlanes() {
    return this.http.get(`${APIEndpoint}:3000/webapp/planes`);
  }

  ngOnInit() {
    const socket = io.connect(`${APIEndpoint}:3000`);
    socket.on('connect', function() {
      console.log('Connected to WS server');
    });
    socket.on('general', (msg) => {
      for(let i=0; i < this.planes.length; i++) {
        if(this.planes[i].id === msg.plane_id) {
          this.planes[i].altitude = msg.altitude
          this.planes[i].lat = msg.lat
          this.planes[i].lng = msg.lng

        }
      }
    })
    socket.on('warnings', (msg) => {
      for(let i=0; i < this.planes.length; i++) {
        if(this.planes[i].id === msg.plane_id) {
          this.planes[i].altitude = msg.altitude
          this.planes[i].lat = msg.lat
          this.planes[i].lng = msg.lng

        }
      }
    })
  }
}
