import { RoutesType } from '@App/@configs/routesConfig';
class Utils {
    static setRoutes(config : RoutesType) : any
    {
        let routes : any[] = [...config.routes];
        if (config.auth)
        {
            routes = routes.map((route) => {
                let auth = config.auth ? [...config.auth] : [];
                auth = route.auth ? [...auth, ...route.auth] : auth;
                return {
                    ...route,
                    auth
                };
            });
        }

        return [...routes];
    }

    static generateRoutesFromConfigs(configs : Array<any>) : any
    {
        let allRoutes : any[] = [];
        configs.forEach((config) => {
            allRoutes = [
                ...allRoutes,
                ...this.setRoutes(config)
            ]
        });
        return allRoutes;
    }

    static hasPermission(authArr : Array<string>, userRole : Array<string>) : any
    {
        /**
         * If auth array is not defined
         * Pass and allow
         */
        if (authArr === null || authArr === undefined)
        {
            // console.info("auth is null || undefined:", authArr);
            return true;
        }
        /**
         * if auth array is empty means,
         * allow only user role is guest (null or empty[])
         */
        else if (authArr.length === 0)
        {
            // console.info("auth is empty[]:", authArr);
            return !userRole || userRole.length === 0;
        }
        /**
         * Check if user has grants
         */
        else
        {
            /*
            Check if user role is array,
            */
            if (userRole && Array.isArray(userRole))
            {
                return authArr.some(r => userRole.indexOf(r) >= 0);
            }

            /*
            Check if user role is string,
            */
            return authArr.includes(userRole);
        }
    }

}

export default Utils;