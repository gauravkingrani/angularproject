import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonServiceService } from './common-service.service';


@Injectable()
export class AppConfig {

    private config: Object[];
    private environment: Object[];

    constructor(private http: HttpClient) {

    }

    /**
     * Use to get the data found in the second file (config file)
     */
    public getConfig(key: any) {
        return this.config[key];
    }

    /**
     * Use to get the data found in the first file (environment file)
     */
    public getEnv(key: any) {
        return this.environment[key];
    }

    /**
     * This method:
     *   a) Loads "environment.json" to get the current working environment (e.g.: 'production', 'development')
     *   b) Loads "config.[environment].json" to get all environment's variables (e.g.: 'config.development.json')
     */
    public load() {
        return new Promise((resolve, reject) => {
            this.http.get('../assets/data/env.json')
                .subscribe( (envResponse: any) => {
                  this.environment= envResponse;
               // console.log(this.environment);
                resolve(true);
/*
                switch (envResponse.env) {
                    case 'production': {
                        request = this.http.get('../assets/data/config.' + envResponse.env+'.json');
                    } break;

                    case 'development': {
                        request = this.http.get('../assets/data/config.' + envResponse.env+'.json');
                    } break;

                    case 'default': {
                        console.error('Environment file is not set or invalid');
                        resolve(true);
                    } break;
                }

                if (request) {
                    request
                        .subscribe((responseData: any) => {
                            this.config = responseData;
                            resolve(true);
                        });
                } else {
                    console.error('environmentconfig file environment.json is not valid');
                    resolve(true);
                }
*/
            });

        });
    }
}
