import { IRoute } from '../interfaces/route.interface';

function toBreadcrumbPath(
  routes: IRoute[],
  prefix: string = '',
): Record<string, string> {
  return routes.reduce<Record<string, string>>((acc, route) => {
    const fullPath = `${prefix}/${route.path ?? ''}`.replace(/\/+/g, '/');
    acc[fullPath] = route.name ?? '';

    if (route.children) {
      const childPaths = toBreadcrumbPath(route.children, fullPath);
      Object.assign(acc, childPaths);
    }

    return acc;
  }, {});
}

export function toBreadcrumbs(routes: IRoute[]): Record<string, string> {
  return toBreadcrumbPath(routes, '');
}
