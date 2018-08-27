import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { map, mapKeys, pick } from 'lodash';

import { CategoriaService } from './../../../services/categoria.service';

@Component({
  selector: 'ngx-echarts-pie-event',
  templateUrl: './echarts-pie-event.component.html',
  styleUrls: ['./echarts-pie-event.component.scss'],
})
export class EchartsPieEventComponent
  implements OnInit, AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;
  categorias: any = [];
  data: any = [];

  constructor(private theme: NbThemeService, private cat: CategoriaService) {}

  ngOnInit() {
    this.cat.getCategoria().subscribe(res => {
      this.categorias = map(res, 'nome');
      res.forEach(element => {
        this.data.push(pick(element, ['nome', 'count']));
        this.data[this.data.length - 1] = mapKeys(
          this.data[this.data.length - 1],
          (value, key) => {
            return key === 'count' ? 'value' : 'name';
          },
        );
      });

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [
            colors.warningLight,
            colors.infoLight,
            colors.dangerLight,
            colors.successLight,
            colors.primaryLight,
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            orient: 'vertical',
            left: 'left',
            data: this.categorias,
            textStyle: {
              color: echarts.textColor,
            },
          },
          series: [
            {
              name: 'Categorias',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: this.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                normal: {
                  textStyle: {
                    color: echarts.textColor,
                  },
                },
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };
      });
    });
  }

  ngAfterViewInit() {}

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  onChartClick(params: any) {
    console.log(params);
  }
}
