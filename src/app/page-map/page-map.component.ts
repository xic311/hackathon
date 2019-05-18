import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as L from 'mapbox-gl';
import { IncidentDataService, IncidentData } from '../services/incident-data.service';
import * as $ from 'jquery';
import { interval } from 'rxjs';

@Component({
  selector: 'app-page-map',
  templateUrl: './page-map.component.html',
  styleUrls: ['./page-map.component.scss']
})
export class PageMapComponent implements OnInit, AfterViewInit {
  map: L.Map;
  data = [] as any;

  constructor(private incidentData: IncidentDataService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      Object.getOwnPropertyDescriptor(L, 'accessToken').set('pk.eyJ1IjoiZnhpYW5nIiwiYSI6ImNqdnQ0aGpoZzNjd240OG9qaG9uczAzemcifQ.eWT0dZaFoaaA-UvtwXxv1g');

      this.map = new L.Map({
        container: 'mapid',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-117.1611, 32.7157],
        zoom: 10
      });
      setTimeout(() => {
        this.incidentData.getData1().subscribe(d => this.addData(d));
      }, 5000);
      setTimeout(() => {
        this.incidentData.getData2().subscribe(d => this.addData(d));
      }, 10000);
      setTimeout(() => {
        this.incidentData.getData3().subscribe(d => this.addData(d));
      }, 15000);
      setTimeout(() => {
        this.updateData();
      }, 20000);
    });
  }

  addData(data) {
    $('div.marker').remove();
    this.data.push(...data);

    this.data.map(d => {
      let imgUrl = '';
      if (d.tags[0] === 'fire') {
        imgUrl = 'assets/flame.png';
      } else if (d.tags[0] === 'rescue') {
        imgUrl = 'assets/hospital.png';
      }

      const $el = $('<div>')
        .addClass('marker')
        .append(
          $('<img>')
            .attr('src', imgUrl)
            .css('height', '100%')
            .css('width', '100%')
        ).on('click', () => {
          this.showInfo(d);
        });
      if (d.rank > 3) {
        $el.addClass('emergency');
      }

      return new L.Marker($el[0])
        .setLngLat([d.location[0], d.location[1]])
        .addTo(this.map);
    });

  }

  updateData() {
    this.incidentData.getData().subscribe(data => {
      this.addData(data);
    });
  }

  showInfo(d: IncidentData) {
    $('#info')
      .empty()
      .append($('<div>').addClass('title').text(d.tags.join(' ')))
      .append(
        $('<table>')
          .append(
            $('<tr>')
              .append($('<td>').text('Location'))
              .append($('<td>').text(`${d.location[0].toFixed(3)} ${d.location[1].toFixed(3)}`)))
          .append(
            $('<tr>')
              .append($('<td>').text('Reported as'))
              .append($('<td>').text(d.category)))
          .append(
            $('<tr>')
              .append($('<td>').text('Reported at'))
              .append($('<td>').text(d.time)))
          .append(
            $('<tr>')
              .append($('<td>').text('Priority'))
              .append($('<td>').text(d.rank)))
      );
    console.log(d);
  }
}
