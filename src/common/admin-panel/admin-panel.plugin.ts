import AdminJS from "adminjs";
import { Database, Resource } from "@adminjs/typeorm";
import { INestApplication } from "@nestjs/common";
import buildAdminRouter from "./admin.router";
import UserResource from "./resources/user.resource";
import LocationResource from "./resources/location.resource";
import TimeShotResource from "./resources/time-shot.resource";
import UsersStatisticResource from "./resources/user-statistic.resource"
import showTotalStatistic from "./handlers/show-total-statistic.handler";

export async function setupAdminPanel(app: INestApplication): Promise<void> {
    AdminJS.registerAdapter({ Database, Resource });

    const adminJS = new AdminJS({
        resources: [
            UserResource,
            LocationResource,
            TimeShotResource,
            UsersStatisticResource
        ],
        rootPath: '/admin',
        branding: {
            companyName: 'GroupBWT',
            softwareBrothers: false,
            logo: false
        },
        dashboard: {
            component: AdminJS.bundle('components/time-tracker'),
        },
        locale: {
            language: 'en',
            translations: {
                messages: {
                    loginWelcome: 'Tracking time by location'
                },
                labels: {
                    loginWelcome: 'Time Shot',
                    UserEntity: 'Users',
                    LocationEntity: 'Locations',
                    TimeShotEntity: 'Time Tracking',
                    UsersStatisticsEntity: 'User Statistic'
                },
            },
        },
        pages: {
            'Admin Statistic': {
                component: AdminJS.bundle('components/admin-statistic'),
                handler: showTotalStatistic
            }   
        }
    });
    AdminJS.bundle('components/logged-in', 'LoggedIn');
    const router = buildAdminRouter(adminJS);
    app.use(adminJS.options.rootPath, router);
}
