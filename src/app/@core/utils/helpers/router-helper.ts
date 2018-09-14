import { ActivatedRoute } from '@angular/router';
export class RouterHelper {

  static getParams(activatedRoute: ActivatedRoute, name: string): any {
    const resolvedData = activatedRoute.pathFromRoot.find(route => route.data[name]);
    return resolvedData ? resolvedData.params : null;
  }

}
